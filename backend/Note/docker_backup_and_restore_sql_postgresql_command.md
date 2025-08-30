<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# docker backup and restore sql postgresql command line

You can back up and restore a PostgreSQL database running in a Docker container using command-line tools like `pg_dump`, `pg_dumpall`, `psql`, and `pg_restore` executed via `docker exec`.

### Backing Up a PostgreSQL Database

To create a backup, you first need the name of your running PostgreSQL container, which you can find by listing all active containers [^1_1].

```bash
docker ps
```

Once you have the container name, you can use one of the following methods to create a backup file.

**Back Up a Single Database**
The `pg_dump` utility creates a backup of a single database. This command executes `pg_dump` inside the specified container and saves the output to a `backup.sql` file on your local machine [^1_2].

```bash
docker exec -t <container_name> pg_dump -U <username> <database_name> > backup.sql
```

**Back Up with Compression**
To save space, you can compress the backup file using `gzip`. The output of `pg_dump` is piped to `gzip`, which compresses it before saving [^1_3].

```bash
docker exec -i <container_name> /usr/bin/pg_dump -U <username> <database_name> | gzip -9 > backup.sql.gz
```

**Handling Passwords**
If your database requires a password, you can securely provide it using an environment variable within the `docker exec` command [^1_3].

```bash
docker exec -i -e PGPASSWORD=<password> <container_name> /usr/bin/pg_dump -U <username> <database_name> > backup.sql
```

**Back Up All Databases**
To back up all PostgreSQL databases in the container at once, use the `pg_dumpall` utility [^1_3].

```bash
docker exec -i <container_name> /usr/bin/pg_dumpall -U <username> > all_databases_backup.sql
```


### Restoring a PostgreSQL Database

Restoring a database involves piping a backup file into the container's `psql` tool or using `pg_restore` for custom-format archives. Ensure the target database exists before restoring; you may need to create it first [^1_2].

```bash
docker exec -it <container_name> psql -U <username> -c "CREATE DATABASE <database_name>;"
```

**Restore from a Plain SQL File (`.sql`)**
You can restore a database from a `.sql` file by piping its contents to the `psql` command running inside the container [^1_4][^1_2].

```bash
cat backup.sql | docker exec -i <container_name> psql -U <username> -d <database_name>
```

Alternatively, you can use this syntax [^1_5][^1_2]:

```bash
docker exec -i <container_name> psql -U <username> <database_name> < backup.sql
```

**Restore from a Custom Format Backup (`.dump`)**
If your backup was created with `pg_dump -F c` or `pg_dump -F t`, you must use `pg_restore`. This requires making the dump file accessible inside the container.

1. **Copy the backup file into the container**: Use `docker cp` to transfer the file to a directory inside the container, such as `/tmp` or a dedicated backups volume [^1_6].

```bash
docker cp your_backup.dump <container_name>:/tmp/your_backup.dump
```

2. **Run `pg_restore`**: Execute `pg_restore` from within the container to restore the database from the file you just copied [^1_6].

```bash
docker exec -i <container_name> pg_restore -U <username> -d <database_name> /tmp/your_backup.dump
```


**Restore Using a Temporary Container**
A clean way to restore is to run a temporary container that connects to your database's volume and network. This method is useful for avoiding conflicts and ensuring a clean state [^1_7]. Stop your primary application container before proceeding [^1_7].

```bash
docker run --rm --network <your_docker_network> \
-v <your_postgres_data_volume>:/var/lib/postgresql/data \
-v $(pwd)/backups:/backups \
-e PGPASSWORD=<password> \
postgres:16 \
sh -c 'pg_restore -c -h <container_name> -U <username> -d <database_name> -v /backups/your_backup.dump'
```

* The `-c` flag instructs `pg_restore` to clean (drop) existing database objects before recreating them [^1_7].

<div style="text-align: center">⁂</div>

[^1_1]: https://peturgeorgievv.com/blog/how-to-dump-and-restore-postgresql-database-with-docker-full-example

[^1_2]: https://sqlbak.com/blog/how-to-backup-and-restore-docker-containers-and-volumes/

[^1_3]: https://simplebackups.com/blog/docker-postgres-backup-restore-guide-with-examples

