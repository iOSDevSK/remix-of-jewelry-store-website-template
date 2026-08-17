import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductRowProps {
  title: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

const ProductRow = ({
  title,
  products,
  viewAllHref,
  viewAllLabel = "View all",
}: ProductRowProps) => (
  <section className="w-full mb-16 px-6">
    <div className="flex items-baseline justify-between mb-4">
      <h2 className="text-sm font-normal text-foreground">{title}</h2>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="text-sm font-light text-foreground hover:opacity-60 transition-opacity underline"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

export default ProductRow;