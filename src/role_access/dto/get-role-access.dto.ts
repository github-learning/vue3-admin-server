import { IsArray, IsNumber } from 'class-validator';

export class GetRoleAccessDto {
  @IsArray()
  @IsNumber({}, { each: true })
  roles: number[];
}
