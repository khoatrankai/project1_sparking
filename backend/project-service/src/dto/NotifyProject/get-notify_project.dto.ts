import { GetProjectDto } from "../ProjectDto/get-project.dto";

export class GetNotifyProjectDto {
  notify_id: string;
  description: string;
  user_create:string;
  url:string;
  project:GetProjectDto;
}
