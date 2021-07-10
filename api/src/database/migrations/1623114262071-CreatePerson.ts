import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { ALL_PERSON_TYPES, enumJoinedValues } from "../../entities/Enum";

export class CreatePeople1623114262071 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person",
                columns: [
                    {
                        name: "person_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },

                    {
                        name: "cellphone",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "telephone",
                        type: "varchar",
                        isNullable: true,
                    },

                    {
                        name: "is_valid",
                        type: "boolean",
                        default: "false",
                    },
                    {
                        name: "valid_at",
                        type: "timestamp",
                        default: null,
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_user_id_person",
                        referencedTableName: "user",
                        referencedColumnNames: ["user_id"],
                        columnNames: ["person_id"],
                    },
                ],
                checks: [
                    {
                        name: "ck_type_person",
                        columnNames: ["type"],
                        expression: `type IN (${enumJoinedValues(
                            ALL_PERSON_TYPES
                        )})`,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
    }
}
