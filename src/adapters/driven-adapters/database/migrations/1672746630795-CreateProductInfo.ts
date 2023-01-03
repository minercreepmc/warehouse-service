import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductInfo1672746630795 implements MigrationInterface {
    name = 'CreateProductInfo1672746630795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product-info" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, CONSTRAINT "PK_d679efee3463c5d063be01f51f1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product-info"`);
    }

}
