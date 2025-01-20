import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET_KEY } from "./auth.jwt.secret";
import { JwtStrategy } from "./jwt.strategy";
// 在 AuthModule 中配置 JWT 和策略：

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: 24 * 60 * 60 * 360 + "s" }, // 24小时
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,

    {
      provide: APP_GUARD,
      useClass: AuthGuard, // 全局守卫
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
