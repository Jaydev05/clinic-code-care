/**
 * Static gallery items. Place image files in src/assets and import them, or in
 * public/gallery and reference by path. No database involvement.
 */

export interface GalleryItem {
  key: string;
  src: string;
  alt: string;
  category: "facility" | "equipment" | "team" | "events";
}

export const gallery: GalleryItem[] = [];
