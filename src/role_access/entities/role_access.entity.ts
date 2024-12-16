import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/role/entities/role.entity'; // 假设角色实体文件名为 role.entity.ts
import { Menu } from 'src/menu/entities/menu.entity'; // 假设权限实体文件名为 access.entity.ts

@Entity('r_a')
export class RoleAccess {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({
    type: 'int',
    nullable: true,
    comment: '外键 关联access表id',
    name: 'access_id',
  })
  accessId: number | null;

  @Column({
    type: 'int',
    nullable: true,
    comment: '外键 关联roles表id',
    name: 'role_id',
  })
  roleId: number | null;

  @CreateDateColumn({ type: 'datetime', comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '更新时间' })
  updatedAt: Date;

  @ManyToOne(() => Menu, (access) => access.roleAccesses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'access_id' })
  access: Menu;

  @ManyToOne(() => Role, (role) => role.roleAccesses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
