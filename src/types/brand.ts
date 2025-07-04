export interface BrandResponseDTO {
  status: string;
  results: number;
  data: Brand[];
}
export interface Brand {
  _id: string;
  name: string;
  image: string;
  __v: number;
}