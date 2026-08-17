import { Link, useParams } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ArticleCard from "@/components/journal/ArticleCard";
import Newsletter from "@/components/shared/Newsletter";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";

const JournalArticle = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6 py-24 text-center">
          <h1 className="text-2xl font-light mb-4">Article not found</h1>
          <Link to="/journal" className="text-sm font-light underline">
            Back to the Journal
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = getRelatedArticles(article, 3);
  const midpoint = Math.ceil(article.body.length / 2);

  const renderBlock = (
    block: { type: string; text: string },
    index: number,
  ) => {
    if (block.type === "heading") {
      return (
        <h2
          key={index}
          className="text-lg md:text-xl font-light text-foreground mt-10 mb-4"
        >
          {block.text}
        </h2>
      );
    }
    if (block.type === "quote") {
      return (
        <blockquote
          key={index}
          className="my-10 border-l border-foreground pl-6 text-lg md:text-xl font-light text-foreground leading-relaxed"
        >
          {block.text}
        </blockquote>
      );
    }
    return (
      <p
        key={index}
        className="text-sm md:text-base font-light text-muted-foreground leading-relaxed mb-5"
      >
        {block.text}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <PageIntro
          eyebrow={`${article.category} · ${article.date} · ${article.readingTime}`}
          title={article.title}
          crumbs={[
            { label: "Journal", href: "/journal" },
            { label: article.title },
          ]}
        />

        <section className="px-6 mb-12">
          <div className="aspect-[16/9] overflow-hidden bg-muted/10">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <article className="px-6">
          <div className="max-w-2xl mx-auto">
            {article.body.slice(0, midpoint).map(renderBlock)}

            <figure className="my-12">
              <div className="aspect-[4/3] overflow-hidden bg-muted/10">
                <img
                  src={article.inlineImage}
                  alt={article.inlineImageCaption}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs font-light text-muted-foreground mt-3">
                {article.inlineImageCaption}
              </figcaption>
            </figure>

            {article.body.slice(midpoint).map((block, index) =>
              renderBlock(block, midpoint + index),
            )}
          </div>
        </article>

        <section className="px-6 mt-24">
          <h2 className="text-sm font-normal text-foreground mb-4">
            Related reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>

        <div className="mt-24">
          <Newsletter
            heading="Keep reading with us"
            copy="Studio notes and new pieces, sent no more than twice a month."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JournalArticle;
