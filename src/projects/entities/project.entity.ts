import { PriorityProjectEnum, StatusEnum } from "src/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'projects' })
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text', nullable: false, unique: true})
    projectName: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    startDate: Date;

    @Column({type: 'date', nullable: true})
    endDate?: Date;

    @Column({type: 'enum', enum: StatusEnum, default: StatusEnum.PROCESSING, nullable: false})
    status: StatusEnum;

    @Column({type: 'enum', enum: PriorityProjectEnum, nullable: false})
    priority: PriorityProjectEnum;

    @Column({type: 'text', array: true, nullable: false})
    teamMembers: string[];

    @Column({type: 'text', nullable: false})
    clientName: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'boolean', default: true})
    isActive: boolean;
    
    
}
