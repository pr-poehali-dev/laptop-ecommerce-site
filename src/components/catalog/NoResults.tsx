import { Button } from "@/components/ui/button";

interface NoResultsProps {
  onReset: () => void;
}

export function NoResults({ onReset }: NoResultsProps) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center">
      <h3 className="mb-2 text-lg font-medium">Ничего не найдено</h3>
      <p className="text-muted-foreground mb-4">
        Попробуйте изменить параметры поиска или фильтры
      </p>
      <Button variant="outline" onClick={onReset}>
        Сбросить все фильтры
      </Button>
    </div>
  );
}

export default NoResults;