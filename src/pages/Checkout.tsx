import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CheckoutHeader from "@/components/header/CheckoutHeader";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/data/products";
import { useState } from "react";

const inputClass =
  "rounded-none border-border font-light text-sm focus-visible:ring-0 focus-visible:border-foreground";

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-2"
  >
    {children}
  </label>
);

const Checkout = () => {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [payment, setPayment] = useState("card");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success(
      "Order placed — this is a demo checkout, no payment was taken.",
    );
    clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />

      <main className="px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-light text-foreground mb-10">
          Checkout
        </h1>

        {items.length === 0 ? (
          <div className="py-16">
            <p className="text-sm font-light text-muted-foreground mb-6">
              Your bag is empty, so there is nothing to check out yet.
            </p>
            <Button
              asChild
              className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-light"
              size="lg"
            >
              <Link to="/shop">Shop all jewelry</Link>
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20"
          >
            <div className="max-w-xl space-y-12">
              {/* Contact */}
              <section>
                <h2 className="text-sm font-normal text-foreground mb-6 pb-3 border-b border-border">
                  1 · Contact information
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className={inputClass} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" className={inputClass} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="news" className="rounded-none" />
                    <label
                      htmlFor="news"
                      className="text-sm font-light text-muted-foreground"
                    >
                      Email me with news and new arrivals
                    </label>
                  </div>
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-sm font-normal text-foreground mb-6 pb-3 border-b border-border">
                  2 · Shipping &amp; billing address
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" required className={inputClass} />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" required className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className={inputClass} />
                  </div>
                  <div>
                    <Label htmlFor="apartment">
                      Apartment, suite (optional)
                    </Label>
                    <Input id="apartment" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="postcode">Postal code</Label>
                      <Input id="postcode" required className={inputClass} />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className={inputClass} />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Select defaultValue="be">
                        <SelectTrigger className={inputClass}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="be" className="font-light text-sm">
                            Belgium
                          </SelectItem>
                          <SelectItem value="nl" className="font-light text-sm">
                            Netherlands
                          </SelectItem>
                          <SelectItem value="de" className="font-light text-sm">
                            Germany
                          </SelectItem>
                          <SelectItem value="fr" className="font-light text-sm">
                            France
                          </SelectItem>
                          <SelectItem value="se" className="font-light text-sm">
                            Sweden
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="same" defaultChecked className="rounded-none" />
                    <label
                      htmlFor="same"
                      className="text-sm font-light text-muted-foreground"
                    >
                      Billing address is the same as shipping
                    </label>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-sm font-normal text-foreground mb-6 pb-3 border-b border-border">
                  3 · Payment
                </h2>
                <RadioGroup
                  value={payment}
                  onValueChange={setPayment}
                  className="border border-border divide-y divide-border"
                >
                  {[
                    { value: "card", label: "Credit or debit card" },
                    { value: "paypal", label: "PayPal" },
                    { value: "transfer", label: "Bank transfer" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-4 cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} />
                      <span className="text-sm font-light text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </RadioGroup>

                {payment === "card" && (
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label htmlFor="card-number">Card number</Label>
                      <Input
                        id="card-number"
                        inputMode="numeric"
                        placeholder="0000 0000 0000 0000"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input
                          id="expiry"
                          placeholder="MM / YY"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-xs font-light text-muted-foreground mt-6">
                  This is a demo storefront — no payment is processed and no
                  card details are stored.
                </p>
              </section>
            </div>

            {/* Order summary */}
            <aside className="lg:sticky lg:top-8 h-fit border border-border p-6">
              <h2 className="text-sm font-normal text-foreground mb-6">
                Order summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((line) => (
                  <div key={line.key} className="flex gap-4">
                    <div className="w-16 h-16 shrink-0 bg-muted/10 overflow-hidden">
                      <img
                        src={line.image}
                        alt={line.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {line.name}
                      </p>
                      <p className="text-xs font-light text-muted-foreground">
                        {line.variation
                          ? `${line.variation} · Qty ${line.quantity}`
                          : `Qty ${line.quantity}`}
                      </p>
                    </div>
                    <p className="text-sm font-light text-foreground">
                      {formatMoney(line.price * line.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm font-light border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? "Complimentary" : formatMoney(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground font-medium">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-6 rounded-none bg-foreground text-background hover:bg-foreground/90 font-light"
              >
                Place Order
              </Button>

              <Link
                to="/cart"
                className="block text-center mt-4 text-sm font-light text-muted-foreground underline hover:text-foreground transition-colors"
              >
                Edit bag
              </Link>
            </aside>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
