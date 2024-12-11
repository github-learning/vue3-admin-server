import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { success, fail, ErrorCodes } from "src/utils";
import { UserService } from "src/user/user.service";
import { response } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.authService.findAll();
  }
  @Public()
  @Post("/register")
  @HttpCode(200)
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    const existingUser = await this.userService.finedByUsername(username);

    if (existingUser) {
      return fail(ErrorCodes.USER_ALREADY_EXISTS);
    }

    const user = await this.userService.createUser(username, password);
    console.log("user-1", user);
    return success(
      { id: user.id, username: user.username },
      "注册成功, 请重新登陆"
    );
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
  @Post("/login")
  @HttpCode(200)
  async login(@Body() params) {
    console.log("login");
    try {
      const data = await this.authService.login(
        params.username,
        params.password
      );
      console.log("data", data);
      return success(data, "登陆成功");
    } catch (err) {
      return fail(ErrorCodes.LOGIN_ERROR);
    }
  }
}
