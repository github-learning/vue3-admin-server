import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { LoggerModule } from "nestjs-pino";
// 跟那一张表进行交互
/**
 * 在main 创建数据库连接
 * 在业务model 创建映射关系
 */
@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule.forRoot()],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
