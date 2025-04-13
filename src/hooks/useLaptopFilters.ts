import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Laptop } from "@/types/laptop";
import { FilterOptions } from "@/components/LaptopFilter";

export const useLaptopFilters = (
  allLaptops: Laptop[],
  initialMinPrice: number,
  initialMaxPrice: number
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>(allLaptops);
  const [sortOption, setSortOption] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    brands: [],
    priceRange: [initialMinPrice, initialMaxPrice],
    cpuTypes: [],
    ramSizes: [],
    gpuTypes: [],
  });

  const applyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    let result = [...allLaptops];
    
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
    setSearchParams(prev => {
      prev.set("search", term);
      return prev;
    });
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
    setSearchParams(prev => {
      prev.set("sort", value);
      return prev;
    });
  };

  const resetFilters = () => {
    setSearchParams({});
    setSearchTerm("");
    setSortOption("featured");
    
    const resetFiltersState = {
      brands: [],
      priceRange: [initialMinPrice, initialMaxPrice],
      cpuTypes: [],
      ramSizes: [],
      gpuTypes: [],
    };
    
    setActiveFilters(resetFiltersState);
    setFilteredLaptops(allLaptops);
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
      priceRange: [initialMinPrice, initialMaxPrice],
      cpuTypes: [],
      ramSizes: [],
      gpuTypes: [],
    };
    
    setActiveFilters(initialFilters);
    applyFilters(initialFilters);
  }, [searchParams, initialMinPrice, initialMaxPrice, allLaptops]);

  // Re-apply filters when search term or sort option changes
  useEffect(() => {
    applyFilters(activeFilters);
  }, [searchTerm, sortOption]);

  return {
    filteredLaptops,
    sortOption,
    searchTerm,
    activeFilters,
    applyFilters,
    handleSearch,
    handleSortChange,
    resetFilters
  };
};

export default useLaptopFilters;
