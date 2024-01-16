/*
  Warnings:

  - Added the required column `qty` to the `User_Event_Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_event_ticket` ADD COLUMN `qty` INTEGER NOT NULL;
