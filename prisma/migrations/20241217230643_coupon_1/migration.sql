-- CreateTable
CREATE TABLE `Coupons` (
    `id` VARCHAR(191) NOT NULL,
    `mount` DECIMAL(65, 30) NOT NULL,
    `propietaryId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `use` BOOLEAN NOT NULL DEFAULT false,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Coupons` ADD CONSTRAINT `Coupons_propietaryId_fkey` FOREIGN KEY (`propietaryId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
