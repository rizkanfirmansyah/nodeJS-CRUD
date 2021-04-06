-- --------------------------------------------------------
-- Host:                         localhost
-- Versi server:                 5.7.24 - MySQL Community Server (GPL)
-- OS Server:                    Win64
-- HeidiSQL Versi:               10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- membuang struktur untuk table crud_nodejs.mahasiswa
CREATE TABLE IF NOT EXISTS `mahasiswa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `alamat` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11010010 DEFAULT CHARSET=latin1;

-- Membuang data untuk tabel crud_nodejs.mahasiswa: ~9 rows (lebih kurang)
/*!40000 ALTER TABLE `mahasiswa` DISABLE KEYS */;
INSERT INTO `mahasiswa` (`id`, `nama`, `alamat`) VALUES
	(11010001, 'Rizkan Aprianda Firmansyah', 'Bandung'),
	(11010002, 'Muhammad Fajri Zulfa ', 'Padang'),
	(11010003, 'Hasan Basri', 'Medan\r\n'),
	(11010004, 'Rifki Arya Nugraha', 'Cirebon'),
	(11010005, 'Herdian Nuryansyah', 'Jakarta'),
	(11010006, 'Rafly Muhammad Gibran', 'Banten'),
	(11010007, 'Wina Septia Wahyuni', 'Pangandaran'),
	(11010008, 'Alvi Livza Fauziah', 'Garut'),
	(11010009, 'Elsa Zahra Salsabilla', 'Tasikmalaya');
/*!40000 ALTER TABLE `mahasiswa` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
