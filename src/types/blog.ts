export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  date: string;
  wordCount: number;
  featuredImage: string;
  altText: string;
  fullContent: string[];
  highlightQuote: string;
  quoteAuthor?: string;
  specialComponentType?: 'travel-essentials' | 'crime-reflection';
  audioUrl?: string;
}

export type GalleryCategory =
  | 'Nature'
  | 'Travel'
  | 'Photography'
  | 'Books'
  | 'Volunteering'
  | 'Running'
  | 'Food & Coffee'
  | 'Colombia'
  | 'Technology';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  caption: string;
  location?: string;
}

export interface EnglishSkill {
  id: string;
  title: string;
  iconName: string;
  level: string;
  description: string;
  myRoutine: string;
  favoriteResource: string;
}
