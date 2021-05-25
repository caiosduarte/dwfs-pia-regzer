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
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
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
                        isNullable: true,
                    },
                    {
                        name: "is_confirmed",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}
