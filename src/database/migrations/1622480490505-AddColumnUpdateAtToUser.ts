import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnUpdateAtToUser1622480490505
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user",
            new TableColumn({
                name: "updated_at",
                type: "timestamp",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "updated_at");
    }
}
