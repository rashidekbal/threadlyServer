-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2025 at 05:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gpgram`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment_likes`
--

CREATE TABLE `comment_likes` (
  `comment_like_id` int(11) NOT NULL,
  `userid` varchar(250) NOT NULL,
  `commentid` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_likes`
--

INSERT INTO `comment_likes` (`comment_like_id`, `userid`, `commentid`, `createdAt`) VALUES
(70, 'Mysterious_being', 577, '2025-07-26 08:10:02'),
(71, 'Mysterious_being', 576, '2025-07-26 08:10:02'),
(72, 'Mysterious_being', 574, '2025-07-26 08:10:03'),
(73, 'Mysterious_being', 575, '2025-07-26 08:10:03'),
(74, 'Mysterious_being', 572, '2025-07-26 08:10:05'),
(75, 'Mysterious_being', 573, '2025-07-26 08:10:05'),
(76, 'Mysterious_being', 571, '2025-07-26 08:10:05'),
(77, 'Mysterious_being', 569, '2025-07-26 08:10:06'),
(78, 'Mysterious_being', 570, '2025-07-26 08:10:07'),
(79, 'Mysterious_being', 568, '2025-07-26 08:10:08'),
(80, 'Mysterious_being', 567, '2025-07-26 08:10:08'),
(81, 'Mysterious_being', 566, '2025-07-26 08:10:11'),
(82, 'Mysterious_being', 564, '2025-07-26 08:10:13'),
(83, 'Mysterious_being', 565, '2025-07-26 08:10:13'),
(84, 'Mysterious_being', 563, '2025-07-26 08:10:13'),
(85, 'Mysterious_being', 562, '2025-07-26 08:10:15'),
(86, 'Mysterious_being', 561, '2025-07-26 08:10:15'),
(87, 'Mysterious_being', 560, '2025-07-26 08:10:16'),
(88, 'Mysterious_being', 559, '2025-07-26 08:10:17'),
(89, 'Mysterious_being', 557, '2025-07-26 08:10:18'),
(90, 'Mysterious_being', 558, '2025-07-26 08:10:19'),
(91, 'Mysterious_being', 556, '2025-07-26 08:10:20'),
(92, 'Mysterious_being', 555, '2025-07-26 08:10:20'),
(93, 'Mysterious_being', 814, '2025-07-26 08:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followid` int(11) NOT NULL,
  `followerid` varchar(250) NOT NULL,
  `followingid` varchar(250) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followid`, `followerid`, `followingid`, `createdAt`) VALUES
(41, 'Mysterious_being', 'anothermia', '2025-06-21 14:07:20'),
(45, 'Mysterious_being', 'kaluadon', '2025-07-09 11:30:23'),
(46, 'Rashid1754204756714', 'kaluadon', '2025-08-03 13:17:59'),
(47, 'Rashid1754204756714', 'Mysterious_being', '2025-08-03 13:18:15'),
(48, 'Mysterious_being', 'Rashid1754204756714', '2025-08-03 13:18:41'),
(49, 'kaluadon', 'kaluadon', '2025-08-20 17:18:29'),
(50, 'kaluadon', 'Mysterious_being', '2025-08-20 17:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `imagepost`
--

CREATE TABLE `imagepost` (
  `postid` int(11) NOT NULL,
  `userid` varchar(250) NOT NULL,
  `imageurl` text NOT NULL,
  `caption` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `type` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `imagepost`
--

INSERT INTO `imagepost` (`postid`, `userid`, `imageurl`, `caption`, `created_at`, `type`) VALUES
(34, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753171470/o0ou97qkfthyf9txhd9f.mp4', 'ai 😂🤣', '2025-07-22 13:34:30', 'video'),
(36, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1753172717/yaevdkjs6hwdvty9rqgf.webp', 'developer saheb', '2025-07-22 13:55:17', 'image'),
(37, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753172898/bq36htdvl28gxjaetre1.mp4', 'dunia ka sach', '2025-07-22 13:58:19', 'video'),
(38, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753199740/rvgvvzijz6xcrkyot8oy.mp4', 'beautiful naath sarif', '2025-07-22 21:25:41', 'video'),
(39, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753238246/dctoqtnxsredm1mzew8d.mp4', 'kya baat hai waah', '2025-07-23 08:07:26', 'video'),
(40, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753239733/qljd8vf1zys3t8hgbzk4.mp4', 'puri tiyari hai', '2025-07-23 08:32:13', 'video'),
(43, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753254833/lrapdhdxqtvqcahr5y7n.mp4', 'ab hogi bakaiti full on 😜😂', '2025-07-23 12:43:53', 'video'),
(44, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753255381/in71smkf1szr7z5tby62.mp4', 'your phone is linging', '2025-07-23 12:53:01', 'video'),
(45, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753258565/wwkzcd3efd26fnfnzctw.mp4', 'English speaking is a rice plate eating 😂', '2025-07-23 13:46:05', 'video'),
(46, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753259286/qlehliesjjseopeuiqoj.mp4', 'mai block karungi 😂😂', '2025-07-23 13:58:05', 'video'),
(47, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753259466/m2z0kl1r2wwpmtwvayv8.mp4', '🤣🤣🤣🤣🤣', '2025-07-23 14:01:06', 'video'),
(49, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753259612/it9oykb0gxckm1jyowln.mp4', 'ego', '2025-07-23 14:03:32', 'video'),
(50, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753259730/i21nqazq8ongrv2p9sn6.mp4', 'ek baar dila de', '2025-07-23 14:05:30', 'video'),
(51, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753260160/nnby0wbqu6fkt9v70vvz.mp4', 'the reality', '2025-07-23 14:12:40', 'video'),
(52, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753260270/gggmmj8ecrm9gammtvix.mp4', NULL, '2025-07-23 14:14:30', 'video'),
(53, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1753295942/prnykx9harlpfj5fmxfd.jpg', '💀', '2025-07-24 00:09:03', 'image'),
(54, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753296021/ywz3pacoq9oq12u0uxhx.mp4', 'me and my friends 😂🤣', '2025-07-24 00:10:22', 'video'),
(55, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753296405/vpdtpscpfppjh3xskrqm.mp4', 'mujhe mat dikhaya karo', '2025-07-24 00:16:46', 'video'),
(56, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753296767/tjw084a4iivieh71ykzr.mp4', 'when your dreams are crushed by your responsibility 🥺🥺', '2025-07-24 00:22:48', 'video'),
(57, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1753297013/akylixtv3aqrsnnzhph6.jpg', 'momos', '2025-07-24 00:26:54', 'image'),
(58, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753297199/erjyzj85uglju0nop5ia.mp4', NULL, '2025-07-24 00:30:01', 'video'),
(59, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753297296/bmqmqtw9dmujx40vpqod.mp4', 'bat karne aana chahiyea', '2025-07-24 00:31:38', 'video'),
(60, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753297446/a9amdl5y4e9i2phc2ou6.mp4', 'true words', '2025-07-24 00:34:07', 'video'),
(61, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753299096/olefckunt1ap9ctmuvq8.mp4', '😂😂😂🤣', '2025-07-24 01:01:37', 'video'),
(62, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753299657/fjs4tbhxcbn4fk9d0sgf.mp4', NULL, '2025-07-24 01:10:58', 'video'),
(64, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753325634/hsreqzi3eruuxf51u6m4.mp4', 'i didnt', '2025-07-24 08:23:55', 'video'),
(65, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753326109/vdoo7hdfp9flpej6ezbo.mp4', 'rel diya jaega', '2025-07-24 08:31:50', 'video'),
(66, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753344462/eqct2h4kmkg7p5ze91i1.mp4', 'she wasn\'t expecting a real camera 😂', '2025-07-24 13:37:44', 'video'),
(67, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753344494/edeh6euc3gkbuwued6u1.mp4', 'that\'s why you don\'t wear baggy while horse riding', '2025-07-24 13:38:16', 'video'),
(68, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753344602/ogxlsx5t75f9qvqhqkzm.mp4', 'cats song🤣', '2025-07-24 13:40:04', 'video'),
(69, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753344844/wqtiynekfko9b5kzxjn5.mp4', 'Random shorts', '2025-07-24 13:44:05', 'video'),
(70, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753345016/b03nw8tuw7lrlfkxlhpr.mp4', NULL, '2025-07-24 13:46:58', 'video'),
(71, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753345195/o9zwts1myuk9mw6w87i5.mp4', '💀💀', '2025-07-24 13:49:57', 'video'),
(72, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753345482/cvtdqfctzbwswgao0jx2.mp4', NULL, '2025-07-24 13:54:44', 'video'),
(73, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753345724/g04o154ft1irpitp4u2w.mp4', NULL, '2025-07-24 13:58:46', 'video'),
(74, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753345728/gzw7vjbenes1mtigfbkt.mp4', NULL, '2025-07-24 13:58:50', 'video'),
(75, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753345733/rubmzm2kblylo8w88wpj.mp4', NULL, '2025-07-24 13:58:54', 'video'),
(76, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753346772/k96nifdlilpu6psgtaor.mp4', NULL, '2025-07-24 14:16:14', 'video'),
(77, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753347152/c4y9r6kukuesyldravdr.mp4', NULL, '2025-07-24 14:22:33', 'video'),
(78, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753347185/gxrxinluorcm70wjvkr7.mp4', NULL, '2025-07-24 14:23:07', 'video'),
(79, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753347232/ilzzyxjgqyocblaji0g1.mp4', NULL, '2025-07-24 14:23:54', 'video'),
(80, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348338/fz9zyox7cyxmvh9jvxew.mp4', 'disney princess 💗', '2025-07-24 14:42:20', 'video'),
(81, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348440/fmwystqz602nrfdbx9rv.mp4', 'wakima gabbi beautiful', '2025-07-24 14:44:01', 'video'),
(82, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348445/lj5tk3lretkesaqtdn5k.mp4', 'beautiful 😻', '2025-07-24 14:44:07', 'video'),
(83, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348461/uiwj3eyqdir0kegvha7q.mp4', NULL, '2025-07-24 14:44:22', 'video'),
(84, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348531/ubi76xdohvxrmzhj53ua.mp4', 'angori bhabhi comedy', '2025-07-24 14:45:33', 'video'),
(85, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348702/eti5vrn6e5q4vwh4xvq7.mp4', 'bihar is not for beginners 😅', '2025-07-24 14:48:24', 'video'),
(86, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348794/qcdkh1robzlksl2vvbvi.mp4', NULL, '2025-07-24 14:49:56', 'video'),
(87, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348809/osavnkqh8ghmdu1s3nb8.mp4', NULL, '2025-07-24 14:50:11', 'video'),
(88, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348821/cfc5v2ljm840hgfatseo.mp4', NULL, '2025-07-24 14:50:23', 'video'),
(89, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348835/woezwhv1zlf2d2ryi1ne.mp4', NULL, '2025-07-24 14:50:36', 'video'),
(90, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348835/gfafxwgfx6ylxtibooe7.mp4', NULL, '2025-07-24 14:50:37', 'video'),
(91, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348836/uth8gpr6k2rmhfb67klu.mp4', NULL, '2025-07-24 14:50:37', 'video'),
(92, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348836/r2t5m4stoi8obo4i72yl.mp4', NULL, '2025-07-24 14:50:37', 'video'),
(93, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348855/bnzmexeghajarbncanqd.mp4', NULL, '2025-07-24 14:50:57', 'video'),
(94, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348857/rkzxj3u8qh8no0aj48eq.mp4', NULL, '2025-07-24 14:50:59', 'video'),
(95, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348878/hlb0zz7aby8jyxzdnznd.mp4', NULL, '2025-07-24 14:51:20', 'video'),
(96, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348883/brnprkkxldzoxdxg3itg.mp4', 'jannat', '2025-07-24 14:51:24', 'video'),
(97, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348893/vfyusr8t6gtapiny6x3d.mp4', NULL, '2025-07-24 14:51:35', 'video'),
(98, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348918/bzimarnpfetmq4j7oyuw.mp4', NULL, '2025-07-24 14:52:00', 'video'),
(99, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348920/kon2ureq1frcds2vawg5.mp4', NULL, '2025-07-24 14:52:01', 'video'),
(100, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348921/wrlweqinoeb6da5c3vac.mp4', NULL, '2025-07-24 14:52:03', 'video'),
(101, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348932/f25jtfsk50zoschfscfy.mp4', NULL, '2025-07-24 14:52:14', 'video'),
(102, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348948/o46npqrqs7rwomqofaw0.mp4', NULL, '2025-07-24 14:52:30', 'video'),
(103, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348951/gdu9rsj8fnrpxhxjosfc.mp4', NULL, '2025-07-24 14:52:32', 'video'),
(104, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348953/gkg6ilmpj4bq6klbohoy.mp4', NULL, '2025-07-24 14:52:35', 'video'),
(105, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348968/qqumhz1vrycqokspzbzi.mp4', NULL, '2025-07-24 14:52:49', 'video'),
(106, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348970/jvijuzvs9ktoilqbozjx.mp4', NULL, '2025-07-24 14:52:52', 'video'),
(107, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348978/nhi1hdb66ylndin28co8.mp4', NULL, '2025-07-24 14:53:00', 'video'),
(108, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348984/ahpnbknd0zuiwt2e2hwa.mp4', NULL, '2025-07-24 14:53:06', 'video'),
(109, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348987/glotgq3nki4uxunhtnb8.mp4', NULL, '2025-07-24 14:53:09', 'video'),
(110, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753348994/nmqatwawrh8nkdb1iurv.mp4', NULL, '2025-07-24 14:53:16', 'video'),
(111, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753349001/ca6cv3yikh7uxlgzavxw.mp4', NULL, '2025-07-24 14:53:23', 'video'),
(112, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753349002/pgljdmflgz5fitxm20nm.mp4', NULL, '2025-07-24 14:53:24', 'video'),
(113, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753349010/ytc4bmfpckotps6ywhxz.mp4', NULL, '2025-07-24 14:53:32', 'video'),
(114, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753349012/xlewvmuhjcwwlz8duwur.mp4', NULL, '2025-07-24 14:53:33', 'video'),
(115, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753349021/dowdybizr3ktdtzjanzh.mp4', NULL, '2025-07-24 14:53:43', 'video'),
(117, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753349033/bjxgvmssmwqfdzjts3or.mp4', NULL, '2025-07-24 14:53:56', 'video'),
(118, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753948832/sm07choo6r44jnufxvdk.mp4', 'ch** do ma dunia ki badmash ban kar', '2025-07-31 13:30:34', 'video'),
(120, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1754401624/x7pb4djgs9zgwgz7i7nh.mp4', NULL, '2025-08-05 19:17:08', 'video'),
(121, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754564143/netsuwyjfooacmztbeop.jpg', 'party ho Rahi khatarnak', '2025-08-07 16:25:46', 'image'),
(122, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1755869573/zoobitqzoydr2ftko3dx.mp4', '♥️♥️♥️♥️', '2025-08-22 19:02:56', 'video');

-- --------------------------------------------------------

--
-- Table structure for table `otpmodel`
--

CREATE TABLE `otpmodel` (
  `phone_email` varchar(255) NOT NULL,
  `otp` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `flag` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otpmodel`
--

INSERT INTO `otpmodel` (`phone_email`, `otp`, `createdAt`, `flag`) VALUES
('8102747798', 209599, '2025-06-10 19:52:49', 0),
('8102747798', 327682, '2025-06-10 19:53:00', 0),
('8102747798', 201763, '2025-06-19 22:03:40', 0),
('9123481953', 999511, '2025-06-19 23:35:20', 0),
('9123481953', 365196, '2025-06-19 23:40:47', 0),
('rtechdevlopment123gmail.com', 604421, '2025-06-22 11:42:01', 0),
('rtechdevlopment123@gmail.com', 561796, '2025-06-22 13:11:27', 0),
('rtechdevlopment13@gmail.com', 395978, '2025-06-22 13:12:02', 0),
('rtechdevlopment123@gmail.com', 382119, '2025-06-22 13:23:01', 0),
('rtechdevlopment123@gmail.com', 624148, '2025-06-22 15:17:52', 0),
('rtechdevlopment123@gmail.com', 730938, '2025-06-22 15:47:40', 0),
('9123481953', 755174, '2025-06-22 16:12:33', 0),
('9123481953', 481501, '2025-06-22 16:13:20', 0),
('9123481953', 969109, '2025-06-22 16:15:25', 0),
('9123481953', 277313, '2025-06-22 16:15:50', 0),
('9123481953', 376062, '2025-06-22 16:17:07', 0),
('rtechdevlopment123@gmail.com', 558764, '2025-06-22 16:17:34', 0),
('9123481953', 486501, '2025-06-22 16:22:18', 0),
('9123481953', 203435, '2025-07-14 20:41:21', 0),
('9123481953', 726852, '2025-07-14 20:42:01', 0),
('9123481953', 659736, '2025-07-14 20:43:31', 0),
('9123481953', 825053, '2025-07-14 20:45:18', 0);

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `commentid` int(11) NOT NULL,
  `userid` varchar(250) NOT NULL,
  `postid` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_comments`
--

INSERT INTO `post_comments` (`commentid`, `userid`, `postid`, `comment_text`, `createdAt`) VALUES
(73, 'kaluadon', 34, 'wow nice', '2025-07-23 09:05:38'),
(75, 'kaluadon', 40, 'it keeps breaking', '2025-07-23 09:08:32'),
(76, 'kaluadon', 40, 'brothers in amra', '2025-07-23 09:09:50'),
(77, 'kaluadon', 39, 'what the fuck', '2025-07-23 09:10:04'),
(78, 'kaluadon', 40, 'why not working ', '2025-07-23 09:10:22'),
(79, 'kaluadon', 38, 'is this working ', '2025-07-23 09:10:32'),
(80, 'kaluadon', 44, 'bhag re mc', '2025-07-23 13:11:55'),
(81, 'kaluadon', 39, 'bahot badhiya', '2025-07-23 23:47:54'),
(82, 'kaluadon', 52, 'first comment', '2025-07-24 00:06:51'),
(83, 'kaluadon', 59, 'bhai ke to mauj hai', '2025-07-24 00:35:50'),
(84, 'kaluadon', 57, 'wow looking nice', '2025-07-24 00:47:04'),
(85, 'kaluadon', 57, 'looks great', '2025-07-24 00:47:17'),
(86, 'Mysterious_being', 61, '🙂🤣🤣🤣', '2025-07-24 08:24:51'),
(87, 'Mysterious_being', 75, '🤣', '2025-07-24 14:00:47'),
(88, 'Mysterious_being', 74, '🤣', '2025-07-24 14:00:54'),
(89, 'Mysterious_being', 73, '💗💗💗', '2025-07-24 14:01:10'),
(90, 'Mysterious_being', 72, '💗💗💗💗', '2025-07-24 14:01:19'),
(91, 'Mysterious_being', 71, '😮😮', '2025-07-24 14:01:53'),
(92, 'Mysterious_being', 52, '💀', '2025-07-24 14:07:03'),
(93, 'Mysterious_being', 47, '🤔', '2025-07-24 14:08:28'),
(94, 'Mysterious_being', 46, '🤣', '2025-07-24 14:08:47'),
(95, 'Mysterious_being', 76, '💗💗💗', '2025-07-24 14:17:35'),
(96, 'kaluadon', 76, 'bgbngfnfgngf', '2025-07-25 23:30:17'),
(97, 'kaluadon', 34, 'new', '2025-07-25 23:38:42'),
(178, 'kaluadon', 34, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:03:43'),
(179, 'kaluadon', 34, 'Bro aisa content chahiye roz!', '2025-07-26 08:03:43'),
(180, 'kaluadon', 34, 'Matlab next level stuff 💯', '2025-07-26 08:03:43'),
(181, 'kaluadon', 34, 'Kya editing hai boss 😮', '2025-07-26 08:03:43'),
(182, 'kaluadon', 34, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:03:43'),
(183, 'kaluadon', 34, 'This deserves way more views 📈', '2025-07-26 08:03:43'),
(184, 'kaluadon', 34, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:03:43'),
(185, 'kaluadon', 34, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:03:43'),
(186, 'kaluadon', 34, 'Back to back banger posts 🔥', '2025-07-26 08:03:43'),
(187, 'kaluadon', 34, 'Kitna mast transition tha!', '2025-07-26 08:03:43'),
(188, 'kaluadon', 34, 'Bhai tu OP hai 🤌', '2025-07-26 08:03:43'),
(189, 'kaluadon', 34, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:03:43'),
(190, 'kaluadon', 34, 'Music aur timing dono on point 💯', '2025-07-26 08:03:43'),
(191, 'kaluadon', 34, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:03:43'),
(192, 'kaluadon', 34, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:03:43'),
(193, 'kaluadon', 34, 'Caption bhi solid tha 🔥', '2025-07-26 08:03:43'),
(194, 'kaluadon', 34, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:03:43'),
(195, 'kaluadon', 34, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:03:43'),
(196, 'kaluadon', 34, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:03:43'),
(197, 'kaluadon', 34, 'Meme game strong hai 😂🔥', '2025-07-26 08:03:43'),
(198, 'kaluadon', 34, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:03:43'),
(199, 'kaluadon', 34, 'Bhai aise hi content daalte raho!', '2025-07-26 08:03:43'),
(200, 'kaluadon', 34, 'Mood badhiya kar diya isne!', '2025-07-26 08:03:43'),
(201, 'kaluadon', 34, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:03:43'),
(202, 'kaluadon', 34, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:03:43'),
(203, 'kaluadon', 34, 'Comment karna zaroori tha 😍', '2025-07-26 08:03:43'),
(204, 'kaluadon', 34, 'Dekhte hi like kar diya instantly', '2025-07-26 08:03:43'),
(205, 'kaluadon', 34, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:03:43'),
(206, 'kaluadon', 34, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:03:43'),
(207, 'kaluadon', 34, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:03:43'),
(208, 'kaluadon', 34, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:03:43'),
(209, 'kaluadon', 34, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:03:43'),
(210, 'kaluadon', 34, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:03:43'),
(211, 'kaluadon', 34, 'You nailed it boss 💪', '2025-07-26 08:03:43'),
(212, 'kaluadon', 34, 'Lit 🔥 from start to end', '2025-07-26 08:03:43'),
(213, 'kaluadon', 34, 'Kya placement hai music ka!', '2025-07-26 08:03:43'),
(214, 'kaluadon', 34, 'You made my day with this post ❤️', '2025-07-26 08:03:43'),
(215, 'kaluadon', 34, 'Kya story-telling bhai 💯', '2025-07-26 08:03:43'),
(216, 'kaluadon', 34, 'Simple and powerful!', '2025-07-26 08:03:43'),
(217, 'kaluadon', 34, 'Aankhon ka sukoon 😍', '2025-07-26 08:03:43'),
(218, 'kaluadon', 34, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:03:43'),
(219, 'kaluadon', 34, 'Apna kamal dikhaya tune', '2025-07-26 08:03:43'),
(220, 'kaluadon', 34, 'Quality content like always!', '2025-07-26 08:03:43'),
(221, 'kaluadon', 34, 'Too smooth bro 😎', '2025-07-26 08:03:43'),
(222, 'kaluadon', 34, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:03:43'),
(223, 'kaluadon', 34, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:03:43'),
(224, 'kaluadon', 34, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:03:43'),
(225, 'kaluadon', 34, 'Har post mein improvement dikhta hai!', '2025-07-26 08:03:43'),
(226, 'kaluadon', 34, 'Yeh post rewind pe chala diya!', '2025-07-26 08:03:43'),
(227, 'kaluadon', 34, 'Bhai full marks tujhe 🙌', '2025-07-26 08:03:43'),
(228, 'kaluadon', 34, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:03:43'),
(229, 'kaluadon', 34, 'Kya background pick kiya hai!', '2025-07-26 08:03:43'),
(230, 'kaluadon', 34, 'Hook point toh lajawab hai', '2025-07-26 08:03:43'),
(231, 'kaluadon', 34, 'Aise hi banaate rehna bhai', '2025-07-26 08:03:43'),
(232, 'kaluadon', 34, 'Kya humour add kiya hai 🤣', '2025-07-26 08:03:43'),
(233, 'kaluadon', 34, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:03:43'),
(234, 'kaluadon', 34, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:03:43'),
(235, 'kaluadon', 34, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:03:43'),
(236, 'kaluadon', 34, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:03:43'),
(237, 'kaluadon', 34, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:03:43'),
(238, 'kaluadon', 34, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:03:43'),
(239, 'kaluadon', 34, 'Sirf ek word – EPIC!', '2025-07-26 08:03:43'),
(240, 'kaluadon', 34, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:03:43'),
(241, 'kaluadon', 34, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:03:43'),
(242, 'kaluadon', 34, 'Jabardast storytelling!', '2025-07-26 08:03:43'),
(243, 'kaluadon', 34, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:03:43'),
(244, 'kaluadon', 34, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:03:43'),
(245, 'kaluadon', 34, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:03:43'),
(246, 'kaluadon', 34, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:03:43'),
(247, 'kaluadon', 34, 'Next kab aayega bro?', '2025-07-26 08:03:43'),
(248, 'kaluadon', 34, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:03:43'),
(249, 'kaluadon', 34, 'Aaj ka sabse best content 🥇', '2025-07-26 08:03:43'),
(250, 'kaluadon', 34, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:03:43'),
(251, 'kaluadon', 34, 'Teri vibe alag hi level pe hai', '2025-07-26 08:03:43'),
(252, 'kaluadon', 34, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:03:43'),
(253, 'kaluadon', 34, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:03:43'),
(254, 'kaluadon', 34, 'Sabko tag kar diya bro 😎', '2025-07-26 08:03:43'),
(255, 'kaluadon', 34, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:03:43'),
(256, 'kaluadon', 34, 'Tu toh artist nikla 💥', '2025-07-26 08:03:43'),
(257, 'kaluadon', 34, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:03:43'),
(338, 'kaluadon', 36, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:04:51'),
(339, 'kaluadon', 36, 'Bro aisa content chahiye roz!', '2025-07-26 08:04:51'),
(340, 'kaluadon', 36, 'Matlab next level stuff 💯', '2025-07-26 08:04:51'),
(341, 'kaluadon', 36, 'Kya editing hai boss 😮', '2025-07-26 08:04:51'),
(342, 'kaluadon', 36, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:04:51'),
(343, 'kaluadon', 36, 'This deserves way more views 📈', '2025-07-26 08:04:51'),
(344, 'kaluadon', 36, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:04:51'),
(345, 'kaluadon', 36, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:04:51'),
(346, 'kaluadon', 36, 'Back to back banger posts 🔥', '2025-07-26 08:04:51'),
(347, 'kaluadon', 36, 'Kitna mast transition tha!', '2025-07-26 08:04:51'),
(348, 'kaluadon', 36, 'Bhai tu OP hai 🤌', '2025-07-26 08:04:51'),
(349, 'kaluadon', 36, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:04:51'),
(350, 'kaluadon', 36, 'Music aur timing dono on point 💯', '2025-07-26 08:04:51'),
(351, 'kaluadon', 36, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:04:51'),
(352, 'kaluadon', 36, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:04:51'),
(353, 'kaluadon', 36, 'Caption bhi solid tha 🔥', '2025-07-26 08:04:51'),
(354, 'kaluadon', 36, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:04:51'),
(355, 'kaluadon', 36, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:04:51'),
(356, 'kaluadon', 36, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:04:51'),
(357, 'kaluadon', 36, 'Meme game strong hai 😂🔥', '2025-07-26 08:04:51'),
(358, 'kaluadon', 36, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:04:51'),
(359, 'kaluadon', 36, 'Bhai aise hi content daalte raho!', '2025-07-26 08:04:51'),
(360, 'kaluadon', 36, 'Mood badhiya kar diya isne!', '2025-07-26 08:04:51'),
(361, 'kaluadon', 36, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:04:51'),
(362, 'kaluadon', 36, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:04:51'),
(363, 'kaluadon', 36, 'Comment karna zaroori tha 😍', '2025-07-26 08:04:51'),
(364, 'kaluadon', 36, 'Dekhte hi like kar diya instantly', '2025-07-26 08:04:51'),
(365, 'kaluadon', 36, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:04:51'),
(366, 'kaluadon', 36, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:04:51'),
(367, 'kaluadon', 36, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:04:51'),
(368, 'kaluadon', 36, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:04:51'),
(369, 'kaluadon', 36, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:04:51'),
(370, 'kaluadon', 36, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:04:51'),
(371, 'kaluadon', 36, 'You nailed it boss 💪', '2025-07-26 08:04:51'),
(372, 'kaluadon', 36, 'Lit 🔥 from start to end', '2025-07-26 08:04:51'),
(373, 'kaluadon', 36, 'Kya placement hai music ka!', '2025-07-26 08:04:51'),
(374, 'kaluadon', 36, 'You made my day with this post ❤️', '2025-07-26 08:04:51'),
(375, 'kaluadon', 36, 'Kya story-telling bhai 💯', '2025-07-26 08:04:51'),
(376, 'kaluadon', 36, 'Simple and powerful!', '2025-07-26 08:04:51'),
(377, 'kaluadon', 36, 'Aankhon ka sukoon 😍', '2025-07-26 08:04:51'),
(378, 'kaluadon', 36, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:04:51'),
(379, 'kaluadon', 36, 'Apna kamal dikhaya tune', '2025-07-26 08:04:51'),
(380, 'kaluadon', 36, 'Quality content like always!', '2025-07-26 08:04:51'),
(381, 'kaluadon', 36, 'Too smooth bro 😎', '2025-07-26 08:04:51'),
(382, 'kaluadon', 36, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:04:51'),
(383, 'kaluadon', 36, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:04:51'),
(384, 'kaluadon', 36, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:04:51'),
(385, 'kaluadon', 36, 'Har post mein improvement dikhta hai!', '2025-07-26 08:04:51'),
(386, 'kaluadon', 36, 'Yeh post rewind pe chala diya!', '2025-07-26 08:04:51'),
(387, 'kaluadon', 36, 'Bhai full marks tujhe 🙌', '2025-07-26 08:04:51'),
(388, 'kaluadon', 36, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:04:51'),
(389, 'kaluadon', 36, 'Kya background pick kiya hai!', '2025-07-26 08:04:51'),
(390, 'kaluadon', 36, 'Hook point toh lajawab hai', '2025-07-26 08:04:51'),
(391, 'kaluadon', 36, 'Aise hi banaate rehna bhai', '2025-07-26 08:04:51'),
(392, 'kaluadon', 36, 'Kya humour add kiya hai 🤣', '2025-07-26 08:04:51'),
(393, 'kaluadon', 36, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:04:51'),
(394, 'kaluadon', 36, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:04:51'),
(395, 'kaluadon', 36, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:04:51'),
(396, 'kaluadon', 36, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:04:51'),
(397, 'kaluadon', 36, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:04:51'),
(398, 'kaluadon', 36, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:04:51'),
(399, 'kaluadon', 36, 'Sirf ek word – EPIC!', '2025-07-26 08:04:51'),
(400, 'kaluadon', 36, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:04:51'),
(401, 'kaluadon', 36, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:04:51'),
(402, 'kaluadon', 36, 'Jabardast storytelling!', '2025-07-26 08:04:51'),
(403, 'kaluadon', 36, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:04:51'),
(404, 'kaluadon', 36, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:04:51'),
(405, 'kaluadon', 36, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:04:51'),
(406, 'kaluadon', 36, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:04:51'),
(407, 'kaluadon', 36, 'Next kab aayega bro?', '2025-07-26 08:04:51'),
(408, 'kaluadon', 36, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:04:51'),
(409, 'kaluadon', 36, 'Aaj ka sabse best content 🥇', '2025-07-26 08:04:51'),
(410, 'kaluadon', 36, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:04:51'),
(411, 'kaluadon', 36, 'Teri vibe alag hi level pe hai', '2025-07-26 08:04:51'),
(412, 'kaluadon', 36, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:04:51'),
(413, 'kaluadon', 36, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:04:51'),
(414, 'kaluadon', 36, 'Sabko tag kar diya bro 😎', '2025-07-26 08:04:51'),
(415, 'kaluadon', 36, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:04:51'),
(416, 'kaluadon', 36, 'Tu toh artist nikla 💥', '2025-07-26 08:04:51'),
(417, 'kaluadon', 36, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:04:51'),
(418, 'kaluadon', 36, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:05:02'),
(419, 'kaluadon', 36, 'Bro aisa content chahiye roz!', '2025-07-26 08:05:02'),
(420, 'kaluadon', 36, 'Matlab next level stuff 💯', '2025-07-26 08:05:02'),
(421, 'kaluadon', 36, 'Kya editing hai boss 😮', '2025-07-26 08:05:02'),
(422, 'kaluadon', 36, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:05:02'),
(423, 'kaluadon', 36, 'This deserves way more views 📈', '2025-07-26 08:05:02'),
(424, 'kaluadon', 36, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:05:02'),
(425, 'kaluadon', 36, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:05:02'),
(426, 'kaluadon', 36, 'Back to back banger posts 🔥', '2025-07-26 08:05:02'),
(427, 'kaluadon', 36, 'Kitna mast transition tha!', '2025-07-26 08:05:02'),
(428, 'kaluadon', 36, 'Bhai tu OP hai 🤌', '2025-07-26 08:05:02'),
(429, 'kaluadon', 36, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:05:02'),
(430, 'kaluadon', 36, 'Music aur timing dono on point 💯', '2025-07-26 08:05:02'),
(431, 'kaluadon', 36, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:05:02'),
(432, 'kaluadon', 36, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:05:02'),
(433, 'kaluadon', 36, 'Caption bhi solid tha 🔥', '2025-07-26 08:05:02'),
(434, 'kaluadon', 36, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:05:02'),
(435, 'kaluadon', 36, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:05:02'),
(436, 'kaluadon', 36, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:05:02'),
(437, 'kaluadon', 36, 'Meme game strong hai 😂🔥', '2025-07-26 08:05:02'),
(438, 'kaluadon', 36, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:05:02'),
(439, 'kaluadon', 36, 'Bhai aise hi content daalte raho!', '2025-07-26 08:05:02'),
(440, 'kaluadon', 36, 'Mood badhiya kar diya isne!', '2025-07-26 08:05:02'),
(441, 'kaluadon', 36, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:05:02'),
(442, 'kaluadon', 36, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:05:02'),
(443, 'kaluadon', 36, 'Comment karna zaroori tha 😍', '2025-07-26 08:05:02'),
(444, 'kaluadon', 36, 'Dekhte hi like kar diya instantly', '2025-07-26 08:05:02'),
(445, 'kaluadon', 36, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:05:02'),
(446, 'kaluadon', 36, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:05:02'),
(447, 'kaluadon', 36, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:05:02'),
(448, 'kaluadon', 36, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:05:02'),
(449, 'kaluadon', 36, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:05:02'),
(450, 'kaluadon', 36, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:05:02'),
(451, 'kaluadon', 36, 'You nailed it boss 💪', '2025-07-26 08:05:02'),
(452, 'kaluadon', 36, 'Lit 🔥 from start to end', '2025-07-26 08:05:02'),
(453, 'kaluadon', 36, 'Kya placement hai music ka!', '2025-07-26 08:05:02'),
(454, 'kaluadon', 36, 'You made my day with this post ❤️', '2025-07-26 08:05:02'),
(455, 'kaluadon', 36, 'Kya story-telling bhai 💯', '2025-07-26 08:05:02'),
(456, 'kaluadon', 36, 'Simple and powerful!', '2025-07-26 08:05:02'),
(457, 'kaluadon', 36, 'Aankhon ka sukoon 😍', '2025-07-26 08:05:02'),
(458, 'kaluadon', 36, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:05:02'),
(459, 'kaluadon', 36, 'Apna kamal dikhaya tune', '2025-07-26 08:05:02'),
(460, 'kaluadon', 36, 'Quality content like always!', '2025-07-26 08:05:02'),
(461, 'kaluadon', 36, 'Too smooth bro 😎', '2025-07-26 08:05:02'),
(462, 'kaluadon', 36, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:05:02'),
(463, 'kaluadon', 36, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:05:02'),
(464, 'kaluadon', 36, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:05:02'),
(465, 'kaluadon', 36, 'Har post mein improvement dikhta hai!', '2025-07-26 08:05:02'),
(466, 'kaluadon', 36, 'Yeh post rewind pe chala diya!', '2025-07-26 08:05:02'),
(467, 'kaluadon', 36, 'Bhai full marks tujhe 🙌', '2025-07-26 08:05:02'),
(468, 'kaluadon', 36, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:05:02'),
(469, 'kaluadon', 36, 'Kya background pick kiya hai!', '2025-07-26 08:05:02'),
(470, 'kaluadon', 36, 'Hook point toh lajawab hai', '2025-07-26 08:05:02'),
(471, 'kaluadon', 36, 'Aise hi banaate rehna bhai', '2025-07-26 08:05:02'),
(472, 'kaluadon', 36, 'Kya humour add kiya hai 🤣', '2025-07-26 08:05:02'),
(473, 'kaluadon', 36, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:05:02'),
(474, 'kaluadon', 36, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:05:02'),
(475, 'kaluadon', 36, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:05:02'),
(476, 'kaluadon', 36, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:05:02'),
(477, 'kaluadon', 36, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:05:02'),
(478, 'kaluadon', 36, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:05:02'),
(479, 'kaluadon', 36, 'Sirf ek word – EPIC!', '2025-07-26 08:05:02'),
(480, 'kaluadon', 36, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:05:02'),
(481, 'kaluadon', 36, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:05:02'),
(482, 'kaluadon', 36, 'Jabardast storytelling!', '2025-07-26 08:05:02'),
(483, 'kaluadon', 36, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:05:02'),
(484, 'kaluadon', 36, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:05:02'),
(485, 'kaluadon', 36, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:05:02'),
(486, 'kaluadon', 36, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:05:02'),
(487, 'kaluadon', 36, 'Next kab aayega bro?', '2025-07-26 08:05:02'),
(488, 'kaluadon', 36, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:05:02'),
(489, 'kaluadon', 36, 'Aaj ka sabse best content 🥇', '2025-07-26 08:05:02'),
(490, 'kaluadon', 36, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:05:02'),
(491, 'kaluadon', 36, 'Teri vibe alag hi level pe hai', '2025-07-26 08:05:02'),
(492, 'kaluadon', 36, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:05:02'),
(493, 'kaluadon', 36, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:05:02'),
(494, 'kaluadon', 36, 'Sabko tag kar diya bro 😎', '2025-07-26 08:05:02'),
(495, 'kaluadon', 36, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:05:02'),
(496, 'kaluadon', 36, 'Tu toh artist nikla 💥', '2025-07-26 08:05:02'),
(497, 'kaluadon', 36, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:05:02'),
(498, 'kaluadon', 37, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:05:26'),
(499, 'kaluadon', 37, 'Bro aisa content chahiye roz!', '2025-07-26 08:05:26'),
(500, 'kaluadon', 37, 'Matlab next level stuff 💯', '2025-07-26 08:05:26'),
(501, 'kaluadon', 37, 'Kya editing hai boss 😮', '2025-07-26 08:05:26'),
(502, 'kaluadon', 37, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:05:26'),
(503, 'kaluadon', 37, 'This deserves way more views 📈', '2025-07-26 08:05:26'),
(504, 'kaluadon', 37, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:05:26'),
(505, 'kaluadon', 37, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:05:26'),
(506, 'kaluadon', 37, 'Back to back banger posts 🔥', '2025-07-26 08:05:26'),
(507, 'kaluadon', 37, 'Kitna mast transition tha!', '2025-07-26 08:05:26'),
(508, 'kaluadon', 37, 'Bhai tu OP hai 🤌', '2025-07-26 08:05:26'),
(509, 'kaluadon', 37, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:05:26'),
(510, 'kaluadon', 37, 'Music aur timing dono on point 💯', '2025-07-26 08:05:26'),
(511, 'kaluadon', 37, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:05:26'),
(512, 'kaluadon', 37, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:05:26'),
(513, 'kaluadon', 37, 'Caption bhi solid tha 🔥', '2025-07-26 08:05:26'),
(514, 'kaluadon', 37, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:05:26'),
(515, 'kaluadon', 37, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:05:26'),
(516, 'kaluadon', 37, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:05:26'),
(517, 'kaluadon', 37, 'Meme game strong hai 😂🔥', '2025-07-26 08:05:26'),
(518, 'kaluadon', 37, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:05:26'),
(519, 'kaluadon', 37, 'Bhai aise hi content daalte raho!', '2025-07-26 08:05:26'),
(520, 'kaluadon', 37, 'Mood badhiya kar diya isne!', '2025-07-26 08:05:26'),
(521, 'kaluadon', 37, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:05:26'),
(522, 'kaluadon', 37, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:05:26'),
(523, 'kaluadon', 37, 'Comment karna zaroori tha 😍', '2025-07-26 08:05:26'),
(524, 'kaluadon', 37, 'Dekhte hi like kar diya instantly', '2025-07-26 08:05:26'),
(525, 'kaluadon', 37, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:05:26'),
(526, 'kaluadon', 37, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:05:26'),
(527, 'kaluadon', 37, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:05:26'),
(528, 'kaluadon', 37, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:05:26'),
(529, 'kaluadon', 37, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:05:26'),
(530, 'kaluadon', 37, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:05:26'),
(531, 'kaluadon', 37, 'You nailed it boss 💪', '2025-07-26 08:05:26'),
(532, 'kaluadon', 37, 'Lit 🔥 from start to end', '2025-07-26 08:05:26'),
(533, 'kaluadon', 37, 'Kya placement hai music ka!', '2025-07-26 08:05:26'),
(534, 'kaluadon', 37, 'You made my day with this post ❤️', '2025-07-26 08:05:26'),
(535, 'kaluadon', 37, 'Kya story-telling bhai 💯', '2025-07-26 08:05:26'),
(536, 'kaluadon', 37, 'Simple and powerful!', '2025-07-26 08:05:26'),
(537, 'kaluadon', 37, 'Aankhon ka sukoon 😍', '2025-07-26 08:05:26'),
(538, 'kaluadon', 37, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:05:26'),
(539, 'kaluadon', 37, 'Apna kamal dikhaya tune', '2025-07-26 08:05:26'),
(540, 'kaluadon', 37, 'Quality content like always!', '2025-07-26 08:05:26'),
(541, 'kaluadon', 37, 'Too smooth bro 😎', '2025-07-26 08:05:26'),
(542, 'kaluadon', 37, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:05:26'),
(543, 'kaluadon', 37, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:05:26'),
(544, 'kaluadon', 37, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:05:26'),
(545, 'kaluadon', 37, 'Har post mein improvement dikhta hai!', '2025-07-26 08:05:26'),
(546, 'kaluadon', 37, 'Yeh post rewind pe chala diya!', '2025-07-26 08:05:26'),
(547, 'kaluadon', 37, 'Bhai full marks tujhe 🙌', '2025-07-26 08:05:26'),
(548, 'kaluadon', 37, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:05:26'),
(549, 'kaluadon', 37, 'Kya background pick kiya hai!', '2025-07-26 08:05:26'),
(550, 'kaluadon', 37, 'Hook point toh lajawab hai', '2025-07-26 08:05:26'),
(551, 'kaluadon', 37, 'Aise hi banaate rehna bhai', '2025-07-26 08:05:26'),
(552, 'kaluadon', 37, 'Kya humour add kiya hai 🤣', '2025-07-26 08:05:26'),
(553, 'kaluadon', 37, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:05:26'),
(554, 'kaluadon', 37, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:05:26'),
(555, 'kaluadon', 37, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:05:26'),
(556, 'kaluadon', 37, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:05:26'),
(557, 'kaluadon', 37, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:05:26'),
(558, 'kaluadon', 37, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:05:26'),
(559, 'kaluadon', 37, 'Sirf ek word – EPIC!', '2025-07-26 08:05:26'),
(560, 'kaluadon', 37, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:05:26'),
(561, 'kaluadon', 37, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:05:26'),
(562, 'kaluadon', 37, 'Jabardast storytelling!', '2025-07-26 08:05:26'),
(563, 'kaluadon', 37, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:05:26'),
(564, 'kaluadon', 37, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:05:26'),
(565, 'kaluadon', 37, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:05:26'),
(566, 'kaluadon', 37, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:05:26'),
(567, 'kaluadon', 37, 'Next kab aayega bro?', '2025-07-26 08:05:26'),
(568, 'kaluadon', 37, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:05:26'),
(569, 'kaluadon', 37, 'Aaj ka sabse best content 🥇', '2025-07-26 08:05:26'),
(570, 'kaluadon', 37, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:05:26'),
(571, 'kaluadon', 37, 'Teri vibe alag hi level pe hai', '2025-07-26 08:05:26'),
(572, 'kaluadon', 37, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:05:26'),
(573, 'kaluadon', 37, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:05:26'),
(574, 'kaluadon', 37, 'Sabko tag kar diya bro 😎', '2025-07-26 08:05:26'),
(575, 'kaluadon', 37, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:05:26'),
(576, 'kaluadon', 37, 'Tu toh artist nikla 💥', '2025-07-26 08:05:26'),
(577, 'kaluadon', 37, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:05:26'),
(578, 'kaluadon', 38, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:05:36'),
(579, 'kaluadon', 38, 'Bro aisa content chahiye roz!', '2025-07-26 08:05:36'),
(580, 'kaluadon', 38, 'Matlab next level stuff 💯', '2025-07-26 08:05:36'),
(581, 'kaluadon', 38, 'Kya editing hai boss 😮', '2025-07-26 08:05:36'),
(582, 'kaluadon', 38, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:05:36'),
(583, 'kaluadon', 38, 'This deserves way more views 📈', '2025-07-26 08:05:36'),
(584, 'kaluadon', 38, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:05:36'),
(585, 'kaluadon', 38, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:05:36'),
(586, 'kaluadon', 38, 'Back to back banger posts 🔥', '2025-07-26 08:05:36'),
(587, 'kaluadon', 38, 'Kitna mast transition tha!', '2025-07-26 08:05:36'),
(588, 'kaluadon', 38, 'Bhai tu OP hai 🤌', '2025-07-26 08:05:36'),
(589, 'kaluadon', 38, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:05:36'),
(590, 'kaluadon', 38, 'Music aur timing dono on point 💯', '2025-07-26 08:05:36'),
(591, 'kaluadon', 38, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:05:36'),
(592, 'kaluadon', 38, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:05:36'),
(593, 'kaluadon', 38, 'Caption bhi solid tha 🔥', '2025-07-26 08:05:36'),
(594, 'kaluadon', 38, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:05:36'),
(595, 'kaluadon', 38, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:05:36'),
(596, 'kaluadon', 38, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:05:36'),
(597, 'kaluadon', 38, 'Meme game strong hai 😂🔥', '2025-07-26 08:05:36'),
(598, 'kaluadon', 38, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:05:36'),
(599, 'kaluadon', 38, 'Bhai aise hi content daalte raho!', '2025-07-26 08:05:36'),
(600, 'kaluadon', 38, 'Mood badhiya kar diya isne!', '2025-07-26 08:05:36'),
(601, 'kaluadon', 38, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:05:36'),
(602, 'kaluadon', 38, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:05:36'),
(603, 'kaluadon', 38, 'Comment karna zaroori tha 😍', '2025-07-26 08:05:36'),
(604, 'kaluadon', 38, 'Dekhte hi like kar diya instantly', '2025-07-26 08:05:36'),
(605, 'kaluadon', 38, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:05:36'),
(606, 'kaluadon', 38, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:05:36'),
(607, 'kaluadon', 38, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:05:36'),
(608, 'kaluadon', 38, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:05:36'),
(609, 'kaluadon', 38, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:05:36'),
(610, 'kaluadon', 38, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:05:36'),
(611, 'kaluadon', 38, 'You nailed it boss 💪', '2025-07-26 08:05:36'),
(612, 'kaluadon', 38, 'Lit 🔥 from start to end', '2025-07-26 08:05:36'),
(613, 'kaluadon', 38, 'Kya placement hai music ka!', '2025-07-26 08:05:36'),
(614, 'kaluadon', 38, 'You made my day with this post ❤️', '2025-07-26 08:05:36'),
(615, 'kaluadon', 38, 'Kya story-telling bhai 💯', '2025-07-26 08:05:36'),
(616, 'kaluadon', 38, 'Simple and powerful!', '2025-07-26 08:05:36'),
(617, 'kaluadon', 38, 'Aankhon ka sukoon 😍', '2025-07-26 08:05:36'),
(618, 'kaluadon', 38, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:05:36'),
(619, 'kaluadon', 38, 'Apna kamal dikhaya tune', '2025-07-26 08:05:36'),
(620, 'kaluadon', 38, 'Quality content like always!', '2025-07-26 08:05:36'),
(621, 'kaluadon', 38, 'Too smooth bro 😎', '2025-07-26 08:05:36'),
(622, 'kaluadon', 38, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:05:36'),
(623, 'kaluadon', 38, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:05:36'),
(624, 'kaluadon', 38, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:05:36'),
(625, 'kaluadon', 38, 'Har post mein improvement dikhta hai!', '2025-07-26 08:05:36'),
(626, 'kaluadon', 38, 'Yeh post rewind pe chala diya!', '2025-07-26 08:05:36'),
(627, 'kaluadon', 38, 'Bhai full marks tujhe 🙌', '2025-07-26 08:05:36'),
(628, 'kaluadon', 38, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:05:36'),
(629, 'kaluadon', 38, 'Kya background pick kiya hai!', '2025-07-26 08:05:36'),
(630, 'kaluadon', 38, 'Hook point toh lajawab hai', '2025-07-26 08:05:36'),
(631, 'kaluadon', 38, 'Aise hi banaate rehna bhai', '2025-07-26 08:05:36'),
(632, 'kaluadon', 38, 'Kya humour add kiya hai 🤣', '2025-07-26 08:05:36'),
(633, 'kaluadon', 38, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:05:36'),
(634, 'kaluadon', 38, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:05:36'),
(635, 'kaluadon', 38, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:05:36'),
(636, 'kaluadon', 38, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:05:36'),
(637, 'kaluadon', 38, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:05:36'),
(638, 'kaluadon', 38, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:05:36'),
(639, 'kaluadon', 38, 'Sirf ek word – EPIC!', '2025-07-26 08:05:36'),
(640, 'kaluadon', 38, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:05:36'),
(641, 'kaluadon', 38, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:05:36'),
(642, 'kaluadon', 38, 'Jabardast storytelling!', '2025-07-26 08:05:36'),
(643, 'kaluadon', 38, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:05:36'),
(644, 'kaluadon', 38, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:05:36'),
(645, 'kaluadon', 38, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:05:36'),
(646, 'kaluadon', 38, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:05:36'),
(647, 'kaluadon', 38, 'Next kab aayega bro?', '2025-07-26 08:05:36'),
(648, 'kaluadon', 38, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:05:36'),
(649, 'kaluadon', 38, 'Aaj ka sabse best content 🥇', '2025-07-26 08:05:36'),
(650, 'kaluadon', 38, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:05:36'),
(651, 'kaluadon', 38, 'Teri vibe alag hi level pe hai', '2025-07-26 08:05:36'),
(652, 'kaluadon', 38, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:05:36'),
(653, 'kaluadon', 38, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:05:36'),
(654, 'kaluadon', 38, 'Sabko tag kar diya bro 😎', '2025-07-26 08:05:36'),
(655, 'kaluadon', 38, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:05:36'),
(656, 'kaluadon', 38, 'Tu toh artist nikla 💥', '2025-07-26 08:05:36'),
(657, 'kaluadon', 38, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:05:36'),
(658, 'kaluadon', 38, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:05:46'),
(659, 'kaluadon', 38, 'Bro aisa content chahiye roz!', '2025-07-26 08:05:46'),
(660, 'kaluadon', 38, 'Matlab next level stuff 💯', '2025-07-26 08:05:46'),
(661, 'kaluadon', 38, 'Kya editing hai boss 😮', '2025-07-26 08:05:46'),
(662, 'kaluadon', 38, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:05:46'),
(663, 'kaluadon', 38, 'This deserves way more views 📈', '2025-07-26 08:05:46'),
(664, 'kaluadon', 38, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:05:46'),
(665, 'kaluadon', 38, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:05:46'),
(666, 'kaluadon', 38, 'Back to back banger posts 🔥', '2025-07-26 08:05:46'),
(667, 'kaluadon', 38, 'Kitna mast transition tha!', '2025-07-26 08:05:46'),
(668, 'kaluadon', 38, 'Bhai tu OP hai 🤌', '2025-07-26 08:05:46'),
(669, 'kaluadon', 38, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:05:46'),
(670, 'kaluadon', 38, 'Music aur timing dono on point 💯', '2025-07-26 08:05:46'),
(671, 'kaluadon', 38, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:05:46'),
(672, 'kaluadon', 38, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:05:46'),
(673, 'kaluadon', 38, 'Caption bhi solid tha 🔥', '2025-07-26 08:05:46'),
(674, 'kaluadon', 38, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:05:46'),
(675, 'kaluadon', 38, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:05:46'),
(676, 'kaluadon', 38, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:05:46'),
(677, 'kaluadon', 38, 'Meme game strong hai 😂🔥', '2025-07-26 08:05:46'),
(678, 'kaluadon', 38, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:05:46'),
(679, 'kaluadon', 38, 'Bhai aise hi content daalte raho!', '2025-07-26 08:05:46'),
(680, 'kaluadon', 38, 'Mood badhiya kar diya isne!', '2025-07-26 08:05:46'),
(681, 'kaluadon', 38, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:05:46'),
(682, 'kaluadon', 38, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:05:46'),
(683, 'kaluadon', 38, 'Comment karna zaroori tha 😍', '2025-07-26 08:05:46'),
(684, 'kaluadon', 38, 'Dekhte hi like kar diya instantly', '2025-07-26 08:05:46'),
(685, 'kaluadon', 38, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:05:46'),
(686, 'kaluadon', 38, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:05:46'),
(687, 'kaluadon', 38, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:05:46'),
(688, 'kaluadon', 38, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:05:46'),
(689, 'kaluadon', 38, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:05:46'),
(690, 'kaluadon', 38, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:05:46'),
(691, 'kaluadon', 38, 'You nailed it boss 💪', '2025-07-26 08:05:46'),
(692, 'kaluadon', 38, 'Lit 🔥 from start to end', '2025-07-26 08:05:46'),
(693, 'kaluadon', 38, 'Kya placement hai music ka!', '2025-07-26 08:05:46'),
(694, 'kaluadon', 38, 'You made my day with this post ❤️', '2025-07-26 08:05:46'),
(695, 'kaluadon', 38, 'Kya story-telling bhai 💯', '2025-07-26 08:05:46'),
(696, 'kaluadon', 38, 'Simple and powerful!', '2025-07-26 08:05:46'),
(697, 'kaluadon', 38, 'Aankhon ka sukoon 😍', '2025-07-26 08:05:46'),
(698, 'kaluadon', 38, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:05:46'),
(699, 'kaluadon', 38, 'Apna kamal dikhaya tune', '2025-07-26 08:05:46'),
(700, 'kaluadon', 38, 'Quality content like always!', '2025-07-26 08:05:46'),
(701, 'kaluadon', 38, 'Too smooth bro 😎', '2025-07-26 08:05:46'),
(702, 'kaluadon', 38, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:05:46'),
(703, 'kaluadon', 38, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:05:46'),
(704, 'kaluadon', 38, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:05:46'),
(705, 'kaluadon', 38, 'Har post mein improvement dikhta hai!', '2025-07-26 08:05:46'),
(706, 'kaluadon', 38, 'Yeh post rewind pe chala diya!', '2025-07-26 08:05:46'),
(707, 'kaluadon', 38, 'Bhai full marks tujhe 🙌', '2025-07-26 08:05:46'),
(708, 'kaluadon', 38, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:05:46'),
(709, 'kaluadon', 38, 'Kya background pick kiya hai!', '2025-07-26 08:05:46'),
(710, 'kaluadon', 38, 'Hook point toh lajawab hai', '2025-07-26 08:05:46'),
(711, 'kaluadon', 38, 'Aise hi banaate rehna bhai', '2025-07-26 08:05:46'),
(712, 'kaluadon', 38, 'Kya humour add kiya hai 🤣', '2025-07-26 08:05:46'),
(713, 'kaluadon', 38, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:05:46'),
(714, 'kaluadon', 38, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:05:46'),
(715, 'kaluadon', 38, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:05:46'),
(716, 'kaluadon', 38, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:05:46'),
(717, 'kaluadon', 38, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:05:46'),
(718, 'kaluadon', 38, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:05:46'),
(719, 'kaluadon', 38, 'Sirf ek word – EPIC!', '2025-07-26 08:05:46'),
(720, 'kaluadon', 38, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:05:46'),
(721, 'kaluadon', 38, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:05:46'),
(722, 'kaluadon', 38, 'Jabardast storytelling!', '2025-07-26 08:05:46'),
(723, 'kaluadon', 38, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:05:46'),
(724, 'kaluadon', 38, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:05:46'),
(725, 'kaluadon', 38, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:05:46'),
(726, 'kaluadon', 38, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:05:46'),
(727, 'kaluadon', 38, 'Next kab aayega bro?', '2025-07-26 08:05:46'),
(728, 'kaluadon', 38, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:05:46'),
(729, 'kaluadon', 38, 'Aaj ka sabse best content 🥇', '2025-07-26 08:05:46'),
(730, 'kaluadon', 38, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:05:46'),
(731, 'kaluadon', 38, 'Teri vibe alag hi level pe hai', '2025-07-26 08:05:46'),
(732, 'kaluadon', 38, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:05:46'),
(733, 'kaluadon', 38, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:05:46'),
(734, 'kaluadon', 38, 'Sabko tag kar diya bro 😎', '2025-07-26 08:05:46'),
(735, 'kaluadon', 38, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:05:46'),
(736, 'kaluadon', 38, 'Tu toh artist nikla 💥', '2025-07-26 08:05:46'),
(737, 'kaluadon', 38, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:05:46'),
(738, 'kaluadon', 39, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:05:56'),
(739, 'kaluadon', 39, 'Bro aisa content chahiye roz!', '2025-07-26 08:05:56'),
(740, 'kaluadon', 39, 'Matlab next level stuff 💯', '2025-07-26 08:05:56'),
(741, 'kaluadon', 39, 'Kya editing hai boss 😮', '2025-07-26 08:05:56'),
(742, 'kaluadon', 39, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:05:56'),
(743, 'kaluadon', 39, 'This deserves way more views 📈', '2025-07-26 08:05:56'),
(744, 'kaluadon', 39, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:05:56'),
(745, 'kaluadon', 39, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:05:56'),
(746, 'kaluadon', 39, 'Back to back banger posts 🔥', '2025-07-26 08:05:56'),
(747, 'kaluadon', 39, 'Kitna mast transition tha!', '2025-07-26 08:05:56'),
(748, 'kaluadon', 39, 'Bhai tu OP hai 🤌', '2025-07-26 08:05:56'),
(749, 'kaluadon', 39, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:05:56'),
(750, 'kaluadon', 39, 'Music aur timing dono on point 💯', '2025-07-26 08:05:56'),
(751, 'kaluadon', 39, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:05:56'),
(752, 'kaluadon', 39, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:05:56'),
(753, 'kaluadon', 39, 'Caption bhi solid tha 🔥', '2025-07-26 08:05:56'),
(754, 'kaluadon', 39, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:05:56'),
(755, 'kaluadon', 39, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:05:56'),
(756, 'kaluadon', 39, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:05:56'),
(757, 'kaluadon', 39, 'Meme game strong hai 😂🔥', '2025-07-26 08:05:56'),
(758, 'kaluadon', 39, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:05:56'),
(759, 'kaluadon', 39, 'Bhai aise hi content daalte raho!', '2025-07-26 08:05:56'),
(760, 'kaluadon', 39, 'Mood badhiya kar diya isne!', '2025-07-26 08:05:56'),
(761, 'kaluadon', 39, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:05:56'),
(762, 'kaluadon', 39, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:05:56'),
(763, 'kaluadon', 39, 'Comment karna zaroori tha 😍', '2025-07-26 08:05:56'),
(764, 'kaluadon', 39, 'Dekhte hi like kar diya instantly', '2025-07-26 08:05:56'),
(765, 'kaluadon', 39, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:05:56'),
(766, 'kaluadon', 39, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:05:56'),
(767, 'kaluadon', 39, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:05:56'),
(768, 'kaluadon', 39, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:05:56'),
(769, 'kaluadon', 39, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:05:56'),
(770, 'kaluadon', 39, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:05:56'),
(771, 'kaluadon', 39, 'You nailed it boss 💪', '2025-07-26 08:05:56'),
(772, 'kaluadon', 39, 'Lit 🔥 from start to end', '2025-07-26 08:05:56'),
(773, 'kaluadon', 39, 'Kya placement hai music ka!', '2025-07-26 08:05:56'),
(774, 'kaluadon', 39, 'You made my day with this post ❤️', '2025-07-26 08:05:56'),
(775, 'kaluadon', 39, 'Kya story-telling bhai 💯', '2025-07-26 08:05:56'),
(776, 'kaluadon', 39, 'Simple and powerful!', '2025-07-26 08:05:56'),
(777, 'kaluadon', 39, 'Aankhon ka sukoon 😍', '2025-07-26 08:05:56'),
(778, 'kaluadon', 39, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:05:56'),
(779, 'kaluadon', 39, 'Apna kamal dikhaya tune', '2025-07-26 08:05:56'),
(780, 'kaluadon', 39, 'Quality content like always!', '2025-07-26 08:05:56'),
(781, 'kaluadon', 39, 'Too smooth bro 😎', '2025-07-26 08:05:56'),
(782, 'kaluadon', 39, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:05:56'),
(783, 'kaluadon', 39, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:05:56'),
(784, 'kaluadon', 39, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:05:56'),
(785, 'kaluadon', 39, 'Har post mein improvement dikhta hai!', '2025-07-26 08:05:56'),
(786, 'kaluadon', 39, 'Yeh post rewind pe chala diya!', '2025-07-26 08:05:56'),
(787, 'kaluadon', 39, 'Bhai full marks tujhe 🙌', '2025-07-26 08:05:56'),
(788, 'kaluadon', 39, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:05:56'),
(789, 'kaluadon', 39, 'Kya background pick kiya hai!', '2025-07-26 08:05:56'),
(790, 'kaluadon', 39, 'Hook point toh lajawab hai', '2025-07-26 08:05:56'),
(791, 'kaluadon', 39, 'Aise hi banaate rehna bhai', '2025-07-26 08:05:56'),
(792, 'kaluadon', 39, 'Kya humour add kiya hai 🤣', '2025-07-26 08:05:56'),
(793, 'kaluadon', 39, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:05:56'),
(794, 'kaluadon', 39, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:05:56'),
(795, 'kaluadon', 39, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:05:56'),
(796, 'kaluadon', 39, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:05:56'),
(797, 'kaluadon', 39, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:05:56'),
(798, 'kaluadon', 39, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:05:56'),
(799, 'kaluadon', 39, 'Sirf ek word – EPIC!', '2025-07-26 08:05:56'),
(800, 'kaluadon', 39, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:05:56'),
(801, 'kaluadon', 39, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:05:56'),
(802, 'kaluadon', 39, 'Jabardast storytelling!', '2025-07-26 08:05:56'),
(803, 'kaluadon', 39, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:05:56'),
(804, 'kaluadon', 39, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:05:56'),
(805, 'kaluadon', 39, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:05:56'),
(806, 'kaluadon', 39, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:05:56'),
(807, 'kaluadon', 39, 'Next kab aayega bro?', '2025-07-26 08:05:56'),
(808, 'kaluadon', 39, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:05:56'),
(809, 'kaluadon', 39, 'Aaj ka sabse best content 🥇', '2025-07-26 08:05:56'),
(810, 'kaluadon', 39, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:05:56'),
(811, 'kaluadon', 39, 'Teri vibe alag hi level pe hai', '2025-07-26 08:05:56'),
(812, 'kaluadon', 39, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:05:56'),
(813, 'kaluadon', 39, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:05:56'),
(814, 'kaluadon', 39, 'Sabko tag kar diya bro 😎', '2025-07-26 08:05:56'),
(815, 'kaluadon', 39, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:05:56'),
(816, 'kaluadon', 39, 'Tu toh artist nikla 💥', '2025-07-26 08:05:56'),
(817, 'kaluadon', 39, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:05:56'),
(818, 'kaluadon', 40, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:06:06'),
(819, 'kaluadon', 40, 'Bro aisa content chahiye roz!', '2025-07-26 08:06:06'),
(820, 'kaluadon', 40, 'Matlab next level stuff 💯', '2025-07-26 08:06:06'),
(821, 'kaluadon', 40, 'Kya editing hai boss 😮', '2025-07-26 08:06:06'),
(822, 'kaluadon', 40, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:06:06'),
(823, 'kaluadon', 40, 'This deserves way more views 📈', '2025-07-26 08:06:06'),
(824, 'kaluadon', 40, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:06:06'),
(825, 'kaluadon', 40, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:06:06'),
(826, 'kaluadon', 40, 'Back to back banger posts 🔥', '2025-07-26 08:06:06'),
(827, 'kaluadon', 40, 'Kitna mast transition tha!', '2025-07-26 08:06:06'),
(828, 'kaluadon', 40, 'Bhai tu OP hai 🤌', '2025-07-26 08:06:06'),
(829, 'kaluadon', 40, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:06:06'),
(830, 'kaluadon', 40, 'Music aur timing dono on point 💯', '2025-07-26 08:06:06'),
(831, 'kaluadon', 40, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:06:06'),
(832, 'kaluadon', 40, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:06:06'),
(833, 'kaluadon', 40, 'Caption bhi solid tha 🔥', '2025-07-26 08:06:06'),
(834, 'kaluadon', 40, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:06:06'),
(835, 'kaluadon', 40, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:06:06'),
(836, 'kaluadon', 40, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:06:06'),
(837, 'kaluadon', 40, 'Meme game strong hai 😂🔥', '2025-07-26 08:06:06'),
(838, 'kaluadon', 40, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:06:06'),
(839, 'kaluadon', 40, 'Bhai aise hi content daalte raho!', '2025-07-26 08:06:06'),
(840, 'kaluadon', 40, 'Mood badhiya kar diya isne!', '2025-07-26 08:06:06'),
(841, 'kaluadon', 40, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:06:06'),
(842, 'kaluadon', 40, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:06:06'),
(843, 'kaluadon', 40, 'Comment karna zaroori tha 😍', '2025-07-26 08:06:06'),
(844, 'kaluadon', 40, 'Dekhte hi like kar diya instantly', '2025-07-26 08:06:06'),
(845, 'kaluadon', 40, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:06:06'),
(846, 'kaluadon', 40, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:06:06'),
(847, 'kaluadon', 40, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:06:06'),
(848, 'kaluadon', 40, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:06:06'),
(849, 'kaluadon', 40, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:06:06'),
(850, 'kaluadon', 40, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:06:06'),
(851, 'kaluadon', 40, 'You nailed it boss 💪', '2025-07-26 08:06:06'),
(852, 'kaluadon', 40, 'Lit 🔥 from start to end', '2025-07-26 08:06:06'),
(853, 'kaluadon', 40, 'Kya placement hai music ka!', '2025-07-26 08:06:06'),
(854, 'kaluadon', 40, 'You made my day with this post ❤️', '2025-07-26 08:06:06'),
(855, 'kaluadon', 40, 'Kya story-telling bhai 💯', '2025-07-26 08:06:06'),
(856, 'kaluadon', 40, 'Simple and powerful!', '2025-07-26 08:06:06'),
(857, 'kaluadon', 40, 'Aankhon ka sukoon 😍', '2025-07-26 08:06:06'),
(858, 'kaluadon', 40, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:06:06'),
(859, 'kaluadon', 40, 'Apna kamal dikhaya tune', '2025-07-26 08:06:06'),
(860, 'kaluadon', 40, 'Quality content like always!', '2025-07-26 08:06:06'),
(861, 'kaluadon', 40, 'Too smooth bro 😎', '2025-07-26 08:06:06'),
(862, 'kaluadon', 40, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:06:06'),
(863, 'kaluadon', 40, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:06:06'),
(864, 'kaluadon', 40, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:06:06'),
(865, 'kaluadon', 40, 'Har post mein improvement dikhta hai!', '2025-07-26 08:06:06'),
(866, 'kaluadon', 40, 'Yeh post rewind pe chala diya!', '2025-07-26 08:06:06'),
(867, 'kaluadon', 40, 'Bhai full marks tujhe 🙌', '2025-07-26 08:06:06'),
(868, 'kaluadon', 40, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:06:06'),
(869, 'kaluadon', 40, 'Kya background pick kiya hai!', '2025-07-26 08:06:06'),
(870, 'kaluadon', 40, 'Hook point toh lajawab hai', '2025-07-26 08:06:06'),
(871, 'kaluadon', 40, 'Aise hi banaate rehna bhai', '2025-07-26 08:06:06'),
(872, 'kaluadon', 40, 'Kya humour add kiya hai 🤣', '2025-07-26 08:06:06'),
(873, 'kaluadon', 40, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:06:06'),
(874, 'kaluadon', 40, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:06:06'),
(875, 'kaluadon', 40, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:06:06'),
(876, 'kaluadon', 40, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:06:06'),
(877, 'kaluadon', 40, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:06:06'),
(878, 'kaluadon', 40, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:06:06'),
(879, 'kaluadon', 40, 'Sirf ek word – EPIC!', '2025-07-26 08:06:06'),
(880, 'kaluadon', 40, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:06:06'),
(881, 'kaluadon', 40, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:06:06'),
(882, 'kaluadon', 40, 'Jabardast storytelling!', '2025-07-26 08:06:06');
INSERT INTO `post_comments` (`commentid`, `userid`, `postid`, `comment_text`, `createdAt`) VALUES
(883, 'kaluadon', 40, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:06:06'),
(884, 'kaluadon', 40, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:06:06'),
(885, 'kaluadon', 40, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:06:06'),
(886, 'kaluadon', 40, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:06:06'),
(887, 'kaluadon', 40, 'Next kab aayega bro?', '2025-07-26 08:06:06'),
(888, 'kaluadon', 40, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:06:06'),
(889, 'kaluadon', 40, 'Aaj ka sabse best content 🥇', '2025-07-26 08:06:06'),
(890, 'kaluadon', 40, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:06:06'),
(891, 'kaluadon', 40, 'Teri vibe alag hi level pe hai', '2025-07-26 08:06:06'),
(892, 'kaluadon', 40, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:06:06'),
(893, 'kaluadon', 40, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:06:06'),
(894, 'kaluadon', 40, 'Sabko tag kar diya bro 😎', '2025-07-26 08:06:06'),
(895, 'kaluadon', 40, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:06:06'),
(896, 'kaluadon', 40, 'Tu toh artist nikla 💥', '2025-07-26 08:06:06'),
(897, 'kaluadon', 40, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:06:06'),
(1138, 'kaluadon', 43, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:07:27'),
(1139, 'kaluadon', 43, 'Bro aisa content chahiye roz!', '2025-07-26 08:07:27'),
(1140, 'kaluadon', 43, 'Matlab next level stuff 💯', '2025-07-26 08:07:27'),
(1141, 'kaluadon', 43, 'Kya editing hai boss 😮', '2025-07-26 08:07:27'),
(1142, 'kaluadon', 43, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:07:27'),
(1143, 'kaluadon', 43, 'This deserves way more views 📈', '2025-07-26 08:07:27'),
(1144, 'kaluadon', 43, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:07:27'),
(1145, 'kaluadon', 43, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:07:27'),
(1146, 'kaluadon', 43, 'Back to back banger posts 🔥', '2025-07-26 08:07:27'),
(1147, 'kaluadon', 43, 'Kitna mast transition tha!', '2025-07-26 08:07:27'),
(1148, 'kaluadon', 43, 'Bhai tu OP hai 🤌', '2025-07-26 08:07:27'),
(1149, 'kaluadon', 43, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:07:27'),
(1150, 'kaluadon', 43, 'Music aur timing dono on point 💯', '2025-07-26 08:07:27'),
(1151, 'kaluadon', 43, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:07:27'),
(1152, 'kaluadon', 43, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:07:27'),
(1153, 'kaluadon', 43, 'Caption bhi solid tha 🔥', '2025-07-26 08:07:27'),
(1154, 'kaluadon', 43, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:07:27'),
(1155, 'kaluadon', 43, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:07:27'),
(1156, 'kaluadon', 43, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:07:27'),
(1157, 'kaluadon', 43, 'Meme game strong hai 😂🔥', '2025-07-26 08:07:27'),
(1158, 'kaluadon', 43, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:07:27'),
(1159, 'kaluadon', 43, 'Bhai aise hi content daalte raho!', '2025-07-26 08:07:27'),
(1160, 'kaluadon', 43, 'Mood badhiya kar diya isne!', '2025-07-26 08:07:27'),
(1161, 'kaluadon', 43, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:07:27'),
(1162, 'kaluadon', 43, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:07:27'),
(1163, 'kaluadon', 43, 'Comment karna zaroori tha 😍', '2025-07-26 08:07:27'),
(1164, 'kaluadon', 43, 'Dekhte hi like kar diya instantly', '2025-07-26 08:07:27'),
(1165, 'kaluadon', 43, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:07:27'),
(1166, 'kaluadon', 43, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:07:27'),
(1167, 'kaluadon', 43, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:07:27'),
(1168, 'kaluadon', 43, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:07:27'),
(1169, 'kaluadon', 43, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:07:27'),
(1170, 'kaluadon', 43, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:07:27'),
(1171, 'kaluadon', 43, 'You nailed it boss 💪', '2025-07-26 08:07:27'),
(1172, 'kaluadon', 43, 'Lit 🔥 from start to end', '2025-07-26 08:07:27'),
(1173, 'kaluadon', 43, 'Kya placement hai music ka!', '2025-07-26 08:07:27'),
(1174, 'kaluadon', 43, 'You made my day with this post ❤️', '2025-07-26 08:07:27'),
(1175, 'kaluadon', 43, 'Kya story-telling bhai 💯', '2025-07-26 08:07:27'),
(1176, 'kaluadon', 43, 'Simple and powerful!', '2025-07-26 08:07:27'),
(1177, 'kaluadon', 43, 'Aankhon ka sukoon 😍', '2025-07-26 08:07:27'),
(1178, 'kaluadon', 43, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:07:27'),
(1179, 'kaluadon', 43, 'Apna kamal dikhaya tune', '2025-07-26 08:07:27'),
(1180, 'kaluadon', 43, 'Quality content like always!', '2025-07-26 08:07:27'),
(1181, 'kaluadon', 43, 'Too smooth bro 😎', '2025-07-26 08:07:27'),
(1182, 'kaluadon', 43, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:07:27'),
(1183, 'kaluadon', 43, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:07:27'),
(1184, 'kaluadon', 43, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:07:27'),
(1185, 'kaluadon', 43, 'Har post mein improvement dikhta hai!', '2025-07-26 08:07:27'),
(1186, 'kaluadon', 43, 'Yeh post rewind pe chala diya!', '2025-07-26 08:07:27'),
(1187, 'kaluadon', 43, 'Bhai full marks tujhe 🙌', '2025-07-26 08:07:27'),
(1188, 'kaluadon', 43, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:07:27'),
(1189, 'kaluadon', 43, 'Kya background pick kiya hai!', '2025-07-26 08:07:27'),
(1190, 'kaluadon', 43, 'Hook point toh lajawab hai', '2025-07-26 08:07:27'),
(1191, 'kaluadon', 43, 'Aise hi banaate rehna bhai', '2025-07-26 08:07:27'),
(1192, 'kaluadon', 43, 'Kya humour add kiya hai 🤣', '2025-07-26 08:07:27'),
(1193, 'kaluadon', 43, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:07:27'),
(1194, 'kaluadon', 43, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:07:27'),
(1195, 'kaluadon', 43, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:07:27'),
(1196, 'kaluadon', 43, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:07:27'),
(1197, 'kaluadon', 43, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:07:27'),
(1198, 'kaluadon', 43, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:07:27'),
(1199, 'kaluadon', 43, 'Sirf ek word – EPIC!', '2025-07-26 08:07:27'),
(1200, 'kaluadon', 43, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:07:27'),
(1201, 'kaluadon', 43, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:07:27'),
(1202, 'kaluadon', 43, 'Jabardast storytelling!', '2025-07-26 08:07:27'),
(1203, 'kaluadon', 43, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:07:27'),
(1204, 'kaluadon', 43, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:07:27'),
(1205, 'kaluadon', 43, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:07:27'),
(1206, 'kaluadon', 43, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:07:27'),
(1207, 'kaluadon', 43, 'Next kab aayega bro?', '2025-07-26 08:07:27'),
(1208, 'kaluadon', 43, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:07:27'),
(1209, 'kaluadon', 43, 'Aaj ka sabse best content 🥇', '2025-07-26 08:07:27'),
(1210, 'kaluadon', 43, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:07:27'),
(1211, 'kaluadon', 43, 'Teri vibe alag hi level pe hai', '2025-07-26 08:07:27'),
(1212, 'kaluadon', 43, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:07:27'),
(1213, 'kaluadon', 43, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:07:27'),
(1214, 'kaluadon', 43, 'Sabko tag kar diya bro 😎', '2025-07-26 08:07:27'),
(1215, 'kaluadon', 43, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:07:27'),
(1216, 'kaluadon', 43, 'Tu toh artist nikla 💥', '2025-07-26 08:07:27'),
(1217, 'kaluadon', 43, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:07:27'),
(1218, 'kaluadon', 44, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:07:41'),
(1219, 'kaluadon', 44, 'Bro aisa content chahiye roz!', '2025-07-26 08:07:41'),
(1220, 'kaluadon', 44, 'Matlab next level stuff 💯', '2025-07-26 08:07:41'),
(1221, 'kaluadon', 44, 'Kya editing hai boss 😮', '2025-07-26 08:07:41'),
(1222, 'kaluadon', 44, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:07:41'),
(1223, 'kaluadon', 44, 'This deserves way more views 📈', '2025-07-26 08:07:41'),
(1224, 'kaluadon', 44, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:07:41'),
(1225, 'kaluadon', 44, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:07:41'),
(1226, 'kaluadon', 44, 'Back to back banger posts 🔥', '2025-07-26 08:07:41'),
(1227, 'kaluadon', 44, 'Kitna mast transition tha!', '2025-07-26 08:07:41'),
(1228, 'kaluadon', 44, 'Bhai tu OP hai 🤌', '2025-07-26 08:07:41'),
(1229, 'kaluadon', 44, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:07:41'),
(1230, 'kaluadon', 44, 'Music aur timing dono on point 💯', '2025-07-26 08:07:41'),
(1231, 'kaluadon', 44, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:07:41'),
(1232, 'kaluadon', 44, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:07:41'),
(1233, 'kaluadon', 44, 'Caption bhi solid tha 🔥', '2025-07-26 08:07:41'),
(1234, 'kaluadon', 44, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:07:41'),
(1235, 'kaluadon', 44, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:07:41'),
(1236, 'kaluadon', 44, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:07:41'),
(1237, 'kaluadon', 44, 'Meme game strong hai 😂🔥', '2025-07-26 08:07:41'),
(1238, 'kaluadon', 44, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:07:41'),
(1239, 'kaluadon', 44, 'Bhai aise hi content daalte raho!', '2025-07-26 08:07:41'),
(1240, 'kaluadon', 44, 'Mood badhiya kar diya isne!', '2025-07-26 08:07:41'),
(1241, 'kaluadon', 44, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:07:41'),
(1242, 'kaluadon', 44, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:07:41'),
(1243, 'kaluadon', 44, 'Comment karna zaroori tha 😍', '2025-07-26 08:07:41'),
(1244, 'kaluadon', 44, 'Dekhte hi like kar diya instantly', '2025-07-26 08:07:41'),
(1245, 'kaluadon', 44, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:07:41'),
(1246, 'kaluadon', 44, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:07:41'),
(1247, 'kaluadon', 44, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:07:41'),
(1248, 'kaluadon', 44, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:07:41'),
(1249, 'kaluadon', 44, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:07:41'),
(1250, 'kaluadon', 44, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:07:41'),
(1251, 'kaluadon', 44, 'You nailed it boss 💪', '2025-07-26 08:07:41'),
(1252, 'kaluadon', 44, 'Lit 🔥 from start to end', '2025-07-26 08:07:41'),
(1253, 'kaluadon', 44, 'Kya placement hai music ka!', '2025-07-26 08:07:41'),
(1254, 'kaluadon', 44, 'You made my day with this post ❤️', '2025-07-26 08:07:41'),
(1255, 'kaluadon', 44, 'Kya story-telling bhai 💯', '2025-07-26 08:07:41'),
(1256, 'kaluadon', 44, 'Simple and powerful!', '2025-07-26 08:07:41'),
(1257, 'kaluadon', 44, 'Aankhon ka sukoon 😍', '2025-07-26 08:07:41'),
(1258, 'kaluadon', 44, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:07:41'),
(1259, 'kaluadon', 44, 'Apna kamal dikhaya tune', '2025-07-26 08:07:41'),
(1260, 'kaluadon', 44, 'Quality content like always!', '2025-07-26 08:07:41'),
(1261, 'kaluadon', 44, 'Too smooth bro 😎', '2025-07-26 08:07:41'),
(1262, 'kaluadon', 44, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:07:41'),
(1263, 'kaluadon', 44, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:07:41'),
(1264, 'kaluadon', 44, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:07:41'),
(1265, 'kaluadon', 44, 'Har post mein improvement dikhta hai!', '2025-07-26 08:07:41'),
(1266, 'kaluadon', 44, 'Yeh post rewind pe chala diya!', '2025-07-26 08:07:41'),
(1267, 'kaluadon', 44, 'Bhai full marks tujhe 🙌', '2025-07-26 08:07:41'),
(1268, 'kaluadon', 44, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:07:41'),
(1269, 'kaluadon', 44, 'Kya background pick kiya hai!', '2025-07-26 08:07:41'),
(1270, 'kaluadon', 44, 'Hook point toh lajawab hai', '2025-07-26 08:07:41'),
(1271, 'kaluadon', 44, 'Aise hi banaate rehna bhai', '2025-07-26 08:07:41'),
(1272, 'kaluadon', 44, 'Kya humour add kiya hai 🤣', '2025-07-26 08:07:41'),
(1273, 'kaluadon', 44, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:07:41'),
(1274, 'kaluadon', 44, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:07:41'),
(1275, 'kaluadon', 44, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:07:41'),
(1276, 'kaluadon', 44, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:07:41'),
(1277, 'kaluadon', 44, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:07:41'),
(1278, 'kaluadon', 44, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:07:41'),
(1279, 'kaluadon', 44, 'Sirf ek word – EPIC!', '2025-07-26 08:07:41'),
(1280, 'kaluadon', 44, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:07:41'),
(1281, 'kaluadon', 44, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:07:41'),
(1282, 'kaluadon', 44, 'Jabardast storytelling!', '2025-07-26 08:07:41'),
(1283, 'kaluadon', 44, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:07:41'),
(1284, 'kaluadon', 44, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:07:41'),
(1285, 'kaluadon', 44, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:07:41'),
(1286, 'kaluadon', 44, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:07:41'),
(1287, 'kaluadon', 44, 'Next kab aayega bro?', '2025-07-26 08:07:41'),
(1288, 'kaluadon', 44, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:07:41'),
(1289, 'kaluadon', 44, 'Aaj ka sabse best content 🥇', '2025-07-26 08:07:41'),
(1290, 'kaluadon', 44, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:07:41'),
(1291, 'kaluadon', 44, 'Teri vibe alag hi level pe hai', '2025-07-26 08:07:41'),
(1292, 'kaluadon', 44, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:07:41'),
(1293, 'kaluadon', 44, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:07:41'),
(1294, 'kaluadon', 44, 'Sabko tag kar diya bro 😎', '2025-07-26 08:07:41'),
(1295, 'kaluadon', 44, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:07:41'),
(1296, 'kaluadon', 44, 'Tu toh artist nikla 💥', '2025-07-26 08:07:41'),
(1297, 'kaluadon', 44, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:07:41'),
(1298, 'kaluadon', 45, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:07:52'),
(1299, 'kaluadon', 45, 'Bro aisa content chahiye roz!', '2025-07-26 08:07:52'),
(1300, 'kaluadon', 45, 'Matlab next level stuff 💯', '2025-07-26 08:07:52'),
(1301, 'kaluadon', 45, 'Kya editing hai boss 😮', '2025-07-26 08:07:52'),
(1302, 'kaluadon', 45, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:07:52'),
(1303, 'kaluadon', 45, 'This deserves way more views 📈', '2025-07-26 08:07:52'),
(1304, 'kaluadon', 45, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:07:52'),
(1305, 'kaluadon', 45, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:07:52'),
(1306, 'kaluadon', 45, 'Back to back banger posts 🔥', '2025-07-26 08:07:52'),
(1307, 'kaluadon', 45, 'Kitna mast transition tha!', '2025-07-26 08:07:52'),
(1308, 'kaluadon', 45, 'Bhai tu OP hai 🤌', '2025-07-26 08:07:52'),
(1309, 'kaluadon', 45, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:07:52'),
(1310, 'kaluadon', 45, 'Music aur timing dono on point 💯', '2025-07-26 08:07:52'),
(1311, 'kaluadon', 45, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:07:52'),
(1312, 'kaluadon', 45, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:07:52'),
(1313, 'kaluadon', 45, 'Caption bhi solid tha 🔥', '2025-07-26 08:07:52'),
(1314, 'kaluadon', 45, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:07:52'),
(1315, 'kaluadon', 45, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:07:52'),
(1316, 'kaluadon', 45, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:07:52'),
(1317, 'kaluadon', 45, 'Meme game strong hai 😂🔥', '2025-07-26 08:07:52'),
(1318, 'kaluadon', 45, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:07:52'),
(1319, 'kaluadon', 45, 'Bhai aise hi content daalte raho!', '2025-07-26 08:07:52'),
(1320, 'kaluadon', 45, 'Mood badhiya kar diya isne!', '2025-07-26 08:07:52'),
(1321, 'kaluadon', 45, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:07:52'),
(1322, 'kaluadon', 45, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:07:52'),
(1323, 'kaluadon', 45, 'Comment karna zaroori tha 😍', '2025-07-26 08:07:52'),
(1324, 'kaluadon', 45, 'Dekhte hi like kar diya instantly', '2025-07-26 08:07:52'),
(1325, 'kaluadon', 45, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:07:52'),
(1326, 'kaluadon', 45, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:07:52'),
(1327, 'kaluadon', 45, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:07:52'),
(1328, 'kaluadon', 45, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:07:52'),
(1329, 'kaluadon', 45, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:07:52'),
(1330, 'kaluadon', 45, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:07:52'),
(1331, 'kaluadon', 45, 'You nailed it boss 💪', '2025-07-26 08:07:52'),
(1332, 'kaluadon', 45, 'Lit 🔥 from start to end', '2025-07-26 08:07:52'),
(1333, 'kaluadon', 45, 'Kya placement hai music ka!', '2025-07-26 08:07:52'),
(1334, 'kaluadon', 45, 'You made my day with this post ❤️', '2025-07-26 08:07:52'),
(1335, 'kaluadon', 45, 'Kya story-telling bhai 💯', '2025-07-26 08:07:52'),
(1336, 'kaluadon', 45, 'Simple and powerful!', '2025-07-26 08:07:52'),
(1337, 'kaluadon', 45, 'Aankhon ka sukoon 😍', '2025-07-26 08:07:52'),
(1338, 'kaluadon', 45, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:07:52'),
(1339, 'kaluadon', 45, 'Apna kamal dikhaya tune', '2025-07-26 08:07:52'),
(1340, 'kaluadon', 45, 'Quality content like always!', '2025-07-26 08:07:52'),
(1341, 'kaluadon', 45, 'Too smooth bro 😎', '2025-07-26 08:07:52'),
(1342, 'kaluadon', 45, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:07:52'),
(1343, 'kaluadon', 45, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:07:52'),
(1344, 'kaluadon', 45, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:07:52'),
(1345, 'kaluadon', 45, 'Har post mein improvement dikhta hai!', '2025-07-26 08:07:52'),
(1346, 'kaluadon', 45, 'Yeh post rewind pe chala diya!', '2025-07-26 08:07:52'),
(1347, 'kaluadon', 45, 'Bhai full marks tujhe 🙌', '2025-07-26 08:07:52'),
(1348, 'kaluadon', 45, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:07:52'),
(1349, 'kaluadon', 45, 'Kya background pick kiya hai!', '2025-07-26 08:07:52'),
(1350, 'kaluadon', 45, 'Hook point toh lajawab hai', '2025-07-26 08:07:52'),
(1351, 'kaluadon', 45, 'Aise hi banaate rehna bhai', '2025-07-26 08:07:52'),
(1352, 'kaluadon', 45, 'Kya humour add kiya hai 🤣', '2025-07-26 08:07:52'),
(1353, 'kaluadon', 45, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:07:52'),
(1354, 'kaluadon', 45, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:07:52'),
(1355, 'kaluadon', 45, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:07:52'),
(1356, 'kaluadon', 45, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:07:52'),
(1357, 'kaluadon', 45, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:07:52'),
(1358, 'kaluadon', 45, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:07:52'),
(1359, 'kaluadon', 45, 'Sirf ek word – EPIC!', '2025-07-26 08:07:52'),
(1360, 'kaluadon', 45, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:07:52'),
(1361, 'kaluadon', 45, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:07:52'),
(1362, 'kaluadon', 45, 'Jabardast storytelling!', '2025-07-26 08:07:52'),
(1363, 'kaluadon', 45, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:07:52'),
(1364, 'kaluadon', 45, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:07:52'),
(1365, 'kaluadon', 45, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:07:52'),
(1366, 'kaluadon', 45, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:07:52'),
(1367, 'kaluadon', 45, 'Next kab aayega bro?', '2025-07-26 08:07:52'),
(1368, 'kaluadon', 45, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:07:52'),
(1369, 'kaluadon', 45, 'Aaj ka sabse best content 🥇', '2025-07-26 08:07:52'),
(1370, 'kaluadon', 45, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:07:52'),
(1371, 'kaluadon', 45, 'Teri vibe alag hi level pe hai', '2025-07-26 08:07:52'),
(1372, 'kaluadon', 45, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:07:52'),
(1373, 'kaluadon', 45, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:07:52'),
(1374, 'kaluadon', 45, 'Sabko tag kar diya bro 😎', '2025-07-26 08:07:52'),
(1375, 'kaluadon', 45, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:07:52'),
(1376, 'kaluadon', 45, 'Tu toh artist nikla 💥', '2025-07-26 08:07:52'),
(1377, 'kaluadon', 45, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:07:52'),
(1378, 'kaluadon', 46, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:08:05'),
(1379, 'kaluadon', 46, 'Bro aisa content chahiye roz!', '2025-07-26 08:08:05'),
(1380, 'kaluadon', 46, 'Matlab next level stuff 💯', '2025-07-26 08:08:05'),
(1381, 'kaluadon', 46, 'Kya editing hai boss 😮', '2025-07-26 08:08:05'),
(1382, 'kaluadon', 46, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:08:05'),
(1383, 'kaluadon', 46, 'This deserves way more views 📈', '2025-07-26 08:08:05'),
(1384, 'kaluadon', 46, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:08:05'),
(1385, 'kaluadon', 46, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:08:05'),
(1386, 'kaluadon', 46, 'Back to back banger posts 🔥', '2025-07-26 08:08:05'),
(1387, 'kaluadon', 46, 'Kitna mast transition tha!', '2025-07-26 08:08:05'),
(1388, 'kaluadon', 46, 'Bhai tu OP hai 🤌', '2025-07-26 08:08:05'),
(1389, 'kaluadon', 46, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:08:05'),
(1390, 'kaluadon', 46, 'Music aur timing dono on point 💯', '2025-07-26 08:08:05'),
(1391, 'kaluadon', 46, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:08:05'),
(1392, 'kaluadon', 46, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:08:05'),
(1393, 'kaluadon', 46, 'Caption bhi solid tha 🔥', '2025-07-26 08:08:05'),
(1394, 'kaluadon', 46, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:08:05'),
(1395, 'kaluadon', 46, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:08:05'),
(1396, 'kaluadon', 46, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:08:05'),
(1397, 'kaluadon', 46, 'Meme game strong hai 😂🔥', '2025-07-26 08:08:05'),
(1398, 'kaluadon', 46, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:08:05'),
(1399, 'kaluadon', 46, 'Bhai aise hi content daalte raho!', '2025-07-26 08:08:05'),
(1400, 'kaluadon', 46, 'Mood badhiya kar diya isne!', '2025-07-26 08:08:05'),
(1401, 'kaluadon', 46, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:08:05'),
(1402, 'kaluadon', 46, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:08:05'),
(1403, 'kaluadon', 46, 'Comment karna zaroori tha 😍', '2025-07-26 08:08:05'),
(1404, 'kaluadon', 46, 'Dekhte hi like kar diya instantly', '2025-07-26 08:08:05'),
(1405, 'kaluadon', 46, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:08:05'),
(1406, 'kaluadon', 46, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:08:05'),
(1407, 'kaluadon', 46, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:08:05'),
(1408, 'kaluadon', 46, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:08:05'),
(1409, 'kaluadon', 46, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:08:05'),
(1410, 'kaluadon', 46, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:08:05'),
(1411, 'kaluadon', 46, 'You nailed it boss 💪', '2025-07-26 08:08:05'),
(1412, 'kaluadon', 46, 'Lit 🔥 from start to end', '2025-07-26 08:08:05'),
(1413, 'kaluadon', 46, 'Kya placement hai music ka!', '2025-07-26 08:08:05'),
(1414, 'kaluadon', 46, 'You made my day with this post ❤️', '2025-07-26 08:08:05'),
(1415, 'kaluadon', 46, 'Kya story-telling bhai 💯', '2025-07-26 08:08:05'),
(1416, 'kaluadon', 46, 'Simple and powerful!', '2025-07-26 08:08:05'),
(1417, 'kaluadon', 46, 'Aankhon ka sukoon 😍', '2025-07-26 08:08:05'),
(1418, 'kaluadon', 46, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:08:05'),
(1419, 'kaluadon', 46, 'Apna kamal dikhaya tune', '2025-07-26 08:08:05'),
(1420, 'kaluadon', 46, 'Quality content like always!', '2025-07-26 08:08:05'),
(1421, 'kaluadon', 46, 'Too smooth bro 😎', '2025-07-26 08:08:05'),
(1422, 'kaluadon', 46, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:08:05'),
(1423, 'kaluadon', 46, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:08:05'),
(1424, 'kaluadon', 46, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:08:05'),
(1425, 'kaluadon', 46, 'Har post mein improvement dikhta hai!', '2025-07-26 08:08:05'),
(1426, 'kaluadon', 46, 'Yeh post rewind pe chala diya!', '2025-07-26 08:08:05'),
(1427, 'kaluadon', 46, 'Bhai full marks tujhe 🙌', '2025-07-26 08:08:05'),
(1428, 'kaluadon', 46, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:08:05'),
(1429, 'kaluadon', 46, 'Kya background pick kiya hai!', '2025-07-26 08:08:05'),
(1430, 'kaluadon', 46, 'Hook point toh lajawab hai', '2025-07-26 08:08:05'),
(1431, 'kaluadon', 46, 'Aise hi banaate rehna bhai', '2025-07-26 08:08:05'),
(1432, 'kaluadon', 46, 'Kya humour add kiya hai 🤣', '2025-07-26 08:08:05'),
(1433, 'kaluadon', 46, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:08:05'),
(1434, 'kaluadon', 46, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:08:05'),
(1435, 'kaluadon', 46, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:08:05'),
(1436, 'kaluadon', 46, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:08:05'),
(1437, 'kaluadon', 46, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:08:05'),
(1438, 'kaluadon', 46, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:08:05'),
(1439, 'kaluadon', 46, 'Sirf ek word – EPIC!', '2025-07-26 08:08:05'),
(1440, 'kaluadon', 46, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:08:05'),
(1441, 'kaluadon', 46, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:08:05'),
(1442, 'kaluadon', 46, 'Jabardast storytelling!', '2025-07-26 08:08:05'),
(1443, 'kaluadon', 46, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:08:05'),
(1444, 'kaluadon', 46, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:08:05'),
(1445, 'kaluadon', 46, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:08:05'),
(1446, 'kaluadon', 46, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:08:05'),
(1447, 'kaluadon', 46, 'Next kab aayega bro?', '2025-07-26 08:08:05'),
(1448, 'kaluadon', 46, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:08:05'),
(1449, 'kaluadon', 46, 'Aaj ka sabse best content 🥇', '2025-07-26 08:08:05'),
(1450, 'kaluadon', 46, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:08:05'),
(1451, 'kaluadon', 46, 'Teri vibe alag hi level pe hai', '2025-07-26 08:08:05'),
(1452, 'kaluadon', 46, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:08:05'),
(1453, 'kaluadon', 46, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:08:05'),
(1454, 'kaluadon', 46, 'Sabko tag kar diya bro 😎', '2025-07-26 08:08:05'),
(1455, 'kaluadon', 46, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:08:05'),
(1456, 'kaluadon', 46, 'Tu toh artist nikla 💥', '2025-07-26 08:08:05'),
(1457, 'kaluadon', 46, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:08:05'),
(1458, 'kaluadon', 47, 'Yeh post full fire hai 🔥🔥', '2025-07-26 08:08:17'),
(1459, 'kaluadon', 47, 'Bro aisa content chahiye roz!', '2025-07-26 08:08:17'),
(1460, 'kaluadon', 47, 'Matlab next level stuff 💯', '2025-07-26 08:08:17'),
(1461, 'kaluadon', 47, 'Kya editing hai boss 😮', '2025-07-26 08:08:17'),
(1462, 'kaluadon', 47, 'Threadly ka future bright lag raha hai 👏', '2025-07-26 08:08:17'),
(1463, 'kaluadon', 47, 'This deserves way more views 📈', '2025-07-26 08:08:17'),
(1464, 'kaluadon', 47, 'Kya vibe hai yaar iss reel ki 😍', '2025-07-26 08:08:17'),
(1465, 'kaluadon', 47, 'Pure cinematic feel mil raha hai!', '2025-07-26 08:08:17'),
(1466, 'kaluadon', 47, 'Back to back banger posts 🔥', '2025-07-26 08:08:17'),
(1467, 'kaluadon', 47, 'Kitna mast transition tha!', '2025-07-26 08:08:17'),
(1468, 'kaluadon', 47, 'Bhai tu OP hai 🤌', '2025-07-26 08:08:17'),
(1469, 'kaluadon', 47, 'Raat ko dekhna aur bhi mazedaar lagta hai yeh reel 😎', '2025-07-26 08:08:17'),
(1470, 'kaluadon', 47, 'Music aur timing dono on point 💯', '2025-07-26 08:08:17'),
(1471, 'kaluadon', 47, 'Post dekha aur mood fresh ho gaya!', '2025-07-26 08:08:17'),
(1472, 'kaluadon', 47, 'Ye reel full-on relatable hai 😂', '2025-07-26 08:08:17'),
(1473, 'kaluadon', 47, 'Caption bhi solid tha 🔥', '2025-07-26 08:08:17'),
(1474, 'kaluadon', 47, 'Tu kabhi disappoint nahi karta bhai ❤️', '2025-07-26 08:08:17'),
(1475, 'kaluadon', 47, 'Kis app se banaya? Vibe aa gaya 🤩', '2025-07-26 08:08:17'),
(1476, 'kaluadon', 47, 'Iss level ka creativity chahiye mujhe bhi 🔧', '2025-07-26 08:08:17'),
(1477, 'kaluadon', 47, 'Meme game strong hai 😂🔥', '2025-07-26 08:08:17'),
(1478, 'kaluadon', 47, 'Sabse alag reel dekhi aaj 🔥', '2025-07-26 08:08:17'),
(1479, 'kaluadon', 47, 'Bhai aise hi content daalte raho!', '2025-07-26 08:08:17'),
(1480, 'kaluadon', 47, 'Mood badhiya kar diya isne!', '2025-07-26 08:08:17'),
(1481, 'kaluadon', 47, 'Threadly pe sabse cool reel 👑', '2025-07-26 08:08:17'),
(1482, 'kaluadon', 47, 'Tu toh artist nikla re bhai 🎨', '2025-07-26 08:08:17'),
(1483, 'kaluadon', 47, 'Comment karna zaroori tha 😍', '2025-07-26 08:08:17'),
(1484, 'kaluadon', 47, 'Dekhte hi like kar diya instantly', '2025-07-26 08:08:17'),
(1485, 'kaluadon', 47, 'Itna clean cut reel mazza aa gaya', '2025-07-26 08:08:17'),
(1486, 'kaluadon', 47, 'Kya scene banaya tune 🔥🔥', '2025-07-26 08:08:17'),
(1487, 'kaluadon', 47, 'Lagta hai trending pe jayega yeh', '2025-07-26 08:08:17'),
(1488, 'kaluadon', 47, 'Tumhare post dekhne ka alag hi feel hai ✨', '2025-07-26 08:08:17'),
(1489, 'kaluadon', 47, 'Kal se wait kar raha tha nayi post ka!', '2025-07-26 08:08:17'),
(1490, 'kaluadon', 47, 'Iss vibe ko kya naam doon 😅', '2025-07-26 08:08:17'),
(1491, 'kaluadon', 47, 'You nailed it boss 💪', '2025-07-26 08:08:17'),
(1492, 'kaluadon', 47, 'Lit 🔥 from start to end', '2025-07-26 08:08:17'),
(1493, 'kaluadon', 47, 'Kya placement hai music ka!', '2025-07-26 08:08:17'),
(1494, 'kaluadon', 47, 'You made my day with this post ❤️', '2025-07-26 08:08:17'),
(1495, 'kaluadon', 47, 'Kya story-telling bhai 💯', '2025-07-26 08:08:17'),
(1496, 'kaluadon', 47, 'Simple and powerful!', '2025-07-26 08:08:17'),
(1497, 'kaluadon', 47, 'Aankhon ka sukoon 😍', '2025-07-26 08:08:17'),
(1498, 'kaluadon', 47, 'Main fan ban gaya bhai 🔥', '2025-07-26 08:08:17'),
(1499, 'kaluadon', 47, 'Apna kamal dikhaya tune', '2025-07-26 08:08:17'),
(1500, 'kaluadon', 47, 'Quality content like always!', '2025-07-26 08:08:17'),
(1501, 'kaluadon', 47, 'Too smooth bro 😎', '2025-07-26 08:08:17'),
(1502, 'kaluadon', 47, 'Iss level ki creativity sabke bas ki nahi hai', '2025-07-26 08:08:17'),
(1503, 'kaluadon', 47, 'Asli aesthetic yeh hota hai 🔥', '2025-07-26 08:08:17'),
(1504, 'kaluadon', 47, 'Tu consistently top-notch hai 🔥', '2025-07-26 08:08:17'),
(1505, 'kaluadon', 47, 'Har post mein improvement dikhta hai!', '2025-07-26 08:08:17'),
(1506, 'kaluadon', 47, 'Yeh post rewind pe chala diya!', '2025-07-26 08:08:17'),
(1507, 'kaluadon', 47, 'Bhai full marks tujhe 🙌', '2025-07-26 08:08:17'),
(1508, 'kaluadon', 47, 'Haters ko bhi pasand ayega yeh 😏', '2025-07-26 08:08:17'),
(1509, 'kaluadon', 47, 'Kya background pick kiya hai!', '2025-07-26 08:08:17'),
(1510, 'kaluadon', 47, 'Hook point toh lajawab hai', '2025-07-26 08:08:17'),
(1511, 'kaluadon', 47, 'Aise hi banaate rehna bhai', '2025-07-26 08:08:17'),
(1512, 'kaluadon', 47, 'Kya humour add kiya hai 🤣', '2025-07-26 08:08:17'),
(1513, 'kaluadon', 47, 'Tere reel ka fan ho gaya hun', '2025-07-26 08:08:17'),
(1514, 'kaluadon', 47, 'Editing dekh ke aankhen khul gayi!', '2025-07-26 08:08:17'),
(1515, 'kaluadon', 47, 'Yeh trend tu pehle le aaya 🔥', '2025-07-26 08:08:17'),
(1516, 'kaluadon', 47, 'Kal ki post se aur bhi better 👌', '2025-07-26 08:08:17'),
(1517, 'kaluadon', 47, 'Har din kuch naya dekhne ko milta hai tujse', '2025-07-26 08:08:17'),
(1518, 'kaluadon', 47, 'Thoda aur lamba bana dete 😭', '2025-07-26 08:08:17'),
(1519, 'kaluadon', 47, 'Sirf ek word – EPIC!', '2025-07-26 08:08:17'),
(1520, 'kaluadon', 47, 'Iss post ka vibe copied nahi jaa sakta', '2025-07-26 08:08:17'),
(1521, 'kaluadon', 47, 'Bhai tu mast dimaag use karta hai', '2025-07-26 08:08:17'),
(1522, 'kaluadon', 47, 'Jabardast storytelling!', '2025-07-26 08:08:17'),
(1523, 'kaluadon', 47, 'Mujhe fir se dekhna pada yeh 😍', '2025-07-26 08:08:17'),
(1524, 'kaluadon', 47, 'Kya tempo match kiya hai reel mein!', '2025-07-26 08:08:17'),
(1525, 'kaluadon', 47, 'Doston ke saath share kar diya yeh post!', '2025-07-26 08:08:17'),
(1526, 'kaluadon', 47, 'Bhai mast mast reel, mood ban gaya!', '2025-07-26 08:08:17'),
(1527, 'kaluadon', 47, 'Next kab aayega bro?', '2025-07-26 08:08:17'),
(1528, 'kaluadon', 47, 'Kya watermark bhi style mein dala hai!', '2025-07-26 08:08:17'),
(1529, 'kaluadon', 47, 'Aaj ka sabse best content 🥇', '2025-07-26 08:08:17'),
(1530, 'kaluadon', 47, 'Yeh post pe toh award milna chahiye', '2025-07-26 08:08:17'),
(1531, 'kaluadon', 47, 'Teri vibe alag hi level pe hai', '2025-07-26 08:08:17'),
(1532, 'kaluadon', 47, 'Kitne creative ho yaar 😩💫', '2025-07-26 08:08:17'),
(1533, 'kaluadon', 47, 'Iss post ne dil jeet liya ❤️', '2025-07-26 08:08:17'),
(1534, 'kaluadon', 47, 'Sabko tag kar diya bro 😎', '2025-07-26 08:08:17'),
(1535, 'kaluadon', 47, 'Mazaa aagaya fir se dekh ke', '2025-07-26 08:08:17'),
(1536, 'kaluadon', 47, 'Tu toh artist nikla 💥', '2025-07-26 08:08:17'),
(1537, 'kaluadon', 47, 'Insaan nahi, content machine hai tu 😄', '2025-07-26 08:08:17'),
(1538, 'kaluadon', 59, 'new comment', '2025-07-26 08:45:32');

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `likeid` int(11) NOT NULL,
  `userid` varchar(250) NOT NULL,
  `postid` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`likeid`, `userid`, `postid`, `createdAt`) VALUES
(112, 'kaluadon', 34, '2025-07-22 13:49:13'),
(113, 'kaluadon', 38, '2025-07-22 21:26:26'),
(114, 'kaluadon', 37, '2025-07-23 09:37:18'),
(115, 'kaluadon', 39, '2025-07-23 11:50:20'),
(116, 'kaluadon', 43, '2025-07-23 12:44:32'),
(117, 'kaluadon', 44, '2025-07-23 13:11:47'),
(118, 'kaluadon', 45, '2025-07-23 13:49:37'),
(119, 'kaluadon', 47, '2025-07-23 14:01:40'),
(120, 'kaluadon', 49, '2025-07-23 14:06:52'),
(121, 'kaluadon', 50, '2025-07-23 14:06:54'),
(123, 'kaluadon', 52, '2025-07-23 14:15:22'),
(124, 'kaluadon', 46, '2025-07-23 23:47:39'),
(125, 'kaluadon', 40, '2025-07-23 23:47:45'),
(129, 'kaluadon', 54, '2025-07-24 00:17:13'),
(130, 'kaluadon', 55, '2025-07-24 00:19:29'),
(131, 'kaluadon', 56, '2025-07-24 00:23:09'),
(132, 'kaluadon', 58, '2025-07-24 00:30:24'),
(133, 'kaluadon', 59, '2025-07-24 00:32:17'),
(135, 'kaluadon', 57, '2025-07-24 00:46:53'),
(136, 'kaluadon', 61, '2025-07-24 01:05:54'),
(137, 'Mysterious_being', 56, '2025-07-24 01:06:59'),
(138, 'Mysterious_being', 58, '2025-07-24 01:07:00'),
(139, 'Mysterious_being', 59, '2025-07-24 01:07:01'),
(140, 'Mysterious_being', 60, '2025-07-24 01:07:04'),
(141, 'Mysterious_being', 61, '2025-07-24 01:07:05'),
(142, 'Mysterious_being', 55, '2025-07-24 01:07:32'),
(143, 'Mysterious_being', 47, '2025-07-24 08:26:45'),
(144, 'Mysterious_being', 65, '2025-07-24 08:33:13'),
(145, 'Mysterious_being', 74, '2025-07-24 14:00:40'),
(146, 'Mysterious_being', 75, '2025-07-24 14:00:44'),
(147, 'Mysterious_being', 72, '2025-07-24 14:01:34'),
(148, 'Mysterious_being', 71, '2025-07-24 14:01:45'),
(150, 'Mysterious_being', 54, '2025-07-24 14:06:37'),
(151, 'Mysterious_being', 52, '2025-07-24 14:06:57'),
(152, 'Mysterious_being', 49, '2025-07-24 14:08:22'),
(153, 'Mysterious_being', 46, '2025-07-24 14:08:41'),
(154, 'Mysterious_being', 45, '2025-07-24 14:09:37'),
(155, 'Mysterious_being', 44, '2025-07-24 14:10:01'),
(156, 'Mysterious_being', 76, '2025-07-24 14:17:28'),
(157, 'Mysterious_being', 79, '2025-07-24 14:26:46'),
(158, 'Mysterious_being', 78, '2025-07-24 14:28:21'),
(159, 'Mysterious_being', 77, '2025-07-24 14:28:23'),
(160, 'Mysterious_being', 73, '2025-07-24 14:29:39'),
(161, 'Mysterious_being', 84, '2025-07-24 14:48:40'),
(163, 'Mysterious_being', 117, '2025-07-24 14:56:36'),
(164, 'Mysterious_being', 115, '2025-07-24 14:57:25'),
(165, 'Mysterious_being', 114, '2025-07-24 14:58:00'),
(166, 'kaluadon', 117, '2025-07-24 14:58:24'),
(168, 'Mysterious_being', 113, '2025-07-24 14:59:02'),
(169, 'Mysterious_being', 112, '2025-07-24 14:59:24'),
(170, 'Mysterious_being', 111, '2025-07-24 14:59:57'),
(171, 'Mysterious_being', 110, '2025-07-24 14:59:59'),
(172, 'Mysterious_being', 109, '2025-07-24 15:00:18'),
(173, 'Mysterious_being', 108, '2025-07-24 15:00:29'),
(174, 'Mysterious_being', 107, '2025-07-24 15:01:59'),
(175, 'Mysterious_being', 106, '2025-07-24 15:02:02'),
(176, 'Mysterious_being', 105, '2025-07-24 15:02:14'),
(177, 'Mysterious_being', 104, '2025-07-24 15:02:23'),
(178, 'Mysterious_being', 103, '2025-07-24 15:02:36'),
(179, 'Mysterious_being', 102, '2025-07-24 15:03:01'),
(180, 'Mysterious_being', 101, '2025-07-24 15:03:34'),
(181, 'Mysterious_being', 100, '2025-07-24 15:03:45'),
(182, 'Mysterious_being', 99, '2025-07-24 15:04:03'),
(183, 'Mysterious_being', 98, '2025-07-24 15:05:23'),
(184, 'Mysterious_being', 97, '2025-07-24 15:05:26'),
(185, 'Mysterious_being', 96, '2025-07-24 15:05:36'),
(186, 'Mysterious_being', 95, '2025-07-24 15:05:48'),
(187, 'Mysterious_being', 94, '2025-07-24 15:06:32'),
(188, 'Mysterious_being', 93, '2025-07-24 15:06:48'),
(189, 'Mysterious_being', 92, '2025-07-24 15:07:04'),
(190, 'Mysterious_being', 91, '2025-07-24 15:07:30'),
(191, 'Mysterious_being', 90, '2025-07-24 15:07:35'),
(192, 'Mysterious_being', 88, '2025-07-24 15:08:37'),
(193, 'Mysterious_being', 89, '2025-07-24 15:08:38'),
(194, 'Mysterious_being', 87, '2025-07-24 15:08:53'),
(195, 'Mysterious_being', 86, '2025-07-24 15:08:58'),
(196, 'Mysterious_being', 85, '2025-07-24 15:09:05'),
(197, 'Mysterious_being', 83, '2025-07-24 15:12:18'),
(198, 'Mysterious_being', 82, '2025-07-24 15:12:22'),
(199, 'Mysterious_being', 81, '2025-07-24 15:13:04'),
(200, 'Mysterious_being', 80, '2025-07-24 15:13:17'),
(202, 'Mysterious_being', 67, '2025-07-26 08:09:16'),
(203, 'Mysterious_being', 68, '2025-07-26 08:17:08'),
(204, 'Mysterious_being', 66, '2025-07-26 08:17:57'),
(205, 'Mysterious_being', 38, '2025-07-26 08:18:29'),
(206, 'kaluadon', 91, '2025-07-26 08:21:00'),
(207, 'kaluadon', 114, '2025-07-26 08:22:52'),
(209, 'Mysterious_being', 118, '2025-07-31 13:30:48'),
(210, 'Mysterious_being', 51, '2025-08-02 12:31:34'),
(211, 'Mysterious_being', 39, '2025-08-02 12:31:44'),
(214, 'Mysterious_being', 36, '2025-08-07 16:07:43'),
(215, 'Mysterious_being', 57, '2025-08-07 16:07:46'),
(216, 'Mysterious_being', 121, '2025-08-07 16:26:34'),
(218, 'Mysterious_being', 122, '2025-08-22 21:34:53');

-- --------------------------------------------------------

--
-- Table structure for table `post_shares`
--

CREATE TABLE `post_shares` (
  `shareid` int(11) NOT NULL,
  `sharerid` varchar(250) NOT NULL,
  `sharedto` varchar(250) NOT NULL,
  `postid` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `story`
--

CREATE TABLE `story` (
  `id` int(11) NOT NULL,
  `userid` varchar(250) NOT NULL,
  `storyUrl` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `type` varchar(50) NOT NULL DEFAULT 'image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story`
--

INSERT INTO `story` (`id`, `userid`, `storyUrl`, `createdAt`, `type`) VALUES
(2, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1753875435/a8aogfjbxaoz1gw8ihpe.jpg', '2025-07-30 17:07:17', 'image'),
(3, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1753948605/y0rrflmsldj3ixe5se5t.mp4', '2025-07-31 13:26:46', 'video'),
(4, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1753951396/mynuvpgyjcec4tuq28nk.jpg', '2025-07-31 14:13:17', 'image'),
(5, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754040443/q9l43b8bpryfzhlgkbg9.jpg', '2025-08-01 14:57:24', 'image'),
(6, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754042466/ivpmcbrwchrqnccmawxz.jpg', '2025-08-01 15:31:07', 'image'),
(7, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754048057/rcsmvl92oaxpoj99zviy.jpg', '2025-08-01 17:04:18', 'image'),
(8, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1754052845/qss5karcmuouket7eca8.mp4', '2025-08-01 18:24:07', 'video'),
(9, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1754114122/rhhbojg79tjgzeo4m1by.mp4', '2025-08-02 11:25:24', 'video'),
(10, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1754200285/y47775tntsizeshlhuhi.mp4', '2025-08-03 11:21:27', 'video'),
(11, 'kaluadon', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1754201178/cqy5rshufuk59oqlpqox.mp4', '2025-08-03 11:36:20', 'video'),
(12, 'Rashid1754204756714', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754207267/lpehbumzivk38m2pl45b.jpg', '2025-08-03 13:17:48', 'image'),
(13, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1754395621/ogtim4dttxyhegdb56b3.mp4', '2025-08-05 17:37:05', 'video'),
(14, 'Rashid1754204756714', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754397308/lcmqbpvfiueg5olvvdge.jpg', '2025-08-05 18:05:12', 'image'),
(15, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1754564967/yq344gdhrz1pil4n4lvy.mp4', '2025-08-07 16:39:29', 'video'),
(17, 'Mysterious_being', 'https://res.cloudinary.com/dphwlcyhg/video/upload/v1755947289/k51mrmabwcpkixbfh1gy.mp4', '2025-08-23 16:38:12', 'video');

-- --------------------------------------------------------

--
-- Table structure for table `story_likes`
--

CREATE TABLE `story_likes` (
  `likeid` int(11) NOT NULL,
  `userid` varchar(250) NOT NULL,
  `storyid` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_likes`
--

INSERT INTO `story_likes` (`likeid`, `userid`, `storyid`, `createdAt`) VALUES
(1, 'mysterious_being', 5, '2025-08-01 17:00:27'),
(2, 'Mysterious_being', 6, '2025-08-01 17:57:42'),
(4, 'kaluadon', 7, '2025-08-02 11:09:06'),
(5, 'kaluadon', 8, '2025-08-02 11:20:39'),
(8, 'Mysterious_being', 10, '2025-08-03 11:22:09'),
(9, 'Mysterious_being', 11, '2025-08-03 12:14:12'),
(10, 'Rashid1754204756714', 10, '2025-08-03 13:22:52'),
(11, 'Rashid1754204756714', 11, '2025-08-03 13:23:13'),
(12, 'Mysterious_being', 13, '2025-08-05 17:58:17'),
(13, 'Rashid1754204756714', 13, '2025-08-05 18:01:57'),
(14, 'Mysterious_being', 15, '2025-08-07 16:39:47'),
(15, 'kaluadon', 17, '2025-08-23 16:40:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` varchar(250) NOT NULL,
  `username` text NOT NULL,
  `email` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `pass` text NOT NULL,
  `bio` text NOT NULL DEFAULT 'I use threadly daily',
  `profilepic` text DEFAULT NULL,
  `dob` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `email`, `phone`, `pass`, `bio`, `profilepic`, `dob`, `createdAt`) VALUES
('anothermia', 'goldenBhai', NULL, '8229096694', '$2b$10$dYLJsDctmgWSwQDchUShwOWScsYWb1uhLS6JlM0mh2gSKiJdB8Q6q', 'i am a gpgrammer', NULL, '0000-00-00', '2025-05-15 01:24:48'),
('kaluadon', 'Rani', 'rtechdevlopment123@gmail.com', NULL, '$2b$12$a9xomUz7XKvn/BYKgiXJD.1RjeKoFbEgoZNR9rUXY8c/HM1bg4zlq', '💻 Dev Vibe:\nAndroid dev ⚙️ | Java ❤️ | Building things that matter\n🎧 Soft + Poetic:\nCode in my veins, silence in my soul 🌌\n🔥 Flirty + Cool', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754564929/exliaf9par4b8yjvdtrn.jpg', '2025-06-01', '2025-06-22 15:31:49'),
('Mysterious_being', 'mysterious devil', NULL, '9123481953', '$2a$10$rKG82muePaAXJNpXstVW0.GDeX8jtn1Dfq8FGSN4F40HeRVyk3Azm', '💻 Android Dev 💥\n ☕ Java Junkie \n 🚀 Dreamin’ big, building bigger\n ⚡ Hustle > Hype\n🧠 Engineer Mode: ON', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754564883/vziiwfxvnrj3ouhwcq42.png', '2025-05-11', '2025-05-11 23:00:44'),
('Rashid1754204756714', 'Rashid', 'thefoodiebroofficial@gmail.com', NULL, '$2b$12$tf8hDQETg5Ip0fo1PvTeoe7ipFi/bJ1euzzosO16nkkHAIYwmWuim', 'I use threadly daily', 'https://res.cloudinary.com/dphwlcyhg/image/upload/v1754207240/epp3xssyiscaxwz9tmxr.jpg', '2025-08-03', '2025-08-03 12:35:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD PRIMARY KEY (`comment_like_id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `commentid` (`commentid`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followid`),
  ADD KEY `followerid` (`followerid`),
  ADD KEY `followingid` (`followingid`);

--
-- Indexes for table `imagepost`
--
ALTER TABLE `imagepost`
  ADD PRIMARY KEY (`postid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`commentid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `postid` (`postid`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`likeid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `postid` (`postid`);

--
-- Indexes for table `post_shares`
--
ALTER TABLE `post_shares`
  ADD PRIMARY KEY (`shareid`),
  ADD KEY `sharerid` (`sharerid`),
  ADD KEY `sharedto` (`sharedto`),
  ADD KEY `postid` (`postid`);

--
-- Indexes for table `story`
--
ALTER TABLE `story`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `story_likes`
--
ALTER TABLE `story_likes`
  ADD PRIMARY KEY (`likeid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `storyid` (`storyid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD UNIQUE KEY `phone` (`phone`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment_likes`
--
ALTER TABLE `comment_likes`
  MODIFY `comment_like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `imagepost`
--
ALTER TABLE `imagepost`
  MODIFY `postid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `commentid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1540;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `likeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=219;

--
-- AUTO_INCREMENT for table `post_shares`
--
ALTER TABLE `post_shares`
  MODIFY `shareid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `story`
--
ALTER TABLE `story`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `story_likes`
--
ALTER TABLE `story_likes`
  MODIFY `likeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`commentid`) REFERENCES `post_comments` (`commentid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`followerid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followingid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `imagepost`
--
ALTER TABLE `imagepost`
  ADD CONSTRAINT `imagepost_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `imagepost` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `imagepost` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_shares`
--
ALTER TABLE `post_shares`
  ADD CONSTRAINT `post_shares_ibfk_1` FOREIGN KEY (`sharerid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_shares_ibfk_2` FOREIGN KEY (`sharedto`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_shares_ibfk_3` FOREIGN KEY (`postid`) REFERENCES `imagepost` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `story`
--
ALTER TABLE `story`
  ADD CONSTRAINT `story_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `story_likes`
--
ALTER TABLE `story_likes`
  ADD CONSTRAINT `story_likes_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `story_likes_ibfk_2` FOREIGN KEY (`storyid`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
