 POC
```bash

# Linux Version

No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 22.04.5 LTS
Release:	22.04
Codename:	jammy

Ubuntu 22.04.5 LTS  Alloow poer lan ipv4  แนะนะทีละขั้นตอน


IP=172.25.99.60
MASK=255.255.255.240
GW=172.25.99.62

clear

sudo apt install net-tools


old 
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses:
        - 172.25.99.60/28
      routes:
        - to: default
          via: 172.25.99.62
          table: 100
      routing-policy:
        - from: 172.25.99.60/28
          table: 100
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

---
network:
  version: 2
  ethernets:
    enp2s0:
      dhcp4: no
      addresses:
        - 172.25.99.60/28
      gateway4: 172.25.99.62  # แก้ตาม gateway ของเครือข่าย
      routes:
        - to: default
          via: 172.25.99.62
          table: 100
      routing-policy:
        - from: 172.25.99.60/28
          table: 100
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]


----

network:
  version: 2
  ethernets:
    enp2s0:
      dhcp4: no
      addresses:
        - 172.25.99.60/28
      gateway4: 172.25.99.62  # แก้ตาม gateway ของเครือข่าย
      nameservers:
        addresses: [8.8.8.8,8.8.4.4]





# IP
ubutu set ipv4 on lan card 
set static ip an allow all filewall
 inet 172.25.99.60  netmask 255.255.255.240 broadcast 172.25.99.62


IP=172.25.99.60
MASK=255.255.255.240
GW=172.25.99.62
step by step and allow all

 inet 172.25.99.60  netmask 255.255.255.240 broadcast 172.25.99.62

enp2s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.25.99.60  netmask 255.255.255.240  broadcast 172.25.99.63
        inet6 fe80::13a4:eeb0:fe66:6d4  prefixlen 64  scopeid 0x20<link>
        ether d8:9e:f3:9d:01:64  txqueuelen 1000  (Ethernet)
        RX packets 126  bytes 7560 (7.5 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 205  bytes 16136 (16.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

#######

ip a
--------------
cmon@cmon-iot:~/appcmon$ ifconfig
enp2s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.25.99.60  netmask 255.255.255.240  broadcast 172.25.99.63
        inet6 2001:fb1:ac:6ada:c4a3:9a2f:9c6f:da9  prefixlen 64  scopeid 0x0<global>
        inet6 2001:fb1:ac:6ada:662b:766d:ed95:6280  prefixlen 64  scopeid 0x0<global>
        inet6 fe80::12bc:81df:efbf:2803  prefixlen 64  scopeid 0x20<link>
        ether d8:9e:f3:9d:01:64  txqueuelen 1000  (Ethernet)
        RX packets 59101  bytes 83032881 (83.0 MB)
        RX errors 0  dropped 1  overruns 0  frame 0
        TX packets 5679  bytes 1066581 (1.0 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 711  bytes 75679 (75.6 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 711  bytes 75679 (75.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlx90de80d11c71: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.242  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::93bf:167a:6dbc:cfff  prefixlen 64  scopeid 0x20<link>
        inet6 2001:fb1:ac:6ada:e8d8:dc13:3191:56fd  prefixlen 64  scopeid 0x0<global>
        inet6 2001:fb1:ac:6ada:fc32:f003:5c81:8f31  prefixlen 64  scopeid 0x0<global>
        ether 90:de:80:d1:1c:71  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
ip a
cmon@cmon-iot:~/appcmon$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp2s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether d8:9e:f3:9d:01:64 brd ff:ff:ff:ff:ff:ff
    inet 172.25.99.60/28 brd 172.25.99.63 scope global noprefixroute enp2s0
       valid_lft forever preferred_lft forever
    inet6 2001:fb1:ac:6ada:662b:766d:ed95:6280/64 scope global temporary dynamic 
       valid_lft 259039sec preferred_lft 85674sec
    inet6 2001:fb1:ac:6ada:c4a3:9a2f:9c6f:da9/64 scope global dynamic mngtmpaddr noprefixroute 
       valid_lft 259039sec preferred_lft 172639sec
    inet6 fe80::12bc:81df:efbf:2803/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: wlx90de80d11c71: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 90:de:80:d1:1c:71 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.242/24 brd 192.168.1.255 scope global dynamic noprefixroute wlx90de80d11c71
       valid_lft 85888sec preferred_lft 85888sec
    inet6 2001:fb1:ac:6ada:e8d8:dc13:3191:56fd/64 scope global temporary dynamic 
       valid_lft 259039sec preferred_lft 85519sec
    inet6 2001:fb1:ac:6ada:fc32:f003:5c81:8f31/64 scope global dynamic mngtmpaddr noprefixroute 
       valid_lft 259039sec preferred_lft 172639sec
    inet6 fe80::93bf:167a:6dbc:cfff/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
cmon@cmon-iot:~/appcmon$ 
----------------
Speed: 100 Mb/s
IPV4  Address: 172.25.99.60
IPV46 Address: :fe80::e0ed:d43f:bca6:ae9f
Hardwarwe Address :D8:9E:F3:9D:01:64
             ether d8:9e:f3:9d:01:64
Default Route : 172.25.99.62


 
----
# Step 1: Find the Network Interface Name
- ip a

# Step 2: Edit the Netplan Configuration File
-  sudo nano /etc/netplan/01-netcfg.yaml

# YAML
# This file is generated from information provided by the cloud-init package.
# Do not edit this file directly.
network:
    ethernets:
        enp0s3:
            dhcp4: true
    version: 2

# Step 3: Configure the Static IP

# This file is generated from information provided by the cloud-init package.
# Do not edit this file directly.
network:
    ethernets:
        enp0s3:
            dhcp4: no
            addresses:
                - 172.25.99.60/28
            routes:
                - to: default
                  via: 172.25.99.62
    version: 2


sudo netplan apply

ip a

ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp2s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether d8:9e:f3:9d:01:64 brd ff:ff:ff:ff:ff:ff
    inet 172.25.99.60/28 brd 172.25.99.63 scope global noprefixroute enp2s0
       valid_lft forever preferred_lft forever
    inet6 fe80::e0ed:d43f:bca6:ae9f/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: br-afd8b97956b9: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether ce:17:93:05:56:b3 brd ff:ff:ff:ff:ff:ff
    inet 172.26.0.1/16 brd 172.26.255.255 scope global br-afd8b97956b9
       valid_lft forever preferred_lft forever
    inet6 fe80::cc17:93ff:fe05:56b3/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
4: br-b7b04fd165fd: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 2e:50:8c:49:fe:91 brd ff:ff:ff:ff:ff:ff
    inet 172.27.0.1/16 brd 172.27.255.255 scope global br-b7b04fd165fd
       valid_lft forever preferred_lft forever
5: br-c2d696718f2d: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 6e:42:5d:d4:e5:42 brd ff:ff:ff:ff:ff:ff
    inet 172.20.0.1/16 brd 172.20.255.255 scope global br-c2d696718f2d
       valid_lft forever preferred_lft forever
    inet6 fe80::6c42:5dff:fed4:e542/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
6: br-d7f578b7ca71: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 6a:d9:fe:98:9e:8b brd ff:ff:ff:ff:ff:ff
    inet 172.24.0.1/16 brd 172.24.255.255 scope global br-d7f578b7ca71
       valid_lft forever preferred_lft forever
7: br-ed5fe4106989: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether d2:c9:c7:32:fd:42 brd ff:ff:ff:ff:ff:ff
    inet 172.21.0.1/16 brd 172.21.255.255 scope global br-ed5fe4106989
       valid_lft forever preferred_lft forever
    inet6 fe80::d0c9:c7ff:fe32:fd42/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
8: br-34efadc97b73: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether a6:07:fe:7b:64:d3 brd ff:ff:ff:ff:ff:ff
    inet 172.22.0.1/16 brd 172.22.255.255 scope global br-34efadc97b73
       valid_lft forever preferred_lft forever
    inet6 fe80::a407:feff:fe7b:64d3/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
9: br-cd2d5c099c11: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 9a:d3:e6:2d:6d:a0 brd ff:ff:ff:ff:ff:ff
    inet 172.23.0.1/16 brd 172.23.255.255 scope global br-cd2d5c099c11
       valid_lft forever preferred_lft forever
10: br-d0e90a0739c0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether ca:c8:70:05:af:b2 brd ff:ff:ff:ff:ff:ff
    inet 172.18.0.1/16 brd 172.18.255.255 scope global br-d0e90a0739c0
       valid_lft forever preferred_lft forever
    inet6 fe80::c8c8:70ff:fe05:afb2/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
11: br-f613aee23b3b: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether e2:29:a0:3f:47:8b brd ff:ff:ff:ff:ff:ff
    inet 172.19.0.1/16 brd 172.19.255.255 scope global br-f613aee23b3b
       valid_lft forever preferred_lft forever
    inet6 fe80::e029:a0ff:fe3f:478b/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
12: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 26:78:18:57:a6:62 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
13: vethc08f336@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-afd8b97956b9 state UP group default 
    link/ether 36:45:af:3b:2f:fb brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::3445:afff:fe3b:2ffb/64 scope link 
       valid_lft forever preferred_lft forever
14: veth22420fe@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-c2d696718f2d state UP group default 
    link/ether 9e:fa:fc:eb:b3:4f brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::9cfa:fcff:feeb:b34f/64 scope link 
       valid_lft forever preferred_lft forever
15: vethd6e8bf6@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-f613aee23b3b state UP group default 
    link/ether 66:26:5d:18:45:39 brd ff:ff:ff:ff:ff:ff link-netnsid 2
    inet6 fe80::6426:5dff:fe18:4539/64 scope link 
       valid_lft forever preferred_lft forever
16: veth403d76b@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-d0e90a0739c0 state UP group default 
    link/ether de:ea:5f:0a:1d:23 brd ff:ff:ff:ff:ff:ff link-netnsid 3
    inet6 fe80::dcea:5fff:fe0a:1d23/64 scope link 
       valid_lft forever preferred_lft forever
17: veth77b16c4@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-afd8b97956b9 state UP group default 
    link/ether f2:0b:5b:3e:60:20 brd ff:ff:ff:ff:ff:ff link-netnsid 4
    inet6 fe80::f00b:5bff:fe3e:6020/64 scope link 
       valid_lft forever preferred_lft forever
18: veth3f6a0f9@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-34efadc97b73 state UP group default 
    link/ether ba:1c:8e:b0:13:de brd ff:ff:ff:ff:ff:ff link-netnsid 5
    inet6 fe80::b81c:8eff:feb0:13de/64 scope link 
       valid_lft forever preferred_lft forever
19: vethcbf6998@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-ed5fe4106989 state UP group default 
    link/ether 0a:c5:5c:1b:82:32 brd ff:ff:ff:ff:ff:ff link-netnsid 6
    inet6 fe80::8c5:5cff:fe1b:8232/64 scope link 
       valid_lft forever preferred_lft forever
20: veth6ebaf13@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-c2d696718f2d state UP group default 
    link/ether 36:13:30:d9:f5:56 brd ff:ff:ff:ff:ff:ff link-netnsid 7
    inet6 fe80::3413:30ff:fed9:f556/64 scope link 
       valid_lft forever preferred_lft forever
21: vethb77c445@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-34efadc97b73 state UP group default 
    link/ether 7e:8b:00:30:1f:39 brd ff:ff:ff:ff:ff:ff link-netnsid 8
    inet6 fe80::7c8b:ff:fe30:1f39/64 scope link 
       valid_lft forever preferred_lft forever
22: veth7922dfc@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-d0e90a0739c0 state UP group default 
    link/ether 62:79:aa:c4:4a:67 brd ff:ff:ff:ff:ff:ff link-netnsid 9
    inet6 fe80::6079:aaff:fec4:4a67/64 scope link 
       valid_lft forever preferred_lft forever
23: vethd71f859@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-afd8b97956b9 state UP group default 
    link/ether 06:78:10:10:0d:25 brd ff:ff:ff:ff:ff:ff link-netnsid 10
    inet6 fe80::478:10ff:fe10:d25/64 scope link 
       valid_lft forever preferred_lft forever
24: veth5ba6e6c@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-afd8b97956b9 state UP group default 
    link/ether 42:ea:9f:2d:62:5d brd ff:ff:ff:ff:ff:ff link-netnsid 11
    inet6 fe80::40ea:9fff:fe2d:625d/64 scope link 
       valid_lft forever preferred_lft forever
25: vethbf900ed@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-afd8b97956b9 state UP group default 
    link/ether 6a:e4:4e:a7:c1:0c brd ff:ff:ff:ff:ff:ff link-netnsid 12
    inet6 fe80::68e4:4eff:fea7:c10c/64 scope link 
       valid_lft forever preferred_lft forever
26: wlx90de80d11c71: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 90:de:80:d1:1c:71 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.242/24 brd 192.168.1.255 scope global dynamic noprefixroute wlx90de80d11c71
       valid_lft 86380sec preferred_lft 86380sec
    inet6 2001:fb1:ac:6ada:529:aafa:fbaa:3b8a/64 scope global temporary dynamic 
       valid_lft 259184sec preferred_lft 85985sec
    inet6 2001:fb1:ac:6ada:eb8b:582d:d397:b6fc/64 scope global dynamic mngtmpaddr noprefixroute 
       valid_lft 259184sec preferred_lft 172784sec
    inet6 fe80::e9cd:2a2c:8a41:20c0/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever



``` 

