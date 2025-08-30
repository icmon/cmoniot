/*
 Navicat Premium Dump SQL

 Source Server         : 127.0.0.1
 Source Server Type    : PostgreSQL
 Source Server Version : 150013 (150013)
 Source Host           : 127.0.0.1:5434
 Source Catalog        : nest_cmon
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150013 (150013)
 File Encoding         : 65001

 Date: 17/08/2025 23:45:33
*/


-- ----------------------------
-- Type structure for user_role_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."user_role_enum";
CREATE TYPE "public"."user_role_enum" AS ENUM (
  'SUPERADMIN',
  'ADMIN',
  'EDITOR',
  'MONITOR',
  'USER'
);
ALTER TYPE "public"."user_role_enum" OWNER TO "postgres";

-- ----------------------------
-- Type structure for user_usertype_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."user_usertype_enum";
CREATE TYPE "public"."user_usertype_enum" AS ENUM (
  'therapist',
  'supervisor',
  'superadmin',
  'system',
  'admin',
  'support',
  'enduser'
);
ALTER TYPE "public"."user_usertype_enum" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for sd_admin_access_menu_admin_access_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_admin_access_menu_admin_access_id_seq";
CREATE SEQUENCE "public"."sd_admin_access_menu_admin_access_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_admin_access_menu_admin_access_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_admin_access_menu_admin_access_id_seq1";
CREATE SEQUENCE "public"."sd_admin_access_menu_admin_access_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_admin_access_menu_admin_access_id_seq2
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_admin_access_menu_admin_access_id_seq2";
CREATE SEQUENCE "public"."sd_admin_access_menu_admin_access_id_seq2" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_log_id_seq";
CREATE SEQUENCE "public"."sd_device_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_api_api_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_api_api_id_seq";
CREATE SEQUENCE "public"."sd_iot_api_api_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_action_device_action_user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_action_device_action_user_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_action_device_action_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_action_log_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_action_log_log_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_action_log_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_action_user_device_action_user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_action_user_device_action_user_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_action_user_device_action_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_alarm_action_alarm_action_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_alarm_action_alarm_action_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_alarm_action_alarm_action_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq1";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq2
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq2";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq2" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq3
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq3";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq3" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq4
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq4";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq4" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq5
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq5";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq5" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq6
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq6";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq6" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq7
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq7";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq7" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq8
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq8";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq8" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_type_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_type_type_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_type_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_email_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_email_id_seq";
CREATE SEQUENCE "public"."sd_iot_email_email_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_email_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_email_id_seq1";
CREATE SEQUENCE "public"."sd_iot_email_email_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_host_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_host_id_seq";
CREATE SEQUENCE "public"."sd_iot_email_host_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_host_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_host_id_seq1";
CREATE SEQUENCE "public"."sd_iot_email_host_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_group_group_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_group_group_id_seq";
CREATE SEQUENCE "public"."sd_iot_group_group_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_group_group_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_group_group_id_seq1";
CREATE SEQUENCE "public"."sd_iot_group_group_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_influxdb_influxdb_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_influxdb_influxdb_id_seq";
CREATE SEQUENCE "public"."sd_iot_influxdb_influxdb_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_line_line_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_line_line_id_seq";
CREATE SEQUENCE "public"."sd_iot_line_line_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_location_location_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_location_location_id_seq";
CREATE SEQUENCE "public"."sd_iot_location_location_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_location_location_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_location_location_id_seq1";
CREATE SEQUENCE "public"."sd_iot_location_location_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq1";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq2
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq2";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq2" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq3
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq3";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq3" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq4
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq4";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq4" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq5
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq5";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq5" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq6
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq6";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq6" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq7
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq7";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq7" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq8
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq8";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq8" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_nodered_nodered_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_nodered_nodered_id_seq";
CREATE SEQUENCE "public"."sd_iot_nodered_nodered_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_schedule_schedule_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_schedule_schedule_id_seq";
CREATE SEQUENCE "public"."sd_iot_schedule_schedule_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_sensor_sensor_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_sensor_sensor_id_seq";
CREATE SEQUENCE "public"."sd_iot_sensor_sensor_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_sensor_sensor_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_sensor_sensor_id_seq1";
CREATE SEQUENCE "public"."sd_iot_sensor_sensor_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_setting_setting_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_setting_setting_id_seq";
CREATE SEQUENCE "public"."sd_iot_setting_setting_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_setting_setting_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_setting_setting_id_seq1";
CREATE SEQUENCE "public"."sd_iot_setting_setting_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_sms_sms_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_sms_sms_id_seq";
CREATE SEQUENCE "public"."sd_iot_sms_sms_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_telegram_telegram_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_telegram_telegram_id_seq";
CREATE SEQUENCE "public"."sd_iot_telegram_telegram_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_token_token_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_token_token_id_seq";
CREATE SEQUENCE "public"."sd_iot_token_token_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_type_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_type_type_id_seq";
CREATE SEQUENCE "public"."sd_iot_type_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_type_type_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_type_type_id_seq1";
CREATE SEQUENCE "public"."sd_iot_type_type_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_access_menu_user_access_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_access_menu_user_access_id_seq";
CREATE SEQUENCE "public"."sd_user_access_menu_user_access_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_file_file_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_file_file_id_seq";
CREATE SEQUENCE "public"."sd_user_file_file_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_file_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_file_id_seq";
CREATE SEQUENCE "public"."sd_user_file_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_file_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_file_id_seq1";
CREATE SEQUENCE "public"."sd_user_file_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_log_id_seq";
CREATE SEQUENCE "public"."sd_user_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_log_type_log_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_log_type_log_type_id_seq";
CREATE SEQUENCE "public"."sd_user_log_type_log_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_role_id_seq";
CREATE SEQUENCE "public"."sd_user_role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for sd_admin_access_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_admin_access_menu";
CREATE TABLE "public"."sd_admin_access_menu" (
  "admin_access_id" int4 NOT NULL DEFAULT nextval('sd_admin_access_menu_admin_access_id_seq'::regclass),
  "admin_type_id" int4,
  "admin_menu_id" int4
)
;

