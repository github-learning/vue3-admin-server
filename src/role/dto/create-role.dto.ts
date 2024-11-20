import { IsInt, IsNotEmpty, IsString } from "class-validator";
// data transform object ,前端传递到服务端的数据
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
  isDefault: number;
}
