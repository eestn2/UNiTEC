-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2025 a las 22:26:54
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
-- Base de datos: `bolsadev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applicants`
--

CREATE TABLE `applicants` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `application_id` int(10) NOT NULL,
  `status_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `creator_id` int(10) NOT NULL,
  `title` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `application_statuses`
--

CREATE TABLE `application_statuses` (
  `id` int(10) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `application_statuses`
--

INSERT INTO `application_statuses` (`id`, `status`) VALUES
(1, 'Aceptado'),
(2, 'Rechazado'),
(3, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `application_tags`
--

CREATE TABLE `application_tags` (
  `id` int(10) NOT NULL,
  `tag_id` int(10) NOT NULL,
  `application_id` int(10) NOT NULL,
  `level_id` int(10) NOT NULL
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
(3, 'Portugués '),
(4, 'Francés'),
(5, 'Italiano '),
(6, 'Chino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `id` int(10) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`id`, `name`) VALUES
(1, 'Básico'),
(2, 'Intermedio'),
(3, 'Avanzado');

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
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
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
  `sender_id` int(10) NOT NULL,
  `receiver_id` int(10) NOT NULL,
  `sent_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `statuses`
--

INSERT INTO `statuses` (`id`, `name`) VALUES
(1, 'Buscando beca '),
(2, 'Trabajando - No disponible'),
(3, 'Trabajando - Disponible '),
(4, 'No disponible '),
(5, 'Disponible'),
(6, 'Estudiando - Disponible'),
(7, 'Estudiando - No disponible'),
(8, 'Estudiando - Buscando beca'),
(9, 'Trabajando - Buscando beca'),
(10, 'Otro');

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
  `enabled` varchar(100) NOT NULL,
  `user_type_id` int(10) NOT NULL,
  `status_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_languages`
--

CREATE TABLE `user_languages` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `language_id` int(10) NOT NULL,
  `level_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_tags`
--

CREATE TABLE `user_tags` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `tag_id` int(10) NOT NULL,
  `level_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_types`
--

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `user_types`
--

INSERT INTO `user_types` (`id`, `name`) VALUES
(1, 'Empresa'),
(2, 'Alumno'),
(3, 'Egresado'),
(4, 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`user_id`),
  ADD KEY `postulacion_id` (`application_id`),
  ADD KEY `postulado_estado` (`status_id`);

--
-- Indices de la tabla `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postulacion_creador` (`creator_id`);

--
-- Indices de la tabla `application_statuses`
--
ALTER TABLE `application_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `application_tags`
--
ALTER TABLE `application_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `in_etiqueta` (`tag_id`),
  ADD KEY `postulacion_id` (`application_id`),
  ADD KEY `nivel` (`level_id`);

--
-- Indices de la tabla `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resenia_usuario` (`user_id`);

--
-- Indices de la tabla `sent_emails`
--
ALTER TABLE `sent_emails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mail_emisor` (`sender_id`),
  ADD KEY `mail_receptor` (`receiver_id`);

--
-- Indices de la tabla `statuses`
--
ALTER TABLE `statuses`
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_estado` (`status_id`),
  ADD KEY `usuario_tipo` (`user_type_id`);

--
-- Indices de la tabla `user_languages`
--
ALTER TABLE `user_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `in_idioma` (`language_id`),
  ADD KEY `usuario_id` (`user_id`),
  ADD KEY `nivel` (`level_id`);

--
-- Indices de la tabla `user_tags`
--
ALTER TABLE `user_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`user_id`,`tag_id`),
  ADD KEY `idetiqueta_etiqueta` (`tag_id`),
  ADD KEY `nivel` (`level_id`);

--
-- Indices de la tabla `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `application_statuses`
--
ALTER TABLE `application_statuses`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `application_tags`
--
ALTER TABLE `application_tags`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sent_emails`
--
ALTER TABLE `sent_emails`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `user_languages`
--
ALTER TABLE `user_languages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `user_tags`
--
ALTER TABLE `user_tags`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `idPostulacion` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`),
  ADD CONSTRAINT `postuladoEstado_estado` FOREIGN KEY (`status_id`) REFERENCES `application_statuses` (`id`),
  ADD CONSTRAINT `postulados_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `postulacion_creador` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `application_tags`
--
ALTER TABLE `application_tags`
  ADD CONSTRAINT `idetiqueta_etiquetapost` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  ADD CONSTRAINT `idpostulacion_etiquetapost` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`),
  ADD CONSTRAINT `nivel_etiquetapost` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `usuario_resenia` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `sent_emails`
--
ALTER TABLE `sent_emails`
  ADD CONSTRAINT `mails_enviados_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `mails_enviados_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`),
  ADD CONSTRAINT `usuarios_ibfk_5` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`);

--
-- Filtros para la tabla `user_languages`
--
ALTER TABLE `user_languages`
  ADD CONSTRAINT `ididioma_idioma` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `idusuario_idioma` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `usuIdioma_nivel` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `user_tags`
--
ALTER TABLE `user_tags`
  ADD CONSTRAINT `idetiqueta_etiqueta` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  ADD CONSTRAINT `idusuario_etiqueta` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `usuEtiqueta_nivel` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