<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# ubutu set ipv4 on lan card

set static ip an allow all filewall
IP=172.25.99.60
MASK=255.255.255.240
GW=172.25.99.62
step by step and allow all

Here is a step-by-step guide to set a static IPv4 address on your LAN card in Ubuntu and allow all firewall traffic:

### Set Static IPv4 on LAN Card in Ubuntu Using Netplan (CLI)

1. Identify your network interface name:

```bash
ip a
```

Look for your LAN card interface (e.g., eth0, ens33).
2. Edit the netplan configuration file (the filename may vary, for example `/etc/netplan/00-installer-config.yaml` or `/etc/netplan/01-netcfg.yaml`):

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

3. Modify the configuration to use static IP with your details:

```yaml
network:
  version: 2
  ethernets:
    INTERFACE_NAME:
      addresses:
        - 172.25.99.60/28
      gateway4: 172.25.99.62
      dhcp4: no
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]  # You can adjust DNS as needed
```

Replace `INTERFACE_NAME` with your actual network interface name. Note the netmask 255.255.255.240 corresponds to `/28`.
4. Save the file (Ctrl+X, then Y, then Enter).
5. Apply the configuration:

```bash
sudo netplan apply
```

6. Verify the IP address is set:

```bash
ip a
```


### Allow All Firewall Traffic Using UFW (Uncomplicated Firewall)

