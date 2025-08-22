-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2025 a las 15:02:21
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
-- Base de datos: `database`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applicants`
--

CREATE TABLE `applicants` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `offer_id` int(10) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `languages`
--

CREATE TABLE `languages` (
  `id` int(10) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `languages`
--

INSERT INTO `languages` (`id`, `name`) VALUES
(1, 'Español'),
(2, 'Inglés'),
(3, 'Portugués'),
(4, 'Francés'),
(5, 'Italiano'),
(6, 'Chino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 1,
  `message` text NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `receiver_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `offers`
--

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `creator_id` int(10) NOT NULL,
  `title` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `offer_languages`
--

CREATE TABLE `offer_languages` (
  `id` int(10) NOT NULL,
  `language_id` int(10) NOT NULL,
  `offer_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `offer_tags`
--

CREATE TABLE `offer_tags` (
  `id` int(10) NOT NULL,
  `tag_id` int(10) NOT NULL,
  `offer_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `reported_id` int(11) NOT NULL,
  `reporter_id` int(11) NOT NULL,
  `reason` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `reviewed_id` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sent_emails`
--

CREATE TABLE `sent_emails` (
  `id` int(10) NOT NULL,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `sender_email` text NOT NULL,
  `receiver_email` text NOT NULL,
  `sent_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `id` int(10) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(1, 'Java'),
(2, 'PHP'),
(3, 'JavaScript'),
(4, 'HTML'),
(5, 'CSS'),
(6, 'MySQL'),
(7, 'C'),
(8, 'C#'),
(9, 'C++'),
(10, 'Ruby'),
(11, 'MongoDB'),
(12, 'Android Studio'),
(13, 'Linux'),
(14, 'GO'),
(15, 'TypeScript'),
(16, 'Assembler'),
(17, 'WordPress'),
(18, 'Joomla'),
(19, 'Python'),
(20, 'React Native'),
(21, 'React js'),
(22, 'Node js'),
(23, 'Kotlin'),
(24, 'Git y GitHub'),
(25, 'PostgreSQL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(80) NOT NULL,
  `birth_date` date NOT NULL,
  `location` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `description` text NOT NULL,
  `last_active_date` date NOT NULL,
  `profile_picture` varchar(500) NOT NULL,
  `portfolio` text NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `user_type` int(10) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_following`
--

CREATE TABLE `user_following` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_languages`
--

CREATE TABLE `user_languages` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `language_id` int(10) NOT NULL,
  `level` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_tags`
--

CREATE TABLE `user_tags` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `tag_id` int(10) NOT NULL,
  `level` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`user_id`),
  ADD KEY `postulacion_id` (`offer_id`);

--
-- Indices de la tabla `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indices de la tabla `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postulacion_creador` (`creator_id`);

--
-- Indices de la tabla `offer_languages`
--
ALTER TABLE `offer_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `in_etiqueta` (`language_id`),
  ADD KEY `postulacion_id` (`offer_id`);

--
-- Indices de la tabla `offer_tags`
--
ALTER TABLE `offer_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `in_etiqueta` (`tag_id`),
  ADD KEY `postulacion_id` (`offer_id`);

--
-- Indices de la tabla `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_ibfk_1` (`reported_id`),
  ADD KEY `reporter_id` (`reporter_id`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resenia_usuario` (`user_id`),
  ADD KEY `reviewed_id` (`reviewed_id`);

--
-- Indices de la tabla `sent_emails`
--
ALTER TABLE `sent_emails`
  ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_following`
--
ALTER TABLE `user_following`
  ADD PRIMARY KEY (`id`),
  ADD KEY `following_id` (`following_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `user_languages`
--
ALTER TABLE `user_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `in_idioma` (`language_id`),
  ADD KEY `usuario_id` (`user_id`);

--
-- Indices de la tabla `user_tags`
--
ALTER TABLE `user_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`user_id`,`tag_id`),
  ADD KEY `idetiqueta_etiqueta` (`tag_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
ALTER TABLE applicants MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE languages MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE notifications MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE offers MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE offer_languages MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE offer_tags MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE reports MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE reviews MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE sent_emails MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE tags MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE users MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE user_following MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE user_languages MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE user_tags MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;


--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `idPostulacion` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`),
  ADD CONSTRAINT `postulados_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `postulacion_creador` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `offer_languages`
--
ALTER TABLE `offer_languages`
  ADD CONSTRAINT `offer_languages_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `offer_tags`
--
ALTER TABLE `offer_tags`
  ADD CONSTRAINT `idetiqueta_etiquetapost` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  ADD CONSTRAINT `idpostulacion_etiquetapost` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`);

--
-- Filtros para la tabla `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reported_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`reviewed_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_resenia` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sent_emails`
--

--
-- Filtros para la tabla `user_following`
--
ALTER TABLE `user_following`
  ADD CONSTRAINT `user_following_ibfk_1` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_following_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
