/*
  Warnings:

  - Added the required column `price` to the `Event_Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_ticket` ADD COLUMN `price` INTEGER NOT NULL;
