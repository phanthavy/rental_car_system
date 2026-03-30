-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('admin', 'requester', 'supplier') NOT NULL DEFAULT 'admin';
