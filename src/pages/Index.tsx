import { Link } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import LargeHero from "@/components/content/LargeHero";
import FiftyFiftySection from "@/components/content/FiftyFiftySection";
import OneThirdTwoThirdsSection from "@/components/content/OneThirdTwoThirdsSection";
import ProductRow from "@/components/commerce/ProductRow";
import ArticleCard from "@/components/journal/ArticleCard";
import Newsletter from "@/components/shared/Newsletter";
import { newArrivals, bestSellers, productCategories } from "@/data/products";
import { articles } from "@/data/articles";
import ringsCollection from "@/assets/rings-collection.png";
import earringsCollection from "@/assets/earrings-collection.png";
import circularCollection from "@/assets/circular-collection.png";
import linkBracelet from "@/assets/link-bracelet.png";

const collectionImages: Record<string, string> = {
  Earrings: earringsCollection,
  Rings: ringsCollection,
  Necklaces: circularCollection,
  Bracelets: linkBracelet,
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />

    <main className="pt-6">
      <h1 className="sr-only">
        LINEA — minimalist fine jewelry, handmade in Antwerp
      </h1>
      <FiftyFiftySection />

      {/* Featured collections */}
      <section className="w-full mb-16 px-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-normal text-foreground">
            Featured collections
          </h2>
          <Link
            to="/shop"
            className="text-sm font-light text-foreground underline hover:opacity-60 transition-opacity"
          >
            Shop all
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {productCategories.map((category) => (
            <Link
              key={category}
              to={`/shop?category=${category.toLowerCase()}`}
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted/10 mb-3">
                <img
                  src={collectionImages[category]}
                  alt={`${category} collection`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-sm font-medium text-foreground">{category}</p>
            </Link>
          ))}
        </div>
      </section>

      <ProductRow
        title="New arrivals"
        products={newArrivals}
        viewAllHref="/shop?sort=newest"
      />

      <LargeHero />

      <ProductRow
        title="Best sellers"
        products={bestSellers}
        viewAllHref="/shop?sort=featured"
      />

      {/* Brand story */}
      <section className="w-full mb-16 px-6">
        <div className="max-w-2xl">
          <h2 className="text-sm font-normal text-foreground mb-4">
            Made in Antwerp, in small runs
          </h2>
          <p className="text-xl md:text-2xl font-light text-foreground leading-relaxed mb-4">
            We begin with a line and remove everything that does not serve it.
          </p>
          <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
            LINEA is a six-person studio working in recycled sterling silver and
            18k gold vermeil. Two collections a year, finished by hand, designed
            to be worn every day rather than kept for occasions.
          </p>
          <Link
            to="/about"
            className="text-sm font-light text-foreground underline hover:opacity-60 transition-opacity"
          >
            Read our story
          </Link>
        </div>
      </section>

      <OneThirdTwoThirdsSection />

      {/* Journal */}
      <section className="w-full mb-16 px-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-normal text-foreground">
            From the Journal
          </h2>
          <Link
            to="/journal"
            className="text-sm font-light text-foreground underline hover:opacity-60 transition-opacity"
          >
            All articles
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <Newsletter />
    </main>

    <Footer />
  </div>
);

export default Index;
