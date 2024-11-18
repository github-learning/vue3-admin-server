import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [roles, total] = await this.roleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: {
        roles,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      },

      code: 200,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOne({ where: { id } });
  }
  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
