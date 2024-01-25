/*
  Warnings:

  - The primary key for the `event_image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `event_image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Transaction_referral_used_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `event_image` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
