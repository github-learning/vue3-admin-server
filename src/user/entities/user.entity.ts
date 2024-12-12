import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user") // 表明该实体对应的是数据库中的 `user` 表
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, comment: "用户名" })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "密码" })
  password: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "用户邮箱" })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "手机号" })
  mobile: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "头像" })
  avatar: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "描述说明" })
  description: string;

  @Column({ type: "tinyint", default: 0, comment: "超级管理员 1是 0不是" })
  isSuper: boolean;

  // @Column({ type: 'tinyint', default: 1, comment: '账户禁用状态 1正常 0禁用' })
  // status: boolean;
  @Column({ type: "tinyint", default: 1, comment: "账户禁用状态 1正常 0禁用" })
  status: number;

  @CreateDateColumn({ type: "datetime", comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime", comment: "更新时间" })
  updatedAt: Date;

  @Column({ type: "simple-array", nullable: true, comment: "角色ID数组" })
  roleIds: number[]; // 直接存储角色 ID 的数组
}
