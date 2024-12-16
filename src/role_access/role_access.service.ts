import { Injectable, Logger } from '@nestjs/common';
import { CreateRoleAccessDto } from './dto/create-role_access.dto';
import { UpdateRoleAccessDto } from './dto/update-role_access.dto';
import { RoleAccess } from './entities/role_access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { success } from 'src/utils';

@Injectable()
export class RoleAccessService {
  constructor(
    @InjectRepository(RoleAccess)
    private readonly roleAccessRepository: Repository<RoleAccess>
  ) {}
  create(createRoleAccessDto: CreateRoleAccessDto) {
    return 'This action adds a new roleAccess';
  }

  async findAll(roleId: number) {
    console.log('roleId:', roleId);

    // const queryBuilder = this.roleAccessRepository
    //   .createQueryBuilder('roleAccess')
    //   .where('roleAccess.roleId = :roleId', { roleId })
    //   .leftJoinAndSelect('roleAccess.access', 'access');

    // Logger.log(queryBuilder.getSql()); // 输出生成的 SQL
    // const data = await queryBuilder.getMany();

    // return data;
    console.log('roleId', roleId);
    const data = await this.roleAccessRepository.find({
      where: { roleId },
      relations: ['access'], // 自动加载权限信息
    });

    console.log(
      '%c [  ]-25',
      'font-size:13px; background:pink; color:#bf2c9f;',
      data
    );
    return success(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} roleAccess`;
  }

  update(id: number, updateRoleAccessDto: UpdateRoleAccessDto) {
    return `This action updates a #${id} roleAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleAccess`;
  }
}
