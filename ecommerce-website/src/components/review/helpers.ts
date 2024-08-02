import { ProductReview } from "@/lib/product-review-types";
import { InfiniteData } from "@tanstack/react-query";

export function getInitials(fullName: string): string {
  if (!fullName) return "";

  // Split the full name by spaces
  const nameParts = fullName.trim().split(" ");

  // Map each part to its first character and join them together
  const initials = nameParts
    .map((part) => (part && part[0] ? part[0].toUpperCase() : ""))
    .join("");

  return initials;
}

export function formatDate(dateString: string): string {
  // Parse the input date string in YYYY-MM-DD format
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
  }

  // Format the date to "MMMM d, yyyy"
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}

export function hasData(
  data: InfiniteData<ProductReview, unknown> | undefined,
): boolean {
  return (
    Array.isArray(data?.pages) &&
    data.pages.length > 0 &&
    Array.isArray(data.pages[0]?.data) &&
    data.pages[0].data.length > 0
  );
}
