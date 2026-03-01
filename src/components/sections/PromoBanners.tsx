import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const bannerRow1 = [
  {
    title: "Женские сумки",
    subtitle: "Широкий ассортимент от поставщиков",
    discount: "50%",
    slug: "zhenskie-sumki",
    gradient: "from-[hsl(262,83%,58%)] to-[hsl(280,90%,60%)]",
  },
  {
    title: "Женские пальто",
    subtitle: "Напрямую от поставщиков",
    discount: "20%",
    slug: "jenskie-palto",
    gradient: "from-[hsl(340,80%,55%)] to-[hsl(280,70%,60%)]",
  },
];

const bannerRow2 = [
  { title: "Женские костюмы", slug: "jenskie-kostumy", gradient: "from-[hsl(262,70%,55%)] to-[hsl(262,83%,68%)]" },
  { title: "Женские платья", slug: "platya", discount: "35%", gradient: "from-[hsl(340,80%,55%)] to-[hsl(340,80%,68%)]" },
  { title: "Детская одежда", slug: "detskaya-odezhda", gradient: "from-[hsl(280,70%,55%)] to-[hsl(280,90%,68%)]" },
  { title: "Куртки", slug: "jenskie-kurtki", gradient: "from-[hsl(340,60%,55%)] to-[hsl(262,83%,62%)]" },
];

const PromoBanners = () => {
  return (
    <section className="mb-10 space-y-4">
      {/* Row 1 - 2 banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bannerRow1.map((b) => (
          <Link
            key={b.slug}
            to={`/category/${b.slug}`}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${b.gradient} p-6 md:p-8 min-h-[160px] flex flex-col justify-between transition-shadow hover:shadow-lg`}
          >
            <div>
              <p className="text-sm text-primary-foreground/80 font-medium mb-1">{b.subtitle}</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-primary-foreground leading-tight">
                {b.title}
              </h3>
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground bg-primary-foreground/20 backdrop-blur px-4 py-1.5 rounded-full group-hover:bg-primary-foreground/30 transition-colors">
                Смотреть <ArrowRight className="w-3.5 h-3.5" />
              </span>
              {b.discount && (
                <span className="text-4xl md:text-5xl font-black text-primary-foreground/30">
                  -{b.discount}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Row 2 - 4 banners */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {bannerRow2.map((b) => (
          <Link
            key={b.slug}
            to={`/category/${b.slug}`}
            className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${b.gradient} p-4 md:p-5 min-h-[120px] md:min-h-[140px] flex flex-col justify-between transition-shadow hover:shadow-lg`}
          >
            <h3 className="text-base md:text-lg font-bold text-primary-foreground leading-tight">
              {b.title}
            </h3>
            <div className="flex items-end justify-between mt-3">
              {b.discount && (
                <span className="text-xs font-semibold text-primary-foreground bg-primary-foreground/20 backdrop-blur px-2.5 py-1 rounded-full">
                  Скидки до {b.discount}
                </span>
              )}
              <ArrowRight className="w-4 h-4 text-primary-foreground/60 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
