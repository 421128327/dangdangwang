/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : dangdang

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2020-08-07 09:33:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `registry`
-- ----------------------------
DROP TABLE IF EXISTS `registry`;
CREATE TABLE `registry` (
  `sid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of registry
-- ----------------------------
INSERT INTO `registry` VALUES ('1', 'jqzh', '1b40534216f70f93bfc1ea85fcafb1d508203250', 'jqzh@163.com', '2020-08-06 16:36:06');
INSERT INTO `registry` VALUES ('2', 'jqzh1', '1b40534216f70f93bfc1ea85fcafb1d508203250', 'jqzh@163.com', '2020-08-06 16:39:01');
INSERT INTO `registry` VALUES ('3', 'jqzh123', '1b40534216f70f93bfc1ea85fcafb1d508203250', 'jqzh@163.com', '2020-08-06 16:41:06');
INSERT INTO `registry` VALUES ('4', 'jqzh1234', '1b40534216f70f93bfc1ea85fcafb1d508203250', 'jqzh@163.com', '2020-08-06 20:54:16');
