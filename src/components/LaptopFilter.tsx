import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/formatters";

export interface FilterOptions {
  brands: string[];
  priceRange: [number, number];
  cpuTypes: string[];
  ramSizes: string[];
  gpuTypes: string[];
}

interface LaptopFilterProps {
  availableBrands: string[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: FilterOptions) => void;
}

export function LaptopFilter({
  availableBrands,
  minPrice,
  maxPrice,
  onFilterChange,
}: LaptopFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    priceRange: [minPrice, maxPrice],
    cpuTypes: [],
    ramSizes: [],
    gpuTypes: [],
  });

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    
    const updatedFilters = { ...filters, brands: updatedBrands };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (values: number[]) => {
    const updatedFilters = { ...filters, priceRange: [values[0], values[1]] as [number, number] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      brands: [],
      priceRange: [minPrice, maxPrice],
      cpuTypes: [],
      ramSizes: [],
      gpuTypes: [],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Фильтры</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleResetFilters}
        >
          Сбросить
        </Button>
      </div>

      <div className="space-y-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h3 className="text-sm font-medium">Бренды</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="space-y-2">
              {availableBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label 
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h3 className="text-sm font-medium">Цена</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4">
              <Slider
                defaultValue={[minPrice, maxPrice]}
                min={minPrice}
                max={maxPrice}
                step={1000}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between text-sm">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

export default LaptopFilter;