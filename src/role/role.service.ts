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
    const data = await this.roleRepository.save(role);

    return {
      data,
      code: 200,
    };
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
    console.log('updateRoleDto', updateRoleDto);
    await this.roleRepository.update(id, updateRoleDto);
    return {
      data: {},
      code: 200,
    };
  }

  remove(id: number) {
    const result = this.roleRepository.delete(id);
    console.log('result', result);
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Role with ID ${id} not found`);
    // } else {
    return {
      code: 200,
      data: {
        // msg: '删除成功',
      },
    };
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({ where: { id } });
  }
}
