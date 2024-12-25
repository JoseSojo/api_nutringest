/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.
  - Added the required column `dayEnd` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayStart` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthEnd` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthStart` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mount` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearEnd` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearStart` to the `SubscriptionDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_subscriptionId_fkey`;

-- AlterTable
ALTER TABLE `SubscriptionDetail` ADD COLUMN `dayEnd` INTEGER NOT NULL,
    ADD COLUMN `dayStart` INTEGER NOT NULL,
    ADD COLUMN `monthEnd` INTEGER NOT NULL,
    ADD COLUMN `monthStart` INTEGER NOT NULL,
    ADD COLUMN `mount` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `paymentMethodId` VARCHAR(191) NOT NULL,
    ADD COLUMN `yearEnd` INTEGER NOT NULL,
    ADD COLUMN `yearStart` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `subscriptionId`;

-- CreateTable
CREATE TABLE `SubscriptionInUser` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `dayStart` INTEGER NOT NULL,
    `monthStart` INTEGER NOT NULL,
    `yearStart` INTEGER NOT NULL,
    `dayEnd` INTEGER NOT NULL,
    `monthEnd` INTEGER NOT NULL,
    `yearEnd` INTEGER NOT NULL,
    `subscriptionId` VARCHAR(191) NOT NULL,
    `userById` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubscriptionInUser` ADD CONSTRAINT `SubscriptionInUser_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionInUser` ADD CONSTRAINT `SubscriptionInUser_userById_fkey` FOREIGN KEY (`userById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionDetail` ADD CONSTRAINT `SubscriptionDetail_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
