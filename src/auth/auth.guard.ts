import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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
    return undefined;
  }

  // 鉴权守卫
  // 鉴权守卫，用于拦截路由，判断用户是否登录，是否具有访问权限
  // 如果用户未登录，则跳转到登录页面
  // 如果用户已登录，但无权限访问，则跳转到403页面
}
