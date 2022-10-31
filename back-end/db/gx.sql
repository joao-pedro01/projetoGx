CREATE DATABASE IF NOT EXISTS `gx`;
USE `gx`;

-- tabela atributos
CREATE TABLE IF NOT EXISTS `atributos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela equipamentos
CREATE TABLE IF NOT EXISTS `equipamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela pecas
CREATE TABLE IF NOT EXISTS `pecas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `sku` varchar(20) NOT NULL,
  `saldo` int(5) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela usuarios
CREATE TABLE IF NOT EXISTS `usuarios`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR (150) NOT NULL,
  `senha` CHAR (150) NOT NULL,
  `criado` DATE NOT NULL,
  `alterado` DATE,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `movimentos`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_peca` int(11) DEFAULT NULL,
  `id_equipamento` int(11) DEFAULT NULL,
  `tipo` varchar(50) NOT NULL,
  `valor` varchar(50) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_peca` (`id_peca`),
  KEY `id_equipamento` (`id_equipamento`),
  CONSTRAINT `FK_movimentos_equipamentos` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamentos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_movimentos_pecas` FOREIGN KEY (`id_peca`) REFERENCES `pecas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_movimentos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela fk equipamentos_atributos
CREATE TABLE IF NOT EXISTS `equipamentos_atributos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_equipamento` int(11) NOT NULL,
  `id_atributo` int(11) NOT NULL,
  `valor` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  KEY `FK__equipamentos` (`id_equipamento`),
  KEY `FK__atributos` (`id_atributo`),
  CONSTRAINT `FK__atributos` FOREIGN KEY (`id_atributo`) REFERENCES `atributos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__equipamentos` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamentos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela fk pecas_atributos
CREATE TABLE IF NOT EXISTS `pecas_atributos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_peca` int(11) NOT NULL,
  `id_atributo` int(11) NOT NULL,
  `valor` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  KEY `FK__pecas` (`id_peca`),
  KEY `FK__atributos` (`id_atributo`),
  FOREIGN KEY (`id_atributo`) REFERENCES `atributos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`id_peca`) REFERENCES `pecas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;