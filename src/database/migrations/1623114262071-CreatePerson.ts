import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePeople1623114262071 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "uuid",
                    },
                    {
                        name: "is_valid",
                        type: "boolean",
                        default: "false",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_user_id_person",
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
    }
}
