import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultEntities1628190483700 implements MigrationInterface {
    name = "DefaultEntities1628190483700";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user_token" ("user_token_id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "token" varchar NOT NULL, "expires_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("user_id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "document" varchar, "email" varchar NOT NULL, "cellphone" varchar, "password" varchar NOT NULL, "is_admin" boolean NOT NULL DEFAULT (0), "validated_at" datetime, "confirmed_at" datetime, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, "cellphone" varchar, "telephone" varchar, "validated_at" datetime, "fantasy_name" varchar, "open_date" date, "end_date" date, "responsible_name" varchar, "birthday" datetime, "gender" varchar CHECK( gender IN ('M','F','O') ), "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) DEFAULT ('NÃO DECLARADA'), "mother_name" varchar, "father_name" varchar, "civil_status" varchar CHECK( civil_status IN ('SOLTEIRO','UNIÃO ESTÁVEL','CASADO','SEPARADO','DIVORCIADO','VIÚVO') ), CONSTRAINT "REL_403c951c5e9b776c16385a8940" UNIQUE ("person_id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_7968479009dcf6ffc61af19ae2" ON "person" ("type") `
        );
        await queryRunner.query(
            `CREATE TABLE "document_type" ("document_type_id" varchar PRIMARY KEY NOT NULL, "initials" varchar NOT NULL, "description" varchar NOT NULL, "person_type" varchar CHECK( person_type IN ('F','J','T') ) NOT NULL, "mask" varchar NOT NULL, "is_main" boolean NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "person_document_file" ("person_document_file_id" varchar PRIMARY KEY NOT NULL, "person_document_id" varchar NOT NULL, "filename" varchar NOT NULL, "mimetype" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "person_document" ("person_document_id" varchar PRIMARY KEY NOT NULL, "document_number" varchar NOT NULL, "dispatch_date" date NOT NULL, "issuing_agency" varchar NOT NULL, "person_name" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "person_id" varchar, "document_type_id" varchar, "createdAtCreated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_06d08640b21137b4a4ac77fa9b" UNIQUE ("document_type_id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_user_token" ("user_token_id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "token" varchar NOT NULL, "expires_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_79ac751931054ef450a2ee47778" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_user_token"("user_token_id", "user_id", "token", "expires_at", "created_at") SELECT "user_token_id", "user_id", "token", "expires_at", "created_at" FROM "user_token"`
        );
        await queryRunner.query(`DROP TABLE "user_token"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_user_token" RENAME TO "user_token"`
        );
        await queryRunner.query(`DROP INDEX "IDX_7968479009dcf6ffc61af19ae2"`);
        await queryRunner.query(
            `CREATE TABLE "temporary_person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, "cellphone" varchar, "telephone" varchar, "validated_at" datetime, "fantasy_name" varchar, "open_date" date, "end_date" date, "responsible_name" varchar, "birthday" datetime, "gender" varchar CHECK( gender IN ('M','F','O') ), "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) DEFAULT ('NÃO DECLARADA'), "mother_name" varchar, "father_name" varchar, "civil_status" varchar CHECK( civil_status IN ('SOLTEIRO','UNIÃO ESTÁVEL','CASADO','SEPARADO','DIVORCIADO','VIÚVO') ), CONSTRAINT "REL_403c951c5e9b776c16385a8940" UNIQUE ("person_id"), CONSTRAINT "FK_403c951c5e9b776c16385a8940f" FOREIGN KEY ("person_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person"("person_id", "type", "cellphone", "telephone", "validated_at", "fantasy_name", "open_date", "end_date", "responsible_name", "birthday", "gender", "ethnicity", "mother_name", "father_name", "civil_status") SELECT "person_id", "type", "cellphone", "telephone", "validated_at", "fantasy_name", "open_date", "end_date", "responsible_name", "birthday", "gender", "ethnicity", "mother_name", "father_name", "civil_status" FROM "person"`
        );
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person" RENAME TO "person"`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_7968479009dcf6ffc61af19ae2" ON "person" ("type") `
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_document_file" ("person_document_file_id" varchar PRIMARY KEY NOT NULL, "person_document_id" varchar NOT NULL, "filename" varchar NOT NULL, "mimetype" varchar NOT NULL, CONSTRAINT "FK_ddb085eb95c0591462de4f706a3" FOREIGN KEY ("person_document_id") REFERENCES "person_document" ("person_document_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_document_file"("person_document_file_id", "person_document_id", "filename", "mimetype") SELECT "person_document_file_id", "person_document_id", "filename", "mimetype" FROM "person_document_file"`
        );
        await queryRunner.query(`DROP TABLE "person_document_file"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_document_file" RENAME TO "person_document_file"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_document" ("person_document_id" varchar PRIMARY KEY NOT NULL, "document_number" varchar NOT NULL, "dispatch_date" date NOT NULL, "issuing_agency" varchar NOT NULL, "person_name" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "person_id" varchar, "document_type_id" varchar, "createdAtCreated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_06d08640b21137b4a4ac77fa9b" UNIQUE ("document_type_id"), CONSTRAINT "FK_3d2eefc8668f687831146947b31" FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_06d08640b21137b4a4ac77fa9b1" FOREIGN KEY ("document_type_id") REFERENCES "document_type" ("document_type_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_document"("person_document_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "person_id", "document_type_id", "createdAtCreated_at") SELECT "person_document_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "person_id", "document_type_id", "createdAtCreated_at" FROM "person_document"`
        );
        await queryRunner.query(`DROP TABLE "person_document"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_document" RENAME TO "person_document"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "person_document" RENAME TO "temporary_person_document"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_document" ("person_document_id" varchar PRIMARY KEY NOT NULL, "document_number" varchar NOT NULL, "dispatch_date" date NOT NULL, "issuing_agency" varchar NOT NULL, "person_name" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "person_id" varchar, "document_type_id" varchar, "createdAtCreated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_06d08640b21137b4a4ac77fa9b" UNIQUE ("document_type_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "person_document"("person_document_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "person_id", "document_type_id", "createdAtCreated_at") SELECT "person_document_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "person_id", "document_type_id", "createdAtCreated_at" FROM "temporary_person_document"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_document"`);
        await queryRunner.query(
            `ALTER TABLE "person_document_file" RENAME TO "temporary_person_document_file"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_document_file" ("person_document_file_id" varchar PRIMARY KEY NOT NULL, "person_document_id" varchar NOT NULL, "filename" varchar NOT NULL, "mimetype" varchar NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "person_document_file"("person_document_file_id", "person_document_id", "filename", "mimetype") SELECT "person_document_file_id", "person_document_id", "filename", "mimetype" FROM "temporary_person_document_file"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_document_file"`);
        await queryRunner.query(`DROP INDEX "IDX_7968479009dcf6ffc61af19ae2"`);
        await queryRunner.query(
            `ALTER TABLE "person" RENAME TO "temporary_person"`
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, "cellphone" varchar, "telephone" varchar, "validated_at" datetime, "fantasy_name" varchar, "open_date" date, "end_date" date, "responsible_name" varchar, "birthday" datetime, "gender" varchar CHECK( gender IN ('M','F','O') ), "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) DEFAULT ('NÃO DECLARADA'), "mother_name" varchar, "father_name" varchar, "civil_status" varchar CHECK( civil_status IN ('SOLTEIRO','UNIÃO ESTÁVEL','CASADO','SEPARADO','DIVORCIADO','VIÚVO') ), CONSTRAINT "REL_403c951c5e9b776c16385a8940" UNIQUE ("person_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "person"("person_id", "type", "cellphone", "telephone", "validated_at", "fantasy_name", "open_date", "end_date", "responsible_name", "birthday", "gender", "ethnicity", "mother_name", "father_name", "civil_status") SELECT "person_id", "type", "cellphone", "telephone", "validated_at", "fantasy_name", "open_date", "end_date", "responsible_name", "birthday", "gender", "ethnicity", "mother_name", "father_name", "civil_status" FROM "temporary_person"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person"`);
        await queryRunner.query(
            `CREATE INDEX "IDX_7968479009dcf6ffc61af19ae2" ON "person" ("type") `
        );
        await queryRunner.query(
            `ALTER TABLE "user_token" RENAME TO "temporary_user_token"`
        );
        await queryRunner.query(
            `CREATE TABLE "user_token" ("user_token_id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "token" varchar NOT NULL, "expires_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`
        );
        await queryRunner.query(
            `INSERT INTO "user_token"("user_token_id", "user_id", "token", "expires_at", "created_at") SELECT "user_token_id", "user_id", "token", "expires_at", "created_at" FROM "temporary_user_token"`
        );
        await queryRunner.query(`DROP TABLE "temporary_user_token"`);
        await queryRunner.query(`DROP TABLE "person_document"`);
        await queryRunner.query(`DROP TABLE "person_document_file"`);
        await queryRunner.query(`DROP TABLE "document_type"`);
        await queryRunner.query(`DROP INDEX "IDX_7968479009dcf6ffc61af19ae2"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_token"`);
    }
}
