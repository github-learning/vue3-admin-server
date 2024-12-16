import { IsArray, IsInt } from 'class-validator';

export class AllocRoleAccessDto {
  @IsArray()
  access: number[]; // 权限 ID 数组
}
