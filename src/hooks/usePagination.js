import React, { useState, useEffect } from "react";

export default function usePagination(itemsPerPage, data, isDataUpdated) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setMaxPage(Math.ceil(data.length / itemsPerPage));
    if (!currentPageData().length) setCurrentPage(1);
  }, [data, itemsPerPage]);

  const currentPageData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  const nextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const prevButtonDisabled = () => {
    return currentPage === 1 ? true : false;
  };
  const nextButtonDisabled = () => {
    return currentPage === maxPage ? true : false;
  };

  return {
    currentPageData,
    nextPage,
    prevPage,
    prevButtonDisabled,
    nextButtonDisabled,
  };
}
