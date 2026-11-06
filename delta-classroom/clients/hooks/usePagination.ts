import { useState } from 'react';

export function usePagination(totalItems: number, itemsPerPage = 10) {
  const [page, setPage] = useState(1);
  return { page, setPage, totalPages: Math.ceil(totalItems / itemsPerPage) };
}