[^1_4]: https://stackoverflow.com/questions/24718706/backup-restore-a-dockerized-postgresql-database

[^1_5]: https://www.reddit.com/r/PostgreSQL/comments/pr2ivw/how_do_you_restore_from_pg_dump_psql_backup_in/

[^1_6]: https://bobcares.com/blog/docker-postgres-pg_restore/

[^1_7]: https://github.com/thingsboard/tbmq/blob/main/docker/backup-restore/README.md

[^1_8]: https://dev.to/mdarifulhaque/how-to-backup-a-postgresql-database-in-docker-step-by-step-guide-cp2

[^1_9]: https://stackoverflow.com/questions/30171063/how-to-generate-a-postgresql-dump-from-a-docker-container

[^1_10]: https://www.youtube.com/watch?v=l46yS2G4kkg

[^1_11]: https://forums.docker.com/t/docker-postgres-unable-to-backup-database/82221

[^1_12]: https://www.reddit.com/r/docker/comments/kf3cic/how_can_i_backup_postgresql_database_from_a/

[^1_13]: https://github.com/kartoza/docker-pg-backup

[^1_14]: https://hackernoon.com/how-to-securely-backup-your-postgres-database-with-docker-and-cron

[^1_15]: https://akashrajpurohit.com/blog/safely-backup-postgresql-database-in-docker-podman-containers/

[^1_16]: https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/

[^1_17]: https://www.jetbrains.com/help/space/backup-and-restore-for-docker-compose-installation.html

[^1_18]: https://mydeveloperplanet.com/2023/05/10/how-to-backup-and-restore-a-postgresql-database/


---

# docker backup and restore sql postgresql command line  ยกต้อย่าง จาก file backup.sql

แน่นอนครับ นี่คือตัวอย่างคำสั่งสำหรับสำรอง (backup) และกู้คืน (restore) ฐานข้อมูล PostgreSQL ที่ทำงานบน Docker โดยใช้ไฟล์ `backup.sql` ผ่าน command line

### การสำรองข้อมูล (Backup) จากฐานข้อมูลเป็นไฟล์ `backup.sql`

คุณสามารถใช้คำสั่ง `docker exec` เพื่อรัน `pg_dump` ภายในคอนเทนเนอร์ PostgreSQL และบันทึกผลลัพธ์ลงในไฟล์ `backup.sql` บนเครื่องคอมพิวเตอร์ของคุณ[^2_5].

**คำสั่ง:**

```bash
docker exec -t <ชื่อคอนเทนเนอร์> pg_dump -U <ชื่อผู้ใช้> <ชื่อฐานข้อมูล> > backup.sql
```

**ตัวอย่าง:**
หากคอนเทนเนอร์ของคุณชื่อ `my-postgres-container`, ผู้ใช้คือ `postgres`, และฐานข้อมูลชื่อ `webapp_db`, คำสั่งจะเป็นดังนี้:

```bash
docker exec -t my-postgres-container pg_dump -U postgres webapp_db > backup.sql
```

คำสั่งนี้จะสร้างไฟล์ `backup.sql` ในไดเรกทอรีที่คุณรันคำสั่งอยู่[^2_5].

### การกู้คืนข้อมูล (Restore) จากไฟล์ `backup.sql`

การกู้คืนข้อมูลจากไฟล์ `.sql` จะใช้คำสั่ง `psql` โดยส่งเนื้อหาของไฟล์ `backup.sql` เข้าไปยังคอนเทนเนอร์[^2_1][^2_6].

**ขั้นตอนการกู้คืน:**

1. **(ถ้าจำเป็น) สร้างฐานข้อมูลเปล่า:** หากคุณกู้คืนข้อมูลไปยังคอนเทนเนอร์ใหม่หรือคอนเทนเนอร์ที่ยังไม่มีฐานข้อมูลเป้าหมาย คุณต้องสร้างฐานข้อมูลเปล่าขึ้นมาก่อน[^2_5].

```bash
docker exec -it <ชื่อคอนเทนเนอร์> psql -U <ชื่อผู้ใช้> -c "CREATE DATABASE <ชื่อฐานข้อมูล>;"
```

