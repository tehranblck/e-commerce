import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function usePagination(defaultPage: number = 1) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [totalPages, setTotalPages] = useState<number>(1); 

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : defaultPage;
    setCurrentPage(page);
  }, [searchParams, defaultPage]);

  return { currentPage, totalPages, setTotalPages }; 
}
