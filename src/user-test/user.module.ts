import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// nest g co / mo /s
//
@Module({
  providers: [UserService],
})
export class UserModule {}
