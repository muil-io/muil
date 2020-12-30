import { IsString, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name: string;
}

export class UpdateUserRoleDto {
  @IsIn(['admin', 'muilAdmin'])
  readonly role: 'admin' | 'muilAdmin';
}
