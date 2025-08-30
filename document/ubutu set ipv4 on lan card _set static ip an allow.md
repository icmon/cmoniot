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

