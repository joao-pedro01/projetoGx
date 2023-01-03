/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `gx` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `gx`;

CREATE TABLE IF NOT EXISTS `atributos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `atrib6_cat` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `equipamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `equipamentos_atributos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipamento` int(11) NOT NULL,
  `id_atributo` int(11) NOT NULL,
  `valor` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__equipamento` (`id_equipamento`) USING BTREE,
  KEY `FK__atributo` (`id_atributo`) USING BTREE,
  CONSTRAINT `FK__atributo` FOREIGN KEY (`id_atributo`) REFERENCES `atributos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__equipamento` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamentos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `especificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_categorias_id` int(11) NOT NULL DEFAULT 0,
  `saldo` int(4) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `marca` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `modelo` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `atrib1` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `atrib2` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `atrib3` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `atrib4` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `atrib5` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `atrib6` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `SKU` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoruas_id` (`fk_categorias_id`),
  CONSTRAINT `FK__categorias` FOREIGN KEY (`fk_categorias_id`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `movimentos` (
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
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `pecas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `sku` varchar(20) NOT NULL,
  `saldo` int(5) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `entrada` int(11) DEFAULT NULL,
  `saida` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `pecas_atributos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_peca` int(11) NOT NULL,
  `id_atributo` int(11) NOT NULL,
  `valor` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `FK__peca` (`id_peca`) USING BTREE,
  KEY `FK__atributo` (`id_atributo`) USING BTREE,
  CONSTRAINT `FK_pecas_atributos_atributos` FOREIGN KEY (`id_atributo`) REFERENCES `atributos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_pecas_atributos_pecas` FOREIGN KEY (`id_peca`) REFERENCES `pecas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `senha` char(150) NOT NULL,
  `criado` date NOT NULL,
  `alterado` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
