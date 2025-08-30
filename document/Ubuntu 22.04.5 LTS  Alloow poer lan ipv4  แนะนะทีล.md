<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Ubuntu 22.04.5 LTS  Alloow poer lan ipv4  แนะนะทีละขั้นตอน

enp2s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
inet 172.25.99.60  netmask 255.255.255.240  broadcast 172.25.99.63
inet6 fe80::13a4:eeb0:fe66:6d4  prefixlen 64  scopeid 0x20<link>
ether d8:9e:f3:9d:01:64  txqueuelen 1000  (Ethernet)
RX packets 408  bytes 24480 (24.4 KB)
RX errors 0  dropped 0  overruns 0  frame 0
TX packets 417  bytes 30351 (30.3 KB)
TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

เพื่อเปิดใช้งาน Power LAN หรือเปิดใช้งานการส่งต่อ IPv4 (IPv4 forwarding) บน Ubuntu 22.04.5 LTS ด้วยการตั้งค่าทีละขั้นตอน สามารถทำตามนี้ได้เลย:

## ขั้นตอนการเปิดใช้งาน IPv4 forwarding (Allow IPv4 forwarding)

1. เปิดไฟล์ sysctl.conf เพื่อตั้งค่าการส่งต่อ IPv4 ด้วยคำสั่ง:

```bash
sudo nano /etc/sysctl.conf
```

2. หาบรรทัดที่มีข้อความ

```
#net.ipv4.ip_forward=1
```

แล้วเอาเครื่องหมาย \# ออกให้เป็น

```
net.ipv4.ip_forward=1
```

3. บันทึกไฟล์และออกจาก nano (กด Ctrl+O แล้ว Enter เพื่อบันทึก จากนั้น Ctrl+X เพื่อออก)
4. โหลดค่าที่ตั้งใหม่ด้วยคำสั่ง:

```bash
sudo sysctl -p
```


## ขั้นตอนอนุญาตให้พอร์ตผ่านไฟร์วอลล์ (ตัวอย่างใช้ ufw)

1. อนุญาตพอร์ตที่ต้องการ เช่น จะอนุญาตพอร์ต 80 TCP และพอร์ตอื่น ๆให้ใช้งาน:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 51820/udp  # ตัวอย่างหากใช้ WireGuard VPN
```

2. ตรวจสอบสถานะไฟร์วอลล์ด้วยคำสั่ง:

```bash
sudo ufw status verbose
```


## การตรวจสอบและตั้งค่า IP ของ interface enp2s0

จากข้อมูลที่ให้มา interface enp2s0 มี IP เป็น 172.25.99.60/28 (netmask 255.255.255.240) อยู่แล้ว ซึ่งถ้าต้องการตั้งค่า static IP หรือแก้ไข สามารถทำได้โดยแก้ไขไฟล์ netplan:

1. เปิดไฟล์ netplan ที่อยู่ใน /etc/netplan เช่น:

```bash
sudo nano /etc/netplan/01-netcfg.yaml
```

2. ตั้งค่าตัวอย่าง static IP แบบนี้ (ปรับค่าให้ตรง subnet ของคุณ):

```yaml
network:
  version: 2
  ethernets:
    enp2s0:
      dhcp4: no
      addresses:
        - 172.25.99.60/28
      gateway4: 172.25.99.49  # แก้ตาม gateway ของเครือข่าย
      nameservers:
        addresses: [8.8.8.8,8.8.4.4]
```

3. บันทึกและรันคำสั่งเพื่อให้ netplan ใช้การตั้งค่า:

```bash
sudo netplan apply
```


สรุปสั้น ๆ คือ เปิดใช้งาน forwarding ในไฟล์ sysctl.conf, อนุญาตพอร์ตด้วย ufw ตามต้องการ และตั้งค่า IP ผ่าน netplan เพื่อใช้งาน Power LAN หรือให้อุปกรณ์อื่นผ่านได้ตาม IPv4

หากต้องการช่วยในส่วนใดเพิ่มเติมแจ้งได้ครับ[^1_1][^1_3][^1_7]
<span style="display:none">[^1_10][^1_2][^1_4][^1_5][^1_6][^1_8][^1_9]</span>

<div style="text-align: center">⁂</div>

[^1_1]: https://www.reddit.com/r/WireGuard/comments/1fm4kgh/just_bought_an_ubuntu_22045_lts_to_setup/

[^1_2]: https://opensource.cc.psu.ac.th/4/?4._Ubuntu_18.04_Server___%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1_vlan_interface_%E0%B8%9A%E0%B8%99_ubuntu_18.04_server

[^1_3]: https://linuxconfig.org/how-to-configure-static-ip-address-on-ubuntu-22-04-jammy-jellyfish-desktop-server

[^1_4]: https://forum.opnsense.org/index.php?topic=36205.0

[^1_5]: https://www.youtube.com/watch?v=fayx4jWqyWk

[^1_6]: https://forum.banana-pi.org/t/updating-a-fresh-ubuntu-22-04-image-bananapi-bpi-r3-router/15266

[^1_7]: https://canne.wordpress.com/2023/03/11/ubuntu-22-04lts-box-as-a-hotspot-for-ethernet/

[^1_8]: https://discourse.ubuntu.com/t/network-profile-hosting-setup/55372

[^1_9]: https://shape.host/resources/mastering-network-configuration-on-ubuntu-22-04-dhcp-and-static-ip-setup-for-single-and-multiple-nics

[^1_10]: https://community.toradex.com/t/how-to-configure-the-ethernet-interface/19371

