
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"


#include <SPI.h>
#include <EthernetENC.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>


unsigned long previousEthernetCheck = 0;
const long ethernetCheckInterval = 5000;  // ตรวจสถานะทุก 5 วินาที

String SN = "BAACTW02";  // Serial Number

// ****************** Network Settings ******************
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};      // mac address ให้ใช้ตัวเดียวกันกับ esp32
IPAddress ip(192, 168, 1, 99);
IPAddress subnet(255, 255, 255, 0);
IPAddress gateway(192, 168, 1, 1);
EthernetClient ethClient;
PubSubClient mqttClient(ethClient);

// ****************** MQTT Settings **********************
const char* dataTopic = "BAACTW02/DATA";                // ใช้สำหรับส่งข้อมูล MQTT
const char* controlTopic = "BAACTW02/CONTROL";          // ใช้สำหรับสั่ง ปิด/เปิด
const char* mqttServer = "broker.hivemq.com";         // Cloud MQTT
//const char* mqttServer = "172.25.99.60";                // local MQTT
const int mqttPort = 1883;

const int mVperAmp = 100;

float Analog1;
float Analog2;
float AnalogMin = 300;   //ค่าน้อยกว่า x = power off
float AnalogMax = 350;   //ค่ามากว่า x =  power on
float AnalogOver = 1000;  //ค่าสูงเกินกำหนด  Overload



int coun = 2;

float vpp1, vpp2;
float temp;
float tempBuffer;
int ContRelay1 = 0;
int ActRelay1 = 0;
int ActFan1 = 0;
int AlarmFan1 = 0;
int Fan1_Overload = 0;

int StatusActFan1 = 0;
int StatusAlarmFan1 = 0;
int StatusAlarmFan1OFF = 0;
int StatusAlarmFan1ON = 0;
int StatusFan1_Overload = 0;
int StatusFan1_OverloadOFF = 0;
int StatusFan1_OverloadON = 0;

int StatusFan1OFF = 0;
int StatusFan1ON = 0;

int ContRelay2 = 0;
int ActRelay2 = 0;
int ActFan2 = 0;
int AlarmFan2 = 0;
int Fan2_Overload = 0;

int StatusActFan2 = 0;
int StatusAlarmFan2 = 0;
int StatusAlarmFan2OFF = 0;
int StatusAlarmFan2ON = 0;
int StatusFan2_Overload = 0;

int StatusFan2_OverloadOFF = 0;
int StatusFan2_OverloadON = 0;

int StatusFan2OFF = 0;
int StatusFan2ON = 0;

int counter = 0;
int counter2 = 0;

// ****************** Pin Definitions *************New*******
#define RELAY1_PIN   25
#define RELAY2_PIN   26
#define ALARM1_PIN   27
#define ALARM2_PIN   14
#define Analog1_PIN  34
#define Analog2_PIN  35
#define ONE_WIRE_BUS 4
#define ONBOARD_LED  2
#define POWER_LED    33


// ****************** Sensor Objects *********************
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);

// ****************** Variables **************************
unsigned long previousMillis = 0;
const long interval = 10000;

// --- สำหรับ LED กระพริบทุก 1 นาที ---
unsigned long previousLedMillis = 0;
const long ledInterval = 500; // 500 มิลลิวินาที
bool ledState = false;

// --- สำหรับ MQTT กระพริบทุก 5 นาที ---
unsigned long previousMQTTMillis = 0;
const long MQTTInterval = 5000; // 5 นาที
unsigned long previousMillisMQTT = 0;






void setup() {
  Serial.begin(9600);

  // Initialize Ethernet
  Ethernet.init(5);
  Ethernet.begin(mac, ip, gateway, gateway, subnet);
  vTaskDelay(pdMS_TO_TICKS(1500)); 
  Serial.println("");
  Serial.print("IP: ");
  Serial.println(Ethernet.localIP());
  vTaskDelay(pdMS_TO_TICKS(1500)); 

  // Initialize MQTT
  mqttClient.setServer(mqttServer, mqttPort);
  mqttClient.setCallback(callback);

  // Initialize pin
  pinMode(RELAY1_PIN, OUTPUT);
  pinMode(RELAY2_PIN, OUTPUT);
  pinMode(ALARM1_PIN, OUTPUT);
  pinMode(ALARM2_PIN, OUTPUT);
  pinMode(ONBOARD_LED, OUTPUT);
  pinMode(POWER_LED, OUTPUT);
  vTaskDelay(pdMS_TO_TICKS(100)); 
  digitalWrite(RELAY1_PIN, LOW);
  digitalWrite(RELAY2_PIN, LOW);
  digitalWrite(ALARM1_PIN, HIGH);
  digitalWrite(ALARM2_PIN, HIGH);
  digitalWrite(ONBOARD_LED, HIGH);
  digitalWrite(POWER_LED, HIGH);
  vTaskDelay(pdMS_TO_TICKS(100)); 
  

      
 // Initialize Temperature Sensor
  tempSensor.begin();
  Serial.println("System Ready");
}


