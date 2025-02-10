import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { LoggerModule } from "nestjs-pino";
import { colorizerFactory } from "pino-pretty";
import { mkdir } from "fs";
import { join } from "path";

console.log(
  "%c [  ]-11",
  "font-size:13px; background:pink; color:#bf2c9f;",
  process.env.NODE_NEV
);
// 跟那一张表进行交互
/**
 * 在main 创建数据库连接
 * 在业务model 创建映射关系
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport:
    //       process.env.NODE_NEV === "development"
    //         ? {
    //             target: "pino-pretty",
    //             options: {
    //               colorize: true,
    //             },
    //           }
    //         : {
    //             target: "pino-roll",
    //             options: {
    //               file: join("log", "log.txt"),
    //               frequency: "daily",
    //               size: "10m",
    //               mkdir: true,
    //             },
    //           },
    //   },
    // }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
