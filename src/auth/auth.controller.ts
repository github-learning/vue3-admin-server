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
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { success, fail, ErrorCodes } from "src/utils";
import { UserService } from "src/user/user.service";

import { JwtAuthGuard } from "./jwt-auth.guard"; // JWT验证守卫
/**
 * function
 * 登录
 * 注册
 */
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard) // 使用 JWT 守卫进行 Token 验证
  @Post("info") // 接口路径为 /auth/info
  async getUserInfo(@Req() req) {
    // 解码后的用户信息存储在 req.user 中
    // 从请求中获取用户信息（由 JWT 策略自动添加）
    const userId = req.user.userId;
    // 根据 userId 查询数据库，获取用户详细信息
    const user = await this.userService.getUserById(userId);
    return success(user);
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

    return success(
      { id: user.id, username: user.username },
      "注册成功, 请重新登陆"
    );
  }

  @Public()
  @Post("/login")
  @HttpCode(200)
  async login(@Body() params) {
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
