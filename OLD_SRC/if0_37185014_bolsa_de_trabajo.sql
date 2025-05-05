-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql206.infinityfree.com
-- Tiempo de generación: 18-10-2024 a las 08:26:43
-- Versión del servidor: 10.6.19-MariaDB
-- Versión de PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `if0_37185014_bolsa_de_trabajo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `estado_id` int(11) NOT NULL,
  `estado_nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`estado_id`, `estado_nombre`) VALUES
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
-- Estructura de tabla para la tabla `Estado_postulados`
--

CREATE TABLE `Estado_postulados` (
  `estadoPostulado_id` int(10) NOT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `Estado_postulados`
--

INSERT INTO `Estado_postulados` (`estadoPostulado_id`, `estado`) VALUES
(1, 'Aceptado'),
(2, 'Rechazado'),
(3, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `etiqueta_id` int(10) NOT NULL,
  `etiqueta_nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`etiqueta_id`, `etiqueta_nombre`) VALUES
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
-- Estructura de tabla para la tabla `idioma`
--

CREATE TABLE `idioma` (
  `idioma_id` int(10) NOT NULL,
  `idioma_nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `idioma`
--

INSERT INTO `idioma` (`idioma_id`, `idioma_nombre`) VALUES
(1, 'Español'),
(2, 'Inglés'),
(3, 'Portugués '),
(4, 'Francés'),
(5, 'Italiano '),
(6, 'Chino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mails_enviados`
--

CREATE TABLE `mails_enviados` (
  `mail_id` int(10) NOT NULL,
  `mail_asunto` varchar(80) NOT NULL,
  `mail_mensaje` text NOT NULL,
  `mail_emisor` int(10) NOT NULL,
  `mail_receptor` int(10) NOT NULL,
  `mail_fechaEmision` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `mails_enviados`
--

INSERT INTO `mails_enviados` (`mail_id`, `mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) VALUES
(2, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', 1, 2, '2024-09-02 22:56:13'),
(3, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 2, '2024-09-02 21:58:18'),
(4, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 2, '2024-09-02 21:58:28'),
(5, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', 1, 3, '2024-09-03 22:52:34'),
(6, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud y ya pueda utilizar nuestro software. Ten paciencia.', 1, 4, '2024-09-03 23:00:52'),
(7, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 3, '2024-09-03 22:19:13'),
(8, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 3, '2024-09-03 22:19:27'),
(9, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 4, '2024-09-03 22:19:32'),
(10, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 4, '2024-09-03 22:19:36'),
(11, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', 1, 5, '2024-09-04 00:35:48'),
(12, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 5, '2024-09-03 23:36:39'),
(13, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 5, '2024-09-03 23:36:44'),
(14, 'Postulacion', 'Se ha postulado exitosamente a: Programador Backend', 1, 2, '2024-09-04 16:23:45'),
(15, 'Postulacion', 'Se ha postulado exitosamente a: Programador Backend', 1, 3, '2024-09-04 20:17:46'),
(16, 'Postulacion', 'Se ha despostulado exitosamente a: Programador Backend', 1, 3, '2024-09-04 20:28:00'),
(17, 'Postulacion', 'Se ha despostulado exitosamente a: Programador Backend', 1, 2, '2024-09-04 20:28:26'),
(18, 'Postulacion', 'Se ha postulado exitosamente a: Programador Backend', 1, 5, '2024-09-04 20:32:21'),
(19, 'Postulacion', 'Se ha despostulado exitosamente a: Programador Backend', 1, 5, '2024-09-04 20:32:26'),
(20, 'Postulacion', 'Se ha postulado exitosamente a: Programador Backend', 1, 3, '2024-09-06 17:22:55'),
(21, 'Postulacion', 'Se ha despostulado exitosamente a: Programador Backend', 1, 3, '2024-09-06 17:23:18'),
(22, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', 1, 6, '2024-09-09 22:17:23'),
(23, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 6, '2024-09-09 21:19:12'),
(24, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 6, '2024-09-09 21:19:16'),
(25, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', 1, 7, '2024-09-09 23:14:34'),
(26, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 7, '2024-09-10 22:04:11'),
(27, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 7, '2024-09-10 22:04:19'),
(28, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', 1, 8, '2024-09-10 23:10:48'),
(29, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', 1, 9, '2024-09-10 23:12:57'),
(30, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 8, '2024-09-10 22:14:15'),
(31, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 8, '2024-09-10 22:14:23'),
(32, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 9, '2024-09-10 22:14:29'),
(33, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 9, '2024-09-10 22:14:35'),
(34, 'Registro en espera', 'Â¡Hola!, tu registro se ha cargado con Ã©xito, debe esperar a que un administrador acepte su solicitud y ya pueda utilizar nuestro software. Ten paciencia.', 1, 10, '2024-09-10 23:25:17'),
(35, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 10, '2024-09-10 22:26:18'),
(36, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 10, '2024-09-10 22:26:22'),
(37, 'Â¡Cuenta habilitada!', 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito dÃ­a.', 1, 9, '2024-09-10 22:26:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveles`
--

CREATE TABLE `niveles` (
  `niveles_id` int(10) NOT NULL,
  `niveles_nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `niveles`
--

INSERT INTO `niveles` (`niveles_id`, `niveles_nombre`) VALUES
(1, 'Básico'),
(2, 'Intermedio'),
(3, 'Avanzado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulaciones`
--

CREATE TABLE `postulaciones` (
  `postulaciones_id` int(11) NOT NULL,
  `postulacion_creador` int(10) NOT NULL,
  `postulaciones_titulo` varchar(50) NOT NULL,
  `postulaciones_fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `postulaciones_desc` text NOT NULL,
  `postulaciones_estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulados`
--

CREATE TABLE `postulados` (
  `postulado_id` int(11) NOT NULL,
  `usuario_id` int(10) NOT NULL,
  `postulacion_id` int(10) NOT NULL,
  `postulado_estado` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_etiqueta`
--

CREATE TABLE `post_etiqueta` (
  `postEtiqueta_id` int(10) NOT NULL,
  `in_etiqueta` int(10) NOT NULL,
  `postulacion_id` int(10) NOT NULL,
  `nivel` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenia`
--

CREATE TABLE `resenia` (
  `resenia_id` int(11) NOT NULL,
  `resenia_usuario` int(10) NOT NULL,
  `resenia_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `tipoUsuario_id` int(11) NOT NULL,
  `tipoUsuario_nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`tipoUsuario_id`, `tipoUsuario_nombre`) VALUES
(1, 'Empresa'),
(2, 'Alumno'),
(3, 'Egresado'),
(4, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(10) NOT NULL,
  `usuario_nombre` varchar(80) NOT NULL,
  `usuario_edad` date NOT NULL,
  `usuario_localidad` varchar(80) NOT NULL,
  `usuario_email` varchar(80) NOT NULL,
  `usuario_clave` varchar(80) NOT NULL,
  `usuario_descripcion` text NOT NULL,
  `usuario_dateAct` date NOT NULL,
  `usuario_fotoPerfil` varchar(500) NOT NULL,
  `usuario_portfolio` varchar(300) NOT NULL,
  `usuario_habilitado` varchar(100) NOT NULL,
  `usuario_tipo` int(10) NOT NULL,
  `usuario_estado` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `usuario_nombre`, `usuario_edad`, `usuario_localidad`, `usuario_email`, `usuario_clave`, `usuario_descripcion`, `usuario_dateAct`, `usuario_fotoPerfil`, `usuario_portfolio`, `usuario_habilitado`, `usuario_tipo`, `usuario_estado`) VALUES
(1, 'Sistema', '0000-00-00', '...', 'bolsadetrabajotecnicajunin@gmail.com', '...', 'Usuario creado para el envió de emails.', '2024-05-21', '...', '...', 'false', 4, 10),
(2, 'Maximo Sebastian Donza', '2006-04-24', 'JunÃ­n', 'maximosebastiandonza@gmail.com', '$2y$10$kFugeYPef.Lc7jhLiqPO4eB9b7VifnIyVVE4yttTuTNHqvX9LvSsO', 'Soy un programador Trainee de 18 aÃ±os.', '2024-09-02', '../imgs/img_u/ 2.png', 'pablitogaga.com', 'true', 2, 6),
(3, 'Pablo Gutierrez', '2006-03-27', 'Junin', 'pabloezequielgutierrez16@gmail.com', '$2y$10$jvjiYJCQX3/4/NIvbZEANO4gs23/9uDAdxPBcDvzIONVD739XGbb6', 'Me gusta el futbol', '2024-09-04', '../imgs/img_u/ 3.jpg', 'pablitoportfolio.com', 'true', 2, 5),
(4, 'Empresa Gutierrez', '2024-09-03', 'Junin', 'genesislol660@gmail.com', '$2y$10$nDOMZHzpGN6IxvE.lzLR3OMlC/oIskw41NkkjvPMyjyPxhUIi579K', 'Soy una empresa claramente', '2024-09-04', '../imgs/img_u/ 4.jpg', 'pabliempresa.com', 'true', 1, 10),
(5, 'Carlos Di Cicco', '1974-08-13', 'Junin', 'carlosdicicco@gmail.com', '$2y$10$Ae/D0D8v9y5dNg5xqFRygO2pH7JUZDxMFN5HYsXqk6lafuKmC0IvC', 'Profesor', '2024-09-06', '../imgs/img_u/ 5.webp', '-', 'true', 2, 6),
(6, 'damiÃ¡n', '2005-08-10', 'buenardo city', 'damisala13@gmail.com', '$2y$10$0qmQcDbVrV75xxktOHM/NOjokIM1CRBsekLU31Rbzuymy12T5X4Ke', 'soy el dami', '2024-09-09', '../imgs/img_u/ 6.jpg', 'no lo termine', 'true', 2, 7),
(7, 'max', '2024-09-01', 'juni', 'maximiliano.z.acunia@gmail.com', '$2y$10$crOrzaoXz4GLmFxagKh2SukrCeaskhpM2t.JQQj/6oIAvIyVZUovG', 'czczczc', '2024-09-09', '', 'b bjh', 'true', 2, 5),
(8, 'Melanie Mayuri', '2024-08-21', 'JunÃ­n', 'melaniemayuri@gmail.com', '$2y$10$Dhj45CqU8xq1vEFnOxuwDeH/dgt7k.H.3cCzOp2Mh00z.9r.7RoDC', 'njsjjdjcjcjajsjjcvms', '2024-09-10', '../imgs/img_u/ 8.png', '', 'true', 2, 4),
(9, 'Valentina Saavedra', '2006-05-11', 'JunÃ­n', 'valentinasoledadsaavedra@gmail.com', '$2y$10$3v/TDqOj7pJYtlI1LHgLYeqNUJHtxtiYsDD1NJjC1G2TCZqy0vuuS', 'hola', '2024-09-10', '../imgs/img_u/ 9.jpg', 'https://', 'true', 2, 3),
(10, 'damiÃ¡n', '2024-09-10', 'junin', 'empresariodami@gmail.com', '$2y$10$Wm5Kw/KzeJ1Y6qNzCO6dFeVuAi8e/CowDrdCmiPJKXpqF4L/QeR0u', 'junindev lo tiene que pedir', '2024-09-10', '', 'no', 'true', 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usu_etiquetas`
--

CREATE TABLE `usu_etiquetas` (
  `usuEtiqueta_id` int(10) NOT NULL,
  `usuario_id` int(10) NOT NULL,
  `in_etiqueta` int(10) NOT NULL,
  `nivel` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `usu_etiquetas`
--

INSERT INTO `usu_etiquetas` (`usuEtiqueta_id`, `usuario_id`, `in_etiqueta`, `nivel`) VALUES
(1, 2, 6, 1),
(2, 2, 5, 1),
(3, 2, 4, 1),
(4, 2, 3, 1),
(5, 2, 2, 1),
(6, 2, 1, 1),
(7, 2, 21, 1),
(8, 2, 22, 1),
(9, 2, 24, 1),
(19, 3, 1, 1),
(20, 3, 2, 2),
(21, 3, 3, 1),
(22, 3, 6, 1),
(23, 5, 8, 2),
(24, 6, 1, 1),
(25, 6, 4, 2),
(26, 6, 5, 2),
(27, 7, 4, 3),
(28, 8, 5, 1),
(29, 8, 4, 1),
(33, 9, 4, 3),
(34, 9, 14, 3),
(35, 9, 1, 2),
(36, 9, 17, 2),
(37, 9, 3, 1),
(38, 9, 19, 2),
(39, 9, 13, 2),
(40, 9, 9, 2),
(41, 9, 2, 2),
(42, 9, 5, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usu_idiomas`
--

CREATE TABLE `usu_idiomas` (
  `usuIdioma_id` int(10) NOT NULL,
  `usuario_id` int(10) NOT NULL,
  `in_idioma` int(10) NOT NULL,
  `nivel` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `usu_idiomas`
--

INSERT INTO `usu_idiomas` (`usuIdioma_id`, `usuario_id`, `in_idioma`, `nivel`) VALUES
(1, 2, 1, 1),
(2, 2, 2, 1),
(8, 3, 1, 3),
(9, 3, 2, 1),
(11, 5, 2, 2),
(12, 6, 1, 3),
(13, 7, 1, 3),
(14, 8, 2, 1),
(15, 8, 1, 3),
(19, 9, 2, 1),
(20, 9, 1, 3),
(21, 9, 3, 3),
(22, 9, 4, 3),
(23, 9, 5, 3),
(24, 9, 6, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`estado_id`);

--
-- Indices de la tabla `Estado_postulados`
--
ALTER TABLE `Estado_postulados`
  ADD PRIMARY KEY (`estadoPostulado_id`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`etiqueta_id`);

--
-- Indices de la tabla `idioma`
--
ALTER TABLE `idioma`
  ADD PRIMARY KEY (`idioma_id`);

--
-- Indices de la tabla `mails_enviados`
--
ALTER TABLE `mails_enviados`
  ADD PRIMARY KEY (`mail_id`),
  ADD KEY `mail_emisor` (`mail_emisor`),
  ADD KEY `mail_receptor` (`mail_receptor`);

--
-- Indices de la tabla `niveles`
--
ALTER TABLE `niveles`
  ADD PRIMARY KEY (`niveles_id`);

--
-- Indices de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD PRIMARY KEY (`postulaciones_id`),
  ADD KEY `postulacion_creador` (`postulacion_creador`);

--
-- Indices de la tabla `postulados`
--
ALTER TABLE `postulados`
  ADD PRIMARY KEY (`postulado_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `postulacion_id` (`postulacion_id`),
  ADD KEY `postulado_estado` (`postulado_estado`);

--
-- Indices de la tabla `post_etiqueta`
--
ALTER TABLE `post_etiqueta`
  ADD PRIMARY KEY (`postEtiqueta_id`),
  ADD KEY `in_etiqueta` (`in_etiqueta`),
  ADD KEY `postulacion_id` (`postulacion_id`),
  ADD KEY `nivel` (`nivel`);

--
-- Indices de la tabla `resenia`
--
ALTER TABLE `resenia`
  ADD PRIMARY KEY (`resenia_id`),
  ADD KEY `resenia_usuario` (`resenia_usuario`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`tipoUsuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD KEY `usuario_estado` (`usuario_estado`),
  ADD KEY `usuario_tipo` (`usuario_tipo`);

--
-- Indices de la tabla `usu_etiquetas`
--
ALTER TABLE `usu_etiquetas`
  ADD PRIMARY KEY (`usuEtiqueta_id`),
  ADD KEY `usuario_id` (`usuario_id`,`in_etiqueta`),
  ADD KEY `idetiqueta_etiqueta` (`in_etiqueta`),
  ADD KEY `nivel` (`nivel`);

--
-- Indices de la tabla `usu_idiomas`
--
ALTER TABLE `usu_idiomas`
  ADD PRIMARY KEY (`usuIdioma_id`),
  ADD KEY `in_idioma` (`in_idioma`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `nivel` (`nivel`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `estado_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `Estado_postulados`
--
ALTER TABLE `Estado_postulados`
  MODIFY `estadoPostulado_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `etiqueta_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `idioma`
--
ALTER TABLE `idioma`
  MODIFY `idioma_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `mails_enviados`
--
ALTER TABLE `mails_enviados`
  MODIFY `mail_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `niveles`
--
ALTER TABLE `niveles`
  MODIFY `niveles_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  MODIFY `postulaciones_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `postulados`
--
ALTER TABLE `postulados`
  MODIFY `postulado_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `post_etiqueta`
--
ALTER TABLE `post_etiqueta`
  MODIFY `postEtiqueta_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resenia`
--
ALTER TABLE `resenia`
  MODIFY `resenia_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `tipoUsuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usu_etiquetas`
--
ALTER TABLE `usu_etiquetas`
  MODIFY `usuEtiqueta_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `usu_idiomas`
--
ALTER TABLE `usu_idiomas`
  MODIFY `usuIdioma_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mails_enviados`
--
ALTER TABLE `mails_enviados`
  ADD CONSTRAINT `mails_enviados_ibfk_1` FOREIGN KEY (`mail_emisor`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `mails_enviados_ibfk_2` FOREIGN KEY (`mail_receptor`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD CONSTRAINT `postulacion_creador` FOREIGN KEY (`postulacion_creador`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `postulados`
--
ALTER TABLE `postulados`
  ADD CONSTRAINT `idPostulacion` FOREIGN KEY (`postulacion_id`) REFERENCES `postulaciones` (`postulaciones_id`),
  ADD CONSTRAINT `postuladoEstado_estado` FOREIGN KEY (`postulado_estado`) REFERENCES `Estado_postulados` (`estadoPostulado_id`),
  ADD CONSTRAINT `postulados_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `post_etiqueta`
--
ALTER TABLE `post_etiqueta`
  ADD CONSTRAINT `idetiqueta_etiquetapost` FOREIGN KEY (`in_etiqueta`) REFERENCES `etiquetas` (`etiqueta_id`),
  ADD CONSTRAINT `idpostulacion_etiquetapost` FOREIGN KEY (`postulacion_id`) REFERENCES `postulaciones` (`postulaciones_id`),
  ADD CONSTRAINT `nivel_etiquetapost` FOREIGN KEY (`nivel`) REFERENCES `niveles` (`niveles_id`);

--
-- Filtros para la tabla `resenia`
--
ALTER TABLE `resenia`
  ADD CONSTRAINT `usuario_resenia` FOREIGN KEY (`resenia_usuario`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`usuario_estado`) REFERENCES `estados` (`estado_id`),
  ADD CONSTRAINT `usuarios_ibfk_5` FOREIGN KEY (`usuario_tipo`) REFERENCES `tipo_usuario` (`tipoUsuario_id`);

--
-- Filtros para la tabla `usu_etiquetas`
--
ALTER TABLE `usu_etiquetas`
  ADD CONSTRAINT `idetiqueta_etiqueta` FOREIGN KEY (`in_etiqueta`) REFERENCES `etiquetas` (`etiqueta_id`),
  ADD CONSTRAINT `idusuario_etiqueta` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `usuEtiqueta_nivel` FOREIGN KEY (`nivel`) REFERENCES `niveles` (`niveles_id`);

--
-- Filtros para la tabla `usu_idiomas`
--
ALTER TABLE `usu_idiomas`
  ADD CONSTRAINT `ididioma_idioma` FOREIGN KEY (`in_idioma`) REFERENCES `idioma` (`idioma_id`),
  ADD CONSTRAINT `idusuario_idioma` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `usuIdioma_nivel` FOREIGN KEY (`nivel`) REFERENCES `niveles` (`niveles_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
