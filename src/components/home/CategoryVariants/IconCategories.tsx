import { Link } from "react-router-dom";
import { Shirt, Footprints, Briefcase, Sparkles, Dumbbell, Watch } from "lucide-react";
import { popularCategories } from "@/data/marketplaceData";

interface IconCategoriesProps {
  visible?: boolean;
}

const icons = [Shirt, Footprints, Briefcase, Sparkles, Dumbbell, Watch];

const IconCategories = ({ visible = true }: IconCategoriesProps) => {
  if (!visible) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-5">КАТЕГОРИИ</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {popularCategories.map((cat, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} товаров</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default IconCategories;
