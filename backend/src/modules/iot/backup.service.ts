import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
const BackupManager = require('influx-backup');
/** InfluxDB v2 URL */
const InfluxDB_url = process.env.INFLUX_URL;
/** InfluxDB authorization token */
const InfluxDB_token =
  process.env.INFLUX_TOKEN;
/** Organization within InfluxDB  */
const InfluxDB_org = process.env.INFLUX_ORG || 'cmon_org';
/**InfluxDB bucket used in examples  */
const InfluxDB_bucket = process.env.INFLUX_BUCKET || 'cmon_bucket';
// ONLY onboarding example
/**InfluxDB user  */
const InfluxDB_username = process.env.INFLUXDB_USERNAME || 'admin';
/**InfluxDB password  */
const InfluxDB_password = process.env.INFLUXDB_PASSWORD || 'Na@0955@#@#';
console.log(
  '===============================influxdb Client Start=============================================================',
);
@Injectable()
export class BackupService {
  private manager = new BackupManager({ db: InfluxDB_org });

  @Cron('0 0 * * *') // Every day at midnight
  async handleBackup() {
    try {
      await this.manager.backup();
      console.log('InfluxDB backup completed.');
    } catch (error) {
      console.error('InfluxDB backup failed:', error);
    }
  }
}
