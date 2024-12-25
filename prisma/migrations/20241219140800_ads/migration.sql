-- DropForeignKey
ALTER TABLE `MenuDetail` DROP FOREIGN KEY `MenuDetail_unityMeasureId_fkey`;

-- AlterTable
ALTER TABLE `MenuDetail` MODIFY `quentity` INTEGER NULL,
    MODIFY `unityMeasureId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `MenuDetail` ADD CONSTRAINT `MenuDetail_unityMeasureId_fkey` FOREIGN KEY (`unityMeasureId`) REFERENCES `UnityMeasure`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
