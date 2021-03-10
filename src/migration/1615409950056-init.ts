import {MigrationInterface, QueryRunner} from "typeorm";

export class init1615409950056 implements MigrationInterface {
    name = 'init1615409950056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "cpf" character varying, "password" character varying, "role" character varying, "permissions" character varying array, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
