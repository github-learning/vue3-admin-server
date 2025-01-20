import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleAccessService } from './role_access.service';
import { AllocRoleAccessDto } from './dto/create-role_access.dto';
import { UpdateRoleAccessDto } from './dto/update-role_access.dto';
import { GetRoleAccessDto } from './dto/get-role-access.dto';

@Controller('role_access')
export class RoleAccessController {
  constructor(private readonly roleAccessService: RoleAccessService) {}

  // @Post()
  // create(@Body() createRoleAccessDto: AllocRoleAccessDto) {
  //   return this.roleAccessService.create(createRoleAccessDto);
  // }
  @Post(':id')
  async allocateRoleAccess(
    @Param('id') id: number,
    @Body() dto: AllocRoleAccessDto
  ) {
    return await this.roleAccessService.allocateRoleAccess(id, dto.access);
  }

  @Get(':id')
  async findAll(@Param('id') id: number) {
    return await this.roleAccessService.findAll(id);
  }

  @Post('role/access')
  async getRoleAccessByRoles(@Body() dto: GetRoleAccessDto) {
    return this.roleAccessService.getRoleAccessByRoles(dto.roles);
  }
}
