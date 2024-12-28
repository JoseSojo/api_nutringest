/*
  Warnings:

  - You are about to alter the column `mount` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Wallet` MODIFY `mount` DECIMAL(10, 2) NOT NULL;
