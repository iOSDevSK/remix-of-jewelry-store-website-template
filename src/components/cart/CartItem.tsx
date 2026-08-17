import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { CartLine, useCart } from "@/context/CartContext";
import { formatMoney } from "@/data/products";

interface CartItemProps {
  line: CartLine;
  compact?: boolean;
}

const CartItem = ({ line, compact = false }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div
      className={`flex gap-4 ${compact ? "" : "py-6 border-b border-border"}`}
    >
      <Link
        to={`/product/${line.slug}`}
        className={`${compact ? "w-20 h-20" : "w-24 h-24 md:w-28 md:h-28"} shrink-0 bg-muted/10 overflow-hidden`}
      >
        <img
          src={line.image}
          alt={line.name}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0">
            <p className="text-sm font-light text-muted-foreground">
              {line.category}
            </p>
            <Link
              to={`/product/${line.slug}`}
              className="text-sm font-medium text-foreground hover:opacity-60 transition-opacity"
            >
              {line.name}
            </Link>
            {line.variation && (
              <p className="text-xs font-light text-muted-foreground mt-1">
                {line.variation}
              </p>
            )}
          </div>
          <div className="flex items-start gap-3">
            <p className="text-sm font-light text-foreground whitespace-nowrap">
              {formatMoney(line.price * line.quantity)}
            </p>
            <button
              onClick={() => removeItem(line.key)}
              aria-label={`Remove ${line.name}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center border border-border">
            <button
              onClick={() => updateQuantity(line.key, line.quantity - 1)}
              className="p-2 hover:opacity-50 transition-opacity"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 py-2 text-sm font-light min-w-[40px] text-center border-l border-r border-border">
              {line.quantity}
            </span>
            <button
              onClick={() => updateQuantity(line.key, line.quantity + 1)}
              className="p-2 hover:opacity-50 transition-opacity"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;