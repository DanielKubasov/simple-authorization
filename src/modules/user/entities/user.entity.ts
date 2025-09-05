import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column('text')
    public username: string;

    @Column('text')
    public password: string;

    @Column('text')
    public firstName: string;

    @Column('text')
    public middleName: string;

    @Column('text')
    public lastName: string;

    @Column('text')
    public email: string;

    @Column('text')
    public phoneNumber: string;

    @Column('int')
    public age: number;

    @Column('text', { nullable: true, default: null })
    public avatarUrl: string;

    @Column('timestamp with time zone', { default: new Date().toISOString() })
    public lastSeenAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
