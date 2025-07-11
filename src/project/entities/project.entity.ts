    import { PriorityEnum, StatusEnum } from "src/common";
    import { Task } from "src/task/entities/task.entity";
    import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



    @Entity()
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

        @Column({type: 'enum', enum: PriorityEnum, nullable: false})
        priority: PriorityEnum;

        //@Column({type: 'text', array: true, nullable: false, default: () => 'ARRAY[]::text[]'})
        //teamMembers: string[];

        @Column({type: 'text', nullable: false})
        clientName: string;

        @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
        createdAt: Date;

        @Column({type: 'boolean', default: true})
        isActive: boolean;

        //Relation with Task entity
        @OneToMany(() => Task, 
        (task) => task.project, { eager:true, cascade: true })
        tasks : Task[]; 

    }
