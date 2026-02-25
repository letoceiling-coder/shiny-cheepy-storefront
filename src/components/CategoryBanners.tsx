import categoryShoes from "@/assets/category-shoes.jpg";
import categoryBags from "@/assets/category-bags.jpg";

const banners = [
  { image: categoryShoes, title: "Лучшее в обуви", cta: "Смотреть" },
  { image: categoryBags, title: "Лучшее в аксессуарах", cta: "Смотреть" },
];

const CategoryBanners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      {banners.map((banner, i) => (
        <div
          key={i}
          className="relative h-[200px] rounded-2xl overflow-hidden group cursor-pointer"
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
