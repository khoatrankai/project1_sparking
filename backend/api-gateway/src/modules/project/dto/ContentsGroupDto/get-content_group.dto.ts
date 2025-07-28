export class GetContentsGroupDto {
  id: string;
  link: string;
  content: string;
  user?: string;
  chat_group: string;
  user_seen: string[];
}