2. **นำเข้าข้อมูล:** ใช้คำสั่ง `docker exec` เพื่อรัน `psql` และนำเข้าข้อมูลจากไฟล์ `backup.sql`[^2_5][^2_6].

```bash
docker exec -i <ชื่อคอนเทนเนอร์> psql -U <ชื่อผู้ใช้> -d <ชื่อฐานข้อมูล> < backup.sql
```


**ตัวอย่าง:**
สมมติว่าคุณต้องการกู้คืนข้อมูลจากไฟล์ `backup.sql` ไปยังคอนเทนเนอร์ `my-postgres-container` โดยใช้ผู้ใช้ `postgres` และฐานข้อมูล `webapp_db`:

1. **สร้างฐานข้อมูล (หากยังไม่มี):**

```bash
docker exec -it my-postgres-container psql -U postgres -c "CREATE DATABASE webapp_db;"
```

2. **กู้คืนข้อมูล:**

```bash
docker exec -i my-postgres-container psql -U postgres -d webapp_db < backup.sql
```


อีกวิธีที่ให้ผลลัพธ์เหมือนกันคือการใช้คำสั่ง `cat` เพื่ออ่านไฟล์แล้วส่งต่อไปยัง `docker exec`[^2_1]:

```bash
cat backup.sql | docker exec -i <ชื่อคอนเทนเนอร์> psql -U <ชื่อผู้ใช้> -d <ชื่อฐานข้อมูล>
```

<div style="text-align: center">⁂</div>

[^2_1]: https://stackoverflow.com/questions/24718706/backup-restore-a-dockerized-postgresql-database

[^2_2]: https://simplebackups.com/blog/docker-postgres-backup-restore-guide-with-examples

[^2_3]: https://t3rcio.com.br/en/restoring-a-sql-file-to-a-dockerized-postgresql-server/

[^2_4]: https://forums.docker.com/t/docker-postgres-unable-to-backup-database/82221

[^2_5]: https://sqlbak.com/blog/how-to-backup-and-restore-docker-containers-and-volumes/

[^2_6]: https://www.reddit.com/r/PostgreSQL/comments/pr2ivw/how_do_you_restore_from_pg_dump_psql_backup_in/

[^2_7]: https://peturgeorgievv.com/blog/how-to-dump-and-restore-postgresql-database-with-docker-full-example


---

# PS E:\cmonproject\backend\public> docker exec -i docker.postgres psql -U postgres -d nest_cmon < backup.sql

ParserError:
Line |
1 |  … ocker exec -i docker.postgres psql -U postgres -d nest_cmon < backup. …
|                                                                ~
| The '<' operator is reserved for future use.

เกิดข้อผิดพลาด `ParserError: The '<' operator is reserved for future use` เนื่องจากคุณกำลังรันคำสั่งใน **PowerShell (PS)** ของ Windows ซึ่งไม่รองรับการใช้ตัวดำเนินการ `<` (input redirection) ในลักษณะเดียวกับที่ใช้ใน `bash` หรือ Command Prompt (cmd) ของระบบปฏิบัติการอื่น.

PowerShell มีวิธีจัดการกับการส่งข้อมูล (piping) ที่แตกต่างออกไปครับ

คุณสามารถแก้ไขปัญหานี้ได้ 2 วิธีหลักๆ ดังนี้ครับ

### วิธีที่ 1: ใช้ `Get-Content` และ Pipe (`|`) ใน PowerShell

นี่เป็นวิธีที่ตรงไปตรงมาที่สุดในการแปลงคำสั่งเดิมของคุณให้ทำงานบน PowerShell ได้ โดยใช้ `Get-Content` (หรือ `cat` ซึ่งเป็น alias) เพื่ออ่านเนื้อหาไฟล์ แล้วส่งต่อไปยัง `docker exec` ผ่าน pipe (`|`).

**คำสั่งที่แก้ไขแล้ว:**

```powershell
Get-Content backup.sql | docker exec -i docker.postgres psql -U postgres -d nest_cmon
```

หรือใช้ `cat` ซึ่งสั้นกว่า:

```powershell
cat backup.sql | docker exec -i docker.postgres psql -U postgres -d nest_cmon
```

**คำอธิบาย:**

