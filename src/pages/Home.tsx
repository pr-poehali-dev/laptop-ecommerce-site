import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { laptops } from "@/data/laptops";
import LaptopCard from "@/components/LaptopCard";
import Header from "@/components/Header";
import { Search, BarChart2, MessageSquare } from "lucide-react";

export function Home() {
  const featuredLaptops = laptops.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Баннер */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container flex flex-col-reverse md:flex-row items-center py-12 md:py-24">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold">
                Найдите идеальный ноутбук для ваших задач
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Широкий ассортимент моделей от ведущих производителей с подробным описанием и честными отзывами
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link to="/catalog">Перейти в каталог</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                  <Link to="/comparison">Сравнить модели</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
              <img
                src="/placeholder.svg"
                alt="Ноутбуки"
                className="max-w-full h-auto"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>

        {/* Популярные модели */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Популярные модели</h2>
              <Button asChild variant="outline">
                <Link to="/catalog">Смотреть все</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredLaptops.map((laptop) => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="bg-gray-50 py-12 dark:bg-gray-900">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold">Наши преимущества</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Удобный поиск</h3>
                <p className="text-muted-foreground">
                  Быстро находите нужные модели с помощью расширенных фильтров и сортировки
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Детальное сравнение</h3>
                <p className="text-muted-foreground">
                  Сравнивайте характеристики нескольких моделей в удобной таблице
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Честные отзывы</h3>
                <p className="text-muted-foreground">
                  Читайте реальные отзывы покупателей о каждой модели ноутбука
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-gray-300">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-white">ЛэптопМаркет</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                Ваш надежный партнер в выборе идеального ноутбука для работы, учебы и развлечений
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="mb-3 text-sm font-medium text-white">Информация</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-white">О компании</Link></li>
                  <li><Link to="/delivery" className="hover:text-white">Доставка</Link></li>
                  <li><Link to="/payment" className="hover:text-white">Оплата</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="mb-3 text-sm font-medium text-white">Каталог</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/catalog" className="hover:text-white">Все ноутбуки</Link></li>
                  <li><Link to="/catalog?brand=Lenovo" className="hover:text-white">Lenovo</Link></li>
                  <li><Link to="/catalog?brand=Apple" className="hover:text-white">Apple</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="mb-3 text-sm font-medium text-white">Контакты</h3>
                <ul className="space-y-2 text-sm">
                  <li>+7 (800) 555-35-35</li>
                  <li>info@laptopmarket.ru</li>
                  <li>г. Москва, ул. Цифровая, 42</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            &copy; 2023 ЛэптопМаркет. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;