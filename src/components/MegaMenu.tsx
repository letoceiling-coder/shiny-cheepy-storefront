import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import CategoryIcon from "./CategoryIcon";

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu = ({ onClose }: MegaMenuProps) => {
  const [activeId, setActiveId] = useState<number>(categories[0].id);
  const menuRef = useRef<HTMLDivElement>(null);

  const active = categories.find((c) => c.id === activeId) || categories[0];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute left-0 right-0 top-full bg-popover border-t border-border shadow-lg z-[1100] animate-fade-in"
    >
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex gap-0 min-h-[480px]">
        {/* Left sidebar */}
        <div className="w-[260px] shrink-0 border-r border-border pr-2 overflow-y-auto max-h-[520px] no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              onMouseEnter={() => setActiveId(cat.id)}
              onClick={onClose}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                activeId === cat.id
                  ? "bg-secondary text-primary font-medium"
                  : "text-foreground hover:bg-secondary/60"
              }`}
            >
              <CategoryIcon icon={cat.icon || "grid"} className="w-4 h-4 shrink-0" />
              <span className="truncate flex-1">{cat.name}</span>
              {cat.subcategories.length > 0 && (
                <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
              )}
            </Link>
          ))}
        </div>

        {/* Right content */}
        <div className="flex-1 pl-6 overflow-y-auto max-h-[520px] no-scrollbar">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to={`/category/${active.slug}`}
              onClick={onClose}
              className="text-lg font-bold text-foreground hover:text-primary transition-colors"
            >
              {active.name}
            </Link>
            <span className="text-xs text-muted-foreground">
              {active.subcategories.length} подкатегорий
            </span>
          </div>

          {active.subcategories.length > 0 ? (
            <div className="grid grid-cols-3 gap-x-6 gap-y-1.5">
              {active.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to={`/category/${sub.slug}`}
                  onClick={onClose}
                  className="text-sm text-foreground hover:text-primary transition-colors py-1"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Все товары в категории</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
