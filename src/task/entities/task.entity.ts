import { PriorityEnum,StatusEnum } from "src/common";
import { Project } from "src/project/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('tasks')
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text', nullable: false, unique: true})
    taskName: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    startDate: Date;

    @Column({type: 'date', nullable: true})
    endDate?: Date;

    @Column({type: 'enum', enum: StatusEnum, default: StatusEnum.PROCESSING, nullable: false})
    status: StatusEnum;

    @Column({type: 'enum', enum: PriorityEnum, nullable: false})
    priority: PriorityEnum;


    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'boolean', default: true})
    isActive: boolean;

    //Relation with Project entity
        @ManyToOne(
        () => Project,     
        (project) => project.tasks, { eager:false,  onDelete: 'CASCADE' })
        @JoinColumn({ name: 'projectId' })
        projectId: Project; 

}
