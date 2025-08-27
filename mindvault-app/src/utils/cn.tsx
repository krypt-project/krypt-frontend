import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne proprement des classes CSS avec support de Tailwind
 * - clsx : permet d’ajouter des classes conditionnellement
 * - tailwind-merge : supprime les conflits de classes Tailwind
 *
 * Exemple :
 *   cn("px-2", isActive && "bg-red-500", "px-4")
 *   => "bg-red-500 px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
