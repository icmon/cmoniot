# Cmon IoT CI-with-HMVC
Setup HMVC and local session storage with Codeigniter 3

Modules are groups of independent components, typically model, controller and view, arranged in an application modules sub-directory that can be dropped into other Codeigniter applications. This allows easy distribution of independent components (MVC) in a single directory across other CodeIgniter applications

 ![theme](https://github.com/user-attachments/assets/d4715832-7613-423a-99c7-9b3360dc1b52)


# Updated for PHP 8

```bash
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




// app.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getNodeRedData() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:1880/api/data')
    );
    return response.data;
  }
}



// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('nodered-data')
  async getNodeRedData() {
    return this.appService.getNodeRedData();
  }
}



import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NodeRedService {
  constructor(private readonly httpService: HttpService) {}

  async getAllFlows() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:1880/flows')
    );
    return response.data;
  }

  async getFlowById(flowId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:1880/flow/${flowId}`)
    );
    return response.data;
  }
}

AI

ฉันต้องการ เรียกใช้งาน APi ของ NODE-RED โดยใช้ PostMand ทำได้อย่างไร
http://localhost:1881
1.แสดง flow ทังหมด
2.การ  กรองข้อมูลใน flow
3.การ Add new flow
4.การ Update flow
5.การ Delete flow

วิธีกรองข้อมูลใน flow ผ่าน API ของ Node-RED คืออะไร



node-red-contrib-flow-manager

Home
Finance
Travel
Shopping
Academic
Library
Create a Thread
Home
Discover
Spaces
ฉันต้องการ เรียกใช้งาน APi ของ NODE-RED โดยใช้ PostMand ทำได้อย่างไร
http://localhost:1881
1.แสดง flow ทังหมด
2.การ กรองข้อมูลใน flow
3.การ Add new flow
4.การ Update flow
5.การ Delete flow
Show less
ฉันต้องการ เรียกใช้งาน APi ของ NODE-RED โดยใช้ PostMand ทำได้อย่างไร http://localhost:1881 1.แสดง flow ทังหมด 2.การ กรองข้อมูลใน flow 3.การ Add new flow 4.การ Update flow 5.การ Delete flow
การเรียกใช้งาน API ของ Node-RED ด้วย Postman
คุณสามารถจัดการ flow ของ Node-RED ผ่าน REST API ได้โดยตรงผ่าน Postman ที่ http://localhost:1880 (หรือ 1881 หากคุณตั้งค่าพอร์ตไว้ที่นั้น) โดยสามารถดำเนินการตามที่คุณต้องการได้ดังนี้

1. แสดง flow ทั้งหมด
Endpoint:

text
GET /flows
ตัวอย่างใน Postman:

Method: GET

URL: http://localhost:1880/flows

หากเปิด authentication ให้ใส่ token ที่หัวข้อ Authorization: Bearer [token]

ผลลัพธ์:
จะได้ข้อมูล flow ทั้งหมดใน Node-RED

2. การกรองข้อมูลใน flow
วิธีที่ 1: ใช้ API ของ Node-RED core (ไม่มี filter โดยตรง ต้องดึงทั้งหมดแล้วกรองเอง)

วิธีที่ 2: ใช้ package เสริม เช่น node-red-contrib-flow-manager

Endpoint:

text
GET /flow-manager/filter-flows
ตัวอย่างใน Postman:

Method: GET

URL: http://localhost:1880/flow-manager/filter-flows

เปลี่ยน filter:

Method: PUT

URL: http://localhost:1880/flow-manager/filter-flows

Body: (raw, JSON)

json
["Flow 1", "Flow 2"]
Header: Content-Type: application/json

3. การ Add new flow
Endpoint:

text
POST /flows
ตัวอย่างใน Postman:

Method: POST

URL: http://localhost:1880/flows

Header:

Content-Type: application/json

(ถ้ามี auth) Authorization: Bearer [token]

Node-RED-Deployment-Type: full

Body: (raw, JSON)
ตัวอย่างโครงสร้าง (array ของ node objects):

json
[
  {
    "type": "tab",
    "label": "New Flow"
  }
  // ... node อื่นๆ ใน flow
]
หมายเหตุ: API จะสร้าง id ใหม่ให้อัตโนมัติ ไม่สามารถกำหนด id เองได้

