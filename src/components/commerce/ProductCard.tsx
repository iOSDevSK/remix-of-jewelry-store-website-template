import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];

  return (
    <Link to={`/product/${product.slug}`} className="block group">
      <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
        <img
          src={primary}
          alt={`${product.name} ${product.category.toLowerCase()} by LINEA`}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-0"
        />
        <img
          src={secondary}
          alt={`${product.name} alternate view`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/[0.03]" />
        {product.isNew && (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-black">
            NEW
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-light text-muted-foreground">
          {product.category}
        </p>
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
          <p className="text-sm font-light text-foreground whitespace-nowrap">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;