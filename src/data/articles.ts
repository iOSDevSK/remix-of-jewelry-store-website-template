import heroImage from "@/assets/hero-image.png";
import foundersImage from "@/assets/founders.png";
import earringsCollection from "@/assets/earrings-collection.png";
import circularCollection from "@/assets/circular-collection.png";
import ringsCollection from "@/assets/rings-collection.png";
import organicEarring from "@/assets/organic-earring.png";
import shadowlineImage from "@/assets/shadowline.jpg";
import linkBracelet from "@/assets/link-bracelet.png";

/**
 * Journal data layer — maps directly to WordPress Posts.
 * slug -> post_name, title -> post_title, category -> post category term,
 * date -> post_date, excerpt -> post_excerpt, body -> post_content.
 */
export interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  heroImage: string;
  inlineImage: string;
  inlineImageCaption: string;
  /** Paragraphs and subheadings, in order. */
  body: Array<{ type: "paragraph" | "heading" | "quote"; text: string }>;
}

export const articles: Article[] = [
  {
    id: 1,
    slug: "how-to-build-a-jewelry-collection-that-lasts",
    title: "How to Build a Jewelry Collection That Lasts",
    category: "Guides",
    date: "12 March 2025",
    readingTime: "4 min read",
    excerpt:
      "A considered collection is built slowly, in layers. Here is how we think about the first five pieces — and the order to buy them in.",
    heroImage: heroImage,
    inlineImage: circularCollection,
    inlineImageCaption: "Apex collar and Prism chain, worn together.",
    body: [
      {
        type: "paragraph",
        text: "Most collections begin by accident: a gift, an impulse, something bought for a single evening. A collection that lasts begins differently — with a clear sense of what you actually reach for on an ordinary Tuesday.",
      },
      { type: "heading", text: "Start with the piece you never remove" },
      {
        type: "paragraph",
        text: "Before anything else, find one piece you can wear continuously. For most people that is a fine hoop or a slim band. It should survive sleep, water and daily wear, which in practice means solid metal rather than plating. This piece will quietly define everything you add later.",
      },
      { type: "heading", text: "Then build outward in weight" },
      {
        type: "paragraph",
        text: "Add a second piece with noticeably more presence — a cuff, a collar, a signet. The contrast between something almost invisible and something deliberate is what makes a collection feel intentional rather than accumulated. Two registers are enough; three is a wardrobe.",
      },
      {
        type: "quote",
        text: "Buy fewer things, more slowly, and wear them until they carry a record of your life.",
      },
      { type: "heading", text: "Keep the metals honest" },
      {
        type: "paragraph",
        text: "Mixing gold and silver is not a mistake, but it needs a reason. We suggest committing to one primary metal for the pieces you wear daily, then allowing the second to appear as an occasional accent. The result reads as a decision rather than a compromise.",
      },
      {
        type: "paragraph",
        text: "Finally, resist completing the collection. The pieces that matter most are almost always the ones acquired years apart, each marking something. Leave room for that.",
      },
    ],
  },
  {
    id: 2,
    slug: "the-art-of-everyday-gold",
    title: "The Art of Everyday Gold",
    category: "Materials",
    date: "24 February 2025",
    readingTime: "3 min read",
    excerpt:
      "Solid gold, vermeil, gold fill, plated. What the terms actually mean, and which one belongs in your daily rotation.",
    heroImage: earringsCollection,
    inlineImage: organicEarring,
    inlineImageCaption: "Zenith huggies in 14k solid gold.",
    body: [
      {
        type: "paragraph",
        text: "Gold is sold under a confusing number of names, and the differences matter enormously once a piece is worn every day rather than occasionally.",
      },
      { type: "heading", text: "Solid gold" },
      {
        type: "paragraph",
        text: "Gold alloyed throughout, described in karats. 14k is our preferred alloy for everyday pieces: hard enough to resist scratching, soft enough to be reshaped decades from now. It will never wear through, because there is no layer to wear through.",
      },
      { type: "heading", text: "Vermeil and gold fill" },
      {
        type: "paragraph",
        text: "Vermeil is a thick gold layer over sterling silver — at least 2.5 microns by definition. Gold fill uses a mechanically bonded layer that is thicker still. Both hold up to years of careful wear, and both are honest ways to own gold at a fraction of the price.",
      },
      {
        type: "quote",
        text: "The question is not whether a piece is gold, but how long it will remain so.",
      },
      { type: "heading", text: "Plating" },
      {
        type: "paragraph",
        text: "Flash plating measures well under a micron and will fade. We use plating only where a piece is not in constant contact with skin, and we say so plainly on every product page.",
      },
      {
        type: "paragraph",
        text: "Living with gold is simple: remove it before swimming, keep it away from perfume, and let it develop the soft patina that only comes from being worn.",
      },
    ],
  },
  {
    id: 3,
    slug: "how-to-care-for-sterling-silver-jewelry",
    title: "How to Care for Sterling Silver Jewelry",
    category: "Care",
    date: "8 February 2025",
    readingTime: "3 min read",
    excerpt:
      "Tarnish is not damage. A short, practical guide to keeping silver bright — and knowing when to leave it alone.",
    heroImage: shadowlineImage,
    inlineImage: linkBracelet,
    inlineImageCaption: "Shadowline bracelet, after two years of wear.",
    body: [
      {
        type: "paragraph",
        text: "Sterling silver reacts with sulphur in the air. That reaction is tarnish, and it is entirely reversible — a surface event, not a defect.",
      },
      { type: "heading", text: "Daily habits" },
      {
        type: "paragraph",
        text: "Put silver on last and take it off first. Perfume, hairspray and hand cream accelerate tarnish far more than air does. After wearing, a few seconds with a dry soft cloth removes the oils that would otherwise sit on the surface overnight.",
      },
      { type: "heading", text: "Cleaning" },
      {
        type: "paragraph",
        text: "Warm water, a drop of unscented dish soap and a soft toothbrush handle most cleaning. Rinse and dry completely. For heavier tarnish, use a proper silver polishing cloth and work in straight lines rather than circles. Avoid dips and abrasive pastes — they strip oxidised detail and dull brushed finishes permanently.",
      },
      {
        type: "quote",
        text: "A brushed finish is meant to soften with time. Polishing it to a mirror erases the piece as it was designed.",
      },
      { type: "heading", text: "Storage" },
      {
        type: "paragraph",
        text: "Store pieces separately in a closed pouch, ideally with an anti-tarnish strip. Chains should be laid flat rather than coiled. Silver kept in a drawer will tarnish more slowly than silver left on an open tray.",
      },
      {
        type: "paragraph",
        text: "If a piece needs more than a cloth, write to us. We re-finish LINEA silver by hand, and we would rather do it than see it polished away.",
      },
    ],
  },
  {
    id: 4,
    slug: "behind-the-collection-organic-forms",
    title: "Behind the Collection: Organic Forms",
    category: "Studio",
    date: "21 January 2025",
    readingTime: "4 min read",
    excerpt:
      "Nine months, forty wax models and one stubborn curve. Inside the making of our most sculptural collection to date.",
    heroImage: foundersImage,
    inlineImage: ringsCollection,
    inlineImageCaption: "Wax models for Oblique and Vertex, studio floor.",
    body: [
      {
        type: "paragraph",
        text: "Organic Forms began with a sketch that did not work. A curve that read beautifully on paper collapsed the moment it was carved in wax — too thin at the apex, too heavy at the base.",
      },
      { type: "heading", text: "Forty models" },
      {
        type: "paragraph",
        text: "We carved forty variations over nine months. Most differed from the last by less than a millimetre. The collection's final profile is the thirty-seventh, chosen because it was the first one that felt inevitable rather than designed.",
      },
      { type: "heading", text: "Working with the hand" },
      {
        type: "paragraph",
        text: "Every piece in the collection is finished by hand, which means small variations survive into the finished object. A hammered bangle carries the record of the hand that struck it. We consider that the point, not a tolerance to be eliminated.",
      },
      {
        type: "quote",
        text: "We stopped when the form no longer looked like a decision.",
      },
      { type: "heading", text: "Sourcing" },
      {
        type: "paragraph",
        text: "The collection is made entirely in recycled sterling silver and recycled gold, cast in a family-run foundry two hours from our studio. Nothing in it travels further than it needs to.",
      },
      {
        type: "paragraph",
        text: "Organic Forms is not a seasonal release. It stays in the collection, and it will be re-cut rather than replaced.",
      },
    ],
  },
];

export const getArticleBySlug = (slug?: string) =>
  articles.find((article) => article.slug === slug);

export const getRelatedArticles = (article: Article, limit = 3) =>
  articles.filter((item) => item.id !== article.id).slice(0, limit);