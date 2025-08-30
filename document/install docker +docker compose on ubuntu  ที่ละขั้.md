<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# install docker +docker compose on ubuntu  ที่ละขั้นตอน

ขอแนะนำขั้นตอนติดตั้ง Docker และ Docker Compose บน Ubuntu แบบทีละขั้นตอน ดังนี้

## ติดตั้ง Docker บน Ubuntu

1. อัปเดตแพ็กเกจบนระบบ
```sh
sudo apt-get update
```

2. ติดตั้งแพ็กเกจที่จำเป็นสำหรับการเพิ่มที่เก็บซอฟต์แวร์ผ่าน HTTPS
```sh
sudo apt-get install ca-certificates curl gnupg lsb-release
```

3. เพิ่ม GPG key ของ Docker ลงในระบบ
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

4. ตั้งที่เก็บซอฟต์แวร์ Docker ลงใน apt sources
```sh
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. อัปเดต apt index อีกครั้ง
```sh
sudo apt-get update
```

6. ติดตั้ง Docker Engine
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io -y
```

7. ตั้งค่าให้สามารถรัน docker ได้โดยไม่ใช้ root (เพิ่ม user ลงกลุ่ม docker)
````sh
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

8. เปิดใช้งาน Docker service ให้ทำงานตอนเริ่มต้นเครื่อง
```sh
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

9. ทดสอบว่า Docker ทำงานได้ปกติ
```sh
docker run hello-world
```


## ติดตั้ง Docker Compose

1. ดาวน์โหลด Docker Compose binary ลงใน /usr/local/bin
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2. เปลี่ยนสิทธิ์ให้ไฟล์สามารถรันได้
```
sudo chmod +x /usr/local/bin/docker-compose
```sh

3. ตรวจสอบเวอร์ชัน Docker Compose เพื่อยืนยันการติดตั้ง
```sh
docker-compose --version
```

ขั้นตอนนี้จะช่วยให้ติดตั้ง Docker และ Docker Compose บน Ubuntu ได้สำเร็จและพร้อมใช้งานทันที[^1_1][^1_3][^1_4]
<span style="display:none">[^1_10][^1_2][^1_5][^1_6][^1_7][^1_8][^1_9]</span>

<div style="text-align: center">⁂</div>

[^1_1]: https://blog.devops.dev/how-to-install-docker-on-ubuntu-linux-379f2dd6f833

[^1_2]: https://spalinux.com/2018/03/install-docker-compose-on-linux

[^1_3]: https://codewithkarani.com/2024/04/06/beginners-guide-to-installing-docker-on-ubuntu-22-04-a-step-by-step-tutorial/

[^1_4]: https://acodeof.com/docker-and-compose-ubuntu/

[^1_5]: https://docs.docker.com/desktop/setup/install/linux/ubuntu/

[^1_6]: https://snappytux.com/install-docker-and-docker-compose-offline/

[^1_7]: https://docs.docker.com/engine/install/ubuntu/

[^1_8]: https://www.sysadmin.in.th/install-docker-on-ubuntu-24-04/

[^1_9]: https://attc.rta.mi.th/web/th/employment/เทคโนโลยี/การใช้งานระบบ/วิธีการติดตั้ง-docker-บน-ubuntu-24-04-คำแนะนำทีละขั้นตอน

[^1_10]: https://www.reddit.com/r/docker/comments/1iv03ec/how_install_docker_compose_on_linux_server/?tl=th

