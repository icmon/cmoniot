/*
 Navicat Premium Dump SQL

 Source Server         : SQLite-cmoniot
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 28/05/2025 12:59:48
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS "product";
CREATE TABLE "product" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "type_id" INTEGER,
  "title" VARCHAR(255),
  "description" VARCHAR(255),
  "price" VARCHAR(255),
  "createdAt" DATETIME NOT NULL,
  "updatedAt" DATETIME NOT NULL,
  "status" integer(2) DEFAULT 1,
  FOREIGN KEY ("type_id") REFERENCES "product_type" ("type_id") ON DELETE NO ACTION ON UPDATE CASCADE
);

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO "product" VALUES (1, 1, 'Temperature sensor', 'Temperature sensor Mqtt', '1500', '2025-05-21 05:35:47.042 +00:00', '2025-05-21 05:36:17.091 +00:00', 1);
INSERT INTO "product" VALUES (2, 1, 'Humidity sensor', 'Humidity sensor Mqtt', '2500', '2025-05-21 05:40:10.381 +00:00', '2025-05-21 05:40:10.381 +00:00', 1);

-- ----------------------------
-- Table structure for product_type
-- ----------------------------
DROP TABLE IF EXISTS "product_type";
CREATE TABLE "product_type" (
  "type_id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "type_name" VARCHAR(255),
  "description" VARCHAR(255),
  "createdAt" DATETIME NOT NULL,
  "updatedAt" DATETIME NOT NULL
);

-- ----------------------------
-- Records of product_type
-- ----------------------------
INSERT INTO "product_type" VALUES (1, 'Sensor', 'Sensor Cmon', '2025-05-21 05:34:48.081 +00:00', '2025-05-21 05:34:48.081 +00:00');

-- ----------------------------
-- Table structure for sd_token
-- ----------------------------
DROP TABLE IF EXISTS "sd_token";
CREATE TABLE "sd_token" (
  "token" TEXT,
  "system" TEXT(255) DEFAULT API,
  "createdAt" DATETIME
);

-- ----------------------------
-- Records of sd_token
-- ----------------------------
INSERT INTO "sd_token" VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNDkzZTc0LWNkYzMtNDA2MC04ZGIyLTIyMDQ2M2E4MGYyMCIsImlhdCI6MTc0ODE2NzIyOCwiZXhwIjoxNzc5NzAzMjI4fQ.A4fXu7LztXou4i0GxY7JFzumzrH3LdpcyOL34oShFRQ', 'login', '2025-05-25 100:00:28');
INSERT INTO "sd_token" VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNDkzZTc0LWNkYzMtNDA2MC04ZGIyLTIyMDQ2M2E4MGYyMCIsImlhdCI6MTc0ODI0MzQ0MSwiZXhwIjoxNzc5Nzc5NDQxfQ.kgSYGFUlEsJqwdUd1cpqpOfeFH9gUCSCnJdT4lBOTdc', 'login', '2025-05-26 070:10:42');
INSERT INTO "sd_token" VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNDkzZTc0LWNkYzMtNDA2MC04ZGIyLTIyMDQ2M2E4MGYyMCIsImlhdCI6MTc0ODMxNDQ1NSwiZXhwIjoxNzc5ODUwNDU1fQ.VZHDa5JwfuOAwjSW2poDNYdSUzpKct7bBe2VXKKnRFM', 'login', '2025-05-27 020:54:15');

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE "sqlite_sequence" (
  "name",
  "seq"
);

-- ----------------------------
-- Records of sqlite_sequence
-- ----------------------------
INSERT INTO "sqlite_sequence" VALUES ('product_type', 1);
INSERT INTO "sqlite_sequence" VALUES ('product', 2);

-- ----------------------------
-- Auto increment value for product
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 2 WHERE name = 'product';

-- ----------------------------
-- Auto increment value for product_type
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 1 WHERE name = 'product_type';

PRAGMA foreign_keys = true;
