/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : dangdang

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2020-08-03 22:17:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `dangdanggoods`
-- ----------------------------
DROP TABLE IF EXISTS `dangdanggoods`;
CREATE TABLE `dangdanggoods` (
  `sid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(999) NOT NULL,
  `title` varchar(200) NOT NULL,
  `price` float(7,2) NOT NULL,
  `piclisturl` varchar(999) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dangdanggoods
-- ----------------------------
INSERT INTO `dangdanggoods` VALUES ('1', 'http://img3m5.ddimg.cn/56/4/23761145-1_h_6.jpg', '人间失格（日本小说家太宰治的自传体小说，李现推荐）', '18.80', null);
INSERT INTO `dangdanggoods` VALUES ('2', 'http://img3m7.ddimg.cn/10/25/28993447-1_h_12.jpg', '刑法学讲义（火爆全网，罗翔讲刑法，通俗有趣，900万人学到上头，收获生活中的法律智慧。人民日报、央视网联合推荐）', '46.90', null);
INSERT INTO `dangdanggoods` VALUES ('3', 'http://img3m2.ddimg.cn/0/27/28473192-1_h_3.jpg', '你当像鸟飞往你的山（比尔·盖茨年度特别推荐，登顶《纽约时报》畅销榜80 周！多一个人读到这个真实故事，就多一个人勇敢做自己！）', '59.00', null);
INSERT INTO `dangdanggoods` VALUES ('4', 'http://img3m4.ddimg.cn/32/35/23579654-1_h_6.jpg', '三体：全三册 刘慈欣代表作，亚洲首部“雨果奖”获奖作品！', '93.00', null);
INSERT INTO `dangdanggoods` VALUES ('5', 'http://img3m0.ddimg.cn/7/27/25137790-1_h_4.jpg', '活着（荣获中国版权金奖.作品奖版本，销量逾千万册）', '26.90', null);
INSERT INTO `dangdanggoods` VALUES ('6', 'http://img3m0.ddimg.cn/42/10/24180990-1_h_4.jpg', '冬之旅：万方剧本精选集（肖战推荐，曹禺诞辰110周年推荐）', '20.90', null);
INSERT INTO `dangdanggoods` VALUES ('7', 'http://img3m6.ddimg.cn/76/35/23427436-1_h_6.jpg', '《写给儿童的中国历史》（全彩铜版14册）中国孩子历史启蒙首选书，连续六年当当童书榜历史类图书状元！加印30次，累销1800万本，读者好评《写给儿童的中国历史》（全彩铜版14册）中国孩子历史启蒙首选书，', '301.80', null);
INSERT INTO `dangdanggoods` VALUES ('8', 'http://img3m5.ddimg.cn/26/14/25238195-1_h_3.jpg', '追风筝的人（2018年新版）', '34.50', null);
INSERT INTO `dangdanggoods` VALUES ('9', 'http://img3m0.ddimg.cn/61/3/23444350-1_h_4.jpg', '神奇校车·桥梁书版（全20册）', '142.50', null);
INSERT INTO `dangdanggoods` VALUES ('10', 'http://img3m1.ddimg.cn/66/15/24175371-1_h_111.jpg', '作家榜经典：月亮与六便士（荣获2019当当名著销量桂冠！2017豆瓣阅', '9.90', null);
INSERT INTO `dangdanggoods` VALUES ('11', 'http://img3m1.ddimg.cn/31/4/20039611-1_h_9.jpg', '小熊和最好的爸爸（全7册）', '33.30', null);
INSERT INTO `dangdanggoods` VALUES ('12', 'http://img3m6.ddimg.cn/14/34/28994936-1_h_4.jpg', '晚熟的人（莫言新书）', '29.50', null);
INSERT INTO `dangdanggoods` VALUES ('13', 'http://img3m9.ddimg.cn/77/23/25295369-1_h_20.jpg', '云边有个小卖部（陆定昊诚挚推荐，随书附赠云边镇四季明信片和张嘉佳作词单曲彩蛋）', '21.00', null);
INSERT INTO `dangdanggoods` VALUES ('14', 'http://img3m6.ddimg.cn/83/20/25138856-1_h_2.jpg', '马尔克斯：百年孤独（50周年纪念版）', '38.00', null);
INSERT INTO `dangdanggoods` VALUES ('15', 'http://img3m8.ddimg.cn/82/19/25252408-1_h_22.jpg', '神奇校车·图画书版（全12册，新增科学博览会1册）', '188.10', null);
INSERT INTO `dangdanggoods` VALUES ('16', 'http://img3m1.ddimg.cn/80/1/23778791-1_h_10.jpg', '少年读史记（套装全5册）', '100.00', null);
INSERT INTO `dangdanggoods` VALUES ('17', 'http://img3m9.ddimg.cn/25/29/25246609-1_h_1.jpg', '乌合之众 : 大众心理研究', '19.50', null);
INSERT INTO `dangdanggoods` VALUES ('18', 'http://img3m8.ddimg.cn/60/20/28984488-1_h_13.jpg', '【薇娅推荐】 一个人就一个人（2020刘同全新作品。很少有人像他一样时刻记录生活，细碎、日常、温暖。）', '34.40', null);
INSERT INTO `dangdanggoods` VALUES ('19', 'http://img3m3.ddimg.cn/68/20/23271503-1_h_18.jpg', '断舍离', '25.90', null);
INSERT INTO `dangdanggoods` VALUES ('20', 'http://img3m2.ddimg.cn/41/25/25090502-1_h_5.jpg', '平凡的世界：全三册（故事里的中国推荐，八年级下册自主阅读推荐）', '74.50', null);
INSERT INTO `dangdanggoods` VALUES ('21', 'http://img3m2.ddimg.cn/62/32/25119332-1_h_11.jpg', '东野圭吾：白夜行（易烊千玺、孟非推荐，东野圭吾作品无冕之王）', '59.60', null);
INSERT INTO `dangdanggoods` VALUES ('22', 'http://img3m5.ddimg.cn/51/34/26921715-1_h_2.jpg', '人生海海（麦家重磅力作，莫言盛赞，发行量超150万册，豆瓣2019年度中国小说榜TOP·1）', '38.00', null);
INSERT INTO `dangdanggoods` VALUES ('23', 'http://img3m6.ddimg.cn/66/10/25272786-1_h_3.jpg', '窗边的小豆豆(2018版)', '32.90', null);
INSERT INTO `dangdanggoods` VALUES ('24', 'http://img3m1.ddimg.cn/34/22/28996441-1_h_3.jpg', '某某（当当专享：2张添望Q版折卡+望仔同学录透卡+温暖小剧场+“考试必过”书签+《某某》读者综合测试卷）', '34.40', null);
