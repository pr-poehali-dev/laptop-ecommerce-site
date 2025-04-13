import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import ComparisonTable from "@/components/ComparisonTable";
import { Laptop } from "@/types/laptop";
import { laptops, getLaptopById } from "@/data/laptops";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Comparison() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [comparedLaptops, setComparedLaptops] = useState<Laptop[]>([]);
  
  useEffect(() => {
    const ids = searchParams.get("ids");
    if (ids) {
      const laptopIds = ids.split(",");
      const foundLaptops = laptopIds
        .map(id => getLaptopById(id))
        .filter((laptop): laptop is Laptop => laptop !== undefined);
      
      setComparedLaptops(foundLaptops);
    }
  }, [searchParams]);
  
  const handleRemoveLaptop = (id: string) => {
    const updatedLaptops = comparedLaptops.filter(laptop => laptop.id !== id);
    setComparedLaptops(updatedLaptops);
    
    // Update URL
    if (updatedLaptops.length > 0) {
      const newIds = updatedLaptops.map(laptop => laptop.id).join(",");
      setSearchParams({ ids: newIds });
    } else {
      setSearchParams({});
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/catalog" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Назад в каталог
            </Link>
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold">Сравнение ноутбуков</h1>
          <p className="mt-2 text-muted-foreground">
            Сравните характеристики выбранных моделей
          </p>
        </div>
        
        <ComparisonTable 
          laptops={comparedLaptops} 
          onRemove={handleRemoveLaptop} 
        />
        
        {comparedLaptops.length < 3 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Добавьте еще ноутбуки для сравнения</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {laptops
                .filter(laptop => !comparedLaptops.some(l => l.id === laptop.id))
                .slice(0, 4)
                .map(laptop => (
                  <div key={laptop.id} className="rounded-lg border p-4 text-center">
                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="h-24 w-full object-contain mb-3"
                    />
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">{laptop.name}</h3>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        const newLaptops = [...comparedLaptops, laptop];
                        setComparedLaptops(newLaptops);
                        const newIds = newLaptops.map(l => l.id).join(",");
                        setSearchParams({ ids: newIds });
                      }}
                    >
                      Добавить
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-900 py-6 text-gray-300">
        <div className="container text-center text-sm">
          &copy; 2023 ЛэптопМаркет. Все права защищены.
        </div>
      </footer>
    </div>
  );
}

export default Comparison;