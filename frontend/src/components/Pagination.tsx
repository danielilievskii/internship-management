import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
                             currentPage,
                             totalPages,
                             pageSize,
                             totalItems,
                             onPageChange,
                           }: PaginationProps) => {
  if (totalPages === 0) return null;

  // ensure we show a max of 5 buttons around current page
  const visiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          Прва
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Претходна
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Следна
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Последна
        </Button>
      </div>

      {/* Info text */}
      <div className="text-sm text-muted-foreground">
        Резултати на страна: {pageSize} / Вкупно: {totalItems}
      </div>
    </div>
  );
};
