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
import { cn } from '@/lib/utils';

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
              className="bg-red-800 border-l-8 border-t-6 border-b-6 border-b-transparent hover:border-b-0 active:border-b-0 hover:border-l-transparent hover:-translate-x-0.5 active:border-t-0 hover:border-t-0 border-l-red-900 border-t-red-700 hover:bg-red-700 shadow-lg shadow-red-700/50 transition-all duration-75 text-white hover:text-white  active:border-l-0 active:bg-red-700"
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
                    className={cn(
                      'bg-gray-800 text-white border-l-8 border-t-6 border-l-gray-900 border-t-gray-700 hover:bg-gray-700 hover:text-white shadow-lg shadow-gray-900/50 hover:shadow-md border-b-6 border-b-transparent active:border-b-0 hover:border-b-0 hover:border-l-0 hover:border-t-0 active:border-t-0',
                      isCurrentPage &&
                        'bg-yellow-300 border-l-8 border-t-6 border-b-6 border-b-transparent active:border-b-0 hover:border-b-0 hover:border-l-0 text-black hover:text-black border-l-yellow-600 border-t-yellow-400  active:border-l-0  shadow-lg hover:border-t-0 active:border-t-0 hover:shadow-md shadow-yellow-500/50 hover:bg-yellow-400 active:bg-yellow-400 transition-all duration-75',
                    )}
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
              className="bg-yellow-300 border-l-8 border-b-6 border-b-transparent active:border-b-transparent hover:border-b-0 text-black hover:border-l-transparent hover:-translate-x-0.5 active:border-t-0 hover:border-t-0 border-t-6 border-l-yellow-600 border-t-yellow-400 active:border-l-0  shadow-lg hover:shadow-md shadow-yellow-500/50 hover:bg-yellow-400 active:bg-yellow-400 transition-all duration-75"
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
