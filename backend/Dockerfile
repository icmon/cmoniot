FROM node:22

WORKDIR /app
# ติดตั้ง build-essential tools
RUN apt-get update && apt-get install -y python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# สร้างโฟลเดอร์สำหรับ SQLite database
RUN mkdir -p /app/data

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ตั้งค่า environment variables
ENV NODE_ENV=development
ENV SQLITE_DATABASE_PATH=/app/src/dbsqlite/data.sqlite3
ENV APP_PORT=3003

EXPOSE 3003

CMD [ "npm", "run", "start:dev" ]

# FROM node:20
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# หากยัง error ให้เพิ่ม debug:
# RUN npm install || cat /root/.npm/_logs/*debug*.log
