export class GetContentsDto {
  id: string;
  link: string;
  content: string;
  user?: string;
  chatId: string;
  user_seen: string[];
}
