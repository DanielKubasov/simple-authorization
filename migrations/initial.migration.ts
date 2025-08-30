import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoringTIMESTAMP implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        // USERS

        queryRunner.query(
            `
                CREATE TABLE users (
                    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    first_name VARCHAR(255) NOT NULL,
                    middle_name VARCHAR(255),
                    last_name VARCHAR(255),
                    email VARCHAR(255),
                    phone_number VARCHAR(255),
                    age INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        // USERS

        queryRunner.query('DROP TABLE users');
    }
}
