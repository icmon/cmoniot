### MQTT
-  Mqtt
- https://www.npmjs.com/package/@homeofthings/nestjs-sqlite3

```bash
C:\Program Files\mosquitto>mosquitto -v -c mosquitto.conf
1746928394: mosquitto version 2.0.21 starting
1746928394: Config loaded from mosquitto.conf.
1746928394: Starting in local only mode. Connections will only be possible from clients running on this machine.
1746928394: Create a configuration file which defines a listener to allow remote access.
1746928394: For more details see https://mosquitto.org/documentation/authentication-methods/
1746928394: Opening ipv4 listen socket on port 1883.
1746928394: Error: Only one usage of each socket address (protocol/network address/port) is normally permitted.
1746928394: Opening ipv6 listen socket on port 1883.
1746928394: Error: Only one usage of each socket address (protocol/network address/port) is normally permitted.
C:\Program Files\mosquitto>


C:\Program Files\mosquitto>mosquitto -v -c mosquitto.conf

C:\Program Files\mosquitto>netstat -an | findstr 1883
  TCP    127.0.0.1:1883         0.0.0.0:0              LISTENING
  TCP    [::1]:1883             [::]:0                 LISTENING

mosquitto -v -c mosquitto.conf



C:\Program Files\mosquitto>sc stop mosquitto

SERVICE_NAME: mosquitto
        TYPE               : 110  WIN32_OWN_PROCESS  (interactive)
        STATE              : 3  STOP_PENDING
                                (STOPPABLE, NOT_PAUSABLE, ACCEPTS_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0

C:\Program Files\mosquitto>sc start mosquitto

SERVICE_NAME: mosquitto
        TYPE               : 110  WIN32_OWN_PROCESS  (interactive)
        STATE              : 4  RUNNING
                                (STOPPABLE, NOT_PAUSABLE, ACCEPTS_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
        PID                : 10320
        FLAGS              :

C:\Program Files\mosquitto>mosquitto -c "mosquitto.conf"

C:\Program Files\mosquitto>mosquitto_sub -t "test/topic" -u admin -P admin

C:\Program Files\mosquitto>

netstat -ano | findstr 1883


npm i @alphaport/nestjs-mqtt-broker


```