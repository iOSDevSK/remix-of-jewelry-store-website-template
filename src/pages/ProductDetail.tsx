import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductGallery from "@/components/commerce/ProductGallery";
import ProductRow from "@/components/commerce/ProductRow";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  formatMoney,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  // Supports slugs (WooCommerce post_name) and legacy numeric ids.
  const product =
    getProductBySlug(productId) ??
    products.find((item) => String(item.id) === productId);

  const { addItem, openBag } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [variation, setVariation] = useState<string | undefined>(
    product?.variations?.[0],
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6 py-24 text-center">
          <h1 className="text-2xl font-light mb-4">Piece not found</h1>
          <Link to="/shop" className="text-sm font-light underline">
            Back to the shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);

  const handleAdd = () => {
    addItem(product, quantity, variation);
    toast.success(`${product.name} added to your bag.`);
    openBag();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <div className="px-6 mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/shop">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/shop?category=${product.category.toLowerCase()}`}>
                    {product.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="lg:sticky lg:top-24 h-fit max-w-md">
            <p className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-3">
              {product.category}
              {product.isNew && " · New"}
            </p>
            <h1 className="text-2xl md:text-3xl font-light text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-lg font-light text-foreground mb-6">
              {formatMoney(product.price)}
            </p>

            <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <dl className="text-sm font-light border-t border-border divide-y divide-border mb-8">
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">Material</dt>
                <dd className="text-foreground text-right">
                  {product.material}
                </dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">Dimensions</dt>
                <dd className="text-foreground text-right">
                  {product.dimensions}
                </dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">Weight</dt>
                <dd className="text-foreground text-right">{product.weight}</dd>
              </div>
            </dl>

            {product.variations && (
              <div className="mb-6">
                <p className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  {product.variationLabel ?? "Options"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((option) => (
                    <button
                      key={option}
                      onClick={() => setVariation(option)}
                      className={`px-4 py-2 text-sm font-light border transition-colors ${
                        variation === option
                          ? "border-foreground text-foreground"
                          : "border-border text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="p-3 hover:opacity-50 transition-opacity"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-light min-w-[48px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((value) => value + 1)}
                  className="p-3 hover:opacity-50 transition-opacity"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <Button
                onClick={handleAdd}
                size="lg"
                className="flex-1 rounded-none bg-foreground text-background hover:bg-foreground/90 font-light"
              >
                Add to Bag
              </Button>
            </div>

            <Accordion type="single" collapsible className="border-t border-border">
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="text-sm font-light hover:no-underline">
                  Details &amp; care
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-muted-foreground leading-relaxed">
                  {product.editorsNote} Store your piece dry and away from
                  direct light. Polish gently with the cloth included in every
                  LINEA box.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="text-sm font-light hover:no-underline">
                  Shipping &amp; returns
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-muted-foreground leading-relaxed">
                  Complimentary insured shipping on orders over €150, dispatched
                  from Antwerp within two business days. Unworn pieces can be
                  returned within 30 days for a full refund. Engraved and
                  bespoke pieces are final sale.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sourcing" className="border-border">
                <AccordionTrigger className="text-sm font-light hover:no-underline">
                  Materials &amp; sourcing
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-muted-foreground leading-relaxed">
                  Made with {product.material.toLowerCase()}. We work with
                  recycled metals and SCS-certified refiners, and every piece is
                  finished by hand in our own studio.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <div className="mt-24">
          <ProductRow
            title="You may also like"
            products={related}
            viewAllHref="/shop"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
