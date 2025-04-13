import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LaptopNotFound() {
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

export default LaptopNotFound;