/*
 Navicat Premium Dump SQL

 Source Server         : docker postgres 127.0.0.1 -192.168.1.59
 Source Server Type    : PostgreSQL
 Source Server Version : 150013 (150013)
 Source Host           : 127.0.0.1:5434
 Source Catalog        : nest_cmon
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150013 (150013)
 File Encoding         : 65001

 Date: 10/07/2025 02:58:22
*/


-- ----------------------------
-- Table structure for sd_iot_location
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_location";
CREATE TABLE "public"."sd_iot_location" (
  "location_id" int4 NOT NULL DEFAULT nextval('sd_iot_location_location_id_seq'::regclass),
  "location_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ipaddress" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "location_detail" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4,
  "configdata" text COLLATE "pg_catalog"."default"
)
;
