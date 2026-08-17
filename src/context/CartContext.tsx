import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product, products } from "@/data/products";

export interface CartLine {
  /** Unique per product + variation combination. */
  key: string;
  productId: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  variation?: string;
}

interface CartContextValue {
  items: CartLine[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (product: Product, quantity?: number, variation?: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "linea-cart";

const seedCart = (): CartLine[] => {
  const seedSlugs = ["pantheon-drop-earrings", "shadowline-chain-bracelet"];
  return seedSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug);
    if (!product) return [];
    return [
      {
        key: product.slug,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      },
    ];
  });
};

export const SHIPPING_THRESHOLD = 150;
export const SHIPPING_COST = 9.95;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return seedCart();
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as CartLine[];
    } catch {
      /* ignore malformed storage */
    }
    return seedCart();
  });
  const [isBagOpen, setIsBagOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addItem = useCallback(
    (product: Product, quantity = 1, variation?: string) => {
      const key = variation ? `${product.slug}--${variation}` : product.slug;
      setItems((current) => {
        const existing = current.find((line) => line.key === key);
        if (existing) {
          return current.map((line) =>
            line.key === key
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          );
        }
        return [
          ...current,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.images[0],
            quantity,
            variation,
          },
        ];
      });
      setIsBagOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((line) => line.key !== key)
        : current.map((line) =>
            line.key === key ? { ...line, quantity } : line,
          ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = items.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0,
    );
    const shipping =
      subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    return {
      items,
      totalItems,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      isBagOpen,
      openBag: () => setIsBagOpen(true),
      closeBag: () => setIsBagOpen(false),
    };
  }, [items, addItem, updateQuantity, removeItem, clearCart, isBagOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};