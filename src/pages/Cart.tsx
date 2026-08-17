import { Link } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import PageIntro from "@/components/shared/PageIntro";
import CartItem from "@/components/cart/CartItem";
import ProductRow from "@/components/commerce/ProductRow";
import { Button } from "@/components/ui/button";
import {
  useCart,
  SHIPPING_THRESHOLD,
} from "@/context/CartContext";
import { formatMoney, bestSellers } from "@/data/products";

const Cart = () => {
  const { items, subtotal, shipping, total, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <PageIntro
          eyebrow="Shopping bag"
          title={
            totalItems > 0
              ? `Your bag (${totalItems})`
              : "Your bag is empty"
          }
          crumbs={[{ label: "Shopping bag" }]}
        />

        {items.length === 0 ? (
          <section className="px-6">
            <p className="text-sm font-light text-muted-foreground max-w-md mb-8">
              Nothing here yet. Explore the collection and add the pieces you
              love — your bag is saved on this device.
            </p>
            <Button
              asChild
              className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-light"
              size="lg"
            >
              <Link to="/shop">Shop all jewelry</Link>
            </Button>

            <div className="mt-24">
              <ProductRow
                title="Best sellers"
                products={bestSellers}
                viewAllHref="/shop?sort=featured"
              />
            </div>
          </section>
        ) : (
          <>
            <section className="px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
              <div className="border-t border-border">
                {items.map((line) => (
                  <CartItem key={line.key} line={line} />
                ))}

                <Link
                  to="/shop"
                  className="inline-block mt-8 text-sm font-light text-foreground underline hover:opacity-60 transition-opacity"
                >
                  Continue shopping
                </Link>
              </div>

              <aside className="lg:sticky lg:top-24 h-fit border border-border p-6">
                <h2 className="text-sm font-normal text-foreground mb-6">
                  Order summary
                </h2>
                <div className="space-y-3 text-sm font-light">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      {formatMoney(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? "Complimentary" : formatMoney(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 mt-3">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground font-medium">
                      {formatMoney(total)}
                    </span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p className="text-xs font-light text-muted-foreground mt-4">
                    Add {formatMoney(SHIPPING_THRESHOLD - subtotal)} for
                    complimentary shipping.
                  </p>
                )}

                <Button
                  asChild
                  className="w-full mt-6 rounded-none bg-foreground text-background hover:bg-foreground/90 font-light"
                  size="lg"
                >
                  <Link to="/checkout">Checkout</Link>
                </Button>

                <p className="text-xs font-light text-muted-foreground mt-4 leading-relaxed">
                  Free returns within 30 days. Every order arrives in a
                  hand-finished LINEA box.
                </p>
              </aside>
            </section>

            <div className="mt-24">
              <ProductRow
                title="You may also like"
                products={bestSellers}
                viewAllHref="/shop"
              />
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
