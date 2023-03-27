CREATE TABLE `categorias` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `marca_cat` varchar(50) DEFAULT NULL,
  `atrib1_cat` varchar(50) DEFAULT NULL,
  `atrib2_cat` varchar(50) DEFAULT NULL,
  `atrib3_cat` varchar(50) DEFAULT NULL,
  `atrib4_cat` varchar(50) DEFAULT NULL,
  `modelo_cat` varchar(50) DEFAULT NULL,
  `atrib5_cat` varchar(50) DEFAULT NULL,
  `atrib6_cat` varchar(50) DEFAULT NULL
);

CREATE TABLE `especificacoes` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_categorias_id` int(11) NOT NULL DEFAULT 0,
  `saldo` int(4) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `marca` varchar(50) NOT NULL DEFAULT "0",
  `modelo` varchar(50) NOT NULL DEFAULT "0",
  `atrib1` varchar(50) NOT NULL DEFAULT "0",
  `atrib2` varchar(50) NOT NULL DEFAULT "0",
  `atrib3` varchar(50) NOT NULL DEFAULT "0",
  `atrib4` varchar(50) NOT NULL DEFAULT "0",
  `atrib5` varchar(50) NOT NULL DEFAULT "0",
  `atrib6` varchar(50) NOT NULL DEFAULT "0",
  `SKU` varchar(50) DEFAULT NULL
);

CREATE TABLE `usuarios` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `senha` char(150) NOT NULL,
  `criado` date NOT NULL,
  `alterado` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
);

CREATE UNIQUE INDEX `nome` ON `categorias` (`nome`) USING BTREE;

CREATE INDEX `fk_categoruas_id` ON `especificacoes` (`fk_categorias_id`);

ALTER TABLE `especificacoes` ADD CONSTRAINT `FK__categorias` FOREIGN KEY (`fk_categorias_id`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
