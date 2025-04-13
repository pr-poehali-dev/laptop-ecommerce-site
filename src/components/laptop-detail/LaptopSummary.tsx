import { Link } from "react-router-dom";
import { BarChart3, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Laptop } from "@/types/laptop";

interface LaptopSummaryProps {
  laptop: Laptop;
}

export function LaptopSummary({ laptop }: LaptopSummaryProps) {
  return (
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
  );
}

export default LaptopSummary;