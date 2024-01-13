/*
  Warnings:

  - You are about to drop the column `name` on the `event_category` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Event_Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_category` DROP COLUMN `name`,
    ADD COLUMN `category_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event_Category` ADD CONSTRAINT `Event_Category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
