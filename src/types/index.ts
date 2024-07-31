export type Books = Book[];

export interface Book {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
}

export enum SortingEnum {
  DEFAULT = 'Default',
  ALPHABETICAL = 'Alphabetical',
}
