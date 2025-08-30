 
## Docker

```bash
# รวม Docker command line พื้นฐาน

OS เป็น Windows

** โดย Default Docker จะเห็น Folder เฉพาะใน ~/Users/<YOUR_NAME>/
OS อื่น ผมไม่แน่ใจนะครับ
มันจะมีปัญหาตอน Mount Volume แล้วมันจะไม่เจอนะ

<!- — Docker command line พื้นฐาน — ->
พวก Container ID, Image ID ระบุแค่ 3 ตัวแรกได้นะมัน Unique

docker login

ถ้าเราจะ Push images ขึ้น Docker Registry จำเป็นต้อง login ก่อนนะ 
docker login //ท่านี้เดี๋ยวมันจะถ้า username, password เราทีหลัง
docker login -u saspallow -p password //หรือสามารถกำหนดได้เลย
docker login -u //หรือเดี๋ยวค่อยใส่ password ก็ได้นะ
docker logout

docker logout //อันนี้ก็คือการ Logout นั้นเองมันจะไปลบ Credentials ในเครื่องเรา
docker-machine

//ไว้สำหรับเราเข้าไปจัดการ Docker hosts ของเรา
docker-machine ssh default // default สามารถเปลี่ยนไปได้ตามชื่อ hosts นั้นๆ
docker-machine start default
docker-machine restart default

docker images

docker images //โชว์ images ในเครื่องเรามี images อะไรบ้าง
docker images --no-trunc //โชว์ Images ID แบบเต็มๆยาวพรืด
docker search <IMAGE>

docker search ubuntu //ค้นหา images จาก Docker registry
docker pull <image name>

//เลือก Docker image ได้ที่นี่
docker pull ubuntu //ดึง images ที่เราระบุลงมาไว้ในเครื่อง
docker run

docker run -d -it --name mysql \
-h mysql \
-e MYSQL_ROOT_PASSWORD=password \
-p 3306:3306 \
-v /your_path/mysql:/var/lib/mysql
docker run -p 80:80 -d --name nginx -h nginx nginx
ตอนเราสั่ง Run สามารถใส่ parameter ได้เยอะแยะเลย
-d //เหมือนเรา เวฟข้าวเซเว่น ไว้แล้วเสร็จเดี๋ยวเราค่อยมากินมัน
-h //กำหนดชื่อ Container name ถ้าไม่ระบุมันจะตั้งชื่อ เท่ๆ มาให้เราเอง
-e //กำหนด Environment ของ Container ต้องดูว่าแต่ล่ะ images มีอะไรให้เราเซ็ตบ้าง
-p //กำหนด ports ที่จะให้ Client คุยกับ Docker hosts
-v //Mount Volume จากใน Container(/var/lib/mysql) บอกว่าให้มาอ่านที่นี้นะ(your_path)
docker ps

docker ps //โชว์ container ที่กำลังทำงานในเครื่องเรา
docker ps -a -s //โชว์ container ทั้งหมดทั้งที่กำลังทำงาน และ ไม่ได้ทำงานอยู่
docker ps <CONTAINER_ID> 
//โชว์ container โดยการระบุ conatiner id หรือ host name
 -s // โชว์ Size Container
docker cp

- copy file from host to container
docker cp /my_file.txt:/usr/local/
- copy file from container to host
docker cp <containerId>:/file/path/within/container /host/path/target
docker rm

docker rm <CONTAINER_ID> 
//ลบ container ที่ระบุ, running อยู่ไม่ได้นะจ๊ะ ไม่งั้นมันจะบ่นเรา ให้ไป stop ซ่ะ หรือ
docker rm -f // บังคับลบมันสะเลย ฮิฮิ
docker rmi <IMAGE_ID>

docker rmi <IMAGE_ID> 
//ลบ docker images, ถ้ามี container ไหนใช้งานอยู่ไม่สามารถลบได้น๊า
docker start <CONTAINER_ID>

docker start <CONTAINER_ID> 
//start container ที่stop อยู่นะไม่ใช่การ run images
docker stop <CONTAINER_ID>

docker stop <CONTAINER_ID> 
docker stop <CONTAINER_ID> <CONTAINER_ID> <CONTAINER_ID> // Multiple 
//หยุดการทำงานของ container ไม่ใช่ remove นะลองพิมพ์ docker ps -a ดูสิ
docker pause <CONTAINER_ID>

docker pause <CONTAINER_ID> //เหมือนเราแช่แข็ง container ไว้
docker unpause <CONTAINER_ID> //เอาของที่แช่แข็งไว้มาทำไร ต่อ...
docker exec

docker exec -it <CONTAINER_ID> bash //เข้าไป console container

docker exec // ตอนออกก็ exit นะ
docker inspect

docker inspect <CONTAINER_ID> //ดูรายละเอียดของ container มีให้ดูเต็มไปหมด
docker logs

docker logs // โชว์ Logs container
docker commit <CONTAINER_ID> <NEW IMAGE NAME>

docker commit  <CONTAINER_ID> <NEW IMAGE NAME>
Ex. docker commit 2x5t aloha
docker push

docker push <ACCOUNT>/<NAME_IMAGE> //Push imges เราขึ้น Docker registry
docker tag

docker tag ubuntu ubuntu-x // ไม่กำหนด tag จะเป็น latest นะจ๊ะ
docker tag ubuntu ubuntu-x:2
<!- — Docker import-export and save-load images — ->
docker export - saves a container's running or paused instance to a file
docker save - saves a non-running container image to a file

-- Export, Import //ไว้ export container ที่ running or paused อยู่ได้
docker export <CONTAINER ID> > <To PATH>
docker import - <FROM PATH>

docker export — saves a container’s running or paused instance to a file
-- Save, Load //ไว้แชร์ images ให้เพื่อนโดยการไม่ต้อง push ขึ้น Docker registry
docker save <IMAGE NAME> > <To PATH>
docker save <IMAGE NAME>:<TAG> > <To PATH>
docker load < <FROM PATH>

docker save — saves a non-running container image to a file
<! — -Docker Network — ->
docker network ls
docker network create <NETWORK NAME> default bridge
docker network create --subnet 10.0.0.1/24 <NETWORK NAME>
docker network inspect <NETWORK Name or Conatiner ID>
docker network create my-net (create images networks)
docker run --network <NETWORK_NAME> <IMAGE NAME>
docker run -it --name <CONTAIN_NAME> --net--alias alias2 --network <NETWORK_NAME> <IMAGE NAME>
// เรื่องนี้ผมยังไม่แม่นเท่าไหร่ _/\_
<!- — Docker Compose — ->
docker-compose up -d --build // --build คือ Build ของใน Dockerfile ใหม่
docker-compose up --force-recreate
docker-compose ps
docker-compose scale web=5 
docker-compose stop
docker-compose rm
<!- — Tips and Tricks— ->
เกิดจากความขี้เกรียจล้วนๆ :P

docker rmi $(docker images --filter "dangling=true" -q --no-trunc) // Remove old and unused Docker images
// เนื่องจาก ผมใช้ docker compose build บ่อยจนเจอ พวกชื่อ images <none> เลยต้องการวิธีลบทีเดียวไปเลย ได้ไม่เสียเวลาลบทีละตัว สบายแฮ~
docker rm $(docker ps -a -q) //ลบ Container ทั้งหมดที่ Stop อยู่
docker stop $(docker ps -a -q) //หยุดการทำงาน Container ทั้งหมด
ssh default username, password

username: docker
password: tcuser
how to set proxy in docker toolbox

docker-machine ssh default
sudo vi /var/lib/boot2docker/profile
export "HTTP_PROXY=PROXY:PORT"
export "HTTPS_PROXY=PROXY:PORT"

how to set proxy in docker toolbox
<!- — Docker parameter — ->
-d //Run in the background.
-- name //ตั้งชื่อให้กับ container ที่เรากำลังจะสั่ง
-p //Port mapping, local_port:container_port
-h //Container host name
-e //Environment
-v //Map volume paths
-i //Keep STDIN open even if not attached
-t //Allocate a pseudo-TTY


docker search ubuntu //ค้นหา images จาก Docker registry


$ nvm ls   
$ docker-compose up
$ docker-compose down
$ docker-compose up --build
$ docker-compose ps


docker-compose down
docker-compose up -d postgres redis
docker-compose up app

bash
# หยุด containers ทั้งหมด
docker-compose down

# เริ่มต้น services
docker-compose up --build

# หรือรัน services แยก
docker-compose up -d postgres redis
docker-compose up app

# ตรวจสอบ environment variables ในแอป
docker exec -it <app_container_name> env | grep -E "(POSTGRES|REDIS|SQLITE)"

# ตรวจสอบ SQLite database
docker exec -it <app_container_name> ls -la /app/data/

# ทดสอบ SQLite connection
docker exec -it <app_container_name> sqlite3 /app/data/database.sqlite ".tables"

-- http://192.168.1.37:3004/document

# วิธีการ Backup postgres ใน Docker

# For backing up a single database, use the following command:
- docker ps

CONTAINER ID   IMAGE                          COMMAND                  CREATED          STATUS                 PORTS                                      NAMES
dc67a3bd2b1b   postgres:15-alpine             "docker-entrypoint.s…"   44 minutes ago   Up 8 minutes           5434/tcp, 0.0.0.0:5434->5432/tcp           docker.postgres
 
- docker exec -t your-db-container pg_dump -U postgres database_name > backup.sql
- docker exec -t dc67a3bd2b1b pg_dump -U postgres nest_cmon > backup_nest_cmon2.sql

# วิธีการ Backup SQLite3 ใน Docker
# เข้าไปใน container และสร้าง backup
docker exec CONTAINER_ID sqlite3 /path/to/database.sqlite3 ".backup /tmp/backup.sqlite3"

# คัดลอกไฟล์ backup ออกมาจาก container
docker cp CONTAINER_ID:/tmp/backup.sqlite3 ./backup.sqlite3

docker pull jenkins/jenkins


``` 