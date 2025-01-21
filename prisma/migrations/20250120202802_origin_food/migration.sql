/*
  Warnings:

  - You are about to alter the column `foodId` on the `ExchangeListFoods` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `ExchangeListFoods` DROP FOREIGN KEY `ExchangeListFoods_foodId_fkey`;

-- AlterTable
ALTER TABLE `ExchangeListFoods` MODIFY `foodId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ExchangeListFoods` ADD CONSTRAINT `ExchangeListFoods_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `FoodExchangeList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
