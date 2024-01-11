/*
  Warnings:

  - You are about to alter the column `price` on the `discount_coupon` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `quota` on the `event_ticket` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `discount_coupon` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `updatedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `event_ticket` MODIFY `quota` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `updatedAt` TIMESTAMP NOT NULL;
