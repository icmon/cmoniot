<!-- แทนที่ <hr> ด้วย div ที่มีคลาสสำหรับสร้างเส้นคั่นและระยะห่าง -->
<style>
.status-indicator {
    display: inline-block;
    vertical-align: middle;
}

.status-indicator-circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
}

.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    box-shadow: 0 0 6px #06402B;
}

.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

.status-dark-red .status-indicator-circle {
    background: #8B0000 !important;
    box-shadow: 0 0 6px #8B0000;
}

.text-success {
    color: #28a745 !important;
}

.text-dark-green {
    color: #06402B !important;
}

.text-dark-red {
    color: #8B0000 !important;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.windmill-spin {
    animation: spin 1s linear infinite;
    transform-origin: 50% 50%;
}

#chart-temperature-<?php echo $a;

?> {
    margin: 0 auto;
    display: block;
}

.bell-animate {
    animation: bell-ring 1s infinite;
    transform-origin: 50% 8px;
}

@keyframes bell-ring {
    0% {
        transform: rotate(0);
    }

    10% {
        transform: rotate(-20deg);
    }

    20% {
        transform: rotate(18deg);
    }

    28% {
        transform: rotate(-12deg);
    }

    36% {
        transform: rotate(8deg);
    }

    44% {
        transform: rotate(-5deg);
    }

    50% {
        transform: rotate(0);
    }

    /* ตั้งแต่ 50% ถึง 100% ไม่ต้องขยับ (หยุดนิ่ง) */
    100% {
        transform: rotate(0);
    }
}
</style>


