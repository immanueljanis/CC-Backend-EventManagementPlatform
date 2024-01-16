/*
  Warnings:

  - You are about to drop the `discount_coupon` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `referral_used` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rating` MODIFY `review` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `referral_used` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `discount_coupon`;

-- CreateTable
CREATE TABLE `Referral_code` (
    `id` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `references_id` VARCHAR(191) NOT NULL,
    `exp_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_referral_used_fkey` FOREIGN KEY (`referral_used`) REFERENCES `Referral_code`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral_code` ADD CONSTRAINT `Referral_code_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral_code` ADD CONSTRAINT `Referral_code_references_id_fkey` FOREIGN KEY (`references_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
