import { laptops } from "@/data/laptops";
import { useLaptopFilters } from "@/hooks/useLaptopFilters";
import { getUniqueBrands, getPriceRange } from "@/utils/laptopUtils";
import PageLayout from "@/components/layout/PageLayout";
import LaptopFilter from "@/components/LaptopFilter";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import LaptopGrid from "@/components/catalog/LaptopGrid";
import NoResults from "@/components/catalog/NoResults";

export function Catalog() {
  // Получение уникальных брендов и диапазона цен
  const availableBrands = getUniqueBrands(laptops);
  const [minPrice, maxPrice] = getPriceRange(laptops);
  
  // Использование хука для управления фильтрацией и сортировкой
  const {
    filteredLaptops,
    sortOption,
    handleSearch,
    handleSortChange,
    applyFilters,
    resetFilters
  } = useLaptopFilters(laptops, minPrice, maxPrice);

  return (
    <PageLayout onSearch={handleSearch}>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Каталог ноутбуков</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковая панель с фильтрами */}
          <div className="lg:w-1/4">
            <LaptopFilter
              availableBrands={availableBrands}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onFilterChange={applyFilters}
            />
          </div>
          
          {/* Основной контент */}
          <div className="lg:w-3/4">
            <CatalogHeader 
              count={filteredLaptops.length}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
            
            {filteredLaptops.length > 0 ? (
              <LaptopGrid laptops={filteredLaptops} />
            ) : (
              <NoResults onReset={resetFilters} />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Catalog;
