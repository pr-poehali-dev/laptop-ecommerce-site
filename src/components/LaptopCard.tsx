import { Laptop } from "@/types/laptop";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Stars from "@/components/ui/stars";
import { formatPrice } from "@/lib/formatters";

interface LaptopCardProps {
  laptop: Laptop;
  onAddToCart?: (laptop: Laptop) => void;
}

export function LaptopCard({ laptop, onAddToCart }: LaptopCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(laptop);
    }
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <Link to={`/laptop/${laptop.id}`}>
          <img
            src={laptop.image}
            alt={laptop.name}
            className="h-48 w-full object-cover"
          />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 bg-white/80 hover:bg-white/90 dark:bg-gray-900/80 dark:hover:bg-gray-900/90"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2 space-y-1.5">
          <Link to={`/laptop/${laptop.id}`}>
            <h3 className="font-semibold line-clamp-2 hover:text-blue-600">
              {laptop.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{laptop.brand}</p>
        </div>
        
        <div className="mb-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Процессор</span>
            <span className="font-medium">{laptop.cpu}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Память</span>
            <span className="font-medium">{laptop.ram}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Накопитель</span>
            <span className="font-medium">{laptop.storage}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Stars rating={laptop.rating} size={14} />
          <span className="text-xs text-muted-foreground">
            ({laptop.reviewCount})
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between bg-muted/50 p-4">
        <div className="font-semibold text-lg">
          {formatPrice(laptop.price)}
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="gap-1"
          onClick={handleAddToCart}
          disabled={!laptop.inStock}
        >
          <ShoppingCart className="h-4 w-4" />
          {laptop.inStock ? "В корзину" : "Нет в наличии"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LaptopCard;