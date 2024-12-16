import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.menuService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }
  @Patch()
  async updateBulk(@Body("access") data: UpdateMenuDto[]) {
    return this.menuService.updateBulk(data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.menuService.remove(+id);
  }
}
