import { useState } from "react";
import { Heart, ShoppingCart, BarChart2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  seller: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;
    const idx = Math.min(Math.floor(x / third), product.images.length - 1);
    setActiveImage(idx);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-card rounded-xl overflow-hidden transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setActiveImage(0); }}
    >
      {/* Image area with 3-zone hover */}
      <div
        className="relative aspect-[3/4] overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
      >
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              i === activeImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Image indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {product.images.length > 1 && product.images.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all duration-200 ${
                i === activeImage ? "w-4 bg-primary" : "w-2 bg-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 gradient-hero text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Action icons - visible on hover */}
        <div className={`absolute top-2 right-2 flex flex-col gap-1.5 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
            className={`p-1.5 rounded-full bg-background/90 transition-colors ${isFavorite ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-primary" : ""}`} />
          </button>
          <button className="p-1.5 rounded-full bg-background/90 text-muted-foreground hover:text-primary transition-colors">
            <BarChart2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full bg-background/90 text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-bold text-foreground">{product.price.toLocaleString()} ₽</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</span>
          )}
        </div>
        <p className="text-sm text-foreground line-clamp-2 mb-1">{product.name}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="text-yellow-500">★</span>
          <span>{product.rating}</span>
          <span>·</span>
          <span>{product.reviews} отзывов</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{product.seller}</p>

        {/* Extra info on hover */}
        <div className={`transition-all duration-200 overflow-hidden ${isHovered ? "max-h-10 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
          <button className="w-full gradient-primary text-primary-foreground text-xs py-1.5 rounded-full font-medium">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
