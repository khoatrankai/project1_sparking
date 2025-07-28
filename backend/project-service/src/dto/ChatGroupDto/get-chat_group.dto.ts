

export class GetChatGroupDto {
  id: string;
  name: string;
  description?: string;
  head?: string;
  project: string;  // Có thể là `project.id`
  members?: any[];
  contents?: any[];
  created_at: Date;
  updated_at: Date;
}
