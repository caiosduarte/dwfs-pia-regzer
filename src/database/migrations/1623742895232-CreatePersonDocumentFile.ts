import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePersonDocumentFile1623742895232
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person_document_file",
                columns: [
                    {
                        name: "person_document_file_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "person_document_id",
                        type: "character",
                        length: "36",
                    },
                    {
                        name: "filename",
                        type: "text",
                    },
                    {
                        name: "mimetype",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_person_document_id_person_document_file",
                        referencedTableName: "person_document",
                        referencedColumnNames: ["person_document_id"],
                        columnNames: ["person_document_id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person_document_file");
    }
}
