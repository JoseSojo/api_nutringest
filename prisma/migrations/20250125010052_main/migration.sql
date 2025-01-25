-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `ci` VARCHAR(191) NULL,
    `name2` VARCHAR(191) NULL,
    `lastname2` VARCHAR(191) NULL,
    `nacionality` VARCHAR(191) NULL,
    `edoCivil` VARCHAR(191) NULL,
    `ocupacion` VARCHAR(191) NULL,
    `fn` DATETIME(3) NULL,
    `email2` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `phone2` VARCHAR(191) NULL,
    `propietaryCode` VARCHAR(191) NOT NULL DEFAULT '',
    `code` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `genero` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `passwordRequetsAt` DATETIME(3) NULL,
    `passwordRequetsToken` VARCHAR(191) NULL,
    `token` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `parentId` VARCHAR(191) NULL,
    `rolId` VARCHAR(191) NULL,
    `languajeId` VARCHAR(191) NULL,
    `cityId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `sleep` VARCHAR(191) NULL,
    `exercises` VARCHAR(191) NULL,

    UNIQUE INDEX `Patient_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoryWeightPatient` (
    `id` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `history` JSON NOT NULL,
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Subscription` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `countMonth` INTEGER NOT NULL DEFAULT 1,
    `defaultMount` DOUBLE NOT NULL DEFAULT 49.99,
    `createById` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `TaskSeondPlanSubscription` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `task` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `extra` JSON NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` VARCHAR(191) NOT NULL,
    `mount` DECIMAL(10, 2) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Wallet_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubscriptionDetail` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mount` DECIMAL(65, 30) NOT NULL,
    `paymentMethodId` VARCHAR(191) NOT NULL,
    `dayStart` INTEGER NOT NULL,
    `monthStart` INTEGER NOT NULL,
    `yearStart` INTEGER NOT NULL,
    `dayEnd` INTEGER NOT NULL,
    `monthEnd` INTEGER NOT NULL,
    `yearEnd` INTEGER NOT NULL,
    `subscriptionId` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymetInUser` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `paymenthId` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentFinance` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'EN ESPERA',
    `date` VARCHAR(191) NULL,
    `mount` DECIMAL(65, 30) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calendar` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `hours` VARCHAR(191) NULL,
    `day` INTEGER NOT NULL,
    `monthName` VARCHAR(191) NOT NULL,
    `monthNumber` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `quoteId` VARCHAR(191) NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CalendarHistoryStatus` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quote` (
    `id` VARCHAR(191) NOT NULL,
    `weightNow` DECIMAL(65, 30) NULL,
    `weightPreview` DECIMAL(65, 30) NULL,
    `weightObjective` DECIMAL(65, 30) NULL,
    `nutricionistId` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `exercise` VARCHAR(191) NULL,
    `sleep` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `proteinas` DECIMAL(65, 30) NULL,
    `lipidos` DECIMAL(65, 30) NULL,
    `Carbohidratos` DECIMAL(65, 30) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoryPhoto` (
    `id` VARCHAR(191) NOT NULL,
    `size` DECIMAL(65, 30) NOT NULL,
    `date` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `donwload` VARCHAR(191) NOT NULL DEFAULT '',
    `mimyType` VARCHAR(191) NOT NULL,
    `quoteId` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` VARCHAR(191) NULL,
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodAll` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `quoteId` VARCHAR(191) NOT NULL,
    `foodId` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dietary` (
    `id` VARCHAR(191) NOT NULL,
    `proteinas` DECIMAL(65, 30) NOT NULL,
    `lipidos` DECIMAL(65, 30) NOT NULL,
    `Carbohidratos` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoryQuote` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `quoteId` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExchangeListInQuote` (
    `id` VARCHAR(191) NOT NULL,
    `quoteId` VARCHAR(191) NOT NULL,
    `exchangeId` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExchangeList` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ration` VARCHAR(191) NULL,
    `unityId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExchangeListFoods` (
    `id` VARCHAR(191) NOT NULL,
    `ration` VARCHAR(191) NULL,
    `unityMeasureId` VARCHAR(191) NULL,
    `exchangeListId` VARCHAR(191) NOT NULL,
    `foodId` INTEGER NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuInQuote` (
    `id` VARCHAR(191) NOT NULL,
    `quoteId` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuDetail` (
    `id` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `foodPrimitiveId` VARCHAR(191) NOT NULL,
    `quentity` INTEGER NULL,
    `unityDef` VARCHAR(191) NULL DEFAULT '',
    `unityMeasureId` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDelte` BOOLEAN NOT NULL DEFAULT false,
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfigLanguaje` (
    `id` VARCHAR(191) NOT NULL,
    `payload` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permits` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `roles` JSON NOT NULL,
    `createById` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Permits_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethod` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `dolar` BOOLEAN NOT NULL DEFAULT true,
    `required` JSON NULL,
    `moneyId` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coin` (
    `id` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfigCountry` (
    `id` VARCHAR(191) NOT NULL,
    `coinId` VARCHAR(191) NOT NULL,
    `prefixPhone` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ConfigCountry_coinId_key`(`coinId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfigState` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfigCity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `stateId` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `generateBy` VARCHAR(191) NOT NULL DEFAULT 'app',
    `userById` VARCHAR(191) NULL,
    `userForId` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDelete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrimitiveFood` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `calorias` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `humed` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `proteina` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `fosforo` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `potasio` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `grasas` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `carbohidratosDisponibles` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `carbohidratosTotales` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `fibraTotal` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `fibraInsolub` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `cenizas` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `calcio` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `hierro` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `magnesio` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `zinc` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `cobre` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `sodio` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `vitaminaA` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `carotenoEquivTotal` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `tiamina` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `riboflavina` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `niacina` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `vitaminaB6` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `acidAscorb` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PrimitiveFood_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodExchangeList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `sub` VARCHAR(191) NULL,
    `unity` VARCHAR(191) NULL,
    `caloria` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnityMeasure` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `abr` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UnityMeasure_abr_key`(`abr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Presentation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `supplementId` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplement` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createById` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `id` VARCHAR(191) NOT NULL,
    `eventName` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `objectName` VARCHAR(191) NULL,
    `objectReferenceId` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaticticsForMonth` (
    `id` VARCHAR(191) NOT NULL,
    `objectName` VARCHAR(191) NULL,
    `objectReferenceId` VARCHAR(191) NOT NULL DEFAULT 'application',
    `year` INTEGER NOT NULL,
    `monthName` VARCHAR(191) NOT NULL,
    `monthNumber` INTEGER NOT NULL,
    `totalMonth` INTEGER NOT NULL DEFAULT 0,
    `totalDay1` INTEGER NOT NULL DEFAULT 0,
    `totalDay2` INTEGER NOT NULL DEFAULT 0,
    `totalDay3` INTEGER NOT NULL DEFAULT 0,
    `totalDay4` INTEGER NOT NULL DEFAULT 0,
    `totalDay5` INTEGER NOT NULL DEFAULT 0,
    `totalDay6` INTEGER NOT NULL DEFAULT 0,
    `totalDay7` INTEGER NOT NULL DEFAULT 0,
    `totalDay8` INTEGER NOT NULL DEFAULT 0,
    `totalDay9` INTEGER NOT NULL DEFAULT 0,
    `totalDay10` INTEGER NOT NULL DEFAULT 0,
    `totalDay11` INTEGER NOT NULL DEFAULT 0,
    `totalDay12` INTEGER NOT NULL DEFAULT 0,
    `totalDay13` INTEGER NOT NULL DEFAULT 0,
    `totalDay14` INTEGER NOT NULL DEFAULT 0,
    `totalDay15` INTEGER NOT NULL DEFAULT 0,
    `totalDay16` INTEGER NOT NULL DEFAULT 0,
    `totalDay17` INTEGER NOT NULL DEFAULT 0,
    `totalDay18` INTEGER NOT NULL DEFAULT 0,
    `totalDay19` INTEGER NOT NULL DEFAULT 0,
    `totalDay20` INTEGER NOT NULL DEFAULT 0,
    `totalDay21` INTEGER NOT NULL DEFAULT 0,
    `totalDay22` INTEGER NOT NULL DEFAULT 0,
    `totalDay23` INTEGER NOT NULL DEFAULT 0,
    `totalDay24` INTEGER NOT NULL DEFAULT 0,
    `totalDay25` INTEGER NOT NULL DEFAULT 0,
    `totalDay26` INTEGER NOT NULL DEFAULT 0,
    `totalDay27` INTEGER NOT NULL DEFAULT 0,
    `totalDay28` INTEGER NOT NULL DEFAULT 0,
    `totalDay29` INTEGER NOT NULL DEFAULT 0,
    `totalDay30` INTEGER NOT NULL DEFAULT 0,
    `totalDay31` INTEGER NOT NULL DEFAULT 0,
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaticticsForYear` (
    `id` VARCHAR(191) NOT NULL,
    `objectName` VARCHAR(191) NULL,
    `objectReferenceId` VARCHAR(191) NOT NULL DEFAULT 'application',
    `year` INTEGER NOT NULL,
    `totalYear` INTEGER NOT NULL DEFAULT 0,
    `totalMonth1` INTEGER NOT NULL DEFAULT 0,
    `totalMonth2` INTEGER NOT NULL DEFAULT 0,
    `totalMonth3` INTEGER NOT NULL DEFAULT 0,
    `totalMonth4` INTEGER NOT NULL DEFAULT 0,
    `totalMonth5` INTEGER NOT NULL DEFAULT 0,
    `totalMonth6` INTEGER NOT NULL DEFAULT 0,
    `totalMonth7` INTEGER NOT NULL DEFAULT 0,
    `totalMonth8` INTEGER NOT NULL DEFAULT 0,
    `totalMonth9` INTEGER NOT NULL DEFAULT 0,
    `totalMonth10` INTEGER NOT NULL DEFAULT 0,
    `totalMonth11` INTEGER NOT NULL DEFAULT 0,
    `totalMonth12` INTEGER NOT NULL DEFAULT 0,
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Logs` (
    `id` VARCHAR(191) NOT NULL,
    `description` JSON NOT NULL,
    `start` BOOLEAN NOT NULL,
    `day` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `hour` INTEGER NOT NULL,
    `minute` INTEGER NOT NULL,
    `second` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Permits`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_languajeId_fkey` FOREIGN KEY (`languajeId`) REFERENCES `ConfigLanguaje`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `ConfigCity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryWeightPatient` ADD CONSTRAINT `HistoryWeightPatient_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coupons` ADD CONSTRAINT `Coupons_propietaryId_fkey` FOREIGN KEY (`propietaryId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionInUser` ADD CONSTRAINT `SubscriptionInUser_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionInUser` ADD CONSTRAINT `SubscriptionInUser_userById_fkey` FOREIGN KEY (`userById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskSeondPlanSubscription` ADD CONSTRAINT `TaskSeondPlanSubscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionDetail` ADD CONSTRAINT `SubscriptionDetail_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionDetail` ADD CONSTRAINT `SubscriptionDetail_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionDetail` ADD CONSTRAINT `SubscriptionDetail_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymetInUser` ADD CONSTRAINT `PaymetInUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymetInUser` ADD CONSTRAINT `PaymetInUser_paymenthId_fkey` FOREIGN KEY (`paymenthId`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentFinance` ADD CONSTRAINT `PaymentFinance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentFinance` ADD CONSTRAINT `PaymentFinance_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `PaymetInUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CalendarHistoryStatus` ADD CONSTRAINT `CalendarHistoryStatus_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_nutricionistId_fkey` FOREIGN KEY (`nutricionistId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryPhoto` ADD CONSTRAINT `HistoryPhoto_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryPhoto` ADD CONSTRAINT `HistoryPhoto_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodAll` ADD CONSTRAINT `FoodAll_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodAll` ADD CONSTRAINT `FoodAll_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `PrimitiveFood`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryQuote` ADD CONSTRAINT `HistoryQuote_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeListInQuote` ADD CONSTRAINT `ExchangeListInQuote_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeListInQuote` ADD CONSTRAINT `ExchangeListInQuote_exchangeId_fkey` FOREIGN KEY (`exchangeId`) REFERENCES `ExchangeList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeList` ADD CONSTRAINT `ExchangeList_unityId_fkey` FOREIGN KEY (`unityId`) REFERENCES `UnityMeasure`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeList` ADD CONSTRAINT `ExchangeList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeListFoods` ADD CONSTRAINT `ExchangeListFoods_unityMeasureId_fkey` FOREIGN KEY (`unityMeasureId`) REFERENCES `UnityMeasure`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeListFoods` ADD CONSTRAINT `ExchangeListFoods_exchangeListId_fkey` FOREIGN KEY (`exchangeListId`) REFERENCES `ExchangeList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExchangeListFoods` ADD CONSTRAINT `ExchangeListFoods_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `FoodExchangeList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuInQuote` ADD CONSTRAINT `MenuInQuote_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuInQuote` ADD CONSTRAINT `MenuInQuote_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDetail` ADD CONSTRAINT `MenuDetail_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDetail` ADD CONSTRAINT `MenuDetail_foodPrimitiveId_fkey` FOREIGN KEY (`foodPrimitiveId`) REFERENCES `PrimitiveFood`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDetail` ADD CONSTRAINT `MenuDetail_unityMeasureId_fkey` FOREIGN KEY (`unityMeasureId`) REFERENCES `UnityMeasure`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigLanguaje` ADD CONSTRAINT `ConfigLanguaje_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permits` ADD CONSTRAINT `Permits_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentMethod` ADD CONSTRAINT `PaymentMethod_moneyId_fkey` FOREIGN KEY (`moneyId`) REFERENCES `Coin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentMethod` ADD CONSTRAINT `PaymentMethod_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coin` ADD CONSTRAINT `Coin_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigCountry` ADD CONSTRAINT `ConfigCountry_coinId_fkey` FOREIGN KEY (`coinId`) REFERENCES `Coin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigCountry` ADD CONSTRAINT `ConfigCountry_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigState` ADD CONSTRAINT `ConfigState_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `ConfigCountry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigState` ADD CONSTRAINT `ConfigState_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigCity` ADD CONSTRAINT `ConfigCity_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `ConfigState`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfigCity` ADD CONSTRAINT `ConfigCity_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userById_fkey` FOREIGN KEY (`userById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userForId_fkey` FOREIGN KEY (`userForId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnityMeasure` ADD CONSTRAINT `UnityMeasure_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Presentation` ADD CONSTRAINT `Presentation_supplementId_fkey` FOREIGN KEY (`supplementId`) REFERENCES `Supplement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Presentation` ADD CONSTRAINT `Presentation_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplement` ADD CONSTRAINT `Supplement_createById_fkey` FOREIGN KEY (`createById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