1. Allow all incoming traffic:

```bash
sudo ufw default allow incoming
```

2. Allow all outgoing traffic:

```bash
sudo ufw default allow outgoing
```

3. Enable UFW if not already enabled:

```bash
sudo ufw enable
```

4. Verify the firewall status:

```bash
sudo ufw status verbose
```


This configuration sets a static IP of 172.25.99.60 with netmask 255.255.255.240 (CIDR /28) and gateway 172.25.99.62 on your LAN card and allows all firewall traffic in and out on your Ubuntu system.

If you want a more secure firewall setup afterward, you can customize it with individual rules.

Let me know if you want the equivalent GUI steps or more firewall customization options.[^1_1][^1_2][^1_3][^1_4]
<span style="display:none">[^1_10][^1_11][^1_5][^1_6][^1_7][^1_8][^1_9]</span>

<div style="text-align: center">⁂</div>

[^1_1]: https://www.eukhost.com/kb/how-to-configure-a-static-ip-address-in-ubuntu/

[^1_2]: https://linuxconfig.org/setting-a-static-ip-address-in-ubuntu-24-04-via-the-command-line

[^1_3]: https://www.hostinger.com/tutorials/how-to-configure-firewall-on-ubuntu-using-ufw

[^1_4]: https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands

[^1_5]: https://www.freecodecamp.org/news/setting-a-static-ip-in-ubuntu-linux-ip-address-tutorial/

[^1_6]: https://www.youtube.com/watch?v=WKbt2ApQzjU

[^1_7]: https://openvpn.net/as-docs/tutorials/tutorial--static-ip-on-ubuntu.html

[^1_8]: https://documentation.ubuntu.com/server/explanation/networking/configuring-networks/

[^1_9]: https://www.cherryservers.com/blog/how-to-configure-ubuntu-firewall-with-ufw

[^1_10]: https://shape.host/resources/mastering-network-configuration-on-ubuntu-22-04-dhcp-and-static-ip-setup-for-single-and-multiple-nics

[^1_11]: https://www.cyberciti.biz/faq/how-to-set-up-ufw-firewall-on-ubuntu-24-04-lts-in-5-minutes/



# ubuntu install ssh
- sudo apt update && sudo apt upgrade -y
- sudo apt install openssh-server -y
- sudo systemctl enable --now ssh
- sudo systemctl status ssh
- sudo ufw allow ssh
- sudo ufw enable
- sudo nano /etc/ssh/sshd_config
- sudo systemctl restart ssh
- 
- 
- 