export const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const date = (daysAgo: number) => {
  const d = new Date(); d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};
export const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export const firstNames = ['Александр','Мария','Дмитрий','Елена','Сергей','Анна','Иван','Ольга','Артём','Наталья','Максим','Татьяна','Андрей','Екатерина','Михаил','Юлия','Николай','Светлана','Павел','Виктория'];
export const lastNames = ['Иванов','Петрова','Сидоров','Козлова','Смирнов','Новикова','Морозов','Волкова','Лебедев','Соколова','Кузнецов','Попова','Васильев','Федорова','Зайцев','Егорова','Павлов','Орлова','Семенов','Макарова'];
export const sellerNames = ['Fashion Hub','SportStyle','Glamour Shop','UrbanBag','DenimPro','ComfortWear','TrendLine','StylePoint','ModaPlus','LuxBrands'];
