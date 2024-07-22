import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertSize(size: string) {
  return size === 'xs'
    ? 'Extra Small'
    : size === 's'
      ? 'Small'
      : size === 'm'
        ? 'Medium'
        : size === 'l'
          ? 'Large'
          : size === 'xl'
            ? 'Extra Large'
            : size === 'xxl'
              ? 'Extra Extra Large'
              : size === 'xxxl'
                ? 'Extra Extra Extra Large'
                : size
}
