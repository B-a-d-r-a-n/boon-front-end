export interface CategoryResponseDTO {
  status: string;
  results: number;
  data: Category[];
}
export interface Category {
  _id: string;
  name: string;
  image: string;
  __v: number;
}