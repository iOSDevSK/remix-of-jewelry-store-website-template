import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ProductGrid from "@/components/commerce/ProductGrid";
import Newsletter from "@/components/shared/Newsletter";
import {
  products,
  productCategories,
  priceBounds,
  formatMoney,
} from "@/data/products";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New in" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Alphabetical" },
];

const Shop = () => {
  const [params, setParams] = useSearchParams();

  const category = params.get("category")?.toLowerCase() ?? "all";
  const sort = params.get("sort") ?? "featured";
  const query = params.get("q") ?? "";
  const maxPrice = Number(params.get("max") ?? priceBounds.max);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === "" || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const visibleProducts = useMemo(() => {
    let list = products.filter((product) => product.price <= maxPrice);

    if (category !== "all") {
      list = list.filter(
        (product) => product.category.toLowerCase() === category,
      );
    }

    if (query) {
      const term = query.toLowerCase();
      list = list.filter((product) =>
        [product.name, product.category, product.material, product.description]
          .join(" ")
          .toLowerCase()
          .includes(term),
      );
    }

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return [...list].sort(
          (a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false),
        );
      default:
        return [...list].sort(
          (a, b) =>
            Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false),
        );
    }
  }, [category, sort, query, maxPrice]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <PageIntro
          eyebrow="Collection"
          title="Shop all jewelry"
          description="Twelve pieces in solid gold vermeil and recycled sterling silver, made in small runs in our Antwerp studio."
          crumbs={[{ label: "Shop" }]}
        />

        <section className="px-6">
          {/* Category filter */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4 mb-6">
            {["All", ...productCategories].map((label) => {
              const value = label.toLowerCase();
              const isActive =
                value === category || (value === "all" && category === "all");
              return (
                <button
                  key={label}
                  onClick={() => setParam("category", value)}
                  className={`text-sm font-light transition-opacity ${
                    isActive
                      ? "text-foreground underline"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Price + sort */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="w-full max-w-xs">
              <div className="flex justify-between mb-3">
                <span className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground">
                  Price
                </span>
                <span className="text-xs font-light text-foreground">
                  Up to {formatMoney(maxPrice)}
                </span>
              </div>
              <Slider
                value={[maxPrice]}
                min={priceBounds.min}
                max={priceBounds.max}
                step={5}
                onValueChange={([value]) =>
                  setParam(
                    "max",
                    value >= priceBounds.max ? null : String(value),
                  )
                }
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-muted-foreground whitespace-nowrap">
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1 ? "piece" : "pieces"}
              </span>
              <Select
                value={sort}
                onValueChange={(value) => setParam("sort", value)}
              >
                <SelectTrigger className="w-[200px] rounded-none border-border font-light text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="font-light text-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {query && (
            <p className="text-sm font-light text-muted-foreground mb-6">
              Results for “{query}” —{" "}
              <button
                onClick={() => setParam("q", null)}
                className="underline hover:opacity-60"
              >
                clear search
              </button>
            </p>
          )}

          {visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} />
          ) : (
            <p className="text-sm font-light text-muted-foreground py-16 text-center">
              No pieces match these filters yet.
            </p>
          )}
        </section>

        <div className="mt-24">
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
