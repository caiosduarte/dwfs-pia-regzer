import { hash } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDefaultUsers1628288180516 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO user (user_id, name, document, cellphone, email, password, is_admin, validated_at, confirmed_at) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));",

            [
                "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
                "ADMIN",
                null,
                null,
                "admin@regzer.com.br",
                await hash("root", 8),
                true,
            ]
        );

        await queryRunner.query(
            "INSERT INTO person(person_id, type, fantasy_name, open_date, responsible_name) VALUES (?,?, ?, ?, ?);",
            [
                "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
                "J",
                "Regzer",
                "2021-08-01 23:34:19",
                "Caio",
            ]
        );

        await queryRunner.query(
            "INSERT INTO user (user_id, name, document, cellphone, email, password, is_admin, validated_at, confirmed_at) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?,  datetime('now'), datetime('now'));",
            [
                "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
                "Caio Duarte",
                "01351676636",
                "5531984227833",
                "caiosduarte@gmail.com",
                await hash("password123", 8),
                false,
            ]
        );

        await queryRunner.query(
            "INSERT INTO person(person_id, type, birthday, gender, ethnicity, father_name, mother_name, civil_status)  VALUES (?, ?, ?, ?, ?, ?,?,?);",
            [
                "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
                "F",
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
            "DELETE FROM person WHERE person_id IN (?, ?)",
            [
                "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
                "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
            ]
        );
        await queryRunner.query("DELETE FROM user WHERE user_id IN (?, ?)", [
            "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
            "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
        ]);
    }
}
