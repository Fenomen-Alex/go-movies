export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  release_date: Date;
  runtime: number;
  rating: number;
  mpaa_rating: string;
  genres: Genres[];
}

export interface Genres {
  [key: string]: string;
}
