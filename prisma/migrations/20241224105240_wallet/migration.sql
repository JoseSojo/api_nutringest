/*
  Warnings:

  - You are about to alter the column `mount` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `Wallet` MODIFY `mount` DECIMAL(65, 30) NOT NULL;
