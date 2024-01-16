/*
  Warnings:

  - Added the required column `event_id` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `users_id` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rating` ADD COLUMN `event_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `users_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
