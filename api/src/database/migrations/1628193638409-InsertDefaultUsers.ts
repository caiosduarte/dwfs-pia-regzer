import { hash } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDefaultUsers1628193638409 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO user (user_id, name, document, cellphone, email, password, is_admin, is_valid, is_confirmed) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",

            [
                "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
                "ADMIN",
                null,
                null,
                "admin@regzer.com.br",
                await hash("root", 8),
                true,
                true,
                true,
            ]
        );

        await queryRunner.query(
            "INSERT INTO person (person_id, type) VALUES (?, ?);",
            ["ba8e4a63-9a01-4bc9-aef9-1e0793bb2548", "J"]
        );

        await queryRunner.query(
            "INSERT INTO person_company(person_company_id, fantasy_name, open_date, responsible_name) VALUES (?, ?, ?, ?);",
            [
                "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
                "Regzer",
                "2021-08-01 23:34:19",
                "Caio",
            ]
        );

        await queryRunner.query(
            "INSERT INTO user (user_id, name, document, cellphone, email, password, is_admin, is_valid, is_confirmed) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [
                "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
                "Caio Duarte",
                "01351676636",
                "5531984227833",
                "caiosduarte@gmail.com",
                await hash("password123", 8),
                false,
                true,
                true,
            ]
        );

        await queryRunner.query(
            "INSERT INTO person (person_id, type) VALUES (?, ?);",
            ["ff9bf59a-70dc-4a80-a4b1-144fadfa8209", "F"]
        );

        await queryRunner.query(
            "INSERT INTO person_individual(person_individual_id, birthday, gender, ethnicity, father_name, mother_name, civil_status)  VALUES (?, ?, ?, ?, ?,?,?);",
            [
                "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
                "2021-08-01 23:34:19",
                "M",
                "BRANCO",
                "P",
                "R",
                "SOLTEIRO",
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "DELETE FROM person_company WHERE person_company_id IN (?)",
            ["ba8e4a63-9a01-4bc9-aef9-1e0793bb2548"]
        );

        await queryRunner.query(
            "DELETE FROM person_individual WHERE person_individual_id IN (?)",
            ["ff9bf59a-70dc-4a80-a4b1-144fadfa8209"]
        );

        await queryRunner.query(
            "DELETE FROM person WHERE person_id IN (?, ?)",
            [
                "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
                "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
            ]
        );
        await queryRunner.query("DELETE FROM user WHERE user_id IN (?, ?)", [
            "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
            "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
        ]);
    }
}
