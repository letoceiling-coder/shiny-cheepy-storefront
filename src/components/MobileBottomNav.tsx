import { Home, Grid2X2, Heart, ShoppingCart, User } from "lucide-react";

const MobileBottomNav = () => {
  const items = [
    { icon: Home, label: "Главная", active: true },
    { icon: Grid2X2, label: "Категории", active: false },
    { icon: Heart, label: "Избранное", active: false },
    { icon: ShoppingCart, label: "Корзина", active: false },
    { icon: User, label: "Профиль", active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                item.active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
