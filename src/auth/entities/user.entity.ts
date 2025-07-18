import { RolesEnum } from "src/common";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TokenUser } from "./token.entity";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'text', nullable: false, unique: true })
    username: string;
    
    @Column({ type: 'text', nullable: false, select: false }) // 'select: false' ensures the password is not returned in queries
    password: string;
        
    @Column({ type: 'text', nullable: false, unique: true })
    email: string;

    @Column({ type: 'bool', default: true })
    isActive: boolean;

    @Column({ type: 'bool', default: false })
    isVerified: boolean;

    // @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' }) si el array por defecto es vacio pero si quiero que por defecto tome un valor de mi ennum
    @Column({
    type: 'text',
    array: true,
    default: () => `'{"user"}'::text[]` 
    })
    roles: RolesEnum[]; // Assuming roles is an array of RolesEnum
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToOne(() => TokenUser, token => token.user, { eager: true})
    token: TokenUser; // Assuming you have a TokenUser entity defined elsewhere
 
}
