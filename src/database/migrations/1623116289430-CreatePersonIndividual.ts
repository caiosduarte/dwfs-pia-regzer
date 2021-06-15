import { MigrationInterface, QueryRunner, Table } from "typeorm";
import {
    CIVIL_STATUS,
    enumJoinedValues,
    ETHNICITY,
    GENDER,
} from "../../entities/Enum";

export class CreatePersonIndividual1623116289430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person_individual",
                columns: [
                    {
                        name: "person_individual_id",
                        type: "character",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "birthday",
                        type: "date",
                    },
                    {
                        name: "gender",
                        type: "character",
                        length: "1",
                    },
                    {
                        name: "ethnicity",
                        type: "varchar",
                    },
                    {
                        name: "father_name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "mother_name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "civil_status",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_person_id_person_individual",
                        referencedTableName: "person",
                        referencedColumnNames: ["person_id"],
                        columnNames: ["person_individual_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
                checks: [
                    {
                        name: "ck_gender_person_individual",
                        columnNames: ["gender"],
                        expression: `gender IN(${enumJoinedValues(GENDER)})`,
                    },
                    {
                        name: "ck_ethnicity_person_individual",
                        columnNames: ["ethnicity"],
                        expression: `ethnicity IN(${enumJoinedValues(
                            ETHNICITY
                        )})`,
                    },
                    {
                        name: "ck_civil_status_person_individual",
                        columnNames: ["civil_status"],
                        expression: `civil_status IN(${enumJoinedValues(
                            CIVIL_STATUS
                        )})`,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person_individual");
    }
}
