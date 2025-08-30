# Cmon IoT CI-with-HMVC
Setup HMVC and local session storage with Codeigniter 3

Modules are groups of independent components, typically model, controller and view, arranged in an application modules sub-directory that can be dropped into other Codeigniter applications. This allows easy distribution of independent components (MVC) in a single directory across other CodeIgniter applications

 ![theme](https://github.com/user-attachments/assets/d4715832-7613-423a-99c7-9b3360dc1b52)


# Updated for PHP 8
# 
# PHP Version 8.2.27
# redis
```bash

$('document').ready(function () {
 setInterval(function () {getRealData()}, 1000);//request every x seconds

 }); 

function getRealData() {
$.ajax({
         url: "number.php",
         type: "POST",
         data: {
             name: name
         },
         cache: false,
         success: function () {
             /// some code to get result
         }
     }
 }

# postgreSQL

1.First enable these two extensions
extension=php_pgsql.dll
extension=php_pdo_pgsql.dll
2.Then restart apache
3.Add $db['default']['port'] = 5432 in 

# sqlite
extension=php_pdo_sqlite.dll
extension=php_sqlite3.dll

-###############
- http://localhost/api/iot/getdevice?device=BAACTW02/DATA
- http://localhost/api/iot/devicemonitor?bucket=BAACTW02



        // Chart options (ApexCharts)
        const options = {
            chart: {
                type: "bar",
                fontFamily: 'inherit',
                height: 100,
                parentHeightOffset: 0,
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true
                },
                stacked: true,
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                colors: [
                    'color-mix(in srgb, transparent, var(--tblr-primary) 85%)',
                    'color-mix(in srgb, transparent, var(--tblr-primary) 95%)',
                ],
                type: 'solid'
            },
            stroke: {
                width: 2,
                lineCap: "round",
                curve: "smooth"
            },
            series: [{
                name: "",
                data: []
            }],
            tooltip: {
                theme: 'dark',
                x: {
                    format: 'dd MMM yyyy HH:mm :ss'
                }
            },
            grid: {
                padding: {
                    top: -20,
                    right: 0,
                    left: -4,
                    bottom: -4
                },
                strokeDashArray: 4,
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false,
                    format: 'dd MMM HH:mm :ss'
                },
                tooltip: {
                    enabled: true
                },
                axisBorder: {
                    show: true
                },
            },
            yaxis: {
                labels: {
                    padding: 4,
                    formatter: function(val) {
                        return val + " °C"
                    }
                }
            },
            legend: {
                show: true
            },
            colors: [
                'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
                'color-mix(in srgb, transparent, var(--tblr-red) 80%)'
            ]
        };

docker compose up --build -d



คำสั่ง	ผลลัพธ์
TRUNCATE TABLE table_name;	ลบข้อมูลทั้งหมดในตาราง
TRUNCATE TABLE table_name RESTART IDENTITY;	ลบข้อมูลและรีเซ็ต primary key (auto-increment)
TRUNCATE TABLE sd_iot_device RESTART IDENTITY CASCADE;	ลบข้อมูล, รีเซ็ต primary key และลบข้อมูลในตารางที่มี foreign key
TRUNCATE TABLE sd_iot_device RESTART IDENTITY CASCADE;
ALTER SEQUENCE sd_iot_device_device_id_seq RESTART WITH 1;

``` 
