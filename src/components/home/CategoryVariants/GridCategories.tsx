import { Link } from "react-router-dom";
import { popularCategories } from "@/data/marketplaceData";

interface GridCategoriesProps {
  visible?: boolean;
}

// Extend to 9 for 3x3
const extendedCategories = [
  ...popularCategories,
  { slug: "dzhinsy", name: "Джинсы", count: 340, image: popularCategories[1].image },
  { slug: "kostyumy", name: "Костюмы", count: 215, image: popularCategories[3].image },
  { slug: "futbolki", name: "Футболки", count: 1890, image: popularCategories[4].image },
];

const GridCategories = ({ visible = true }: GridCategoriesProps) => {
  if (!visible) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-5">ВСЕ КАТЕГОРИИ</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {extendedCategories.slice(0, 9).map((cat) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="group relative h-[120px] md:h-[140px] rounded-xl overflow-hidden"
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/45 group-hover:bg-foreground/55 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <div>
                <h3 className="text-base font-bold text-primary-foreground">{cat.name}</h3>
                <p className="text-xs text-primary-foreground/70">{cat.count.toLocaleString()} товаров</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GridCategories;
