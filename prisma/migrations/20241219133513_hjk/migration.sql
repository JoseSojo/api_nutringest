-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_id_fkey`;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
