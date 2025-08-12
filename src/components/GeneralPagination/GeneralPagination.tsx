import { memo, useMemo, useCallback } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export interface GeneralPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const GeneralPagination = memo(
  ({ currentPage, totalPages, onPageChange }: GeneralPaginationProps) => {
    const pages = useMemo<(number | string)[]>(() => {
      const result: (number | string)[] = [];
      result.push(1);

      if (currentPage > 3) result.push('...');

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        result.push(i);
      }

      if (currentPage < totalPages - 2) result.push('...');

      if (totalPages > 1) result.push(totalPages);

      return result;
    }, [currentPage, totalPages]);

    const handlePageChange = useCallback(
      (page: number | string) => {
        if (typeof page === 'number' && page !== currentPage) {
          onPageChange(page);
        }
      },
      [onPageChange, currentPage],
    );

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {pages.map((page, idx) => (
            <PaginationItem key={idx}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
);

GeneralPagination.displayName = 'GeneralPagination';
export default GeneralPagination;
