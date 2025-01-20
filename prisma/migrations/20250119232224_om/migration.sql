/*
  Warnings:

  - You are about to alter the column `mount` on the `PaymentFinance` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `Patient` MODIFY `sleep` VARCHAR(191) NULL,
    MODIFY `exercises` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PaymentFinance` MODIFY `mount` DECIMAL(65, 30) NOT NULL;
