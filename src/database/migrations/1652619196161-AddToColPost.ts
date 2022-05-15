import {MigrationInterface, QueryRunner} from "typeorm";

export class AddToColPost1652619196161 implements MigrationInterface {
    name = 'AddToColPost1652619196161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "img" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "img"`);
    }

}
