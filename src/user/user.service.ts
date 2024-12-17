import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as crypto from "crypto";
import * as md5 from "md5";
import { ErrorCodes, success } from "src/utils";
/**
 * @typeorm 用于建立连接
 * typeorm 用于CRUD
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  /**
   * 新增用户
   * @param body
   * @returns
   */

  async create(body: User) {
    const user = this.usersRepository.create(body);
    // 检查是否已有用户使用相同的名称
    const existingUser = await this.usersRepository.findOne({
      where: { username: body.username },
    });

    if (existingUser) {
      // 如果存在重复的名称，可以返回一个错误信息
      return fail(ErrorCodes.ROLE_IS_EXISTS);
    }

    await this.usersRepository.save(user);

    return success();
  }

  /**
   * 查询所有用户
   * @param page
   * @param limit
   * @param filters
   * @returns
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
    filters: {
      username?: string;
      mobile?: string;
      status?: string;
    } = {}
  ) {
    const queryBuilder = this.usersRepository.createQueryBuilder("user");

    console.log("filters", filters);
    // 动态添加查询条件
    if (filters.username) {
      queryBuilder.andWhere("user.username LIKE :username", {
        username: `%${filters.username}%`,
      });
    }

    if (filters.mobile) {
      queryBuilder.andWhere("user.mobile LIKE :mobile", {
        mobile: `%${filters.mobile}%`,
      });
    }

    // 状态条件
    // 状态条件：仅处理 0 和 1 的情况

    if (filters.status === "0" || filters.status === "1") {
      queryBuilder.andWhere("user.status = :status", {
        status: filters.status,
      });
    }

    // 分页
    queryBuilder.skip((page - 1) * limit).take(limit);
    // 打印 SQL 查询语句
    // console.log("Generated SQL:", queryBuilder.getSql());

    // 查询数据和总数
    const [users, total] = await queryBuilder.getManyAndCount();
    return success({
      users,
      total,
      page,
      pageCount: Math.ceil(total / limit),
    });
  }

  async update(id: number, updateUser) {
    console.log("updateRoleDto", updateUser);
    await this.usersRepository.update(id, updateUser);

    return success();
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<object> {
    await this.usersRepository.delete(id);
    return success();
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
