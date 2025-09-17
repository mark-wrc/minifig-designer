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
import { IGeneralPaginationProps } from './GeneralPagination.types';
import { cn } from '@/utils/cn';

const GeneralPagination = memo<IGeneralPaginationProps>(
  ({ currentPage, totalPages, onPageChange }) => {
    const pages = useMemo<(number | string)[]>(() => {
      const result: (number | string)[] = [];
      result.push(1);

      /* Add leading ellipsis if far from start  */

      if (currentPage > 3) result.push('...');

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        result.push(i);
      }

      /* Add trailing ellipsis if far from end  */

      if (currentPage < totalPages - 2) result.push('...');

      /* Always include last page if more than 1  */

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
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {pages.map((page, idx) => {
            const isCurrentPage = page === currentPage;
            return (
              <PaginationItem key={idx}>
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    className={cn(isCurrentPage && 'bg-yellow-400 text-black hover:text-white')}
                    isActive={isCurrentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
              aria-disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
);

GeneralPagination.displayName = 'GeneralPagination';
export default GeneralPagination;
