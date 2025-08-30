# Unstall docker ubuntu server 24.04
# sudo chmod -R 777 /home/cmon/appcmon
# docker version
# docker-compose version 
# docker ps -a -s

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


                                                        NAMES                    SIZE
f4a205f43869   jwilder/nginx-proxy                     "/app/docker-entrypo…"   About a minute ago   Up About a minute           0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:443->443/tcp, [::]:443->443/tcp, 0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   proxy                    6.38kB (virtual 212MB)
c7620f5efab4   nginx:alpine                            "/docker-entrypoint.…"   2 minutes ago        Up About a minute           80/tcp, 8000/tcp, 0.0.0.0:8000->8080/tcp, [::]:8000->8080/tcp                                                           app                      2B (virtual 52.5MB)
768a32cf8b36   nanoninja/php-fpm:latest                "docker-php-entrypoi…"   6 minutes ago        Up About a minute           9000/tcp                                                                                                      phpappcmon

docker ps -a
NAMES                    SIZE
docker-compose up --build -d  

# Stop the container (replace <container_id_or_name>)
docker stop my_container
docker stop xxxx
docker stop 
-----------
docker stop f4a205f43869
docker stop c7620f5efab4
docker stop 768a32cf8b36 
 
# Remove the container
docker rm my_container
-----------
docker rm f4a205f43869
docker rm c7620f5efab4
docker rm 768a32cf8b36 
 

docker rmi nginx:alpine   
docker rmi jwilder/nginx-proxy  
docker rmi nanoninja/php-fpm:latest    
 

# nginx server 503 service temporarily unavailable docker

sudo systemctl restart docker

#  docker-compose down
#  docker-compose up --build -d  
#  docker-compose up   
#  docker ps -a 



```
