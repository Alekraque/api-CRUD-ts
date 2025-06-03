import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserTable1748979158550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('users', new TableColumn({
        name: "role",
        type: "varchar",
        length: "255",
        default: "'user'"
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("users", "role")
    }

}
