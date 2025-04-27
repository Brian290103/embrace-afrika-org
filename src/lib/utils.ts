import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Creates a slug from the given string.
 * @param str The string to slugify.
 * @returns The slugified string.
 */
export function slugify(str: string): string {
  return str
      .toLowerCase()
      .trim()
      .replace(/[\s-]+/g, "-") // Replace spaces and hyphens with a single hyphen
      .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters except hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}
