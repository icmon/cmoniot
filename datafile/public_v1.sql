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

 Date: 10/07/2025 02:59:38
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
