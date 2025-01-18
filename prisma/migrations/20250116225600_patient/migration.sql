-- AlterTable
ALTER TABLE `User` ADD COLUMN `edoCivul` VARCHAR(191) NULL,
    ADD COLUMN `ocupacion` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Patient` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `heredofamiliares` JSON NOT NULL,
    `personalesPatologicos` JSON NOT NULL,
    `personalesNPatologicos` JSON NOT NULL,
    `ginecoObstretricos` JSON NOT NULL,
    `trastornosGastroinstestinales` JSON NOT NULL,
    `habitosAlimentacion` JSON NOT NULL,
    `redordatorio24Horas` JSON NOT NULL,
    `indicadorAntropometico` JSON NOT NULL,
    `indicadoresBioquimicos` JSON NOT NULL,
    `diagnostico` VARCHAR(191) NOT NULL,
    `sleep` VARCHAR(191) NOT NULL,
    `exercises` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Patient_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
