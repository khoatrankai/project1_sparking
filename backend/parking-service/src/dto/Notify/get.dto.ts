

export class GetNotifyDto {
  id: string;
  description?: string;
  link?: string;
  status: 'public' | 'delete' | 'private';
  created_at: Date;
  updated_at: Date;
}
