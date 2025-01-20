/**
 * 配置 JWT 策略
 */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET_KEY } from "./auth.jwt.secret";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 如果 token 过期，会抛出 401 错误
      secretOrKey: JWT_SECRET_KEY, // 替换为你的 JWT 密钥
    });
  }

  async validate(payload: any) {
    // `payload` 是解码后的 token 数据
    console.log("222", payload);
    return { userId: payload.sub, username: payload.username };
  }
}
