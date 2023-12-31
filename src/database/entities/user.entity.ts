import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { RoleEnum } from '../../enums/role.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  OneToMany,
} from 'typeorm';
import { Vacancy } from './vacancies.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  password: string;

  @Column({
    type: 'enum',
    nullable: false,
    default: RoleEnum.candidate,
    enum: RoleEnum,
  })
  role: RoleEnum;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Vacancy, vacancies => vacancies.advertiser)
  vacancies: Vacancy[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async passwordHash() {
    if (!this.password || this.password.trim() === '') {
      return;
    }
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Password hash error');
    }
  }
}
