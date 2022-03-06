-- DropForeignKey
ALTER TABLE `parts_used` DROP FOREIGN KEY `parts_used_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_service_id_fkey`;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parts_used` ADD CONSTRAINT `parts_used_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
