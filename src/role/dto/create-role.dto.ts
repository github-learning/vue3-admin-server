import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  is_default: number;
}