* `Get-Content backup.sql` (หรือ `cat backup.sql`) จะอ่านเนื้อหาทั้งหมดจากไฟล์ `backup.sql`[^3_8].
* เครื่องหมาย `|` (pipe) จะส่งผลลัพธ์ (เนื้อหาไฟล์) จากคำสั่งแรกไปยัง Standard Input (stdin) ของคำสั่งถัดไป.
* `docker exec -i ...` รับข้อมูลที่ส่งมาผ่าน pipe (`-i` หรือ `--interactive` เป็นสิ่งสำคัญเพื่อให้ stdin เปิดรับข้อมูล) และส่งต่อไปยัง `psql` ภายในคอนเทนเนอร์[^3_5][^3_9].

---

### วิธีที่ 2: คัดลอกไฟล์เข้าไปในคอนเทนเนอร์ก่อน (Docker CP)

วิธีนี้เป็นวิธีที่เสถียรและแนะนำสำหรับไฟล์ขนาดใหญ่หรือเมื่อต้องการความแน่นอนสูง เพราะเป็นการหลีกเลี่ยงความซับซ้อนของ shell แต่ละประเภท[^3_2].

**ขั้นตอนที่ 1: คัดลอกไฟล์ `backup.sql` เข้าไปในคอนเทนเนอร์**
ใช้คำสั่ง `docker cp` เพื่อคัดลอกไฟล์จากเครื่องของคุณไปยังไดเรกทอรีชั่วคราว (เช่น `/tmp`) ภายในคอนเทนเนอร์.

```powershell
docker cp backup.sql docker.postgres:/tmp/backup.sql
```

**ขั้นตอนที่ 2: สั่งให้ `psql` ทำงานกับไฟล์ภายในคอนเทนเนอร์**
ใช้ `docker exec` เพื่อสั่งให้ `psql` อ่านไฟล์จาก path ที่คุณคัดลอกเข้าไป โดยใช้แฟล็ก `-f`.

```powershell
docker exec -i docker.postgres psql -U postgres -d nest_cmon -f /tmp/backup.sql
```

* แฟล็ก `-f <file>` เป็นคำสั่งของ `psql` โดยตรงที่บอกให้รันคำสั่งจากไฟล์ที่ระบุ[^3_6][^3_11].


### สรุปและเปรียบเทียบ

| วิธีการ | คำสั่งตัวอย่าง (ใน PowerShell) | ข้อดี / ข้อสังเกต |
| :-- | :-- | :-- |
| **ใช้ Pipe** | `cat backup.sql \| docker exec -i docker.postgres psql -U postgres -d nest_cmon` | - รวดเร็ว จบในบรรทัดเดียว<br>- เหมาะกับงานทั่วไปและไฟล์ไม่ใหญ่มาก |
| **ใช้ Docker CP** | `docker cp backup.sql docker.postgres:/tmp/backup.sql`<br>`docker exec -i docker.postgres psql -U postgres -d nest_cmon -f /tmp/backup.sql` | - มีความเสถียรสูง ไม่ขึ้นกับ shell<br>- เหมาะสำหรับไฟล์ขนาดใหญ่มาก<br>- เป็น 2 ขั้นตอน และสร้างไฟล์ชั่วคราวในคอนเทนเนอร์ |

<div style="text-align: center">⁂</div>

[^3_1]: https://stackoverflow.com/questions/31438112/bash-docker-exec-file-redirection-from-inside-a-container

[^3_2]: https://www.warp.dev/terminus/docker-postgres-container

[^3_3]: https://www.digitalocean.com/community/tutorials/how-to-use-docker-exec-to-run-commands-in-a-docker-container

[^3_4]: https://forums.docker.com/t/how-can-i-run-command-into-container/119266

[^3_5]: https://github.com/philss/til/blob/master/docker/sending-data-through-stdin.md

[^3_6]: https://www.warp.dev/terminus/how-to-run-a-psql-file-with-psql

[^3_7]: https://tapoueh.org/blog/2017/12/mastering-postgresql-more-about-the-docker-image/

[^3_8]: https://dev.to/codewithcats/docker-compose-exec-using-stdin-as-an-input-46lh

[^3_9]: https://inedo.com/support/kb/1145/accessing-a-postgresql-database-in-a-docker-container

[^3_10]: https://stackoverflow.com/questions/55344792/hiding-docker-exec-output-of-a-postgres-query

