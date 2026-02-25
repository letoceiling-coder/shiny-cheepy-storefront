import { useState, useEffect, useRef } from "react";
import { Search, User, Heart, ShoppingCart, Grid2X2, ChevronDown, MapPin, Send } from "lucide-react";
import MegaMenu from "./MegaMenu";

const Header = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsCompact(currentScrollY > 80);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setShowCategories(false);
        setShowCurrency(false);
        setShowCity(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currencies = ["RUB", "USD", "EUR", "KZT"];
  const cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"];
  const [selectedCurrency, setSelectedCurrency] = useState("RUB");
  const [selectedCity, setSelectedCity] = useState("Москва");

  const navLinks = ["Мужское", "Женское", "Обувь и одежда", "Избранное", "Доставка", "Правила площадки", "Поддержка"];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 ${isCompact ? "py-2" : "py-0"}`}
      >
        {/* Top bar - hidden when compact */}
        <div
          className={`max-w-[1400px] mx-auto px-4 transition-all duration-300 overflow-hidden ${
            isCompact ? "max-h-0 opacity-0" : "max-h-12 opacity-100 py-2"
          }`}
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {/* Currency */}
              <div className="relative">
                <button
                  onClick={() => { setShowCurrency(!showCurrency); setShowCity(false); }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full border border-border text-foreground hover:border-primary transition-colors"
                >
                  {selectedCurrency}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showCurrency && (
                  <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg py-1 z-50 animate-slide-down min-w-[80px]">
                    {currencies.map(c => (
                      <button key={c} onClick={() => { setSelectedCurrency(c); setShowCurrency(false); }}
                        className="block w-full text-left px-3 py-1.5 hover:bg-secondary transition-colors text-popover-foreground">
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* City */}
              <div className="relative">
                <button
                  onClick={() => { setShowCity(!showCity); setShowCurrency(false); }}
                  className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  {selectedCity}
                </button>
                {showCity && (
                  <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg py-1 z-50 animate-slide-down min-w-[180px]">
                    {cities.map(c => (
                      <button key={c} onClick={() => { setSelectedCity(c); setShowCity(false); }}
                        className="block w-full text-left px-3 py-1.5 hover:bg-secondary transition-colors text-popover-foreground">
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="text-primary hover:underline transition-colors">
                Укажите адрес доставки
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-muted-foreground">
              <button className="px-3 py-1 border border-border rounded-full hover:border-primary hover:text-foreground transition-colors">Стать продавцом</button>
              <span className="hover:text-foreground transition-colors cursor-pointer">Оптовым покупателям</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Правила площадки</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Доставка</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Поддержка</span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className={`max-w-[1400px] mx-auto px-4 transition-all duration-300 ${isCompact ? "py-1.5" : "py-3"}`}>
          <div className="flex items-center gap-4">
            {/* Logo */}
            <a href="/" className="text-2xl font-extrabold text-foreground shrink-0">Cheepy</a>

            {/* Categories button */}
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="gradient-primary text-primary-foreground px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold text-sm shrink-0 hover:opacity-90 transition-opacity"
            >
              <Grid2X2 className="w-4 h-4" />
              Категории
            </button>

            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Искать на Cheepy"
                className="w-full border-2 border-primary/30 rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:border-primary transition-colors bg-background text-foreground placeholder:text-muted-foreground"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 gradient-primary p-2 rounded-full text-primary-foreground">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-5 shrink-0">
              <button className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors">
                <User className="w-5 h-5" />
                <span className="text-xs">Войти</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-primary hover:opacity-80 transition-opacity">
                <Heart className="w-5 h-5" />
                <span className="text-xs">Избранное</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs">Корзина</span>
              </button>
            </div>
          </div>
        </div>

        {/* Nav links - hidden when compact */}
        <div
          className={`max-w-[1400px] mx-auto px-4 transition-all duration-300 overflow-hidden hidden lg:block ${
            isCompact ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div className="flex items-center gap-1">
              {navLinks.map(link => (
                <button key={link} className="px-3 py-1.5 text-sm rounded-full hover:bg-secondary text-foreground transition-colors">
                  {link}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              {["YouTube", "VK", "OK", "TG"].map(s => (
                <span key={s} className="text-xs hover:text-foreground cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {showCategories && (
          <MegaMenu onClose={() => setShowCategories(false)} />
        )}
      </header>

      {/* Spacer */}
      <div className={`transition-all duration-300 ${isCompact ? "h-[60px]" : "h-[140px] lg:h-[160px]"}`} />
    </>
  );
};

export default Header;
