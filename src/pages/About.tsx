import { Link } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import PageIntro from "@/components/shared/PageIntro";
import Newsletter from "@/components/shared/Newsletter";
import foundersImage from "@/assets/founders.png";
import heroImage from "@/assets/hero-image.png";
import ringsCollection from "@/assets/rings-collection.png";
import circularCollection from "@/assets/circular-collection.png";

const pillars = [
  {
    title: "Design philosophy",
    body: "We begin with a line and remove everything that does not serve it. Each piece is drawn by hand, tested in metal, and refined until nothing else can be taken away. The result is jewelry that reads quietly in a room and holds its shape for decades.",
  },
  {
    title: "Craftsmanship",
    body: "Our pieces are cast, filed, set and polished in a single studio in Antwerp by a team of six. Nothing leaves the bench until it has passed through the hands of the person who made it — which is why our collections stay small and our runs stay limited.",
  },
  {
    title: "Materials",
    body: "Recycled sterling silver and 18k gold vermeil, chosen for weight and longevity rather than shine. No plating over base metal, no hollow forms. Stones are cut in Antwerp and selected for clarity of form over carat.",
  },
  {
    title: "Responsible sourcing",
    body: "Metals come from SCS-certified recycled supply and refiners we visit in person. Stones are traceable to their cutting house. Our boxes are made from FSC board in Ghent, and every order ships plastic-free.",
  },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />

    <main className="pt-6">
      <PageIntro
        eyebrow="About"
        title="LINEA"
        description="Founded in Antwerp in 2016, LINEA makes minimalist jewelry in small, considered runs — pieces designed to be worn continuously rather than kept for occasions."
        crumbs={[{ label: "About" }]}
      />

      <section className="px-6 mb-20">
        <div className="aspect-[16/9] overflow-hidden bg-muted/10">
          <img
            src={foundersImage}
            alt="The LINEA founders in the Antwerp studio"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="px-6 mb-24">
        <div className="max-w-2xl">
          <p className="text-xl md:text-2xl font-light text-foreground leading-relaxed">
            We make very few things, and we make them properly.
          </p>
          <p className="text-sm font-light text-muted-foreground leading-relaxed mt-6">
            LINEA began with a single pair of earrings and a stubborn idea: that
            jewelry should be built like architecture — proportion first,
            ornament last. Ten years later the studio still works the same way.
            We release two collections a year, keep runs deliberately small, and
            repair anything we have ever made.
          </p>
        </div>
      </section>

      <section className="px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <h2 className="text-sm font-normal text-foreground mb-3 pb-3 border-b border-border">
                {pillar.title}
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { src: heroImage, caption: "Bench work, Kloosterstraat studio" },
            { src: ringsCollection, caption: "Hand-finished signet forms" },
            { src: circularCollection, caption: "Organic Forms, 2025" },
          ].map((item) => (
            <figure key={item.caption}>
              <div className="aspect-[4/5] overflow-hidden bg-muted/10">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs font-light text-muted-foreground mt-3">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-6 mb-24">
        <div className="max-w-2xl">
          <h2 className="text-sm font-normal text-foreground mb-3 pb-3 border-b border-border">
            Visit or write to us
          </h2>
          <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
            The studio at Kloosterstraat 42 is open by appointment for sizing,
            repairs and bespoke commissions.
          </p>
          <Link
            to="/contact"
            className="text-sm font-light text-foreground underline hover:opacity-60 transition-opacity"
          >
            Contact the studio
          </Link>
        </div>
      </section>

      <Newsletter />
    </main>

    <Footer />
  </div>
);

export default About;