4. การ Update flow
Endpoint:

text
POST /flows
วิธี:

ดึง flow ปัจจุบัน (GET /flows)

แก้ไขข้อมูลที่ต้องการ

ส่งกลับด้วย POST /flows

หากใช้ API v2 ให้ใส่ rev property ด้วยเพื่อป้องกัน version conflict

ตัวอย่างใน Postman:

Method: POST

URL: http://localhost:1880/flows

Header:

Content-Type: application/json

(ถ้ามี auth) Authorization: Bearer [token]

Node-RED-Deployment-Type: full

Body: (raw, JSON)
ใช้ข้อมูล flow ที่แก้ไขแล้ว

5. การ Delete flow
วิธี:

ยังไม่มี endpoint สำหรับลบ flow เดี่ยวๆ โดยตรงใน API หลักของ Node-RED

วิธีที่ใช้กันทั่วไป:

ดึง flow ทั้งหมด (GET /flows)

ลบ flow ที่ต้องการออกจาก array

ส่ง array ที่ลบแล้วกลับไปด้วย POST /flows เพื่ออัปเดต

หากใช้ package เสริม อาจมี endpoint เพิ่มเติม เช่น /flow-manager

สรุปตาราง Endpoint หลัก
การกระทำ	Method	Endpoint	หมายเหตุ
แสดง flow ทั้งหมด	GET	/flows	API หลัก Node-RED
กรอง flow	GET	/flow-manager/filter-flows	ต้องติดตั้ง flow-manager
เพิ่ม flow ใหม่	POST	/flows	ส่ง array ของ flow ใหม่
แก้ไข flow	POST	/flows	ส่ง flow ที่แก้ไขแล้ว
ลบ flow	POST	/flows (หลังลบใน array)	ไม่มี DELETE โดยตรง
หมายเหตุเพิ่มเติม
หาก Node-RED มีการเปิด authentication ต้องแนบ token หรือ credential ใน header ทุกครั้ง

หากต้องการ filter หรือ operation พิเศษ อาจต้องติดตั้ง package เสริมเช่น node-red-contrib-flow-manager

การลบ flow ต้องแก้ไข array flow ทั้งหมดแล้วส่งกลับ (ไม่มี API DELETE โดยตรง)

ตัวอย่างการใช้งานใน Postman
GET /flows

URL: http://localhost:1880/flows

Method: GET

Header: (ถ้ามี) Authorization: Bearer [token]

POST /flows (เพิ่ม/อัปเดต)

URL: http://localhost:1880/flows

Method: POST

Header:

Content-Type: application/json

(ถ้ามี) Authorization: Bearer [token]

Node-RED-Deployment-Type: full

Body: (raw, JSON) ข้อมูล flow ที่ต้องการ

คุณสามารถนำข้อมูลนี้ไปตั้งค่าใน Postman ได้ทันทีตามตัวอย่างข้างต้น

Related
ฉันจะเรียกใช้งาน API ของ Node-RED เพื่อดู flow ทั้งหมดได้อย่างไร
วิธีกรองข้อมูลใน flow ผ่าน API ของ Node-RED คืออะไร
ฉันจะเพิ่ม flow ใหม่เข้าไปใน Node-RED ด้วย Postman ได้อย่างไร
การอัปเดต flow ใน Node-RED ผ่าน API ต้องทำอย่างไรบ้าง
วิธีลบ flow ออกจาก Node-RED โดยใช้ Postman คืออะไร
วิธีกรองข้อมูลใน flow ผ่าน API ของ Node-RED คืออะไร
วิธีกรองข้อมูลใน flow ผ่าน API ของ Node-RED คืออะไร
วิธีกรองข้อมูลใน flow ผ่าน API ของ Node-RED
Node-RED ไม่มี REST API สำหรับ "กรองข้อมูลใน flow" โดยตรงผ่าน endpoint เช่น /flows ที่สามารถส่ง query เพื่อ filter ได้ทันที แต่สามารถดำเนินการได้โดยใช้แนวทางดังนี้

1. ดึงข้อมูล flow ทั้งหมดผ่าน API

ใช้คำสั่ง GET ที่ endpoint:

text
GET /flows
จะได้ข้อมูล flow ทั้งหมดในรูปแบบ JSON

2. กรองข้อมูลที่ต้องการจากผลลัพธ์

