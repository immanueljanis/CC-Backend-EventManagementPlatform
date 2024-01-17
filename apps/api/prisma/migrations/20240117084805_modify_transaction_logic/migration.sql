/*
  Warnings:

  - Added the required column `transaction_id` to the `User_Event_Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_referral_used_fkey`;

-- DropForeignKey
ALTER TABLE `user_event_ticket` DROP FOREIGN KEY `User_Event_Ticket_event_ticket_id_fkey`;

-- AlterTable
ALTER TABLE `user_event_ticket` ADD COLUMN `transaction_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User_Event_Ticket` ADD CONSTRAINT `User_Event_Ticket_event_ticket_id_fkey` FOREIGN KEY (`event_ticket_id`) REFERENCES `Event_Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Event_Ticket` ADD CONSTRAINT `User_Event_Ticket_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