-- ----------------------------
-- Records of sd_admin_access_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sd_alarm_process_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log";
CREATE TABLE "public"."sd_alarm_process_log" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_alarm_process_log
-- ----------------------------
INSERT INTO "public"."sd_alarm_process_log" VALUES ('9b1f77d8-b069-4b31-8bfc-a2ea46eb4f9b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '19:28', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 19:18:36', '2025-08-07 19:28:16');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('0da102e5-2b63-48d7-8c2d-71636906ecf9', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '0', '2025-08-07', '19:28', '33.1', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 18:26:05', '2025-08-07 19:28:16');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('c0a487f7-dea9-419c-bf8f-5e25deeb9303', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '0', '2025-08-07', '19:28', '33.1', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:58:21', '2025-08-07 19:28:16');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('1146a652-8886-452d-8432-cafbd0c5a564', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '19:33', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', '2025-08-08 19:33:19', '2025-08-08 19:33:19');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('c1f41275-d6cd-4bec-acc2-93bcac3c2fe4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '20:53', '32.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-08 20:43:14', '2025-08-08 20:53:14');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('29110db3-92f9-4b24-9490-d59aa9dec5d8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '19:33', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-08 13:56:49', '2025-08-08 19:33:19');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('65df628e-dcfd-43d2-96ec-0447fd925ff0', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '19:33', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', '2025-08-08 18:38:24', '2025-08-08 19:33:19');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('477ef237-d9a9-4c20-88bd-903edec53b8c', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '0', '2025-08-08', '17:58', '32.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:24', '2025-08-08 17:58:20');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('85aa853c-fa04-4265-9a37-af0af41a5e0e', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-09', '11:50', '33.6', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:25', '2025-08-09 11:50:25');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('369089cd-80ce-4208-b0ee-f4b345b2e880', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:38', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:18:58', '2025-08-10 23:39:00');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('15a03cd6-7c53-483b-95f1-352bf409ac8b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:38', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:23:53', '2025-08-10 23:39:00');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('1b438c68-b9e6-446f-ab63-4b9ec9d46060', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:45:49', '2025-08-12 08:50:54');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('7046512e-ef13-46d8-a4b3-5ae039735c15', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.5', '2025-08-12 07:51:04', '2025-08-12 08:50:54');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('c04bcbd3-f578-45ac-bc48-804687c9f274', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-13', '23:25', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-13 23:25:32', '2025-08-13 23:25:42');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('2dcd6681-dc67-46c4-9c69-c7178049937c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '19:33', '33.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-11 19:13:58', '2025-08-11 19:33:53');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('c11d87ac-f155-4d7b-b176-19057812ff3a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-13', '21:41', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', '2025-08-13 21:32:02', '2025-08-13 21:41:57');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('2728aabf-ba68-438d-a2f7-aa654131a70c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 20:13:10', '2025-08-12 21:18:15');
INSERT INTO "public"."sd_alarm_process_log" VALUES ('f4b674a7-1076-4a7a-8c5c-8a9252662562', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 21:18:10', '2025-08-12 21:18:15');

-- ----------------------------
-- Table structure for sd_alarm_process_log_email
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_email";
CREATE TABLE "public"."sd_alarm_process_log_email" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_alarm_process_log_email
-- ----------------------------
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('249886d3-af37-47ec-b748-798ba4f4ab78', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-07', '18:58', '33.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:58:25', '2025-08-07 18:58:25');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('2d0fa50d-fce2-4f41-b3e1-b3421cc70939', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '19:08', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 19:08:26', '2025-08-07 19:08:26');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('f0d5f5e2-63b0-420e-9172-74baa1f0cd9c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:48', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:19', '2025-08-08 17:48:19');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('72fe7b42-c9e8-4163-b03d-93a60ac10c38', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:48', '32.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:29', '2025-08-08 17:48:29');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('9abb0bfa-a43c-4fc8-80d6-b2ce71106c04', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-09', '11:50', '33.6', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:36', '2025-08-09 11:50:36');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('5c30c0e6-021c-40c0-8ae6-f41534ee5c4f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '14:30', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:12', '2025-08-09 14:30:12');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('bee35331-1b53-4837-9b4f-64a73f4ed5cf', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '15:47', '34.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:46', '2025-08-09 15:47:46');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('708c770b-4208-4855-b945-bc68836f26fa', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '22:33', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:54', '2025-08-10 22:33:54');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('924f1164-525f-48d0-82a7-82af57e1c862', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:38', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:00', '2025-08-10 23:39:00');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('4c30de77-9c3b-426c-8542-0a483306e8d8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '00:03', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-11 00:04:03', '2025-08-11 00:04:03');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('b856fbcf-9245-47e7-a828-01bef92119dc', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '01:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:04', '2025-08-11 01:17:04');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('2216ab2f-fc36-42e0-99a4-48b9753ab920', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '06:45', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:00', '2025-08-12 06:46:00');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('207246df-56a1-4dff-8b67-fe2b8e6b2099', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '07:51', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:20', '2025-08-12 07:51:20');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('9dbf1ebb-cbe3-451c-9470-841fa87e97a9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '16:06', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:06', '2025-08-12 16:06:06');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('17dadf18-2ed7-4b57-826f-a17542bfa6b2', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '20:38', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:16', '2025-08-12 20:38:16');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('c8de8c8a-7eae-48d4-b267-200ee2886c3a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-13', '23:25', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-13 23:25:45', '2025-08-13 23:25:45');
INSERT INTO "public"."sd_alarm_process_log_email" VALUES ('36366308-7c1f-401b-bae7-ecdf32593209', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-13', '23:25', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-13 23:25:48', '2025-08-13 23:25:48');

-- ----------------------------
-- Table structure for sd_alarm_process_log_line
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_line";
CREATE TABLE "public"."sd_alarm_process_log_line" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_alarm_process_log_line
-- ----------------------------
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('0cc0d56f-4384-4999-9f5d-da18f07e2421', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '19:28', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 19:18:41', '2025-08-07 19:28:16');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('a1484306-d98c-4c60-9330-231c12db4860', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:58', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:20', '2025-08-08 17:58:19');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('07d9f1e1-0fad-4d05-a85a-7c1b877b8f0c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '16:33', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:15', '2025-08-09 16:33:18');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('b27995df-7152-4921-8802-5c1a70d076a7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '16:33', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:50', '2025-08-09 16:33:18');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('13420ada-ab2b-48a7-a8d0-587ad3a0ea51', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:10', '2025-08-12 21:18:15');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('2bd807d5-9ccd-427c-bbaf-5e3809038da9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:20', '2025-08-12 21:18:15');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('7026e393-a78c-4ea8-bf62-3f4bf78253ef', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '02:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-11 00:04:08', '2025-08-11 02:16:46');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('9b33a384-c059-47fb-82e8-7137afa7d93e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:58', '2025-08-10 23:39:08');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('67c50a49-0497-4486-ac62-109ed77c6e70', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:06', '2025-08-10 23:39:08');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('bed0e55b-3846-4a3d-af5c-127691370ed9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '02:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:06', '2025-08-11 02:16:46');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('0d9bcdca-86ef-4581-8119-ba023c29e815', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:04', '2025-08-12 08:50:54');
INSERT INTO "public"."sd_alarm_process_log_line" VALUES ('fb483907-0968-48d1-a4b2-9c6ff15eccd5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:24', '2025-08-12 08:50:54');

-- ----------------------------
-- Table structure for sd_alarm_process_log_sms
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_sms";
CREATE TABLE "public"."sd_alarm_process_log_sms" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_alarm_process_log_sms
-- ----------------------------
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('2ac5a65b-daed-4030-9433-610856e87ed4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '19:28', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 19:18:41', '2025-08-07 19:28:16');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('d6dd3223-3e8e-44f3-a824-75ee24c0bb1d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:58', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:20', '2025-08-08 17:58:19');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('64afe331-15cc-4dc6-b04b-2b40b716c39b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '16:33', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:15', '2025-08-09 16:33:18');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('9f529d18-892a-45f5-91db-f7addeaa696f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '16:33', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:50', '2025-08-09 16:33:18');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('110ad8a5-bf64-4a00-b561-ca1b7951029c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:10', '2025-08-12 21:18:15');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('a27755eb-7889-4186-9db8-4e9e92ac27cf', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:20', '2025-08-12 21:18:15');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('e069ed2a-3324-410b-9e8a-525f40b9ba8b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '02:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-11 00:04:08', '2025-08-11 02:16:46');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('c92702a7-4ad1-46dd-8dd9-79c8058619d9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:58', '2025-08-10 23:39:14');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('c1c074cc-ffb1-4708-9010-ee9637944245', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:13', '2025-08-10 23:39:14');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('1cb42bd0-c896-411f-9d9b-8b5bab2948f5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '02:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:06', '2025-08-11 02:16:46');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('2a424abe-9980-4b23-9a49-a29699815275', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:04', '2025-08-12 08:50:54');
INSERT INTO "public"."sd_alarm_process_log_sms" VALUES ('c07c55d6-108d-4eee-8887-56610cf93b1b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:24', '2025-08-12 08:50:54');

-- ----------------------------
-- Table structure for sd_alarm_process_log_telegram
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_telegram";
CREATE TABLE "public"."sd_alarm_process_log_telegram" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_alarm_process_log_telegram
-- ----------------------------
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('1beb8f03-1deb-44f7-8023-78f840d45802', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:58', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:20', '2025-08-08 17:58:20');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('983b45d6-9683-43ad-8754-8e5d084c3db4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '02:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-11 00:04:08', '2025-08-11 02:16:46');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('ad22922a-6f77-4109-96f3-e4ff95495859', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '02:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:06', '2025-08-11 02:16:46');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('2917053a-cab4-486f-9658-6fb71c24bfe5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:58', '2025-08-10 23:39:15');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('54de789d-3ce4-4e08-9ec6-e90417a8e1c9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:15', '2025-08-10 23:39:15');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('e1c6c397-8da6-439a-a6b7-47330707487e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:11', '2025-08-12 21:18:15');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('b50ba1ae-af35-49b2-b9d6-fb37d3006198', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '16:33', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:15', '2025-08-09 16:33:18');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('5a21bbf0-9ca7-4380-9076-6cd1978184f7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:20', '2025-08-12 21:18:15');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('f00a3f4c-39b9-4b64-9e4a-4d962a3317b6', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '16:33', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:50', '2025-08-09 16:33:18');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('ebb59837-f704-48d0-afb4-d83f21b958b4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:04', '2025-08-12 08:50:54');
INSERT INTO "public"."sd_alarm_process_log_telegram" VALUES ('2bcb37ec-d115-42ff-a918-5e4d82ef1c52', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '08:50', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:24', '2025-08-12 08:50:54');

-- ----------------------------
-- Table structure for sd_alarm_process_log_temp
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_temp";
CREATE TABLE "public"."sd_alarm_process_log_temp" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_alarm_process_log_temp
-- ----------------------------
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4faab9ce-387b-4e45-9efb-e91ac1b1d2fc', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '10:53', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-07 10:53:53', '2025-08-07 10:53:53');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f8ba9b94-39f1-47e3-a01f-0b0e4eac970b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '10:53', '33.7', '32', '1', ' Alarm Sensor ON Warning Device Sensor: Temperature value: 33.7', ' Alarm Sensor ON Warning  Device Sensor: Temperature value: 33.7', '2025-08-07 10:54:03', '2025-08-07 10:54:03');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4893f1e0-49f6-4131-ac36-05e4c1f22194', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '11:55', '32.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.9', '2025-08-07 11:55:18', '2025-08-07 11:55:18');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f59ed651-722a-4a14-b490-ca3c9aee4c2f', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-07', '11:55', '32.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.9', '2025-08-07 11:55:34', '2025-08-07 11:55:34');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1c61aadc-1053-40bc-9243-6000c9cf27ba', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '12:33', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 12:33:53', '2025-08-07 12:33:53');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c190d9c2-d445-4f04-998c-3016b9cc78e0', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '12:57', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 12:57:48', '2025-08-07 12:57:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d059a190-986e-4fcc-9261-8c0d5b133aa3', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '13:00', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 13:00:28', '2025-08-07 13:00:28');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('aecd3a78-b010-4b46-929b-df1d59490665', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '13:00', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 13:00:41', '2025-08-07 13:00:41');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d8d56764-3c81-4312-b0d3-78df3be0b08e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '14:17', '33.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.3', '2025-08-07 14:17:48', '2025-08-07 14:17:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('faa56d6d-4a54-437d-b5e4-8be2b83a13a8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '14:17', '33.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.3', '2025-08-07 14:17:56', '2025-08-07 14:17:56');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('809aca92-67d1-498e-9edc-a2885543bda8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '15:39', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 15:39:58', '2025-08-07 15:39:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e644f223-96fb-48b5-823a-e417fb03822e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '15:40', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 15:40:06', '2025-08-07 15:40:06');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6233ea87-f9ee-48f9-87a3-2bc8986687f0', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '16:15', '33.4', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 16:15:42', '2025-08-07 16:15:42');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('908dc8a6-f025-4e0c-91b3-12f66be4957f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '16:44', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 16:45:03', '2025-08-07 16:45:03');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c342884b-d5b0-4d02-9de5-70aadd26f23b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '17:48', '33.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.3', '2025-08-07 17:48:19', '2025-08-07 17:48:19');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('433beaca-d93a-4ede-8a27-558b4b68d288', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '17:48', '33.3', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.3', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.3', '2025-08-07 17:48:23', '2025-08-07 17:48:23');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('047c5b3b-fe46-4456-ba35-ff7585a96070', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '18:00', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:00:43', '2025-08-07 18:00:43');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f14e8240-0e5c-453d-b979-ea46a3d4c5e1', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-07', '18:16', '33.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:16:59', '2025-08-07 18:16:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('52bae81e-b5d9-4270-89cc-2f58589c86c4', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '18:23', '33.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:23:18', '2025-08-07 18:23:18');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('94c4fb64-838f-4ba2-a9f1-1b6ee21300b4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '18:36', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:36:28', '2025-08-07 18:36:28');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('afad8de2-3822-4c45-9b51-8c1e8a5edf78', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '18:36', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:36:36', '2025-08-07 18:36:36');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c55dee97-9ee1-46b1-a20a-3bf7105baaf4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '18:48', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:48:18', '2025-08-07 18:48:18');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('beb9e30a-81a0-418f-80eb-385677e926ff', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-07', '18:48', '33.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:48:18', '2025-08-07 18:48:18');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1c9ced96-7ac5-4d59-b961-35fff6426a1b', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '11:00', '33.4', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 11:00:18', '2025-08-07 11:00:18');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('53867996-3a03-4145-a38b-aa398105ad7c', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-07', '11:00', '33.4', '30', '1', ' Alarm Sensor  OFF Warning Device Sensor: Temperature value: 33.4', ' Alarm Sensor  OFF Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 11:00:29', '2025-08-07 11:00:29');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ca22471d-a476-4d20-9c48-8df0905e41da', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '12:02', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 12:02:48', '2025-08-07 12:02:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ec465c55-7fc4-4d74-ad34-ee5d08e82398', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '12:02', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 12:02:58', '2025-08-07 12:02:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a0978138-b2d8-4c69-99c8-e51ba21b7e54', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '13:32', '33.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.3', '2025-08-07 13:32:48', '2025-08-07 13:32:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3602d12b-d058-4bb1-a573-98adaa8be60e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '13:32', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 13:32:58', '2025-08-07 13:32:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e14a6837-c76e-41f0-820d-5aaccbe7dfee', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '14:52', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-07 14:52:48', '2025-08-07 14:52:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7597335e-ac27-4012-8c18-a9162498bc08', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '14:52', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-07 14:52:57', '2025-08-07 14:52:57');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8f764192-a12d-4c54-8ce8-c847006d6dce', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '16:11', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 16:11:58', '2025-08-07 16:11:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('5f117b97-f8e5-42b7-bc2c-7f1c7a01ffef', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-07', '16:15', '33.4', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 16:16:08', '2025-08-07 16:16:08');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6cc02433-27a7-41c6-b930-c2f020871f88', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '16:54', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 16:55:03', '2025-08-07 16:55:03');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0a9c0743-7f46-4ad6-83b8-08d110503e4b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '17:53', '33.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.3', '2025-08-07 17:53:08', '2025-08-07 17:53:08');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('845a7233-a014-43d1-af21-dc2ce32a4d8d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '18:02', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:02:28', '2025-08-07 18:02:28');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1edba7be-67c4-4992-ac0b-0891f587d04b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '18:02', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:02:28', '2025-08-07 18:02:28');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6850dabe-4b4b-40a0-bf6d-2edd1260ee2f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '18:25', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 18:25:58', '2025-08-07 18:25:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('14a3c5ce-a1ac-4940-895c-5321b56daaae', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '18:25', '33.1', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 18:26:05', '2025-08-07 18:26:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('45126639-3efb-43ed-91fa-742060c19c5d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '18:36', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:36:34', '2025-08-07 18:36:34');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('edec7573-835f-4856-95b4-7a153735e6e7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '11:27', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-07 11:27:48', '2025-08-07 11:27:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('90dd24f8-8649-4443-8934-5ce9e5b66e13', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '11:27', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-07 11:27:53', '2025-08-07 11:27:53');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ae32038c-8518-44de-bd62-090d6346ccb0', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '14:07', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 14:07:48', '2025-08-07 14:07:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fb894d91-4d95-48d7-a120-e1e6e461e466', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '14:07', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 14:07:56', '2025-08-07 14:07:56');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('551a8a11-11f8-4f43-90fe-9342ca77aa47', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '15:27', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 15:27:48', '2025-08-07 15:27:48');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e06d7b1a-d6c8-4c3e-93cd-a2de8be80a48', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '15:27', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 15:27:56', '2025-08-07 15:27:56');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8f4060c8-243c-42b6-b0d4-5a35e5f51de8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '16:12', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-07 16:12:27', '2025-08-07 16:12:27');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3ea3336c-2d49-4b58-8cdb-197512820506', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '16:24', '33.6', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.6', '2025-08-07 16:25:03', '2025-08-07 16:25:03');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('83da62bd-bbc6-4089-a6e0-bf9700f7d6a2', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-07', '16:25', '33.6', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.6', '2025-08-07 16:25:11', '2025-08-07 16:25:11');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('2891609c-5c8b-4a35-8fe7-efa7d2af50bd', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '17:26', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 17:26:08', '2025-08-07 17:26:08');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a39fb429-e0b3-4642-b377-311654d81413', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '17:58', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 17:58:13', '2025-08-07 17:58:13');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('80aed015-a80d-4618-8a26-6259a9e75d06', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '18:14', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:14:14', '2025-08-07 18:14:14');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8d2c76d9-fe01-44a5-be53-13d3e7966833', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '18:58', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:58:16', '2025-08-07 18:58:16');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('26fdc388-0da3-415b-8852-b9b0acd2d42f', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-07', '18:58', '33.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:58:21', '2025-08-07 18:58:21');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7e3eebf8-187d-4908-b19a-bba978e4a1c7', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-07', '18:58', '33.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 18:58:25', '2025-08-07 18:58:25');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('43b8dcc3-aff5-45c8-95b7-1f5740cf7e9e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '19:08', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 19:08:21', '2025-08-07 19:08:21');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b05a1f23-5da2-45a8-8691-338dd2ead895', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '19:08', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 19:08:26', '2025-08-07 19:08:26');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4e459c33-a4b6-4dff-9f43-26750b09e796', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '19:08', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 19:08:26', '2025-08-07 19:08:26');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e28e89a2-cfd6-4240-91a4-a4d6649f1009', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '19:08', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-07 19:08:26', '2025-08-07 19:08:26');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('5e3f9579-af88-439b-8fae-f9a59b95f5d1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-07', '19:18', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 19:18:36', '2025-08-07 19:18:36');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e61bcbd1-ce60-456b-a066-f64a0083af3d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '19:18', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 19:18:41', '2025-08-07 19:18:41');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d8fd7b4d-131c-4617-afc7-fae0ad4fefd2', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-07', '19:18', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 19:18:41', '2025-08-07 19:18:41');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('78a2dee6-5d70-488a-b7bd-fbfdc907529c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-07', '19:23', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-07 19:23:16', '2025-08-07 19:23:16');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('25655b49-a7ca-482b-9e15-f128a16dd8e8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '09:43', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 09:43:57', '2025-08-08 09:43:57');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('cd4e5924-8d87-45a0-aeb5-39bb4d5d0464', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '09:44', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 09:44:02', '2025-08-08 09:44:02');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b32aa343-7409-4b5e-81b4-ceddf300f34f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '09:44', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 09:44:02', '2025-08-08 09:44:02');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1f42f8b2-384b-4e9f-b2fa-e9f5a652d9fb', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '09:44', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 09:44:02', '2025-08-08 09:44:02');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('bb0ff4d6-0999-405a-8be0-482ea2882361', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '09:44', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 09:44:02', '2025-08-08 09:44:02');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('5c63278b-230a-43aa-9ba4-238208832a28', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-08', '09:44', '36.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 09:44:07', '2025-08-08 09:44:07');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f6e12f6d-6a6f-4bd5-b298-50789fd73a55', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-08', '09:44', '36.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 09:44:12', '2025-08-08 09:44:12');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('35756fa9-0fe9-4471-8110-b17f3ffc8eaf', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '10:23', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 10:23:55', '2025-08-08 10:23:55');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b8f656db-b3de-4996-ba6d-e5e00e62f14b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:24', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 10:24:00', '2025-08-08 10:24:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('338bb433-6abb-4769-91da-8831b22f2e82', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:24', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 10:24:00', '2025-08-08 10:24:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('12966c9f-5d2c-49df-a0fd-ea1734b38c6d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:24', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 10:24:00', '2025-08-08 10:24:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6785adf7-a21b-43b4-a365-cb0d2f466ceb', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:24', '36.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 10:24:00', '2025-08-08 10:24:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4a795295-212e-4d3e-b888-d7a343838cd3', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-08', '10:24', '36.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 10:24:05', '2025-08-08 10:24:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('bc327785-c1be-4af0-9ae1-38274d29d2fd', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:24', '36.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 36.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 36.9', '2025-08-08 10:24:10', '2025-08-08 10:24:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c87dcf78-44cd-43c5-aef0-e4f9534c57f8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '10:58', '33.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.5', '2025-08-08 10:58:55', '2025-08-08 10:58:55');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0c18b45c-9dcb-4783-b8d4-3cfbc8aa5f1f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:59', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-08 10:59:00', '2025-08-08 10:59:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('501800c4-5dbe-4d9f-bb44-e3f62f8cad55', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:59', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-08 10:59:00', '2025-08-08 10:59:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('08b38f66-80f7-4818-a2cb-4823bc661fb5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:59', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-08 10:59:00', '2025-08-08 10:59:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a210dd71-229d-405e-b28b-fc80a41b960d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:59', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-08 10:59:00', '2025-08-08 10:59:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6b5f4c37-5277-4205-926a-8c9d110fd428', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-08', '10:59', '33.4', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.4', '2025-08-08 10:59:05', '2025-08-08 10:59:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('311b5d59-dc4e-4095-bec5-eb8053f85759', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-08', '10:59', '33.4', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.4', '2025-08-08 10:59:10', '2025-08-08 10:59:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e88b3021-6f62-4552-88a8-409447c26fdd', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '11:18', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 11:18:53', '2025-08-08 11:18:53');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('076fdb4d-0463-46db-9cf1-553a3d77e91c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '11:18', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 11:18:59', '2025-08-08 11:18:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('65a918bb-4713-4823-9038-eab604d42d3b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '11:19', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 11:19:00', '2025-08-08 11:19:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4588ed2a-0a6b-44ab-9b80-a2b8dc57b7c5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '11:19', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 11:19:01', '2025-08-08 11:19:01');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('37c2c8e1-ab7e-4669-8820-f237e5ad4c1e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '11:19', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 11:19:01', '2025-08-08 11:19:01');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('433499ea-5e7c-48c9-a74b-734a91ee6a19', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-08', '11:19', '32.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 11:19:03', '2025-08-08 11:19:03');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('70b21912-cc45-41a1-8fb0-cc24ecf1a215', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-08', '11:19', '32.9', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 11:19:21', '2025-08-08 11:19:21');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3a206e71-81cd-4812-a13f-c21d63f7c186', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '12:51', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 12:51:49', '2025-08-08 12:51:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ad6f1a1a-ae55-4ad3-b5ec-7db0ef68b8ff', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '12:51', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 12:51:54', '2025-08-08 12:51:54');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9cb09fe9-71c7-4672-a8e5-eac6eda9b2b2', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '12:51', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 12:51:54', '2025-08-08 12:51:54');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('50fe77d2-fe20-427b-b871-2d0a56456dd3', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '12:51', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 12:51:54', '2025-08-08 12:51:54');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('892f273d-095b-436b-ab9d-cdd321e3127b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '12:51', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 12:51:54', '2025-08-08 12:51:54');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1cfb114e-1201-428c-9a30-6892ccd2485f', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-08', '12:51', '32.7', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 12:51:59', '2025-08-08 12:51:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c09b7711-e49f-4862-bf72-bb89c79fabcf', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-08', '12:52', '32.7', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 12:52:04', '2025-08-08 12:52:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a7b4b392-a458-4a25-ad73-01790115c70f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '13:31', '33.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-08 13:31:49', '2025-08-08 13:31:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('17eaf7cf-105d-4a10-b316-038e49f4f318', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '13:46', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-08 13:46:49', '2025-08-08 13:46:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0deb03eb-0dcc-40f8-9e97-570f8e009307', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '13:56', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-08 13:56:49', '2025-08-08 13:56:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('af12e8ce-d8a7-499a-b628-d5c369a72765', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '14:21', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-08 14:21:44', '2025-08-08 14:21:44');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('bf9957df-2e36-437e-b74d-c6bc9acb8da3', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '14:56', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 14:56:44', '2025-08-08 14:56:44');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1bd9766c-e9ac-4491-81c6-c593ac3c7df5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '15:06', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-08 15:06:44', '2025-08-08 15:06:44');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ea1bcb30-12c7-4069-8dc5-623f613a0654', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '17:38', '32.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.4', '2025-08-08 17:38:24', '2025-08-08 17:38:24');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b95b411c-bb4a-49f1-98b2-ed06fa666089', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '17:38', '32.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.4', '2025-08-08 17:38:29', '2025-08-08 17:38:29');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('212e9317-41ea-4189-aaff-9757e81fe20d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '17:38', '32.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.4', '2025-08-08 17:38:29', '2025-08-08 17:38:29');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fbebbc61-6401-4188-ab15-a347388d1e19', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '17:38', '32.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.4', '2025-08-08 17:38:30', '2025-08-08 17:38:30');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('db595558-9a9a-4ae5-883b-bfae7b962a41', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-08', '17:38', '32.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.4', '2025-08-08 17:38:30', '2025-08-08 17:38:30');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0d4e0206-fb74-45d2-b7b2-9167b7087a4c', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-08', '17:38', '32.4', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.4', '2025-08-08 17:38:34', '2025-08-08 17:38:34');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('366676c7-275e-4bdc-9523-27dda8edb78f', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, '1', '2025-08-08', '17:38', '32.4', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.4', '2025-08-08 17:38:39', '2025-08-08 17:38:39');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9d9adc5e-5a6d-4273-ba0a-fae1117bcd94', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:48', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:19', '2025-08-08 17:48:19');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('65992666-18a6-4b14-b860-0885c1091b6b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:48', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:20', '2025-08-08 17:48:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b2f9e118-9c7d-4356-87ee-75c61cb3641e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:48', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:20', '2025-08-08 17:48:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9d57e3d0-9484-4a97-9a13-0d287badeeb0', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:48', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:20', '2025-08-08 17:48:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a77ca6d6-0495-429b-ade5-cedb0ee31ecf', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-08', '17:48', '32.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:24', '2025-08-08 17:48:24');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d670fce7-9d15-4103-9e55-dd3c2fd6cc93', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-08', '17:48', '32.2', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 17:48:29', '2025-08-08 17:48:29');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ee1a261e-f7af-4140-831e-bcd017fa064b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '18:38', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', '2025-08-08 18:38:24', '2025-08-08 18:38:24');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c4d74926-3fc0-46d0-b0a5-767c8c99d3e7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '19:08', '32.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.0', '2025-08-08 19:08:19', '2025-08-08 19:08:19');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f398cc6f-4424-4c5d-9ae2-f6a917bfaa4e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '19:18', '32.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.0', '2025-08-08 19:18:19', '2025-08-08 19:18:19');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c8e3efe0-ffe4-432d-a283-652c17ce30a8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '19:33', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', '2025-08-08 19:33:19', '2025-08-08 19:33:19');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('19154ee8-a1a8-4784-9893-d836517cb6f1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '19:58', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-08 19:58:19', '2025-08-08 19:58:19');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7625edc6-c62d-4c0b-97bc-2be7ecec86bf', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '20:33', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-08 20:33:19', '2025-08-08 20:33:19');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4f9d6494-0f64-460b-932f-a3d1bb82a084', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-08', '20:43', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-08 20:43:14', '2025-08-08 20:43:14');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('70772f33-70f5-41bb-9412-c214b6d1c5bc', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '11:24', '34.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.4', '2025-08-09 11:24:25', '2025-08-09 11:24:25');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9b152a32-b07d-41e2-b2aa-e2d7a6a9ec30', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '11:50', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:17', '2025-08-09 11:50:17');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a1b172ba-efb2-43e2-907e-6c3f8153ab7b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '11:50', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:20', '2025-08-09 11:50:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f43eda20-faf8-4638-9241-2a60ff7978fa', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '11:50', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:20', '2025-08-09 11:50:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1b1cbced-2325-4d2f-b12a-5fb097f97a81', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '11:50', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:20', '2025-08-09 11:50:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3131f80b-980d-44f6-8951-a6a4302aa796', 70, 8, 1, '0', '1', '30', '25', '32', '25', 0, 0, 0, 0, 1, '0', '2025-08-09', '11:50', '33.6', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:25', '2025-08-09 11:50:25');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('236afafe-16a2-4b88-acc3-87fd324e5b89', 70, 8, 1, '0', '1', '30', '25', '32', '25', 1, 0, 0, 0, 0, NULL, '2025-08-09', '11:50', '33.6', '30', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor  OFF  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 11:50:36', '2025-08-09 11:50:36');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('263b90e0-f7d5-41bd-a47e-f03c896d4877', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '12:00', '33.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.9', '2025-08-09 12:00:10', '2025-08-09 12:00:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('aae067c8-ba8d-4387-82b0-92b7e83460f4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '12:25', '33.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.5', '2025-08-09 12:25:13', '2025-08-09 12:25:13');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4c556c7b-d7f6-4b38-8f15-d5bce7f4814a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '12:25', '33.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.5', '2025-08-09 12:25:15', '2025-08-09 12:25:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7256fd38-fc93-4c85-bcef-d5be0e906846', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '12:25', '33.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.5', '2025-08-09 12:25:15', '2025-08-09 12:25:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9f3c8a95-9eae-428e-a3e8-555e6873aef7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '12:25', '33.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.5', '2025-08-09 12:25:15', '2025-08-09 12:25:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9e761ddd-6193-406b-832e-3a1b6c1c720c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '12:35', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 12:35:10', '2025-08-09 12:35:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('22cb7bc1-9654-443c-9cf5-4ec980024ae5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '12:45', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 12:45:10', '2025-08-09 12:45:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8ce6d1ad-42be-44d8-a45c-4936e71fcb9d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:00', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:00:13', '2025-08-09 13:00:13');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b46a675b-f6f2-4b85-9345-d9f6cf3afa66', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:00', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:00:15', '2025-08-09 13:00:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e709500e-4463-4ff9-b4e8-bd844bca9960', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:00', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:00:15', '2025-08-09 13:00:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3f0de97a-dcb8-4a4d-b432-ac0ee76bf8a1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:00', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:00:15', '2025-08-09 13:00:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f633aba3-961f-4456-b262-4f948660352c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '13:10', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:10:11', '2025-08-09 13:10:11');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d8981118-ffcb-4559-8854-77fe2561fdfe', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '13:10', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:10:15', '2025-08-09 13:10:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0d1634d3-164d-4ce3-b2d4-7a31870ea5d3', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '13:10', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:10:15', '2025-08-09 13:10:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('aa8996a8-aae6-4c62-97c7-a0c06dd554ee', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '13:10', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:10:15', '2025-08-09 13:10:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8aeb599b-797f-4a7d-981c-ca5623a28bfd', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '13:20', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-09 13:20:10', '2025-08-09 13:20:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fc40578e-5cbb-4310-923d-4197593089de', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:45', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 13:45:12', '2025-08-09 13:45:12');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('254ede92-af28-4a29-8850-6aa3d5c14651', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:45', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 13:45:15', '2025-08-09 13:45:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3e263bed-e56e-491b-b084-06ea806c3b9a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:45', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 13:45:15', '2025-08-09 13:45:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fecbe09a-cca6-4957-8096-ae3278552784', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '13:45', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 13:45:15', '2025-08-09 13:45:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b2a14bf8-3b89-42d5-9ee2-45714a1c78e2', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '13:55', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-09 13:55:10', '2025-08-09 13:55:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e807fc83-8111-4f17-942c-688213bc3d63', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '14:05', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:05:10', '2025-08-09 14:05:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e40da276-f159-43b3-ba6d-0c64a37e6828', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '14:20', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:20:13', '2025-08-09 14:20:13');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('dc04251a-417d-4b6b-a362-af6f53938a0e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '14:20', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:20:15', '2025-08-09 14:20:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('aa2a331b-c265-44d6-a805-4b4e048dd7f6', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '14:20', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:20:15', '2025-08-09 14:20:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('5cefbd55-390f-4998-98fe-32507f08b79a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '14:20', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:20:15', '2025-08-09 14:20:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('eee1819c-cea5-4d41-bcd0-fa76ffe6b473', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '14:30', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:12', '2025-08-09 14:30:12');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('399708a3-6e54-4f67-9cb9-e46adc1ee922', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '14:30', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:15', '2025-08-09 14:30:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4c2346c7-29a6-4c5a-8305-a386c581d391', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '14:30', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:15', '2025-08-09 14:30:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('aefd0066-9954-465c-a368-30552017b2e6', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-09', '14:30', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:30:15', '2025-08-09 14:30:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('421adbc3-f705-435a-ab03-b654eddbf44f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '14:40', '33.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.7', '2025-08-09 14:40:10', '2025-08-09 14:40:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8c51e9c6-58d7-4799-b7ba-de17834b1644', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-09', '15:47', '34.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:35', '2025-08-09 15:47:35');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c4ef0fac-0557-49a8-a5d5-040a20824729', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '15:47', '34.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:46', '2025-08-09 15:47:46');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6a9dfb41-5d66-4a15-8c80-9409baec79f1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '15:47', '34.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:50', '2025-08-09 15:47:50');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('686fcc00-30b4-4dea-8474-a5a017cc2414', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '15:47', '34.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:50', '2025-08-09 15:47:50');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('62b34b57-889a-405e-a5c8-10e8a7127292', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-09', '15:47', '34.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 34.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 34.2', '2025-08-09 15:47:50', '2025-08-09 15:47:50');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c992d861-3339-47e4-bbbb-950b491838d7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-10', '22:18', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:18:58', '2025-08-10 22:18:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('59747d33-e5ed-4954-80d6-cb1849d5f318', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '22:33', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:54', '2025-08-10 22:33:54');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('bfbf01e1-1cba-4bd0-bd9d-06150cccc0a6', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '22:33', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:58', '2025-08-10 22:33:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('31d3ba7a-4de2-4728-ac4e-4e072a354c27', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '22:33', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:58', '2025-08-10 22:33:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b0d826d2-8c6a-42b2-9874-7c07c9d35b18', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-10', '22:33', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-10 22:33:58', '2025-08-10 22:33:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('28412a70-2a58-42d8-aa8a-9a4d9fbb8952', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-10', '23:23', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:23:53', '2025-08-10 23:23:53');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('795a2659-44b8-4448-a6a9-f92cdefbb271', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:38', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:00', '2025-08-10 23:39:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0e1de6d9-72b4-4862-af10-9d5899abc553', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:06', '2025-08-10 23:39:06');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3f164f5c-d200-48f3-8a71-072fb64b6c4c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:13', '2025-08-10 23:39:13');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('868829e5-d4f4-44ee-a2ee-f8283f308a0a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-10', '23:39', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-10 23:39:15', '2025-08-10 23:39:15');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a080ff4d-c9a4-4600-b61a-ce807a888981', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '00:03', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-11 00:03:53', '2025-08-11 00:03:53');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('40b2f04a-34d7-4a83-894a-edfc2489c875', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '00:03', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-11 00:04:03', '2025-08-11 00:04:03');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6b8a3e26-aacc-4622-acfc-a8bd037a8ea9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '00:04', '33.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-11 00:04:08', '2025-08-11 00:04:08');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c2c3b0ef-cff9-4961-b642-f40ffb720489', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '00:04', '33.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-11 00:04:08', '2025-08-11 00:04:08');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8eac44cb-2d5c-4652-b470-309d1a2052ba', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-11', '00:04', '33.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-11 00:04:08', '2025-08-11 00:04:08');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('2a3ef573-a011-43b5-a9e8-18748bbf1f7e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '01:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:16:51', '2025-08-11 01:16:51');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3cac54f8-0c0b-4044-a343-85f0413d7629', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '01:16', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:04', '2025-08-11 01:17:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('da8ce0cd-a68d-44d1-ab03-f8c912391c92', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '01:17', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:06', '2025-08-11 01:17:06');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('10aef527-09c5-4022-a09b-2f5f9aa42a24', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '01:17', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:06', '2025-08-11 01:17:06');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d3d4adfc-c8d6-4cb1-83bb-43a8f9e7c622', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-11', '01:17', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-11 01:17:06', '2025-08-11 01:17:06');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('55bef4d1-3281-4cf1-b790-ccbe667f8876', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '02:24', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-11 02:24:41', '2025-08-11 02:24:41');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('378650fa-6b06-405c-aceb-e7652ab845d3', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '02:34', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-11 02:34:41', '2025-08-11 02:34:41');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9e5aa710-fbbc-40cd-9e9e-ecc0bdaa0cc2', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '13:18', '33.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.3', '2025-08-11 13:18:38', '2025-08-11 13:18:38');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('197a9db0-203b-46c0-ba54-9cc293532f9d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '14:23', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-11 14:23:58', '2025-08-11 14:23:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('df012d9e-b6fa-41b3-b358-1b043fb51054', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '14:33', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-11 14:33:58', '2025-08-11 14:33:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a5bcd886-612f-4db5-9605-977377eabc0f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '15:38', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-11 15:38:58', '2025-08-11 15:38:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('92698fb0-a6f9-4929-b8e6-0ee28893441c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '16:43', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-11 16:43:58', '2025-08-11 16:43:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('66c8d4b3-a66d-48cf-bdfa-11fd6ffe2106', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '16:53', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-11 16:53:58', '2025-08-11 16:53:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fea72d5e-552d-431a-9d28-fe3b36e692e8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '17:58', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-11 17:58:58', '2025-08-11 17:58:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fa213298-5296-4548-b023-9a2cd227f4a1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '19:03', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-11 19:03:58', '2025-08-11 19:03:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('cf6f869d-fb0b-4c70-991b-41684092303e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-11', '19:13', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-11 19:13:58', '2025-08-11 19:13:58');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('97bf197a-3997-46fa-987a-bccec5d011c5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '04:20', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 04:20:49', '2025-08-12 04:20:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('be8953a2-3e69-467a-acf4-471e8873c114', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '04:20', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 04:20:59', '2025-08-12 04:20:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8bbf8388-d483-49f0-aa57-aed3f300d2ea', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '04:21', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 04:21:04', '2025-08-12 04:21:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d4178fb1-ea29-4d51-bd35-4be876a3a78f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '04:21', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 04:21:04', '2025-08-12 04:21:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3f6e519f-27f7-456b-9765-e714220ad806', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '04:21', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 04:21:04', '2025-08-12 04:21:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('238f2c0f-dcf0-4135-be26-f2382d948424', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '05:25', '31.8', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', '2025-08-12 05:25:49', '2025-08-12 05:25:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b4f451c6-0fae-4b17-be75-f4a9409dc435', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '05:25', '31.8', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', '2025-08-12 05:26:00', '2025-08-12 05:26:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8ff4de55-64a8-4015-becd-424522f9d856', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '05:26', '31.8', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', '2025-08-12 05:26:04', '2025-08-12 05:26:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('5be7dc11-8031-4fb9-aa22-d9c2bbcdcb18', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '05:26', '31.8', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', '2025-08-12 05:26:04', '2025-08-12 05:26:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('667c525e-91ae-4323-92e9-f365215ae9af', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '05:26', '31.8', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.8', '2025-08-12 05:26:04', '2025-08-12 05:26:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('319b89d1-97f9-4f34-b401-459650abb334', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '06:30', '31.3', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.3', '2025-08-12 06:30:49', '2025-08-12 06:30:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1b7d775a-5565-4d98-a1e4-f8a05f3578c5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '06:30', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 06:31:00', '2025-08-12 06:31:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('daf77d62-b726-4278-be51-0b7e58c27823', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '06:31', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 06:31:04', '2025-08-12 06:31:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9e9b4fa3-7510-434d-b6aa-582e716d87e9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '06:31', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 06:31:04', '2025-08-12 06:31:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e019841a-3671-405d-9710-36efeb03ad1e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '06:31', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 06:31:04', '2025-08-12 06:31:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('96d4ea45-8366-4384-86da-a155b71ce19f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '06:45', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:45:49', '2025-08-12 06:45:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('e784daff-ad28-4907-a8a3-d623253b958d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '06:45', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:00', '2025-08-12 06:46:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('28218553-4313-49b4-ab9d-aed9cd25a787', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '06:46', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:04', '2025-08-12 06:46:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('a82c6851-f553-4736-8df7-d2439102de1a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '06:46', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:04', '2025-08-12 06:46:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('616e67f2-d822-4fea-8d19-41b016f5bc03', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '06:46', '31.6', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.6', '2025-08-12 06:46:04', '2025-08-12 06:46:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6f1c0dd9-028a-45ca-93a7-cd358a0d99f1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '07:50', '31.5', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.5', '2025-08-12 07:51:04', '2025-08-12 07:51:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('705733d7-8799-43b5-a9f5-b62a544224f8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '07:51', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:20', '2025-08-12 07:51:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fb17f12b-e01c-494c-b08f-491edbee12c5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '07:51', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:24', '2025-08-12 07:51:24');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c1500633-4f0f-4d38-9c8b-372318794f28', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '07:51', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:24', '2025-08-12 07:51:24');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3ce6b472-4051-47e4-96e4-b708fd32f3b1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '07:51', '31.4', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.4', '2025-08-12 07:51:24', '2025-08-12 07:51:24');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1ee6442e-1108-429e-84bd-58b7c5b894a2', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '08:25', '32.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.0', '2025-08-12 08:25:59', '2025-08-12 08:25:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('5e30c05e-c11d-496f-b19f-8468029a6cb8', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '08:55', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-12 08:55:59', '2025-08-12 08:55:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('75325259-44b7-4faf-b1fe-e5fc438cb2c7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '08:56', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-12 08:56:04', '2025-08-12 08:56:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('74370616-9f8b-4d07-9633-db4094a1ef8a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '08:56', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-12 08:56:04', '2025-08-12 08:56:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f1fabaa7-b4c4-4953-931f-5f8ce95875de', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '08:56', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-12 08:56:04', '2025-08-12 08:56:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('2f3b200b-ca6b-4831-bdea-d3bd2a08ea2d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '09:30', '32.3', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.3', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.3', '2025-08-12 09:30:59', '2025-08-12 09:30:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fe90d5ef-4684-4f13-962d-d9a4f0556e03', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '10:00', '32.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.5', '2025-08-12 10:00:59', '2025-08-12 10:00:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('48c8dc65-e6e3-4738-928c-4082e7b6e902', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '10:01', '32.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.5', '2025-08-12 10:01:04', '2025-08-12 10:01:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0e2bbbbe-c8ab-45ef-9a94-920b2e527bf9', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '10:01', '32.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.5', '2025-08-12 10:01:04', '2025-08-12 10:01:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ce8d93d6-21cb-4303-a940-389672846192', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '10:01', '32.5', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.5', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.5', '2025-08-12 10:01:04', '2025-08-12 10:01:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('2fb07f12-b1a0-4f5e-b4fc-f7865a4f94c4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '10:35', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 10:35:59', '2025-08-12 10:35:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('760b35d3-65a2-4510-9f70-5e71e05a19e5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '10:45', '33.0', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.0', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.0', '2025-08-12 10:45:59', '2025-08-12 10:45:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('79fac10d-c562-4ccf-b5cf-23ed2e5ea060', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '11:05', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-12 11:06:01', '2025-08-12 11:06:01');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('1ccc1187-86b5-410f-b96a-41a811d9c852', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '11:06', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-12 11:06:04', '2025-08-12 11:06:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d36ef78c-26e5-4b69-bff5-4100e9b7eeab', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '11:06', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-12 11:06:04', '2025-08-12 11:06:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('6cc8b97b-0237-45e8-b5a7-cc9570bb654e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '11:06', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-12 11:06:04', '2025-08-12 11:06:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('44d44fc2-156a-44d3-add0-292521b7fb9f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '11:15', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-12 11:15:59', '2025-08-12 11:15:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8b1134fc-9407-469b-badb-2405a42c12f4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '11:16', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-12 11:16:04', '2025-08-12 11:16:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('219bf7a6-8675-4e89-b6c7-b61d55011d66', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '11:16', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-12 11:16:04', '2025-08-12 11:16:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('3e105dd4-8f90-42d0-9c56-fc21a7985b7e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '11:16', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-12 11:16:05', '2025-08-12 11:16:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7355fd5c-a958-44b0-87ce-e101de886e34', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '11:50', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-12 11:50:59', '2025-08-12 11:50:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('99f73b1c-d829-4460-b745-73a4b063e5d7', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '12:20', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-12 12:21:02', '2025-08-12 12:21:02');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('996d112b-637c-4587-8f15-2a8132cd4dd6', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '12:21', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-12 12:21:04', '2025-08-12 12:21:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('190eb9ff-3303-413b-94d8-50a1bd9dd67b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '12:21', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-12 12:21:05', '2025-08-12 12:21:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9c4abd51-cf13-4da3-82a7-066baddc7fb6', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '12:21', '32.7', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.7', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.7', '2025-08-12 12:21:05', '2025-08-12 12:21:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('79c8682c-cf05-4e9f-8da8-ec48f399059b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '12:57', '32.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.4', '2025-08-12 12:57:49', '2025-08-12 12:57:49');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7df3b817-aacb-471c-b517-124074ac72a3', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '13:06', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 13:06:09', '2025-08-12 13:06:09');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('44679c55-46a5-496b-9e39-1e5f9a21eb1f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '13:25', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 13:26:06', '2025-08-12 13:26:06');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d0a11aca-d6bc-46fc-9599-21255745728e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '13:26', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 13:26:09', '2025-08-12 13:26:09');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7994bca3-82a4-48bc-a6ea-4efbb1b91965', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '13:26', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 13:26:10', '2025-08-12 13:26:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('37a8c717-1864-4ebb-a765-837fdf0409d0', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '13:26', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 13:26:10', '2025-08-12 13:26:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ec86f6d0-b32f-4edd-9dfc-8061858686cc', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '13:45', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 13:46:00', '2025-08-12 13:46:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('094b8888-0d00-48d3-b86a-4a03793dc4b3', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '13:46', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 13:46:05', '2025-08-12 13:46:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('dcbe45e1-0751-46fc-b834-5f5dabe3e30b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '13:46', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 13:46:05', '2025-08-12 13:46:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b2a44502-0d74-4c42-9efd-f338dea24135', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '13:46', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 13:46:05', '2025-08-12 13:46:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('18b71963-b800-4a4b-a975-06961288c1c5', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '14:10', '33.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.4', '2025-08-12 14:10:59', '2025-08-12 14:10:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('60dfd96a-ca39-4b3c-a9a3-11948bcb3b5d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '14:50', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-12 14:51:00', '2025-08-12 14:51:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('84922090-081f-45f6-a9ef-f53d4732c10c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '14:51', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-12 14:51:04', '2025-08-12 14:51:04');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('8c1186ed-778f-4df7-a2eb-0a45983472ae', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '14:51', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-12 14:51:05', '2025-08-12 14:51:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('87836a5a-4348-4115-8fe2-b1783cdcc492', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '14:51', '32.8', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.8', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.8', '2025-08-12 14:51:05', '2025-08-12 14:51:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('133e0a77-c593-400f-a411-ee69d7a1af17', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '15:15', '33.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.2', '2025-08-12 15:15:59', '2025-08-12 15:15:59');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('cd1a7d12-c041-4f11-ad2c-12f84acbcf1b', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '15:25', '33.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.1', '2025-08-12 15:26:00', '2025-08-12 15:26:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0d9934a3-43a8-4f52-a34a-051872c0a97d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '15:55', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 15:56:05', '2025-08-12 15:56:05');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c67a0035-95e9-4bbb-a0a3-d9737051147e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '15:56', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 15:56:10', '2025-08-12 15:56:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4158df2e-2b3d-4b48-a2cc-25271e4cc772', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '15:56', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 15:56:10', '2025-08-12 15:56:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('05022ce2-f3de-4898-ae52-070b90942f7d', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '15:56', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 15:56:10', '2025-08-12 15:56:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('925926c7-58a8-47aa-8f7a-8b483aa85024', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '16:06', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:06', '2025-08-12 16:06:06');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('0bd8ea67-899c-4bb8-bc2a-2e9c55152571', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '16:06', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:10', '2025-08-12 16:06:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('61836dd6-c7aa-473a-ad8a-105c66d67dce', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '16:06', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:10', '2025-08-12 16:06:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('cf701b6f-6551-4b8e-8d63-4d10354b1711', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-12', '16:06', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:06:11', '2025-08-12 16:06:11');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('223655b8-db79-4f4c-af81-2c3b8f8806af', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '16:30', '33.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 33.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 33.6', '2025-08-12 16:31:00', '2025-08-12 16:31:00');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('eed17ea3-cb46-42d9-ba08-ce1f63cb1e24', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '17:38', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 17:38:40', '2025-08-12 17:38:40');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('ee897762-7ec4-4f98-a685-283cea1112b2', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '17:51', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 17:51:31', '2025-08-12 17:51:31');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('c53e0e36-b03d-4f0f-8bbd-eaf57732da13', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '18:56', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 18:56:26', '2025-08-12 18:56:26');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('00a27b78-1d58-4a6e-a6e2-5c797db96860', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '20:03', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 20:03:10', '2025-08-12 20:03:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('7ebe8ec7-f2d1-4f93-88d8-d36c43e48b5e', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '20:13', '32.9', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.9', '2025-08-12 20:13:10', '2025-08-12 20:13:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('4e30f8af-d915-4dbd-8473-53c97f4839c4', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '20:38', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:16', '2025-08-12 20:38:16');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('43f09bd0-82a4-4164-af7a-6178c45d5319', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '20:38', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:20', '2025-08-12 20:38:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('5a5083eb-689e-4994-aea6-36015c567115', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '20:38', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:20', '2025-08-12 20:38:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('31db828a-2c61-41c7-9182-3ebdfc31385f', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, '1', '2025-08-12', '20:38', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 20:38:20', '2025-08-12 20:38:20');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('40ba2777-97e9-45d2-9488-3acd704f14e1', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-12', '21:18', '32.6', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.6', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.6', '2025-08-12 21:18:10', '2025-08-12 21:18:10');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('683a1857-73e8-4bb6-9872-1d2f4174f19a', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-13', '20:42', '32.4', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.4', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.4', '2025-08-13 20:42:07', '2025-08-13 20:42:07');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('9e9e32fd-ca25-4697-85ea-5c6b9ef6b0fe', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-13', '21:31', '31.9', '33', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Recovery Warning Device Sensor: Temperature value: 31.9', '2025-08-13 21:32:02', '2025-08-13 21:32:02');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('f09608b4-f751-42a4-8178-81f194e21164', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-13', '21:56', '32.2', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.2', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.2', '2025-08-13 21:57:02', '2025-08-13 21:57:02');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('abcf7c71-05c6-423f-b285-dc76aabed148', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-13', '23:16', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-13 23:16:27', '2025-08-13 23:16:27');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('b4c59afd-8230-4630-a7ad-8ffb24f9ea3c', 1, 8, 1, '1', '1', '32', '33', '38', '33', 0, 0, 0, 0, 1, '1', '2025-08-13', '23:25', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-13 23:25:32', '2025-08-13 23:25:32');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('fe15c2b2-178b-4c27-b09d-f2097be78744', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-13', '23:25', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-13 23:25:45', '2025-08-13 23:25:45');
INSERT INTO "public"."sd_alarm_process_log_temp" VALUES ('d33a6ae2-5d13-4942-af03-dd17e81b4bad', 1, 8, 1, '1', '1', '32', '33', '38', '33', 1, 0, 0, 0, 0, NULL, '2025-08-13', '23:25', '32.1', '32', '1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning Device Sensor: Temperature value: 32.1', 'อาคาร 1 ชั้น 1  Alarm Sensor ON  Warning  Device Sensor: Temperature value: 32.1', '2025-08-13 23:25:48', '2025-08-13 23:25:48');

-- ----------------------------
-- Table structure for sd_device_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_log";
CREATE TABLE "public"."sd_device_log" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_log_id_seq'::regclass),
  "type_id" int4 NOT NULL,
  "sensor_id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4,
  "lang" varchar(50) COLLATE "pg_catalog"."default",
  "create" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_device_log
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_alarm_device
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_alarm_device";
CREATE TABLE "public"."sd_iot_alarm_device" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Records of sd_iot_alarm_device
-- ----------------------------
INSERT INTO "public"."sd_iot_alarm_device" VALUES ('979dc81b-fe2f-412e-859a-3dea5b5725b6', 1, 8);
INSERT INTO "public"."sd_iot_alarm_device" VALUES ('74150d6f-575d-47ea-974d-44e18a58b1cd', 71, 10);
INSERT INTO "public"."sd_iot_alarm_device" VALUES ('22357eab-42d5-4eba-83e6-d4634abb732c', 70, 8);

-- ----------------------------
-- Table structure for sd_iot_alarm_device_event
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_alarm_device_event";
CREATE TABLE "public"."sd_iot_alarm_device_event" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Records of sd_iot_alarm_device_event
-- ----------------------------
INSERT INTO "public"."sd_iot_alarm_device_event" VALUES ('0129302f-396c-43f7-97f7-d083869797d7', 1, 9);
INSERT INTO "public"."sd_iot_alarm_device_event" VALUES ('ade38564-d86a-45f8-80e8-b89695845283', 71, 9);
INSERT INTO "public"."sd_iot_alarm_device_event" VALUES ('e5e6ddf2-303a-49a3-ae4a-b06d7eb9f641', 70, 10);
INSERT INTO "public"."sd_iot_alarm_device_event" VALUES ('67878212-2439-4881-aef8-90b8b24ccdf0', 70, 9);

-- ----------------------------
-- Table structure for sd_iot_api
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_api";
CREATE TABLE "public"."sd_iot_api" (
  "api_id" int4 NOT NULL DEFAULT nextval('sd_iot_api_api_id_seq'::regclass),
  "api_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" int4,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token_value" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_api
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_device
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device";
CREATE TABLE "public"."sd_iot_device" (
  "device_id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
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
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (64, 1, 4, 5, 'IO1', 'Cmon104', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 51, '1', 1, 1, 'AIR4/DATA', 'AIR4/CONTROL', 'IO1', '1', '0', 'cmon_org', 'AIR4', 0, 'IO1', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-08-10 13:58:45.205726', '2025-08-14 16:22:53.673169');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (1, 1, 1, 1, 'Temperature', '1', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW01', 1, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-10 07:22:37.529797', '2025-08-17 15:41:11.77416');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (2, 1, 2, 1, 'Fan1', '2', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW01', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-10 07:23:58.321329', '2025-08-17 15:41:11.77416');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (18, 1, 2, 1, 'Fan1', '18', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 5, '1', 1, 1, 'BAACTW05/DATA', 'BAACTW05/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW05', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 03:37:29.016002', '2025-08-17 15:41:28.579472');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (14, 1, 1, 1, 'Temperature', '14', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 4, '1', 1, 1, 'BAACTW04/DATA', 'BAACTW04/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW04', 1, 'temperature', 'overFan1', ' {"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-18 07:14:50.969742', '2025-08-17 15:41:24.775708');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (11, 1, 1, 1, 'Temperature', '11', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 3, '1', 1, 1, 'BAACTW03/DATA', 'BAACTW03/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW03', 1, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-13 19:21:44.385944', '2025-08-17 15:41:19.270273');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (12, 1, 2, 1, 'fan1', '12', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 3, '1', 1, 1, 'BAACTW03/DATA', 'BAACTW03/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW03', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-13 20:12:52.499451', '2025-08-17 15:41:19.270273');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (13, 1, 3, 1, 'fan2', '13', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 3, '1', 1, 1, 'BAACTW03/DATA', 'BAACTW03/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW03', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-13 20:15:45.240595', '2025-08-17 15:41:19.270273');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (15, 1, 2, 1, 'Fan1', '15', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 4, '1', 1, 1, 'BAACTW04/DATA', 'BAACTW04/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW04', 1, 'fan1', 'overFan1', ' {"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-18 07:16:09.572274', '2025-08-17 15:41:24.775708');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (28, 1, 3, 1, 'Fan2', '28', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 8, '1', 1, 1, 'BAACTW08/DATA', 'BAACTW08/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW08', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 04:55:23.634936', '2025-08-17 15:41:51.544698');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (20, 1, 1, 1, 'Temperature', '20', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 6, '1', 1, 1, 'BAACTW06/DATA', 'BAACTW06/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW06', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 04:01:58.912912', '2025-08-17 15:41:32.179833');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (21, 1, 2, 1, 'Fan1', '21', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 6, '1', 1, 1, 'BAACTW06/DATA', 'BAACTW06/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW06', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 04:02:45.891187', '2025-08-17 15:41:32.179833');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (22, 1, 3, 1, 'Fan2', '22', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 6, '1', 1, 1, 'BAACTW06/DATA', 'BAACTW06/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW06', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 04:03:27.291358', '2025-08-17 15:41:32.179833');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (24, 1, 2, 1, 'Fan1', '24', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 7, '1', 1, 1, 'BAACTW07/DATA', 'BAACTW07/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW07', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 04:11:34.189065', '2025-08-17 15:41:35.924611');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (25, 1, 3, 1, 'Fan2', '25', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 7, '1', 1, 1, 'BAACTW07/DATA', 'BAACTW07/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW07', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 04:34:50.14121', '2025-08-17 15:41:35.924611');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (23, 1, 1, 1, 'Temperature', '23', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 7, '1', 1, 1, 'BAACTW07/DATA', 'BAACTW07/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW07', 1, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 04:10:34.689087', '2025-08-17 15:41:35.924611');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (26, 1, 1, 1, 'Temperature', '26', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 8, '1', 1, 1, 'BAACTW08/DATA', 'BAACTW08/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW08', 1, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 04:37:00.387072', '2025-08-17 15:41:51.544698');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (79, 1, 1, 1, 'Temperature', '79', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 15, '1', 1, 1, 'BAACTW15/DATA', 'BAACTW15/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW15', 0, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:39:33.605393', '2025-08-17 15:20:44.433735');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (76, 1, 1, 1, 'Temperature', '76', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 14, '1', 1, 1, 'BAACTW14/DATA', 'BAACTW14/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW14', 0, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:36:12.520456', '2025-08-17 15:20:46.390528');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (77, 1, 2, 1, 'Fan1', '77', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 14, '1', 1, 1, 'BAACTW14/DATA', 'BAACTW14/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW14', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:37:07.157531', '2025-08-17 15:20:46.390528');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (73, 1, 1, 1, 'Temperature', '73', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 13, '1', 1, 1, 'BAACTW13/DATA', 'BAACTW13/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW13', 0, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:30:59.089254', '2025-08-17 15:20:48.737092');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (74, 1, 2, 1, 'Fan1', '74', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 13, '1', 1, 1, 'BAACTW13/DATA', 'BAACTW13/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW13', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:32:06.681533', '2025-08-17 15:20:48.737092');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (75, 1, 3, 1, 'Fan2', '75', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 13, '1', 1, 1, 'BAACTW13/DATA', 'BAACTW13/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW13', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 08:33:48.54082', '2025-08-17 15:20:48.737092');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (38, 1, 1, 1, 'Temperature', '38', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 12, '1', 1, 1, 'BAACTW12/DATA', 'BAACTW12/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW12', 0, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:09:27.018994', '2025-08-17 15:20:50.783932');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (40, 1, 3, 1, 'Fan2', '40', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 12, '1', 1, 1, 'BAACTW12/DATA', 'BAACTW12/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW12', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 08:11:33.179924', '2025-08-17 15:20:50.783932');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (35, 1, 1, 1, 'Temperature', '35', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 11, '1', 1, 1, 'BAACTW11/DATA', 'BAACTW11/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW11', 0, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:05:38.309487', '2025-08-17 15:43:21.434336');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (17, 1, 1, 1, 'Temperature', '17', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 5, '1', 1, 1, 'BAACTW05/DATA', 'BAACTW05/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW05', 1, 'fan1', 'overFan1', ' {"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 03:32:36.724138', '2025-08-17 15:41:28.579472');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (32, 1, 1, 1, 'Temperature', '32', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 10, '1', 1, 1, 'BAACTW10/DATA', 'BAACTW10/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW10', 1, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:00:09.53003', '2025-08-17 15:43:12.468907');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (33, 1, 2, 1, 'Fan1', '33', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 10, '1', 1, 1, 'BAACTW10/DATA', 'BAACTW10/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW10', 1, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:01:18.429304', '2025-08-17 15:43:12.468907');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (27, 1, 2, 1, 'Fan1', '27', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 8, '1', 1, 1, 'BAACTW08/DATA', 'BAACTW08/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW08', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 04:38:15.232017', '2025-08-17 15:41:51.544698');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (36, 1, 2, 1, 'Fan1', '36', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 11, '1', 1, 1, 'BAACTW11/DATA', 'BAACTW11/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW11', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:06:35.557907', '2025-08-17 15:43:21.434336');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (29, 1, 1, 1, 'Temperature', '29', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 9, '1', 1, 1, 'BAACTW09/DATA', 'BAACTW09/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW09', 1, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 07:54:55.88571', '2025-08-17 15:43:08.719104');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (30, 1, 2, 1, 'Fan1', '30', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 9, '1', 1, 1, 'BAACTW09/DATA', 'BAACTW09/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW09', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 07:56:07.57479', '2025-08-17 15:43:08.719104');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (31, 1, 3, 1, 'Fan2', '31', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 9, '1', 1, 1, 'BAACTW09/DATA', 'BAACTW09/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW09', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 07:57:11.212999', '2025-08-17 15:43:08.719104');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (101, 1, 4, 5, 'IO1', '101', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 49, '1', 1, 1, 'AIR2/DATA', 'AIR2/CONTROL', 'IO1', '1', '0', 'cmon_org', 'AIR2', 0, 'IO1', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-08-08 07:23:01.543183', '2025-08-13 16:32:24.758521');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (102, 1, 5, 5, 'IO2', '102', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 49, '1', 1, 1, 'AIR2/DATA', 'AIR2/CONTROL', 'IO2', '3', '2', 'cmon_org', 'AIR2', 0, 'IO2', 'overIO2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay2', 'contRelay2', '2025-08-08 07:24:58.499878', '2025-08-13 16:32:24.758521');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (95, 1, 2, 1, 'Fan1', '95', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 20, '1', 1, 1, 'BAACTW20/DATA', 'BAACTW20/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW20', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:53:41.041496', '2025-08-17 15:20:31.047149');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (91, 1, 1, 1, 'Temperature', '91', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 19, '1', 1, 1, 'BAACTW19/DATA', 'BAACTW19/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW19', 0, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:46:18.896538', '2025-08-17 15:20:34.041975');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (92, 1, 2, 1, 'Fan1', '92', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 19, '1', 1, 1, 'BAACTW19/DATA', 'BAACTW19/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW19', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:49:32.393819', '2025-08-17 15:20:34.041975');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (93, 1, 3, 1, 'Fan2', '93', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 19, '1', 1, 1, 'BAACTW19/DATA', 'BAACTW19/CONTROL', 'fan1', '3', '2', 'cmon_org', 'BAACTW19', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:50:34.331955', '2025-08-17 15:20:34.041975');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (88, 1, 1, 1, 'Temperature', '88', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 18, '1', 1, 1, 'BAACTW18/DATA', 'BAACTW18/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW18', 0, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:41:48.436806', '2025-08-17 15:20:35.995874');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (89, 1, 2, 1, 'Fan1', '89', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 18, '1', 1, 1, 'BAACTW18/DATA', 'BAACTW18/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW18', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:42:38.806695', '2025-08-17 15:20:35.995874');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (90, 1, 3, 1, 'Fan2', '90', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 18, '1', 1, 1, 'BAACTW18/DATA', 'BAACTW18/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW18', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-21 05:43:23.376222', '2025-08-17 15:20:35.995874');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (85, 1, 1, 1, 'Temperature', '85', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 17, '1', 1, 1, 'BAACTW17/DATA', 'BAACTW17/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW17', 0, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:33:56.503493', '2025-08-17 15:20:37.950168');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (86, 1, 2, 1, 'Fan1', '86', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 17, '1', 1, 1, 'BAACTW17/DATA', 'BAACTW17/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW17', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-21 05:34:51.271585', '2025-08-17 15:20:37.950168');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (87, 1, 3, 1, 'Fan12', '87', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 17, '1', 1, 1, 'BAACTW17/DATA', 'BAACTW17/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW17', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-21 05:35:40.18173', '2025-08-17 15:20:37.950168');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (83, 1, 2, 1, 'Fan1', '83', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 16, '1', 1, 1, 'BAACTW16/DATA', 'BAACTW16/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW16', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:44:50.584999', '2025-08-17 15:20:42.473231');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (84, 1, 3, 1, 'Fan2', '84', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 16, '1', 1, 1, 'BAACTW16/DATA', 'BAACTW16/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW16', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 08:45:42.675485', '2025-08-17 15:20:42.473231');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (81, 1, 3, 1, 'Fan2', '81', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 15, '1', 1, 1, 'BAACTW15/DATA', 'BAACTW15/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW15', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 08:41:34.975559', '2025-08-17 15:20:44.433735');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (39, 1, 2, 1, 'Fan1', '39', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 12, '1', 1, 1, 'BAACTW12/DATA', 'BAACTW12/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW12', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:10:33.925395', '2025-08-17 15:20:50.783932');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (37, 1, 3, 1, 'Fan2', '37', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 11, '1', 1, 1, 'BAACTW11/DATA', 'BAACTW11/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW11', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 08:07:43.759029', '2025-08-17 15:43:21.434336');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (100, 1, 1, 5, 'Temperature', '100', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 49, '1', 1, 1, 'AIR2/DATA', 'AIR2/CONTROL', 'temperature', '1', '0', 'cmon_org', 'AIR2', 0, 'temperature', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-08-08 07:19:18.055848', '2025-08-13 16:32:24.758521');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (103, 1, 6, 5, 'IO3', '103', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 49, '1', 1, 1, 'AIR2/DATA', 'AIR2/CONTROL', 'IO3', '5', '4', 'cmon_org', 'AIR2', 0, 'IO3', 'overIO3', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay3', 'contRelay3', '2025-08-08 07:27:21.6631', '2025-08-13 16:32:24.758521');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (59, 1, 1, 5, 'Temperature', 'AIR401', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 50, '1', 1, 1, 'AIR3/DATA', 'AIR3/CONTROL', 'Temperature', '1', '0', 'cmon_org', 'AIR3', 0, 'temperature', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-08-10 11:39:46.921408', '2025-08-13 15:00:54.495335');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (61, 1, 5, 5, 'IO2', 'AIR403', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 50, '1', 1, 1, 'AIR3/DATA', 'AIR3/CONTROL', 'IO2', '2', '3', 'cmon_org', 'AIR3', 0, 'IO2', 'overIO2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay2', 'contRelay2', '2025-08-10 11:44:17.239832', '2025-08-13 15:00:54.495335');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (62, 1, 6, 5, 'IO3', 'AIR404', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 50, '1', 1, 1, 'AIR3/DATA', 'AIR3/CONTROL', 'IO3', '5', '4', 'cmon_org', 'AIR3', 0, 'IO3', 'overIO3', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay3', 'contRelay3', '2025-08-10 11:46:02.796633', '2025-08-13 15:00:54.495335');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (60, 1, 4, 5, 'IO1', 'AIR402', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 50, '1', 1, 1, 'AIR3/DATA', 'AIR3/CONTROL', 'IO1', '1', '0', 'cmon_org', 'AIR3', 0, 'IO1', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-08-10 11:42:24.861231', '2025-08-13 15:00:54.495335');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (66, 1, 6, 5, 'IO3', 'AIR503', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 51, '1', 1, 1, 'AIR4/DATA', 'AIR4/CONTROL', 'IO3', '4', '5', 'cmon_org', 'AIR4', 0, 'IO3', 'overIO3', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay3', 'contRelay3', '2025-08-10 14:08:17.185679', '2025-08-14 16:22:53.673169');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (63, 1, 1, 5, 'Temperature', '104', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 51, '1', 1, 1, 'AIR4/DATA', 'AIR4/CONTROL', 'Temperature', '1', '0', 'cmon_org', 'AIR4', 0, 'temperature', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-08-10 13:55:41.498564', '2025-08-14 16:22:53.673169');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (65, 1, 5, 5, 'IO2', 'AIR501', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 51, '1', 1, 1, 'AIR4/DATA', 'AIR4/CONTROL', 'IO2', '2', '3', 'cmon_org', 'AIR4', 0, 'IO2', 'overIO2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay2', 'contRelay2', '2025-08-10 14:05:33.963061', '2025-08-14 16:22:53.673169');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (3, 1, 3, 1, 'Fan2', '3', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW01', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-10 07:24:51.779966', '2025-08-17 15:41:11.77416');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (97, 1, 1, 1, 'Temperature', '97', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 21, '1', 1, 1, 'BAACTW21/DATA', 'BAACTW21/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW21', 0, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-23 12:49:12.795014', '2025-08-17 15:20:29.094233');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (98, 1, 2, 1, 'Fan1', '98', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 21, '1', 1, 1, 'BAACTW21/DATA', 'BAACTW21/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW21', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-23 12:49:53.042003', '2025-08-17 15:20:29.094233');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (34, 1, 3, 1, 'Fan1', '34', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 10, '1', 1, 1, 'BAACTW10/DATA', 'BAACTW10/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW10', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 08:02:46.273459', '2025-08-17 15:43:12.468907');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (19, 1, 3, 1, 'Fan2', '19', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 5, '1', 1, 1, 'BAACTW05/DATA', 'BAACTW05/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW05', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 03:38:15.438231', '2025-08-17 15:41:28.579472');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (16, 1, 3, 1, 'Fan2', '16', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 4, '1', 1, 1, 'BAACTW04/DATA', 'BAACTW04/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW04', 1, 'fan2', 'overFan2', ' {"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-18 07:17:11.787151', '2025-08-17 15:41:24.775708');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (8, 1, 1, 1, 'Temperature', '8', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 2, '1', 1, 1, 'BAACTW02/DATA', 'BAACTW02/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW02', 1, 'temperature', 'overFan1', '{"0":"temperature","1":"contRelay1","2":"actRelay1","3":"fan1","4":"overFan1","5":"contRelay2","6":"actRelay2","7":"fan2","8":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-11 03:59:48.643594', '2025-08-17 15:41:15.558691');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (99, 1, 3, 1, 'Fan2', '99', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 21, '1', 1, 1, 'BAACTW21/DATA', 'BAACTW21/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW21', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-23 12:50:38.416197', '2025-08-17 15:20:29.094233');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (94, 1, 1, 1, 'Temperature', '94', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 20, '1', 1, 1, 'BAACTW20/DATA', 'BAACTW20/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW20', 0, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay1', '2025-07-21 05:52:42.173465', '2025-08-17 15:20:31.047149');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (96, 1, 3, 1, 'Fan2', '96', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 20, '1', 1, 1, 'BAACTW20/DATA', 'BAACTW20/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW20', 0, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-21 05:54:31.617471', '2025-08-17 15:20:31.047149');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (82, 1, 1, 1, 'Temperature', '82', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 16, '1', 1, 1, 'BAACTW16/DATA', 'BAACTW16/CONTROL', 'tmperature', '1', '0', 'cmon_org', 'BAACTW16', 0, 'tmperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:43:47.603767', '2025-08-17 15:20:42.473231');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (80, 1, 2, 1, 'Fan1', '80', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 15, '1', 1, 1, 'BAACTW15/DATA', 'BAACTW15/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW15', 0, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-19 08:40:35.626717', '2025-08-17 15:20:44.433735');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (78, 1, 3, 1, 'Fan2', '78', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 14, '1', 1, 1, 'BAACTW14/DATA', 'BAACTW14/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW14', 0, 'fan2', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-19 08:37:58.377618', '2025-08-17 15:20:46.390528');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (7, 1, 6, 5, 'IO3', '7', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 48, '1', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'IO3', '5', '4', 'cmon_org', 'AIR1', 1, 'IO3', 'overIO3', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay3', 'contRelay3', '2025-07-10 09:21:14.26833', '2025-08-17 15:24:55.752365');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (4, 1, 1, 5, 'Temperature', '4', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 48, '1', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'temperature', '1', '0', 'cmon_org', 'AIR1', 1, 'temperature', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-07-10 09:11:26.104342', '2025-08-17 15:24:55.752365');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (9, 1, 2, 1, 'Fan1', '9', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 2, '1', 1, 1, 'BAACTW02/DATA', 'BAACTW02/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW02', 1, 'fan1', 'overFan1', '{"0":"temperature","1":"contRelay1","2":"actRelay1","3":"fan1","4":"overFan1","5":"contRelay2","6":"actRelay2","7":"fan2","8":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-10 07:23:58.321329', '2025-08-17 15:41:15.558691');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (10, 1, 3, 1, 'Fan2', '10', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 2, '1', 1, 1, 'BAACTW02/DATA', 'BAACTW02/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW02', 1, 'fan2', 'overFan2', '{"0":"temperature","1":"contRelay1","2":"actRelay1","3":"fan1","4":"overFan1","5":"contRelay2","6":"actRelay2","7":"fan2","8":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-10 07:24:51.779966', '2025-08-17 15:41:15.558691');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (5, 1, 4, 5, 'IO1', '5', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 48, '1', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'IO1', '1', '0', 'cmon_org', 'AIR1', 1, 'IO1', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-07-10 09:14:42.222597', '2025-08-17 15:24:55.752365');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (6, 1, 5, 5, 'IO2', '6', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 48, '1', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'IO2', '3', '2', 'cmon_org', 'AIR1', 1, 'IO2', 'overIO2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay2', 'contRelay2', '2025-07-10 09:19:53.885929', '2025-08-17 15:24:55.752365');

-- ----------------------------
-- Table structure for sd_iot_device_action
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_action";
CREATE TABLE "public"."sd_iot_device_action" (
  "device_action_user_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_action_device_action_user_id_seq'::regclass),
  "alarm_action_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Records of sd_iot_device_action
-- ----------------------------
INSERT INTO "public"."sd_iot_device_action" VALUES (1, 1, 1);

-- ----------------------------
-- Table structure for sd_iot_device_action_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_action_log";
CREATE TABLE "public"."sd_iot_device_action_log" (
  "log_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_action_log_log_id_seq'::regclass),
  "alarm_action_id" int4,
  "device_id" int4,
  "uid" varchar(255) COLLATE "pg_catalog"."default",
  "status" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_iot_device_action_log
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_device_action_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_action_user";
CREATE TABLE "public"."sd_iot_device_action_user" (
  "device_action_user_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_action_user_device_action_user_id_seq'::regclass),
  "alarm_action_id" int4,
  "uid" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of sd_iot_device_action_user
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_device_alarm_action
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_alarm_action";
CREATE TABLE "public"."sd_iot_device_alarm_action" (
  "alarm_action_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_alarm_action_alarm_action_id_seq'::regclass),
  "action_name" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "time_life" int4,
  "event" int4,
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_device_alarm_action
-- ----------------------------
INSERT INTO "public"."sd_iot_device_alarm_action" VALUES (70, ' Alarm Sensor  OFF', '30', '25', '32', '25', 1, 0, 0, 0, 0, 60, 0, 0);
INSERT INTO "public"."sd_iot_device_alarm_action" VALUES (71, ' Alarm IO', '0', '1', '0', '1', 1, 0, 0, 0, 0, 60, 1, 0);
INSERT INTO "public"."sd_iot_device_alarm_action" VALUES (1, ' Alarm Sensor ON', '32', '33', '38', '33', 1, 0, 0, 0, 0, 60, 1, 1);

-- ----------------------------
-- Table structure for sd_iot_device_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_type";
CREATE TABLE "public"."sd_iot_device_type" (
  "type_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_type_type_id_seq'::regclass),
  "type_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_device_type
-- ----------------------------
INSERT INTO "public"."sd_iot_device_type" VALUES (1, 'Sensor', '2025-07-02 14:36:14', '2025-07-02 14:36:17', 1);
INSERT INTO "public"."sd_iot_device_type" VALUES (2, 'Device IO Fan1', '2025-07-02 14:36:29', '2025-07-02 14:36:31', 1);
INSERT INTO "public"."sd_iot_device_type" VALUES (3, 'Device IO Fan2', '2025-07-04 19:30:52', '2025-07-04 19:30:54', 1);
INSERT INTO "public"."sd_iot_device_type" VALUES (4, 'Device IO Air1', '2025-07-09 05:33:33.896587', '2025-07-09 05:33:33.896587', 1);
INSERT INTO "public"."sd_iot_device_type" VALUES (5, 'Device IO Air2', '2025-07-09 05:33:42.667424', '2025-07-09 05:33:42.667424', 1);
INSERT INTO "public"."sd_iot_device_type" VALUES (6, 'Device IO Air3', '2025-07-09 13:18:10', '2025-07-09 13:18:12', 1);

-- ----------------------------
-- Table structure for sd_iot_email
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_email";
CREATE TABLE "public"."sd_iot_email" (
  "email_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "email_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" int4,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_email
-- ----------------------------
INSERT INTO "public"."sd_iot_email" VALUES ('8d42d344-7ef7-49b2-a724-4929f6fe83b7', 'monitoring.system.report', 'smtp.gmail.com', 456, 'monitoring.system.report@gmail.com', 'owortggrxrqhubxa', '2025-08-08 18:57:21.771293', '2025-08-14 09:12:11', 0);
INSERT INTO "public"."sd_iot_email" VALUES ('ce4e55c3-3adf-4829-bfdc-a500765888ea', 'icmon0955', 'smtp.gmail.com', 465, 'icmon0955@gmail.com', 'mbwodofvkznougir', '2025-08-08 17:13:08.06419', '2025-08-14 09:12:11', 0);
INSERT INTO "public"."sd_iot_email" VALUES ('07c13e1b-73d9-4215-86ab-e5e9a2ae418c', 'kongnakornit', 'smtp.gmail.com', 456, 'kongnakornit@gmail.com', 'asahzdatmywtwrji', '2025-08-11 10:22:07.975175', '2025-08-14 02:12:11.791542', 1);

-- ----------------------------
-- Table structure for sd_iot_group
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_group";
CREATE TABLE "public"."sd_iot_group" (
  "group_id" int4 NOT NULL DEFAULT nextval('sd_iot_group_group_id_seq'::regclass),
  "group_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_group
-- ----------------------------
INSERT INTO "public"."sd_iot_group" VALUES (2, 'Sensor', '2025-06-14 05:32:08.221808', '2025-06-14 05:32:08.221808', 1);

-- ----------------------------
-- Table structure for sd_iot_host
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_host";
CREATE TABLE "public"."sd_iot_host" (
  "host_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "host_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_host
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_influxdb
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_influxdb";
CREATE TABLE "public"."sd_iot_influxdb" (
  "influxdb_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "influxdb_name" text COLLATE "pg_catalog"."default",
  "host" text COLLATE "pg_catalog"."default",
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token_value" text COLLATE "pg_catalog"."default",
  "buckets" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_influxdb
-- ----------------------------
INSERT INTO "public"."sd_iot_influxdb" VALUES ('4575f87c-f944-42b1-b752-dbf066b51a5c', '192.168.1.60', 'http://192.168.1.60:8086', '8086', 'admin', 'Na@0955@#@#', 'd_cHu0cIMk5zj5eI7VdH6cqgeWWgcXStj4V5mfXUjVQhRhbJm087mzTIG0XrPWpsEhN5pnkZOw_I3s7rRp9SXQ==', 'BAACTW01', '2025-08-12 06:40:09.353368', '2025-08-13 19:54:00', 0);
INSERT INTO "public"."sd_iot_influxdb" VALUES ('6dd1f078-7a1e-4b7e-a5c5-d4cf76b00af2', '192.168.1.57', 'http://192.168.1.57:8086', '8086', 'admin', 'Na@0955@#@#', 'd_cHu0cIMk5zj5eI7VdH6cqgeWWgcXStj4V5mfXUjVQhRhbJm087mzTIG0XrPWpsEhN5pnkZOw_I3s7rRp9SXQ==', 'BAACTW02', '2025-08-12 04:50:20.517902', '2025-08-13 19:54:00', 0);
INSERT INTO "public"."sd_iot_influxdb" VALUES ('3788f226-ed32-48bd-8c18-e55ee9c997fb', '192.168.1.59', 'http://192.168.1.59:8086', '8086', 'admin', 'Na@0955@#@#', 'TGGzQa2jyLRyfhFqtntd32AwbNbWDy9PdfM0e9edAcm50XfRqCmka3maBk_9OIiXCYelOcWT65n7kMBkylsZhQ==', 'BAACTW03', '2025-08-12 04:49:15.287254', '2025-08-13 19:54:00', 1);

-- ----------------------------
-- Table structure for sd_iot_line
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_line";
CREATE TABLE "public"."sd_iot_line" (
  "line_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "line_name" text COLLATE "pg_catalog"."default",
  "client_id" text COLLATE "pg_catalog"."default",
  "client_secret" text COLLATE "pg_catalog"."default",
  "secret_key" text COLLATE "pg_catalog"."default",
  "redirect_uri" text COLLATE "pg_catalog"."default",
  "grant_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "accesstoken" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_line
-- ----------------------------
INSERT INTO "public"."sd_iot_line" VALUES ('bb083867-8ce5-42d2-9783-e5e344249520', 'cmonline', 'cmonline1', 'cmonline', 'cmonline', 'cmonline', 'cmonline', 'cmonline', 'cmonline', '2025-08-13 08:08:24.749824', '2025-08-17 22:53:01', 0);
INSERT INTO "public"."sd_iot_line" VALUES ('f1abc75a-0c19-4441-8f23-0035936b82d5', 'Ling OA 1', 'line1', 'line1', 'line1', 'line1', 'line1', 'line1', 'line1', '2025-08-13 09:59:23.26229', '2025-08-17 22:53:01', 0);
INSERT INTO "public"."sd_iot_line" VALUES ('006c5854-7331-44ef-ad55-9b191e1b4195', 'Ling OA 3', 'line1', 'line1', 'line1', 'line1', 'line1', 'line1', 'line1', '2025-08-13 12:08:43.608132', '2025-08-17 15:53:01.866281', 1);

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

-- ----------------------------
-- Records of sd_iot_location
-- ----------------------------
INSERT INTO "public"."sd_iot_location" VALUES (5, 'ธกส ระบบแอร์', '192.168.1.57', 'Air', '2025-07-08 16:09:59', '2025-07-08 16:10:01', 1, '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}');
INSERT INTO "public"."sd_iot_location" VALUES (1, 'ธกส ระบบพัดลม', '192.168.1.37', 'Fan', '2025-06-14 05:31:26.774385', '2025-06-14 05:31:26.774385', 1, '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}');

-- ----------------------------
-- Table structure for sd_iot_mqtt
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_mqtt";
CREATE TABLE "public"."sd_iot_mqtt" (
  "mqtt_id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "mqtt_type_id" int4,
  "sort" int4 NOT NULL DEFAULT 1,
  "mqtt_name" varchar COLLATE "pg_catalog"."default",
  "host" varchar COLLATE "pg_catalog"."default",
  "port" int4,
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
  "location_id" int4 DEFAULT 1,
  "latitude" varchar(255) COLLATE "pg_catalog"."default",
  "longitude" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of sd_iot_mqtt
-- ----------------------------
INSERT INTO "public"."sd_iot_mqtt" VALUES (3, 1, 3, 'อาคาร 1 ชั้น 2', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW03', 'measurement', '2025-08-05 11:00:39.967201', '2025-08-17 15:41:19.258872', 1, 1, '1.022', '-12.52');
INSERT INTO "public"."sd_iot_mqtt" VALUES (4, 1, 4, 'อาคาร 1 ชั้น 3', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW04', 'measurement', '2025-08-05 11:57:51.701548', '2025-08-17 15:41:24.76278', 1, 1, '1.022', '-25.110');
INSERT INTO "public"."sd_iot_mqtt" VALUES (7, 1, 7, 'อาคาร 1 ชั้น 6', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW07', 'measurement', '2025-08-05 12:17:05.211978', '2025-08-17 15:41:35.911373', 1, 1, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (8, 1, 8, 'อาคาร 1 ชั้น 7', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW08', 'measurement', '2025-07-02 17:55:12.306466', '2025-08-17 15:41:51.529354', 1, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (9, 1, 9, 'อาคาร 1 ชั้น 8', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW09', 'measurement', '2025-08-05 12:24:01.367645', '2025-08-17 15:43:08.706329', 1, 1, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (10, 1, 10, 'อาคาร 1 ชั้น 9', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW10', 'measurement', '2025-07-02 17:58:11.181382', '2025-08-17 15:43:12.457277', 1, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (11, 1, 11, 'อาคาร 1 ชั้น 10', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW11', 'measurement', '2025-07-02 17:59:22.793245', '2025-08-17 15:43:21.423104', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (13, 1, 13, 'อาคาร 1 ชั้น 12', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW13', 'measurement', '2025-07-02 18:02:12.555345', '2025-08-17 15:20:48.726521', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (12, 1, 12, 'อาคาร 1 ชั้น 11', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW12', 'measurement', '2025-08-05 12:28:11.068814', '2025-08-17 15:20:50.779765', 0, 1, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (14, 1, 14, 'อาคาร 1 ชั้น 13', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW14', 'measurement', '2025-07-02 18:04:26.522866', '2025-08-17 15:20:46.379466', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (15, 1, 15, 'อาคาร 1 ชั้น 14', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW15', 'measurement', '2025-08-05 12:31:36.721183', '2025-08-17 15:20:44.421692', 0, 1, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (16, 1, 16, 'อาคาร 1 ชั้น 15', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW16', 'measurement', '2025-07-02 18:10:02.175493', '2025-08-17 15:20:42.460867', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (17, 1, 17, 'อาคาร 1 ชั้น 16', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW17', 'measurement', '2025-07-02 18:11:17.185464', '2025-08-17 15:20:37.937554', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (18, 1, 18, 'อาคาร 1 ชั้น 17', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW18', 'measurement', '2025-07-02 18:12:16.790785', '2025-08-17 15:20:35.983957', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (5, 1, 5, 'อาคาร 1 ชั้น 4', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW05', 'measurement', '2025-08-05 12:04:37.922718', '2025-08-17 15:41:28.568593', 1, 1, '1.022', '-12.52');
INSERT INTO "public"."sd_iot_mqtt" VALUES (19, 1, 19, 'อาคาร 1 ชั้น 18', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW19', 'measurement', '2025-07-02 18:21:08.263892', '2025-08-17 15:20:34.030177', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (20, 1, 20, 'อาคาร 1 ชั้น 19', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW20', 'measurement', '2025-07-02 18:22:00.368086', '2025-08-17 15:20:31.032057', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (6, 1, 6, 'อาคาร 1 ชั้น 5', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW06', 'measurement', '2025-08-05 12:14:53.52864', '2025-08-17 15:41:32.166401', 1, 1, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (22, 1, 22, 'อาคาร 1 ชั้น 21', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW22', 'measurement', '2025-07-02 18:25:52.362096', '2025-07-09 05:30:17.569592', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (23, 1, 23, 'อาคาร 1 ชั้น 22', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW23', 'measurement', '2025-07-02 18:27:41.316091', '2025-07-08 07:40:40.77206', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (24, 1, 24, 'อาคาร 1 ชั้น 23', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW24', 'measurement', '2025-07-02 18:29:01.801024', '2025-07-08 07:40:38.285608', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (25, 1, 25, 'อาคาร 1 ชั้น 24', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW25', 'measurement', '2025-07-02 18:30:09.416368', '2025-07-08 07:40:35.722326', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (26, 1, 26, 'อาคาร 1 ชั้น 25', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW26', 'measurement', '2025-07-02 18:34:34.375539', '2025-07-08 07:40:33.172237', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (27, 1, 27, 'อาคาร 1 ชั้น 26', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW27', 'measurement', '2025-07-02 18:36:55.327374', '2025-07-08 07:40:30.848776', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (28, 1, 28, 'อาคาร 1 ชั้น 27', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW28', 'measurement', '2025-07-02 18:38:02.691683', '2025-07-08 07:40:26.709244', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (29, 1, 29, 'อาคาร 1 ชั้น 28', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW29', 'measurement', '2025-07-02 18:39:27.714616', '2025-07-08 07:40:24.103614', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (30, 1, 30, 'อาคาร 1 ชั้น 29', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW30', 'measurement', '2025-07-02 18:40:27.683204', '2025-07-08 07:40:21.598147', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (21, 1, 21, 'อาคาร 1 ชั้น 20', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW21', 'measurement', '2025-07-02 18:23:22.780183', '2025-08-17 15:20:29.035382', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (1, 1, 1, 'อาคาร 1  ชั้นใต้ดิน', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW01', 'measurement', '2025-07-02 17:45:47.490628', '2025-08-17 15:41:11.762175', 1, 1, '10.025', '-15.665');
INSERT INTO "public"."sd_iot_mqtt" VALUES (49, 1, 49, 'อาคาร 1 ชั้น 2 ระบบแอร์', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR2', 'measurement', '2025-08-05 14:45:30.811226', '2025-08-13 16:32:24.744501', 0, 5, '12.011', '-52.66');
INSERT INTO "public"."sd_iot_mqtt" VALUES (31, 1, 31, 'อาคาร 1 ชั้น 30', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW31', 'measurement', '2025-07-02 18:42:12.800326', '2025-07-08 07:40:19.066338', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (2, 1, 2, 'อาคาร 1 ชั้น 1', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW02', 'measurement', '2025-07-02 17:46:24.901486', '2025-08-17 15:41:15.546306', 1, 1, '1.022', '-12.52');
INSERT INTO "public"."sd_iot_mqtt" VALUES (32, 1, 32, 'อาคาร 1 ชั้น 31', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW32', 'measurement', '2025-07-02 18:43:28.590838', '2025-07-08 07:40:16.37704', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (33, 1, 33, 'อาคาร 1 ชั้น 32', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW33', 'measurement', '2025-07-02 18:45:51.548631', '2025-07-08 07:40:13.606847', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (34, 1, 34, 'อาคาร 1 ชั้น 33', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW34', 'measurement', '2025-07-02 18:47:42.560025', '2025-07-08 07:40:10.86767', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (35, 1, 35, 'อาคาร 1 ชั้น 34', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW35', 'measurement', '2025-07-02 18:49:57.530826', '2025-07-08 07:40:07.95824', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (36, 1, 36, 'อาคาร 1 ชั้น 35', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW36', 'measurement', '2025-07-02 18:52:16.643044', '2025-07-08 07:40:05.18667', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (37, 1, 37, 'อาคาร 1 ชั้น 36', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW37', 'measurement', '2025-07-02 18:54:11.322743', '2025-07-08 07:40:02.344448', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (38, 1, 38, 'อาคาร 1 ชั้น 37', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW38', 'measurement', '2025-07-02 18:55:03.603544', '2025-07-08 07:39:58.214827', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (39, 1, 39, 'อาคาร 1 ชั้น 38', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW39', 'measurement', '2025-07-02 18:56:11.980052', '2025-07-08 07:39:55.082086', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (41, 1, 41, 'อาคาร 1 ชั้น 40', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW41', 'measurement', '2025-07-02 18:57:50.080716', '2025-07-08 07:39:48.699803', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (42, 1, 42, 'อาคาร 1 ชั้น 41', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW42', 'measurement', '2025-07-03 02:19:50.087164', '2025-07-08 07:39:45.569379', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (43, 1, 43, 'อาคาร 1 ชั้น 42', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW43', 'measurement', '2025-07-03 04:31:27.737147', '2025-07-08 07:39:42.820828', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (44, 1, 44, 'อาคาร 1 ชั้น 43', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW44', 'measurement', '2025-07-03 04:34:35.272433', '2025-07-09 01:15:00.031229', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (45, 1, 45, 'อาคาร 1 ชั้น 44', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW45', 'measurement', '2025-07-03 04:39:13.63353', '2025-07-03 04:39:13.63353', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (46, 1, 46, 'อาคาร 1 ชั้น 45', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW46', 'measurement', '2025-07-03 04:41:50.784821', '2025-07-03 11:42:16', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (40, 1, 40, 'อาคาร 1 ชั้น 39', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW40', 'measurement', '2025-07-02 18:57:17.116998', '2025-07-08 07:39:51.768705', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (47, 1, 47, 'อาคาร 1 ชั้น 46', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW47', 'measurement', '2025-07-03 11:50:47.902532', '2025-07-05 11:32:04', 0, 1, NULL, NULL);
INSERT INTO "public"."sd_iot_mqtt" VALUES (52, 1, 52, 'อาคาร 1 ชั้น 5 ระบบแอร์', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR5', 'measurement', '2025-08-05 14:48:51.897808', '2025-08-10 14:09:07.955359', 0, 5, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (50, 1, 50, 'อาคาร 1 ชั้น 3 ระบบแอร์', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR3', 'measurement', '2025-08-05 14:46:29.133578', '2025-08-13 15:00:54.484787', 0, 5, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (51, 1, 51, 'อาคาร 1 ชั้น 4 ระบบแอร์', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR4', 'measurement', '2025-08-05 14:47:16.065451', '2025-08-14 16:22:53.647286', 0, 5, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (53, 1, 53, 'อาคาร 1 ชั้น 6 ระบบแอร์', '127.0.0.1', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR6', 'measurement', '2025-08-05 15:05:28.056932', '2025-08-05 15:05:28.056932', 0, 5, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (54, 1, 54, 'อาคาร 1 ชั้น 7 ระบบแอร์', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR7', 'measurement', '2025-08-05 15:08:11.579966', '2025-08-05 15:08:11.579966', 0, 5, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (55, 1, 55, 'อาคาร 1 ชั้น 8 ระบบแอร์', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR8', 'measurement', '2025-08-05 15:09:58.401591', '2025-08-05 15:09:58.401591', 0, 5, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (88, 1, 56, 'อาคาร 1 ชั้น 9 ระบบแอร์', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR9', 'measurement', '2025-08-08 07:16:16.697963', '2025-08-08 07:16:16.697963', 0, 5, '', '');
INSERT INTO "public"."sd_iot_mqtt" VALUES (48, 1, 48, 'อาคาร 1 ชั้น 1 ระบบแอร์', '127.0.0.1', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR1', 'measurement', '2025-07-08 11:02:53.09007', '2025-08-17 15:24:55.741372', 1, 5, '1.2055', '0.25');

-- ----------------------------
-- Table structure for sd_iot_nodered
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_nodered";
CREATE TABLE "public"."sd_iot_nodered" (
  "nodered_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "nodered_name" text COLLATE "pg_catalog"."default",
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "routing" text COLLATE "pg_catalog"."default",
  "client_id" text COLLATE "pg_catalog"."default",
  "grant_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "scope" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_nodered
-- ----------------------------
INSERT INTO "public"."sd_iot_nodered" VALUES ('718b7c4e-1daf-46a2-a0b8-e4d0128c880d', 'Node-red1', 'http://localhost:1881', '1881', 'uid', '11', '11', '1', 'admin', 'admin', '2025-08-12 12:15:09', '2025-08-16 10:40:41', 0);
INSERT INTO "public"."sd_iot_nodered" VALUES ('5155e3b8-1535-4733-890e-96a72a85d6dc', 'Node-red 59', 'http://192.168.1.59:1881', '1881', 'uid', '11', '11', '1', 'admin', 'admin', '2025-08-04 10:15:09', '2025-08-16 10:40:41', 0);
INSERT INTO "public"."sd_iot_nodered" VALUES ('123fd911-fb77-45da-a4aa-98d66b98335d', 'Node-red 57', 'http://192.168.1.57:1881', '1881', 'uid', '11', '11', '1', 'admin', 'admin', '2025-08-02 10:15:09', '2025-08-16 10:40:41', 1);

-- ----------------------------
-- Table structure for sd_iot_schedule
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_schedule";
CREATE TABLE "public"."sd_iot_schedule" (
  "schedule_id" int4 NOT NULL DEFAULT nextval('sd_iot_schedule_schedule_id_seq'::regclass),
  "schedule_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "device_id" int4,
  "start" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "event" int4,
  "sunday" int4,
  "monday" int4,
  "tuesday" int4,
  "wednesday" int4,
  "thursday" int4,
  "friday" int4,
  "saturday" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_schedule
-- ----------------------------
INSERT INTO "public"."sd_iot_schedule" VALUES (3, 'TASK 3', 1, '07:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 14:56:16.512273', '2025-08-02 06:41:18.936905', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (2, 'TASK 2', 1, '06:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 14:54:28.066507', '2025-08-02 13:41:32.798', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (1, 'TASK 1 ', 1, '05:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-06-16 02:31:55.869785', '2025-08-05 14:14:17.422', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (25, 'TASK 18', 1, '02:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:19:36.436198', '2025-08-17 15:35:17.498553', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (24, 'TASK 17', 1, '01:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:19:08.573638', '2025-08-17 15:35:19.409199', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (23, 'TASK 16', 1, '23:59', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:18:26.661226', '2025-08-17 15:35:21.364664', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (22, 'TASK 15', 1, '23:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:17:54.712381', '2025-08-17 15:35:23.28479', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (21, 'TASK 14', 1, '22:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:16:58.5464', '2025-08-17 15:35:25.240417', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (20, 'TASK 13', 1, '21:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:16:19.692145', '2025-08-17 15:35:28.283094', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (19, 'TASK 12', 1, '20:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:15:48.723569', '2025-08-17 15:35:30.19031', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (18, 'TASK 11', 1, '19:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-30 13:15:20.6672', '2025-08-17 15:35:32.083754', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (10, 'TASK 10', 1, '18:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:35:33.565295', '2025-08-17 15:35:35.4936', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (9, 'TASK 9', 1, '17:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:34:38.981455', '2025-08-17 15:35:37.385291', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (8, 'TASK 8', 1, '16:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:25:15.71962', '2025-08-17 15:35:39.328432', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (7, 'TASK 7', 1, '15:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:23:00.502995', '2025-08-17 15:35:41.350535', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (6, 'TASK 6', 1, '14:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:21:48.714074', '2025-08-17 15:35:43.399172', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (5, 'TASK 5', 1, '09:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:18:14.037309', '2025-08-17 15:35:46.672279', 0);
INSERT INTO "public"."sd_iot_schedule" VALUES (4, 'TASK 4', 1, '08:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:16:05.286756', '2025-08-17 15:35:48.702608', 0);

-- ----------------------------
-- Table structure for sd_iot_schedule_device
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_schedule_device";
CREATE TABLE "public"."sd_iot_schedule_device" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "schedule_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Records of sd_iot_schedule_device
-- ----------------------------
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('ad965985-d98e-4373-9300-4b02d8172d70', 2, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('e50756fc-12cf-4bac-b6e0-76312d99ca2e', 1, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('e64e0b27-b462-4444-a7a6-1d1db8490248', 5, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('5c22af4b-17ad-4b2f-a391-703ec7b6353b', 6, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('5a203bc0-aed3-4f36-a716-858be7629637', 7, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('992a4edb-3268-4a8d-ba2a-4ee622a601cd', 8, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('a3918957-0f89-47a3-8b18-f0af31f8474f', 9, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('40a2d068-85d6-478c-9659-3e1ecc8b140f', 10, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('d77015b1-2809-4ddf-90dd-3355e5a9db07', 10, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('ff5820aa-f2cd-4c31-8fd5-afca2100de3c', 9, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('23bc18ec-c268-4294-a5a0-2cdbd1263f6a', 5, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('becc10cf-3983-444e-8a39-d1797d0995e7', 6, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('717b4df0-df61-4945-8ddd-bb21ea3a3ace', 7, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('b238d8ae-2c31-4ced-8479-a3d006b008a2', 8, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('5aa584dd-3be4-4868-9178-a744d6a78f42', 3, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('9295afcc-2403-4d6b-bf38-129348e91fae', 4, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('afc5b25a-ef88-4093-9112-0d25f9afde06', 1, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('b524dc1f-bf4b-439c-b9b5-79bfb63bcafc', 3, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('5b00ced2-aad9-4aa7-af8f-1fb63d2f43fe', 18, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('343f05aa-a8ea-4120-a0c7-4607bdd0a9d4', 18, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('2cf372af-9903-4db2-ad38-7ad44e1332aa', 19, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('c324dc33-199c-4dd1-816d-040adcddaff9', 19, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('788897bf-a08f-4a99-9e4e-e6b6b9d637d9', 20, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('14bc16f8-6b0d-4f70-99ba-e6b0c29307c7', 20, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('24206ece-f053-4e9e-848b-b119aff88e9f', 21, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('06c00b15-3df3-432a-af34-9112d0b1de3f', 21, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('4d86a07b-33ab-4407-8f62-f6d39089c733', 22, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('5429a9eb-98f6-412b-bc68-e4fce1aea413', 22, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('40432d4d-325e-4945-9e2d-556d02514b69', 23, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('3e2f7a7c-02e9-4df3-8d2b-1cc8cfd9a0a0', 23, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('93b76ff7-1a26-4f9f-8fda-7ef50f55dd49', 24, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('ae6f0933-ddda-4cb0-847d-dc8bfd488fdf', 24, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('2d4346aa-00bd-4dbe-aef6-47fef9fc6c71', 25, 9);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('0b9566db-45bf-468c-a627-e6f26fd9a14e', 2, 10);
INSERT INTO "public"."sd_iot_schedule_device" VALUES ('9defe6f0-c68e-4e93-8bf7-433ab3e2ce59', 4, 10);

-- ----------------------------
-- Table structure for sd_iot_sensor
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_sensor";
CREATE TABLE "public"."sd_iot_sensor" (
  "sensor_id" int4 NOT NULL DEFAULT nextval('sd_iot_sensor_sensor_id_seq'::regclass),
  "setting_id" int4,
  "setting_type_id" int4,
  "sensor_name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "sn" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "max" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "min" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "hardware_id" int4,
  "status_high" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "status_warning" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "status_alert" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "model" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "vendor" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "comparevalue" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4,
  "unit" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_id" int4,
  "oid" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "action_id" int4,
  "status_alert_id" int4,
  "mqtt_data_value" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_data_control" varchar(250) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of sd_iot_sensor
-- ----------------------------
INSERT INTO "public"."sd_iot_sensor" VALUES (2, 1, 1, 'temperature', 'TS_001', '100', '0', 1, '90', '60', '45', 'model-1', 'vendor-1', '0', '2025-06-14 05:31:55.964183', '2025-06-14 05:31:55.964183', 1, '°C', 1, '1111111111111111', 1, 1, 'BAACTW02/DATA', 'BAACTW02/CONTROL');

-- ----------------------------
-- Table structure for sd_iot_setting
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_setting";
CREATE TABLE "public"."sd_iot_setting" (
  "setting_id" int4 NOT NULL DEFAULT nextval('sd_iot_setting_setting_id_seq'::regclass),
  "location_id" int4,
  "setting_type_id" int4,
  "setting_name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "sn" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_setting
-- ----------------------------
INSERT INTO "public"."sd_iot_setting" VALUES (1, 1, 1, 'ธนาคาร ธกส ', 'CMON-IS-2025-06-12-3', '2025-06-14 05:31:10.377656', '2025-06-14 05:31:10.377656', 1);

-- ----------------------------
-- Table structure for sd_iot_sms
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_sms";
CREATE TABLE "public"."sd_iot_sms" (
  "sms_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "sms_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" int4,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "apikey" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "originator" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_sms
-- ----------------------------
INSERT INTO "public"."sd_iot_sms" VALUES ('2ed51ff7-d696-4fca-838f-5c6f0b2e5ea7', 'SMS HOST2', '192.168.1.57', 8080, 'admin', 'admin', '555555', '8888888', '2025-08-10 17:16:54.634147', '2025-08-17 22:52:52', 0);
INSERT INTO "public"."sd_iot_sms" VALUES ('793bd564-af55-472c-a397-55b4339bde69', 'SMS HOST3', '192.168.1.60', 8080, 'admin', 'owortggrxrqhubxa', 'owortggrxrqhubxa', 'asahzdatmywtwrji', '2025-08-11 21:41:15.119214', '2025-08-17 22:52:52', 0);
INSERT INTO "public"."sd_iot_sms" VALUES ('5428cab3-29d9-4826-b866-c7ab2deec4de', 'SMS HOST', '192.168.1.59', 8080, 'admin', 'admin', '8888888DRsfsfs', '8888888', '2025-08-10 17:16:41.990862', '2025-08-17 15:52:52.229951', 1);

-- ----------------------------
-- Table structure for sd_iot_telegram
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_telegram";
CREATE TABLE "public"."sd_iot_telegram" (
  "telegram_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "telegram_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_telegram
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_token
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_token";
CREATE TABLE "public"."sd_iot_token" (
  "token_id" int4 NOT NULL DEFAULT nextval('sd_iot_token_token_id_seq'::regclass),
  "token_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" int4,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token_value" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_token
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_type";
CREATE TABLE "public"."sd_iot_type" (
  "type_id" int4 NOT NULL DEFAULT nextval('sd_iot_type_type_id_seq'::regclass),
  "type_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "group_id" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_type
-- ----------------------------
INSERT INTO "public"."sd_iot_type" VALUES (1, 'MQTT', 1, '2025-06-14 05:31:39.53646', '2025-06-14 05:31:39.53646', 1);
INSERT INTO "public"."sd_iot_type" VALUES (2, 'SNMP', 1, '2025-06-18 20:08:39', '2025-06-18 20:08:41', 1);
INSERT INTO "public"."sd_iot_type" VALUES (3, 'GPS', 1, '2025-08-05 08:51:49', '2025-08-05 08:51:52', 1);
INSERT INTO "public"."sd_iot_type" VALUES (4, 'MAP', 1, '2025-08-05 08:57:41', '2025-08-05 08:57:45', 1);

-- ----------------------------
-- Table structure for sd_mqtt_host
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_mqtt_host";
CREATE TABLE "public"."sd_mqtt_host" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "hostname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_mqtt_host
-- ----------------------------
INSERT INTO "public"."sd_mqtt_host" VALUES ('f10b15d6-9730-4b55-9fc0-8aca83f046fb', 'MQTT IP 172.25.99.60', 'mqtt://172.25.99.60:1883', '1883', 'admin', 'admin', '2025-08-09 10:46:39.10217', '2025-08-13 07:33:17.033987', 1);
INSERT INTO "public"."sd_mqtt_host" VALUES ('ac9eafeb-5bb3-48a2-87eb-cf28121e9310', 'MQTT IP 172.25.99.60 -1', 'mqtt://172.25.99.60:1883', '1883', 'admin', 'admin', '2025-08-09 10:57:16.983012', '2025-08-13 14:33:17', 0);

-- ----------------------------
-- Table structure for sd_schedule_process_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_schedule_process_log";
CREATE TABLE "public"."sd_schedule_process_log" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "schedule_id" int4,
  "device_id" int4,
  "schedule_event_start" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "day" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "doday" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "dotime" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "schedule_event" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "device_status" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "date" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_schedule_process_log
-- ----------------------------
INSERT INTO "public"."sd_schedule_process_log" VALUES ('2b1f525f-752a-4f74-b2eb-a60fa6b0861e', 21, 9, '22:00', 'saturday', 'saturday', '2025-08-02 22:21:03', '0', '0', '1', '2025-08-02', '22:26', '2025-08-02 22:21:06', '2025-08-02 22:26:40');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('3cf36060-b429-4537-9963-8a898fe3a527', 21, 10, '22:00', 'saturday', 'saturday', '2025-08-02 22:21:06', '2', '2', '1', '2025-08-02', '22:26', '2025-08-02 22:21:11', '2025-08-02 22:26:40');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('c7b2925f-4260-4f89-bc4e-357cf38aa75d', 3, 9, '07:00', 'tuesday', 'tuesday', '2025-08-05 07:10:02', '1', '1', '1', '2025-08-05', '07:10', '2025-08-05 07:10:05', '2025-08-05 07:10:05');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d41f3a4a-6aa0-407e-9e2f-31b6e1e25944', 3, 10, '07:00', 'tuesday', 'tuesday', '2025-08-05 07:10:05', '3', '3', '1', '2025-08-05', '07:10', '2025-08-05 07:10:10', '2025-08-05 07:10:10');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('cd997e8f-548c-4f7f-a5c5-4ad380ec93eb', 4, 9, '08:00', 'tuesday', 'tuesday', '2025-08-05 08:09:19', '0', '0', '1', '2025-08-05', '08:09', '2025-08-05 08:09:19', '2025-08-05 08:09:19');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('fa69c03e-b283-4059-b550-b7cf4fe62872', 4, 10, '08:00', 'tuesday', 'tuesday', '2025-08-05 08:09:19', '2', '2', '1', '2025-08-05', '08:09', '2025-08-05 08:09:24', '2025-08-05 08:09:24');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('080004c0-e0a5-406a-90c7-43e3968a2cd1', 5, 9, '09:00', 'tuesday', 'tuesday', '2025-08-05 09:00:01', '1', '1', '1', '2025-08-05', '09:00', '2025-08-05 09:00:04', '2025-08-05 09:00:04');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('b7ce7bbc-26de-4ecd-85ef-e601ad770a2e', 5, 10, '09:00', 'tuesday', 'tuesday', '2025-08-05 09:00:04', '3', '3', '1', '2025-08-05', '09:00', '2025-08-05 09:00:09', '2025-08-05 09:00:09');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('acd8a46e-fbe6-493a-a901-659f4cf59699', 6, 9, '14:00', 'tuesday', 'tuesday', '2025-08-05 14:00:43', '0', '0', '1', '2025-08-05', '14:00', '2025-08-05 14:00:44', '2025-08-05 14:00:44');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('172de100-1468-4526-8a2c-25c5a9b1628b', 6, 10, '14:00', 'tuesday', 'tuesday', '2025-08-05 14:00:45', '2', '2', '1', '2025-08-05', '14:00', '2025-08-05 14:00:49', '2025-08-05 14:00:49');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('9dd08012-bc31-42ba-a52e-dc8012042c19', 19, 9, '20:00', 'tuesday', 'tuesday', '2025-08-05 20:30:00', '0', '0', '1', '2025-08-05', '20:30', '2025-08-05 20:30:22', '2025-08-05 20:30:22');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('fe2138c9-4772-4d6a-bc91-47c0d260cf53', 19, 10, '20:00', 'tuesday', 'tuesday', '2025-08-05 20:30:22', '2', '2', '1', '2025-08-05', '20:30', '2025-08-05 20:30:27', '2025-08-05 20:30:27');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('00ee0c53-3f3b-490a-a02b-fb0fd9b34fb5', 24, 9, '01:00', 'sunday', 'sunday', '2025-08-03 01:02:01', '1', '1', '1', '2025-08-03', '01:01', '2025-08-03 01:02:01', '2025-08-03 01:02:01');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('1a5e1f43-617a-43c8-9343-1ab6c5f9ffce', 24, 10, '01:00', 'sunday', 'sunday', '2025-08-03 01:02:01', '3', '3', '1', '2025-08-03', '01:02', '2025-08-03 01:02:06', '2025-08-03 01:02:06');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('85761401-094a-473c-a5be-9b85579f870f', 25, 9, '02:00', 'sunday', 'sunday', '2025-08-03 02:01:41', '0', '0', '1', '2025-08-03', '02:01', '2025-08-03 02:01:41', '2025-08-03 02:01:41');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f90333d7-e9d1-41fd-bddd-bf6d10a65f6b', 25, 10, '02:00', 'sunday', 'sunday', '2025-08-03 02:01:42', '2', '2', '1', '2025-08-03', '02:01', '2025-08-03 02:01:46', '2025-08-03 02:01:46');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('52e79c92-f377-4f3c-bf3b-7115b49709bd', 1, 9, '05:00', 'sunday', 'sunday', '2025-08-03 05:01:19', '1', '1', '1', '2025-08-03', '05:01', '2025-08-03 05:01:22', '2025-08-03 05:01:22');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('0ccebc41-d63b-4afe-a7be-689a85f68225', 1, 10, '05:00', 'sunday', 'sunday', '2025-08-03 05:01:22', '3', '3', '1', '2025-08-03', '05:01', '2025-08-03 05:01:27', '2025-08-03 05:01:27');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('5c68ff16-e942-4371-86cc-f9ce10ecede0', 6, 9, '14:00', 'sunday', 'sunday', '2025-08-03 14:01:30', '0', '0', '1', '2025-08-03', '14:01', '2025-08-03 14:01:32', '2025-08-03 14:01:32');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('5b772d7b-5c77-4975-aeb4-fede8bcb83a0', 6, 10, '14:00', 'sunday', 'sunday', '2025-08-03 14:01:32', '2', '2', '1', '2025-08-03', '14:01', '2025-08-03 14:01:37', '2025-08-03 14:01:37');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ffbe638e-faea-4843-ade9-cecabeecae4b', 7, 9, '15:00', 'sunday', 'sunday', '2025-08-03 15:01:02', '1', '1', '1', '2025-08-03', '15:01', '2025-08-03 15:01:02', '2025-08-03 15:01:02');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('96f8282d-81b7-40a7-b217-358157be5d71', 7, 10, '15:00', 'sunday', 'sunday', '2025-08-03 15:01:02', '3', '3', '1', '2025-08-03', '15:01', '2025-08-03 15:01:07', '2025-08-03 15:01:07');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('c3fc6750-adb7-4b7a-a696-a00a8340f95b', 8, 9, '16:00', 'sunday', 'sunday', '2025-08-03 16:00:06', '0', '0', '1', '2025-08-03', '16:00', '2025-08-03 16:00:07', '2025-08-03 16:00:07');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('58f698b8-31e1-404e-bbdb-53e69986fd38', 8, 10, '16:00', 'sunday', 'sunday', '2025-08-03 16:00:07', '2', '2', '1', '2025-08-03', '16:00', '2025-08-03 16:00:12', '2025-08-03 16:00:12');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('c34333b0-175e-4bfb-85e3-9b9c09d7a393', 9, 9, '17:00', 'sunday', 'sunday', '2025-08-03 17:01:36', '1', '1', '1', '2025-08-03', '17:01', '2025-08-03 17:01:37', '2025-08-03 17:01:37');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('7fce5505-1f5f-43ad-bd21-158f9bc07f42', 9, 10, '17:00', 'sunday', 'sunday', '2025-08-03 17:01:37', '3', '3', '1', '2025-08-03', '17:01', '2025-08-03 17:01:42', '2025-08-03 17:01:42');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('55b0e515-9e9c-4ed1-aba4-1fdba599b2f5', 10, 9, '18:00', 'sunday', 'sunday', '2025-08-03 18:01:36', '0', '0', '1', '2025-08-03', '18:01', '2025-08-03 18:01:37', '2025-08-03 18:01:37');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('8768fec8-7796-4c14-87f3-7b357a0c4a96', 10, 10, '18:00', 'sunday', 'sunday', '2025-08-03 18:01:37', '2', '2', '1', '2025-08-03', '18:01', '2025-08-03 18:01:42', '2025-08-03 18:01:42');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('3409b936-c36f-417f-b4e8-0e34468cf792', 18, 9, '19:00', 'sunday', 'sunday', '2025-08-03 19:01:35', '1', '1', '1', '2025-08-03', '19:01', '2025-08-03 19:01:37', '2025-08-03 19:01:37');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('8e0baed4-3d1f-4cae-8512-dc55e713ec1c', 18, 10, '19:00', 'sunday', 'sunday', '2025-08-03 19:01:37', '3', '3', '1', '2025-08-03', '19:01', '2025-08-03 19:01:42', '2025-08-03 19:01:42');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('622268ce-daff-4dd3-8705-fb89a6b025ac', 19, 9, '20:00', 'sunday', 'sunday', '2025-08-03 20:01:36', '0', '0', '1', '2025-08-03', '20:01', '2025-08-03 20:01:37', '2025-08-03 20:01:37');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('9f787d82-9234-4e76-88a7-4962a8b5578c', 19, 10, '20:00', 'sunday', 'sunday', '2025-08-03 20:01:37', '2', '2', '1', '2025-08-03', '20:01', '2025-08-03 20:01:42', '2025-08-03 20:01:42');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('29a1dd17-8375-4d1a-9a5d-9dfa02fe4e4c', 6, 9, '14:00', 'monday', 'monday', '2025-08-04 14:03:19', '0', '0', '1', '2025-08-04', '14:03', '2025-08-04 14:03:23', '2025-08-04 14:03:23');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ac398207-00d4-4293-a366-268f211eb53a', 6, 10, '14:00', 'monday', 'monday', '2025-08-04 14:03:23', '2', '2', '1', '2025-08-04', '14:03', '2025-08-04 14:03:28', '2025-08-04 14:03:28');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('2ff12451-07a2-4031-8721-4038ffbd6874', 7, 9, '15:00', 'monday', 'monday', '2025-08-04 15:06:33', '1', '1', '1', '2025-08-04', '15:06', '2025-08-04 15:06:33', '2025-08-04 15:06:33');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('30bd5c78-fd61-4899-90f1-5b92cbc0032e', 7, 10, '15:00', 'monday', 'monday', '2025-08-04 15:06:33', '3', '3', '1', '2025-08-04', '15:06', '2025-08-04 15:06:38', '2025-08-04 15:06:38');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('a925347b-dcdd-4ff8-a459-73e9e9805eda', 8, 9, '16:00', 'monday', 'monday', '2025-08-04 16:06:32', '0', '0', '1', '2025-08-04', '16:06', '2025-08-04 16:06:33', '2025-08-04 16:06:33');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f2750c9f-2e49-4d11-95d5-6835758ad096', 8, 10, '16:00', 'monday', 'monday', '2025-08-04 16:06:33', '2', '2', '1', '2025-08-04', '16:06', '2025-08-04 16:06:38', '2025-08-04 16:06:38');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('5dcf3c0c-ac5a-40b9-af40-cc3635c43642', 9, 9, '17:00', 'monday', 'monday', '2025-08-04 17:06:32', '1', '1', '1', '2025-08-04', '17:06', '2025-08-04 17:06:34', '2025-08-04 17:06:34');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('42a86683-91d3-4f60-84bc-84f4bc423ec6', 9, 10, '17:00', 'monday', 'monday', '2025-08-04 17:06:34', '3', '3', '1', '2025-08-04', '17:06', '2025-08-04 17:06:39', '2025-08-04 17:06:39');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d973438e-7f8b-4462-a0e2-d6ced6ded552', 18, 9, '19:00', 'monday', 'monday', '2025-08-04 19:06:31', '1', '1', '1', '2025-08-04', '19:06', '2025-08-04 19:06:34', '2025-08-04 19:06:34');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('29f592f4-5140-4874-93f6-5c69bca560cf', 6, 9, '14:00', 'wednesday', 'wednesday', '2025-08-06 14:05:58', '0', '0', '1', '2025-08-06', '14:05', '2025-08-06 14:05:58', '2025-08-06 14:05:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('72c23eb5-bd7f-4f12-818b-e7244933d572', 18, 10, '19:00', 'monday', 'monday', '2025-08-04 19:06:34', '3', '3', '1', '2025-08-04', '19:06', '2025-08-04 19:06:39', '2025-08-04 19:06:39');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('6e084e3b-fd0f-4a20-84b1-5f5467b79758', 19, 9, '20:00', 'monday', 'monday', '2025-08-04 20:06:31', '0', '0', '1', '2025-08-04', '20:06', '2025-08-04 20:06:34', '2025-08-04 20:06:34');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('8e2f0ffb-1664-4d59-ad61-75ca53a14fa9', 19, 10, '20:00', 'monday', 'monday', '2025-08-04 20:06:34', '2', '2', '1', '2025-08-04', '20:06', '2025-08-04 20:06:39', '2025-08-04 20:06:39');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('129bc6e9-5a67-498e-830f-be808547d34a', 20, 9, '21:00', 'monday', 'monday', '2025-08-04 21:06:31', '1', '1', '1', '2025-08-04', '21:06', '2025-08-04 21:06:35', '2025-08-04 21:06:35');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('7e004b1f-d317-48b7-ab7d-5d8b60e69e68', 20, 10, '21:00', 'monday', 'monday', '2025-08-04 21:06:35', '3', '3', '1', '2025-08-04', '21:06', '2025-08-04 21:06:40', '2025-08-04 21:06:40');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('8b1bd629-3dbd-4671-bc5b-93f0dedc7d05', 6, 10, '14:00', 'wednesday', 'wednesday', '2025-08-06 14:05:59', '2', '2', '1', '2025-08-06', '14:05', '2025-08-06 14:06:04', '2025-08-06 14:06:04');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('c1acd5a7-c7c0-4357-b2e7-3418aabc4d6e', 21, 9, '22:00', 'monday', 'monday', '2025-08-04 22:06:29', '0', '0', '1', '2025-08-04', '22:06', '2025-08-04 22:06:30', '2025-08-04 22:06:30');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('c8e4553f-3628-4129-b2ee-260b2d533b72', 21, 10, '22:00', 'monday', 'monday', '2025-08-04 22:06:30', '2', '2', '1', '2025-08-04', '22:06', '2025-08-04 22:06:35', '2025-08-04 22:06:35');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('3fe03be3-59b8-4b6b-b8d1-323eda586e6e', 22, 9, '23:00', 'monday', 'monday', '2025-08-04 23:01:02', '1', '1', '1', '2025-08-04', '23:01', '2025-08-04 23:01:05', '2025-08-04 23:01:05');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('96d1f8ff-13dd-4c02-a927-37ed35caa0ba', 22, 10, '23:00', 'monday', 'monday', '2025-08-04 23:01:05', '3', '3', '1', '2025-08-04', '23:01', '2025-08-04 23:01:10', '2025-08-04 23:01:10');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('087fb527-3503-406b-8e5d-83dd7b13b3fd', 7, 9, '15:00', 'wednesday', 'wednesday', '2025-08-06 15:05:57', '1', '1', '1', '2025-08-06', '15:05', '2025-08-06 15:05:58', '2025-08-06 15:05:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('b7b51fcc-c089-439e-9cb6-334fcf0d462b', 7, 10, '15:00', 'wednesday', 'wednesday', '2025-08-06 15:05:59', '3', '3', '1', '2025-08-06', '15:05', '2025-08-06 15:06:03', '2025-08-06 15:06:03');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('7b114120-032a-4ee0-bbae-cab5252d72f3', 8, 9, '16:00', 'wednesday', 'wednesday', '2025-08-06 16:05:57', '0', '0', '1', '2025-08-06', '16:05', '2025-08-06 16:05:58', '2025-08-06 16:05:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d4032b17-497a-451d-bc37-d01ea4a12c1c', 8, 10, '16:00', 'wednesday', 'wednesday', '2025-08-06 16:05:59', '2', '2', '1', '2025-08-06', '16:05', '2025-08-06 16:06:03', '2025-08-06 16:06:03');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('67f32851-e26d-458a-b54b-31fb78a626c2', 9, 9, '17:00', 'wednesday', 'wednesday', '2025-08-06 17:05:57', '1', '1', '1', '2025-08-06', '17:05', '2025-08-06 17:05:59', '2025-08-06 17:05:59');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d413cc31-165a-4d1e-9f75-aea54b163a66', 9, 10, '17:00', 'wednesday', 'wednesday', '2025-08-06 17:05:59', '3', '3', '1', '2025-08-06', '17:05', '2025-08-06 17:06:03', '2025-08-06 17:06:03');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('3aec392e-cb49-4b7c-9095-527e1feb7612', 10, 9, '18:00', 'wednesday', 'wednesday', '2025-08-06 18:05:56', '0', '0', '1', '2025-08-06', '18:05', '2025-08-06 18:05:59', '2025-08-06 18:05:59');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('b8746ff3-6965-4046-a265-9c08c3db95e5', 10, 10, '18:00', 'wednesday', 'wednesday', '2025-08-06 18:05:59', '2', '2', '1', '2025-08-06', '18:05', '2025-08-06 18:06:04', '2025-08-06 18:06:04');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('8d41a488-afce-4365-8c08-642ea20f6c02', 18, 9, '19:00', 'wednesday', 'wednesday', '2025-08-06 19:05:56', '1', '1', '1', '2025-08-06', '19:05', '2025-08-06 19:05:59', '2025-08-06 19:05:59');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('6f5507a4-fbdd-47ac-a0d3-c564f4858c72', 18, 10, '19:00', 'wednesday', 'wednesday', '2025-08-06 19:05:59', '3', '3', '1', '2025-08-06', '19:05', '2025-08-06 19:06:04', '2025-08-06 19:06:04');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('a0178fc9-ef0e-49ec-9cad-98409e2514da', 19, 9, '20:00', 'wednesday', 'wednesday', '2025-08-06 20:05:55', '0', '0', '1', '2025-08-06', '20:05', '2025-08-06 20:05:57', '2025-08-06 20:05:57');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f60f5ff6-aadf-413a-a9a3-fe6c4a1f830b', 19, 10, '20:00', 'wednesday', 'wednesday', '2025-08-06 20:05:57', '2', '2', '1', '2025-08-06', '20:05', '2025-08-06 20:06:02', '2025-08-06 20:06:02');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('db849510-3e06-44e6-a97a-ca2756e1b032', 20, 9, '21:00', 'wednesday', 'wednesday', '2025-08-06 21:05:55', '1', '1', '1', '2025-08-06', '21:05', '2025-08-06 21:05:57', '2025-08-06 21:05:57');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('2a8f308d-315e-4105-b708-01e9b5f37245', 20, 10, '21:00', 'wednesday', 'wednesday', '2025-08-06 21:05:57', '3', '3', '1', '2025-08-06', '21:05', '2025-08-06 21:06:02', '2025-08-06 21:06:02');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ac957123-1d9d-449f-90a2-18fa50d8a630', 21, 9, '22:00', 'wednesday', 'wednesday', '2025-08-06 22:05:55', '0', '0', '1', '2025-08-06', '22:05', '2025-08-06 22:05:57', '2025-08-06 22:05:57');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d8d37f75-6088-48bb-905a-8f3a5097cf59', 21, 10, '22:00', 'wednesday', 'wednesday', '2025-08-06 22:05:57', '2', '2', '1', '2025-08-06', '22:05', '2025-08-06 22:06:02', '2025-08-06 22:06:02');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('591a5b0e-08fc-4303-a4ef-f6b9c7027ae7', 22, 9, '23:00', 'wednesday', 'wednesday', '2025-08-06 23:00:55', '1', '1', '1', '2025-08-06', '23:00', '2025-08-06 23:00:57', '2025-08-06 23:00:57');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d62eafa4-77cb-4403-a722-dd105a7e898d', 22, 10, '23:00', 'wednesday', 'wednesday', '2025-08-06 23:00:57', '3', '3', '1', '2025-08-06', '23:00', '2025-08-06 23:01:02', '2025-08-06 23:01:02');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('1e6e25d8-93ff-4b62-b299-2851bd90ffb2', 5, 9, '09:00', 'thursday', 'thursday', '2025-08-07 09:09:35', '1', '1', '1', '2025-08-07', '09:09', '2025-08-07 09:09:37', '2025-08-07 09:09:37');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('c3cff0ff-84ef-4140-9c48-d6558404c3cf', 5, 10, '09:00', 'thursday', 'thursday', '2025-08-07 09:09:38', '3', '3', '1', '2025-08-07', '09:09', '2025-08-07 09:09:43', '2025-08-07 09:09:43');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('286374dc-7b66-4101-bfdf-91939939d93c', 6, 9, '14:00', 'thursday', 'thursday', '2025-08-07 14:02:43', '0', '0', '1', '2025-08-07', '14:02', '2025-08-07 14:02:43', '2025-08-07 14:02:43');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('1d11d9a5-358a-4ad0-a50f-50104f3e04c7', 6, 10, '14:00', 'thursday', 'thursday', '2025-08-07 14:02:43', '2', '2', '1', '2025-08-07', '14:02', '2025-08-07 14:02:48', '2025-08-07 14:02:48');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('cebe49da-2515-4bb2-9586-0905b55afe6b', 7, 9, '15:00', 'thursday', 'thursday', '2025-08-07 15:02:42', '1', '1', '1', '2025-08-07', '15:02', '2025-08-07 15:02:43', '2025-08-07 15:02:43');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('b95e2ce1-569e-4e78-8f7f-9fa4c6355976', 7, 10, '15:00', 'thursday', 'thursday', '2025-08-07 15:02:43', '3', '3', '1', '2025-08-07', '15:02', '2025-08-07 15:02:48', '2025-08-07 15:02:48');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('17a11f9f-e923-457e-b75f-ec880236a412', 8, 9, '16:00', 'thursday', 'thursday', '2025-08-07 16:09:52', '0', '0', '1', '2025-08-07', '16:09', '2025-08-07 16:09:53', '2025-08-07 16:09:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('94fcae54-76c2-4f91-b94a-eefaf6d461c2', 8, 10, '16:00', 'thursday', 'thursday', '2025-08-07 16:09:53', '2', '2', '1', '2025-08-07', '16:09', '2025-08-07 16:09:58', '2025-08-07 16:09:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('88620e60-3b34-461b-b89e-0d9aa1ae0dc8', 9, 9, '17:00', 'thursday', 'thursday', '2025-08-07 17:09:51', '1', '1', '1', '2025-08-07', '17:09', '2025-08-07 17:09:53', '2025-08-07 17:09:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ecf53ec4-ac0e-474e-b811-f2bb7f358cd2', 9, 10, '17:00', 'thursday', 'thursday', '2025-08-07 17:09:53', '3', '3', '1', '2025-08-07', '17:09', '2025-08-07 17:09:58', '2025-08-07 17:09:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('485db04a-ece8-44bd-a440-3c91a5a5e016', 10, 9, '18:00', 'thursday', 'thursday', '2025-08-07 18:08:29', '0', '0', '1', '2025-08-07', '18:08', '2025-08-07 18:08:33', '2025-08-07 18:08:33');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('87c88b18-5bf8-4294-9e6e-14f3a1b0efca', 10, 10, '18:00', 'thursday', 'thursday', '2025-08-07 18:08:33', '2', '2', '1', '2025-08-07', '18:08', '2025-08-07 18:08:46', '2025-08-07 18:08:46');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ae82431d-f82a-4fab-a049-9c87ff6cbd06', 18, 9, '19:00', 'thursday', 'thursday', '2025-08-07 19:08:13', '1', '1', '1', '2025-08-07', '19:08', '2025-08-07 19:08:16', '2025-08-07 19:08:16');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('79168096-4435-4c67-a984-3eb5db637179', 18, 10, '19:00', 'thursday', 'thursday', '2025-08-07 19:08:16', '3', '3', '1', '2025-08-07', '19:08', '2025-08-07 19:08:21', '2025-08-07 19:08:21');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('0fde9ad2-983d-40f4-be71-df7a9e632b6e', 6, 9, '14:00', 'friday', 'friday', '2025-08-08 14:06:39', '0', '0', '1', '2025-08-08', '14:06', '2025-08-08 14:06:44', '2025-08-08 14:06:44');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('6555bbff-92f1-44d9-a5b3-a8dc9b9e613f', 6, 10, '14:00', 'friday', 'friday', '2025-08-08 14:06:44', '2', '2', '1', '2025-08-08', '14:06', '2025-08-08 14:06:49', '2025-08-08 14:06:49');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('9ef2a5ec-5991-462d-9895-a3afb302a0b7', 7, 9, '15:00', 'friday', 'friday', '2025-08-08 15:06:39', '1', '1', '1', '2025-08-08', '15:06', '2025-08-08 15:06:39', '2025-08-08 15:06:39');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('02b75c06-4ccf-409c-b3e8-5f89f5b069e0', 7, 10, '15:00', 'friday', 'friday', '2025-08-08 15:06:39', '3', '3', '1', '2025-08-08', '15:06', '2025-08-08 15:06:44', '2025-08-08 15:06:44');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f1168b4f-6d4a-4ab9-bc22-ec0e688fac8f', 18, 9, '19:00', 'friday', 'friday', '2025-08-08 19:03:13', '1', '1', '1', '2025-08-08', '19:03', '2025-08-08 19:03:14', '2025-08-08 19:03:14');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('12e6bfa7-042d-447d-a763-4312b8c9ba55', 18, 10, '19:00', 'friday', 'friday', '2025-08-08 19:03:14', '3', '3', '1', '2025-08-08', '19:03', '2025-08-08 19:03:19', '2025-08-08 19:03:19');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('5fae1e6d-575b-48b3-ad6c-241a9651c7b0', 19, 9, '20:00', 'friday', 'friday', '2025-08-08 20:03:13', '0', '0', '1', '2025-08-08', '20:03', '2025-08-08 20:03:14', '2025-08-08 20:03:14');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('602b4049-1aad-4e22-b3f7-6fff855d4cdd', 19, 10, '20:00', 'friday', 'friday', '2025-08-08 20:03:14', '2', '2', '1', '2025-08-08', '20:03', '2025-08-08 20:03:19', '2025-08-08 20:03:19');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('dae61fac-3736-443c-beef-155ff5a137a9', 6, 9, '14:00', 'saturday', 'saturday', '2025-08-09 14:05:02', '0', '0', '1', '2025-08-09', '14:05', '2025-08-09 14:05:05', '2025-08-09 14:05:05');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('58432ec0-b77d-48cd-8fd5-2a696f9fac22', 6, 10, '14:00', 'saturday', 'saturday', '2025-08-09 14:05:05', '2', '2', '1', '2025-08-09', '14:05', '2025-08-09 14:05:10', '2025-08-09 14:05:10');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('4a394d98-bbb7-4bf9-9d08-07f8f29b1f1c', 7, 9, '15:00', 'saturday', 'saturday', '2025-08-09 15:05:02', '1', '1', '1', '2025-08-09', '15:05', '2025-08-09 15:05:05', '2025-08-09 15:05:05');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f6b30223-d620-4988-ba62-8fd7e1af3914', 7, 10, '15:00', 'saturday', 'saturday', '2025-08-09 15:05:05', '3', '3', '1', '2025-08-09', '15:05', '2025-08-09 15:05:10', '2025-08-09 15:05:10');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('06d42e0d-ca1a-406f-8cbd-ffd65f551060', 21, 9, '22:00', 'sunday', 'sunday', '2025-08-10 22:23:47', '0', '0', '1', '2025-08-10', '22:23', '2025-08-10 22:23:48', '2025-08-10 22:23:48');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d8920fe2-ae1f-4240-b63f-0c1331c7eb96', 21, 10, '22:00', 'sunday', 'sunday', '2025-08-10 22:23:48', '2', '2', '1', '2025-08-10', '22:23', '2025-08-10 22:23:53', '2025-08-10 22:23:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('e1c86663-5b0f-4958-9452-bf4462e6f8ce', 22, 9, '23:00', 'sunday', 'sunday', '2025-08-10 23:03:47', '1', '1', '1', '2025-08-10', '23:03', '2025-08-10 23:03:48', '2025-08-10 23:03:48');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('342e2132-fc87-4c9b-a0a7-393286a647e7', 22, 10, '23:00', 'sunday', 'sunday', '2025-08-10 23:03:48', '3', '3', '1', '2025-08-10', '23:03', '2025-08-10 23:03:53', '2025-08-10 23:03:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f5a88a96-8080-45dc-b183-0dff4524cdf0', 24, 9, '01:00', 'monday', 'monday', '2025-08-11 01:21:45', '1', '1', '1', '2025-08-11', '01:21', '2025-08-11 01:21:46', '2025-08-11 01:21:46');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('c72771ec-6db4-460f-b528-47f85141da1c', 24, 10, '01:00', 'monday', 'monday', '2025-08-11 01:21:46', '3', '3', '1', '2025-08-11', '01:21', '2025-08-11 01:21:51', '2025-08-11 01:21:51');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d0c181aa-3bae-4a92-8ab7-d32a63032e47', 25, 9, '02:00', 'monday', 'monday', '2025-08-11 02:01:44', '0', '0', '1', '2025-08-11', '02:01', '2025-08-11 02:01:46', '2025-08-11 02:01:46');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('e6d85155-ab28-4bba-8fa9-5e01391049cc', 6, 9, '14:00', 'monday', 'monday', '2025-08-11 14:08:51', '0', '0', '1', '2025-08-11', '14:08', '2025-08-11 14:08:53', '2025-08-11 14:08:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('961c0b9c-56b1-420b-900c-4667bf93f9c4', 6, 10, '14:00', 'monday', 'monday', '2025-08-11 14:08:53', '2', '2', '1', '2025-08-11', '14:08', '2025-08-11 14:08:58', '2025-08-11 14:08:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('15719326-908c-49ef-a583-6355451a48eb', 7, 9, '15:00', 'monday', 'monday', '2025-08-11 15:08:50', '1', '1', '1', '2025-08-11', '15:08', '2025-08-11 15:08:53', '2025-08-11 15:08:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('e5f2f5a4-0895-4725-8b68-2cf3392529f6', 7, 10, '15:00', 'monday', 'monday', '2025-08-11 15:08:53', '3', '3', '1', '2025-08-11', '15:08', '2025-08-11 15:08:58', '2025-08-11 15:08:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('7b1f5d0b-8e56-421a-9b82-50d38254e577', 8, 9, '16:00', 'monday', 'monday', '2025-08-11 16:08:50', '0', '0', '1', '2025-08-11', '16:08', '2025-08-11 16:08:53', '2025-08-11 16:08:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('4883663b-55a5-4e52-b01d-c9c1ca896658', 8, 10, '16:00', 'monday', 'monday', '2025-08-11 16:08:53', '2', '2', '1', '2025-08-11', '16:08', '2025-08-11 16:08:58', '2025-08-11 16:08:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('9193c849-ae05-4c56-8cd3-148877c02a3c', 9, 9, '17:00', 'monday', 'monday', '2025-08-11 17:07:44', '1', '1', '1', '2025-08-11', '17:07', '2025-08-11 17:07:48', '2025-08-11 17:07:48');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('6c43fd56-1a9c-4718-925d-fa7c1763c2ca', 9, 10, '17:00', 'monday', 'monday', '2025-08-11 17:07:48', '3', '3', '1', '2025-08-11', '17:07', '2025-08-11 17:07:53', '2025-08-11 17:07:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('b6a9a261-3b5d-4616-bbdb-93e46cf227fd', 10, 9, '18:00', 'monday', 'monday', '2025-08-11 18:08:49', '0', '0', '1', '2025-08-11', '18:08', '2025-08-11 18:08:53', '2025-08-11 18:08:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('85a92b9a-e6a0-487e-aa1b-60947594d6f9', 10, 10, '18:00', 'monday', 'monday', '2025-08-11 18:08:53', '2', '2', '1', '2025-08-11', '18:08', '2025-08-11 18:08:58', '2025-08-11 18:08:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('bee0e83e-928c-4096-9dda-69bf4d08e40d', 18, 9, '19:00', 'monday', 'monday', '2025-08-11 19:08:49', '1', '1', '1', '2025-08-11', '19:08', '2025-08-11 19:08:53', '2025-08-11 19:08:53');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('a9a38409-bd74-434b-86eb-12e6241fe525', 18, 10, '19:00', 'monday', 'monday', '2025-08-11 19:08:53', '3', '3', '1', '2025-08-11', '19:08', '2025-08-11 19:08:58', '2025-08-11 19:08:58');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('2c26dbf5-46f7-4e0f-b2f1-2806c93897d5', 22, 9, '23:00', 'monday', 'monday', '2025-08-11 23:08:20', '1', '1', '1', '2025-08-11', '23:08', '2025-08-11 23:08:23', '2025-08-11 23:08:23');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('95237981-7c16-40b8-8976-b6bf6b30fb23', 22, 10, '23:00', 'monday', 'monday', '2025-08-11 23:08:24', '3', '3', '1', '2025-08-11', '23:08', '2025-08-11 23:08:28', '2025-08-11 23:08:28');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ed63cb8a-6872-481d-8256-44011e8010a9', 1, 9, '05:00', 'tuesday', 'tuesday', '2025-08-12 05:05:42', '1', '1', '1', '2025-08-12', '05:05', '2025-08-12 05:05:44', '2025-08-12 05:05:44');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('33ae02a2-d32d-4b5e-a8cd-18121928df57', 1, 10, '05:00', 'tuesday', 'tuesday', '2025-08-12 05:05:44', '3', '3', '1', '2025-08-12', '05:05', '2025-08-12 05:05:49', '2025-08-12 05:05:49');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('79985257-c8c3-4463-b736-4ae10ecd8c5d', 2, 9, '06:00', 'tuesday', 'tuesday', '2025-08-12 06:05:41', '0', '0', '1', '2025-08-12', '06:05', '2025-08-12 06:05:44', '2025-08-12 06:05:44');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d31561db-510d-4d70-a6eb-c7f00387e619', 2, 10, '06:00', 'tuesday', 'tuesday', '2025-08-12 06:05:44', '2', '2', '1', '2025-08-12', '06:05', '2025-08-12 06:05:49', '2025-08-12 06:05:49');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('3c7599a1-3c83-4f58-a3d2-c59fd676bdc0', 3, 9, '07:00', 'tuesday', 'tuesday', '2025-08-12 07:05:41', '1', '1', '1', '2025-08-12', '07:05', '2025-08-12 07:05:44', '2025-08-12 07:05:44');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('0eefa694-7e1b-493b-8ffe-e1c833897584', 3, 10, '07:00', 'tuesday', 'tuesday', '2025-08-12 07:05:44', '3', '3', '1', '2025-08-12', '07:05', '2025-08-12 07:05:49', '2025-08-12 07:05:49');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('444169c1-63c0-415e-be3c-7fc8075bf328', 4, 9, '08:00', 'tuesday', 'tuesday', '2025-08-12 08:00:54', '0', '0', '1', '2025-08-12', '08:00', '2025-08-12 08:00:59', '2025-08-12 08:00:59');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('49447e5c-4dfd-4a40-958c-efea1bc884cc', 4, 10, '08:00', 'tuesday', 'tuesday', '2025-08-12 08:00:59', '2', '2', '1', '2025-08-12', '08:00', '2025-08-12 08:01:04', '2025-08-12 08:01:04');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d368471b-04dc-423b-b1da-4b188328a48f', 5, 9, '09:00', 'tuesday', 'tuesday', '2025-08-12 09:00:54', '1', '1', '1', '2025-08-12', '09:00', '2025-08-12 09:00:54', '2025-08-12 09:00:54');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('cdb4eb28-268f-4be1-b0d4-7a79317e5890', 5, 10, '09:00', 'tuesday', 'tuesday', '2025-08-12 09:00:54', '3', '3', '1', '2025-08-12', '09:00', '2025-08-12 09:00:59', '2025-08-12 09:00:59');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ff009525-ac33-4d4d-9430-eb6313191b4b', 6, 9, '14:00', 'tuesday', 'tuesday', '2025-08-12 14:00:45', '0', '0', '1', '2025-08-12', '14:00', '2025-08-12 14:00:49', '2025-08-12 14:00:49');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('0001b344-c329-4401-98d1-049d21d916e0', 6, 10, '14:00', 'tuesday', 'tuesday', '2025-08-12 14:00:50', '2', '2', '1', '2025-08-12', '14:00', '2025-08-12 14:00:54', '2025-08-12 14:00:54');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('7f463dcb-ae46-4e8e-b175-10108fed2a88', 7, 9, '15:00', 'tuesday', 'tuesday', '2025-08-12 15:00:44', '1', '1', '1', '2025-08-12', '15:00', '2025-08-12 15:00:44', '2025-08-12 15:00:44');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('20426b81-3fdb-4bd5-b7a4-377da3989dd1', 7, 10, '15:00', 'tuesday', 'tuesday', '2025-08-12 15:00:45', '3', '3', '1', '2025-08-12', '15:00', '2025-08-12 15:00:49', '2025-08-12 15:00:49');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('84323e57-6bd2-41f2-abb5-85f8d27db4c6', 8, 9, '16:00', 'tuesday', 'tuesday', '2025-08-12 16:00:44', '0', '0', '1', '2025-08-12', '16:00', '2025-08-12 16:00:45', '2025-08-12 16:00:45');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('756782e7-5d18-4e65-a4ee-d2359606d47c', 8, 10, '16:00', 'tuesday', 'tuesday', '2025-08-12 16:00:45', '2', '2', '1', '2025-08-12', '16:00', '2025-08-12 16:00:50', '2025-08-12 16:00:50');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('8f560cca-9bdd-454a-be9f-edbb837f6fc4', 9, 9, '17:00', 'tuesday', 'tuesday', '2025-08-12 17:00:44', '1', '1', '1', '2025-08-12', '17:00', '2025-08-12 17:00:46', '2025-08-12 17:00:46');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('4534bb80-e8e4-4e78-87f8-2a8c91889cec', 9, 10, '17:00', 'tuesday', 'tuesday', '2025-08-12 17:00:46', '3', '3', '1', '2025-08-12', '17:00', '2025-08-12 17:00:51', '2025-08-12 17:00:51');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('51b70bd0-1042-4f7f-9bda-34fa0d4d0f48', 10, 9, '18:00', 'tuesday', 'tuesday', '2025-08-12 18:10:37', '0', '0', '1', '2025-08-12', '18:10', '2025-08-12 18:10:41', '2025-08-12 18:10:41');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('d6d85b3f-218b-4851-bae4-621d3b892f74', 10, 10, '18:00', 'tuesday', 'tuesday', '2025-08-12 18:10:41', '2', '2', '1', '2025-08-12', '18:10', '2025-08-12 18:10:46', '2025-08-12 18:10:46');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('929586e0-8cca-4b25-8d3d-43d21977c138', 18, 9, '19:00', 'tuesday', 'tuesday', '2025-08-12 19:02:32', '1', '1', '1', '2025-08-12', '19:02', '2025-08-12 19:03:11', '2025-08-12 19:03:11');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f8befa72-e558-4658-9c24-bb614179e9b6', 18, 10, '19:00', 'tuesday', 'tuesday', '2025-08-12 19:03:11', '3', '3', '1', '2025-08-12', '19:03', '2025-08-12 19:03:16', '2025-08-12 19:03:16');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('93f9bf6a-ed2c-437d-89a9-c5df73cd0984', 19, 9, '20:00', 'tuesday', 'tuesday', '2025-08-12 20:08:04', '0', '0', '1', '2025-08-12', '20:08', '2025-08-12 20:08:05', '2025-08-12 20:08:05');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('6bab7717-c534-4a72-b106-cd9a737378b4', 19, 10, '20:00', 'tuesday', 'tuesday', '2025-08-12 20:08:05', '2', '2', '1', '2025-08-12', '20:08', '2025-08-12 20:08:10', '2025-08-12 20:08:10');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ee3de3fb-b2e4-482f-a3d5-ea13a76f6d62', 20, 9, '21:00', 'tuesday', 'tuesday', '2025-08-12 21:08:04', '1', '1', '1', '2025-08-12', '21:08', '2025-08-12 21:08:05', '2025-08-12 21:08:05');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('e75fc4b3-2507-4141-9a91-f1e6cb83b3ca', 20, 10, '21:00', 'tuesday', 'tuesday', '2025-08-12 21:08:05', '3', '3', '1', '2025-08-12', '21:08', '2025-08-12 21:08:10', '2025-08-12 21:08:10');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('94bfa7fb-d72a-48eb-bbea-6bf8dc623c72', 20, 9, '21:00', 'wednesday', 'wednesday', '2025-08-13 21:01:54', '1', '1', '1', '2025-08-13', '21:01', '2025-08-13 21:01:57', '2025-08-13 21:01:57');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('f72f2d3b-c0e5-4d87-bbf5-689d353a1906', 20, 10, '21:00', 'wednesday', 'wednesday', '2025-08-13 21:01:57', '3', '3', '1', '2025-08-13', '21:01', '2025-08-13 21:02:02', '2025-08-13 21:02:02');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('acc6ca26-92a2-4787-87b5-9312d01b79bd', 21, 9, '22:00', 'wednesday', 'wednesday', '2025-08-13 22:01:53', '0', '0', '1', '2025-08-13', '22:01', '2025-08-13 22:01:57', '2025-08-13 22:01:57');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('5a4bf6bb-468d-4852-a004-ebaac9b5129e', 21, 10, '22:00', 'wednesday', 'wednesday', '2025-08-13 22:01:57', '2', '2', '1', '2025-08-13', '22:01', '2025-08-13 22:02:02', '2025-08-13 22:02:02');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ffbf6ed8-4bb7-4157-8925-2a90f6151cdc', 22, 9, '23:00', 'wednesday', 'wednesday', '2025-08-13 23:25:19', '1', '1', '1', '2025-08-13', '23:25', '2025-08-13 23:25:22', '2025-08-13 23:25:22');
INSERT INTO "public"."sd_schedule_process_log" VALUES ('ea72690e-8084-44cb-ae89-49799197c516', 22, 10, '23:00', 'wednesday', 'wednesday', '2025-08-13 23:25:22', '3', '3', '1', '2025-08-13', '23:25', '2025-08-13 23:25:27', '2025-08-13 23:25:27');

-- ----------------------------
-- Table structure for sd_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user";
CREATE TABLE "public"."sd_user" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "deletedate" date,
  "role_id" int4 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password_temp" varchar(255) COLLATE "pg_catalog"."default",
  "firstname" varchar(255) COLLATE "pg_catalog"."default",
  "lastname" varchar(255) COLLATE "pg_catalog"."default",
  "fullname" varchar(255) COLLATE "pg_catalog"."default",
  "nickname" varchar(255) COLLATE "pg_catalog"."default",
  "idcard" varchar(255) COLLATE "pg_catalog"."default",
  "lastsignindate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int2 NOT NULL,
  "active_status" int2,
  "network_id" int4,
  "remark" varchar(255) COLLATE "pg_catalog"."default",
  "infomation_agree_status" int2,
  "gender" varchar(255) COLLATE "pg_catalog"."default",
  "birthday" date,
  "online_status" varchar(255) COLLATE "pg_catalog"."default",
  "message" varchar(255) COLLATE "pg_catalog"."default",
  "network_type_id" int4,
  "public_status" int2,
  "type_id" int4,
  "avatarpath" varchar(255) COLLATE "pg_catalog"."default",
  "avatar" varchar(255) COLLATE "pg_catalog"."default",
  "refresh_token" text COLLATE "pg_catalog"."default",
  "loginfailed" int2,
  "public_notification" int2 DEFAULT '0'::smallint,
  "sms_notification" int2 DEFAULT '0'::smallint,
  "email_notification" int2 DEFAULT '0'::smallint,
  "line_notification" int2 DEFAULT '0'::smallint,
  "mobile_number" varchar(255) COLLATE "pg_catalog"."default",
  "phone_number" varchar(255) COLLATE "pg_catalog"."default",
  "lineid" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of sd_user
-- ----------------------------
INSERT INTO "public"."sd_user" VALUES ('e6f44f6a-070d-4d86-a6ff-00b0cdb2ac75', '2025-07-03 02:12:27.30362', '2025-07-03 02:12:27.430973', NULL, 2, 'icmon0955@gmail.com', 'kongnakornna', '$2b$10$GJJgY7NY/dZq3GLlRc0RxOHvVWCrXBCfMRRVfZVgUWSzdxahz8TA2', 'Na@0955@#', NULL, NULL, NULL, NULL, NULL, '2025-07-03 02:12:27.30362', 1, 1, NULL, NULL, 0, NULL, NULL, NULL, 'Register', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2ZjQ0ZjZhLTA3MGQtNGQ4Ni1hNmZmLTAwYjBjZGIyYWM3NSIsImlhdCI6MTc1MTUwODc0NywiZXhwIjoxNzU0MTAwNzQ3fQ.gWHJec6WJdgBEhFpBWxiJWo-HCqwaaQ1xrAiwio4wD8', 0, 1, 1, 1, 1, '0955088091', '0955088091', 'kongnakornna');
INSERT INTO "public"."sd_user" VALUES ('fb546a59-6ade-4e48-8428-d1511831898a', '2025-07-03 02:07:43.613094', '2025-07-27 11:49:54', NULL, 3, 'icmon@gmail.com', 'icmon', '$2b$10$9VsAf5kF/vfBu4WEeLmFtuCPp4Sgw9PVEN894Pg8ATSICIbsKWlLq', 'icmon', NULL, NULL, NULL, NULL, NULL, '2025-07-27 11:49:54', 99, 1, NULL, NULL, 0, NULL, NULL, NULL, 'system', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTQ2YTU5LTZhZGUtNGU0OC04NDI4LWQxNTExODMxODk4YSIsImlhdCI6MTc1MzU5MTc5NCwiZXhwIjoxNzU2MTgzNzk0fQ.CNUTTHJ8bbvWquQsvWhEPVJ9fHhuDLD0vhPBxb926no', 0, 0, 0, 1, 0, NULL, NULL, NULL);
INSERT INTO "public"."sd_user" VALUES ('d95b5588-3880-4f05-b661-6a111c860c5e', '2025-07-03 02:11:07.414441', '2025-08-13 12:52:17.701329', NULL, 2, 'alexsomsap@gmail.com', 'icmons', '$2b$10$zJ8sWNiN7iQWDTGA9ro1b.ghE57Wcjd7MDKpzlWj/M.mXmLqIOsdu', 'icmons', NULL, NULL, NULL, NULL, NULL, '2025-07-03 02:11:07.414441', 1, 1, NULL, NULL, 0, NULL, NULL, NULL, 'Register', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5NWI1NTg4LTM4ODAtNGYwNS1iNjYxLTZhMTExYzg2MGM1ZSIsImlhdCI6MTc1MTUwODY2NywiZXhwIjoxNzU0MTAwNjY3fQ.ZKDo7s4DTa6aT6Mz-vpQn3tMYR36-a4lk-Jz_Vyyv5w', 0, 0, 1, 1, 0, '0844387246', '0844387246', 'alex.somsap');
INSERT INTO "public"."sd_user" VALUES ('c9497023-f370-4355-9162-f3f019b3534b', '2025-07-03 02:00:47.083775', '2025-08-17 22:19:56', NULL, 1, 'monitoring.system.report@gmail.com', 'system', '$2b$10$Ik44gWlD99nCCpCTsgn6w.eEeb2he/w.yuyG8MRGTKCh2CyAIwqu.', 'Na@0955@#', NULL, NULL, NULL, NULL, NULL, '2025-08-17 22:19:56', 99, 1, NULL, NULL, 0, NULL, NULL, NULL, 'system', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NDk3MDIzLWYzNzAtNDM1NS05MTYyLWYzZjAxOWIzNTM0YiIsImlhdCI6MTc1NTQ0Mzk5NiwiZXhwIjoxNzU4MDM1OTk2fQ.9gyfR-7bCDgMbQpKiD9Fh_LiF5EeWBl4-mo1l1tqx1M', 0, 0, 0, 1, 0, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sd_user_access_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_access_menu";
CREATE TABLE "public"."sd_user_access_menu" (
  "user_access_id" int4 NOT NULL DEFAULT nextval('sd_user_access_menu_user_access_id_seq'::regclass),
  "user_type_id" int4,
  "menu_id" int4,
  "parent_id" int4
)
;

-- ----------------------------
-- Records of sd_user_access_menu
-- ----------------------------
INSERT INTO "public"."sd_user_access_menu" VALUES (1, 1, 1, 1);

-- ----------------------------
-- Table structure for sd_user_file
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_file";
CREATE TABLE "public"."sd_user_file" (
  "id" int4 NOT NULL DEFAULT nextval('sd_user_file_id_seq'::regclass),
  "file_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "file_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "file_path" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "file_type_id" int4 NOT NULL,
  "uid" varchar(255) COLLATE "pg_catalog"."default",
  "file_date" timestamp(6) NOT NULL DEFAULT now(),
  "status" int2 NOT NULL
)
;

-- ----------------------------
-- Records of sd_user_file
-- ----------------------------

-- ----------------------------
-- Table structure for sd_user_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_log";
CREATE TABLE "public"."sd_user_log" (
  "id" int4 NOT NULL DEFAULT nextval('sd_user_log_id_seq'::regclass),
  "log_type_id" int4 NOT NULL,
  "uid" uuid NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "detail" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "select_status" int4,
  "insert_status" int4,
  "update_status" int4,
  "delete_status" int4,
  "status" int4,
  "create" timestamp(6) NOT NULL DEFAULT now(),
  "update" timestamp(6) NOT NULL DEFAULT now(),
  "lang" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of sd_user_log
-- ----------------------------
INSERT INTO "public"."sd_user_log" VALUES (1, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignInlog', NULL, NULL, NULL, NULL, NULL, '2025-06-08 13:23:21.632702', '2025-06-08 13:23:21.632702', 'en');
INSERT INTO "public"."sd_user_log" VALUES (2, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, NULL, '2025-06-08 14:18:44.07451', '2025-06-08 14:18:44.07451', 'en');
INSERT INTO "public"."sd_user_log" VALUES (3, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, NULL, '2025-06-08 14:20:10.770695', '2025-06-08 14:20:10.770695', 'en');
INSERT INTO "public"."sd_user_log" VALUES (4, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, NULL, '2025-06-08 14:20:15.627646', '2025-06-08 14:20:15.627646', 'en');
INSERT INTO "public"."sd_user_log" VALUES (6, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', 0, 0, 0, 0, 0, '2025-06-08 15:05:29.343143', '2025-06-08 15:05:29.343143', 'en');
INSERT INTO "public"."sd_user_log" VALUES (7, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', 0, 0, 0, 0, 0, '2025-06-08 15:06:02.411415', '2025-06-08 15:06:02.411415', 'en');
INSERT INTO "public"."sd_user_log" VALUES (8, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-08 15:16:12.758734', '2025-06-08 15:16:12.758734', 'en');
INSERT INTO "public"."sd_user_log" VALUES (9, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 01:37:13.008581', '2025-06-09 01:37:13.008581', 'en');
INSERT INTO "public"."sd_user_log" VALUES (10, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 01:38:53.161341', '2025-06-09 01:38:53.161341', 'en');
INSERT INTO "public"."sd_user_log" VALUES (11, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 01:52:53.207609', '2025-06-09 01:52:53.207609', 'en');
INSERT INTO "public"."sd_user_log" VALUES (12, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 02:05:02.622974', '2025-06-09 02:05:02.622974', 'en');
INSERT INTO "public"."sd_user_log" VALUES (13, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 02:13:56.708169', '2025-06-09 02:13:56.708169', 'en');
INSERT INTO "public"."sd_user_log" VALUES (14, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 02:14:23.063863', '2025-06-09 02:14:23.063863', 'en');
INSERT INTO "public"."sd_user_log" VALUES (15, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 02:16:50.299452', '2025-06-09 02:16:50.299452', 'en');
INSERT INTO "public"."sd_user_log" VALUES (16, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 02:23:58.988425', '2025-06-09 02:23:58.988425', 'en');
INSERT INTO "public"."sd_user_log" VALUES (17, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 02:30:24.662391', '2025-06-09 02:30:24.662391', 'en');
INSERT INTO "public"."sd_user_log" VALUES (18, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-09 02:35:18.97184', '2025-06-09 02:35:18.97184', 'en');
INSERT INTO "public"."sd_user_log" VALUES (19, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-09 02:35:31.686166', '2025-06-09 02:35:31.686166', 'en');
INSERT INTO "public"."sd_user_log" VALUES (20, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-09 02:36:45.676461', '2025-06-09 02:36:45.676461', 'en');
INSERT INTO "public"."sd_user_log" VALUES (21, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 1, '2025-06-09 02:42:35.005829', '2025-06-09 02:42:35.005829', 'en');
INSERT INTO "public"."sd_user_log" VALUES (22, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-09 02:43:52.483117', '2025-06-09 02:43:52.483117', 'en');
INSERT INTO "public"."sd_user_log" VALUES (23, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-09 02:44:11.988224', '2025-06-09 02:44:11.988224', 'en');
INSERT INTO "public"."sd_user_log" VALUES (24, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-09 02:47:25.108984', '2025-06-09 02:47:25.108984', 'en');
INSERT INTO "public"."sd_user_log" VALUES (25, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-09 02:47:58.084719', '2025-06-09 02:47:58.084719', 'en');
INSERT INTO "public"."sd_user_log" VALUES (26, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-09 02:49:06.303646', '2025-06-09 02:49:06.303646', 'en');
INSERT INTO "public"."sd_user_log" VALUES (27, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-09 03:32:33.324219', '2025-06-09 03:32:33.324219', 'en');
INSERT INTO "public"."sd_user_log" VALUES (28, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-09 03:33:06.427718', '2025-06-09 03:33:06.427718', 'en');
INSERT INTO "public"."sd_user_log" VALUES (5, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', 1, 1, 1, 1, 1, '2025-06-08 15:05:20.801815', '2025-06-08 15:05:20.801815', 'en');
INSERT INTO "public"."sd_user_log" VALUES (29, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-13 04:45:22.515911', '2025-06-13 04:45:22.515911', 'en');
INSERT INTO "public"."sd_user_log" VALUES (30, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-13 04:47:54.183369', '2025-06-13 04:47:54.183369', 'en');
INSERT INTO "public"."sd_user_log" VALUES (31, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-13 06:02:00.996482', '2025-06-13 06:02:00.996482', 'en');
INSERT INTO "public"."sd_user_log" VALUES (32, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-13 06:02:06.237436', '2025-06-13 06:02:06.237436', 'en');
INSERT INTO "public"."sd_user_log" VALUES (33, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-13 06:02:08.018786', '2025-06-13 06:02:08.018786', 'en');
INSERT INTO "public"."sd_user_log" VALUES (34, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-13 06:02:09.106474', '2025-06-13 06:02:09.106474', 'en');
INSERT INTO "public"."sd_user_log" VALUES (35, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-13 06:02:16.750722', '2025-06-13 06:02:16.750722', 'en');
INSERT INTO "public"."sd_user_log" VALUES (36, 1, 'ea5a0dfa-7bda-4223-9e82-9d9684503e0a', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 05:20:01.389462', '2025-06-14 05:20:01.389462', 'en');
INSERT INTO "public"."sd_user_log" VALUES (37, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 05:41:39.280777', '2025-06-14 05:41:39.280777', 'en');
INSERT INTO "public"."sd_user_log" VALUES (38, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 05:56:24.801694', '2025-06-14 05:56:24.801694', 'en');
INSERT INTO "public"."sd_user_log" VALUES (39, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-14 06:03:47.786226', '2025-06-14 06:03:47.786226', 'en');
INSERT INTO "public"."sd_user_log" VALUES (40, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 06:04:13.045998', '2025-06-14 06:04:13.045998', 'en');
INSERT INTO "public"."sd_user_log" VALUES (41, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 06:19:46.432852', '2025-06-14 06:19:46.432852', 'en');
INSERT INTO "public"."sd_user_log" VALUES (42, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 12:38:11.960985', '2025-06-14 12:38:11.960985', 'en');
INSERT INTO "public"."sd_user_log" VALUES (43, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 14:25:14.59842', '2025-06-14 14:25:14.59842', 'en');
INSERT INTO "public"."sd_user_log" VALUES (44, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-14 16:58:20.88603', '2025-06-14 16:58:20.88603', 'en');
INSERT INTO "public"."sd_user_log" VALUES (45, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-15 03:54:11.452739', '2025-06-15 03:54:11.452739', 'th');
INSERT INTO "public"."sd_user_log" VALUES (46, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-15 04:13:20.753444', '2025-06-15 04:13:20.753444', 'en');
INSERT INTO "public"."sd_user_log" VALUES (47, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-15 04:13:28.560062', '2025-06-15 04:13:28.560062', 'en');
INSERT INTO "public"."sd_user_log" VALUES (48, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-15 04:41:36.211462', '2025-06-15 04:41:36.211462', 'en');
INSERT INTO "public"."sd_user_log" VALUES (49, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-15 12:12:19.899969', '2025-06-15 12:12:19.899969', 'en');
INSERT INTO "public"."sd_user_log" VALUES (50, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-15 12:17:19.249796', '2025-06-15 12:17:19.249796', 'en');
INSERT INTO "public"."sd_user_log" VALUES (51, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-15 19:40:28.469426', '2025-06-15 19:40:28.469426', 'en');
INSERT INTO "public"."sd_user_log" VALUES (52, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-16 01:46:46.581004', '2025-06-16 01:46:46.581004', 'en');
INSERT INTO "public"."sd_user_log" VALUES (53, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-16 06:17:08.13667', '2025-06-16 06:17:08.13667', 'en');
INSERT INTO "public"."sd_user_log" VALUES (54, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-16 14:39:18.914406', '2025-06-16 14:39:18.914406', 'en');
INSERT INTO "public"."sd_user_log" VALUES (55, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-17 01:33:51.027381', '2025-06-17 01:33:51.027381', 'en');
INSERT INTO "public"."sd_user_log" VALUES (56, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-17 03:35:14.261547', '2025-06-17 03:35:14.261547', 'en');
INSERT INTO "public"."sd_user_log" VALUES (57, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-17 07:13:51.932416', '2025-06-17 07:13:51.932416', 'en');
INSERT INTO "public"."sd_user_log" VALUES (58, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-17 17:05:34.014432', '2025-06-17 17:05:34.014432', 'en');
INSERT INTO "public"."sd_user_log" VALUES (59, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-17 18:28:31.987564', '2025-06-17 18:28:31.987564', 'en');
INSERT INTO "public"."sd_user_log" VALUES (60, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-17 20:37:57.868425', '2025-06-17 20:37:57.868425', 'en');
INSERT INTO "public"."sd_user_log" VALUES (61, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-17 20:53:08.688658', '2025-06-17 20:53:08.688658', 'en');
INSERT INTO "public"."sd_user_log" VALUES (62, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-18 02:18:17.482604', '2025-06-18 02:18:17.482604', 'en');
INSERT INTO "public"."sd_user_log" VALUES (63, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-18 02:38:56.494021', '2025-06-18 02:38:56.494021', 'en');
INSERT INTO "public"."sd_user_log" VALUES (64, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-18 03:09:31.884603', '2025-06-18 03:09:31.884603', 'en');
INSERT INTO "public"."sd_user_log" VALUES (65, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-18 03:57:10.702604', '2025-06-18 03:57:10.702604', 'en');
INSERT INTO "public"."sd_user_log" VALUES (66, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-18 07:50:22.893444', '2025-06-18 07:50:22.893444', 'en');
INSERT INTO "public"."sd_user_log" VALUES (67, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-18 08:26:05.749056', '2025-06-18 08:26:05.749056', 'en');
INSERT INTO "public"."sd_user_log" VALUES (68, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-18 08:30:43.67409', '2025-06-18 08:30:43.67409', 'en');
INSERT INTO "public"."sd_user_log" VALUES (69, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-18 12:44:47.218425', '2025-06-18 12:44:47.218425', 'en');
INSERT INTO "public"."sd_user_log" VALUES (70, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-18 12:44:48.187925', '2025-06-18 12:44:48.187925', 'en');
INSERT INTO "public"."sd_user_log" VALUES (71, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-18 12:44:48.884199', '2025-06-18 12:44:48.884199', 'en');
INSERT INTO "public"."sd_user_log" VALUES (72, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', 0, 0, 0, 0, 0, '2025-06-18 12:46:12.27428', '2025-06-18 12:46:12.27428', 'en');
INSERT INTO "public"."sd_user_log" VALUES (73, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-18 12:55:03.978746', '2025-06-18 12:55:03.978746', 'en');
INSERT INTO "public"."sd_user_log" VALUES (74, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-19 09:57:24.518207', '2025-06-19 09:57:24.518207', 'en');
INSERT INTO "public"."sd_user_log" VALUES (75, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-19 18:26:18.837463', '2025-06-19 18:26:18.837463', 'en');
INSERT INTO "public"."sd_user_log" VALUES (76, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-21 04:02:04.626414', '2025-06-21 04:02:04.626414', 'en');
INSERT INTO "public"."sd_user_log" VALUES (77, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 10:06:14.365358', '2025-06-22 10:06:14.365358', 'en');
INSERT INTO "public"."sd_user_log" VALUES (78, 1, 'e0076094-ec42-41ca-a39d-543999c7bbf6', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 11:27:32.817555', '2025-06-22 11:27:32.817555', 'en');
INSERT INTO "public"."sd_user_log" VALUES (79, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 13:04:39.167339', '2025-06-22 13:04:39.167339', 'en');
INSERT INTO "public"."sd_user_log" VALUES (80, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 15:11:22.696883', '2025-06-22 15:11:22.696883', 'en');
INSERT INTO "public"."sd_user_log" VALUES (81, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 15:11:28.61057', '2025-06-22 15:11:28.61057', 'en');
INSERT INTO "public"."sd_user_log" VALUES (82, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-22 18:39:10.072138', '2025-06-22 18:39:10.072138', 'en');
INSERT INTO "public"."sd_user_log" VALUES (83, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 18:41:19.295056', '2025-06-22 18:41:19.295056', 'en');
INSERT INTO "public"."sd_user_log" VALUES (84, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-22 18:41:54.400949', '2025-06-22 18:41:54.400949', 'en');
INSERT INTO "public"."sd_user_log" VALUES (85, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 18:43:34.410747', '2025-06-22 18:43:34.410747', 'en');
INSERT INTO "public"."sd_user_log" VALUES (86, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-22 19:04:33.318941', '2025-06-22 19:04:33.318941', 'en');
INSERT INTO "public"."sd_user_log" VALUES (87, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 19:20:55.311999', '2025-06-22 19:20:55.311999', 'en');
INSERT INTO "public"."sd_user_log" VALUES (88, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 20:26:25.82774', '2025-06-22 20:26:25.82774', 'en');
INSERT INTO "public"."sd_user_log" VALUES (89, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-22 20:34:44.181966', '2025-06-22 20:34:44.181966', 'en');
INSERT INTO "public"."sd_user_log" VALUES (90, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-22 20:35:40.340906', '2025-06-22 20:35:40.340906', 'en');
INSERT INTO "public"."sd_user_log" VALUES (91, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-23 02:43:45.163666', '2025-06-23 02:43:45.163666', 'en');
INSERT INTO "public"."sd_user_log" VALUES (92, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-23 03:16:39.397405', '2025-06-23 03:16:39.397405', 'en');
INSERT INTO "public"."sd_user_log" VALUES (93, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-23 03:29:41.31101', '2025-06-23 03:29:41.31101', 'en');
INSERT INTO "public"."sd_user_log" VALUES (94, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-23 14:25:52.178634', '2025-06-23 14:25:52.178634', 'en');
INSERT INTO "public"."sd_user_log" VALUES (95, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-23 14:43:32.65041', '2025-06-23 14:43:32.65041', 'en');
INSERT INTO "public"."sd_user_log" VALUES (96, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-23 15:16:56.682087', '2025-06-23 15:16:56.682087', 'en');
INSERT INTO "public"."sd_user_log" VALUES (97, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-23 15:18:40.075581', '2025-06-23 15:18:40.075581', 'en');
INSERT INTO "public"."sd_user_log" VALUES (98, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-25 00:20:09.726513', '2025-06-25 00:20:09.726513', 'en');
INSERT INTO "public"."sd_user_log" VALUES (99, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-25 00:34:46.591601', '2025-06-25 00:34:46.591601', 'en');
INSERT INTO "public"."sd_user_log" VALUES (100, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-26 03:59:44.311329', '2025-06-26 03:59:44.311329', 'en');
INSERT INTO "public"."sd_user_log" VALUES (101, 1, 'e0076094-ec42-41ca-a39d-543999c7bbf6', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-26 08:22:51.837932', '2025-06-26 08:22:51.837932', 'en');
INSERT INTO "public"."sd_user_log" VALUES (102, 2, 'e0076094-ec42-41ca-a39d-543999c7bbf6', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-26 08:26:13.982227', '2025-06-26 08:26:13.982227', 'en');
INSERT INTO "public"."sd_user_log" VALUES (103, 1, 'e0076094-ec42-41ca-a39d-543999c7bbf6', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-26 08:26:36.138469', '2025-06-26 08:26:36.138469', 'en');
INSERT INTO "public"."sd_user_log" VALUES (104, 2, 'e0076094-ec42-41ca-a39d-543999c7bbf6', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-26 20:47:10.29763', '2025-06-26 20:47:10.29763', 'en');
INSERT INTO "public"."sd_user_log" VALUES (137, 1, 'ab670ab2-3b45-4059-9a39-87c72d4d6f1c', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-27 03:57:28.225656', '2025-06-27 03:57:28.225656', 'en');
INSERT INTO "public"."sd_user_log" VALUES (138, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-27 04:43:57.568418', '2025-06-27 04:43:57.568418', 'en');
INSERT INTO "public"."sd_user_log" VALUES (139, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-27 08:08:45.661336', '2025-06-27 08:08:45.661336', 'en');
INSERT INTO "public"."sd_user_log" VALUES (140, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-27 18:57:46.48131', '2025-06-27 18:57:46.48131', 'en');
INSERT INTO "public"."sd_user_log" VALUES (141, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-27 19:23:22.134898', '2025-06-27 19:23:22.134898', 'en');
INSERT INTO "public"."sd_user_log" VALUES (142, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-27 19:24:23.858652', '2025-06-27 19:24:23.858652', 'en');
INSERT INTO "public"."sd_user_log" VALUES (143, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-28 04:56:31.724718', '2025-06-28 04:56:31.724718', 'en');
INSERT INTO "public"."sd_user_log" VALUES (144, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-29 03:14:58.502038', '2025-06-29 03:14:58.502038', 'en');
INSERT INTO "public"."sd_user_log" VALUES (145, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-29 12:46:04.267225', '2025-06-29 12:46:04.267225', 'en');
INSERT INTO "public"."sd_user_log" VALUES (146, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-29 15:04:40.177936', '2025-06-29 15:04:40.177936', 'en');
INSERT INTO "public"."sd_user_log" VALUES (147, 2, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-06-29 17:31:09.624915', '2025-06-29 17:31:09.624915', 'en');
INSERT INTO "public"."sd_user_log" VALUES (148, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-06-29 17:31:45.368499', '2025-06-29 17:31:45.368499', 'en');
INSERT INTO "public"."sd_user_log" VALUES (2, 1, '3a493e74-cdc3-4060-8db2-220463a80f20', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-02 09:39:40.350833', '2025-07-02 09:39:40.350833', 'en');
INSERT INTO "public"."sd_user_log" VALUES (4, 1, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-03 02:09:24.237288', '2025-07-03 02:09:24.237288', 'en');
INSERT INTO "public"."sd_user_log" VALUES (6, 1, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-03 02:15:01.557488', '2025-07-03 02:15:01.557488', 'en');
INSERT INTO "public"."sd_user_log" VALUES (8, 1, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-03 03:44:56.429532', '2025-07-03 03:44:56.429532', 'en');
INSERT INTO "public"."sd_user_log" VALUES (9, 1, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-03 13:22:45.93739', '2025-07-03 13:22:45.93739', 'en');
INSERT INTO "public"."sd_user_log" VALUES (10, 2, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-03 13:46:29.359182', '2025-07-03 13:46:29.359182', 'en');
INSERT INTO "public"."sd_user_log" VALUES (12, 2, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-03 16:59:17.320721', '2025-07-03 16:59:17.320721', 'en');
INSERT INTO "public"."sd_user_log" VALUES (46, 2, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-04 17:06:31.306589', '2025-07-04 17:06:31.306589', 'th');
INSERT INTO "public"."sd_user_log" VALUES (84, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-05 12:13:31.174277', '2025-07-05 12:13:31.174277', 'en');
INSERT INTO "public"."sd_user_log" VALUES (86, 1, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-06 09:16:44.055167', '2025-07-06 09:16:44.055167', 'en');
INSERT INTO "public"."sd_user_log" VALUES (89, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-09 08:25:52.413807', '2025-07-09 08:25:52.413807', 'en');
INSERT INTO "public"."sd_user_log" VALUES (122, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-09 10:35:55.807228', '2025-07-09 10:35:55.807228', 'en');
INSERT INTO "public"."sd_user_log" VALUES (123, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-09 21:34:21.823733', '2025-07-09 21:34:21.823733', 'en');
INSERT INTO "public"."sd_user_log" VALUES (124, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-10 15:24:04.147185', '2025-07-10 15:24:04.147185', 'en');
INSERT INTO "public"."sd_user_log" VALUES (125, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-10 15:24:27.509603', '2025-07-10 15:24:27.509603', 'en');
INSERT INTO "public"."sd_user_log" VALUES (126, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-10 16:07:24.915985', '2025-07-10 16:07:24.915985', 'en');
INSERT INTO "public"."sd_user_log" VALUES (127, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-10 16:49:24.725458', '2025-07-10 16:49:24.725458', 'en');
INSERT INTO "public"."sd_user_log" VALUES (128, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-10 16:49:57.27406', '2025-07-10 16:49:57.27406', 'en');
INSERT INTO "public"."sd_user_log" VALUES (129, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 02:58:53.860808', '2025-07-11 02:58:53.860808', 'en');
INSERT INTO "public"."sd_user_log" VALUES (130, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 04:33:21.896344', '2025-07-11 04:33:21.896344', 'en');
INSERT INTO "public"."sd_user_log" VALUES (131, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 13:00:31.489329', '2025-07-11 13:00:31.489329', 'en');
INSERT INTO "public"."sd_user_log" VALUES (132, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 13:40:33.050257', '2025-07-11 13:40:33.050257', 'en');
INSERT INTO "public"."sd_user_log" VALUES (133, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 15:32:25.516737', '2025-07-11 15:32:25.516737', 'en');
INSERT INTO "public"."sd_user_log" VALUES (134, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 18:07:15.618231', '2025-07-11 18:07:15.618231', 'en');
INSERT INTO "public"."sd_user_log" VALUES (135, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 18:10:21.332961', '2025-07-11 18:10:21.332961', 'en');
INSERT INTO "public"."sd_user_log" VALUES (136, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-11 18:12:47.74835', '2025-07-11 18:12:47.74835', 'en');
INSERT INTO "public"."sd_user_log" VALUES (139, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-12 11:23:05.457963', '2025-07-12 11:23:05.457963', 'en');
INSERT INTO "public"."sd_user_log" VALUES (141, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-13 02:52:54.964086', '2025-07-13 02:52:54.964086', 'en');
INSERT INTO "public"."sd_user_log" VALUES (1, 2, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-18 06:43:15.239089', '2025-07-18 06:43:15.239089', 'en');
INSERT INTO "public"."sd_user_log" VALUES (38, 2, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-20 10:20:44.077849', '2025-07-20 10:20:44.077849', 'en');
INSERT INTO "public"."sd_user_log" VALUES (39, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-20 10:24:28.884431', '2025-07-20 10:24:28.884431', 'en');
INSERT INTO "public"."sd_user_log" VALUES (40, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-20 10:27:13.927756', '2025-07-20 10:27:13.927756', 'en');
INSERT INTO "public"."sd_user_log" VALUES (42, 2, 'fb546a59-6ade-4e48-8428-d1511831898a', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-07-22 19:47:11.191321', '2025-07-22 19:47:11.191321', 'en');
INSERT INTO "public"."sd_user_log" VALUES (51, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-07-27 05:19:48.070267', '2025-07-27 05:19:48.070267', 'en');
INSERT INTO "public"."sd_user_log" VALUES (67, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-08-10 04:34:35.997513', '2025-08-10 04:34:35.997513', 'en');
INSERT INTO "public"."sd_user_log" VALUES (70, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-08-10 07:04:09.266937', '2025-08-10 07:04:09.266937', 'en');
INSERT INTO "public"."sd_user_log" VALUES (72, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-08-10 07:17:49.590861', '2025-08-10 07:17:49.590861', 'en');
INSERT INTO "public"."sd_user_log" VALUES (74, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-08-10 07:21:39.047492', '2025-08-10 07:21:39.047492', 'en');
INSERT INTO "public"."sd_user_log" VALUES (76, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-08-10 07:25:07.88108', '2025-08-10 07:25:07.88108', 'en');
INSERT INTO "public"."sd_user_log" VALUES (80, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-08-10 08:22:27.110857', '2025-08-10 08:22:27.110857', 'en');
INSERT INTO "public"."sd_user_log" VALUES (91, 2, 'c9497023-f370-4355-9162-f3f019b3534b', 'User Signout', 'User Signout log', NULL, NULL, NULL, NULL, 2, '2025-08-13 16:33:42.260368', '2025-08-13 16:33:42.260368', 'en');
INSERT INTO "public"."sd_user_log" VALUES (124, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-08-14 01:17:09.485522', '2025-08-14 01:17:09.485522', 'en');
INSERT INTO "public"."sd_user_log" VALUES (127, 1, 'c9497023-f370-4355-9162-f3f019b3534b', 'User SignIn', 'User SignIn log', NULL, NULL, NULL, NULL, 1, '2025-08-15 05:36:00.66275', '2025-08-15 05:36:00.66275', 'en');

-- ----------------------------
-- Table structure for sd_user_log_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_log_type";
CREATE TABLE "public"."sd_user_log_type" (
  "log_type_id" int4 NOT NULL DEFAULT nextval('sd_user_log_type_log_type_id_seq'::regclass),
  "type_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "type_detail" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4,
  "create" timestamp(6) NOT NULL DEFAULT now(),
  "update" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of sd_user_log_type
-- ----------------------------

-- ----------------------------
-- Table structure for sd_user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_role";
CREATE TABLE "public"."sd_user_role" (
  "id" int4 NOT NULL DEFAULT nextval('sd_user_role_id_seq'::regclass),
  "role_id" int4 NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) DEFAULT now(),
  "updateddate" timestamp(6) DEFAULT now(),
  "create_by" int4 NOT NULL,
  "lastupdate_by" int4 NOT NULL,
  "status" int2 NOT NULL,
  "type_id" int4 NOT NULL,
  "lang" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of sd_user_role
-- ----------------------------
INSERT INTO "public"."sd_user_role" VALUES (1, 1, 'Dev', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (2, 2, 'Administrator', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (3, 3, 'Company', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (4, 4, 'Staff', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (5, 5, 'Helpdask', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (6, 6, 'Customer', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (7, 7, 'Donate', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (8, 8, 'Edittor', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (9, 9, 'User', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (10, 10, 'gaust', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'en');
INSERT INTO "public"."sd_user_role" VALUES (11, 1, 'Dev', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (12, 2, 'Administrator', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (13, 3, 'Company', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (14, 4, 'Staff', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (15, 5, 'Helpdask', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (16, 6, 'Customer', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (17, 7, 'Donate', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (18, 8, 'Edittor', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (19, 9, 'User', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');
INSERT INTO "public"."sd_user_role" VALUES (20, 10, 'gaust', '2025-04-06 20:56:00.301605', '2025-04-06 20:56:00.301605', 1, 1, 1, 1, 'th');

-- ----------------------------
-- Table structure for sd_user_roles_access
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_roles_access";
CREATE TABLE "public"."sd_user_roles_access" (
  "create" timestamp(6) NOT NULL DEFAULT now(),
  "update" timestamp(6) NOT NULL DEFAULT now(),
  "role_id" int4 NOT NULL,
  "role_type_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of sd_user_roles_access
-- ----------------------------
INSERT INTO "public"."sd_user_roles_access" VALUES ('2021-05-05 09:23:46', '2021-05-05 09:23:48', 1, 1);
INSERT INTO "public"."sd_user_roles_access" VALUES ('2023-05-01 17:50:20', '2023-05-01 17:50:25', 2, 2);
INSERT INTO "public"."sd_user_roles_access" VALUES ('2023-05-01 17:50:59', '2023-05-01 17:51:03', 3, 3);
INSERT INTO "public"."sd_user_roles_access" VALUES ('2023-05-01 17:51:13', '2023-05-01 17:51:15', 4, 4);
INSERT INTO "public"."sd_user_roles_access" VALUES ('2023-05-01 17:51:23', '2023-05-01 17:51:25', 5, 5);
INSERT INTO "public"."sd_user_roles_access" VALUES ('2023-05-01 17:51:31', '2023-05-01 17:51:34', 5, 6);

-- ----------------------------
-- Table structure for sd_user_roles_permision
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_roles_permision";
CREATE TABLE "public"."sd_user_roles_permision" (
  "role_type_id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "detail" text COLLATE "pg_catalog"."default",
  "created" timestamp(6) NOT NULL DEFAULT now(),
  "updated" timestamp(6) DEFAULT now(),
  "insert" int4,
  "update" int4,
  "delete" int4,
  "select" int4,
  "log" int4,
  "config" int4,
  "truncate" int4
)
;
COMMENT ON COLUMN "public"."sd_user_roles_permision"."created" IS 'เพิ่มเมื่อ';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."updated" IS 'แก้ไขเมื่อ';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."insert" IS 'เพิ่มข้อมูล';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."update" IS 'แก้ไขข้อมูล';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."delete" IS 'ลบข้อมูล';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."select" IS 'ดูข้อมูล';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."log" IS 'จัดการประวัติ';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."config" IS 'ตั้งค่าระบบ';
COMMENT ON COLUMN "public"."sd_user_roles_permision"."truncate" IS 'ล้างข้อมูล';

-- ----------------------------
-- Records of sd_user_roles_permision
-- ----------------------------
INSERT INTO "public"."sd_user_roles_permision" VALUES (1, 'System Admin', 'All', '2021-05-05 09:23:32', '2021-05-05 09:23:33', 1, 1, 1, 1, 1, 1, 1);
INSERT INTO "public"."sd_user_roles_permision" VALUES (2, 'Admin Level', 'Admin access', '2021-05-09 19:52:04', '2021-05-09 19:52:09', 1, 1, 1, 1, 1, 0, 0);
INSERT INTO "public"."sd_user_roles_permision" VALUES (3, 'Customer Level', 'Customer access', '2021-05-09 19:52:30', '2021-05-09 19:52:32', 1, 1, 0, 1, 1, 0, 0);

-- ----------------------------
-- Function structure for uuid_generate_v1
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1"();
CREATE FUNCTION "public"."uuid_generate_v1"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v1mc
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc"();
CREATE FUNCTION "public"."uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v3
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3"("namespace" uuid, "name" text);
CREATE FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4"();
CREATE FUNCTION "public"."uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v5
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5"("namespace" uuid, "name" text);
CREATE FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_nil
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_nil"();
CREATE FUNCTION "public"."uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_dns
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns"();
CREATE FUNCTION "public"."uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_oid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid"();
CREATE FUNCTION "public"."uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_url
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_url"();
CREATE FUNCTION "public"."uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_x500
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500"();
CREATE FUNCTION "public"."uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_admin_access_menu_admin_access_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_admin_access_menu_admin_access_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_admin_access_menu_admin_access_id_seq2"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_device_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_api_api_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_action_device_action_user_id_seq"', 33, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_action_log_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_action_user_device_action_user_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_alarm_action_alarm_action_id_seq"', 73, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_device_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_device_id_seq1"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq2"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq2"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq3"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq3"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq4"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq4"', 103, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq5"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq5"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq6"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq6"', 66, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq7"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq7"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq8"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq8"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_type_type_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_email_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_email_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_host_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_host_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_group_group_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_group_group_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_influxdb_influxdb_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_line_line_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_location_location_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_location_location_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq2"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq3"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq3"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq4"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq4"', 88, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq5"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq5"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq6"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq6"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq7"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq7"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq8"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq8"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_nodered_nodered_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_schedule_schedule_id_seq"', 25, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_sensor_sensor_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_sensor_sensor_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_setting_setting_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_setting_setting_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_sms_sms_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_telegram_telegram_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_token_token_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_type_type_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_type_type_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_access_menu_user_access_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_file_file_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_file_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_file_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_log_id_seq"', 128, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_log_type_log_type_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_role_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table sd_admin_access_menu
-- ----------------------------
ALTER TABLE "public"."sd_admin_access_menu" ADD CONSTRAINT "PK_de95e99df0393960300a40f29ce" PRIMARY KEY ("admin_access_id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log" ADD CONSTRAINT "PK_bf05866d307414aca1cb0fa22bb" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_email
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_email" ADD CONSTRAINT "PK_3dd863b3d0b87eb1065f899d41e" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_line
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_line" ADD CONSTRAINT "PK_99daf9a12a11f25f7320bbbbb3a" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_sms
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_sms" ADD CONSTRAINT "PK_dc2d76655ef76ef973dbc496e12" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_telegram
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_telegram" ADD CONSTRAINT "PK_f708fcbb8c72eaae09f83713033" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_temp
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_temp" ADD CONSTRAINT "PK_432d1e132ee5b3c7279ffd75c84" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_device_log
-- ----------------------------
ALTER TABLE "public"."sd_device_log" ADD CONSTRAINT "PK_da44052006daebc229cb1a64d27" PRIMARY KEY ("id", "type_id", "sensor_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_alarm_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_alarm_device" ADD CONSTRAINT "PK_f25b128c3c65fcb6c16627e3c15" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_iot_alarm_device_event
-- ----------------------------
ALTER TABLE "public"."sd_iot_alarm_device_event" ADD CONSTRAINT "PK_25f5163f34e3ba4824c5b5a2a20" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_iot_api
-- ----------------------------
ALTER TABLE "public"."sd_iot_api" ADD CONSTRAINT "PK_f5a38da6c7393c8189d8aecba78" PRIMARY KEY ("api_id");

-- ----------------------------
-- Auto increment value for sd_iot_device
-- ----------------------------
SELECT setval('"public"."sd_iot_device_device_id_seq8"', 1, false);

-- ----------------------------
-- Primary Key structure for table sd_iot_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_device" ADD CONSTRAINT "PK_841e36ab4b8edbaa5363d65f18d" PRIMARY KEY ("device_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_action
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_action" ADD CONSTRAINT "PK_a146554159a27494fd0c4cb0414" PRIMARY KEY ("device_action_user_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_action_log
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_action_log" ADD CONSTRAINT "PK_18e2a97db2a742f43c79aba5e2c" PRIMARY KEY ("log_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_action_user
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_action_user" ADD CONSTRAINT "PK_46ce2368b97b8d88ad749ff3f7a" PRIMARY KEY ("device_action_user_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_alarm_action
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_alarm_action" ADD CONSTRAINT "PK_263a057ba286325ecfadbf7d659" PRIMARY KEY ("alarm_action_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_type
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_type" ADD CONSTRAINT "PK_f89dccdad875b086b9167167bb9" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_email
-- ----------------------------
ALTER TABLE "public"."sd_iot_email" ADD CONSTRAINT "PK_63215aa6e2f4e97a7fe631e9fd5" PRIMARY KEY ("email_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_group
-- ----------------------------
ALTER TABLE "public"."sd_iot_group" ADD CONSTRAINT "PK_b0ae5d1b99f0d240d56dc942b7a" PRIMARY KEY ("group_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_host
-- ----------------------------
ALTER TABLE "public"."sd_iot_host" ADD CONSTRAINT "PK_83184ad44ec9393718f3cda4081" PRIMARY KEY ("host_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_influxdb
-- ----------------------------
ALTER TABLE "public"."sd_iot_influxdb" ADD CONSTRAINT "PK_d6f4a4dc78c43ddaab90a832f2f" PRIMARY KEY ("influxdb_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_line
-- ----------------------------
ALTER TABLE "public"."sd_iot_line" ADD CONSTRAINT "PK_7a6a9f138ca9a811e345e59d146" PRIMARY KEY ("line_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_location
-- ----------------------------
ALTER TABLE "public"."sd_iot_location" ADD CONSTRAINT "PK_c56a6e8e084b1bc520fc82d8ade" PRIMARY KEY ("location_id");

-- ----------------------------
-- Auto increment value for sd_iot_mqtt
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq8"', 1, false);

-- ----------------------------
-- Primary Key structure for table sd_iot_mqtt
-- ----------------------------
ALTER TABLE "public"."sd_iot_mqtt" ADD CONSTRAINT "PK_7e9215a0c1ac3510c3f8c6ea292" PRIMARY KEY ("mqtt_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_nodered
-- ----------------------------
ALTER TABLE "public"."sd_iot_nodered" ADD CONSTRAINT "PK_5955209b50a4dac0a439790f161" PRIMARY KEY ("nodered_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_schedule
-- ----------------------------
ALTER TABLE "public"."sd_iot_schedule" ADD CONSTRAINT "PK_380784b437a7a4f03489497dbef" PRIMARY KEY ("schedule_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_schedule_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_schedule_device" ADD CONSTRAINT "PK_bcb83b896d2e0b92b2a019b09de" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_iot_sensor
-- ----------------------------
ALTER TABLE "public"."sd_iot_sensor" ADD CONSTRAINT "PK_6fc823992a8c07c5f40113f3e12" PRIMARY KEY ("sensor_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_setting
-- ----------------------------
ALTER TABLE "public"."sd_iot_setting" ADD CONSTRAINT "PK_fdf8830bacecfa04143cbf0ce89" PRIMARY KEY ("setting_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_sms
-- ----------------------------
ALTER TABLE "public"."sd_iot_sms" ADD CONSTRAINT "PK_f4546266bbae472c27c3476edb0" PRIMARY KEY ("sms_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_telegram
-- ----------------------------
ALTER TABLE "public"."sd_iot_telegram" ADD CONSTRAINT "PK_08af27f615221874350bf2bf792" PRIMARY KEY ("telegram_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_token
-- ----------------------------
ALTER TABLE "public"."sd_iot_token" ADD CONSTRAINT "PK_c3868ec03fed99f843e31ad977c" PRIMARY KEY ("token_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_type
-- ----------------------------
ALTER TABLE "public"."sd_iot_type" ADD CONSTRAINT "PK_1047517b57c47c748f0b71a4105" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table sd_mqtt_host
-- ----------------------------
ALTER TABLE "public"."sd_mqtt_host" ADD CONSTRAINT "sd_mqtt_host_copy1_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_schedule_process_log
-- ----------------------------
ALTER TABLE "public"."sd_schedule_process_log" ADD CONSTRAINT "PK_43d2cfd6e887bfb6dd522e78465" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user
-- ----------------------------
ALTER TABLE "public"."sd_user" ADD CONSTRAINT "PK_c804add3ec6e26d0bb85dd4b5b6" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user_access_menu
-- ----------------------------
ALTER TABLE "public"."sd_user_access_menu" ADD CONSTRAINT "PK_b08610dd9113be8c7df7774dbc8" PRIMARY KEY ("user_access_id");

-- ----------------------------
-- Primary Key structure for table sd_user_file
-- ----------------------------
ALTER TABLE "public"."sd_user_file" ADD CONSTRAINT "PK_bee867c384da15706056a6d4d79" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user_log
-- ----------------------------
ALTER TABLE "public"."sd_user_log" ADD CONSTRAINT "PK_87948a0ccfe3a88ef1e79914b00" PRIMARY KEY ("id", "log_type_id");

-- ----------------------------
-- Primary Key structure for table sd_user_log_type
-- ----------------------------
ALTER TABLE "public"."sd_user_log_type" ADD CONSTRAINT "PK_3f8b97a85e0528d6c18c4fd20b3" PRIMARY KEY ("log_type_id");

-- ----------------------------
-- Primary Key structure for table sd_user_role
-- ----------------------------
ALTER TABLE "public"."sd_user_role" ADD CONSTRAINT "PK_ce286bbce9874c345c85ba7c6e4" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user_roles_access
-- ----------------------------
ALTER TABLE "public"."sd_user_roles_access" ADD CONSTRAINT "PK_ea1374b87e00872215780b096f7" PRIMARY KEY ("role_id", "role_type_id");

-- ----------------------------
-- Primary Key structure for table sd_user_roles_permision
-- ----------------------------
ALTER TABLE "public"."sd_user_roles_permision" ADD CONSTRAINT "PK_4df7386cc58a6712f2bef59c507" PRIMARY KEY ("role_type_id");