เมื่อได้ข้อมูล flow ทั้งหมดผ่าน API แล้ว ให้นำข้อมูล JSON ที่ได้ไปกรอง (filter) ต่อเอง เช่น ผ่านโค้ดใน Postman, JavaScript, Python หรือเครื่องมืออื่น

ตัวอย่างเช่น กรอง node ที่ type เป็น "http in" หรือ "function" เป็นต้น

"จาก API แล้วใช้โหนดฟังก์ชันเพื่อเลือกองค์ประกอบที่คุณต้องการจากอาร์เรย์ที่แยกแล้ว หลังจากนั้นก็เป็นกรณีของการใช้สิ่งต่างๆ เช่น โหนด filter เพื่อกรองข้อมูลที่ส่งไปแล้วผ่านAPI เป็นต้น

3. การกรองข้อมูลใน flow ระหว่างการทำงาน

หากต้องการกรองข้อมูลที่ไหลผ่าน flow ระหว่าง runtime (เช่น ข้อมูล sensor หรือ event) ให้ใช้ node ประเภท "function", "switch" หรือ "filter" ภายใน Node-RED เอง ไม่ใช่ผ่าน REST API

ตัวอย่าง: ใช้ function node เพื่อเขียน JavaScript กรองข้อมูลที่ต้องการก่อนส่งต่อไปยัง node ถัดไป

สรุป

การกรองข้อมูลใน flow ผ่าน API ของ Node-RED คือการดึง flow ทั้งหมดด้วย API (GET /flows) แล้วนำข้อมูลที่ได้ไปกรองเองด้วยโค้ดหรือเครื่องมือที่เหมาะสม

หากต้องการกรองข้อมูลระหว่าง flow ขณะทำงาน ให้ใช้ node ประเภท function หรือ switch ภายใน Node-RED

Node-RED ไม่มี API สำหรับ filter ข้อมูลใน flow โดยตรงผ่าน HTTP query

หมายเหตุ:
หากต้องการ filter ข้อมูล flow ผ่าน API แบบ advanced อาจต้องติดตั้ง package เสริม เช่น node-red-contrib-flow-manager แต่โดยปกติแล้ววิธีมาตรฐานคือดึง flow ทั้งหมดแล้ว filter เองภายนอก.

get data from ui
get data from ui
วิธีดึงข้อมูลจาก UI ใน Node-RED
การ "get data from UI" ใน Node-RED สามารถทำได้หลายรูปแบบ ขึ้นอยู่กับประเภทของ UI ที่คุณใช้งาน เช่น Node-RED Dashboard (ui_table, ui_form ฯลฯ) หรือ uibuilder สำหรับสร้าง UI แบบกำหนดเอง

1. กรณีใช้ Node-RED Dashboard (เช่น ui_table, ui_form)

ui_table
คุณสามารถรับข้อมูลที่แสดงอยู่ใน ui_table ได้โดยตั้งค่า flow ให้ส่งข้อมูลที่ต้องการไปยัง node ui_table และเชื่อมโยงกับ node อื่นเพื่อส่งข้อมูลนั้นกลับออกมาใน payload เมื่อเกิด event ที่ต้องการ เช่น กดปุ่ม หรือเลือกแถวในตาราง

ถ้าต้องการดึงข้อมูลทั้งหมดจากตาราง ให้ส่ง command ไปที่ ui_table ด้วย payload ที่มีโครงสร้างดังนี้:

json
{
  "command": "getData"
}
แล้วข้อมูลในตารางจะถูกส่งกลับมาใน message payload

หรือจะใช้ tabulator function ผ่าน property command เช่น addFilter เพื่อกรองข้อมูลในตาราง และดึงเฉพาะข้อมูลที่ต้องการ

ui_form / input node อื่นๆ
เมื่อผู้ใช้กรอกข้อมูลในฟอร์มหรือ UI อื่นๆ ข้อมูลจะถูกส่งออกมาเป็น payload อัตโนมัติ สามารถนำไปใช้งานต่อใน flow ได้ทันที

2. กรณีใช้ uibuilder

uibuilder ช่วยให้คุณสร้าง UI แบบกำหนดเองด้วย HTML/JS/CSS และสื่อสารกับ Node-RED ผ่าน WebSocket

