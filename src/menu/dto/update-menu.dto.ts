import { PartialType } from "@nestjs/swagger";
import { CreateMenuDto } from "./create-menu.dto";
import { IsInt, IsOptional, Min } from "class-validator";

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsOptional()
  @IsInt()
  @Min(1, { message: "ID 必须是大于 0 的整数" })
  id: number;
}
