/*
  Warnings:

  - You are about to drop the column `used` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `referral_code` ADD COLUMN `used` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `used`;
