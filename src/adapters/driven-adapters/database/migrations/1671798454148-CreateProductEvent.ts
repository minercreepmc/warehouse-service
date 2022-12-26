import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductEvent1671798454148 implements MigrationInterface {
    name = 'CreateProductEvent1671798454148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product-event" ("eventId" character varying NOT NULL, "eventName" character varying NOT NULL, "entityType" character varying NOT NULL, "entityId" character varying NOT NULL, "eventData" jsonb NOT NULL, "dateOccurred" TIMESTAMP NOT NULL, CONSTRAINT "PK_ac23637b728e6304eb4c5b0e2c4" PRIMARY KEY ("eventId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product-event"`);
    }

}
