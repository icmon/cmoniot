#include <UIPEthernet.h>
#include <SPI.h>
#include <EthernetServer.h>
#include <Arduino.h>

// กำหนด MAC และ IP สำหรับ ENC28J60
byte mac[] = {0x08, 0xF3, 0xDA, 0x54, 0x2B, 0x68};
// กำหนด IP, Gateway, Subnet
IPAddress local_ip(192, 168, 1, 5);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

EthernetServer server(80);

void setup() {
  Serial.begin(9600);
  while (!Serial); // รอ Serial พร้อมใช้งาน (สำหรับ Nano กับ Leonardo เท่านั้น)

  Serial.println(F("Starting Ethernet"));
  if (Ethernet.begin(mac) == 0) {
    Serial.println(F("Failed to configure Ethernet using DHCP"));
    Ethernet.begin(mac, local_ip);
  }
  delay(1000);
  Serial.print(F("Server IP: "));
  Serial.println(Ethernet.localIP());

  server.begin();
}

void loop() {
  EthernetClient client = server.available();
  if (client) {
    Serial.println(F("New client connected"));
    boolean currentLineIsBlank = true;
    String req = "";

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        req += c;

        // อ่านจนเจอซ้อนของ \r\n\r\n คือสิ้นสุด HTTP header
        if (req.endsWith("\r\n\r\n")) {
          // ส่ง HTTP response
          client.println(F("HTTP/1.1 200 OK"));
          client.println(F("Content-Type: text/html"));
          client.println(F("Connection: close"));
          client.println();
          client.println(F("<!DOCTYPE HTML>"));
          client.println(F("<html><body><h1>hello alex</h1></body></html>"));
          break;
        }
      }
    }
    delay(1);
    client.stop();
    Serial.println(F("Client disconnected"));
  }
}
