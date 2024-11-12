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
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  // async findAll() {
  //   return await this.rolesRepository.find();
  // }
  async findAll(page: number = 1, limit: number = 10) {
    const [roles, total] = await this.roleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: roles,
      total,
      page,
      code: 200,
      pageCount: Math.ceil(total / limit),
    };
  }
  // async getList(): Promise<User[]> {
  //   return await this.usersRepository.find();
  // }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
