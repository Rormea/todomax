import { Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'projects' })
export class Project {

    @PrimaryGeneratedColumn('uuid')
        id: string;


    
}
