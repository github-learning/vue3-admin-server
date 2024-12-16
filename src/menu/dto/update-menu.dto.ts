import { PartialType } from "@nestjs/swagger";
import { CreateMenuDto } from "./create-menu.dto";
import { IsInt, IsOptional } from "class-validator";

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsOptional() // 可选字段
  @IsInt({ message: "排序字段必须是整数" })
  sortId: number = 0; // 提供默认值
}
