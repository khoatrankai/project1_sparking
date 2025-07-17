export class GetWarrantyDto {
  id: string;
  date_start: Date;
  reason?: string;
  review?: string;
  solve?: string;
  date_end?: Date;
  status: string;
  note?: string;
  activity?: string;
  created_at: Date;
  updated_at: Date;
  asset: any; // Bạn có thể thay `any` bằng kiểu cụ thể nếu có DTO cho `Asset`
}
