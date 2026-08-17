import { useRef, useState } from "react";
import ImageZoom from "@/components/product/ImageZoom";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomInitialIndex, setZoomInitialIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);

  const openZoom = (index: number) => {
    setZoomInitialIndex(index);
    setIsZoomOpen(true);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      difference > 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full">
      {/* Desktop: stacked gallery */}
      <div className="hidden lg:block">
        <div className="space-y-4">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="w-full aspect-square overflow-hidden cursor-pointer group bg-muted/10"
              onClick={() => openZoom(index)}
            >
              <img
                src={image}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet / mobile: swipeable slider */}
      <div className="lg:hidden">
        <div className="relative">
          <div
            className="w-full aspect-square overflow-hidden cursor-pointer group touch-pan-y bg-muted/10"
            onClick={() => openZoom(currentIndex)}
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchMove={(e) => (touchEndX.current = e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[currentIndex]}
              alt={`${productName} view ${currentIndex + 1}`}
              className="w-full h-full object-cover select-none"
            />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-foreground" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ImageZoom
        images={images}
        initialIndex={zoomInitialIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
};

export default ProductGallery;