import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Laptop, Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Laptop className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">ЛэптопМаркет</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-blue-600">
              Главная
            </Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-blue-600">
              Каталог
            </Link>
            <Link to="/comparison" className="text-sm font-medium hover:text-blue-600">
              Сравнение
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск ноутбуков..."
              className="w-[200px] lg:w-[300px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
                0
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;