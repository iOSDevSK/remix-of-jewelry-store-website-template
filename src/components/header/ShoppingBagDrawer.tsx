import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/data/products";

const ShoppingBagDrawer = () => {
  const { isBagOpen, closeBag, items, subtotal } = useCart();

  if (!isBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen">
      <div className="absolute inset-0 bg-black/50" onClick={closeBag} />

      <div className="absolute right-0 top-0 h-screen w-full max-w-sm bg-background border-l border-border animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-light text-foreground">Shopping Bag</h2>
          <button
            onClick={closeBag}
            className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Close shopping bag"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <p className="text-muted-foreground text-sm font-light text-center">
                Your shopping bag is empty.
              </p>
              <Button
                asChild
                variant="outline"
                className="rounded-none font-light"
                onClick={closeBag}
              >
                <Link to="/shop">Continue shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-6 mb-6 -mr-2 pr-2">
                {items.map((line) => (
                  <CartItem key={line.key} line={line} compact />
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light text-foreground">
                    Subtotal
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {formatMoney(subtotal)}
                  </span>
                </div>
                <p className="text-xs font-light text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  asChild
                  className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90 font-light"
                  size="lg"
                  onClick={closeBag}
                >
                  <Link to="/cart">View bag</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-none font-light"
                  size="lg"
                  onClick={closeBag}
                >
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagDrawer;