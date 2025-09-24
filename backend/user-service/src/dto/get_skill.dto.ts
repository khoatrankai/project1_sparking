export class GetSkillDto {
  skill_id: string;
  name: string;
  user: string;          // có thể trả luôn user_id
  score_request: number;
  score_review: number;
}