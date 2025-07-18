import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity('tokens')
export class TokenUser {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text',  unique: true })
    token : string;


    @OneToOne(() => User, user => user.token, { onDelete: 'CASCADE' })
    user : User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
} 