import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  tecName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  creatorsName: string;
}
