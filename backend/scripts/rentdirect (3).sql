-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2026 a las 01:39:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rentdirect`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applications`
--

CREATE TABLE `applications` (
  `id` bigint(20) NOT NULL,
  `property_id` bigint(20) NOT NULL,
  `tenant_id` bigint(20) NOT NULL,
  `status` enum('pending','in_review','agreed','contract_signed','active','rejected') DEFAULT 'pending',
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `applications`
--

INSERT INTO `applications` (`id`, `property_id`, `tenant_id`, `status`, `message`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 'active', 'Estoy interesado en la propiedad', '2026-02-16 03:09:00', '2026-02-16 03:16:17', NULL),
(2, 2, 1, 'in_review', 'Estoy interesado en esta propiedad', '2026-02-20 15:42:35', '2026-02-23 21:58:00', NULL),
(3, 5, 1, 'in_review', 'Estoy interesado en esta propiedad', '2026-02-23 21:22:04', '2026-02-23 21:45:10', NULL),
(4, 4, 1, 'in_review', 'Estoy interesado en esta propiedad', '2026-02-23 21:22:17', '2026-02-23 21:45:14', NULL),
(5, 6, 1, 'in_review', 'Estoy interesado en esta propiedad', '2026-02-23 21:56:23', '2026-02-23 21:57:15', NULL),
(6, 3, 1, 'pending', 'Estoy interesado en esta propiedad', '2026-02-23 22:03:57', '2026-02-23 22:03:57', NULL),
(7, 7, 1, 'in_review', 'Estoy interesado en esta propiedad', '2026-02-23 22:05:20', '2026-02-23 22:05:35', NULL),
(8, 8, 1, 'rejected', 'Estoy interesado en esta propiedad', '2026-02-23 22:21:59', '2026-02-23 22:22:18', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documents`
--

CREATE TABLE `documents` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `properties`
--

CREATE TABLE `properties` (
  `id` bigint(20) NOT NULL,
  `owner_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `status` enum('available','rented') DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `properties`
--

INSERT INTO `properties` (`id`, `owner_id`, `title`, `description`, `address`, `price`, `status`, `created_at`, `updated_at`, `deleted_at`, `thumbnail`) VALUES
(1, 2, 'Apartamento Centro', 'Apartamento amplio 2 habitaciones', 'Centro Medellin', 1200000.00, 'rented', '2026-02-16 03:04:23', '2026-02-16 03:16:17', NULL, NULL),
(2, 2, 'Apartamento Manrrique', 'Apartamento amplio 2 habitaciones', 'Manrrique  Medellin', 850000.00, 'available', '2026-02-16 03:33:41', '2026-02-16 03:33:41', NULL, NULL),
(3, 5, 'apartamento con hermosa vista', 'Hermosa propiedad con excelente ubicación y espacios bien distribuidos. Cuenta con sala-comedor amplia, cocina moderna, habitaciones cómodas y buena iluminación natural. Ideal para vivir o invertir. ¡Gran oportunidad!', 'calle92b# 53-45', 1350000.00, 'available', '2026-02-23 19:50:42', '2026-02-23 19:50:42', NULL, NULL),
(4, 5, 'prueba', 'prueba', '125', 1000000.00, 'available', '2026-02-23 21:06:42', '2026-02-23 21:06:42', NULL, 'uploads/1771880802710-1770832542269_1765655579798_casa1.jpg'),
(5, 5, 'prueba 2', 'prueba2', '12345', 20000000.00, 'available', '2026-02-23 21:16:18', '2026-02-23 21:16:18', NULL, 'uploads/1771881378253-1771880499208-1765655579804_casa2.jpg'),
(6, 5, 'prueba 3', 'prueba 3', '456', 3000000.00, 'available', '2026-02-23 21:55:47', '2026-02-23 21:55:47', NULL, 'uploads/1771883747841-1765739493513_lau4.jpg'),
(7, 2, 'prueba4', 'prueba4', '789', 8000.00, 'available', '2026-02-23 22:04:48', '2026-02-23 22:04:48', NULL, 'uploads/1771884288072-1765891043605_edi2.jpg'),
(8, 2, 'prueba5', 'prueba5', '456', 90000.00, 'available', '2026-02-23 22:21:38', '2026-02-23 22:21:38', NULL, 'uploads/1771885298905-1765655122724_estudio1.jpg'),
(9, 2, 'prueba6', 'prueba6', '123456', 9000000.00, 'available', '2026-02-24 00:27:36', '2026-02-24 00:27:36', NULL, 'uploads/1771892856098-1765653695732_apto2.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_images`
--

CREATE TABLE `property_images` (
  `id` bigint(20) NOT NULL,
  `property_id` bigint(20) NOT NULL,
  `url` varchar(500) NOT NULL,
  `ord` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_images`
--

INSERT INTO `property_images` (`id`, `property_id`, `url`, `ord`) VALUES
(1, 9, 'uploads/1771892856098-1765653695732_apto2.jpeg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `role` enum('owner','tenant','admin') NOT NULL,
  `email` varchar(255) NOT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `verification_code` varchar(10) DEFAULT NULL,
  `verification_expires` datetime DEFAULT NULL,
  `reset_code` varchar(10) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `score` int(11) DEFAULT 500,
  `status` enum('active','suspended','blocked') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `plan` enum('free','premium') DEFAULT 'free',
  `free_publications_used` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `role`, `email`, `cedula`, `password_hash`, `is_verified`, `verification_code`, `verification_expires`, `reset_code`, `reset_expires`, `name`, `phone`, `score`, `status`, `created_at`, `updated_at`, `deleted_at`, `plan`, `free_publications_used`) VALUES
(1, 'tenant', 'brayanpedroza_1999@hotmail.com', '1143456241', '$2b$10$Ja7uQZi51edAXVuNkofMLOB9cF7T93MtSIdLNuh0GTaBGmRclCYze', 1, NULL, NULL, NULL, NULL, 'markus', NULL, 500, 'active', '2026-02-16 02:50:30', '2026-02-16 02:51:46', NULL, 'free', 0),
(2, 'owner', 'marjhoperozo@hotmail.es', '1007978998', '$2b$10$qgAFSK89PWCGP8K00CmhU.Kt0qNC3EjrbLskbDr66u2k/0.EyWGtO', 1, NULL, NULL, NULL, NULL, 'maryis', NULL, 500, 'active', '2026-02-16 02:55:36', '2026-02-24 00:29:40', NULL, 'free', 1),
(5, 'owner', 'evelyn.alvarezg7@gmail.com', '12345678', '$2b$10$wGfGQkhraGdA4e8s6FRluO4FEsiqhC9VEZTP5fy5e.XQNM0dImNvK', 1, NULL, NULL, NULL, NULL, 'evelyn', NULL, 500, 'active', '2026-02-20 13:03:53', '2026-02-20 13:08:26', NULL, 'free', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`,`tenant_id`),
  ADD KEY `tenant_id` (`tenant_id`);

--
-- Indices de la tabla `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indices de la tabla `property_images`
--
ALTER TABLE `property_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `applications`
--
ALTER TABLE `applications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `properties`
--
ALTER TABLE `properties`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `property_images`
--
ALTER TABLE `property_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`tenant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `property_images`
--
ALTER TABLE `property_images`
  ADD CONSTRAINT `property_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
