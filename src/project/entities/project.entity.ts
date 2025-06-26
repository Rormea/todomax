import { PriorityProjectEnum, StatusEnum } from "src/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
/**
 * Represents a project entity with details such as name, description, dates, status, priority, team members, and client information.
 *
 * @property {string} id - Unique identifier for the project (UUID).
 * @property {string} projectName - Name of the project (must be unique).
 * @property {string} description - Description of the project.
 * @property {Date} startDate - Timestamp indicating when the project started.
 * @property {Date} [endDate] - Optional date indicating when the project ended.
 * @property {StatusEnum} status - Current status of the project.
 * @property {PriorityProjectEnum} priority - Priority level of the project.
 * @property {string[]} teamMembers - List of team member names involved in the project.
 * @property {string} clientName - Name of the client associated with the project.
 * @property {Date} createdAt - Timestamp indicating when the project was created.
 * @property {boolean} isActive - Indicates whether the project is currently active.
 */
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

    //@Column({type: 'text', array: true, nullable: false, default: () => 'ARRAY[]::text[]'})
    //teamMembers: string[];

    @Column({type: 'text', nullable: false})
    clientName: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'boolean', default: true})
    isActive: boolean;
    
    
}
