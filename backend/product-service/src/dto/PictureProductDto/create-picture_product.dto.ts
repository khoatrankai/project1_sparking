export class CreatePictureProductDto {
    picture_id?: string;
    url: string[];
    product: string; // Foreign Key ID
  }