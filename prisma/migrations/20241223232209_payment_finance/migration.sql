-- CreateTable
CREATE TABLE `PaymentFinance` (
    `id` VARCHAR(191) NOT NULL,
    `mount` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentFinance` ADD CONSTRAINT `PaymentFinance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentFinance` ADD CONSTRAINT `PaymentFinance_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `PaymetInUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
