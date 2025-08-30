# docker Install CmonIoT
```bash


ubuntu install docker  docker.io  docker cs   docker comporse       podman-docker  step by step


sudo snap install docker         # version 28.1.1+1, or
sudo apt  install docker.io      # version 27.5.1-0ubuntu3~22.04.2
sudo apt  install podman-docker  # version 3.4.4+ds1-1ubuntu1.22.04.3

sudo snap install docker compose  
 













# Install docker (summary commands)
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io






sudo apt install docker-ce docker-ce-cli containerd.io











# Run Ubuntu container with host network (all ports allowed)
sudo docker run --rm -it --network=host ubuntu



sudo chmod -R 777 /home/cmon/appcmon
#  docker-compose up --build -d  
#  docker-compose up 
sudo chmod -R 777 /home/cmon/appcmon/backend

sudo chown -R 999:999 /home/cmon/appcmon/backend/docker/postgres/dbdata
sudo chown -R $(id -u):$(id -g) /home/cmon/appcmon/backend/docker/postgres/dbdata
sudo chmod -R 777 /home/cmon/appcmon/backend/docker/postgres/dbdata

# ubutu allow port ให้เครืองอื่น  เข้าใช้ถึง การใช้งาน
sudo ufw allow from 192.168.1.10 to any port 80

sudo ufw allow from 172.25.99.60 to any port 80

# ubutu allow port ให้เครืองอื่น ใน network เข้าใช้ถึง การใช้งาน
# ifconfig
# ifconfig -a
# 172.25.99.60  netmask 255.255.255.240  broadcast 172.25.99.63

# **************************

ping 172.25.66.59

ping 172.25.66.60

# sudo apt install net-tools
- 
# ------------------------
sudo ufw status
### ------------------------
sudo ufw allow <port_number>
### ------------------------
sudo ufw allow 8080
### ------------------------
sudo ufw allow 8080/tcp
sudo ufw allow 8080/udp
sudo ufw allow 80/tcp
sudo ufw allow 80/udp
### ------------------------
sudo ufw allow from <ip_address> to any port <port_number>
### ------------------------
sudo ufw enable
### ------------------------
sudo ufw status verbose
### ------------------------
# allow outbound icmp
sudo ufw reload
### ------------------------
Skipping adding existing rule (v6)
sudo ufw allow from 172.25.99.60 to any port 80
sudo ufw allow from 172.25.99.60 to any port 1883
sudo ufw allow from 172.25.99.60 to any port 1881
sudo ufw allow from 172.25.99.60 to any port 22
sudo ufw allow from 172.25.99.60 to any port 25
sudo ufw allow from 172.25.99.60 to any port 3003
sudo ufw allow from 172.25.99.60 to any port 5432
sudo ufw allow from 172.25.99.60 to any port 5433
sudo ufw allow from 172.25.99.60 to any port 5434
sudo ufw allow from 172.25.99.60 to any port 5431
sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
### ------------------------
sudo ufw reload
### ------------------------
sudo ufw status verbose
### ------------------------
### ------------------------
sudo ufw status verbose
sudo ufw reset
sudo ufw enable 
sudo ufw allow 80/tcp
sudo ufw allow 11200:11299/tcp
sudo ufw allow 11200:11299/udp
sudo ufw allow OpenSSH
sudo ufw allow 21
sudo ufw allow 22/tcp
sudo ufw allow 22
sudo ufw allow 25
sudo ufw allow 23
sudo ufw allow 487
sudo ufw allow 587
sudo ufw allow 465
sudo ufw allow 3000
sudo ufw allow 3003
sudo ufw allow 8000
sudo ufw allow 8888
sudo ufw allow 8083
sudo ufw allow 8086
sudo ufw allow 8081
sudo ufw allow 8088
sudo ufw allow 8080
sudo ufw allow 80 
sudo ufw allow 433 
sudo ufw allow 445
sudo ufw allow 1880
sudo ufw allow 1881
sudo ufw allow 1883 
sudo ufw allow 27018 
sudo ufw allow 5432
sudo ufw allow 5433
sudo ufw allow 5434
sudo ufw allow 5600
sudo ufw allow 5601
sudo ufw allow 5602
sudo ufw allow 5603
sudo ufw allow 5604
sudo ufw allow 5605
sudo ufw allow 5606
sudo ufw allow 6379
sudo ufw allow 6380
sudo ufw allow 6381
sudo ufw allow 8088
sudo ufw allow 9000
sudo ufw allow 9001
sudo ufw allow 9003
sudo ufw allow 9004
### ------------------------
sudo ufw status verbose
### ------------------------
sudo ufw allow <port_number>/<protocol>
sudo ufw allow <start_port>:<end_port>/<protocol>
sudo ufw allow from <ip_address> to any port <port_number>
### ------------------------

sudo apt install -y curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 22
nvm alias default 22
node -v
npm -v
sudo ufw allow from 172.25.99.61 to any port 3434
sudo ufw allow from 172.25.99.61 to any port 5001
sudo ufw allow from 172.25.99.61 to any port 5432
sudo ufw allow "Nginx Full"
sudo ufw enable
sudo ufw allow 4200
sudo ufw status
sudo ufw status verbose
sudo ufw disable && sudo ufw enable
sudo sysctl -p
sudo chmod -R 777 /home/cmon/appcmon/backend
hostname -I
ifconfig -a
docker pull php:8.3-fpm
export DOCKER_DEFAULT_PLATFORM=linux/amd64

sudo ufw default allow incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw status verbose
sudo ufw status
Status: inactive
sudo ufw enable

#  Output
# Firewall is active and enabled on system startup
sudo ufw status verbose
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw default deny routed
sudo iptables -L
sudo ufw app list
sudo ufw allow OpenSSH
sudo ufw app list | grep Nginx
sudo ufw allow http
sudo ufw allow 80
sudo ufw allow proto tcp from any to any port 80,443

docker system prune
docker rm -f 14f2708507de


#  docker version
#  docker-compose version 
#  WSL & docker
#  docker-compose down
#  docker-compose up --build -d  
#  docker-compose up   
#  docker ps  

1. cd iot
# docker-compose up --build -d  
# docker ps     

2. cd backend
# sudo chmod -R 777 /home/cmon/appcmon
# docker-compose up --build -d  
# docker ps   
# docker-compose up --build -d app  
# docker-compose up --build -d postgres  
# docker-compose up --build -d redis  
# docker-compose up --build -d pgadmin  
# docker-compose up --build -d redis-commander  
# docker-compose up 
# docker-compose up app
# docker-compose up postgres
# docker-compose up redis
# docker-compose up pgadmin
# docker-compose up redis-commander
# docker ps  

3. cd codeigniter3
# docker-compose up --build -d
# docker ps  
# sudo apt install ruby-listen
# Use listen 80 or listen 443 ssl as needed.
# Set server_name _; to accept all hostnames.

docker-compose restart
docker ps

sudo systemctl status php-fpm
sudo systemctl restart php-fpm
sudo systemctl restart nginx

docker-compose restart

4. cd mongodb
# docker-compose up --build -d
# docker ps  

5.  Config
 # Influx DB

 - http://localhost:8086/signin
 - username : admin password: Cmon@0955@#
 - ORG= cmon_org
 - BUCKET= BAACTW02
 - RETENTION= 365d
 - create Token : Exp :  ZF44HLIfNeb6meem6rIPDE8C48uCUMmH0x8r25M7TgFatm-r05dIxHyhYvJPzYGNYz6Aj_H2TcTrfPEN2BMCZw==
# /home/cmon/appcmon/backend/docker/postgres/dbdata: permission denied







#  docker compose up --build -d  
#  docker ps               
#  docker-compose down
#  docker-compose up --build
#  docker-compose logs grafana
#  docker ps -a
#  docker logs grafana
#  docker-compose down
#  docker-compose up -d
#  docker-compose down -v
#  docker-compose up -d
#  docker volume ls
#  docker compose up --build node-red-service -d  


sudo docker stop b0b203ffb479e80ee9fcb3574d0028fdf4db72b98cdf97b65983935c15aafa5f
sudo docker kill b0b203ffb479e80ee9fcb3574d0028fdf4db72b98cdf97b65983935c15aafa5f
sudo systemctl restart docker
sudo aa-disable /etc/apparmor.d/docker

sudo aa-disable /etc/apparmor.d/docker
sudo chown $USER:$USER /var/run/docker.sock
sudo systemctl restart docker

sudo journalctl -u docker.service

 # Node-red

 - http://localhost:1881/
 - username : admin password: password
# docker-compose-with-node-red-flows
- node-red-node-random
- node-red-dashboard
- node-red-contrib-mdashboard 
- node-red-node-redis
- node-red-contrib-influxdb
- node-red-contrib-ui-time-scheduler
- node-red-contrib-admin-api-url
- node-red-contrib-admin
- node-red-node-email

# Add flow

- http://localhost/signin?theme=dark#
- username : system Password :Na@0955@#
# -------------------------------------------
- http://localhost:3008/login
- username : admin Password :admin

 cd backend
# cd backend
- docker ps
- docker ps -a -s
- docker exec -t docker.postgres pg_dump -U postgres nest_cmon > public/backup.sql
# 172.25.99.60
# -################
# http://172.25.99.60:3003/
- http://172.25.99.60:8081/signin?theme=dark
- U: system
- P: Na@0955@#




        // transport: {
        //             host: "172.29.16.52",
        //             port: 587,
        //             secure: false,
        //             auth: {
        //               user: "strux.ware",
        //               pass: 'baac@123',
        //             },
        //             tls: {
        //                 rejectUnauthorized: false
        //             }
        //           },
        //         defaults: {
        //           from: '"No Reply" <IoTcmon>',
        //         },


# cd  /home/cmon/Public/appcmon/frontend
# docker-compose up --build -d  
# ###############
 
 
# icmon0955@gmail.com
# http://localhost:3003/v1/settings/sendemail?to=icmon0955@gmail.com
# http://172.25.99.60:3003/v1/settings/sendemail?to=icmon0955@gmail.com
```


```bash

IP=172.25.99.60
MASK=255.255.255.240
GW=172.25.99.62

API_URL=http://172.25.99.60:3003
HOST=http://localhost
PORT=3003
MQTT_HOST=mqtt://172.25.99.60:1883
MQTT_HOST_IP=172.25.99.60
MQTT_PORT=1883
influxdb_host=http://172.25.99.60:8086
influxdb_token=LN929D1sMCiV7cMNcXt-Ne-ltrxHVBNrCNDyQp2C48uQ06j8BL7lV1SRROPPnf8rGGVj2vC32i5Hu9hUP9Cvlg==


```