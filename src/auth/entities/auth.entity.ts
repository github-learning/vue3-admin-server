// // 实体类
// export class Auth {
//   ID: number;
//   username: string;
//   password: string;
//   role: string;
//   token: string;
//   createTime: Date;
//   updateTime: Date;
// }

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
