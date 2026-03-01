import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { popularCategories } from "@/data/marketplaceData";

const sliderCategories = [
  ...popularCategories,
  { slug: "dzhinsy", name: "Джинсы", count: 340, image: popularCategories[1].image },
  { slug: "kostyumy", name: "Костюмы", count: 215, image: popularCategories[3].image },
  { slug: "futbolki", name: "Футболки", count: 1890, image: popularCategories[4].image },
  { slug: "shorty", name: "Шорты", count: 420, image: popularCategories[2].image },
];

const VISIBLE_DESKTOP = 4;
const VISIBLE_MOBILE = 2;

const LightCategoryNav = () => {
  const [current, setCurrent] = useState(0);
  const total = sliderCategories.length;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const extendedItems = [...sliderCategories, ...sliderCategories, ...sliderCategories];
  const offset = total;
  const progress = ((current + 1) / total) * 100;

  return (
    <section className="mt-12 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Left controls */}
        <div className="flex-shrink-0 flex flex-col gap-3 min-w-[140px]">
          {/* Page indicator */}
          <div className="flex items-baseline gap-1 text-foreground">
            <span className="text-lg font-bold leading-none">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-muted-foreground font-normal">
              / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-[2px] bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-in-out bg-destructive"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Назад"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-sm font-medium text-foreground">
              {current + 1}
            </span>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Вперед"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right - cards carousel */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-[350ms] ease-in-out"
            style={{
              width: `${(extendedItems.length / visible) * 100}%`,
              transform: `translateX(-${((current + offset) * (100 / extendedItems.length))}%)`,
            }}
          >
            {extendedItems.map((cat, i) => (
              <div
                key={`light-${cat.slug}-${i}`}
                className="flex-shrink-0"
                style={{ width: `${100 / extendedItems.length}%` }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group flex items-center gap-3 px-3 py-2"
                >
                  <div className="w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">{cat.name}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block flex-shrink-0" />
                      {cat.count} товаров
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-auto transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightCategoryNav;
