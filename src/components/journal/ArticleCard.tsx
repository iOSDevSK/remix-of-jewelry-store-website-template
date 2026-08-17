import { Link } from "react-router-dom";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  aspect?: string;
}

const ArticleCard = ({ article, aspect = "aspect-[4/5]" }: ArticleCardProps) => (
  <Link to={`/journal/${article.slug}`} className="block group">
    <div className={`${aspect} mb-3 overflow-hidden bg-muted/10`}>
      <img
        src={article.heroImage}
        alt={article.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="space-y-2">
      <p className="text-xs font-light uppercase tracking-[0.12em] text-muted-foreground">
        {article.category} · {article.date}
      </p>
      <h3 className="text-base font-normal text-foreground leading-snug">
        {article.title}
      </h3>
      <p className="text-sm font-light text-muted-foreground leading-relaxed">
        {article.excerpt}
      </p>
    </div>
  </Link>
);

export default ArticleCard;