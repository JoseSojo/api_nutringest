/*
  Warnings:

  - You are about to drop the column `edoCivul` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `edoCivul`,
    ADD COLUMN `edoCivil` VARCHAR(191) NULL,
    ADD COLUMN `fn` DATETIME(3) NULL;
