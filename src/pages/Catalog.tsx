import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { laptops } from "@/data/laptops";
import { Laptop } from "@/types/laptop";
import Header from "@/components/Header";
import LaptopCard from "@/components/LaptopCard";
import LaptopFilter, { FilterOptions } from "@/components/LaptopFilter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpZA, CircleDollarSign } from "lucide-react";

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>(laptops);
  const [sortOption, setSortOption] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique brands
  const availableBrands = Array.from(new Set(laptops.map(laptop => laptop.brand)));
  
  // Get min and max price
  const prices = laptops.map(laptop => laptop.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const applyFilters = (filters: FilterOptions) => {
    let result = [...laptops];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(laptop => 
        laptop.name.toLowerCase().includes(term) || 
        laptop.brand.toLowerCase().includes(term) ||
        laptop.cpu.toLowerCase().includes(term)
      );
    }
    
    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(laptop => filters.brands.includes(laptop.brand));
    }
    
    // Apply price filter
    result = result.filter(laptop => 
      laptop.price >= filters.priceRange[0] && laptop.price <= filters.priceRange[1]
    );
    
    // Apply sorting
    result = sortLaptops(result, sortOption);
    
    setFilteredLaptops(result);
  };

  const sortLaptops = (laptopsToSort: Laptop[], option: string): Laptop[] => {
    const sortedLaptops = [...laptopsToSort];
    
    switch (option) {
      case "price-asc":
        return sortedLaptops.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortedLaptops.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sortedLaptops.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedLaptops.sort((a, b) => b.name.localeCompare(a.name));
      case "rating":
        return sortedLaptops.sort((a, b) => b.rating - a.rating);
      default:
        return sortedLaptops; // featured or default
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ search: term });
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
    setSearchParams(prev => {
      prev.set("sort", value);
      return prev;
    });
  };

  // Initialize from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    const sortFromUrl = searchParams.get("sort") || "featured";
    const brandFromUrl = searchParams.get("brand") || "";
    
    setSearchTerm(searchFromUrl);
    setSortOption(sortFromUrl);
    
    // Apply initial filters
    const initialFilters: FilterOptions = {
      brands: brandFromUrl ? [brandFromUrl] : [],
      priceRange: [minPrice, maxPrice],
      cpuTypes: [],
      ramSizes: [],
      gpuTypes: [],
    };
    
    applyFilters(initialFilters);
  }, [searchParams]);

  useEffect(() => {
    // Re-apply filters when search term or sort option changes
    applyFilters({
      brands: [],
      priceRange: [minPrice, maxPrice],
      cpuTypes: [],
      ramSizes: [],
      gpuTypes: [],
    });
  }, [searchTerm, sortOption]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="flex-1 container py-8">
        <h1 className="text-2xl font-bold mb-6">Каталог ноутбуков</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="lg:w-1/4">
            <LaptopFilter
              availableBrands={availableBrands}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onFilterChange={applyFilters}
            />
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Найдено: {filteredLaptops.length} моделей
              </div>
              
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">По популярности</SelectItem>
                  <SelectItem value="price-asc">
                    <div className="flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4" />
                      По возрастанию цены
                    </div>
                  </SelectItem>
                  <SelectItem value="price-desc">
                    <div className="flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4" />
                      По убыванию цены
                    </div>
                  </SelectItem>
                  <SelectItem value="name-asc">
                    <div className="flex items-center gap-2">
                      <ArrowDownAZ className="h-4 w-4" />
                      По названию (А-Я)
                    </div>
                  </SelectItem>
                  <SelectItem value="name-desc">
                    <div className="flex items-center gap-2">
                      <ArrowUpZA className="h-4 w-4" />
                      По названию (Я-А)
                    </div>
                  </SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredLaptops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLaptops.map((laptop) => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchParams({});
                    setSearchTerm("");
                    setSortOption("featured");
                    setFilteredLaptops(laptops);
                  }}
                >
                  Сбросить все фильтры
                </Button>
              </div>
            )}
          </div>
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

export default Catalog;