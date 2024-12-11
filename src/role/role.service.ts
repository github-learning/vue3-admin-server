import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { success } from 'src/utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
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

  update(id: number, updateRoleDto: UpdateRoleDto) {
    this.roleRepository.update(id, updateRoleDto);
    return success();
  }

  remove(id: number) {
    this.roleRepository.delete(id);
    return success();
  }
}
