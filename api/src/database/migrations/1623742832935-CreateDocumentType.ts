import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { enumJoinedValues, PERSON_TYPES } from "../../entities/Enum";

export class CreateDocumentType1623742832935 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "document_type",
                columns: [
                    {
                        name: "documento_type_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "initials",
                        type: "varchar",
                        length: "10",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "text",
                    },
                    {
                        name: "person_type",
                        type: "character",
                        length: "1",
                    },
                    {
                        name: "mask",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "is_main",
                        type: "boolean",
                        default: "false",
                    },
                ],
                checks: [
                    {
                        name: "ck_person_type_document_type",
                        columnNames: ["person_type"],
                        expression: `person_type IN (${enumJoinedValues(
                            PERSON_TYPES
                        )},'T')`,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("document_type");
    }
}
