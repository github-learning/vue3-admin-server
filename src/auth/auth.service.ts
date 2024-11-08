import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';

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
    console.log('user', user);
    const md5Password = md5(password).toUpperCase();
    console.log('user', user, md5Password);
    if (password !== md5Password) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    const playload = { username: user.username, sub: user.id };
    return {
      token: this.JwtService.signAsync(playload),
    };
  }
}
