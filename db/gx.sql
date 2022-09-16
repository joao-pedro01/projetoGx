CREATE DATABASE IF NOT EXISTS `gx`;
USE `gx`;

-- tabela atributos
CREATE TABLE IF NOT EXISTS `atributos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela equipamentos
CREATE TABLE IF NOT EXISTS `equipamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela pecas
CREATE TABLE IF NOT EXISTS `pecas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela usuarios
CREATE TABLE IF NOT EXISTS `usuarios`(
`id` int(11) NOT NULL AUTO_INCREMENT,
`nome` VARCHAR (150) NOT NULL,
`senha` CHAR (150) NOT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela fk equipamentos_atributos
CREATE TABLE IF NOT EXISTS `equipamentos_atributos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_equipamentos` int(11) NOT NULL,
  `id_atributos` int(11) NOT NULL,
  KEY `FK__equipamentos` (`id_equipamentos`),
  KEY `FK__atributos` (`id_atributos`),
  CONSTRAINT `FK__atributos` FOREIGN KEY (`id_atributos`) REFERENCES `atributos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__equipamentos` FOREIGN KEY (`id_equipamentos`) REFERENCES `equipamentos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela fk pecas_atributos
CREATE TABLE IF NOT EXISTS `pecas_atributos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_pecas` int(11) NOT NULL,
  `id_atributos` int(11) NOT NULL,
  KEY `FK__pecas` (`id_pecas`),
  KEY `FK__atributos` (`id_atributos`),
  FOREIGN KEY (`id_atributos`) REFERENCES `atributos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`id_pecas`) REFERENCES `pecas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;