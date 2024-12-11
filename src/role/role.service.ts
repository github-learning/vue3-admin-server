import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

import { success, fail, ErrorCodes } from 'src/utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    // 检查是否存在相同的 name
    const existingRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });

    if (existingRole) {
      // 抛出一个异常，表示角色名称已存在
      return fail(ErrorCodes.ROLE_IS_EXISTS);
    }

    const role = this.roleRepository.create(createRoleDto);
    const data = await this.roleRepository.save(role);
    return success(data);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [roles, total] = await this.roleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return success({
      roles,
      total,
      page,
      pageCount: Math.ceil(total / limit),
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    // 检查是否存在相同的 name，但排除当前记录
    const existingRole = await this.roleRepository.findOne({
      where: { name: updateRoleDto.name },
    });

    if (existingRole && existingRole.id !== id) {
      // 抛出异常，提示用户名称已存在
      if (existingRole) {
        // 抛出一个异常，表示角色名称已存在
        return fail(ErrorCodes.ROLE_IS_EXISTS);
      }
    }

    this.roleRepository.update(id, updateRoleDto);
    return success();
  }

  remove(id: number) {
    this.roleRepository.delete(id);
    return success();
  }
}
