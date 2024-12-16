import { Injectable } from "@nestjs/common";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Menu } from "./entities/menu.entity";
import { plainToInstance } from "class-transformer";

import { success, fail, ErrorCodes } from "src/utils";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {}

  async create(body: CreateMenuDto) {
    // 检查是否已有用户使用相同的名称
    const existingUser = await this.menuRepository.findOne({
      where: { name: body.name },
    });

    if (existingUser) {
      // 如果存在重复的名称，可以返回一个错误信息
      return fail(ErrorCodes.ROLE_IS_EXISTS);
    }

    const menu = this.menuRepository.create(body);
    console.log("menu", menu);

    await this.menuRepository.save(body);

    return success();
  }

  async findAll() {
    const data = await this.menuRepository.find({
      order: { sortId: "ASC" }, // 根据排序权重排序
    });
    return success(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  async update(id: number, updateMenu: UpdateMenuDto) {
    console.log("upda11111");

    // const filteredData = plainToInstance(UpdateMenuDto, updateMenu, {
    //   excludeExtraneousValues: true, // 自动剔除 DTO 中未定义的字段
    // });

    await this.menuRepository.update(id, updateMenu);

    return success();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} menu`;
  // }
  async remove(id: number) {
    await this.menuRepository.delete(id);
    return success();
  }
}
