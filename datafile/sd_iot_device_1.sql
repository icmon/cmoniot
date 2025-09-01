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

 Date: 10/07/2025 14:08:47
*/


-- ----------------------------
-- Table structure for sd_iot_device
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device";
CREATE TABLE "public"."sd_iot_device" (
  "device_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_device_id_seq'::regclass),
  "setting_id" int4,
  "type_id" int4,
  "location_id" int4,
  "device_name" varchar(255) COLLATE "pg_catalog"."default",
  "sn" varchar(255) COLLATE "pg_catalog"."default",
  "hardware_id" int4,
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "time_life" int4,
  "period" varchar(150) COLLATE "pg_catalog"."default",
  "work_status" int4,
  "max" varchar(150) COLLATE "pg_catalog"."default",
  "min" varchar(150) COLLATE "pg_catalog"."default",
  "model" varchar(255) COLLATE "pg_catalog"."default",
  "vendor" varchar(255) COLLATE "pg_catalog"."default",
  "comparevalue" varchar(255) COLLATE "pg_catalog"."default",
  "unit" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_id" int4,
  "oid" varchar(255) COLLATE "pg_catalog"."default",
  "action_id" int4,
  "status_alert_id" int4,
  "mqtt_data_value" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_data_control" varchar(255) COLLATE "pg_catalog"."default",
  "measurement" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_control_on" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_control_off" varchar(255) COLLATE "pg_catalog"."default",
  "org" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "bucket" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4,
  "mqtt_device_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_status_over_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_status_data_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_act_relay_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_control_relay_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_iot_device
-- ----------------------------
INSERT INTO "public"."sd_iot_device" VALUES (169, 1, 2, 1, 'Fan1', 'Cmom-2', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW01', 0, 'fan1', 'overFan1', 'actRelay1', 'actRelay1', 'contRelay1', '2025-07-10 07:07:20.571022', '2025-07-10 07:07:20.571022');
INSERT INTO "public"."sd_iot_device" VALUES (168, 1, 1, 1, 'Temperature', 'Cmom-1', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', -1, 0, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW01', 0, 'temperature', 'overFan1', 'actRelay1', 'actRelay1', 'contRelay1', '2025-07-10 07:04:27.730318', '2025-07-10 07:04:27.730318');

-- ----------------------------
-- Primary Key structure for table sd_iot_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_device" ADD CONSTRAINT "PK_841e36ab4b8edbaa5363d65f18d" PRIMARY KEY ("device_id");
