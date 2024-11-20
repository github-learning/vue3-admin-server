import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  Request,
  Response,
  HttpCode,
  BadRequestException,
  Req,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

import { User } from './entities/user.entity';
import { Public } from 'src/auth/public.decorator';
import { wrapperResponse } from 'src/utils';
// import { Public } from 'src/auth/public.decorator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 新增
   * @param body
   * @returns
   */
  @Post()
  create(@Body() body) {
    console.log('body', body);
    return this.userService.create(body);
  }
  /**
   * 获取用户信息
   * @param request
   * @returns
   */
  @Get('/info')
  async getUserBuyToken(@Req() request) {
    console.log('request.user', request.user);

    // return wrapperResponse(
    // return await this.userService.finedByUsername(request.user.username);
    return wrapperResponse(
      this.userService.finedByUsername(request.user.username),
      '登录成功'
    );
  }

  /**
   * 删除用户
   * @param body
   * @returns
   */

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto) {
    return this.userService.update(+id, updateRoleDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  @Get()
  findAll(
    @Query('page') page: number, // 获取分页参数
    @Query('limit') limit: number,
    @Query('username') username?: string, // 可选的查询条件
    @Query('mobile') mobile?: string,
    @Query('status') status?: boolean
  ) {
    console.log('status', status);
    // 构建过滤条件对象
    const filters = {
      username,
      mobile,
      // status,
      // status: status !== undefined ? status === 'true' : undefined, // 转换字符串为布尔值
    };

    // 将分页和过滤条件传递到 service
    return this.userService.findAll(page || 1, limit || 10, filters);
  }
  // @Public()
  @Get('/list')
  async getList(): Promise<User[]> {
    return await this.userService.getList();
  }
  // 根据id 查询列表
  @Get('/getUserById')
  getUserById(@Query('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }
  // 添加用户
  // @Post('/addUser')
  // addUser(@Body() body): Promise<User> {
  //   return this.userService.addUser(body);
  // }
}
