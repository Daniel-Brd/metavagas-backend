import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  address: string;

  @Column({ type: 'date', nullable: false })
  foundedAt: Date;

  @Column({ type: 'text', nullable: false })
  description: string;
}