<div class="border-top my-4"></div>
<?php 
// --- ส่วนของการดึงข้อมูลจาก API ---
$token = $_SESSION['token'];
$ipi_call = $this->config->item('api_url') . 'mqtt/fan';
$rsapi = $this->Crul_model->call_api_with_token($ipi_call, $token);
$code = $rsapi['code'];
$payload = $rsapi['payload'];
if ($payload) {
?>
<!-- 1. เพิ่ม <div class="row"> เพื่อครอบการ์ดทั้งหมด -->
<div class="row">
    <?php
    $i = 1;
    foreach ($payload as $key => $value) {
        $mqtt_number = $i;
        $mqtt_id = $value['mqtt_id'];
        $mqtt_name = $value['mqtt_name']; 
        $org = $value['org'];
        $bucket = $value['bucket'];
        $mqtt_dada = $value['mqtt'];
        $device_name = $mqtt_dada['mqtt_dada'];
        $timestamp = $mqtt_dada['timestamp'];
        $temperature = $mqtt_dada['temperature'];
?>
    <?php #------------------------------# ?>
    <!-- 2. เปลี่ยนคลาสเป็น col-md-3 เพื่อให้แสดง 4 คอลัมน์ -->
    <div class="col-sm-4 col-lg-3">
        <div class="card">
            <div class="card-body pb-2">
                <div class="d-flex align-items-center mb-2">
                    <div class="flex-grow-1">
                        <span id="device_cardtitle_<?php echo $i;?>" class="fw-semibold"
                            style="font-size:1rem;"><?php echo $mqtt_name; ?></span>
                    </div>
                    <div>
                        <div class="dropdown">
                            <a class="dropdown-toggle text-secondary small" href="#" data-bs-toggle="dropdown">View</a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item active"
                                    href="<?php echo base_url('dashboard/dashboard1').'?bucket='.$bucket; ?>">Main</a>
                                <a class="dropdown-item"
                                    href="<?php echo base_url('settings/device').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id; ?>">Details</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="chart-temperature-<?php echo $i;?>" class="position-relative rounded-bottom chart-sm"></div>
                <div class="row text-center mb-2">
                    <!-- FAN 1 -->
                    <div class="col-6 mb-2 d-flex flex-column align-items-center">
                        <span id="fan1_dot_<?php echo $i;?>" class="status-indicator"><span
                                class="status-indicator-circle"></span></span>
                        <a
                            href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id; ?>">
                            <svg id="fan1_<?php echo $i;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                                height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path id="fan1_<?php echo $i;?>_windmill_path" class="text-success"
                                    style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                    d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                            </svg>
                        </a>
                        <span class="mt-1">FAN 1: <span id="fan1_status_<?php echo $i;?>"
                                class="fw-bold text-success">On</span></span>
                    </div>
                    <!-- FAN 2 -->
                    <div class="col-6 mb-2 d-flex flex-column align-items-center">
                        <span id="fan2_dot_<?php echo $i;?>" class="status-indicator"><span
                                class="status-indicator-circle"></span></span>
                        <a
                            href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id; ?>">
                            <svg id="fan2_<?php echo $i;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                                height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path id="fan2_<?php echo $i;?>_windmill_path" class="text-success"
                                    style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                    d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                            </svg>
                        </a>
                        <span class="mt-1">FAN 2: <span id="fan2_status_<?php echo $i;?>"
                                class="fw-bold text-success">On</span></span>
                    </div>
                    <!-- Alarm 1 -->
                    <div class="col-6 d-flex flex-column align-items-center">
                        <span id="alarm1_dot_container_<?php echo $i;?>"></span>
                        <span>Alarm 1: <span id="alarm1_status_<?php echo $i;?>"
                                class="fw-bold text-success">Normal</span></span>
                    </div>
                    <!-- Alarm 2 -->
                    <div class="col-6 d-flex flex-column align-items-center">
                        <span id="alarm2_dot_container_<?php echo $i;?>"></span>
                        <span>Alarm 2: <span id="alarm2_status_<?php echo $i;?>"
                                class="fw-bold text-success">Normal</span></span>
                    </div>
                </div>
                <div class="text-secondary text-end small mt-2">
                    <span id="last-update-time_<?php echo $j;?>">--:--:--</span> <span id="temperature_<?php echo $i;?>"
                        class="fw-bold text-warning ms-2" style="font-size:0.8rem;">--°C</span>
                </div>
            </div>
        </div>
    </div>
    <!-- ปิด <div class="col-md-3"> -->
    <?php ##########################?>

    <script>
    // --- Script สำหรับการ์ดแต่ละใบ ---
    (function() {
        const cardIndex = <?php echo $i; ?>;
        const bucket = '<?php echo $bucket; ?>';


        function updateStatus_<?php echo $i;?>(dotId, textId, value) {
            // กำหนดคลาสสีที่เป็นไปได้ทั้งหมดเพื่อการลบที่แน่นอน
            var allDotClasses = 'status-red status-green status-gray status-dark-green';
            var allTextClasses = 'text-danger text-success text-muted text-dark-green';

            if (value == 1) { // สถานะ On
                // ลบคลาสสีเก่าทั้งหมดออก แล้วจึงเพิ่มคลาสใหม่
                $('#' + dotId).removeClass(allDotClasses).addClass('status-green');
                $('#' + textId).removeClass(allTextClasses).addClass('text-success').text('On');
            } else { // สถานะ Off
                // ลบคลาสสีเก่าทั้งหมดออก แล้วจึงเพิ่มคลาสใหม่
                $('#' + dotId).removeClass(allDotClasses).addClass(
                    'status-dark-green'); // <--- แก้ไขจุดเป็นสีเขียวเข้ม
                $('#' + textId).removeClass(allTextClasses).addClass('text-dark-green').text(
                    'Off'); // <--- แก้ไขข้อความเป็นสีเขียวเข้ม
            }
        }

        function updateStatusAlarm_<?php echo $i;?>(dotId, textId, value) {
            // Alarm: Normal = สีเขียว, Alarm = สีแดงเข้ม
            var allDotClasses = 'status-green status-dark-green status-dark-red status-red';
            var allTextClasses = 'text-success text-dark-green text-dark-red text-danger';

            if (value == 1) {
                $('#' + dotId).removeClass(allDotClasses).addClass('status-green');
                $('#' + textId).removeClass(allTextClasses).addClass('text-success').text('Normal');
            } else {
                $('#' + dotId).removeClass(allDotClasses).addClass('status-dark-red');
                $('#' + textId).removeClass(allTextClasses).addClass('text-dark-red').text('Alarm');
            }
        }

        function updateStatusAlarm2_<?php echo $i;?>(dotId, textId, value) {
            if (value == 1) {
                $('#' + dotId).removeClass('status-red').addClass('status-green');
                $('#' + textId).removeClass('text-danger').addClass('text-success').text('Normal');
            } else {
                $('#' + dotId).removeClass('status-green').addClass('status-red');
                $('#' + textId).removeClass('text-success').addClass('text-danger').text('Alarm');
            }
        }
        async function fetchAndUpdate() {
            const apiUrl = '<?php echo $this->config->item('api_url').'mqtt?bucket='; ?>' + bucket;
            const bearerToken = '<?php echo $_SESSION['token']; ?>';

            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                var rs = await response.json();
                var payload = rs.payload;
                // console.log("rs data:");
                // console.info(rs);
                console.log("payload:");
                console.info(payload);
                // [0].mqtt.timestamp
                var data = payload[0].mqtt;
                var mqtt_name = payload[0].mqtt_name;
                var timestamp = payload[0].mqtt.timestamp;

                console.log("mqtt_name:" + mqtt_name);
                console.log("timestamp:" + timestamp);

                // Update UI elements for this specific card

                //  payload[0].mqtt.timestamp

                if (window['tempChart_' + cardIndex]) {
                    window['tempChart_' + cardIndex].updateSeries([data.temperature]);
                }
                // JSON.payload[0].mqtt.timestamp 
                $('#last-update-time_' + cardIndex).text('Last : ' + timestamp);
                updateStatusAlarm_<?php echo $i;?>('alarm1_dot_' + cardIndex, 'alarm1_status_' + cardIndex, data
                    .overFan1);
                updateStatusAlarm_<?php echo $i;?>('alarm2_dot_' + cardIndex, 'alarm2_status_' + cardIndex, data
                    .overFan2);
                updateStatus_<?php echo $i;?>('fan1_dot_' + cardIndex, 'fan1_status_' + cardIndex, data.fan1);
                updateStatus_<?php echo $i;?>('fan2_dot_' + cardIndex, 'fan2_status_' + cardIndex, data.fan2);

                // $('#device_card_title_' + cardIndex).text(mqtt_name);

                // สร้างลิงก์แบบไดนามิก
                const destinationUrl = '/devices/' + deviceId;
                const linkHtml = `<a href="${destinationUrl}">${mqtt_name}</a>`;

                // อัปเดต DOM
                $('#device_card_title_' + cardIndex).html(linkHtml);


            } catch (error) {
                console.error(`Could not fetch data for card ${cardIndex}:`, error);
            }
        }
        const updateInterval = <?php echo $this->config->item('api_call_time_mqtt'); ?>;
        document.addEventListener("DOMContentLoaded", function() {
            window['tempChart_' + cardIndex] = new ApexCharts(document.getElementById('chart-temperature-' +
                cardIndex), {
                chart: {
                    type: "radialBar",
                    height: 150,
                    sparkline: {
                        enabled: true
                    },
                    animations: {
                        enabled: true
                    }
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -180,
                        endAngle: 180,
                        hollow: {
                            margin: 50,
                            size: "50%"
                        },
                        dataLabels: {
                            show: true,
                            value: {
                                offsetY: -4,
                                fontSize: '20px',
                                formatter: val => val + "°C"
                            }
                        }
                    }
                },
                series: [0],
                labels: [""],
                tooltip: {
                    theme: 'dark'
                },
                grid: {
                    strokeDashArray: 10
                },
                colors: ['color-mix(in srgb, transparent, var(--tblr-primary) 100%)'],
                legend: {
                    show: false
                }
            });
            window['tempChart_' + cardIndex].render();

            fetchAndUpdate();
            setInterval(fetchAndUpdate, updateInterval); // updateInterval Sec
        });
    })();
    </script>

    <?php 
        $i++;
    } // --- จบ foreach loop ---
?>
</div> <!-- 3. ปิด <div class="row"> -->
<?php 
} // --- จบ if ($payload) ---
?>

<!-- Style ควรจะย้ายไปไว้ในไฟล์ CSS หลัก แต่สามารถวางไว้ที่นี่ได้ -->
<style>
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

.dashboard-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* สร้าง 4 คอลัมน์ */
    row-gap: 2px;
    /* เว้นระยะห่างระหว่างแถวในแนวสูง 2px */
    column-gap: 2px;
    /* เว้นระยะห่างระหว่างคอลัมน์ในแนวนอน 2px */
}

/* หรือใช้คำสั่งย่อ 'gap' */
.dashboard-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    /* เว้นระยะห่าง 2px ทั้งแนวตั้งและแนวนอน */
}
</style>