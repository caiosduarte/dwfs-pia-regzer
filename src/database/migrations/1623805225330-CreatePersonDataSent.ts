import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePersonDataSent1623805225330 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person_data_sent",
                columns: [
                    {
                        name: "person_data_sent_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "person_id",
                        type: "character",
                        length: "36",
                    },
                    {
                        name: "field_name",
                        type: "varchar",
                    },
                    {
                        name: "old_value",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "new_value",
                        type: "text",
                    },
                    {
                        name: "analyst_id",
                        type: "character",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "user_message",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "is_valid",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "valid_at",
                        type: "timestamp",
                        isNullable: true,
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
                foreignKeys: [
                    {
                        name: "fk_person_id_person_data_sent",
                        referencedTableName: "person",
                        referencedColumnNames: ["person_id"],
                        columnNames: ["person_id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person_data_sent");
    }
}
