import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLaptopById, getReviewsByLaptopId } from "@/data/laptops";
import { Laptop } from "@/types/laptop";
import Header from "@/components/Header";
import Stars from "@/components/ui/stars";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  BarChart3, 
  Truck, 
  Shield 
} from "lucide-react";
import { formatPrice } from "@/lib/formatters";

export function LaptopDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("specs");
  
  if (!id) {
    return <div>ID не указан</div>;
  }
  
  const laptop = getLaptopById(id);
  
  if (!laptop) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Ноутбук не найден</h1>
        <p className="mb-6 text-muted-foreground">
          К сожалению, данная модель отсутствует в нашей базе данных
        </p>
        <Button asChild>
          <Link to="/catalog">Вернуться в каталог</Link>
        </Button>
      </div>
    );
  }
  
  const reviews = getReviewsByLaptopId(id);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/catalog" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Назад в каталог
            </Link>
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold">{laptop.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Stars rating={laptop.rating} size={20} />
            <span className="text-sm text-muted-foreground">
              {laptop.rating.toFixed(1)} ({laptop.reviewCount} отзывов)
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Изображение */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <img
              src={laptop.image}
              alt={laptop.name}
              className="h-full w-full object-contain"
            />
          </div>
          
          {/* Основная информация */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Основные характеристики</h2>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Бренд</span>
                  <span className="font-medium">{laptop.brand}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Процессор</span>
                  <span className="font-medium">{laptop.cpu}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Оперативная память</span>
                  <span className="font-medium">{laptop.ram}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Накопитель</span>
                  <span className="font-medium">{laptop.storage}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Видеокарта</span>
                  <span className="font-medium">{laptop.gpu}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Дисплей</span>
                  <span className="font-medium">{laptop.display}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                asChild 
                variant="outline" 
                size="sm"
                className="gap-1"
              >
                <Link to={`/comparison?ids=${laptop.id}`}>
                  <BarChart3 className="h-4 w-4" />
                  Добавить к сравнению
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="gap-1"
              >
                <Heart className="h-4 w-4" />
                В избранное
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="gap-1"
              >
                <Share2 className="h-4 w-4" />
                Поделиться
              </Button>
            </div>
          </div>
          
          {/* Покупка */}
          <div className="lg:border-l lg:pl-8">
            <div className="rounded-lg border p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-2xl font-bold">{formatPrice(laptop.price)}</span>
                {laptop.inStock ? (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    В наличии
                  </span>
                ) : (
                  <span className="text-sm text-red-500">Нет в наличии</span>
                )}
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full gap-2"
                  size="lg"
                  disabled={!laptop.inStock}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Добавить в корзину
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Купить в 1 клик
                </Button>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Доставка</p>
                    <p className="text-muted-foreground">Бесплатно от 3000 ₽</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Гарантия</p>
                    <p className="text-muted-foreground">12 месяцев</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="specs" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Процессор и память</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Процессор</span>
                      <span className="font-medium">{laptop.cpu}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Оперативная память</span>
                      <span className="font-medium">{laptop.ram}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Накопитель</span>
                      <span className="font-medium">{laptop.storage}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Видеокарта</span>
                      <span className="font-medium">{laptop.gpu}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Дисплей</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Дисплей</span>
                      <span className="font-medium">{laptop.display}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Корпус и интерфейсы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Вес</span>
                      <span className="font-medium">{laptop.weight}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Батарея</span>
                      <span className="font-medium">{laptop.battery}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Операционная система</span>
                      <span className="font-medium">{laptop.os}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Порты</span>
                      <span className="font-medium">{laptop.ports.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("ru-RU")}
                        </div>
                      </div>
                      <Stars rating={review.rating} size={16} className="mb-2" />
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Нет отзывов для этой модели</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-900 py-6 text-gray-300">
        <div className="container text-center text-sm">
          &copy; 2023 ЛэптопМаркет. Все права защищены.
        </div>
      </footer>
    </div>
  );
}

export default LaptopDetail;