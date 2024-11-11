import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from './auth.jwt.secret';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // throw new Error("Method not implemented.");
    console.log('context', context);
    // 让login 进去
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('request', request.headers);
    const token = extractTokenFromHeader(request);
    console.log('token', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: JWT_SECRET_KEY,
      });
      console.log('payload', payload);
      request['user'] = payload;
      // return true;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  // 鉴权守卫
  // 鉴权守卫，用于拦截路由，判断用户是否登录，是否具有访问权限
  // 如果用户未登录，则跳转到登录页面
  // 如果用户已登录，但无权限访问，则跳转到403页面
}

// 判断token是否存在
function extractTokenFromHeader(request) {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : null;

  // if (type !== 'Bearer') {
  //   return null;
  // }
  // return token;
}
