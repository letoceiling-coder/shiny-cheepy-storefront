import { useState, useCallback, useRef, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import CategorySliderControls from "./CategorySliderControls";
import { popularCategories } from "@/data/marketplaceData";

// Extend categories to have 10 items for the slider
const sliderCategories = [
  ...popularCategories,
  { slug: "dzhinsy", name: "Джинсы", count: 340, image: popularCategories[1].image },
  { slug: "kostyumy", name: "Костюмы", count: 215, image: popularCategories[3].image },
  { slug: "futbolki", name: "Футболки", count: 1890, image: popularCategories[4].image },
  { slug: "shorty", name: "Шорты", count: 420, image: popularCategories[2].image },
];

const VISIBLE_DESKTOP = 4;
const VISIBLE_MOBILE = 2;

const CategorySliderSection = () => {
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

  // For infinite loop, we duplicate items so translateX works seamlessly
  const extendedItems = [...sliderCategories, ...sliderCategories, ...sliderCategories];
  const offset = total; // start from the middle copy

  return (
    <section className="mb-8 rounded-2xl overflow-hidden" style={{ background: "hsl(0, 0%, 13%)" }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left control panel */}
        <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-primary-foreground/10">
          <CategorySliderControls
            current={current}
            total={total}
            onPrev={prev}
            onNext={next}
          />
        </div>

        {/* Right - category cards with translateX carousel */}
        <div className="md:col-span-9 overflow-hidden">
          <div
            className="flex transition-transform duration-[350ms] ease-in-out h-full"
            style={{
              width: `${(extendedItems.length / visible) * 100}%`,
              transform: `translateX(-${((current + offset) * (100 / extendedItems.length))}%)`,
            }}
          >
            {extendedItems.map((cat, i) => (
              <div
                key={`${cat.slug}-${i}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: `${100 / extendedItems.length}%` }}
              >
                <CategoryCard
                  slug={cat.slug}
                  name={cat.name}
                  count={cat.count}
                  image={cat.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySliderSection;
