import { Module } from '@nestjs/common';
import { RoleAccessService } from './role_access.service';
import { RoleAccessController } from './role_access.controller';
import { RoleAccess } from './entities/role_access.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccess, Role, Menu])],
  controllers: [RoleAccessController],
  providers: [RoleAccessService],
})
export class RoleAccessModule {}
