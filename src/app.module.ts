import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { RoleModule } from './role/role.module';
//  模块注册中心
@Module({
  //1. 定义数据库的连接
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 127.0.0.1
      // host: '127.0.0.1', // 127.0.0.1
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'user',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
/**
 * 只要被provider 修饰， 被 Injectable 所修饰
 * 写一个service  被 Injectable 所修饰
 */
export class AppModule {}
