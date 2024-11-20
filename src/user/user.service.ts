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

  async findAll(page: number = 1, limit: number = 10) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

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
  // select * from user where id = ?
  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }
  // 新增用户

  async addUser(body: User): Promise<User> {
    return await this.usersRepository.save(body);
  }
  // 删除用户
  // delete from user where id =
  // async deleteUser(params: User): Promise<object> {
  //   const res = await this.usersRepository.delete({ id: params.id });
  //   if (res.affected > 0) {
  //     return {
  //       code: 200,
  //       message: '删除成功',
  //     };
  //   } else
  //     return {
  //       code: 400,
  //       message: '删除失败',
  //     };
  // }
  async deleteUser(ids: number[]): Promise<object> {
    const res = await this.usersRepository.delete(ids);
    if (res.affected > 0) {
      return {
        code: 200,
        message: '删除成功',
      };
    } else
      return {
        code: 400,
        message: '删除失败',
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