void callback(char* topic, byte* payload, unsigned int length) {
  char msg[length+1];
  memcpy(msg, payload, length);
  msg[length] = '\0';

  String str = String(msg);
  Serial.print("Received: "); Serial.println(str);

  if(str=="0"){
    ContRelay1 = 0;
    digitalWrite(RELAY1_PIN, HIGH);
    Serial.println("FAN1 : OFF");
  }
  if(str=="1"){
    ContRelay1 = 1;
    digitalWrite(RELAY1_PIN, LOW);
    Serial.println("FAN1 : ON");
  }
  if(str=="2"){
    ContRelay2 = 0;
    digitalWrite(RELAY2_PIN, HIGH);
    Serial.println("FAN2 : OFF");
  }
  if(str=="3"){
    ContRelay2 = 1;
    digitalWrite(RELAY2_PIN, LOW);
    Serial.println("FAN2 : ON");
  }
}

void reconnect() {
  while (!mqttClient.connected()) {
    Serial.print("Connecting MQTT...");
    if (mqttClient.connect("BAACTW02")) {
      mqttClient.subscribe(controlTopic);
      Serial.println("OK");
      digitalWrite(POWER_LED, LOW);
    } else {
      digitalWrite(POWER_LED, HIGH);
      Serial.println("Retrying...");
      vTaskDelay(pdMS_TO_TICKS(5000)); 
    }
  }
}


void checkEthernetConnection() {
    if (Ethernet.linkStatus() == LinkOFF) {
        Serial.println("Ethernet cable disconnected. Trying to reconnect...");
        // ปิดการเชื่อมต่อเดิม
        //Ethernet.end();
        vTaskDelay(pdMS_TO_TICKS(1000)); // รอเล็กน้อยก่อนเชื่อมต่อใหม่
        // เริ่มเชื่อมต่อใหม่
        Ethernet.begin(mac, ip, gateway, gateway, subnet);
        vTaskDelay(pdMS_TO_TICKS(1500));  // รอให้เชื่อมต่อเสร็จ
        Serial.print("New IP: ");
        Serial.println(Ethernet.localIP());
    }
}



void loop() {



     unsigned long currentMillisMQTT = millis();
             if (currentMillisMQTT - previousMQTTMillis >= MQTTInterval) {  
                 previousMQTTMillis = currentMillisMQTT;

          getVPPBoth(&vpp1, &vpp2);
          Check_statusFan1(vpp1);
          Check_statusFan2(vpp2);
               
               // SendDataMQTT();

             }
  
}

void main_loop(){
    unsigned long currentMillis = millis();

  // --- กระพริบ ONBOARD_LED ทุก 1 นาที ---
  if (currentMillis - previousLedMillis >= ledInterval) {  
    previousLedMillis = currentMillis;


   //***
    ActRelay1 = digitalRead(RELAY1_PIN);
    ActRelay1 =!ActRelay1;
    ActRelay2 = digitalRead(RELAY2_PIN);
    ActRelay2 =!ActRelay2;


  //*** check alarm ***/
  if(ContRelay1 == 1){
    if(ActRelay1 == 1){
      if(ActFan1 == 1) {
             AlarmFan1 = 0;
      } else { AlarmFan1 = 1;}
    } else { AlarmFan1 = 1;}
  } else { AlarmFan1 = 0;}

  if(ContRelay2 == 1){
    if(ActRelay2 == 1){
      if(ActFan2 == 1) {
        AlarmFan2 = 0;
      } else { AlarmFan2 = 1;}
    } else { AlarmFan2 = 1;}
  } else { AlarmFan2 = 0;}


        AlarmFan1 = !AlarmFan1;
        AlarmFan2 = !AlarmFan2;

       digitalWrite(ALARM1_PIN, AlarmFan1);
       digitalWrite(ALARM2_PIN, AlarmFan2);
   
    ledState = !ledState;
    digitalWrite(ONBOARD_LED, ledState ? HIGH : LOW);    
  }

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    tempSensor.requestTemperatures();
    temp = tempSensor.getTempCByIndex(0);

    tempBuffer = temp;
    if(temp < 5){
           temp = tempBuffer;
    }else{
           tempBuffer = temp;      
      }
    
    Serial.print("Temperature: "); Serial.println(temp);
    vTaskDelay(pdMS_TO_TICKS(1000)); 
    
     SendData();
  }
  
}

