export interface IBook {
  id: string;
  title: string;
  author: string;
  image: string;
  published: number;
  pages: number;
  status: 'new' | 'reading' | 'finished'; 
  userId: string;
}