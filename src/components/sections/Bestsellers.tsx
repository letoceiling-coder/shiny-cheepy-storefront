import { useState } from "react";
import { Heart, ShoppingCart, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { bestsellers, type BestsellProduct } from "@/data/marketplaceData";

const BestsellerCard = ({ product }: { product: BestsellProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;
    setActiveImage(Math.min(Math.floor(x / third), product.images.length - 1));
  };

  return (
    <div
      className="group bg-card rounded-xl overflow-hidden border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setActiveImage(0); }}
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary" onMouseMove={handleMouseMove}>
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${i === activeImage ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {/* Hit badge */}
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Хит
        </span>
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {/* Image indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {product.images.length > 1 && product.images.map((_, i) => (
            <div key={i} className={`h-0.5 rounded-full transition-all duration-200 ${i === activeImage ? "w-4 bg-primary" : "w-2 bg-foreground/30"}`} />
          ))}
        </div>
        {/* Hover actions */}
        <div className={`absolute top-10 right-2 flex flex-col gap-1.5 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <button className="p-1.5 rounded-full bg-background/90 text-muted-foreground hover:text-primary transition-colors" aria-label="В избранное">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full bg-background/90 text-muted-foreground hover:text-primary transition-colors" aria-label="Сравнить">
            <BarChart2 className="w-4 h-4" />
          </button>
        </div>
      </Link>
      <div className="p-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-bold text-foreground">{product.price.toLocaleString()} ₽</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</span>
          )}
        </div>
        <p className="text-sm text-foreground line-clamp-2 mb-1">{product.name}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <span className="text-accent">★</span>
          <span>{product.rating}</span>
          <span>·</span>
          <span>{product.reviews} отзывов</span>
        </div>
        <p className="text-xs text-muted-foreground">{product.seller} · {product.sold.toLocaleString()} продаж</p>
        <div className="mt-3 min-h-[32px]">
          <button
            className={`w-full gradient-primary text-primary-foreground text-xs py-1.5 rounded-full font-medium flex items-center justify-center gap-1 transition-opacity duration-200 hover:opacity-90 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

const Bestsellers = () => {
  const sorted = [...bestsellers].sort((a, b) => b.sold - a.sold);

  return (
    <section className="mb-10">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-xl font-bold text-foreground">ХИТЫ ПРОДАЖ</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {sorted.map((product) => (
          <BestsellerCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;
