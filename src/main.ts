import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createLogger } from "winston";
import { utilities, WinstonModule } from "nest-winston";
import * as winston from "winston";
import * as fs from "fs";
import * as yaml from "js-yaml";
async function bootstrap() {
  // const logger = new Logger();
  // createLogger of Winston
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike()
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: false, // 关闭程序日志
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  // 获取 ConfigService 实例
  const configService = app.get(ConfigService);
  // 设置全局路由前缀
  // app.setGlobalPrefix('/api');
  // 设置swapper 相关文档
  // Swagger 配置, 其实swagger 对代码的侵入性还是比较大的，需要在controller 里 做处理
  const config = new DocumentBuilder()
    .setTitle("My API")
    .setDescription("The API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("cats")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document); // 'api' 是 Swagger UI 的路由路径

  // 生成 JSON 文件（可选）
  fs.writeFileSync("./swagger.json", JSON.stringify(document, null, 2));

  // 全局注册响应拦截器
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // 全局注册异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 启用全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用转换
      whitelist: true, // 自动剔除 DTO 中未定义的字段
    })
  );
  // 使用 ConfigService 获取配置项
  const port = configService.get<number>("PORT"); // 通过环境变量读取端口
  const env = configService.get<number>("NODE_ENV"); // 通过环境变量读取环境

  await app.listen(port);
  Logger.log(`App 运行在 http://localhost:${port} ${env}`);
}
bootstrap();
/**
 * 1. logger middleware
 * 在请求和 来到controller
 * 注入，用什么装饰，实现一个NestMiddleware
 * 在 NestJS 中，如果你想对所有接口的返回结果进行统一格式化处理，可以通过以下几种方式来实现：

全局响应拦截器（推荐方式）
管道（用于对输入数据进行格式化）
中间件（可以用于处理请求和响应的生命周期）
错误处理和统一响应格式

 */
