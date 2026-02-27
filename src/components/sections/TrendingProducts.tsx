import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { trendingProducts, type TrendProduct } from "@/data/marketplaceData";

const TrendingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const TrendCard = ({ product }: { product: TrendProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const spanClasses = {
    tall: "row-span-2",
    wide: "col-span-2",
    normal: "",
  };

  return (
    <div
      className={`group relative bg-card rounded-xl overflow-hidden border border-border ${spanClasses[product.span]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative h-full min-h-[240px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

        {/* Trending badge */}
        <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <TrendingIcon />
          Trending
        </span>

        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Hover actions */}
        <div className={`absolute top-12 right-3 flex flex-col gap-1.5 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <button className="p-1.5 rounded-full bg-background/90 text-muted-foreground hover:text-primary transition-colors" aria-label="В избранное">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-sm font-medium text-primary-foreground line-clamp-1 mb-1">{product.name}</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-bold text-primary-foreground">{product.price.toLocaleString()} ₽</span>
            {product.oldPrice && (
              <span className="text-sm text-primary-foreground/60 line-through">{product.oldPrice.toLocaleString()} ₽</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-primary-foreground/70">
            <span className="text-accent">★</span>
            <span>{product.rating}</span>
            <span>·</span>
            <span>{product.reviews} отзывов</span>
          </div>
          <button
            className={`mt-2 w-full bg-primary-foreground text-foreground text-xs py-2 rounded-full font-medium flex items-center justify-center gap-1 transition-opacity duration-200 hover:opacity-90 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            В корзину
          </button>
        </div>
      </Link>
    </div>
  );
};

const TrendingProducts = () => {
  return (
    <section className="mb-10">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-xl font-bold text-foreground">ТРЕНДОВЫЕ ТОВАРЫ</h2>
      </div>
      {/* Masonry-like grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[240px] gap-3">
        {trendingProducts.map((product) => (
          <TrendCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
