import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import * as md5 from 'md5';
/**
 * @typeorm 用于建立连接
 * typeorm 用于CRUD
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  // 新增用户

  async create(body: User) {
    const user = this.usersRepository.create(body);
    console.log('use', user);
    const data = this.usersRepository.save(user);
    console.log('data', data);

    return {
      data,
      code: 200,
    };
  }

  // async findAll(page: number = 1, limit: number = 10) {
  //   const [users, total] = await this.usersRepository.findAndCount({
  //     skip: (page - 1) * limit,
  //     take: limit,
  //   });

  //   return {
  //     data: {
  //       users,
  //       total,
  //       page,
  //       pageCount: Math.ceil(total / limit),
  //     },

  //     code: 200,
  //   };
  // }
  async findAll(
    page: number = 1,
    limit: number = 10,
    filters: { username?: string; mobile?: string; status?: boolean } = {}
  ) {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    console.log('filters', filters);
    // 动态添加查询条件
    if (filters.username) {
      queryBuilder.andWhere('user.username LIKE :username', {
        username: `%${filters.username}%`,
      });
    }

    if (filters.mobile) {
      queryBuilder.andWhere('user.mobile LIKE :mobile', {
        mobile: `%${filters.mobile}%`,
      });
    }

    if (typeof filters.status !== 'undefined') {
      queryBuilder.andWhere('user.status = :status', {
        status: filters.status,
      });
    }

    // 分页
    queryBuilder.skip((page - 1) * limit).take(limit);
    // 打印 SQL 查询语句
    console.log('Generated SQL:', queryBuilder.getSql());

    // 查询数据和总数
    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      data: {
        users,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      },
      code: 200,
    };
  }

  async getList(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async update(id: number, updateUSer) {
    console.log('updateRoleDto', updateUSer);
    await this.usersRepository.update(id, updateUSer);
    return {
      data: {},
      code: 200,
    };
  }
  // select * from user where id = ?
  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<object> {
    await this.usersRepository.delete(id);
    return {
      code: 200,
      data: {},
    };
  }

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = md5(password).toUpperCase();
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async finedByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
