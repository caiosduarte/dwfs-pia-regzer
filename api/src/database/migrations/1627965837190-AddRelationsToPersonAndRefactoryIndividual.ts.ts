import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsToPersonAndRefactoryIndividual1627965837190
    implements MigrationInterface
{
    name = "AddRelationsToPersonAndRefactoryIndividual1627965837190";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "temporary_user" ("user_id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "document" varchar, "email" varchar NOT NULL, "cellphone" varchar, "password" varchar NOT NULL, "is_admin" boolean NOT NULL DEFAULT (0), "is_valid" boolean NOT NULL DEFAULT (1), "is_confirmed" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "validated_at" datetime, "confirmed_at" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_user"("user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at") SELECT "user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at" FROM "user"`
        );
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_user" RENAME TO "user"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL, CONSTRAINT "FK_6ffe10839f581769aa801882859" FOREIGN KEY ("person_individual_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "person_individual"`
        );
        await queryRunner.query(`DROP TABLE "person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_individual" RENAME TO "person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime, CONSTRAINT "FK_403c951c5e9b776c16385a8940f" FOREIGN KEY ("person_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "person"`
        );
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person" RENAME TO "person"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL, CONSTRAINT "FK_7da75ef700b766ecea3b1a7f0ca" FOREIGN KEY ("person_company_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "person_company"`
        );
        await queryRunner.query(`DROP TABLE "person_company"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_company" RENAME TO "person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_user" ("user_id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "document" varchar, "email" varchar NOT NULL, "cellphone" varchar, "password" varchar NOT NULL, "is_admin" boolean NOT NULL DEFAULT (0), "is_valid" boolean NOT NULL DEFAULT (1), "is_confirmed" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "validated_at" datetime, "confirmed_at" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_user"("user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at") SELECT "user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at" FROM "user"`
        );
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_user" RENAME TO "user"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "person_individual"`
        );
        await queryRunner.query(`DROP TABLE "person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_individual" RENAME TO "person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL, CONSTRAINT "UQ_75fe79bf9be8eda468e5c7f8530" UNIQUE ("person_individual_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "person_individual"`
        );
        await queryRunner.query(`DROP TABLE "person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_individual" RENAME TO "person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "person"`
        );
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person" RENAME TO "person"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_document" ("person_document_id" varchar PRIMARY KEY NOT NULL, "person_id" varchar NOT NULL, "document_type_id" varchar, "document_number" varchar NOT NULL, "dispatch_date" date NOT NULL, "issuing_agency" varchar NOT NULL, "person_name" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "createdAtCreated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_06d08640b21137b4a4ac77fa9b1" UNIQUE ("document_type_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_document"("person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at") SELECT "person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at" FROM "person_document"`
        );
        await queryRunner.query(`DROP TABLE "person_document"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_document" RENAME TO "person_document"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "person_company"`
        );
        await queryRunner.query(`DROP TABLE "person_company"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_company" RENAME TO "person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_data_sent" ("person_data_sent_id" varchar PRIMARY KEY NOT NULL, "field_name" varchar NOT NULL, "old_value" text NOT NULL, "new_value" text NOT NULL, "user_message" text NOT NULL, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime NOT NULL, "person_id" varchar, "analyst_id" varchar, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_data_sent"("person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at") SELECT "person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at" FROM "person_data_sent"`
        );
        await queryRunner.query(`DROP TABLE "person_data_sent"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_data_sent" RENAME TO "person_data_sent"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime, CONSTRAINT "UQ_ab7fa85d3ddc83703498fd7cb68" UNIQUE ("person_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "person"`
        );
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person" RENAME TO "person"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL, CONSTRAINT "UQ_9a3dfdefcdcee927b268f3e9f8b" UNIQUE ("person_company_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "person_company"`
        );
        await queryRunner.query(`DROP TABLE "person_company"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_company" RENAME TO "person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_document" ("person_document_id" varchar PRIMARY KEY NOT NULL, "person_id" varchar NOT NULL, "document_type_id" varchar, "document_number" varchar NOT NULL, "dispatch_date" date NOT NULL, "issuing_agency" varchar NOT NULL, "person_name" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "createdAtCreated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_06d08640b21137b4a4ac77fa9b1" UNIQUE ("document_type_id"), CONSTRAINT "FK_3d2eefc8668f687831146947b31" FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_06d08640b21137b4a4ac77fa9b1" FOREIGN KEY ("document_type_id") REFERENCES "document_type" ("document_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_document"("person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at") SELECT "person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at" FROM "person_document"`
        );
        await queryRunner.query(`DROP TABLE "person_document"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_document" RENAME TO "person_document"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL, CONSTRAINT "UQ_75fe79bf9be8eda468e5c7f8530" UNIQUE ("person_individual_id"), CONSTRAINT "FK_6ffe10839f581769aa801882859" FOREIGN KEY ("person_individual_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "person_individual"`
        );
        await queryRunner.query(`DROP TABLE "person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_individual" RENAME TO "person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime, CONSTRAINT "UQ_ab7fa85d3ddc83703498fd7cb68" UNIQUE ("person_id"), CONSTRAINT "FK_403c951c5e9b776c16385a8940f" FOREIGN KEY ("person_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "person"`
        );
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person" RENAME TO "person"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL, CONSTRAINT "UQ_9a3dfdefcdcee927b268f3e9f8b" UNIQUE ("person_company_id"), CONSTRAINT "FK_7da75ef700b766ecea3b1a7f0ca" FOREIGN KEY ("person_company_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "person_company"`
        );
        await queryRunner.query(`DROP TABLE "person_company"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_company" RENAME TO "person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_person_data_sent" ("person_data_sent_id" varchar PRIMARY KEY NOT NULL, "field_name" varchar NOT NULL, "old_value" text NOT NULL, "new_value" text NOT NULL, "user_message" text NOT NULL, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime NOT NULL, "person_id" varchar, "analyst_id" varchar, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_110699897ddf3d01e9ae708e8e9" FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_cffb270571916505dcf84d8f250" FOREIGN KEY ("analyst_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_person_data_sent"("person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at") SELECT "person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at" FROM "person_data_sent"`
        );
        await queryRunner.query(`DROP TABLE "person_data_sent"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_person_data_sent" RENAME TO "person_data_sent"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "person_data_sent" RENAME TO "temporary_person_data_sent"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_data_sent" ("person_data_sent_id" varchar PRIMARY KEY NOT NULL, "field_name" varchar NOT NULL, "old_value" text NOT NULL, "new_value" text NOT NULL, "user_message" text NOT NULL, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime NOT NULL, "person_id" varchar, "analyst_id" varchar, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`
        );
        await queryRunner.query(
            `INSERT INTO "person_data_sent"("person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at") SELECT "person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at" FROM "temporary_person_data_sent"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_data_sent"`);
        await queryRunner.query(
            `ALTER TABLE "person_company" RENAME TO "temporary_person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL, CONSTRAINT "UQ_9a3dfdefcdcee927b268f3e9f8b" UNIQUE ("person_company_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "temporary_person_company"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_company"`);
        await queryRunner.query(
            `ALTER TABLE "person" RENAME TO "temporary_person"`
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime, CONSTRAINT "UQ_ab7fa85d3ddc83703498fd7cb68" UNIQUE ("person_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "temporary_person"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person"`);
        await queryRunner.query(
            `ALTER TABLE "person_individual" RENAME TO "temporary_person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL, CONSTRAINT "UQ_75fe79bf9be8eda468e5c7f8530" UNIQUE ("person_individual_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "temporary_person_individual"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "person_document" RENAME TO "temporary_person_document"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_document" ("person_document_id" varchar PRIMARY KEY NOT NULL, "person_id" varchar NOT NULL, "document_type_id" varchar, "document_number" varchar NOT NULL, "dispatch_date" date NOT NULL, "issuing_agency" varchar NOT NULL, "person_name" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "createdAtCreated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_06d08640b21137b4a4ac77fa9b1" UNIQUE ("document_type_id"))`
        );
        await queryRunner.query(
            `INSERT INTO "person_document"("person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at") SELECT "person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at" FROM "temporary_person_document"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_document"`);
        await queryRunner.query(
            `ALTER TABLE "person_company" RENAME TO "temporary_person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "temporary_person_company"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_company"`);
        await queryRunner.query(
            `ALTER TABLE "person" RENAME TO "temporary_person"`
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime)`
        );
        await queryRunner.query(
            `INSERT INTO "person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "temporary_person"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person"`);
        await queryRunner.query(
            `ALTER TABLE "person_data_sent" RENAME TO "temporary_person_data_sent"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_data_sent" ("person_data_sent_id" varchar PRIMARY KEY NOT NULL, "field_name" varchar NOT NULL, "old_value" text NOT NULL, "new_value" text NOT NULL, "user_message" text NOT NULL, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime NOT NULL, "person_id" varchar, "analyst_id" varchar, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_110699897ddf3d01e9ae708e8e9" FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "person_data_sent"("person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at") SELECT "person_data_sent_id", "field_name", "old_value", "new_value", "user_message", "is_valid", "valid_at", "person_id", "analyst_id", "updated_at", "created_at" FROM "temporary_person_data_sent"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_data_sent"`);
        await queryRunner.query(
            `ALTER TABLE "person_company" RENAME TO "temporary_person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL, CONSTRAINT "FK_7da75ef700b766ecea3b1a7f0ca" FOREIGN KEY ("person_company_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "temporary_person_company"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_company"`);
        await queryRunner.query(
            `ALTER TABLE "person_document" RENAME TO "temporary_person_document"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_document" ("person_document_id" varchar PRIMARY KEY NOT NULL, "person_id" varchar NOT NULL, "document_type_id" varchar, "document_number" varchar NOT NULL, "dispatch_date" date NOT NULL, "issuing_agency" varchar NOT NULL, "person_name" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "createdAtCreated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_06d08640b21137b4a4ac77fa9b1" UNIQUE ("document_type_id"), CONSTRAINT "FK_3d2eefc8668f687831146947b31" FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "person_document"("person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at") SELECT "person_document_id", "person_id", "document_type_id", "document_number", "dispatch_date", "issuing_agency", "person_name", "is_main", "createdAtCreated_at" FROM "temporary_person_document"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_document"`);
        await queryRunner.query(
            `ALTER TABLE "person" RENAME TO "temporary_person"`
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime, CONSTRAINT "FK_403c951c5e9b776c16385a8940f" FOREIGN KEY ("person_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "temporary_person"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person"`);
        await queryRunner.query(
            `ALTER TABLE "person_individual" RENAME TO "temporary_person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "temporary_person_individual"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "person_individual" RENAME TO "temporary_person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL, CONSTRAINT "FK_6ffe10839f581769aa801882859" FOREIGN KEY ("person_individual_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "temporary_person_individual"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "user" RENAME TO "temporary_user"`
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("user_id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "document" varchar, "email" varchar NOT NULL, "cellphone" varchar, "password" varchar NOT NULL, "is_admin" boolean NOT NULL DEFAULT (0), "is_valid" boolean NOT NULL DEFAULT (1), "is_confirmed" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "validated_at" datetime, "confirmed_at" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
        );
        await queryRunner.query(
            `INSERT INTO "user"("user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at") SELECT "user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at" FROM "temporary_user"`
        );
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(
            `ALTER TABLE "person_company" RENAME TO "temporary_person_company"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_company" ("person_company_id" varchar PRIMARY KEY NOT NULL, "fantasy_name" varchar NOT NULL, "open_date" date NOT NULL, "end_date" date, "responsible_name" varchar NOT NULL, CONSTRAINT "FK_7da75ef700b766ecea3b1a7f0ca" FOREIGN KEY ("person_company_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "person_company"("person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name") SELECT "person_company_id", "fantasy_name", "open_date", "end_date", "responsible_name" FROM "temporary_person_company"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_company"`);
        await queryRunner.query(
            `ALTER TABLE "person" RENAME TO "temporary_person"`
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("person_id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "cellphone" varchar, "telephone" varchar, "is_valid" boolean NOT NULL DEFAULT (0), "valid_at" datetime, CONSTRAINT "FK_403c951c5e9b776c16385a8940f" FOREIGN KEY ("person_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "person"("person_id", "type", "cellphone", "telephone", "is_valid", "valid_at") SELECT "person_id", "type", "cellphone", "telephone", "is_valid", "valid_at" FROM "temporary_person"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person"`);
        await queryRunner.query(
            `ALTER TABLE "person_individual" RENAME TO "temporary_person_individual"`
        );
        await queryRunner.query(
            `CREATE TABLE "person_individual" ("person_individual_id" varchar PRIMARY KEY NOT NULL, "birthday" datetime NOT NULL, "gender" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, "ethnicity" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASIÁTICO','AMERÍNDIO','MULATO','MULTIRRACIAL/PARDO','NÃO DECLARADA') ) NOT NULL DEFAULT ('NÃO DECLARADA'), "father_name" varchar, "mother_name" varchar, "civil_status" varchar NOT NULL, CONSTRAINT "FK_6ffe10839f581769aa801882859" FOREIGN KEY ("person_individual_id") REFERENCES "person" ("person_id") ON DELETE CASCADE ON UPDATE CASCADE)`
        );
        await queryRunner.query(
            `INSERT INTO "person_individual"("person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status") SELECT "person_individual_id", "birthday", "gender", "ethnicity", "father_name", "mother_name", "civil_status" FROM "temporary_person_individual"`
        );
        await queryRunner.query(`DROP TABLE "temporary_person_individual"`);
        await queryRunner.query(
            `ALTER TABLE "user" RENAME TO "temporary_user"`
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("user_id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "document" varchar, "email" varchar NOT NULL, "cellphone" varchar, "password" varchar NOT NULL, "is_admin" boolean NOT NULL DEFAULT (0), "is_valid" boolean NOT NULL DEFAULT (1), "is_confirmed" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "validated_at" datetime, "confirmed_at" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
        );
        await queryRunner.query(
            `INSERT INTO "user"("user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at") SELECT "user_id", "name", "document", "email", "cellphone", "password", "is_admin", "is_valid", "is_confirmed", "created_at", "updated_at", "validated_at", "confirmed_at" FROM "temporary_user"`
        );
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }
}
