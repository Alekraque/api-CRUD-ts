import { query } from "express";
import { ForeignKey, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableClients1748873839186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "clients",
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },

          {
            name: "email",
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },

          {
            name:"phone",
            type: "varchar",
            length: "20",
            isNullable: false
          },

          {
            name:"user_id",
            type:'uuid',
            isNullable: false,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'

          }
        ]
    }))
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('clients')
    }

}
