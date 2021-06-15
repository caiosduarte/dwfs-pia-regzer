import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePersonCompany1623742773424 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person_company",
                columns: [
                    {
                        name: "person_company_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "fantasy_name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "open_date",
                        type: "date",
                    },
                    {
                        name: "end_date",
                        type: "date",
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: "responsible_document_id",
                        type: "character",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "responsible_name",
                        type: "varchar",
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_person_id_person_company",
                        referencedTableName: "person",
                        referencedColumnNames: ["person_id"],
                        columnNames: ["person_company_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "fk_person_document_id_person_company",
                        referencedTableName: "person_document",
                        referencedColumnNames: ["person_document_id"],
                        columnNames: ["responsible_document_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person_company");
    }
}
