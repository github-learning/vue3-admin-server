import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// 表名
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: true, comment: 'user name' })
  name: string;

  @Column({ nullable: true, comment: 'user age' })
  age: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    comment: 'created time',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    comment: 'updated time',
  })
  updatedAt: Date;
}
