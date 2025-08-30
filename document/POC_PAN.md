 POC
```bash

# Linux Version

No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 22.04.5 LTS
Release:	22.04
Codename:	jammy

# IP

IP=172.25.99.66
MASK=255.255.255.240
GW=172.25.99.62

# Email
host: "172.29.16.52",
port: 587,
user: "strux.ware",
pass: 'baac@123',


# PORT  ALLOW
To                         Action      From
--                         ------      ----
80/tcp                     ALLOW IN    Anywhere                  
11200:11299/tcp            ALLOW IN    Anywhere                  
11200:11299/udp            ALLOW IN    Anywhere                  
22/tcp (OpenSSH)           ALLOW IN    Anywhere                  
21                         ALLOW IN    Anywhere                  
22/tcp                     ALLOW IN    Anywhere                  
22                         ALLOW IN    Anywhere                  
25                         ALLOW IN    Anywhere                  
23                         ALLOW IN    Anywhere                  
487                        ALLOW IN    Anywhere                  
587                        ALLOW IN    Anywhere                  
465                        ALLOW IN    Anywhere                  
3000                       ALLOW IN    Anywhere                  
3003                       ALLOW IN    Anywhere                  
8000                       ALLOW IN    Anywhere                  
8888                       ALLOW IN    Anywhere                  
8083                       ALLOW IN    Anywhere                  
8086                       ALLOW IN    Anywhere                  
8081                       ALLOW IN    Anywhere                  
8088                       ALLOW IN    Anywhere                  
8080                       ALLOW IN    Anywhere                  
80                         ALLOW IN    Anywhere                  
433                        ALLOW IN    Anywhere                  
445                        ALLOW IN    Anywhere                  
1880                       ALLOW IN    Anywhere                  
1881                       ALLOW IN    Anywhere                  
1883                       ALLOW IN    Anywhere                  
27018                      ALLOW IN    Anywhere                  
5432                       ALLOW IN    Anywhere                  
5433                       ALLOW IN    Anywhere                  
5434                       ALLOW IN    Anywhere                  
5600                       ALLOW IN    Anywhere                  
5601                       ALLOW IN    Anywhere                  
5602                       ALLOW IN    Anywhere                  
5603                       ALLOW IN    Anywhere                  
5604                       ALLOW IN    Anywhere                  
5605                       ALLOW IN    Anywhere                  
5606                       ALLOW IN    Anywhere                  
6379                       ALLOW IN    Anywhere                  
6380                       ALLOW IN    Anywhere                  
6381                       ALLOW IN    Anywhere                  
9000                       ALLOW IN    Anywhere                  
9001                       ALLOW IN    Anywhere                  
9003                       ALLOW IN    Anywhere                  
9004                       ALLOW IN    Anywhere                  
80/tcp (v6)                ALLOW IN    Anywhere (v6)             
11200:11299/tcp (v6)       ALLOW IN    Anywhere (v6)             
11200:11299/udp (v6)       ALLOW IN    Anywhere (v6)             
22/tcp (OpenSSH (v6))      ALLOW IN    Anywhere (v6)             
21 (v6)                    ALLOW IN    Anywhere (v6)             
22/tcp (v6)                ALLOW IN    Anywhere (v6)             
22 (v6)                    ALLOW IN    Anywhere (v6)             
25 (v6)                    ALLOW IN    Anywhere (v6)             
23 (v6)                    ALLOW IN    Anywhere (v6)             
487 (v6)                   ALLOW IN    Anywhere (v6)             
587 (v6)                   ALLOW IN    Anywhere (v6)             
465 (v6)                   ALLOW IN    Anywhere (v6)             
3000 (v6)                  ALLOW IN    Anywhere (v6)             
3003 (v6)                  ALLOW IN    Anywhere (v6)             
8000 (v6)                  ALLOW IN    Anywhere (v6)             
8888 (v6)                  ALLOW IN    Anywhere (v6)             
8083 (v6)                  ALLOW IN    Anywhere (v6)             
8086 (v6)                  ALLOW IN    Anywhere (v6)             
8081 (v6)                  ALLOW IN    Anywhere (v6)             
8088 (v6)                  ALLOW IN    Anywhere (v6)             
8080 (v6)                  ALLOW IN    Anywhere (v6)             
80 (v6)                    ALLOW IN    Anywhere (v6)             
433 (v6)                   ALLOW IN    Anywhere (v6)             
445 (v6)                   ALLOW IN    Anywhere (v6)             
1880 (v6)                  ALLOW IN    Anywhere (v6)             
1881 (v6)                  ALLOW IN    Anywhere (v6)             
1883 (v6)                  ALLOW IN    Anywhere (v6)             
27018 (v6)                 ALLOW IN    Anywhere (v6)             
5432 (v6)                  ALLOW IN    Anywhere (v6)             
5433 (v6)                  ALLOW IN    Anywhere (v6)             
5434 (v6)                  ALLOW IN    Anywhere (v6)             
5600 (v6)                  ALLOW IN    Anywhere (v6)             
5601 (v6)                  ALLOW IN    Anywhere (v6)             
5602 (v6)                  ALLOW IN    Anywhere (v6)             
5603 (v6)                  ALLOW IN    Anywhere (v6)             
5604 (v6)                  ALLOW IN    Anywhere (v6)             
5605 (v6)                  ALLOW IN    Anywhere (v6)             
5606 (v6)                  ALLOW IN    Anywhere (v6)             
6379 (v6)                  ALLOW IN    Anywhere (v6)             
6380 (v6)                  ALLOW IN    Anywhere (v6)             
6381 (v6)                  ALLOW IN    Anywhere (v6)             
9000 (v6)                  ALLOW IN    Anywhere (v6)             
9001 (v6)                  ALLOW IN    Anywhere (v6)             
9003 (v6)                  ALLOW IN    Anywhere (v6)             
9004 (v6)                  ALLOW IN    Anywhere (v6)             

****************************

Mac ADDRESS : d8:9e:f3:9d:01:64

****************************

enp2s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.25.99.60  netmask 255.255.255.240  broadcast 172.25.99.79
        inet6 fe80::e0ed:d43f:bca6:ae9f  prefixlen 64  scopeid 0x20<link>
        ether d8:9e:f3:9d:01:64  txqueuelen 1000  (Ethernet)
        RX packets 594  bytes 93570 (93.5 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 4378  bytes 273727 (273.7 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

****************************

cmon@cmoniot:~$ ifconfig
****************************

enp2s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.25.99.60  netmask 255.255.255.240  broadcast 172.25.99.79
        inet6 fe80::e0ed:d43f:bca6:ae9f  prefixlen 64  scopeid 0x20<link>
        ether d8:9e:f3:9d:01:64  txqueuelen 1000  (Ethernet)
        RX packets 594  bytes 93570 (93.5 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 4378  bytes 273727 (273.7 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-10e7a091d125: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.19.0.1  netmask 255.255.0.0  broadcast 172.19.255.255
        inet6 fe80::c46f:2ff:fedf:ad3f  prefixlen 64  scopeid 0x20<link>
        ether c6:6f:02:df:ad:3f  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-4af57dd70cec: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.22.0.1  netmask 255.255.0.0  broadcast 172.22.255.255
        inet6 fe80::1cdf:e9ff:fef3:ee0c  prefixlen 64  scopeid 0x20<link>
        ether 1e:df:e9:f3:ee:0c  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-afd8b97956b9: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.26.0.1  netmask 255.255.0.0  broadcast 172.26.255.255
        inet6 fe80::b012:30ff:fe4b:f2e2  prefixlen 64  scopeid 0x20<link>
        ether b2:12:30:4b:f2:e2  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-b727bfd9a0b2: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.20.0.1  netmask 255.255.0.0  broadcast 172.20.255.255
        inet6 fe80::c806:9cff:fe56:f3ca  prefixlen 64  scopeid 0x20<link>
        ether ca:06:9c:56:f3:ca  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-b7b04fd165fd: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.27.0.1  netmask 255.255.0.0  broadcast 172.27.255.255
        ether 86:6f:1a:6b:70:4b  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-cd2d5c099c11: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.23.0.1  netmask 255.255.0.0  broadcast 172.23.255.255
        ether e2:17:4b:df:09:41  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-d0e90a0739c0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.18.0.1  netmask 255.255.0.0  broadcast 172.18.255.255
        inet6 fe80::c45c:5fff:fea2:b651  prefixlen 64  scopeid 0x20<link>
        ether c6:5c:5f:a2:b6:51  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-d7f578b7ca71: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.24.0.1  netmask 255.255.0.0  broadcast 172.24.255.255
        ether 72:ac:15:53:af:22  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-eda0e5a9a7be: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.21.0.1  netmask 255.255.0.0  broadcast 172.21.255.255
        inet6 fe80::2c50:43ff:fe8a:7698  prefixlen 64  scopeid 0x20<link>
        ether 2e:50:43:8a:76:98  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::49d:91ff:feef:438d  prefixlen 64  scopeid 0x20<link>
        ether 06:9d:91:ef:43:8d  txqueuelen 0  (Ethernet)
        RX packets 57  bytes 1596 (1.5 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 153  bytes 20632 (20.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 90068  bytes 193595986 (193.5 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 90068  bytes 193595986 (193.5 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth8705706: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::8463:10ff:fea6:7f9b  prefixlen 64  scopeid 0x20<link>
        ether 86:63:10:a6:7f:9b  txqueuelen 0  (Ethernet)
        RX packets 3  bytes 126 (126.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 922  bytes 135964 (135.9 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth069065b: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::a0da:ffff:fe5c:8a51  prefixlen 64  scopeid 0x20<link>
        ether a2:da:ff:5c:8a:51  txqueuelen 0  (Ethernet)
        RX packets 273177  bytes 571863110 (571.8 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 289752  bytes 156764532 (156.7 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth0c49929: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::9018:ecff:feea:dda7  prefixlen 64  scopeid 0x20<link>
        ether 92:18:ec:ea:dd:a7  txqueuelen 0  (Ethernet)
        RX packets 2199579  bytes 428060108 (428.0 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 3279557  bytes 761818927 (761.8 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth2c89024: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::9433:baff:fe24:4abb  prefixlen 64  scopeid 0x20<link>
        ether 96:33:ba:24:4a:bb  txqueuelen 0  (Ethernet)
        RX packets 2607  bytes 133043 (133.0 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 3532  bytes 294900 (294.9 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth3c3384e: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::80f3:20ff:fef4:e6b4  prefixlen 64  scopeid 0x20<link>
        ether 82:f3:20:f4:e6:b4  txqueuelen 0  (Ethernet)
        RX packets 148138  bytes 17026260 (17.0 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 194991  bytes 19719389 (19.7 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth3f75361: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::ac7e:37ff:fe00:fb21  prefixlen 64  scopeid 0x20<link>
        ether ae:7e:37:00:fb:21  txqueuelen 0  (Ethernet)
        RX packets 3  bytes 126 (126.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 794  bytes 130609 (130.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth4e98778: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::68e0:14ff:fe0a:6f12  prefixlen 64  scopeid 0x20<link>
        ether 6a:e0:14:0a:6f:12  txqueuelen 0  (Ethernet)
        RX packets 4476431  bytes 863773415 (863.7 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 3412271  bytes 576194915 (576.1 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth5354cd8: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::706b:c9ff:febe:f9e2  prefixlen 64  scopeid 0x20<link>
        ether 72:6b:c9:be:f9:e2  txqueuelen 0  (Ethernet)
        RX packets 5604  bytes 530331 (530.3 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 11008  bytes 13367878 (13.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth80ce4c7: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::e0f4:bfff:fedd:5ccd  prefixlen 64  scopeid 0x20<link>
        ether e2:f4:bf:dd:5c:cd  txqueuelen 0  (Ethernet)
        RX packets 9398  bytes 98220493 (98.2 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 9607  bytes 13428993 (13.4 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth9f0ec19: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::5c42:f6ff:fe6b:97ad  prefixlen 64  scopeid 0x20<link>
        ether 5e:42:f6:6b:97:ad  txqueuelen 0  (Ethernet)
        RX packets 3  bytes 126 (126.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 790  bytes 130327 (130.3 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vetha0f58c2: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::28c4:8cff:fe0d:ce50  prefixlen 64  scopeid 0x20<link>
        ether 2a:c4:8c:0d:ce:50  txqueuelen 0  (Ethernet)
        RX packets 2099  bytes 12107507 (12.1 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2606  bytes 1736040 (1.7 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethb44f8fa: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::545c:62ff:feec:8601  prefixlen 64  scopeid 0x20<link>
        ether 56:5c:62:ec:86:61  txqueuelen 0  (Ethernet)
        RX packets 762346  bytes 471119314 (471.1 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 851429  bytes 204391051 (204.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethb6d3772: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::2c27:83ff:feef:cf4a  prefixlen 64  scopeid 0x20<link>
        ether 2e:27:83:ef:cf:4a  txqueuelen 0  (Ethernet)
        RX packets 240  bytes 63631 (63.6 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 256  bytes 419146 (419.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlx90de80d11c71: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.242  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 2001:fb1:ac:6ada:eb8b:582d:d397:b6fc  prefixlen 64  scopeid 0x0<global>
        inet6 fe80::e9cd:2a2c:8a41:20c0  prefixlen 64  scopeid 0x20<link>
        inet6 2001:fb1:ac:6ada:64c3:a339:3cd5:6285  prefixlen 64  scopeid 0x0<global>
        ether 90:de:80:d1:1c:71  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

cmon@cmoniot:~$ 

``` 