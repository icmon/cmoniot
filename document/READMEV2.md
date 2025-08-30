# Unstall docker ubuntu server 24.04

# docker version
# docker-compose version 
# docker ps -a -s

# docker Install CmonIoT

```bash
docker version
docker-compose version 
docker ps -a -s
-----------
sudo chmod -R 777 /home/cmon/appcmon
sudo chmod -R 777 /home/cmon/appcmon/backend
sudo chown -R 999:999 /home/cmon/appcmon/backend/docker/postgres/dbdata
sudo chown -R $(id -u):$(id -g) /home/cmon/appcmon/backend/docker/postgres/dbdata
sudo chmod -R 777 /home/cmon/appcmon/backend/docker/postgres/dbdata
-------------
sudo chmod -R 777 /home/cmon/appcmon
clear
docker compose down app
docker compose up --build app
docker compose up 
docker ps -a
-----------
# Stop the container (replace <container_id_or_name>)
docker stop my_container
docker stop xxxx
docker stop 
-----------
docker stop c386d7d114f2
-----------
# Remove the container
docker rm my_container
-----------
docker rm c386d7d114f2
-----------
# List images to find the ID/name
docker images
-----------
# Remove the image (replace <image_id_or_name>)
docker rmi my_image:latest
docker rmi xxx
----------- 
docker kill
-----------
docker kill my_container
docker kill --signal=SIGHUP  my_container
docker kill --signal=SIGHUP my_container
docker kill --signal=HUP my_container
docker kill --signal=1 my_container
-----------
docker stop my_container
docker stop xxxx
docker stop 
-----------
docker ps -a
-----------
docker stop 75a191f30c73
-----------
# Remove the container
docker rm my_container
-----------
docker rm 75a191f30c73
-----------
docker rmi nginx:alpine  
-----------
```

```bash

 - 
 

 -
 sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras -y

 -
 sudo apt-get autoremove --purge -y

 -  
    sudo rm -rf /var/lib/docker
    sudo rm -rf /var/lib/containerd
    sudo rm -rf /etc/docker

 - 
 sudo rm /etc/apt/sources.list.d/docker.list
 sudo rm /etc/apt/keyrings/docker.asc

 - 
 sudo systemctl status docker

 - 
 - 
 - 
 - 
 - 
 - 
 - 
```


# Install docker ubuntu server 24.04

```bash
 - 
 sudo apt update
 - 
 sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
 - 
 url -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
 - 
 echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 -  
 sudo apt update
 sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
 - 
 sudo usermod -aG docker ${USER}
 - 
 docker run hello-world
 - 
 - 
 - 
 - 
 - 
 - 
 - 
 - 
 - 
 - 
 - What’s the safest way to completely uninstall Docker on Ubuntu 24.04
Stop all running Docker containers and services

List running containers: docker ps

Stop running containers: docker stop $( docker ps -q )  

Stop the Docker service: sudo systemctl stop docker

Remove Docker containers, images, and networks to clean up data

Remove containers: docker rm $(docker ps -a -q)

Remove images: docker rmi $(docker images -a -q)

Prune networks: docker network prune

Uninstall Docker packages completely with purging

bash
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras -y
sudo apt-get autoremove --purge -y
Remove Docker system files and directories

bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo rm -rf /etc/docker
sudo rm /etc/apt/sources.list.d/docker.list
sudo rm /etc/apt/keyrings/docker.asc
Remove Docker user group and socket (optional)

bash
sudo groupdel docker
sudo rm -rf /var/run/docker.sock

CONTAINER ID   IMAGE                                   COMMAND                  CREATED         
# List all containers to find the ID/name
docker ps -a

 




# Stop the container (replace <container_id_or_name>)
docker stop my_container
docker stop xxxx
docker stop 
-----------
docker stop c386d7d114f2
 
 
# Remove the container
docker rm my_container
-----------
docker rm c386d7d114f2
 
 
 
# List images to find the ID/name
docker images
 
-----------
# Remove the image (replace <image_id_or_name>)
docker rmi my_image:latest
docker rmi xxx
----------- 

docker kill

docker kill my_container
docker kill --signal=SIGHUP  my_container
docker kill --signal=SIGHUP my_container
docker kill --signal=HUP my_container
docker kill --signal=1 my_container




docker ps -a
                                                                                  NAMES
75a191f30c73   nginx:alpine                                                                                                                appwebcmon
ab92256bf0c2   nanoninja/php-fpm:latest                                                                                                          phpwebcmon
689f9d421fb1   nginx:latest                    
# Stop the container (replace <container_id_or_name>)
docker stop my_container
docker stop xxxx
docker stop 
-----------

cmon@cmoniot:~/appcmon/codeigniter3$ docker ps -a
CONTAINER ID   IMAGE                                   COMMAND                  CREATED        STATUS                      PORTS                                                                                      NAMES
689f9d421fb1   nginx:latest                            "/docker-entrypoint.…"   15 hours ago   Created                                                                                                                codeigniter3-nginx-1
f1ce7d88179a   backend-app          


docker stop 75a191f30c73
docker stop ab92256bf0c2
docker stop 689f9d421fb1
 
# Remove the container
docker rm my_container
-----------
docker rm 75a191f30c73
docker rm ab92256bf0c2
docker rm 689f9d421fb1
 
 
docker rmi nginx:alpine  
docker rmi nanoninja/php-fpm:latest    
docker rmi nginx:latest    

#  docker-compose down
#  docker-compose up --build -d  

#  docker-compose up   
#  docker ps  

 

```
