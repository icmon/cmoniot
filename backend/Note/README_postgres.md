
```bash 


https://medium.com/@mikess_dev/creating-a-nest-js-project-with-sequelize-and-sqlite-870d29908a8c

npm install @nestjs/sequelize sequelize sqlite3


# Search: docker backup and restore sql postgresql
# docker backup and restore sql postgresql command line

-  docker ps
- docker exec -t <container_name> pg_dump -U <username> <database_name> > backup.sql

CONTAINER ID   IMAGE                          COMMAND                  CREATED       STATUS                 PORTS                                                      NAMES
232ad039df3a   demet-webserver                "httpd-foreground"       9 days ago    Up 39 minutes          0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp                   demet-webserver
3db889e162d1   demet-php                      "docker-php-entrypoi…"   9 days ago    Up 6 hours             9000/tcp                                                   demet-php
21da262bd30e   iot-node-red-service           "./entrypoint.sh"        9 days ago    Up 6 hours (healthy)   1881/tcp, 0.0.0.0:1881->1880/tcp                           iot-node-red-service-1
49202e021ef8   postgres:15-alpine             "docker-entrypoint.s…"   11 days ago   Up 7 minutes           5434/tcp, 0.0.0.0:5434->5432/tcp                           docker.postgres
cf5ad6b69317   redis:6.2-alpine               "docker-entrypoint.s…"   11 days ago   Up 7 minutes           6379/tcp, 0.0.0.0:6380->6380/tcp                           redis
f9a5f3ec8a08   eclipse-mosquitto:latest       "/docker-entrypoint.…"   2 weeks ago   Up 6 hours             1884/tcp, 0.0.0.0:9001->9001/tcp, 0.0.0.0:1884->1883/tcp   mosquitto
17a83f8a7ab6   fabianlee/my-mongoclient:3.9   "/bin/sleep 1d"          2 weeks ago   Up 6 hours                                                                        cmon-mongoclient
0bc81428bd85   mongo:4.2.3-bionic             "docker-entrypoint.s…"   2 weeks ago   Up 6 hours             27018/tcp, 0.0.0.0:27018->27017/tcp                        cmon-mongodb
372555a31f3c   grafana/grafana                "/run.sh"                2 weeks ago   Up 6 hours             3008/tcp, 0.0.0.0:3008->3000/tcp                           grafana
0e134486e3af   influxdb:latest                "/entrypoint.sh infl…"   2 weeks ago   Up 6 hours             0.0.0.0:8086->8086/tcp                                     influxdb

# PostgreSQL
DATABASE_HOST=postgres
DATABASE_NAME=nest_cmon
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_PORT=5434 

 - cd backend

docker ps
docker ps -a -s
# Backup  a Plain SQL File (.sql)
- docker exec -t <container_name> pg_dump -U <username> <database_name> > backup.sql
- docker exec -t docker.postgres pg_dump -U postgres nest_cmon > public/backup.sql
- docker exec -t docker.postgres pg_dump -U postgres nest_cmon > public/backup_cmon.sql
# Restore from a Plain SQL File (.sql)
- docker exec -i <container_name> psql -U <username> <database_name> < backup.sql
- docker exec -i docker.postgres psql -U  postgres nest_cmon< backup.sql
- docker exec -i docker.postgres psql -U  postgres nest_cmon< backup_cmon.sql

-- docker exec -t docker.postgres pg_dump -U postgres nest_cmon > public/backup.sql
-- docker exec -i docker.postgres psql -U  postgres nest_cmon< backup.sql

cd public
 E:\cmonproject\backend\public> 
 PS E:\cmonproject\backend\public> ls  
docker cp backup.sql docker.postgres:/tmp/backup.sql
# Successfully copied 84.5kB to docker.postgres:/tmp/backup.sql
- 
# TEST
-  cd public
-- Backup 
-  docker exec -t docker.postgres pg_dump -U postgres nest_cmon > backup_20250614.sql
-- Restore
-  docker cp backup_20250614.sql docker.postgres:/tmp/backup_20250614.sql
 # Successfully copied 84.5kB to docker.postgres:/tmp/backup_20250614.sql
# https://medium.com/@wkasunsampath/setup-mqtt-in-a-nest-js-app-using-docker-b4c10b4c2eba
# https://medium.com/widle-studio/mastering-microservices-in-nest-js-eb143a6b9639
# https://dev.to/techjayvee/1-building-a-project-setup-for-microservices-with-nestjs-and-mongodb-2161
# MQTT microservice server and client with same ClientID
# nestjs-mqtt-broker


docker-compose up --build
docker-compose build
docker-compose up -d



SELECT               
  pg_attribute.attname, 
  format_type(pg_attribute.atttypid, pg_attribute.atttypmod) 
FROM pg_index, pg_class, pg_attribute, pg_namespace 
WHERE 
  indrelid = pg_class.oid AND 
  nspname = 'public' AND 
  pg_class.relnamespace = pg_namespace.oid AND 
  pg_attribute.attrelid = pg_class.oid AND 
  pg_attribute.attnum = any(pg_index.indkey)
 AND indisprimary


```
 

*/