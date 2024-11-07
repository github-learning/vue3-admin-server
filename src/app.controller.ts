import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get(":id")
  findOne(@Param("id") id: string): string {
    // 处理路由参数
    console.log(id);
    return `Handle GET request with id: ${id}`;
  }
}
