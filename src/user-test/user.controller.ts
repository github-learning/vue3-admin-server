import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Request,
  Response,
  Param,
  HttpCode,
  Body,
  Query,
  Headers,
} from '@nestjs/common';
// common  存放了各种请求协议
// Get : localhost:3000/user/findAll
/**
 * nest g co
 * 调用service 实例化
 *
 *
 */
@Controller('user')
export class UserController {
  @Get('/findAll')
  findAll(@Request() req): string {
    // 输出req的header
    console.log(req.headers);
    // 输出req的body
    console.log(req.body);
    // 输出req的query
    console.log(req.query);
    // 输出req的params
    console.log(req.params);
    // 输出req的url
    console.log(req.url);
    // 输出req的method
    console.log(req.method);
    // 输出req的protocol
    console.log(req.protocol);
    // 输出req的host
    console.log(req.hostname);
    // 输出req的ip
    console.log(req.ip);
    // 输出req的ips
    console.log(req.ips);

    return '大家好2332';
  }
  @Get('/response')
  findAllResponse(@Response() res): any {
    // 输出res的header
    console.log(res.headers);
    // 输出res的body
    console.log(res.body);
    // 输出res的query
    console.log(res.query);
    // 输出res的params
    console.log(res.params);

    res.status(201).send('成功111');
  }
  @Get(':id')
  @HttpCode(203) // 返回值注解
  findAllParams(@Param('id') id: string): any {
    // 输出res的header
    return {
      message: '接受之' + id,
    };
  }

  // post 请求
  @Post('/add')
  add(): string {
    return '添加成功';
  }
  // delete 请求
  @Delete('/delete')
  delete(): string {
    return '删除成功';
  }
  // patch 请求
  @Patch('/update')
  update(): string {
    return '修改成功';
  }

  // json
  @Get('/findAllJson')
  findAllJson(): any {
    return {
      message: '查询成功',
      code: 200,
      data: [
        {
          name: '张三',
        },
      ],
    };
  }
  // post 请求
  @Post('/addJson')
  @HttpCode(200)
  addJson(@Body() data: any): any {
    console.log(
      '%c [  ]-103',
      'font-size:13px; background:pink; color:#bf2c9f;',
      data,
    );
    return {
      message: '添加成功22',
      code: 290,
      list: [data],
    };
  }
  // 获取形参列表
  @Post('/addJson2')
  @HttpCode(200)
  addJson2(
    @Query('param1') param1: string,
    @Query('param2') param2: string,
    @Headers('authHeader') authHeader: string,
  ): string {
    // 打印param1
    console.log(param1);
    // 打印param2
    console.log(param2);
    // 打印authHeader
    console.log(authHeader);
    return 'ww';
  }
  @Delete('/delete')
  deleteJson(): string {
    return '删除成功';
  }
  // patch 请求
  @Patch('/update')
  updateJson(): string {
    return '修改成功';
  }
}
