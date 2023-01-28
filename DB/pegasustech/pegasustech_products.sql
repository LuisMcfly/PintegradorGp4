-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pegasustech
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `discount` int(11) NOT NULL DEFAULT 0,
  `stock` int(11) NOT NULL DEFAULT 0,
  `images` varchar(255) NOT NULL DEFAULT 'defaultProductImage.png',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `features_id` int(11) DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `features_id` (`features_id`),
  KEY `manufacturer_id` (`manufacturer_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`features_id`) REFERENCES `features` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Portátil Asus Vivobook Pro OLED 15.6 Pulgadas Intel Core i7 16GB 512GB','Vivobook Pro','Portátil Asus Vivobook Pro OLED 15.6 Pulgadas Intel Core i7 16GB 512GB',6500000,5,10,'Asus.jpg','2023-01-28 16:06:02','2023-01-28 16:26:34',1,3,1),(2,'Portátil Lenovo 14 Pulgadas Intel Core i7 16GB 512GB','Quarzs','Portátil Lenovo 14 Pulgadas Intel Core i7 16GB 512GB',3400000,10,5,'Lenovo.png','2023-01-28 16:29:21','2023-01-28 16:46:06',1,3,4),(3,'Portatil Dell Inspiron15 5510 15,6 Ci7 8Gb 128Gb','Inspiron15 5510','Portatil Dell Inspiron15 5510 15,6 Ci7 8Gb 128Gb',2000000,7,8,'Dell.png','2023-01-28 16:35:49','2023-01-28 16:49:07',1,1,1),(4,'Alienware M15 R7','M15 R7','La laptop basada en Intel de 15 pulgadas más potente de Alienware hasta el momento.',10500000,3,10,'AlienWare.png','2023-01-28 16:37:08','2023-01-28 16:51:34',1,5,5),(5,'Redragon S101','S101','Combo de teclado y mouse para juegos con cable Teclado para juegos retroiluminado RGB',500000,2,5,'Combo1.jpg','2023-01-28 16:40:47','2023-01-28 16:54:38',4,6,2),(6,'Monitor para juegos UltraGear™ Full HD IPS 1 ms (GtG) de 24\"','UltraGear™','Monitor para juegos UltraGear™ Full HD IPS 1 ms (GtG) de 24\"',1200000,5,8,'PantallaGamer.png','2023-01-28 16:57:38','2023-01-28 17:01:00',4,9,1),(7,'Pc Torre Gamer Power X08','X08 AMD Atholn','Pc Torre Gamer Power X08 Amd Athlon 3000G Ssd 240Gb Ram 16Gb Led 22 Pulgadas Full Hd',5000000,5,30,'PC_escritorio.png','2023-01-28 17:04:32','2023-01-28 17:09:07',1,2,1),(8,'Set Gamer Teclado Led + Mouse Inalambrico Usb Recargable','TR5800','Set Gamer Teclado Led + Mouse Inalambrico Usb Recargable',150000,8,30,'combo2.png','2023-01-28 17:07:19','2023-01-28 17:09:49',4,6,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-28 12:10:44
