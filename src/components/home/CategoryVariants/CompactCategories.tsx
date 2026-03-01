import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { popularCategories } from "@/data/marketplaceData";

interface CompactCategoriesProps {
  visible?: boolean;
}

const CompactCategories = ({ visible = true }: CompactCategoriesProps) => {
  if (!visible) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-5">КОМПАКТНЫЕ КАТЕГОРИИ</h2>
      <div className="flex flex-wrap gap-2">
        {popularCategories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-8 h-8 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-sm font-medium text-foreground">{cat.name}</span>
            <span className="text-xs text-muted-foreground">{cat.count}</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CompactCategories;
