import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        console.log('statusCode', statusCode);

        // let message = "Success";
        // if (statusCode === 404) {
        //   message = "Resource not found";
        // } else if (statusCode === 500) {
        //   message = "Internal server error";
        // }

        return {
          status: statusCode,
          // message: message,
          data,
        };
      })
    );
  }
}

/***
 * intercept 方法：这是拦截器的核心。它接收请求和处理程序的上下文 (ExecutionContext)，并通过 next.handle() 继续传递控制权。
 *  map 操作符：使用 rxjs 的 map 操作符来修改返回的结果。我们把每个响应包装成一个统一的格式。
 *
 * * */
