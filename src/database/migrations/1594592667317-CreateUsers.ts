import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1594592667317 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
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
                        name: "is_confirmed",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}
