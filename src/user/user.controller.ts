import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  Req,
  Delete,
  Param,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";

import { User } from "./entities/user.entity";

import { wrapperResponse } from "src/utils";
import { Logger } from "nestjs-pino/Logger";
//TODO
/**
 * 状态处理 ✅
 * 权限配置以及回显
 * 编辑重复问题检查
 * 权限
 */
@Controller("user")
export class UserController {
  // private logger = new Logger(UserController.name);
  // constructor(private readonly userService: UserService) {
  //   this.logger.log("UserController init");
  // }
  constructor(
    private readonly userService: UserService,
    private logger: Logger
  ) {
    this.logger.log("UserController init");
  }
  /**
   * 新增
   * @param body
   * @returns
   */
  @Post()
  create(@Body() body) {
    console.log("body", body);
    return this.userService.create(body);
  }

  /**
   * 删除用户
   * @param body
   * @returns
   */

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
  /**
   * 修改用户
   * @param id
   * @param updateRoleDto
   * @returns
   */
  @Put(":id")
  update(@Param("id") id: string, @Body() updateRoleDto) {
    return this.userService.update(+id, updateRoleDto);
  }

  @Get()
  findAll(
    @Query("pageNum") page: number = 1, // 默认值为 1
    @Query("pageSize") limit: number = 10, // 默认值为 10
    @Query("username") username?: string, // 可选的查询条件
    @Query("mobile") mobile?: string,
    @Query("status") status?: string
  ) {
    this.logger.log("getUserList 请求成功");
    // 构建过滤条件对象
    const filters = {
      username,
      mobile,
      status,
    };

    // 将分页和过滤条件传递到 service
    return this.userService.findAll(page || 1, limit || 10, filters);
  }

  // 根据id 查询列表
  @Get("/getUserById")
  getUserById(@Query("id") id: number): Promise<User> {
    return this.userService.getUserById(id);
  }
}
