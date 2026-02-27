import promo1 from "@/assets/cheepy/promo-1.jpg";
import promo2 from "@/assets/cheepy/promo-2.jpg";

const banners = [
  { image: promo1, title: "Лучшее в обуви", cta: "Смотреть" },
  { image: promo2, title: "Лучшее в аксессуарах", cta: "Смотреть" },
];

const CategoryBanners = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`relative h-[200px] rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? "col-span-2" : "col-span-1"}`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 gradient-hero opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">{banner.title}</h3>
              <button className="bg-background text-foreground px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                {banner.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryBanners;
