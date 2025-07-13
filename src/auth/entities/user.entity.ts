import { RolesEnum } from "src/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'text', nullable: false, unique: true })
    username: string;
    
    @Column({ type: 'text', nullable: false })
    password: string;
    
    @Column({ type: 'text', nullable: false, unique: true })
    email: string;

    @Column({ type: 'bool', default: true })
    isActive: boolean;

    // @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' }) si el array por defecto es vacio pero si quiero que por defecto tome un valor de mi ennum
    @Column({
    type: 'text',
    array: true,
    default: () => `'{"user"}'::text[]` // ⭐ ¡Cambio clave aquí! ⭐
    })
    roles: RolesEnum[]; // Assuming roles is an array of RolesEnum
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
 
}
