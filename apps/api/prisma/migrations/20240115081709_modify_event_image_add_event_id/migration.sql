/*
  Warnings:

  - Added the required column `event_id` to the `Event_Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_image` ADD COLUMN `event_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Event_Image` ADD CONSTRAINT `Event_Image_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
