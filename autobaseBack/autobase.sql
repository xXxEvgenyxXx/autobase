-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 11, 2026 at 11:12 AM
-- Server version: 10.5.17-MariaDB
-- PHP Version: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autobase`
--

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isBusy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`id`, `userId`, `isBusy`) VALUES
(1, 3, 0),
(2, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `driverOrders`
--

CREATE TABLE `driverOrders` (
  `driverId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `statusId` int(11) NOT NULL,
  `driverId` int(11) NOT NULL,
  `departure` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `userId`, `typeId`, `statusId`, `driverId`, `departure`, `destination`, `price`) VALUES
(1, 1, 1, 2, 1, 'Москва, Дубнинская, 2к7', 'Москва, Дубнинская, 2к7', 3690),
(2, 2, 1, 6, 1, 'Москва, цвц', 'Москва, цвц', 630);

-- --------------------------------------------------------

--
-- Table structure for table `orderStatus`
--

CREATE TABLE `orderStatus` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderStatus`
--

INSERT INTO `orderStatus` (`id`, `name`) VALUES
(1, 'Новый'),
(2, 'Назначен водитель'),
(3, 'Транспорт подан'),
(4, 'Погрузка'),
(5, 'В пути'),
(6, 'Прибыл на место'),
(7, 'Разгрузка'),
(8, 'Доставлен'),
(9, 'Завершён'),
(10, 'Отменён'),
(11, 'Перенесён'),
(12, 'Ожидает оплаты'),
(13, 'Проблема / Задержка');

-- --------------------------------------------------------

--
-- Table structure for table `orderType`
--

CREATE TABLE `orderType` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDesc` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderType`
--

INSERT INTO `orderType` (`id`, `name`, `shortDesc`) VALUES
(1, 'Внутри города', 'Перевозка грузов/пассажиров внутри города'),
(2, 'Между городами', 'Перевозка грузов/пассажиров между городами');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'user'),
(2, 'admin'),
(3, 'driver');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `patronymic` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `patronymic`, `email`, `passwordHash`, `roleId`) VALUES
(1, 'Евгений', 'Симонов', 'Дмитриевич', 'jdsimonov2@gmail.com', '$2y$10$hZAsX0cCx7Om5Id9TzycEuqd88kEjnhAbi2x94ntnrlIVXldzVgiG', 2),
(2, 'Иван', 'Иванов', 'Иванович', 'example@gmail.com', '$2y$10$bTH.5u37c.y8Jmm7Bd.hU.k4a0SmwL.jh7LxsbF7RzonpNJHcS61u', 1),
(3, 'Андрей', 'Симонов', 'Дмитриевич', 'jsflru804@gmail.com', '$2y$10$JKOzakI4fSAdEFCnbrNkcebFOvLjHkg5G/od4GuflOqjgAainljRe', 3),
(4, 'Иван', 'Иванов', 'Иванович', 'example2@gmail.com', '$2y$10$.OsT.lMxR4E.UtJIOSc.Wu/q4dk7n3oo4xbPUqF01KQ/cLi1mR946', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_driver_user` (`userId`);

--
-- Indexes for table `driverOrders`
--
ALTER TABLE `driverOrders`
  ADD PRIMARY KEY (`driverId`,`orderId`),
  ADD KEY `FK_driverOrders_order` (`orderId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_order_user` (`userId`),
  ADD KEY `FK_order_driver` (`driverId`),
  ADD KEY `FK_order_orderStatus` (`statusId`),
  ADD KEY `FK_order_orderType` (`typeId`);

--
-- Indexes for table `orderStatus`
--
ALTER TABLE `orderStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderType`
--
ALTER TABLE `orderType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user_role` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderStatus`
--
ALTER TABLE `orderStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orderType`
--
ALTER TABLE `orderType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `driver`
--
ALTER TABLE `driver`
  ADD CONSTRAINT `FK_driver_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `driverOrders`
--
ALTER TABLE `driverOrders`
  ADD CONSTRAINT `FK_driverOrders_driver` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`),
  ADD CONSTRAINT `FK_driverOrders_order` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_order_driver` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`),
  ADD CONSTRAINT `FK_order_orderStatus` FOREIGN KEY (`statusId`) REFERENCES `orderStatus` (`id`),
  ADD CONSTRAINT `FK_order_orderType` FOREIGN KEY (`typeId`) REFERENCES `orderType` (`id`),
  ADD CONSTRAINT `FK_order_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
