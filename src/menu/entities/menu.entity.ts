import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('access')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1, comment: '权限类型：菜单' })
  type: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '标题名称',
  })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'url地址' })
  path: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'icon名称' })
  icon: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '路由name' })
  name: string | null;

  @Column({ type: 'int', nullable: false, comment: '排序权重' })
  sortId: number;

  // @Column({ type: 'int', nullable: true, comment: '父id' })
  // parentId: number | null; // 支持 NULL 值
  // 明确指定字段名映射，数据库字段名与实体属性名有时不一致
  @Column({ type: 'int', nullable: true, comment: '父id', name: 'parent_id' })
  parentId: number | null;

  @Column({ type: 'int', default: 1, comment: '状态 0禁止 1正常' })
  status: number;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '描述' })
  description: string | null;

  @CreateDateColumn({
    type: 'datetime',
    name: 'createdAt',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updatedAt',
    comment: '更新时间',
  })
  updatedAt: Date;
}
