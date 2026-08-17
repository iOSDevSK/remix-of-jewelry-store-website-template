import pantheonImage from "@/assets/pantheon.jpg";
import eclipseImage from "@/assets/eclipse.jpg";
import haloImage from "@/assets/halo.jpg";
import obliqueImage from "@/assets/oblique.jpg";
import lintelImage from "@/assets/lintel.jpg";
import shadowlineImage from "@/assets/shadowline.jpg";
import shadowlineAltImage from "@/assets/shadowline-1.jpg";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";
import circularCollection from "@/assets/circular-collection.png";
import earringsCollection from "@/assets/earrings-collection.png";
import ringsCollection from "@/assets/rings-collection.png";

/**
 * Product data layer.
 *
 * This mirrors a WooCommerce product shape closely enough that each entry can
 * later be replaced 1:1 by a WooCommerce product:
 *  slug -> post_name, name -> post_title, price -> _price,
 *  category -> product_cat term, images -> gallery, material/dimensions -> attributes,
 *  variations -> variable product attribute (e.g. pa_size).
 */

export type ProductCategory = "Earrings" | "Rings" | "Necklaces" | "Bracelets";

export const productCategories: ProductCategory[] = [
  "Earrings",
  "Rings",
  "Necklaces",
  "Bracelets",
];

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  /** Price in EUR, excl. shipping. */
  price: number;
  images: string[];
  shortDescription: string;
  description: string;
  material: string;
  dimensions: string;
  weight: string;
  editorsNote: string;
  /** Optional variation set — maps to a WooCommerce variable product. */
  variationLabel?: string;
  variations?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "pantheon-drop-earrings",
    name: "Pantheon",
    category: "Earrings",
    price: 145,
    images: [pantheonImage, organicEarring, earringsCollection],
    shortDescription: "Architectural drop earrings with a softly brushed finish.",
    description:
      "Pantheon takes its cue from colonnades and the quiet rhythm of repeated form. Each drop is cast in solid sterling silver, then hand-brushed to a low sheen that catches light without shine. Worn as a pair or single, they sit close to the jaw and move with you.",
    material: "18k gold plated sterling silver",
    dimensions: "2.5 cm × 1.2 cm",
    weight: "4.2 g per earring",
    editorsNote:
      "A modern reading of classical architecture — timeless, but never nostalgic.",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 2,
    slug: "eclipse-cuff",
    name: "Eclipse",
    category: "Bracelets",
    price: 210,
    images: [eclipseImage, linkBracelet, shadowlineImage],
    shortDescription: "A weighted open cuff with a hand-polished inner curve.",
    description:
      "Eclipse is formed from a single length of silver, tapered by hand so the cuff narrows as it opens. The inner surface is mirror-polished, the outer left matte — a quiet contrast that only reveals itself in movement.",
    material: "Recycled sterling silver",
    dimensions: "6.2 cm inner diameter, 8 mm band",
    weight: "22 g",
    editorsNote: "The one bracelet that carries an entire outfit.",
    variationLabel: "Size",
    variations: ["Small", "Medium", "Large"],
    isBestSeller: true,
  },
  {
    id: 3,
    slug: "halo-hoops",
    name: "Halo",
    category: "Earrings",
    price: 98,
    images: [haloImage, organicEarring, earringsCollection],
    shortDescription: "Everyday hoops with a subtly flattened profile.",
    description:
      "Halo is our everyday hoop, refined over four prototypes. The band is flattened slightly on the outer edge so it reads as a line rather than a tube, and the hinge is set flush for a seamless silhouette.",
    material: "14k solid gold",
    dimensions: "18 mm diameter",
    weight: "1.8 g per earring",
    editorsNote: "Put them in and forget they are there.",
    variationLabel: "Diameter",
    variations: ["14 mm", "18 mm", "24 mm"],
    isNew: true,
  },
  {
    id: 4,
    slug: "oblique-signet-ring",
    name: "Oblique",
    category: "Rings",
    price: 165,
    images: [obliqueImage, ringsCollection, circularCollection],
    shortDescription: "An angled signet with a deliberately off-centre face.",
    description:
      "Oblique reworks the signet by tilting its face a few degrees off axis. The shift is small enough to feel accidental and precise enough to be anything but. Finished with a fine bead-blast that softens reflections.",
    material: "Recycled 18k gold vermeil",
    dimensions: "11 mm face",
    weight: "6.4 g",
    editorsNote: "Structure with a sense of humour.",
    variationLabel: "Ring size",
    variations: ["48", "50", "52", "54", "56"],
  },
  {
    id: 5,
    slug: "lintel-pendant",
    name: "Lintel",
    category: "Necklaces",
    price: 175,
    images: [lintelImage, circularCollection, earringsCollection],
    shortDescription: "A horizontal bar pendant on a fine cable chain.",
    description:
      "Named for the beam that carries weight above a doorway, Lintel balances a solid horizontal bar on a whisper-fine chain. The bar is drilled through rather than soldered, so it hangs perfectly level.",
    material: "18k gold plated sterling silver",
    dimensions: "Bar 2.8 cm, chain 42 cm",
    weight: "3.6 g",
    editorsNote: "The quietest way to finish an open collar.",
    variationLabel: "Chain length",
    variations: ["40 cm", "42 cm", "45 cm"],
    isNew: true,
  },
  {
    id: 6,
    slug: "shadowline-chain-bracelet",
    name: "Shadowline",
    category: "Bracelets",
    price: 190,
    images: [shadowlineImage, shadowlineAltImage, linkBracelet],
    shortDescription: "Flat interlocking links that fall like fabric.",
    description:
      "Each link in Shadowline is individually flattened and set at an alternating angle, so the bracelet drapes rather than sits. The clasp is integrated into the final link and disappears entirely when closed.",
    material: "Recycled sterling silver",
    dimensions: "19 cm, 6 mm width",
    weight: "16 g",
    editorsNote: "Weight you notice, hardware you never see.",
    variationLabel: "Length",
    variations: ["17 cm", "19 cm", "21 cm"],
    isBestSeller: true,
  },
  {
    id: 7,
    slug: "meridian-ear-cuff",
    name: "Meridian",
    category: "Earrings",
    price: 65,
    images: [earringsCollection, organicEarring, haloImage],
    shortDescription: "A piercing-free cuff that traces the ear's edge.",
    description:
      "Meridian is shaped to follow the natural curve of the outer ear, with a gentle spring tension that holds without pressure. No piercing required — it slides on and stays put through the day.",
    material: "14k gold fill",
    dimensions: "1.6 cm",
    weight: "0.9 g",
    editorsNote: "The easiest entry point into stacking.",
    isNew: true,
  },
  {
    id: 8,
    slug: "vertex-stacking-ring",
    name: "Vertex",
    category: "Rings",
    price: 78,
    images: [ringsCollection, obliqueImage, circularCollection],
    shortDescription: "A slim band with a single raised apex.",
    description:
      "Vertex is designed to be worn in multiples. A single peak rises from an otherwise unbroken band, so stacked rings interlock visually rather than compete. Sold individually.",
    material: "Recycled sterling silver",
    dimensions: "2 mm band",
    weight: "2.1 g",
    editorsNote: "Buy one, then inevitably buy three.",
    variationLabel: "Ring size",
    variations: ["48", "50", "52", "54", "56"],
  },
  {
    id: 9,
    slug: "apex-collar-necklace",
    name: "Apex",
    category: "Necklaces",
    price: 245,
    images: [circularCollection, lintelImage, earringsCollection],
    shortDescription: "A sculptural collar that holds its own shape.",
    description:
      "Apex is our most considered piece — a hand-formed collar with a graduated profile that thickens at the front and tapers behind the neck. It is worked over a wooden form, then finished by hand over several sessions.",
    material: "Recycled 18k gold vermeil",
    dimensions: "13 cm inner width",
    weight: "34 g",
    editorsNote: "Wear it alone. It needs no company.",
    isBestSeller: true,
  },
  {
    id: 10,
    slug: "zenith-huggie-earrings",
    name: "Zenith",
    category: "Earrings",
    price: 120,
    images: [organicEarring, haloImage, pantheonImage],
    shortDescription: "Compact huggies with a brushed outer face.",
    description:
      "Zenith sits tight to the lobe, with a rounded inner edge for comfort and a flat brushed outer face that reads as a small architectural detail. Secure hinged closure.",
    material: "14k solid gold",
    dimensions: "11 mm",
    weight: "1.4 g per earring",
    editorsNote: "For the second and third piercing.",
  },
  {
    id: 11,
    slug: "prism-chain-necklace",
    name: "Prism",
    category: "Necklaces",
    price: 135,
    images: [lintelImage, circularCollection, shadowlineAltImage],
    shortDescription: "Faceted links that scatter light along the collarbone.",
    description:
      "Every link in Prism is faceted on four sides, so the chain shifts between bright and matte as it moves. Fine enough to layer, substantial enough to wear alone.",
    material: "18k gold plated sterling silver",
    dimensions: "45 cm",
    weight: "5.2 g",
    editorsNote: "The layering chain we reach for most.",
    variationLabel: "Chain length",
    variations: ["42 cm", "45 cm", "50 cm"],
  },
  {
    id: 12,
    slug: "radiant-bangle",
    name: "Radiant",
    category: "Bracelets",
    price: 280,
    images: [linkBracelet, eclipseImage, shadowlineImage],
    shortDescription: "A solid bangle with a hand-hammered surface.",
    description:
      "Radiant is hammered by hand, so no two are identical. The texture is worked from the centre outwards, catching light in fine irregular planes. Our heaviest bracelet, and our most enduring.",
    material: "Recycled 18k gold vermeil",
    dimensions: "6.5 cm inner diameter, 5 mm round",
    weight: "28 g",
    editorsNote: "An heirloom, made now.",
    variationLabel: "Size",
    variations: ["Small", "Medium", "Large"],
    isBestSeller: true,
  },
];

export const formatPrice = (price: number) =>
  `€${price.toLocaleString("de-DE", { minimumFractionDigits: 0 })}`;

export const formatMoney = (value: number) =>
  `€${value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const getProductBySlug = (slug?: string) =>
  products.find((product) => product.slug === slug);

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.category === product.category ? 0 : 1;
      const bMatch = b.category === product.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);

export const newArrivals = products.filter((product) => product.isNew);
export const bestSellers = products.filter((product) => product.isBestSeller);

export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};