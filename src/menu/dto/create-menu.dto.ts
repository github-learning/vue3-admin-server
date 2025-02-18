import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
  @ApiProperty({ description: "菜单名称不能为空", example: "用户菜单" })
  @IsNotEmpty({ message: "菜单名称不能为空" })
  @IsString({ message: "菜单名称必须是字符串" })
  title: string;

  @IsNotEmpty({ message: "路由路径不能为空" })
  @IsString({ message: "路由路径必须是字符串" })
  path: string;

  @IsNotEmpty({ message: "路由名称不能为空" })
  @IsString({ message: "路由名称必须是字符串" })
  name: string;

  @IsOptional() // 可选字段
  @IsInt({ message: "排序字段必须是整数" })
  sortId: number = 0; // 提供默认值

  // 可选字段，不需要验证时可以直接定义
  icon?: string;
  id?: number;
}
