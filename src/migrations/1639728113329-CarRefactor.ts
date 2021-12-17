import { MigrationInterface, QueryRunner } from 'typeorm';

export class CarRefactor1639728113329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" RENAME COLUMN "brand" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" RENAME COLUMN "title" TO "brand"`,
    );
  }
}
