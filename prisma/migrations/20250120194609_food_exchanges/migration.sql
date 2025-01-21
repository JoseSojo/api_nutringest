-- CreateTable
CREATE TABLE `FoodExchangeList` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `sub` VARCHAR(191) NULL,
    `unity` VARCHAR(191) NULL,
    `caloria` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
