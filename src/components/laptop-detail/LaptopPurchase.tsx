import { CheckCircle2, ShoppingCart, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Laptop } from "@/types/laptop";
import { formatPrice } from "@/lib/formatters";

interface LaptopPurchaseProps {
  laptop: Laptop;
}

export function LaptopPurchase({ laptop }: LaptopPurchaseProps) {
  return (
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
  );
}

export default LaptopPurchase;