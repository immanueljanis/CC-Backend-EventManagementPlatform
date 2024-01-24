-- DropIndex
DROP INDEX `Transaction_referral_used_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `event` MODIFY `status` ENUM('pending', 'approved', 'done', 'decline') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `used` INTEGER NOT NULL DEFAULT 0;
