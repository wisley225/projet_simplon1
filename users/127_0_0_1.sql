-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 28 fév. 2025 à 22:52
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `commerce`
--
CREATE DATABASE IF NOT EXISTS `commerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `commerce`;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address_livraison` varchar(255) NOT NULL,
  `total_price` int NOT NULL,
  `payement_method` enum('carte','mobile_money','espèces') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'carte',
  `option_livraison` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `payment_status` enum('en attente','payé','échoué') DEFAULT 'en attente',
  `order_status` enum('en cours','expedie','livre','annuler') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'en cours',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `user_id`, `address_livraison`, `total_price`, `payement_method`, `option_livraison`, `payment_status`, `order_status`, `created_at`, `updated_at`) VALUES
(98, 37, 'marcory residentielle', 4, 'mobile_money', 'standard', 'en attente', 'annuler', '2025-02-18 14:45:56', '2025-02-25 09:54:31'),
(97, 37, 'marcory residentielle', 200, 'carte', 'express', 'en attente', 'annuler', '2025-02-18 09:43:45', '2025-02-25 10:23:24'),
(102, 44, 'marcory residentielle', 350, '', 'express', 'en attente', 'en cours', '2025-02-25 09:53:11', '2025-02-25 09:53:11'),
(99, 37, 'marcory residentielle', 400, '', 'express', 'en attente', 'livre', '2025-02-24 13:21:52', '2025-02-24 13:22:42'),
(100, 37, 'marcory residentielle', 400, '', 'standard', 'en attente', 'livre', '2025-02-25 02:07:54', '2025-02-25 09:53:52'),
(101, 37, 'marcory residentielle', 20, '', 'standard', 'en attente', 'en cours', '2025-02-25 02:10:36', '2025-02-25 02:10:36');

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit`
--

DROP TABLE IF EXISTS `commande_produit`;
CREATE TABLE IF NOT EXISTS `commande_produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `produit_id` int NOT NULL,
  `quantite` int NOT NULL,
  `prix_produit` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commande_id` (`commande_id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande_produit`
--

INSERT INTO `commande_produit` (`id`, `commande_id`, `produit_id`, `quantite`, `prix_produit`) VALUES
(62, 99, 49, 1, 300),
(61, 98, 51, 1, 200),
(60, 98, 55, 1, 4),
(59, 97, 51, 1, 200),
(58, 96, 52, 1, 10),
(57, 96, 54, 1, 5),
(56, 95, 54, 1, 5),
(55, 95, 52, 1, 10),
(54, 95, 55, 1, 4),
(53, 94, 49, 1, 210),
(52, 94, 51, 1, 200),
(51, 93, 52, 1, 10),
(50, 92, 54, 1, 5),
(49, 92, 49, 1, 210),
(48, 91, 54, 1, 5),
(47, 91, 49, 1, 210),
(46, 90, 49, 1, 210),
(45, 90, 51, 1, 200),
(44, 89, 49, 1, 210),
(43, 88, 49, 1, 210),
(63, 99, 97, 1, 400),
(64, 99, 55, 1, 4),
(65, 99, 56, 1, 2),
(66, 100, 97, 1, 400),
(67, 101, 97, 1, 400),
(68, 101, 99, 1, 50),
(69, 101, 101, 1, 80),
(70, 101, 96, 1, 20),
(71, 102, 104, 1, 5),
(72, 102, 105, 1, 350);

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `produit_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id`, `user_id`, `produit_id`, `quantity`) VALUES
(57, 37, 97, 1),
(58, 37, 99, 1),
(44, 40, 54, 1),
(43, 40, 52, 1),
(59, 37, 101, 4),
(60, 37, 96, 1),
(63, 44, 104, 1),
(64, 44, 105, 1);

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `prix` int NOT NULL,
  `stock` int NOT NULL,
  `categories` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `name`, `description`, `prix`, `stock`, `categories`, `image_url`, `created_at`) VALUES
(49, 'casque-audio', 'ce propuit est le meilleure sur le marcher ', 300, 120, 'electronique', 'casque_rose', '0000-00-00 00:00:00'),
(51, 'chausure aire force', 'soit flex', 200, 500, 'electronique', 'chaussure_remove', '0000-00-00 00:00:00'),
(54, 'habit fait en laine', '', 5, 120, 'vetement', 'habit', '0000-00-00 00:00:00'),
(55, 'vetement_bb', 'bon pour les bebes', 4, 56, 'vetement', 'vetement-bebe', '0000-00-00 00:00:00'),
(56, 'lego', '', 2, 120, 'jouets', 'jouet1', '0000-00-00 00:00:00'),
(97, 'iphone16 pro', 'Trend Product Translucent Magnetic Safe Cover Case for Iphones 16 15 14 13 12 11 Pro Max Plus Mobile Accessories Charging Cell', 400, 200, 'electronique', 'telephone1', '0000-00-00 00:00:00'),
(99, 'jogging complet', '', 50, 300, 'vetement', 'vetement-femme1', '0000-00-00 00:00:00'),
(101, 'pull bordeaux ', '', 80, 200, 'vetement', 'vetement-femme3', '0000-00-00 00:00:00'),
(102, 'chemise  jean bleu', '', 50, 300, 'vetement', 'vetement-homme2', '0000-00-00 00:00:00'),
(103, 'jogging complet bleu', '', 50, 500, 'vetement', 'vetement-homme3', '0000-00-00 00:00:00'),
(104, 'chapeau', '', 5, 120, 'accessoir', 'chapeau_remove', '0000-00-00 00:00:00'),
(105, 'ecouteur-bluetooth', '', 350, 10, 'electronique', 'ecouteur-sans-file', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantite` int NOT NULL,
  `total_prix` decimal(10,2) NOT NULL,
  `vente_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `save_product`
--

DROP TABLE IF EXISTS `save_product`;
CREATE TABLE IF NOT EXISTS `save_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `produit_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'client',
  `create_at` datetime NOT NULL,
  `password_gen` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `fullname`, `address`, `email`, `password`, `role`, `create_at`, `password_gen`) VALUES
(37, 'guei lewis', 'abidjan', 'lewisguei67@gmail.com', '$2y$10$8vEpMxnbqsq3TN/BzmTVVu2T7d.P3vMT76yoUgJxhppkUoErwDFyK', 'admin', '2025-02-13 12:47:48', NULL),
(43, 'henri', 'bouake', 'Bessalel.guei@uvci.edu.ci', '$2y$10$NnLLzgDuuae7tOYXlXDc.em0XEyidfr7E/wAEZrtl6O1KLLWwGFca', 'client', '2025-02-25 08:34:35', NULL),
(45, 'kaman anold', 'bouake', 'kamanchrist@gmail.com', '$2y$10$ZkpjUDrywr1nNmBwSXv/HuHnm7xurKSm8h2NZuTfMBetLxL51oniu', 'client', '2025-02-25 16:50:18', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
