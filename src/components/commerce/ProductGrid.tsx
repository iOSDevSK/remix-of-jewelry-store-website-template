import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

const ProductGrid = ({ products, className = "" }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <p className="text-sm font-light text-muted-foreground py-16">
        No pieces match these filters. Try widening your selection.
      </p>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;