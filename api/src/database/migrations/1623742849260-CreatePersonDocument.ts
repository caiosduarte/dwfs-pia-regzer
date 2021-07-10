import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePersonDocument1623742849260 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person_document",
                columns: [
                    {
                        name: "person_document_id",
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
                        name: "document_type_id",
                        type: "character",
                        length: "36",
                    },
                    {
                        name: "document_number",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "dispatch_date",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "issuing_agency",
                        type: "varchar",
                        length: "30",
                        isNullable: true,
                    },
                    {
                        name: "person_name",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "is_main",
                        type: "boolean",
                        default: false,
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_person_id_person_document",
                        referencedTableName: "person",
                        referencedColumnNames: ["person_id"],
                        columnNames: ["person_id"],
                    },
                    {
                        name: "fk_document_type_id_document_type",
                        referencedTableName: "document_type",
                        referencedColumnNames: ["document_type_id"],
                        columnNames: ["document_type_id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person_document");
    }
}
