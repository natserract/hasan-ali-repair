-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 20, 2022 at 08:39 AM
-- Server version: 5.7.34
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle-repair`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `user_id`) VALUES
(1, 4),
(2, 5),
(6, 9);

-- --------------------------------------------------------

--
-- Table structure for table `mechanic`
--

CREATE TABLE `mechanic` (
  `id` int(11) NOT NULL,
  `person_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mechanic`
--

INSERT INTO `mechanic` (`id`, `person_id`, `name`, `is_active`, `address`, `created_at`, `updated_at`) VALUES
(1, '5171032000005523', 'Supriman', 1, 'Jl Kertapura', '2022-03-18 05:48:37.962', '2022-03-18 05:48:37.974');

-- --------------------------------------------------------

--
-- Table structure for table `parts`
--

CREATE TABLE `parts` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `part_number` int(11) NOT NULL,
  `in_date` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `qty` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `parts`
--

INSERT INTO `parts` (`id`, `name`, `part_number`, `in_date`, `qty`, `price`, `description`) VALUES
(1, 'Dek Honda', 912413, '2022-03-18 05:48:56.591', 14, '50000.00', NULL),
(2, 'Kampas Rem', 6123123, '2022-03-19 05:52:00.000', 14, '10000.00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parts_used`
--

CREATE TABLE `parts_used` (
  `id` int(11) NOT NULL,
  `part_id` int(11) NOT NULL,
  `mechanic_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `parts_used`
--

INSERT INTO `parts_used` (`id`, `part_id`, `mechanic_id`, `service_id`) VALUES
(9, 2, 1, 6),
(10, 1, 1, 6),
(11, 2, 1, 7),
(12, 1, 1, 7);

--
-- Triggers `parts_used`
--
DELIMITER $$
CREATE TRIGGER `subtract_quantity` AFTER INSERT ON `parts_used` FOR EACH ROW BEGIN
      UPDATE parts SET parts.qty = parts.qty - 1
       WHERE parts.id = NEW.part_id AND parts.qty > 0;
  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `booking_date` datetime(3) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `booking_date`, `customer_id`, `vehicle_id`, `status`, `message`, `created_at`, `updated_at`) VALUES
(24, '2022-03-20 08:16:00.000', 6, 6, 'on review', 'Approved', '2022-03-20 08:16:42.513', '2022-03-20 08:21:59.132');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `mechanic_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `uuid`, `price`, `created_by`, `updated_by`, `mechanic_id`, `schedule_id`, `created_at`, `updated_at`) VALUES
(6, '2d6e50fc-af59-4270-8f59-1b947903e5fd', '100.00', 2, NULL, 1, 24, '2022-03-20 08:17:06.533', '2022-03-20 08:17:06.533'),
(7, '8f544e5b-d6e0-4292-9479-bffff0105ee9', '180000.00', 2, 2, 1, 24, '2022-03-20 08:21:59.109', '2022-03-20 08:37:36.090');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashedPassword` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `salt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `refreshToken` text COLLATE utf8mb4_unicode_ci,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `password`, `email`, `hashedPassword`, `salt`, `refreshToken`, `user_type`, `created_at`, `updated_at`, `phone_number`, `address`) VALUES
(2, '993d7206-e41e-49d0-859d-da3258ed4aae', 'Alfin', 'Alfin9090.', 'alfins132@gmail.com', '647a38fec5bd70accc9d177dd7612bd974a2738127bb08527d051db26e7601d7', '2a01fa153fe81b41baa841087fb5ab6f', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGZpbnMxMzJAZ21haWwuY29tIiwibmFtZSI6IkFsZmluIiwiYWRkcmVzcyI6IkpsLiBLZXJ0YXB1cmEgR2cgU2VnaW5hIDIiLCJwaG9uZV9udW1iZXIiOiIwODgxNDcxNTY5MiIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjQ3NzYyMTI5LCJleHAiOjE2NDc4NDg1Mjl9.or4dHAnGOHQzyGG4KMAz_blC8k3vLmjunyndXaDruGM', 'admin', '2022-03-04 08:37:56.212', NULL, '08814715692', 'Jl. Kertapura Gg Segina 2'),
(4, '737f79ca-f03c-4466-bc25-4f02d77ea526', 'Aldon', 'Alfin9090.', 'benjaminstwo@gmail.com', '5a3df0a9462a1c13e8991ab3bb9d77d2cd9090d5c8a509795e2493a0837eb20d', '140ae58917d95d6335b51c7cba1456cb', NULL, 'customer', '2022-03-05 06:09:56.175', NULL, '08814715695', 'Jl Address 2 '),
(5, 'c9952900-ef78-480e-9664-58f5331579f7', 'Supra', 'Alfin9090.', 'supra@gmail.com', 'f36c235225260ef8c8924bcd45370e9bd036e9f526825c872a926ae8fb0eab79', '07bee1fcb1960703ce3db68673c02a16', NULL, 'customer', '2022-03-19 06:42:19.110', NULL, NULL, NULL),
(9, '7d64110e-5843-495d-a9ff-e355e367fb0f', 'Aldon Maulana', 'maulana', 'aldon.maulana27@gmail.com', 'e2df9dd26833433faf779711cd6709c7222431201604619e985e739d37036fb7', '3a2a97a876806543eeae38dfc66ebfcc', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJhbGRvbi5tYXVsYW5hMjdAZ21haWwuY29tIiwibmFtZSI6IkFsZG9uIE1hdWxhbmEiLCJhZGRyZXNzIjoiIiwicGhvbmVfbnVtYmVyIjoiIiwidXNlcl90eXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NDc3NjE5MjUsImV4cCI6MTY0Nzg0ODMyNX0.eVLHBDKZdCOn5jGZxFMCjhSXhvNi7EzEHRV3m5V2GIc', 'customer', '2022-03-20 06:37:16.537', NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serialNum` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`id`, `name`, `serialNum`, `year`, `details`, `user_id`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(4, 'Ninja RX 230', 'DK 4028', 1998, 'Warna merah muda', 4, 4, 4, '2022-03-17 07:18:42.640', '2022-03-18 06:04:16.402'),
(5, 'Nmax', 'DK 1214', 2012, NULL, 5, 5, NULL, '2022-03-19 06:44:40.321', '2022-03-19 06:44:40.321'),
(6, 'Vario', 'DK 1138 AD', 2022, '', 9, 9, NULL, '2022-03-20 06:39:44.051', '2022-03-20 06:39:44.052');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('37f01da6-11fc-4f0f-ba82-c293dfc38e01', '26ab92b4a56a77f989221a52be10f74d402aa50aa116a4fbb1fe6a97cf1056da', '2022-03-16 05:50:27.468', '20220316055027_', NULL, NULL, '2022-03-16 05:50:27.077', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_user_id_key` (`user_id`);

--
-- Indexes for table `mechanic`
--
ALTER TABLE `mechanic`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mechanic_person_id_key` (`person_id`);

--
-- Indexes for table `parts`
--
ALTER TABLE `parts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `parts_part_number_key` (`part_number`);

--
-- Indexes for table `parts_used`
--
ALTER TABLE `parts_used`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parts_used_mechanic_id_fkey` (`mechanic_id`),
  ADD KEY `parts_used_service_id_fkey` (`service_id`),
  ADD KEY `parts_used_part_id_fkey` (`part_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_vehicle_id_fkey` (`vehicle_id`),
  ADD KEY `schedule_customer_id_fkey` (`customer_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_schedule_id_fkey` (`schedule_id`),
  ADD KEY `services_mechanic_id_fkey` (`mechanic_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicle_serialNum_key` (`serialNum`),
  ADD KEY `vehicle_user_id_fkey` (`user_id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mechanic`
--
ALTER TABLE `mechanic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `parts`
--
ALTER TABLE `parts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `parts_used`
--
ALTER TABLE `parts_used`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `parts_used`
--
ALTER TABLE `parts_used`
  ADD CONSTRAINT `parts_used_mechanic_id_fkey` FOREIGN KEY (`mechanic_id`) REFERENCES `mechanic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `parts_used_part_id_fkey` FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `parts_used_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_mechanic_id_fkey` FOREIGN KEY (`mechanic_id`) REFERENCES `mechanic` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `services_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD CONSTRAINT `vehicle_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
