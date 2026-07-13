interface PaginationRange {
  range: number[];
  hasLeftEllipsis: boolean;
  hasRightEllipsis: boolean;
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): PaginationRange {
  const totalNumbers = siblingCount * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages <= totalBlocks) {
    return {
      range: Array.from({ length: totalPages }, (_, i) => i + 1),
      hasLeftEllipsis: false,
      hasRightEllipsis: false,
    };
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return {
      range: leftRange,
      hasLeftEllipsis: false,
      hasRightEllipsis: true,
    };
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return {
      range: rightRange,
      hasLeftEllipsis: true,
      hasRightEllipsis: false,
    };
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );

  return {
    range: middleRange,
    hasLeftEllipsis: true,
    hasRightEllipsis: true,
  };
}
