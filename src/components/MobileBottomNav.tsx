import { Home, Grid2X2, Heart, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import MobileCatalogMenu from "./MobileCatalogMenu";

const MobileBottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const { count: favCount } = useFavorites();
  const [catalogOpen, setCatalogOpen] = useState(false);

  const items = [
    { icon: Home, label: "Главная", to: "/", action: undefined },
    { icon: Grid2X2, label: "Категории", to: undefined, action: () => setCatalogOpen(true) },
    { icon: Heart, label: "Избранное", to: "/favorites", badge: favCount, action: undefined },
    { icon: ShoppingCart, label: "Корзина", to: "/cart", badge: totalItems, action: undefined },
    { icon: User, label: "Профиль", to: isAuthenticated ? "/account" : "/auth", action: undefined },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
        <div className="flex items-center justify-around py-2">
          {items.map(item => {
            const Icon = item.icon;
            const isActive = item.to ? (location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to))) : false;

            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex flex-col items-center gap-0.5 text-xs text-muted-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to!}
                className={`flex flex-col items-center gap-0.5 text-xs transition-colors relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 right-0 w-4 h-4 rounded-full gradient-hero text-primary-foreground text-[10px] font-bold flex items-center justify-center">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      <MobileCatalogMenu open={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </>
  );
};

export default MobileBottomNav;
