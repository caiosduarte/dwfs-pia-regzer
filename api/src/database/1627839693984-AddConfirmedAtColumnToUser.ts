import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddConfirmedAtColumnToUser1627839693984
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("user", [
            new TableColumn({
                name: "confirmed_at",
                type: "timestamp",
                isNullable: true,
                default: null,
            }),
        ]);

        await queryRunner.query(
            "UPDATE user SET confirmed_at = CURRENT_TIMESTAMP WHERE is_confirmed = true"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "confirmed_at");
    }
}
