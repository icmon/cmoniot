# Dockerfile ที่ปรับปรุงแล้ว
# ใช้ Nginx เวอร์ชั่น stable-alpine เป็น base image
FROM nginx:stable-alpine

# ระบุผู้ดูแล (ไม่จำเป็น แต่เป็น best practice)
LABEL maintainer="Cmon <icmon0955@gmail.com>"

# รับชื่อ PHP container จาก docker-compose.yml
ARG PHP_CONTAINER

# สร้างไฟล์ upstream conf เพื่อให้ Nginx รู้จักกับ PHP container
# โดยใช้ค่าจาก ARG ที่ส่งมาตอน build
RUN echo "upstream php-upstream { server ${PHP_CONTAINER}:9000; }" > /etc/nginx/conf.d/upstream.conf

# คัดลอกไฟล์คอนฟิกหลักของ server block
# ไฟล์นี้จะจัดการ request ทั้งหมด
COPY default.conf /etc/nginx/conf.d/default.conf

# (ทางเลือก) ติดตั้ง bash เพื่อให้ debug ใน container ได้ง่ายขึ้น
RUN apk --no-cache add bash

# กำหนด working directory เป็น document root ของเว็บ
WORKDIR /var/www/html

# เปิด port 80 และ 443
EXPOSE 80 443

# สั่งให้ Nginx ทำงานแบบ foreground ซึ่งเป็นวิธีมาตรฐานสำหรับ Docker
CMD ["nginx", "-g", "daemon off;"]
