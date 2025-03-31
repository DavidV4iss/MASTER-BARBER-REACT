-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-03-2025 a las 16:58:32
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
-- Base de datos: `master_barber`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `puntuacion` int(11) DEFAULT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id`, `usuario_id`, `puntuacion`, `comentario`) VALUES
(25, 5, 3, 'ffffffffffffffffffffff'),
(26, 5, 3, 'ffffffffffffffffffffff'),
(27, 5, 3, 'ssssssssss'),
(28, 5, 3, 'ddddddddddddddddddddd'),
(29, 5, 5, 'ssssssssssssssssssss');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

CREATE TABLE `categoria_producto` (
  `id_categoria_producto` int(255) NOT NULL,
  `categoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`id_categoria_producto`, `categoria`) VALUES
(1, 'Ropa'),
(2, 'Accesorios'),
(3, 'Productos de cuidado personal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_producto` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion_P` varchar(255) NOT NULL,
  `cantidad` int(255) NOT NULL,
  `id_categoria_producto` int(255) NOT NULL,
  `proveedor` varchar(255) NOT NULL,
  `PrecioUnitario` int(255) NOT NULL,
  `fecha_venta` datetime DEFAULT NULL,
  `Foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_producto`, `nombre`, `descripcion_P`, `cantidad`, `id_categoria_producto`, `proveedor`, `PrecioUnitario`, `fecha_venta`, `Foto`) VALUES
(57, 'Maquina Para Barberia', 'Corte Fino', 8, 3, 'CocaCola', 150000, '2025-03-14 09:48:00', 'inventario_1742395538261-Maquina.jpg'),
(58, 'Porta Cuchillas', 'Corte Fino', 0, 3, 'CocaCola', 50000, '2025-03-14 09:50:00', 'inventario_1742395550506-Porta Navajas.jpg'),
(59, 'polvos Texturizantes', 'Un Corte Texturizado', 8, 3, 'CocaCola', 300000, '2025-03-14 09:50:00', 'inventario_1742395574960-texturizante.jpg'),
(60, 'Locion Desinfectante', 'Desinfecta', 8, 3, 'CocaCola', 400000, '2025-03-19 09:16:00', 'inventario_1742393809510-LOCION-REFRESCANTEjpg.jpg'),
(61, 'Atomizador', 'Atomizador', 10, 3, 'CocaCola', 700000, '2025-03-19 09:17:00', 'inventario_1742393858813-Atomizadorjpg.jpg'),
(62, 'Gel Para Afeitar', 'Afeitar', 9, 3, 'CocaCola', 800000, '2025-03-19 09:18:00', 'inventario_1742393927581-GEL_PARA_AFEITAR.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id_notificacion` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `leido` tinyint(1) DEFAULT 0,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id_notificacion`, `cliente_id`, `mensaje`, `leido`, `fecha`) VALUES
(4, 5, 'El estado de tu reserva ha sido actualizado a: Aceptada. Servicio: Corte premium, Fecha: 31/3/2025, 9:47:53 a. m.', 0, '2025-03-31 14:48:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `barbero_id` int(11) NOT NULL,
  `servicio` int(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `cliente_id`, `barbero_id`, `servicio`, `fecha`, `estado`) VALUES
(86, 5, 56, 2, '2025-03-31 09:47:53', 'Aceptada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(255) NOT NULL,
  `nombre_rol` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Barbero'),
(3, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_adicional`
--

CREATE TABLE `servicio_adicional` (
  `id_servicio` int(11) NOT NULL,
  `nombre_servicio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_servicio`
--

CREATE TABLE `tipo_servicio` (
  `id_tipo_servicio` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion_S` varchar(255) NOT NULL,
  `precio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_servicio`
--

INSERT INTO `tipo_servicio` (`id_tipo_servicio`, `nombre`, `descripcion_S`, `precio`) VALUES
(1, 'Corte basico', 'Solo corte, sin mascarillas, sin barba y ninguno de otros', '20.000'),
(2, 'Corte premium', 'Incluye corte, barba, cejas, lineas dependiendo el gusto y mascarillas ', '60.000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(255) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `email` varchar(55) NOT NULL,
  `nit` int(55) NOT NULL,
  `telefono` varchar(55) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `id_rol` int(255) NOT NULL,
  `user_reset_code` varchar(7) DEFAULT NULL,
  `user_reset_code_expiration` datetime DEFAULT NULL,
  `Foto` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `email`, `nit`, `telefono`, `contrasena`, `id_rol`, `user_reset_code`, `user_reset_code_expiration`, `Foto`, `descripcion`) VALUES
(5, 'Fidel Espitia ', 'fideljoseespi10@gmail.com', 1028662003, '3142758305', '$2a$10$PKXnqMs3F8HJrGLVRkXNCOK9mSs.wWrdrDGjWEZgGRAhmqVJSBblG', 3, NULL, NULL, '1740579974533-B2.JPG', ''),
(6, 'ADMINISTRADOR', 'Admin@gmail.com', 1028662004, '3142758305', '$2a$10$gKkjGOeNlRvXzyePlVJq1.r/9Y.F6.f.UROSSUNuM7Sjv1xkZyRo.', 1, NULL, NULL, '1732824864824-MB3.JPG', ''),
(46, 'Cristian Rueda', 'cristianrueda0313@gmail.com', 1014481682, '3044495505', '$2a$10$bIWNt35HJxB.87Vr7PxyBuUBis7..1UoEontoGZ2okpnkLeBp8Lfe', 3, '338281', '2025-02-28 10:59:58', '1741002589544-MB7.JPG', ''),
(49, 'Nixxon', 'nixon30@gmail.com', 0, '', '$2a$10$G3pPqsEHK2eAkGhtDQQdUupZcu/6G1T1sp4PA3prWSfK2c3H310JC', 2, NULL, NULL, 'barbero_1742999236348-B3.JPG', 'Cortes Perfilados , Accesoria En Imagen Buen Uso De Las Maquinas Y El Ambinte'),
(54, 'Jeisson', 'jeisson30@gmail.com', 0, '', '$2a$10$Fq4Rb1.iRUSeg/gfDl0vEe95CHlW4vyi37RrtJzu9SmcVeKtCl7cG', 2, NULL, NULL, 'barbero_1743001106896-B2.JPG', 'Cortes Perfilados , Accesoria En Imagen Buen Uso De Las Maquinas Y El Ambinte'),
(56, 'Deiby', 'Deiby30@gmail.com', 0, '', '$2a$10$82W7loJVyJCr52RSdEv5ae198dvCeu.PiTC6K8cLeGJ5UyFl0EcK6', 2, NULL, NULL, 'barbero_1743429955092-B1.JPG', 'Cortes Perfilados , Accesoria En Imagen Buen Uso De Las Maquinas Y El Ambinte');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  ADD PRIMARY KEY (`id_categoria_producto`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria_producto` (`id_categoria_producto`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `barbero_id` (`barbero_id`),
  ADD KEY `servicio` (`servicio`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `servicio_adicional`
--
ALTER TABLE `servicio_adicional`
  ADD PRIMARY KEY (`id_servicio`);

--
-- Indices de la tabla `tipo_servicio`
--
ALTER TABLE `tipo_servicio`
  ADD PRIMARY KEY (`id_tipo_servicio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  MODIFY `id_categoria_producto` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `servicio_adicional`
--
ALTER TABLE `servicio_adicional`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `producto categoria producto` FOREIGN KEY (`id_categoria_producto`) REFERENCES `categoria_producto` (`id_categoria_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`barbero_id`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`servicio`) REFERENCES `tipo_servicio` (`id_tipo_servicio`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuario rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
