import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBagDrawer from "./ShoppingBagDrawer";
import { useCart } from "@/context/CartContext";
import { productCategories } from "@/data/products";
import ringsCollection from "@/assets/rings-collection.png";
import earringsCollection from "@/assets/earrings-collection.png";
import foundersImage from "@/assets/founders.png";
import heroImage from "@/assets/hero-image.png";
import circularCollection from "@/assets/circular-collection.png";

interface NavItem {
  name: string;
  href: string;
  submenuItems: { label: string; href: string }[];
  images: { src: string; alt: string; label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: "Shop",
    href: "/shop",
    submenuItems: [
      { label: "All jewelry", href: "/shop" },
      ...productCategories.map((category) => ({
        label: category,
        href: `/shop?category=${category.toLowerCase()}`,
      })),
    ],
    images: [
      {
        src: ringsCollection,
        alt: "Rings collection",
        label: "Rings",
        href: "/shop?category=rings",
      },
      {
        src: earringsCollection,
        alt: "Earrings collection",
        label: "Earrings",
        href: "/shop?category=earrings",
      },
    ],
  },
  {
    name: "New In",
    href: "/shop?sort=newest",
    submenuItems: [
      { label: "This season's arrivals", href: "/shop?sort=newest" },
      { label: "Best sellers", href: "/shop?sort=featured" },
      { label: "Under €150", href: "/shop?max=150" },
      { label: "All jewelry", href: "/shop" },
    ],
    images: [
      {
        src: heroImage,
        alt: "New arrivals",
        label: "New arrivals",
        href: "/shop?sort=newest",
      },
      {
        src: circularCollection,
        alt: "Organic Forms collection",
        label: "Organic Forms",
        href: "/journal/behind-the-collection-organic-forms",
      },
    ],
  },
  {
    name: "About",
    href: "/about",
    submenuItems: [
      { label: "Our story", href: "/about" },
      { label: "Sustainability", href: "/about/sustainability" },
      { label: "Size guide", href: "/about/size-guide" },
      { label: "Customer care", href: "/about/customer-care" },
      { label: "Contact", href: "/contact" },
    ],
    images: [
      {
        src: foundersImage,
        alt: "LINEA founders",
        label: "Read our story",
        href: "/about",
      },
    ],
  },
  {
    name: "Journal",
    href: "/journal",
    submenuItems: [
      { label: "All articles", href: "/journal" },
      { label: "Guides", href: "/journal" },
      { label: "Materials", href: "/journal" },
      { label: "Care", href: "/journal" },
      { label: "Studio", href: "/journal" },
    ],
    images: [
      {
        src: earringsCollection,
        alt: "The Art of Everyday Gold",
        label: "The Art of Everyday Gold",
        href: "/journal/the-art-of-everyday-gold",
      },
    ],
  },
];

const popularSearches = [
  "Gold hoops",
  "Signet rings",
  "Silver bracelets",
  "Pendant necklaces",
  "Under €100",
  "New arrivals",
];

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalItems, openBag } = useCart();
  const navigate = useNavigate();

  const submitSearch = (term: string) => {
    setIsSearchOpen(false);
    setSearchTerm("");
    navigate(`/shop?q=${encodeURIComponent(term)}`);
  };

  return (
    <nav
      className="relative"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 mt-0.5 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 relative">
            <span
              className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1.5"
              }`}
            />
            <span
              className={`absolute block w-5 h-px bg-current transform transition-all duration-300 top-2.5 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-3.5"
              }`}
            />
          </div>
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light py-2 block"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="LINEA home"
        >
          <img src="/LINEA-1.svg" alt="LINEA" className="h-5 w-auto" />
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          <button
            className="hidden sm:block p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
            aria-label="Wishlist"
            onClick={() => setIsFavoritesOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          <button
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200 relative"
            aria-label="Shopping bag"
            onClick={openBag}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-black pointer-events-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop dropdown */}
      {activeDropdown && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 bg-background border-b border-border z-50"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8">
            <div className="flex justify-between w-full gap-12">
              <div className="flex-1">
                <ul className="space-y-2">
                  {navItems
                    .find((item) => item.name === activeDropdown)
                    ?.submenuItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          to={subItem.href}
                          onClick={() => setActiveDropdown(null)}
                          className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light block py-2"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex space-x-6">
                {navItems
                  .find((item) => item.name === activeDropdown)
                  ?.images.map((image) => (
                    <Link
                      key={image.label}
                      to={image.href}
                      onClick={() => setActiveDropdown(null)}
                      className="w-[320px] h-[240px] cursor-pointer group relative overflow-hidden block"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 text-white text-xs font-light flex items-center gap-1">
                        <span>{image.label}</span>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (searchTerm.trim()) submitSearch(searchTerm.trim());
                }}
                className="relative mb-8"
              >
                <div className="flex items-center border-b border-border pb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-nav-foreground mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search for jewelry..."
                    className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg font-light"
                    autoFocus
                  />
                </div>
              </form>

              <div>
                <h3 className="text-nav-foreground text-sm font-light mb-4">
                  Popular searches
                </h3>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => submitSearch(search)}
                      className="text-nav-foreground hover:text-nav-hover text-sm font-light py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-nav-hover"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border z-50 max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-8">
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-lg font-light block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <div className="mt-2 pl-4 space-y-2">
                    {item.submenuItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className="text-nav-foreground/70 hover:text-nav-hover text-sm font-light block py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/cart"
                className="text-nav-foreground text-lg font-light block py-2 border-t border-border pt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shopping bag ({totalItems})
              </Link>
            </div>
          </div>
        </div>
      )}

      <ShoppingBagDrawer />

      {/* Wishlist panel (visual only) */}
      {isFavoritesOpen && (
        <div className="fixed inset-0 z-50 h-screen">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFavoritesOpen(false)}
          />
          <div className="absolute right-0 top-0 h-screen w-full max-w-sm bg-background border-l border-border animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-light text-foreground">
                Your Wishlist
              </h2>
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Close wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
              <p className="text-sm font-light text-muted-foreground text-center">
                Your wishlist is empty.
                <br />
                Save pieces you love while you browse.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsFavoritesOpen(false)}
                className="text-sm font-light underline hover:opacity-60 transition-opacity"
              >
                Browse the collection
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
