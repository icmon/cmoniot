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

 Date: 10/07/2025 02:58:56
*/


-- ----------------------------
-- Table structure for sd_iot_mqtt
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_mqtt";
CREATE TABLE "public"."sd_iot_mqtt" (
  "mqtt_id" int4 NOT NULL DEFAULT nextval('sd_iot_mqtt_mqtt_id_seq'::regclass),
  "mqtt_type_id" int4,
  "sort" int4 NOT NULL DEFAULT 1,
  "mqtt_name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "port" int4 NOT NULL,
  "username" varchar COLLATE "pg_catalog"."default",
  "password" varchar COLLATE "pg_catalog"."default",
  "secret" varchar COLLATE "pg_catalog"."default",
  "expire_in" varchar COLLATE "pg_catalog"."default",
  "token_value" varchar COLLATE "pg_catalog"."default",
  "org" varchar COLLATE "pg_catalog"."default",
  "bucket" varchar COLLATE "pg_catalog"."default",
  "envavorment" varchar COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4 NOT NULL DEFAULT 1,
  "location_id" int4 DEFAULT 1
)
;