คุณสามารถเขียน JavaScript ฝั่ง client เพื่อส่งข้อมูลจาก UI ไปหา Node-RED และรับข้อมูลกลับมาแสดงบน UI ได้แบบ real-time

ตัวอย่างเช่น รับข้อมูลจากฟอร์มในหน้าเว็บ แล้วส่งไป Node-RED ด้วย

javascript
uibuilder.send({payload: {name: "user", value: "data"}});
และใน Node-RED สามารถส่งข้อมูลกลับไปยัง UI ด้วยการเชื่อมต่อ node uibuilder

3. การดึงข้อมูลจาก REST API เพื่อแสดงใน UI

สร้าง flow ที่รับ HTTP GET request (HTTP in node) แล้วดึงข้อมูลจากฐานข้อมูลหรือแหล่งข้อมูลอื่น ส่งผลลัพธ์กลับผ่าน HTTP response node

ฝั่ง UI (เช่น Appsmith หรือเว็บที่เชื่อมต่อกับ Node-RED) เรียก API นี้เพื่อแสดงข้อมูลในตารางหรือ widget ต่างๆ

สรุป
ถ้าใช้ Dashboard: ข้อมูลจะถูกส่งออกมาเป็น payload อัตโนมัติเมื่อมี event หรือสามารถใช้ command กับ ui_table เพื่อดึงข้อมูลได้

ถ้าใช้ uibuilder: ส่งข้อมูลระหว่าง UI กับ Node-RED ได้แบบสองทางผ่าน WebSocket

ถ้าใช้ REST API: สร้าง endpoint ใน Node-RED แล้วให้ UI เรียก API เพื่อรับข้อมูลไปแสดง

เลือกวิธีที่เหมาะกับ UI ที่คุณใช้งานในโปรเจกต์ของคุณ

Related
How can I extract data from a ui_table in Node-RED
What methods are best for fetching data via REST API in Node-RED
How do I send commands to update the ui-table dynamically
Why is my web page data not retrieving correctly in Node-RED
What are common issues when getting data from web pages with Node-RED



/********************************/
  // http://localhost:3003/v1/mqtt/mqttsenserchartv2?bucket=BAACTW02
 // http://localhost:3003/v1/mqtt/mqttsenserchartv2
  // http://localhost:3003/v1/mqtt/sensercharts?bucket=BAACTW02&field=value&start=-5m&stop=now()&measurement=temperature&windowPeriod=5m&limit=120&offset=0&mean=last
  // http://localhost:3003/v1/mqtt/senserchart?bucket=BAACTW02
  // http://localhost:3003/v1/mqtt/sensercharts?bucket=BAACTW02
  // http://localhost:3003/v1/mqtt/sensercharts?bucket=BAACTW02&deletecache=1
  // http://localhost:3003/v1/mqtt
  // http://localhost:3003/v1/mqtt/device?topic=BAACTW02/DATA
  // http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=1
  // mqtt_list_paginate_active
  // http://localhost:3003/v1/mqtt/getdevice?topic=BAACTW02/DATA
  // http://localhost:3003/v1/mqtt/device?topic=BAACTW02/DATA
  // http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=0
  // http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=1
  // http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=2
  // http://localhost:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=3

  // http://localhost:3003/v1/mqtt/mqttsenserchartv2?bucket=AIR1
  // http://localhost:3003/v1/mqtt/mqttsenserchartv2?bucket=BAACTW03

/**
1	ธกส ระบบพัดลมระบายอากาศ	192.168.1.37	Fan	2025-06-14 05:31:26.774385	2025-06-14 05:31:26.774385	1	{"0":"BAACTW02","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}
5	ธกส ระบบแอร์	192.168.1.57	Air	2025-07-08 16:09:59	2025-07-08 16:10:01	1	{"0":"BAACTW02","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}
 

 	{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}
 	{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}


mqtt_data=[
    "BAACTW02",
    "temperature",
    "contRelay1",
    "actRelay1",
    "fan1",
    "overFan1",
    "contRelay2",
    "actRelay2",
    "fan2",
    "overFan2"
]


mqtt_objt_data=[
    "BAACTW03",
    "26.17",
    "0",
    "0",
    "1",
    "1",
    "0",
    "0",
    "0",
    "0"
]

รวม array   mqtt_data  เป็น key    จาก mqtt_objt_data  เป็น  value

**/

``` 
