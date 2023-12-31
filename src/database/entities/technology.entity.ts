import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vacancy } from './vacancies.entity';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  techName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  creatorsName: string;

  @ManyToMany(() => Vacancy, vacancy => vacancy.technologies, {
    onDelete: 'CASCADE',
  })
  vacancies: Vacancy[];
}
