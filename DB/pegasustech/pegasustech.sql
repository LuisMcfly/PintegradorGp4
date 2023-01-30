CREATE DATABASE  IF NOT EXISTS `pegasustech` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `pegasustech`;
-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: pegasustech
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Portátiles'),(2,'Periféricos'),(3,'Computadores de escritorio'),(4,'Gamer');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'RAM 8GB | SSD 128GB'),(2,'RAM 16GB | SSD 256GB'),(3,'RAM 16GB | SSD 512GB'),(4,'RAM 32GB | SSD 1TB'),(5,'RAM 32GB | SSD 2TB'),(6,'Suiches RED'),(7,'Suiches BLUE'),(8,'Suiches BROWN'),(9,'24\"'),(10,'27\"'),(11,'32\"');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceNumber` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers`
--

LOCK TABLES `manufacturers` WRITE;
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
INSERT INTO `manufacturers` VALUES (1,'Dell'),(2,'Samsung'),(3,'HP'),(4,'Lenovo'),(5,'Alienware'),(6,'Asus');
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Portátil Asus Vivobook Pro OLED 15.6 Pulgadas Intel Core i7 16GB 512GB','Vivobook Pro','Portátil Asus Vivobook Pro OLED 15.6 Pulgadas Intel Core i7 16GB 512GB',6500000,5,10,'Asus.jpg','2023-01-28 16:06:02','2023-01-28 16:26:34',1,3,1),(2,'Portátil Lenovo 14 Pulgadas Intel Core i7 16GB 512GB','Quarzs','Portátil Lenovo 14 Pulgadas Intel Core i7 16GB 512GB',3400000,10,5,'Lenovo.png','2023-01-28 16:29:21','2023-01-28 16:46:06',1,3,4),(3,'Portatil Dell Inspiron15 5510 15,6 Ci7 8Gb 128Gb','Inspiron15 5510','Portatil Dell Inspiron15 5510 15,6 Ci7 8Gb 128Gb',2000000,7,8,'Dell.png','2023-01-28 16:35:49','2023-01-28 16:49:07',1,1,1),(4,'Alienware M15 R7','M15 R7','La laptop basada en Intel de 15 pulgadas más potente de Alienware hasta el momento.',10500000,3,10,'AlienWare.png','2023-01-28 16:37:08','2023-01-28 16:51:34',1,5,5),(5,'Redragon S101','S101','Combo de teclado y mouse para juegos con cable Teclado para juegos retroiluminado RGB',500000,2,5,'Combo1.jpg','2023-01-28 16:40:47','2023-01-28 16:54:38',4,6,2),(6,'Monitor para juegos UltraGear™ Full HD IPS 1 ms (GtG) de 24\"','UltraGear™','Monitor para juegos UltraGear™ Full HD IPS 1 ms (GtG) de 24\"',1200000,5,8,'PantallaGamer.png','2023-01-28 16:57:38','2023-01-28 17:01:00',4,9,1),(7,'Pc Torre Gamer Power X08','X08 AMD Atholn','Pc Torre Gamer Power X08 Amd Athlon 3000G Ssd 240Gb Ram 16Gb Led 22 Pulgadas Full Hd',5000000,5,30,'PC_escritorio.png','2023-01-28 17:04:32','2023-01-28 17:09:07',1,2,1),(8,'Set Gamer Teclado Led + Mouse Inalambrico Usb Recargable','TR5800','Set Gamer Teclado Led + Mouse Inalambrico Usb Recargable',150000,8,30,'combo2.png','2023-01-28 17:07:19','2023-01-28 17:09:49',4,6,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT 'Sin Definir',
  `gender` varchar(255) DEFAULT 'Sin Definir',
  `userType` varchar(255) NOT NULL DEFAULT 'User',
  `image` varchar(255) DEFAULT 'defaultUserImage.png',
  `token` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ruth White','ruthwhite@gmail.com','$2b$10$lvU7rDeS4QlufDb6WXrSTOKONEl1YeQTjUz7OTkTAoE9gVhZvdcTC','3005786898','99600 Buckridge Ford Suite 956','Femenino','User','femenino.jpg','da3vsguork81gnsfujb1',NULL,'2023-01-28 15:29:19','2023-01-28 15:30:00'),(2,'David Watkins','davidwatkins@hotmail.com','$2b$10$r6DB.CRHbt12AR9CQhvszuFHHp0JuUamOWtV3w/gLN3qTQU7S/mB6','3012688144','8874 Balistreri Flat Suite 521 ','Masculino','User','masculino.jpg','aj00716a2m81gnsg1484',NULL,'2023-01-28 15:30:42','2023-01-28 15:31:30'),(3,'Danielle Gross','daniellegross@outlook.com','$2b$10$FqOj/OVtaOjzeIoMT9olq.nG4UDwyCyXdAr8POSMp//ejwD8B9jVC','3155926573','921 Tremblay Rapids Apt. 815 ','Femenino','User','femenino.jpg','ihocfrhgd31gnsg3l3u',NULL,'2023-01-28 15:32:04','2023-01-28 15:32:39'),(4,'Sarah Lane','sarahlane@yahoo.com','$2b$10$YCMA4644lTRGRmw964pMFejklCV1W9D4z11vWJdo5s7Dl2S50R1KG','3204086547','102 Kessler Mission','Femenino','User','femenino.jpg','tm3od3r1ds1gnsg68gs',NULL,'2023-01-28 15:33:30','2023-01-28 15:34:03'),(5,'Kimberly Small','kimberlysmall@hotmail.com','$2b$10$Ij1S5.zbEhIRwYHEB/kNBOGtS/v8bSw4ARlOoMrlotEmeTduXKdG2','3145630266','43874 Moses Mountain','Femenino','User','femenino.jpg','91j3rd0mj11gnsgc9cj',NULL,'2023-01-28 15:36:47','2023-01-28 15:37:17'),(6,'Karen Watkins','karenwatkins@outlook.com','$2b$10$sQwkK3AHRe/G.T5hhzxo4.JUW7yv58P1m.qsGgsVN325OjNxnqPmi','3154608252',' 7107 Gussie Overpass Apt. 035 ','Femenino','User','femenino.jpg','61nnorjocr1gnsge8sg',NULL,'2023-01-28 15:37:52','2023-01-28 15:38:32'),(7,'Ryan White','ryanwhite@yahoo.com','$2b$10$iRLw5agMw.yhpxvVivMUbO3yyj8dS0MAN02qlGddXaKa8G0Iv7H7u','3206176053','99600 Buckridge Ford Suite 956','Masculino','User','masculino.jpg','luvb2614kqo1gnsggdjr',NULL,'2023-01-28 15:39:03','2023-01-28 15:39:36'),(8,'Mary Maynard','marymaynard@gmail.com','$2b$10$I9WEwp1e0.QcBVVYh2gva.u7/CtzLOZv5M7OGATVCgyfK0Cg22C9m','3141860213','8874 Balistreri Flat Suite 521 ','Femenino','User','femenino.jpg','oha05nnqusg1gnsgiq1v',NULL,'2023-01-28 15:40:21','2023-01-28 15:40:57'),(9,'Melanie Cabrera','melaniecabrera@hotmail.com','$2b$10$xHQ1mNfjzDEJS5/GyTnrSecKi3ETJ4XLn7jsBlnwhYTO60ytL2UL.','3007491243','921 Tremblay Rapids Apt. 815 ','Femenino','User','femenino.jpg','m2vq072bk081gnsgkqo3',NULL,'2023-01-28 15:41:27','2023-01-28 15:41:59'),(10,'Christopher Williams','christopherwilliams@outlook.com','$2b$10$PQn9FW/Q6fBmkHsy2Z4dHuhT018ReVaVNy2DG6aG1MJ/ErvIaS9ai','3011613130','102 Kessler Mission','Masculino','User','masculino.jpg','h9f7hl4llq1gnsgn931',NULL,'2023-01-28 15:42:47','2023-01-28 15:43:20'),(11,'Barry Robinson','barryrobinson@yahoo.com','$2b$10$.tWGCr5Znph8WtvDVJJ3Luc483nF2Yz3A.dApTO5qn3xyaSLtyK/i','3205400304','43874 Moses Mountain','Masculino','User','masculino.jpg','b8hu6ut4p51gnsgpic4',NULL,'2023-01-28 15:44:02','2023-01-28 15:44:25'),(12,'Kathryn Bradshaw','kathrynbradshaw@hotmail.com','$2b$10$lgzfG6KeFGi1mRc2Q9BpVeKTIFMGKQfLc8BFT.oC1OVLpGMEfvU.e','3141287551',' 7107 Gussie Overpass Apt. 035 ','Femenino','User','femenino.jpg','pfc2h8os3781gnsgra53',NULL,'2023-01-28 15:45:00','2023-01-28 15:45:30'),(13,'Colton Williams','coltonwilliams@outlook.com','$2b$10$bOkB/tjb/hqjmEsn40YOauOCXhDriqrGQXOIxmuz1MY1UhQlkXiGG','3154206266','99600 Buckridge Ford Suite 956','Masculino','User','masculino.jpg','p9k6d0utpbg1gnsgt96k',NULL,'2023-01-28 15:46:04','2023-01-28 15:46:38'),(14,'Joshua Cole','joshuacole@yahoo.com','$2b$10$NJsarD6E4whDaFrBwWLDe.3vC8GfATwIFOF4vKT2/GGk9CY7zd5qO','3204484560','8874 Balistreri Flat Suite 521 ','Masculino','User','masculino.jpg','8vtd1ksvcr1gnsh30rg',NULL,'2023-01-28 15:49:12','2023-01-28 15:49:38'),(15,'Breanna Evans','breannaevans@outlook.com','$2b$10$iqc/lGjACRrYWfQX.2Ywv.rOkAjao/Gu5CGpN3WYTY9zoz6y8h0Q2','3009920024','921 Tremblay Rapids Apt. 815 ','Femenino','User','femenino.jpg','mejqkim3kvo1gnsh55ka',NULL,'2023-01-28 15:50:23','2023-01-28 15:50:48'),(16,'Mark Murphy','markmurphy@yahoo.com','$2b$10$4BidHhIm/mD.p24L24VYyOqbVFhkEyLbjd1.GD83Rd04brIKqVi4.','3015375452','102 Kessler Mission','Masculino','User','masculino.jpg','q4bpkp300m1gnsh6tjh',NULL,'2023-01-28 15:51:20','2023-01-28 15:51:50'),(17,'Jeremy Edwards','jeremyedwards@gmail.com','$2b$10$qE0JLedCgbk1jaRMI.ujzewKekOAeN5AhtPumLP/2lA/W9PI6/l1K','3153197218','43874 Moses Mountain','Masculino','User','masculino.jpg','c2gshvgeqgo1gnsh8nd2',NULL,'2023-01-28 15:52:19','2023-01-28 15:52:45'),(18,'Margaret Williams','margaretwilliams@hotmail.com','$2b$10$QlxkPT9b/Zu/DVRxAG4s4uTJaEHmkc.GO7edeYLxjQFKnzjL3YUMO','3202826795',' 7107 Gussie Overpass Apt. 035 ','Femenino','User','femenino.jpg','52o0lpuc0ro1gnshah5b',NULL,'2023-01-28 15:53:18','2023-01-28 15:53:45'),(19,'Daniel Wright','danielwright@outlook.com','$2b$10$qviAoZJ0ZJjIrRhZ0oj58.PCKOpTg2mPEE3M1wPXTJTKdBeeRS0ZC','3144843412','99600 Buckridge Ford Suite 956','Masculino','User','masculino.jpg','b4rd6p2b2p81gnshcbt0',NULL,'2023-01-28 15:54:18','2023-01-28 15:54:46'),(20,'Martin Wheeler','martinwheeler@yahoo.com','$2b$10$jf/sFQZ0LxaE1mQXneCEEONqsVsHHkKVtN69Lc3Thqq4UVTtVM6Ri','3159837965','8874 Balistreri Flat Suite 521 ','Masculino','User','masculino.jpg','vurrqrfb6381gnshelgc',NULL,'2023-01-28 15:55:34','2023-01-28 15:56:02'),(21,'Admin','admin@pegasustech.com','$2b$10$jf/sFQZ0LxaE1mQXneCEEONqsVsHHkKVtN69Lc3Thqq4UVTtVM6Ri','','Sin Definir','Otro','Admin','defaultUserImage.png',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-30 16:24:16
