import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import PageIntro from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputClass =
  "rounded-none border-border font-light text-sm focus-visible:ring-0 focus-visible:border-foreground";

const Contact = () => {
  const [subject, setSubject] = useState("order");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Thank you — we'll reply within one business day.");
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <PageIntro
          eyebrow="Contact"
          title="We're here to help"
          description="Questions about sizing, an order or a bespoke commission — write to us and a member of the studio team will answer personally."
          crumbs={[{ label: "Contact" }]}
        />

        <section className="px-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-2"
                >
                  Name
                </label>
                <Input id="contact-name" name="name" required className={inputClass} />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-2"
                >
                  Email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Subject
              </label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="order" className="font-light text-sm">
                    An existing order
                  </SelectItem>
                  <SelectItem value="sizing" className="font-light text-sm">
                    Sizing and fit
                  </SelectItem>
                  <SelectItem value="repairs" className="font-light text-sm">
                    Repairs and care
                  </SelectItem>
                  <SelectItem value="bespoke" className="font-light text-sm">
                    Bespoke commission
                  </SelectItem>
                  <SelectItem value="press" className="font-light text-sm">
                    Press and partnerships
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-2"
              >
                Message
              </label>
              <Textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                className={inputClass}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-light w-full sm:w-auto px-10"
            >
              Send message
            </Button>
          </form>

          <aside className="space-y-8 text-sm font-light">
            <div>
              <h2 className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Customer care
              </h2>
              <p className="text-foreground">care@lineajewelry.com</p>
              <p className="text-muted-foreground">+32 3 555 0148</p>
              <p className="text-muted-foreground mt-2">
                Monday to Friday, 9–17 CET
              </p>
            </div>

            <div>
              <h2 className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Studio
              </h2>
              <p className="text-muted-foreground">Kloosterstraat 42</p>
              <p className="text-muted-foreground">2000 Antwerp, Belgium</p>
              <p className="text-muted-foreground mt-2">
                Visits by appointment.
              </p>
            </div>

            <div>
              <h2 className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Shipping &amp; returns
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Complimentary insured shipping on orders over €150, dispatched
                within two business days. Unworn pieces can be returned within
                30 days for a full refund; engraved and bespoke pieces are
                final sale.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