void Check_fan_NO_Alarm1(){  //   

    
    getVPPBoth(&vpp1, &vpp2);
    Check_statusFan1(vpp1);  // output StatusActFan1 = 0/1 StatusFan1_Overload
  //  Serial.println();

//***  
    if(counter >= coun){
  /*
        Serial.print("StatusFan1OFF : "); Serial.println(StatusFan1OFF);
        Serial.print("StatusFan1ON : "); Serial.println(StatusFan1ON);
        Serial.print("StatusAlarmFan1OFF : "); Serial.println(StatusAlarmFan1OFF);
        Serial.print("StatusAlarmFan1ON : "); Serial.println(StatusAlarmFan1ON);
     */  
        if(StatusFan1OFF == coun)
         {
          ActFan1 = 0;   //OFF      
         }
         else{}
        if(StatusFan1ON == coun)
         {
          ActFan1 = 1;  //ON       
          }
         else{}

        if(StatusFan1_OverloadOFF == coun)
        {
          StatusFan1_Overload = 0;   //Normal
          
          }
        else{}
        if(StatusFan1_OverloadON == coun)
        {
          StatusFan1_Overload = 1;   //Alarm       
          }
        else{} 

        counter = 0;
        StatusFan1OFF = 0;
        StatusFan1ON = 0;  

        StatusFan1_OverloadON  = 0;
        StatusFan1_OverloadOFF = 0;
      
    }else{
       counter++;             
       if(StatusActFan1 == 0){
         StatusFan1OFF = StatusFan1OFF+1;
         
                 }else{
                       StatusFan1ON = StatusFan1ON+1;
                       //Serial.print("StatusFan1ON"); Serial.println(StatusFan1ON);
                      }       
       if(StatusFan1_Overload == 0){
         StatusFan1_OverloadOFF = StatusFan1_OverloadOFF+1;
                 }else{
                       StatusFan1_OverloadON = StatusFan1_OverloadON+1;
                      }  
                        
    }
    
}

void Check_fan_NO_Alarm2(){  //   


   
    getVPPBoth(&vpp1, &vpp2);
    Check_statusFan2(vpp2);  // output StatusActFan1 = 0/1 StatusFan1_Overload
   
  //  Serial.println();
//***  
    if(counter2 >= coun){
  /*
        Serial.print("StatusFan1OFF : "); Serial.println(StatusFan1OFF);
        Serial.print("StatusFan1ON : "); Serial.println(StatusFan1ON);
        Serial.print("StatusAlarmFan1OFF : "); Serial.println(StatusAlarmFan1OFF);
        Serial.print("StatusAlarmFan1ON : "); Serial.println(StatusAlarmFan1ON);
     */  
        if(StatusFan2OFF == coun)
         {
          ActFan2 = 0;      //OFF   
         }
         else{}
        if(StatusFan2ON == coun)
         {
          ActFan2 = 1;      //ON    
          }
         else{}

        if(StatusFan2_OverloadOFF == coun)
        {
          StatusFan2_Overload = 0;  //Normal
          
          }
        else{}
        if(StatusFan2_OverloadON == coun)
        {
          StatusFan2_Overload = 1;   //Alarm       
          }
        else{}

        counter2 = 0;
        StatusFan2OFF = 0;
        StatusFan2ON = 0;  

        StatusFan2_OverloadON  = 0;
        StatusFan2_OverloadOFF = 0;
      
    }else{
       counter2++;             
       if(StatusActFan2 == 0){
         StatusFan2OFF = StatusFan2OFF+1;
         
                 }else{
                       StatusFan2ON = StatusFan2ON+1;
                       //Serial.print("StatusFan2ON"); Serial.println(StatusFan2ON);
                      }       
       if(StatusFan2_Overload == 0){
         StatusFan2_OverloadOFF = StatusFan2_OverloadOFF+1;
                 }else{
                       StatusFan2_OverloadON = StatusFan2_OverloadON+1;
                      }  
                        
    }
    
}

