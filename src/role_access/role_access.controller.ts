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
import { CreateRoleAccessDto } from './dto/create-role_access.dto';
import { UpdateRoleAccessDto } from './dto/update-role_access.dto';

@Controller('role_access')
export class RoleAccessController {
  constructor(private readonly roleAccessService: RoleAccessService) {}

  @Post()
  create(@Body() createRoleAccessDto: CreateRoleAccessDto) {
    return this.roleAccessService.create(createRoleAccessDto);
  }

  @Get(':id')
  async findAll(@Param('id') id: number) {
    return await this.roleAccessService.findAll(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleAccessDto: UpdateRoleAccessDto
  ) {
    return this.roleAccessService.update(+id, updateRoleAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleAccessService.remove(+id);
  }
}
