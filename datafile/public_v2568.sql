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

 Date: 11/07/2025 00:13:10
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
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (7, 1, 6, 5, 'IO3', 'cmon-air-4', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 84, '1', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'IO3', '1', '0', 'cmon_org', 'AIR1', 1, 'IO3', 'overIO3', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay3', 'contRelay3', '2025-07-10 09:21:14.26833', '2025-07-10 09:22:45.824145');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (1, 1, 1, 1, 'Temperature', 'Cmom-1', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW01', 1, 'temperature', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-10 07:22:37.529797', '2025-07-10 14:39:18');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (2, 1, 2, 1, 'Fan1', 'Cmom-2', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'fan1', '3', '2', 'cmon_org', 'BAACTW01', 1, 'fan1', 'overFan1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay1', 'contRelay1', '2025-07-10 07:23:58.321329', '2025-07-10 14:39:34');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (3, 1, 3, 1, 'Fan2', 'Cmom-3', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'fan2', '3', '2', 'cmon_org', 'BAACTW01', 1, 'fan2', 'overFan2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}', 'actRelay2', 'contRelay2', '2025-07-10 07:24:51.779966', '2025-07-10 14:39:48');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (6, 1, 5, 5, 'IO2', 'cmon-air-3', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 84, '', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'IO2', '1', '0', 'cmon_org', 'AIR1', 1, 'IO2', 'overIO2', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay2', 'contRelay2', '2025-07-10 09:19:53.885929', '2025-07-10 09:22:45.824145');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (4, 1, 1, 5, 'Temperature', 'cmon-air-1', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 84, '1', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'temperature', '1', '0', 'cmon_org', 'AIR1', 1, 'temperature', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-07-10 09:11:26.104342', '2025-07-10 09:22:45.824145');
INSERT INTO "public"."sd_iot_device" OVERRIDING SYSTEM VALUE VALUES (5, 1, 4, 5, 'IO1', 'cmon-air-2', 1, '32', '1', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 84, '1', 1, 1, 'AIR1/DATA', 'AIR1/CONTROL', 'IO1', '1', '0', 'cmon_org', 'AIR1', 1, 'IO1', 'overIO1', '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}', 'actRelay1', 'contRelay1', '2025-07-10 09:14:42.222597', '2025-07-10 09:22:45.824145');

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

-- ----------------------------
-- Table structure for sd_iot_device_copy1
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_copy1";
CREATE TABLE "public"."sd_iot_device_copy1" (
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
-- Records of sd_iot_device_copy1
-- ----------------------------
INSERT INTO "public"."sd_iot_device_copy1" VALUES (169, 1, 2, 1, 'Fan1', 'Cmom-2', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW01', 0, 'fan1', 'overFan1', 'actRelay1', 'actRelay1', 'contRelay1', '2025-07-10 07:07:20.571022', '2025-07-10 07:07:20.571022');
INSERT INTO "public"."sd_iot_device_copy1" VALUES (168, 1, 1, 1, 'Temperature', 'Cmom-1', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', -1, 0, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW01', 0, 'temperature', 'overFan1', 'actRelay1', 'actRelay1', 'contRelay1', '2025-07-10 07:04:27.730318', '2025-07-10 07:04:27.730318');

-- ----------------------------
-- Table structure for sd_iot_device_copy2
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_copy2";
CREATE TABLE "public"."sd_iot_device_copy2" (
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
-- Records of sd_iot_device_copy2
-- ----------------------------
INSERT INTO "public"."sd_iot_device_copy2" VALUES (169, 1, 2, 1, 'Fan1', 'Cmom-2', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', 1, 1, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'fan1', '1', '0', 'cmon_org', 'BAACTW01', 0, 'fan1', 'overFan1', 'actRelay1', 'actRelay1', 'contRelay1', '2025-07-10 07:07:20.571022', '2025-07-10 07:07:20.571022');
INSERT INTO "public"."sd_iot_device_copy2" VALUES (168, 1, 1, 1, 'Temperature', 'Cmom-1', 1, '32', '25', '35', '25', 3600, '35', 1, '35', '25', 'cmon', 'cmon', '1', '°C', 1, '1', -1, 0, 'BAACTW01/DATA', 'BAACTW01/CONTROL', 'temperature', '1', '0', 'cmon_org', 'BAACTW01', 0, 'temperature', 'overFan1', 'actRelay1', 'actRelay1', 'contRelay1', '2025-07-10 07:04:27.730318', '2025-07-10 07:04:27.730318');

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
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4,
  "email_id" int4 NOT NULL DEFAULT nextval('sd_iot_email_email_id_seq1'::regclass),
  "email_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host_id" int4 NOT NULL DEFAULT nextval('sd_iot_email_host_id_seq1'::regclass),
  "host_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of sd_iot_email
-- ----------------------------

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
-- Table structure for sd_iot_influxdb
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_influxdb";
CREATE TABLE "public"."sd_iot_influxdb" (
  "influxdb_id" int4 NOT NULL DEFAULT nextval('sd_iot_influxdb_influxdb_id_seq'::regclass),
  "influxdb_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" int4,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token_value" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_influxdb
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_line
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_line";
CREATE TABLE "public"."sd_iot_line" (
  "line_id" int4 NOT NULL DEFAULT nextval('sd_iot_line_line_id_seq'::regclass),
  "line_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Records of sd_iot_line
-- ----------------------------

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
INSERT INTO "public"."sd_iot_location" VALUES (1, 'ธกส ระบบพัดลมระบายอากาศ', '192.168.1.37', 'Fan', '2025-06-14 05:31:26.774385', '2025-06-14 05:31:26.774385', 1, '	{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}');

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

-- ----------------------------
-- Records of sd_iot_mqtt
-- ----------------------------
INSERT INTO "public"."sd_iot_mqtt" VALUES (83, 1, 47, 'อาคาร 1 ชั้น 46', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW47', 'measurement', '2025-07-03 11:50:47.902532', '2025-07-05 11:32:04', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (79, 1, 43, 'อาคาร 1 ชั้น 42', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW43', 'measurement', '2025-07-03 04:31:27.737147', '2025-07-08 07:39:42.820828', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (10, 1, 10, 'อาคาร 1 ชั้น 9', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW10', 'measurement', '2025-07-02 17:58:11.181382', '2025-07-09 11:44:46', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (86, 1, 50, 'อาคาร 1 ชั้น 3 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR3', 'measurement', '2025-07-08 11:13:06.266318', '2025-07-08 18:16:00', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (84, 1, 48, 'อาคาร 1 ชั้น 1 ระบบแอร์', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR1', 'measurement', '2025-07-08 11:02:53.09007', '2025-07-10 09:22:45.815478', 1, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (119, 1, 51, 'อาคาร 1 ชั้น 4 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR4', 'measurement', '2025-07-08 11:16:51.116013', '2025-07-08 18:17:16', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (152, 1, 52, 'อาคาร 1 ชั้น 5 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR5', 'measurement', '2025-07-08 11:29:50.589425', '2025-07-08 18:36:42', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (153, 1, 53, 'อาคาร 1 ชั้น 6 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR6', 'measurement', '2025-07-08 12:09:59.082671', '2025-07-09 09:12:54', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (157, 1, 57, 'อาคาร 1 ชั้น 10 ระบบแอร์', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR10', 'measurement', '2025-07-09 02:42:38.650502', '2025-07-09 02:42:38.650502', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (80, 1, 44, 'อาคาร 1 ชั้น 43', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW44', 'measurement', '2025-07-03 04:34:35.272433', '2025-07-09 01:15:00.031229', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (85, 1, 49, 'อาคาร 1 ชั้น 2 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR2', 'measurement', '2025-07-08 11:04:46.173135', '2025-07-08 18:15:33', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (154, 1, 54, 'อาคาร 1 ชั้น 7 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR7', 'measurement', '2025-07-09 02:12:02.96815', '2025-07-09 09:21:43', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (158, 1, 58, 'อาคาร 1 ชั้น 11 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR11', 'measurement', '2025-07-09 02:44:31.12283', '2025-07-09 09:44:58', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (1, 1, 1, 'อาคาร 1  ชั้นใต้ดิน', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW01', 'measurement', '2025-07-02 17:45:47.490628', '2025-07-10 07:25:56.931822', 1, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (2, 1, 2, 'อาคาร 1 ชั้น 1', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW02', 'measurement', '2025-07-02 17:46:24.901486', '2025-07-02 17:46:24.901486', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (3, 1, 3, 'อาคาร 1 ชั้น 2', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW03', 'measurement', '2025-07-02 17:47:12.117153', '2025-07-03 11:22:51', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (4, 1, 4, 'อาคาร 1 ชั้น 3', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW04', 'measurement', '2025-07-02 17:48:47.427748', '2025-07-03 01:17:56', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (5, 1, 5, 'อาคาร 1 ชั้น 4', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW05', 'measurement', '2025-07-02 17:49:46.530328', '2025-07-09 03:20:00.300021', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (6, 1, 6, 'อาคาร 1 ชั้น 5', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW06', 'measurement', '2025-07-02 17:51:13.016574', '2025-07-09 03:20:16.551487', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (81, 1, 45, 'อาคาร 1 ชั้น 44', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW45', 'measurement', '2025-07-03 04:39:13.63353', '2025-07-03 04:39:13.63353', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (159, 1, 59, 'อาคาร 1 ชั้น 12 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR12', 'measurement', '2025-07-09 02:46:28.730649', '2025-07-09 16:09:18', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (155, 1, 55, 'อาคาร 1 ชั้น 8 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR8', 'measurement', '2025-07-09 02:20:48.535403', '2025-07-09 09:22:09', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (8, 1, 8, 'อาคาร 1 ชั้น 7', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW08', 'measurement', '2025-07-02 17:55:12.306466', '2025-07-09 03:44:00.283801', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (9, 1, 9, 'อาคาร 1 ชั้น 8', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW09', 'measurement', '2025-07-02 17:56:23.774421', '2025-07-09 03:44:27.22027', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (11, 1, 11, 'อาคาร 1 ชั้น 10', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW11', 'measurement', '2025-07-02 17:59:22.793245', '2025-07-09 03:47:11.16655', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (12, 1, 12, 'อาคาร 1 ชั้น 11', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW12', 'measurement', '2025-07-02 18:01:14.92953', '2025-07-09 03:47:13.713421', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (13, 1, 13, 'อาคาร 1 ชั้น 12', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW13', 'measurement', '2025-07-02 18:02:12.555345', '2025-07-09 04:01:52.587287', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (14, 1, 14, 'อาคาร 1 ชั้น 13', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW14', 'measurement', '2025-07-02 18:04:26.522866', '2025-07-09 04:29:57.993703', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (15, 1, 15, 'อาคาร 1 ชั้น 14', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW15', 'measurement', '2025-07-02 18:06:13.547103', '2025-07-09 04:30:17.04507', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (16, 1, 16, 'อาคาร 1 ชั้น 15', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW16', 'measurement', '2025-07-02 18:10:02.175493', '2025-07-09 04:35:37.424357', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (17, 1, 17, 'อาคาร 1 ชั้น 16', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW17', 'measurement', '2025-07-02 18:11:17.185464', '2025-07-09 04:44:55.127713', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (18, 1, 18, 'อาคาร 1 ชั้น 17', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW18', 'measurement', '2025-07-02 18:12:16.790785', '2025-07-09 04:47:39.326995', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (36, 1, 36, 'อาคาร 1 ชั้น 35', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW36', 'measurement', '2025-07-02 18:52:16.643044', '2025-07-08 07:40:05.18667', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (21, 1, 21, 'อาคาร 1 ชั้น 20', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW21', 'measurement', '2025-07-02 18:23:22.780183', '2025-07-09 04:56:18.381536', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (7, 1, 7, 'อาคาร 1 ชั้น 6', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW07', 'measurement', '2025-07-02 17:53:56.594279', '2025-07-09 03:40:59.898767', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (22, 1, 22, 'อาคาร 1 ชั้น 21', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW22', 'measurement', '2025-07-02 18:25:52.362096', '2025-07-09 05:30:17.569592', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (23, 1, 23, 'อาคาร 1 ชั้น 22', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW23', 'measurement', '2025-07-02 18:27:41.316091', '2025-07-08 07:40:40.77206', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (24, 1, 24, 'อาคาร 1 ชั้น 23', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW24', 'measurement', '2025-07-02 18:29:01.801024', '2025-07-08 07:40:38.285608', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (26, 1, 26, 'อาคาร 1 ชั้น 25', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW26', 'measurement', '2025-07-02 18:34:34.375539', '2025-07-08 07:40:33.172237', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (28, 1, 28, 'อาคาร 1 ชั้น 27', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW28', 'measurement', '2025-07-02 18:38:02.691683', '2025-07-08 07:40:26.709244', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (27, 1, 27, 'อาคาร 1 ชั้น 26', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW27', 'measurement', '2025-07-02 18:36:55.327374', '2025-07-08 07:40:30.848776', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (29, 1, 29, 'อาคาร 1 ชั้น 28', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW29', 'measurement', '2025-07-02 18:39:27.714616', '2025-07-08 07:40:24.103614', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (30, 1, 30, 'อาคาร 1 ชั้น 29', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW30', 'measurement', '2025-07-02 18:40:27.683204', '2025-07-08 07:40:21.598147', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (31, 1, 31, 'อาคาร 1 ชั้น 30', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW31', 'measurement', '2025-07-02 18:42:12.800326', '2025-07-08 07:40:19.066338', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (32, 1, 32, 'อาคาร 1 ชั้น 31', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW32', 'measurement', '2025-07-02 18:43:28.590838', '2025-07-08 07:40:16.37704', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (33, 1, 33, 'อาคาร 1 ชั้น 32', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW33', 'measurement', '2025-07-02 18:45:51.548631', '2025-07-08 07:40:13.606847', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (34, 1, 34, 'อาคาร 1 ชั้น 33', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW34', 'measurement', '2025-07-02 18:47:42.560025', '2025-07-08 07:40:10.86767', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (19, 1, 19, 'อาคาร 1 ชั้น 18', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW19', 'measurement', '2025-07-02 18:21:08.263892', '2025-07-09 04:52:50.056967', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (20, 1, 20, 'อาคาร 1 ชั้น 19', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW20', 'measurement', '2025-07-02 18:22:00.368086', '2025-07-09 04:54:09.203167', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (35, 1, 35, 'อาคาร 1 ชั้น 34', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW35', 'measurement', '2025-07-02 18:49:57.530826', '2025-07-08 07:40:07.95824', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (25, 1, 25, 'อาคาร 1 ชั้น 24', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW25', 'measurement', '2025-07-02 18:30:09.416368', '2025-07-08 07:40:35.722326', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (78, 1, 42, 'อาคาร 1 ชั้น 41', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW42', 'measurement', '2025-07-03 02:19:50.087164', '2025-07-08 07:39:45.569379', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (41, 1, 41, 'อาคาร 1 ชั้น 40', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW41', 'measurement', '2025-07-02 18:57:50.080716', '2025-07-08 07:39:48.699803', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (40, 1, 40, 'อาคาร 1 ชั้น 39', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW40', 'measurement', '2025-07-02 18:57:17.116998', '2025-07-08 07:39:51.768705', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (39, 1, 39, 'อาคาร 1 ชั้น 38', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW39', 'measurement', '2025-07-02 18:56:11.980052', '2025-07-08 07:39:55.082086', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (38, 1, 38, 'อาคาร 1 ชั้น 37', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW38', 'measurement', '2025-07-02 18:55:03.603544', '2025-07-08 07:39:58.214827', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (37, 1, 37, 'อาคาร 1 ชั้น 36', '192.168.1.59', 8086, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW37', 'measurement', '2025-07-02 18:54:11.322743', '2025-07-08 07:40:02.344448', 0, 1);
INSERT INTO "public"."sd_iot_mqtt" VALUES (156, 1, 56, 'อาคาร 1 ชั้น 9 ระบบแอร์', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'AIR9', 'measurement', '2025-07-09 02:22:56.031455', '2025-07-09 09:23:33', 0, 5);
INSERT INTO "public"."sd_iot_mqtt" VALUES (82, 1, 46, 'อาคาร 1 ชั้น 45', '192.168.1.59', 8089, 'admin', 'Na@0955@#@#', 'Na@0955##', '365d', 'BcKyMJK-AVist7GQkkb30Fm-LZZnAVeQrG4hXWetVtYow5Wal_dIYoRYFLAV1vqlQM0J7o_OXTP62P6ktYxB3Q==', 'cmon_org', 'BAACTW46', 'measurement', '2025-07-03 04:41:50.784821', '2025-07-03 11:42:16', 0, 1);

-- ----------------------------
-- Table structure for sd_iot_nodered
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_nodered";
CREATE TABLE "public"."sd_iot_nodered" (
  "nodered_id" int4 NOT NULL DEFAULT nextval('sd_iot_nodered_nodered_id_seq'::regclass),
  "nodered_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
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
INSERT INTO "public"."sd_iot_schedule" VALUES (1, '1.ทำการเปิด อุกรณ์ ', 1, '05:20', 1, 1, 1, 1, 1, 1, 1, 1, '2025-06-16 02:31:55.869785', '2025-07-07 12:58:06.818018', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (38, '6.ทำการเปิด อุกรณ์', 1, '16:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:21:48.714074', '2025-07-04 15:33:42.4184', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (39, '7.ทำการเปิด อุกรณ์', 1, '18:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:23:00.502995', '2025-07-04 15:33:44.32378', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (35, '3.ทำการเปิด อุกรณ์', 1, '10:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 14:56:16.512273', '2025-07-04 15:33:55.350606', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (42, '2.ทำการปิด อุกรณ์ ', 1, '12:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:35:33.565295', '2025-07-07 14:13:59.488875', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (40, '8.ทำการเปิด อุกรณ์', 1, '20:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:25:15.71962', '2025-07-05 01:38:57.035', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (34, '2.ทำการเปิด อุกรณ์', 1, '08:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 14:54:28.066507', '2025-07-04 22:27:19.219', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (41, '1.ทำการปิด อุกรณ์', 1, '02:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:34:38.981455', '2025-07-05 13:36:36.224', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (36, '4.ทำการเปิด อุกรณ์', 1, '11:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:16:05.286756', '2025-07-04 22:31:47.616', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (37, '5.ทำการเปิด อุกรณ์', 1, '14:00', 1, 1, 1, 1, 1, 1, 1, 1, '2025-07-04 15:18:14.037309', '2025-07-04 22:32:20.712', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (46, '4.ทำการปิด อุกรณ์', 1, '14:00', 0, 0, 1, 1, 1, 1, 0, 1, '2025-07-05 07:49:38.038504', '2025-07-05 15:25:58.515', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (45, '3.ทำการปิด อุกรณ์ ', 1, '20:00', 0, 1, 1, 1, 1, 1, 1, 1, '2025-07-05 06:36:06.203118', '2025-07-05 08:26:52.381614', 1);
INSERT INTO "public"."sd_iot_schedule" VALUES (47, '5.ทำการปิด อุกรณ์', 1, '14:00', 0, 1, 0, 1, 1, 1, 0, 1, '2025-07-05 08:25:32.243584', '2025-07-05 08:26:54.656508', 1);

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
  "sms_id" int4 NOT NULL DEFAULT nextval('sd_iot_sms_sms_id_seq'::regclass),
  "sms_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
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
-- Records of sd_iot_sms
-- ----------------------------

-- ----------------------------
-- Table structure for sd_iot_telegram
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_telegram";
CREATE TABLE "public"."sd_iot_telegram" (
  "telegram_id" int4 NOT NULL DEFAULT nextval('sd_iot_telegram_telegram_id_seq'::regclass),
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
INSERT INTO "public"."sd_user" VALUES ('c9497023-f370-4355-9162-f3f019b3534b', '2025-07-03 02:00:47.083775', '2025-07-10 23:49:57', NULL, 5, 'cmoniots@gmail.com', 'system', '$2b$10$Ik44gWlD99nCCpCTsgn6w.eEeb2he/w.yuyG8MRGTKCh2CyAIwqu.', 'Na@0955@#', NULL, NULL, NULL, NULL, NULL, '2025-07-10 23:49:57', 99, 1, NULL, NULL, 0, NULL, NULL, NULL, 'system', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NDk3MDIzLWYzNzAtNDM1NS05MTYyLWYzZjAxOWIzNTM0YiIsImlhdCI6MTc1MjE2NjE5NywiZXhwIjoxNzU0NzU4MTk3fQ.-y8U539lUCaXLTrA4wFK_MZpO37GSedjwVxIXtSt7j8', 0, 0, 0, 0, 0, NULL, NULL, NULL);
INSERT INTO "public"."sd_user" VALUES ('fb546a59-6ade-4e48-8428-d1511831898a', '2025-07-03 02:07:43.613094', '2025-07-07 09:21:53', NULL, 5, 'icmon@gmail.com', 'icmon', '$2b$10$9VsAf5kF/vfBu4WEeLmFtuCPp4Sgw9PVEN894Pg8ATSICIbsKWlLq', 'icmon', NULL, NULL, NULL, NULL, NULL, '2025-07-07 09:21:53', 99, 1, NULL, NULL, 0, NULL, NULL, NULL, 'system', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTQ2YTU5LTZhZGUtNGU0OC04NDI4LWQxNTExODMxODk4YSIsImlhdCI6MTc1MTg1NDkxMywiZXhwIjoxNzU0NDQ2OTEzfQ.0fG40MgsVvmbzDHEFn7A1NtzUc56n2mw374AjCLCbeY', 0, 0, 0, 0, 0, NULL, NULL, NULL);
INSERT INTO "public"."sd_user" VALUES ('d95b5588-3880-4f05-b661-6a111c860c5e', '2025-07-03 02:11:07.414441', '2025-07-03 02:11:07.573178', NULL, 4, 'icmons@gmail.com', 'icmons', '$2b$10$zJ8sWNiN7iQWDTGA9ro1b.ghE57Wcjd7MDKpzlWj/M.mXmLqIOsdu', 'icmons', NULL, NULL, NULL, NULL, NULL, '2025-07-03 02:11:07.414441', 1, 1, NULL, NULL, 0, NULL, NULL, NULL, 'Register', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5NWI1NTg4LTM4ODAtNGYwNS1iNjYxLTZhMTExYzg2MGM1ZSIsImlhdCI6MTc1MTUwODY2NywiZXhwIjoxNzU0MTAwNjY3fQ.ZKDo7s4DTa6aT6Mz-vpQn3tMYR36-a4lk-Jz_Vyyv5w', 0, 0, 0, 0, 0, NULL, NULL, NULL);
INSERT INTO "public"."sd_user" VALUES ('e6f44f6a-070d-4d86-a6ff-00b0cdb2ac75', '2025-07-03 02:12:27.30362', '2025-07-03 02:12:27.430973', NULL, 4, 'kongnakornna@gmail.com', 'kongnakornna', '$2b$10$GJJgY7NY/dZq3GLlRc0RxOHvVWCrXBCfMRRVfZVgUWSzdxahz8TA2', 'Na@0955@#', NULL, NULL, NULL, NULL, NULL, '2025-07-03 02:12:27.30362', 1, 1, NULL, NULL, 0, NULL, NULL, NULL, 'Register', NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2ZjQ0ZjZhLTA3MGQtNGQ4Ni1hNmZmLTAwYjBjZGIyYWM3NSIsImlhdCI6MTc1MTUwODc0NywiZXhwIjoxNzU0MTAwNzQ3fQ.gWHJec6WJdgBEhFpBWxiJWo-HCqwaaQ1xrAiwio4wD8', 0, 0, 0, 0, 0, NULL, NULL, NULL);

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
SELECT setval('"public"."sd_iot_device_action_device_action_user_id_seq"', 1, false);

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
SELECT setval('"public"."sd_iot_device_alarm_action_alarm_action_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_device_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq1"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq2"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq2"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_type_type_id_seq"
OWNED BY "public"."sd_iot_device_type"."type_id";
SELECT setval('"public"."sd_iot_device_type_type_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_email_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_email_email_id_seq1"
OWNED BY "public"."sd_iot_email"."email_id";
SELECT setval('"public"."sd_iot_email_email_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_host_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_email_host_id_seq1"
OWNED BY "public"."sd_iot_email"."host_id";
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
SELECT setval('"public"."sd_iot_location_location_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_location_location_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq"', 159, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq2"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq2"', 41, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_nodered_nodered_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_schedule_schedule_id_seq"', 47, true);

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
SELECT setval('"public"."sd_iot_type_type_id_seq"', 1, false);

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
-- Primary Key structure for table sd_device_log
-- ----------------------------
ALTER TABLE "public"."sd_device_log" ADD CONSTRAINT "PK_da44052006daebc229cb1a64d27" PRIMARY KEY ("id", "type_id", "sensor_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_api
-- ----------------------------
ALTER TABLE "public"."sd_iot_api" ADD CONSTRAINT "PK_f5a38da6c7393c8189d8aecba78" PRIMARY KEY ("api_id");

-- ----------------------------
-- Auto increment value for sd_iot_device
-- ----------------------------
SELECT setval('"public"."sd_iot_device_device_id_seq2"', 7, true);

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
-- Primary Key structure for table sd_iot_device_copy1
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_copy1" ADD CONSTRAINT "sd_iot_device_copy1_pkey" PRIMARY KEY ("device_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_copy2
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_copy2" ADD CONSTRAINT "sd_iot_device_copy2_pkey" PRIMARY KEY ("device_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_type
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_type" ADD CONSTRAINT "PK_f89dccdad875b086b9167167bb9" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_email
-- ----------------------------
ALTER TABLE "public"."sd_iot_email" ADD CONSTRAINT "PK_8f596e0a8892dde3c7fd3218836" PRIMARY KEY ("email_id", "host_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_group
-- ----------------------------
ALTER TABLE "public"."sd_iot_group" ADD CONSTRAINT "PK_b0ae5d1b99f0d240d56dc942b7a" PRIMARY KEY ("group_id");

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
