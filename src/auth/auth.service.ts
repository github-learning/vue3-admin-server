import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JwtService: JwtService
  ) {}
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(username: string, password: string) {
    const user = await this.userService.finedByUsername(username);
    const md5Password = md5(password).toUpperCase();
    // console.log('user', user);

    if (user.password !== md5Password) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const playLoad = { username: user.username, sub: user.id };

    return {
      token: await this.JwtService.signAsync(playLoad),
    };
  }
}
