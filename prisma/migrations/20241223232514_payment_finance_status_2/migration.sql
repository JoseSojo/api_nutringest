/*
  Warnings:

  - You are about to alter the column `mount` on the `PaymentFinance` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `PaymentFinance` MODIFY `mount` INTEGER NOT NULL;
