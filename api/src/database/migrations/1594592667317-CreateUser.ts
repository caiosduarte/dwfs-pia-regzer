import { hash } from "bcrypt";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1594592667317 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "user_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "document",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "cellphone",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "is_admin",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "is_valid",
                        type: "boolean",
                        default: true,
                    },

                    {
                        name: "is_confirmed",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );

        await queryRunner.query(
            "INSERT INTO user (user_id, name, document, cellphone, email, password, is_admin, is_valid, is_confirmed) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [
                "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
                "ADMIN",
                "",
                "",
                "caiosduarte@yahoo.com.br",
                await hash("root", 8),
                true,
                true,
                true,
            ]
        );

        await queryRunner.query(
            "INSERT INTO user (user_id, name, document, cellphone, email, password, is_admin, is_valid, is_confirmed) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [
                "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
                "Caio Duarte",
                "01351676636",
                "31984227833",
                "caiosduarte@gmail.com",
                await hash("password123", 8),
                false,
                true,
                true,
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}
