import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Vacancy {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type:'varchar', length: 80, nullable: false})
    vacancyRole: string

    @Column({type:'int', nullable: false})
    wage: number;

    @Column({type: 'varchar', length: 80, nullable: false})
    location: string;

    @Column({type:'varchar', length: 80, nullable: false})
    vacancyType: string;

    @Column({type:'text', nullable: false})
    vacancyDescription: string;

    @Column({type:'varchar', length: 64, nullable: false})
    level: string;

    @Column({type:'int', nullable: false})
    companyId: number;

    @Column({type:'int', nullable: false})
    advertiserId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}