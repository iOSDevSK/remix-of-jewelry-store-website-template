import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NewsletterProps {
  variant?: "band" | "inline";
  heading?: string;
  copy?: string;
}

const Newsletter = ({
  variant = "band",
  heading = "Join the LINEA letter",
  copy = "New pieces, studio notes and early access — sent no more than twice a month.",
}: NewsletterProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    toast.success("Thank you — please confirm via the email we just sent.");
    setEmail("");
  };

  return (
    <section
      className={`w-full px-6 ${variant === "band" ? "mb-16" : "mb-0"}`}
      aria-labelledby="newsletter-heading"
    >
      <div
        className={
          variant === "band"
            ? "border-t border-b border-border py-12 md:py-16"
            : "border-t border-border pt-10"
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="max-w-md">
            <h2
              id="newsletter-heading"
              className="text-xl md:text-2xl font-normal text-foreground mb-2"
            >
              {heading}
            </h2>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              {copy}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md md:ml-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label
                  htmlFor="newsletter-email"
                  className="block text-xs font-light uppercase tracking-[0.12em] text-muted-foreground mb-2"
                >
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-b border-border pb-2 text-sm font-light outline-none focus:border-foreground transition-colors"
                />
              </div>
              <Button
                type="submit"
                className="h-10 rounded-none bg-foreground text-background hover:bg-foreground/90 font-light px-6"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;