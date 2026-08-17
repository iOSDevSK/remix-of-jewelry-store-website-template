import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ArticleCard from "@/components/journal/ArticleCard";
import Newsletter from "@/components/shared/Newsletter";
import { articles } from "@/data/articles";
import { Link } from "react-router-dom";

const Journal = () => {
  const [lead, ...rest] = articles;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <PageIntro
          eyebrow="Journal"
          title="Notes from the studio"
          description="Guides, material studies and conversations about how jewelry is made and lived in."
          crumbs={[{ label: "Journal" }]}
        />

        {/* Lead article */}
        <section className="px-6 mb-16">
          <Link to={`/journal/${lead.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              <div className="aspect-[4/3] overflow-hidden bg-muted/10">
                <img
                  src={lead.heroImage}
                  alt={lead.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  {lead.category} · {lead.date}
                </p>
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                  {lead.title}
                </h2>
                <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xl mb-6">
                  {lead.excerpt}
                </p>
                <span className="text-sm font-light text-foreground underline">
                  Read the article
                </span>
              </div>
            </div>
          </Link>
        </section>

        <section className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <div className="mt-24">
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
