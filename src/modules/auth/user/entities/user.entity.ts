import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn({type: 'uuid'})
    public uuid: string;

    @Column({type: 'string'})
    public username: string;

    @Column({type: 'string'})
    public password: string;

    @Column({type: 'string'})
    public firstName: string;

    @Column({type: 'string'})
    public middleName: string;

    @Column({type: 'string'})
    public lastName: string;

    @Column({type: 'string'})
    public email: string;

    @Column({type: 'string'})
    public phoneNumber: string;

    @Column({type: 'int'})
    public age: number;
    
    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
