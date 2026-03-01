import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategorySliderControlsProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const CategorySliderControls = ({ current, total, onPrev, onNext }: CategorySliderControlsProps) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="flex flex-col gap-4">
      {/* Page indicator */}
      <div className="flex items-baseline gap-1 text-primary-foreground">
        <span className="text-2xl font-bold leading-none">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="text-sm text-primary-foreground/40 font-medium">
          / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-primary-foreground/15 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(340, 80%, 55%), hsl(262, 83%, 58%))",
          }}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={onPrev}
          className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:border-primary-foreground/40 hover:text-primary-foreground transition-colors"
          aria-label="Назад"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-sm font-medium text-primary-foreground/70">
          {current + 1}
        </span>
        <button
          onClick={onNext}
          className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:border-primary-foreground/40 hover:text-primary-foreground transition-colors"
          aria-label="Вперед"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CategorySliderControls;
