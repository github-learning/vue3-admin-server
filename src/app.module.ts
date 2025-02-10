import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { RoleModule } from "./role/role.module";
import { MenuModule } from "./menu/menu.module";
import { RoleAccessModule } from "./role_access/role_access.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { join } from "path";

//  模块注册中心
@Module({
  //1. 定义数据库的连接
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost", // 127.0.0.1
      port: 3306,
      username: "root",
      password: "123456",
      database: "admin",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
      connectorPackage: "mysql2", // 指定使用 mysql2
    }),
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    RoleAccessModule,
    LoggerModule.forRoot({
      // 开发环境log 形式，线上文件形式，方便问题追踪
      pinoHttp: {
        transport:
          process.env.NODE_NEV === "development"
            ? {
                target: "pino-pretty",
                options: {
                  colorize: true,
                },
              }
            : {
                target: "pino-roll",
                options: {
                  file: join("log", "log.txt"),
                  frequency: "daily",
                  size: "10m",
                  mkdir: true,
                },
              },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
/**
 * 只要被provider 修饰， 被 Injectable 所修饰
 * 写一个service  被 Injectable 所修饰
 */
export class AppModule {}