void Check_statusFan1(float peakToPeakVoltage) {
  vTaskDelay(pdMS_TO_TICKS(100)); 
  //ActRelay1 = digitalRead(Analog1_PIN);  
  double VRMS = (peakToPeakVoltage / 2.0) * 0.707;
  double AmpsRMS = (VRMS * 900) / mVperAmp;
  
  Serial.print("Analog 1");
  Serial.print(" :");
  Serial.print(AmpsRMS);
  Serial.print(" : ");

  if(AnalogMin > AmpsRMS){
   // Serial.println("  Fan 1 status : OFF");
    StatusActFan1 = 0;
    StatusFan1_Overload = 0;
  }
  if(AmpsRMS > AnalogOver){
   // Serial.println("  Fan 1 status : Over load");
    StatusActFan1 = 1;
    StatusFan1_Overload = 1;
  } else {
    if(AmpsRMS > AnalogMax){
    //  Serial.println("  Fan 1 status : ON");
      StatusFan1_Overload = 0;
      StatusActFan1 = 1;
    }
  }

}

void Check_statusFan2(float peakToPeakVoltage) {
  vTaskDelay(pdMS_TO_TICKS(100)); 
  //ActRelay1 = digitalRead(Analog1_PIN);  
  double VRMS = (peakToPeakVoltage / 2.0) * 0.707;
  double AmpsRMS = (VRMS * 900) / mVperAmp;
 
  Serial.print("Analog 2");
  Serial.print(" :");
  Serial.print(AmpsRMS);
  Serial.println(" : ");
 
  if(AnalogMin > AmpsRMS){
  //  Serial.println("  Fan 2 status : OFF");
    StatusActFan2 = 0;
    StatusFan2_Overload = 0;
  }
  if(AmpsRMS > AnalogOver){
  //  Serial.println("  Fan 2 status : Over load");
    StatusActFan2 = 1;
    StatusFan2_Overload = 1;
  } else {
    if(AmpsRMS > AnalogMax){
  //    Serial.println("  Fan 2 status : ON");
      StatusFan2_Overload = 0;
      StatusActFan2 = 1;
    }
  }

}
void getVPPBoth(float* vpp1, float* vpp2) {
  int maxValue1 = 0, minValue1 = 4096;
  int maxValue2 = 0, minValue2 = 4096;
  uint32_t start_time = millis();

  while ((millis() - start_time) < 500) {
    int readValue1 = analogRead(Analog1_PIN);
    int readValue2 = analogRead(Analog2_PIN);

    if (readValue1 > maxValue1) maxValue1 = readValue1;
    if (readValue1 < minValue1) minValue1 = readValue1;

    if (readValue2 > maxValue2) maxValue2 = readValue2;
    if (readValue2 < minValue2) minValue2 = readValue2;
  }

  *vpp1 = ((maxValue1 - minValue1) * 3.3) / (4096.0 / 1000);
  *vpp2 = ((maxValue2 - minValue2) * 3.3) / (4096.0 / 1000);
}

void SendData() {
  vTaskDelay(pdMS_TO_TICKS(100)); 

  char tempStr[10];
  dtostrf(temp, 4, 1, tempStr);


  char msgBuffer[30];
  snprintf(
    msgBuffer,
    sizeof(msgBuffer),
    "%s,%d,%d,%d,%d,%d,%d,%d,%d",
    tempStr,
    ContRelay1,
    ActRelay1,
    ActFan1,
    AlarmFan1,
    ContRelay2,
    ActRelay2,
    ActFan2,
    AlarmFan2
  );

    Serial.print("Sent Serial: ");
    Serial.println(msgBuffer);

}

void SendDataMQTT() {
  vTaskDelay(pdMS_TO_TICKS(100));

  char tempStr[10];
  dtostrf(temp, 4, 1, tempStr);


  char msgBuffer[30];
  snprintf(
    msgBuffer,
    sizeof(msgBuffer),
    "%s,%d,%d,%d,%d,%d,%d,%d,%d",
    tempStr,
    ContRelay1,
    ActRelay1,
    ActFan1,
    AlarmFan1,
    ContRelay2,
    ActRelay2,
    ActFan2,
    AlarmFan2
  );
  if (mqttClient.publish("BAACTW02/DATA", msgBuffer)) {
    Serial.print("Sent:BAACTW02/DATA ");
    Serial.println(msgBuffer);
  } else {
    Serial.println("Send failed!");
  }
}
