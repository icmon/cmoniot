### http://localhost:1881/flows
  - http://localhost:1881/flows


```bash 
    - http://localhost:1881/auth/token
        {
        "client_id": "node-red-admin",
        "grant_type": "password",
        "scope": "*",
        "username": "admin",
        "password": "password"
        }


    - ข้อมูล ผ่าน api node red เพื่อ สั่ง on off device mqtt
  
```
### 1. Check endpoint and create CRUD
```bash
   - https://nodered.org/docs/api/admin/methods/
        Endpoint	Description
        GET/auth/login	Get the active authentication scheme
        POST/auth/token	Exchange credentials for access token
        POST/auth/revoke	Revoke an access token
        GET/settings	Get the runtime settings
        GET/diagnostics	Get the runtime diagnostics
        GET/flows	Get the active flow configuration
        GET/flows/state	Get the active flow’s runtime state
        POST/flows	Set the active flow configuration
        POST/flows/state	Set the active flow’s runtime state
        POST/flow	Add a flow to the active configuration
        GET/flow/:id	Get an individual flow configuration
        PUT/flow/:id	Update an individual flow configuration
        DELETE/flow/:id	Delete an individual flow configuration
        GET/nodes	Get a list of the installed nodes
        POST/nodes	Install a new node module
        GET/nodes/:module	Get a node module’s information
        PUT/nodes/:module	Enable/Disable a node module
        DELETE/nodes/:module	Remove a node module
        GET/nodes/:module/:set	Get a node module set information
        PUT/nodes/:module/:set	Enable/Disable a node set

       
        GET/auth/login รับรูปแบบการตรวจสอบสิทธิ์ที่ใช้งานอยู่
        POST/auth/token แลกเปลี่ยนข้อมูลประจำตัวสำหรับโทเค็นการเข้าถึง
        POST/auth/revoke เพิกถอนโทเค็นการเข้าถึง
        GET/settings รับการตั้งค่ารันไทม์
        GET/diagnostics รับการวินิจฉัยรันไทม์
        GET/flows รับการกำหนดค่าโฟลว์ที่ใช้งานอยู่
        GET/flows/state รับสถานะรันไทม์ของโฟลว์ที่ใช้งานอยู่
        POST/flows ตั้งค่าการกำหนดค่าโฟลว์ที่ใช้งานอยู่
        POST/flows/state ตั้งค่าสถานะรันไทม์ของโฟลว์ที่ใช้งานอยู่
        POST/flows/flow เพิ่มโฟลว์ลงในการกำหนดค่าที่ใช้งานอยู่
        GET/flow/:id รับการกำหนดค่าโฟลว์แต่ละรายการ
        PUT/flow/:id อัปเดตการกำหนดค่าโฟลว์แต่ละรายการ
        DELETE/flow/:id ลบการกำหนดค่าโฟลว์แต่ละรายการ
        GET/nodes รับรายชื่อโหนดที่ติดตั้งไว้
        POST/nodes ติดตั้งโมดูลโหนดใหม่
        GET/nodes/:module รับข้อมูลโมดูลโหนด
        PUT/nodes/:module เปิดใช้งาน/ปิดใช้งานโหนด โมดูล
        DELETE/nodes/:module ลบโมดูลโหนด
        GET/nodes/:module/:set รับข้อมูลชุดโมดูลโหนด
        PUT/nodes/:module/:set เปิดใช้งาน/ปิดใช้งานชุดโหนด
        ```
### 2. Intall DB (Docker) sql
```bash
   - http://localhost:1881/flows
```
### 3. Intall TypeOrm
```bash
   - http://localhost:1881/flows
```
 