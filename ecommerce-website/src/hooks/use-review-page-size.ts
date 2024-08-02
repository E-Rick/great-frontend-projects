import { useMediaQuery } from "usehooks-ts";

/**
 * Page size: 12 for desktop, 10 for mobile and tablet.
 * @returns `number` - The number of reviews to return
 */
export const useReviewPageSize = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return {
    pageSize: isMobile || isTablet ? 10 : 12,
  };
};
