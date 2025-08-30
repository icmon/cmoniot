# CodeIgniter3 Docker Nginx server
# http://172.25.99.66  
# 172.25.99.66
```bash
cmon@cmoniot:~$ ifconfig 
br-10e7a091d125: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.19.0.1  netmask 255.255.0.0  broadcast 172.19.255.255
        inet6 fe80::d7:16ff:fe2c:ee87  prefixlen 64  scopeid 0x20<link>
        ether 02:d7:16:2c:ee:87  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-b727bfd9a0b2: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.20.0.1  netmask 255.255.0.0  broadcast 172.20.255.255
        inet6 fe80::7400:ccff:fe02:15  prefixlen 64  scopeid 0x20<link>
        ether 76:00:cc:02:00:15  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-b7b04fd165fd: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.27.0.1  netmask 255.255.0.0  broadcast 172.27.255.255
        ether a6:37:87:12:57:b0  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-c7579de6785f: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.22.0.1  netmask 255.255.0.0  broadcast 172.22.255.255
        inet6 fe80::e0c5:5bff:fe98:8cee  prefixlen 64  scopeid 0x20<link>
        ether e2:c5:5b:98:8c:ee  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-cd2d5c099c11: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.23.0.1  netmask 255.255.0.0  broadcast 172.23.255.255
        ether 82:ac:d4:8f:a8:09  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-d0e90a0739c0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.18.0.1  netmask 255.255.0.0  broadcast 172.18.255.255
        inet6 fe80::ec71:caff:fece:53aa  prefixlen 64  scopeid 0x20<link>
        ether ee:71:ca:ce:53:aa  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-d7f578b7ca71: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.24.0.1  netmask 255.255.0.0  broadcast 172.24.255.255
        ether 2a:b9:32:aa:1f:63  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-eda0e5a9a7be: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.21.0.1  netmask 255.255.0.0  broadcast 172.21.255.255
        inet6 fe80::b0c5:61ff:fee6:10de  prefixlen 64  scopeid 0x20<link>
        ether b2:c5:61:e6:10:de  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-f90e55e3f8d7: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.26.0.1  netmask 255.255.0.0  broadcast 172.26.255.255
        inet6 fe80::842e:68ff:febb:4e58  prefixlen 64  scopeid 0x20<link>
        ether 86:2e:68:bb:4e:58  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::9c59:9aff:fec5:5d4b  prefixlen 64  scopeid 0x20<link>
        ether 9e:59:9a:c5:5d:4b  txqueuelen 0  (Ethernet)
        RX packets 15  bytes 420 (420.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 33  bytes 5313 (5.3 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

enp2s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.25.99.66  netmask 255.255.255.240  broadcast 172.25.99.79
        inet6 fe80::e0ed:d43f:bca6:ae9f  prefixlen 64  scopeid 0x20<link>
        ether d8:9e:f3:9d:01:64  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1880  bytes 91007 (91.0 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 81167  bytes 262288458 (262.2 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 81167  bytes 262288458 (262.2 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth1133473: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::c9d:50ff:feda:8add  prefixlen 64  scopeid 0x20<link>
        ether 0e:9d:50:da:8a:dd  txqueuelen 0  (Ethernet)
        RX packets 51066  bytes 6661508 (6.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 64890  bytes 7437334 (7.4 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth1a16aaf: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::50e2:9aff:fe64:bbad  prefixlen 64  scopeid 0x20<link>
        ether 52:e2:9a:64:bb:ad  txqueuelen 0  (Ethernet)
        RX packets 7  bytes 318 (318.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 163  bytes 22180 (22.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth37e5e6b: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::a437:2cff:fe0d:804c  prefixlen 64  scopeid 0x20<link>
        ether a6:37:2c:0d:80:4c  txqueuelen 0  (Ethernet)
        RX packets 3  bytes 126 (126.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 163  bytes 22212 (22.2 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth7baf25a: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::3091:efff:feff:4f93  prefixlen 64  scopeid 0x20<link>
        ether 32:91:ef:ff:4f:93  txqueuelen 0  (Ethernet)
        RX packets 121518  bytes 76635175 (76.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 146094  bytes 30189587 (30.1 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethb86bcf2: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::78d7:9dff:fee3:e67e  prefixlen 64  scopeid 0x20<link>
        ether 7a:d7:9d:e3:e6:7e  txqueuelen 0  (Ethernet)
        RX packets 2874  bytes 19040846 (19.0 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2922  bytes 6682654 (6.6 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethba5e1af: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::cc4e:14ff:fec7:353a  prefixlen 64  scopeid 0x20<link>
        ether ce:4e:14:c7:35:3a  txqueuelen 0  (Ethernet)
        RX packets 3  bytes 126 (126.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 92  bytes 10534 (10.5 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethbe1b051: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::708b:23ff:fe29:ea06  prefixlen 64  scopeid 0x20<link>
        ether 72:8b:23:29:ea:06  txqueuelen 0  (Ethernet)
        RX packets 1220711  bytes 180321623 (180.3 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1830889  bytes 363293360 (363.2 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethc4bdd54: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::28f1:dcff:fe97:f9b5  prefixlen 64  scopeid 0x20<link>
        ether 2a:f1:dc:97:f9:b5  txqueuelen 0  (Ethernet)
        RX packets 38787  bytes 74619449 (74.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 40366  bytes 20340312 (20.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethcada481: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::346d:b8ff:fef2:c920  prefixlen 64  scopeid 0x20<link>
        ether 36:6d:b8:f2:c9:20  txqueuelen 0  (Ethernet)
        RX packets 1310  bytes 6430065 (6.4 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1278  bytes 762101 (762.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethd6c0908: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::d4b0:cbff:fe94:ef86  prefixlen 64  scopeid 0x20<link>
        ether d6:b0:cb:94:ef:86  txqueuelen 0  (Ethernet)
        RX packets 2669041  bytes 473664866 (473.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2057327  bytes 245019018 (245.0 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethf2202f7: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::28a8:cff:feda:50cd  prefixlen 64  scopeid 0x20<link>
        ether 2a:a8:0c:da:50:cd  txqueuelen 0  (Ethernet)
        RX packets 958  bytes 49049 (49.0 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1052  bytes 85258 (85.2 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethf4ebe3b: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::8c44:37ff:fe75:44ea  prefixlen 64  scopeid 0x20<link>
        ether 8e:44:37:75:44:ea  txqueuelen 0  (Ethernet)
        RX packets 777  bytes 126247 (126.2 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 894  bytes 282546 (282.5 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethffbce89: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::300e:fff:fee5:2aa4  prefixlen 64  scopeid 0x20<link>
        ether 32:0e:0f:e5:2a:a4  txqueuelen 0  (Ethernet)
        RX packets 28761  bytes 20622425 (20.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 27399  bytes 27026879 (27.0 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlx90de80d11c71: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.242  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::e9cd:2a2c:8a41:20c0  prefixlen 64  scopeid 0x20<link>
        inet6 2001:fb1:ac:6ada:eb8b:582d:d397:b6fc  prefixlen 64  scopeid 0x0<global>
        inet6 2001:fb1:ac:6ada:c0c0:7115:f7d7:88e0  prefixlen 64  scopeid 0x0<global>
        ether 90:de:80:d1:1c:71  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

cmon@cmoniot:~$ 

```
