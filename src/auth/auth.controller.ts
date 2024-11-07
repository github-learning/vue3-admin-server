import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { success, fail } from "src/utils";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.authService.findOne(+id);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id);
  }
  @Public()
  @Post("login")
  login(@Body() params) {
    return this.authService
      .login(params.username, params.password)
      .then((data) => {
        success(data, "登陆成功");
      })
      .catch((err) => {
        fail("登陆失败");
      });
  }
}
