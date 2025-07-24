export class GetChatDto {
  id: string;
  name_one: string;
  name_two: string;
  user_one?: string;
  user_two?: string;
  project: string;
  contents?: any[]; // hoặc định nghĩa DTO cho `Contents` nếu cần
}
