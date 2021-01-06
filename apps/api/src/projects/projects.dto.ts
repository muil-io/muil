import { IsIn } from 'class-validator';

export class UpdateProjectPlanDto {
  @IsIn(['free', 'pro'])
  readonly plan: 'free' | 'pro';
}
