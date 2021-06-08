import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDocument1623116289430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person_document",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "person_id",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "filename",
                        type: "string",
                    },
                    {
                        name: "mimetype",
                        type: "string",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_person_id_person_document",
                        referencedTableName: "person",
                        referencedColumnNames: ["id"],
                        columnNames: ["person_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person_document");
    }
}
