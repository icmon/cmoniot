<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# How To  ติดตั้ง Docker บน Linux Ubuntu   step by step

การติดตั้ง Docker บน Linux Ubuntu สามารถทำตามขั้นตอนดังนี้ (แนะนำให้ใช้วิธีติดตั้งจากแหล่งข้อมูลอย่างเป็นทางการเพื่อให้ได้เวอร์ชันล่าสุด):[^1_5][^1_8]

1. อัปเดตระบบและติดตั้งแพ็กเกจที่จำเป็น
```sh
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
```

2. เพิ่ม Docker’s Official GPG Key
```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

3. ตั้งค่า Docker Repository
```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

4. อัปเดต index และติดตั้ง Docker Engine
```sh
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

5. ตรวจสอบการทำงานของ Docker
```sh
sudo systemctl status docker
```

หรือทดสอบรันคอนเทนเนอร์

```sh
sudo docker run hello-world
```

หากต้องการให้ผู้ใช้ทั่วไปใช้ Docker โดยไม่ต้อง sudo:

```sh
sudo usermod -aG docker $USER
```

จากนั้น log out และ log in ใหม่

หมายเหตุ:

- แนะนำให้ติดตั้งจาก repository อย่างเป็นทางการแทน `sudo apt install docker.io` เพราะจะได้เวอร์ชันที่ใหม่กว่า.[^1_8][^1_5]
- ถ้าใช้ Ubuntu 24.04 หรือ 22.04 คำสั่งเหมือนกัน ยกเว้นชื่อโค้ดเนมใน command อาจเปลี่ยนไปตามรุ่น.[^1_1][^1_9]
- สามารถติดตั้ง Docker Desktop ได้หากต้องการ GUI interface ตามคู่มือ Docker Desktop.[^1_7]

อ้างอิงขั้นตอนโดยละเอียดจากเอกสารทางการและบล็อกภาษาไทย.[^1_9][^1_5][^1_8]

<div style="text-align: center">⁂</div>

[^1_1]: https://attc.rta.mi.th/web/th/employment/เทคโนโลยี/การใช้งานระบบ/วิธีการติดตั้ง-docker-บน-ubuntu-24-04-คำแนะนำทีละขั้นตอน

[^1_2]: https://devopenworld.com/post/ติดตั้ง-docker-บน-ubuntu

[^1_3]: https://www.youtube.com/watch?v=vIXI9Pf6w4k

[^1_4]: https://sysadmin.psu.ac.th/docker-ubuntu-16-04/

[^1_5]: https://blog.1byte.com/th/ubuntu-install-docker/

[^1_6]: https://www.youtube.com/watch?v=xapvOlC8GoY

[^1_7]: https://docs.docker.com/desktop/setup/install/linux/ubuntu/

[^1_8]: https://docs.docker.com/engine/install/ubuntu/

[^1_9]: https://www.sysadmin.in.th/install-docker-on-ubuntu-24-04/


---

# ติดตั้ง Docker and docker compose บน Linux

วิธีติดตั้ง Docker และ Docker Compose บน Linux (Ubuntu)

คุณสามารถติดตั้ง Docker และ Docker Compose บน Ubuntu ได้ด้วยขั้นตอนดังนี้ (รองรับ Ubuntu 22.04, 24.04 และเวอร์ชันยอดนิยมส่วนใหญ่):

### 1. อัปเดตระบบและติดตั้งแพ็กเกจที่จำเป็น

```sh
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
```


### 2. เพิ่ม Docker’s Official GPG Key

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```


### 3. ตั้งค่า Docker Repository

```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```


### 4. อัปเดต index และติดตั้ง Docker Engine \& Docker Compose (plugin)

```sh
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```


### 5. ตรวจสอบการติดตั้ง

ตรวจสอบ Docker ว่าทำงานปกติหรือไม่:

```sh
sudo systemctl status docker
```

หรือทดสอบโดยรัน container:

```sh
sudo docker run hello-world
```


### 6. ใช้งาน Docker Compose ด้วย plugin

หลังขั้นตอนนี้ คุณสามารถใช้ docker compose ได้เลย (รูปแบบใหม่):

```sh
docker compose version
```

ถ้าต้องการให้พิมพ์ `docker-compose` แบบเดิม ให้สร้าง symbolic link:

```sh
sudo ln -s /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose
docker-compose version
```


### 7. อนุญาตให้ผู้ใช้ธรรมดาใช้ Docker โดยไม่ต้องใช้ sudo

```sh
sudo usermod -aG docker $USER
```

จากนั้น **log out** และ **log in** ใหม่

### หมายเหตุ

- วิธีนี้ได้ Docker Compose แบบเป็น plugin (`docker compose ...`) ซึ่งเป็นแนวทางหลักของ Docker ในปัจจุบัน.
- ไม่แนะนำติดตั้งด้วย `sudo apt install docker.io` หรือ `pip install docker-compose` เพราะจะได้เวอร์ชันเก่ากว่า.
- ขั้นตอนนี้ใช้ได้กับ Ubuntu และดิสโทรที่ใช้ APT เป็นหลัก หากเป็นดิสโทรอื่นให้ดูวิธีจากเอกสารอย่างเป็นทางการของ Docker.

**อ้างอิงขั้นตอนจากเอกสารทางการ Docker**