[^3_11]: https://martinheinz.dev/blog/3

[^3_12]: https://docs.docker.com/reference/dockerfile/

[^3_13]: https://dba.stackexchange.com/questions/232101/connecting-to-postgres-running-inside-docker-container-posgres-does-not-exist

[^3_14]: https://betterprogramming.pub/connect-from-local-machine-to-postgresql-docker-container-f785f00461a7?gi=658c43489042

[^3_15]: https://dba.stackexchange.com/questions/148618/running-psql-postgres-client-in-an-ephemeral-mode-in-a-container


---

# ERROR:  multiple primary keys for table "sd_iot_type" are not allowed

ERROR:  multiple primary keys for table "sd_iot_schedule" are not allowed
ERROR:  multiple primary keys for table "sd_user_log_type" are not allowed
ERROR:  multiple primary keys for table "sd_user_roles_permision" are not allowed
ERROR:  multiple primary keys for table "sd_iot_nodered" are not allowed
ERROR:  multiple primary keys for table "sd_iot_sensor" are not allowed
ERROR:  multiple primary keys for table "sd_iot_line" are not allowed
ERROR:  multiple primary keys for table "sd_iot_mqtt" are not allowed
ERROR:  multiple primary keys for table "sd_iot_device" are not allowed
ERROR:  multiple primary keys for table "sd_user_log" are not allowed
ERROR:  multiple primary keys for table "sd_iot_email" are not allowed
ERROR:  multiple primary keys for table "sd_user_access_menu" are not allowed
ERROR:  multiple primary keys for table "sd_iot_group" are not allowed
ERROR:  multiple primary keys for table "sd_user_file" are not allowed
ERROR:  multiple primary keys for table "sd_iot_token" are not allowed
ERROR:  multiple primary keys for table "sd_iot_location" are not allowed
ERROR:  multiple primary keys for table "sd_user" are not allowed
ERROR:  multiple primary keys for table "sd_user_role" are not allowed
ERROR:  multiple primary keys for table "sd_iot_influxdb" are not allowed
ERROR:  multiple primary keys for table "sd_device_log" are not allowed
ERROR:  multiple primary keys for table "sd_admin_access_menu" are not allowed
ERROR:  multiple primary keys for table "sd_user_roles_access" are not allowed
ERROR:  multiple primary keys for table "sd_iot_sms" are not allowed
ERROR:  multiple primary keys for table "sd_iot_api" are not allowed
ERROR:  multiple primary keys for table "sd_iot_setting" are not allowed แก้ยังไง

ข้อผิดพลาด `ERROR: multiple primary keys for table "..." are not allowed` ที่เกิดขึ้นกับหลายตารางพร้อมกัน เป็นสัญญาณที่ชัดเจนว่าคุณกำลังพยายามกู้คืน (restore) ข้อมูลลงในฐานข้อมูลที่**ไม่ใช่ฐานข้อมูลเปล่า**ครับ

สาเหตุหลักคือ ฐานข้อมูลเป้าหมาย (`nest_cmon`) ของคุณมีตารางและโครงสร้าง (Schema) เหล่านั้นอยู่แล้ว ซึ่งน่าจะถูกสร้างขึ้นโดย ORM (Object-Relational Mapping) จากเฟรมเวิร์ก NestJS ที่คุณใช้งานอยู่[^4_1][^4_2]. เมื่อคุณรันคำสั่ง restore ไฟล์ `backup.sql` ซึ่งภายในไฟล์ก็มีคำสั่ง `CREATE TABLE` และ `ALTER TABLE ... ADD CONSTRAINT ... PRIMARY KEY` อยู่ด้วย มันจึงพยายามสร้างตารางและ Primary Key ซ้ำซ้อนลงไปบนตารางที่มีอยู่แล้ว ทำให้ PostgreSQL แจ้งข้อผิดพลาดดังกล่าว

### วิธีแก้ไข (วิธีที่แนะนำที่สุด)

วิธีที่ปลอดภัยและตรงไปตรงมาที่สุดคือการ **ล้างฐานข้อมูลเดิมทิ้งก่อน แล้วสร้างขึ้นมาใหม่ให้เป็นฐานข้อมูลที่ว่างเปล่า** จากนั้นจึงทำการ restore ข้อมูลเข้าไปครับ

