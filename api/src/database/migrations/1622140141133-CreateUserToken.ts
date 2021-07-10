import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateToken1622140141133 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_token",
                columns: [
                    {
                        name: "user_token_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "character",
                        length: "36",
                    },
                    {
                        name: "token",
                        type: "varchar",
                    },
                    {
                        name: "expires_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_user_id_user_token",
                        referencedTableName: "user",
                        referencedColumnNames: ["user_id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_token");
    }
}
