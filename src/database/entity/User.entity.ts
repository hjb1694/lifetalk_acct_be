import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    SYSTEM = 'SYSTEM',
    ADMINISTRATOR = 'ADMINISTRATOR', 
    STAFF = 'STAFF', 
    PLATINUM_MODERATOR = 'PLATINUM_MODERATOR', 
    GOLD_MODERATOR = 'GOLD_MODERATOR', 
    BRONZE_MODERATOR = 'BRONZE_MODERATOR', 
    REGULAR_USER = 'REGULAR_USER'
}

export enum UserStatus {
    ACTIVE = 'ACTIVE', 
    BANNED = 'BANNED',
    FROZEN = 'FROZEN', 
    SELF_DEACTIVATED = 'SELF_DEACTIVATED', 
    NOT_VERIFIED = 'NOT_VERIFIED'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar', 
        name: 'username',
        unique: true, 
        nullable: false
    })
    username: string;

    @Column({
        type: 'varchar', 
        name: 'email', 
        nullable: false
    })
    email: string;

    @Column({
        type: 'text', 
        name: 'password', 
        nullable: false
    })
    password: string;

    @Column({
        type: 'date', 
        name: 'dob', 
        nullable: false
    })
    dob: Date

    @Column({
        type: 'enum', 
        name: 'role', 
        enum: UserRole, 
        nullable: false
    })
    role: UserRole;

    @Column({
        type: 'enum', 
        name: 'status', 
        enum: UserStatus, 
        nullable: false, 
        default: UserStatus.NOT_VERIFIED
    })
    status: UserStatus

}