ทำตามขั้นตอนต่อไปนี้:

**ขั้นตอนที่ 1: เข้าไปยัง psql ของคอนเทนเนอร์**

```powershell
docker exec -it docker.postgres psql -U postgres
```

**ขั้นตอนที่ 2: ลบฐานข้อมูลเดิม (DROP DATABASE)**
เมื่อเข้ามาใน `psql` แล้ว (prompt จะเปลี่ยนเป็น `postgres=#`) ให้รันคำสั่งนี้เพื่อลบฐานข้อมูล `nest_cmon` ที่มีปัญหาทิ้งไป
> **คำเตือน:** คำสั่งนี้จะลบข้อมูลทั้งหมดใน `nest_cmon` อย่างถาวร โปรดแน่ใจว่าคุณมีไฟล์ `backup.sql` ที่สมบูรณ์แล้ว

```sql
DROP DATABASE nest_cmon;
```

**ขั้นตอนที่ 3: สร้างฐานข้อมูลขึ้นมาใหม่ (CREATE DATABASE)**
สร้างฐานข้อมูลที่ว่างเปล่าด้วยชื่อเดิม

```sql
CREATE DATABASE nest_cmon;
```

**ขั้นตอนที่ 4: ออกจาก psql**
พิมพ์ `\q` แล้วกด Enter เพื่อออกจาก psql interactive shell

```sql
\q
```

**ขั้นตอนที่ 5: ทำการ Restore อีกครั้ง**
ตอนนี้ฐานข้อมูล `nest_cmon` ของคุณว่างเปล่าแล้ว ให้รันคำสั่ง restore ที่คุณใช้ใน PowerShell อีกครั้ง (แนะนำให้ใช้วิธี `Get-Content` เพื่อความเข้ากันได้กับ PowerShell)

```powershell
Get-Content backup.sql | docker exec -i docker.postgres psql -U postgres -d nest_cmon
```

เมื่อทำตามขั้นตอนนี้ การ restore ควรจะสำเร็จโดยไม่มีข้อผิดพลาด เพราะคำสั่ง `CREATE TABLE` และการกำหนด Primary Key ในไฟล์ `backup.sql` จะทำงานบนฐานข้อมูลที่ว่างเปล่า

---

### วิธีแก้ไขทางเลือก (สำหรับอนาคต)

เพื่อหลีกเลี่ยงปัญหานี้ในอนาคต แนะนำให้เปลี่ยนวิธีการสำรองข้อมูลจากการใช้ไฟล์ `.sql` ธรรมดา ไปใช้ Custom Format (`.dump`) ของ `pg_dump` ซึ่งจะยืดหยุ่นกว่ามาก

**1. การ Backup ด้วย Custom Format:**
ใช้แฟล็ก `-Fc` (Custom format, compressed) ตอน backup

```powershell
docker exec -t docker.postgres pg_dump -U postgres -d nest_cmon -Fc > backup.dump
```

**2. การ Restore ด้วย `pg_restore`:**
เมื่อต้องการ restore ให้ใช้ `pg_restore` พร้อมกับแฟล็ก `--clean` (หรือ `-c`) ซึ่งจะสั่งให้ `pg_restore` ลบ object เก่า (เช่น ตาราง, index) ทิ้งไปก่อนที่จะสร้างขึ้นมาใหม่โดยอัตโนมัติ ทำให้ไม่ต้องลบฐานข้อมูลทั้งลูกด้วยตนเอง

```powershell
# คัดลอกไฟล์ .dump เข้าไปใน container ก่อน
docker cp backup.dump docker.postgres:/tmp/backup.dump

# สั่ง restore ด้วย pg_restore พร้อมแฟล็ก --clean
docker exec -i docker.postgres pg_restore -U postgres -d nest_cmon --clean /tmp/backup.dump
```

วิธีนี้เป็นวิธีที่เป็นมาตรฐานและปลอดภัยกว่าสำหรับการจัดการ database migration และ restore ที่ซับซ้อนครับ

<div style="text-align: center">⁂</div>

[^4_1]: programming.database_orm

[^4_2]: programming.nestjs

