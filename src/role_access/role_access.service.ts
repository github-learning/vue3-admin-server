import { Injectable, Logger } from '@nestjs/common';
import { AllocRoleAccessDto } from './dto/create-role_access.dto';
import { UpdateRoleAccessDto } from './dto/update-role_access.dto';
import { RoleAccess } from './entities/role_access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { success } from 'src/utils';
import { Role } from 'src/role/entities/role.entity';
import { Menu } from 'src/menu/entities/menu.entity';

@Injectable()
export class RoleAccessService {
  constructor(
    @InjectRepository(RoleAccess)
    private readonly roleAccessRepository: Repository<RoleAccess>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {}
  create(createRoleAccessDto: AllocRoleAccessDto) {
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

  // 分配权限
  async allocateRoleAccess(roleId: number, accessIds: number[]) {
    // 查询角色是否存在
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) {
      throw new Error('Role not found');
    }

    // 查询所有的 Menu 对象
    // const accesses = await this.menuRepository.findByIds(accessIds);
    const accesses = await this.menuRepository.find({
      where: {
        id: In(accessIds), // 使用 In 操作符查询多个 ID
      },
    });
    if (accesses.length !== accessIds.length) {
      throw new Error('Some access IDs are invalid');
    }

    // 删除角色当前的所有权限
    await this.roleAccessRepository.delete({ role });

    // 插入新的权限记录
    const roleAccesses = accesses.map((access) => {
      const roleAccess = new RoleAccess();
      roleAccess.role = role;
      roleAccess.access = access;
      return roleAccess;
    });
    await this.roleAccessRepository.save(roleAccesses);
    return success();
  }

  async getRoleAccessByRoles(roleIds: number[]): Promise<any> {
    // 查询角色及其关联的权限
    const roles = await this.roleAccessRepository.find({
      where: { roleId: In(roleIds) }, // 使用 In 运算符处理数组查询
      relations: ['access'], // 预加载权限关系
    });

    const ids = roles.map((item) => item.accessId);
    console.log('ids', ids);
    const accesses = await this.menuRepository.find({
      where: {
        id: In(ids), // 使用 In 操作符查询多个 ID
      },
    });

    console.log(
      '%c [  ]-103',
      'font-size:13px; background:pink; color:#bf2c9f;',
      accesses
    );

    return success(accesses);
    // 筛选与传入角色匹配的权限
    // return mockAccessData.filter((item) => roles.includes(item.roleId));
  }
}
