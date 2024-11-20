/*
 Navicat Premium Dump SQL

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 90001 (9.0.1)
 Source Host           : localhost:3306
 Source Schema         : vue3-admin

 Target Server Type    : MySQL
 Target Server Version : 90001 (9.0.1)
 File Encoding         : 65001

 Date: 22/10/2024 12:08:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `type` int DEFAULT '1' COMMENT '权限类型：菜单',
  `title` varchar(255) NOT NULL COMMENT '标题名称',
  `path` varchar(255) DEFAULT NULL COMMENT 'url地址',
  `icon` varchar(255) DEFAULT NULL COMMENT 'icon名称',
  `name` varchar(255) DEFAULT NULL COMMENT '路由name',
  `sort_id` int NOT NULL COMMENT '排序权重',
  `parent_id` int DEFAULT NULL COMMENT '父id',
  `status` int DEFAULT '1' COMMENT '状态 0禁止 1正常',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of access
-- ----------------------------
BEGIN;
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (34, 1, 'documentation', '/documentation', 'ant-design:database-filled', 'documentation', 0, 0, 1, NULL, '2024-10-20 20:04:53', '2024-10-20 20:04:53');
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (35, 1, 'documentation', '/documentation/index', 'ant-design:database-filled', 'documentationIndex', 0, 34, 1, NULL, '2024-10-20 20:05:44', '2024-10-20 20:05:44');
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (36, 1, 'guide', '/guide/index', 'ant-design:car-twotone', 'guide', 1, 0, 1, NULL, '2024-10-20 20:08:20', '2024-10-20 20:14:51');
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (37, 1, 'system', '/system', 'ant-design:unlock-filled', 'system', 2, 0, 1, NULL, '2024-10-20 20:08:53', '2024-10-20 20:08:53');
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (38, 1, 'menu', '/system/menu', 'ant-design:unlock-filled', 'menu', 0, 37, 1, NULL, '2024-10-20 20:09:14', '2024-10-20 20:09:14');
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (39, 1, 'user', '/system/user', 'ant-design:unlock-filled', 'user', 1, 37, 1, NULL, '2024-10-20 20:09:48', '2024-10-20 20:09:48');
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (40, 1, 'role', '/system/role', 'ant-design:unlock-filled', 'role', 2, 37, 1, NULL, '2024-10-20 20:10:14', '2024-10-20 20:11:17');
INSERT INTO `access` (`id`, `type`, `title`, `path`, `icon`, `name`, `sort_id`, `parent_id`, `status`, `description`, `createdAt`, `updatedAt`) VALUES (41, 1, 'external-link', 'http://www.baidu.com', 'ant-design:link-outlined', 'link Baidu', 3, 0, 1, NULL, '2024-10-20 20:10:50', '2024-10-20 20:10:50');
COMMIT;

-- ----------------------------
-- Table structure for r_a
-- ----------------------------
DROP TABLE IF EXISTS `r_a`;
CREATE TABLE `r_a` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `access_id` int DEFAULT NULL COMMENT '外键 关联access表id',
  `role_id` int DEFAULT NULL COMMENT '外键 关联roles表id',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `r_a_role_id_access_id_unique` (`access_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `r_a_ibfk_15` FOREIGN KEY (`access_id`) REFERENCES `access` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `r_a_ibfk_16` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of r_a
-- ----------------------------
BEGIN;
INSERT INTO `r_a` (`id`, `access_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (73, 37, 2, '2024-10-20 22:34:13', '2024-10-20 22:34:13');
INSERT INTO `r_a` (`id`, `access_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (74, 34, 2, '2024-10-20 22:34:13', '2024-10-20 22:34:13');
INSERT INTO `r_a` (`id`, `access_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (75, 35, 2, '2024-10-20 22:34:13', '2024-10-20 22:34:13');
INSERT INTO `r_a` (`id`, `access_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (76, 36, 2, '2024-10-20 22:34:13', '2024-10-20 22:34:13');
INSERT INTO `r_a` (`id`, `access_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (77, 39, 2, '2024-10-20 22:34:13', '2024-10-20 22:34:13');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '角色 id',
  `name` varchar(255) NOT NULL COMMENT '角色名称 唯一',
  `description` varchar(255) DEFAULT NULL COMMENT '说明描述',
  `is_default` int DEFAULT '1' COMMENT '默认角色 1是 0不是',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `name`, `description`, `is_default`, `createdAt`, `updatedAt`) VALUES (1, 'super_admin', '超级管理员', 0, '2024-10-08 16:36:06', '2024-10-17 22:30:01');
INSERT INTO `role` (`id`, `name`, `description`, `is_default`, `createdAt`, `updatedAt`) VALUES (2, 'user', '普通管理员', 1, '2024-10-08 16:31:46', '2024-10-08 16:31:49');
INSERT INTO `role` (`id`, `name`, `description`, `is_default`, `createdAt`, `updatedAt`) VALUES (3, 'op1', '运营', 1, '2024-10-08 16:32:26', '2024-10-17 22:16:39');
COMMIT;

-- ----------------------------
-- Table structure for u_r
-- ----------------------------
DROP TABLE IF EXISTS `u_r`;
CREATE TABLE `u_r` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int DEFAULT NULL COMMENT '外键 关联user表id',
  `role_id` int DEFAULT NULL COMMENT '外键 关联roles表id',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `u_r_user_id_role_id_unique` (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `u_r_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `u_r_ibfk_16` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of u_r
-- ----------------------------
BEGIN;
INSERT INTO `u_r` (`id`, `user_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (7, 8, 1, '2024-10-12 00:50:35', '2024-10-12 00:50:35');
INSERT INTO `u_r` (`id`, `user_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (27, 6, 1, '2024-10-20 10:45:29', '2024-10-20 10:45:29');
INSERT INTO `u_r` (`id`, `user_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (28, 6, 2, '2024-10-20 10:45:29', '2024-10-20 10:45:29');
INSERT INTO `u_r` (`id`, `user_id`, `role_id`, `createdAt`, `updatedAt`) VALUES (30, 15, 2, '2024-10-20 22:29:34', '2024-10-20 22:29:34');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `email` varchar(255) DEFAULT NULL COMMENT '用户邮箱',
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机号',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `description` varchar(255) DEFAULT NULL COMMENT '描述说明',
  `isSuper` tinyint(1) DEFAULT '0' COMMENT '超级管理员 1是 0不是',
  `status` tinyint(1) DEFAULT '1' COMMENT '账户禁用状态 1正常 0禁用',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `mobile`, `avatar`, `description`, `isSuper`, `status`, `createdAt`, `updatedAt`) VALUES (6, '1234', '78b4a34d1bf178331e58b1026a83bfc42606e4d3', '1035465284@qq.com', '18310349227', NULL, 'asd', 0, 1, '2024-10-12 00:50:25', '2024-10-20 10:45:29');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `mobile`, `avatar`, `description`, `isSuper`, `status`, `createdAt`, `updatedAt`) VALUES (8, '123456', '78b4a34d1bf178331e58b1026a83bfc42606e4d3', '1035465284@qq.com', '18310349227', NULL, NULL, 0, 1, '2024-10-12 00:50:35', '2024-10-12 00:50:35');
INSERT INTO `user` (`id`, `username`, `password`, `email`, `mobile`, `avatar`, `description`, `isSuper`, `status`, `createdAt`, `updatedAt`) VALUES (15, '111', 'e8f03035d34b1cf9233efbc2367821f58e6de7d0', '1035465284@qq.com', '15321715751', NULL, 'aa', 0, 1, '2024-10-20 22:29:34', '2024-10-20 22:29:34');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
