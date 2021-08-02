import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnValidatedAt1627791930243 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("PRAGMA foreign_keys=OFF;");

        await queryRunner.addColumns("user", [
            new TableColumn({
                name: "validated_at",
                type: "timestamp",
                isNullable: true,
                default: null,
            }),
        ]);

        await queryRunner.query("PRAGMA foreign_keys=ON;");

        await queryRunner.query(
            "UPDATE user SET validated_at = CURRENT_TIMESTAMP WHERE is_valid = true"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "validated_at");
    }
}
