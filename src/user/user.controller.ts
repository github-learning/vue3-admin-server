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
} from '@nestjs/common';
import { UserService } from './user.service';

import { User } from './entities/user.entity';
import { Public } from 'src/auth/public.decorator';
import { wrapperResponse } from 'src/utils';
// import { Public } from 'src/auth/public.decorator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Public()
  @Get('/info')
  async getUserBuyToken(@Req() request) {
    console.log('request.user', request.user);

    // return wrapperResponse(
    // return await this.userService.finedByUsername(request.user.username);
    return wrapperResponse(
      this.userService.finedByUsername(request.user.username),
      '登录成功'
    );
    // ('获取用户信息成功');
    // );
    // console.log('data', data);
    // return data;
    // return ' user info';
  }
  @Get()
  findAll() {
    return this.userService.findAll();
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
  @Post('/addUser')
  addUser(@Body() body): Promise<User> {
    return this.userService.addUser(body);
  }

  // @Get('/findAll')
  // findAll(@Request() req): string {
  //   // 输出req的header
  //   console.log('req.query.name', req.query);

  //   console.log(req.headers);
  //   // 输出req的body
  //   console.log(req.body);
  //   // 输出req的query
  //   console.log(req.query);
  //   // 输出req的params
  //   console.log(req.params);
  //   // 输出req的url
  //   console.log(req.url);
  //   // 输出req的method
  //   console.log(req.method);
  //   // 输出req的protocol
  //   console.log(req.protocol);
  //   // 输出req的host
  //   console.log(req.hostname);
  //   // 输出req的ip
  //   console.log(req.ip);
  //   // 输出req的ips
  //   console.log(req.ips);

  //   return '大家好2332';
  // }
  @Get('/findAllResponse')
  // 通过注解的方式设置状态
  @HttpCode(202)
  findAllResponse(@Response() res): any {
    // 输出req的header
    res.status(201).send('大家好2332');
    // 头部信息/cookie/ session
  }

  // 删除用户
  // @Post('deleteUser')
  // deleteUser(@Body() body): Promise<object> {
  //   return this.userService.deleteUser(body);
  // }

  @Post('/deleteUser')
  async deleteUser(@Body() ids: number[]): Promise<object> {
    return this.userService.deleteUser(ids);
  }
}
