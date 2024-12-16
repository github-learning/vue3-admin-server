import { Module } from '@nestjs/common';
import { RoleAccessService } from './role_access.service';
import { RoleAccessController } from './role_access.controller';
import { RoleAccess } from './entities/role_access.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccess])],
  controllers: [RoleAccessController],
  providers: [RoleAccessService],
})
export class RoleAccessModule {}
