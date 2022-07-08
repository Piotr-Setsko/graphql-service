export interface Track {
  _id?: string;
  id?: string; 
  title: string;
  albumId: string;
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}