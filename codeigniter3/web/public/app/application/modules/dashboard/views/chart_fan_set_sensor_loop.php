<!-- แทนที่ <hr> ด้วย div ที่มีคลาสสำหรับสร้างเส้นคั่นและระยะห่าง -->

<style>
/* CSS เดิมของคุณสำหรับสีเขียวและแดง */
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

/* 
  เพิ่ม 2 คลาสนี้เข้าไป 
  สำหรับสีเขียวเข้ม (Dark Green)
*/
.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    /* สีเขียวเข้ม */
    box-shadow: 0 0 6px #06402B;
}

.text-dark-green {
    color: #06402B !important;
    /* สีข้อความเขียวเข้ม */
}

.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    /* สีเขียวปกติ */
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    /* สีเขียวเข้ม */
    box-shadow: 0 0 6px #06402B;
}

.status-indicator.status-dark-red .status-indicator-circle {
    background: #8B0000 !important;
    /* สีแดงเข้ม */
    box-shadow: 0 0 6px #8B0000;
}

.text-success {
    color: #28a745 !important;
    /* ข้อความสีเขียว */
}

.text-dark-green {
    color: #06402B !important;
    /* ข้อความสีเขียวเข้ม */
}

.text-dark-red {
    color: #8B0000 !important;
    /* ข้อความสีแดงเข้ม */
}
</style>

<div class="border-top my-4"></div>
<?php 
// --- ส่วนของการดึงข้อมูลจาก API ---
$token = $_SESSION['token'];
$api_call = $this->config->item('api_url') . 'mqtt/fan';
$rsapi = $this->Crul_model->call_api_with_token($api_call, $token);
$code = $rsapi['code'];
if ($code != 200) {
    // echo 'Error data api'; 
    // die();
}
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
    <div class="col-md-3">
        <div class="card">
            <div class="card-header border-0">
                <div id="device_card_title_<?php echo $i; ?>" class="card-title">
                    <a href="<?php echo base_url('dashboard/dashboard1?bucket=').$bucket;?>">
                        <?php echo $mqtt_name; ?>
                    </a>

                </div>
                <div class="ms-auto lh-1">
                    <!-- ส่วนอื่นๆ ของคุณ -->
                    <div class="dropdown">
                        <a class="dropdown-toggle text-secondary small" href="#" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">View</a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item active"
                                href="<?php echo base_url('dashboard/dashboard1').'?bucket='.$bucket; ?>">Main</a>
                            <a class="dropdown-item"
                                href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>">Details</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="podium<?php echo $i;?>-status">
                <div class="row g-3 align-items-center mb-2">
                    <div class="col">
                        <div>
                            &nbsp;&nbsp; &nbsp;&nbsp;<span id="last-update-time-<?php echo $i; ?>"></span>
                            <!-- เพิ่ม ID ที่ไม่ซ้ำกัน -->
                        </div>
                    </div>
                </div>
                <div id="chart-temperature-<?php echo $i; ?>" style="max-width:220px;margin:30px auto 20px auto;">
                </div>

                <?php /********************************/ ?>
                <div class="row">
                    <!-- คอลัมน์ซ้าย: FAN 1 และ Alarm 1 -->
                    <div class="col-6">
                        <!-- FAN 1 -->
                        <div class="row g-3 align-items-center mb-3">
                            <div class="col-auto">
                                <span id="fan1_dot_<?php echo $i;?>"
                                    class="status-indicator status-red status-indicator-animated">
                                    <span class="status-indicator-circle"></span>
                                </span>
                            </div>
                            <div class="col">
                                <span>FAN 1</span>
                                <span id="fan1_status_<?php echo $i;?>" class="text-danger">OFF</span>
                            </div>
                        </div>
                        <!-- Alarm 1 -->
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <span id="alarm1_dot_<?php echo $i;?>"
                                    class="status-indicator status-red status-indicator-animated">
                                    <span class="status-indicator-circle"></span>
                                </span>
                            </div>
                            <div class="col">
                                <span>Alarm 1</span>
                                <span id="alarm1_status_<?php echo $i;?>" class="text-danger">OFF</span>
                            </div>
                        </div>
                    </div>

                    <!-- คอลัมน์ขวา: FAN 2 และ Alarm 2 -->
                    <div class="col-6">
                        <!-- FAN 2 -->
                        <div class="row g-3 align-items-center mb-3">
                            <div class="col-auto">
                                <span id="fan2_dot_<?php echo $i;?>"
                                    class="status-indicator status-red status-indicator-animated">
                                    <span class="status-indicator-circle"></span>
                                </span>
                            </div>
                            <div class="col">
                                <span>FAN 2</span>
                                <span id="fan2_status_<?php echo $i;?>" class="text-danger">OFF</span>
                            </div>
                        </div>
                        <!-- Alarm 2 -->
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <span id="alarm2_dot_<?php echo $i;?>"
                                    class="status-indicator status-red status-indicator-animated">
                                    <span class="status-indicator-circle"></span>
                                </span>
                            </div>
                            <div class="col">
                                <span>Alarm 2</span>
                                <span id="alarm2_status_<?php echo $i;?>" class="text-danger">OFF</span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php /********************************/ ?>
            </div>
        </div>
    </div> <!-- ปิด <div class="col-md-3"> -->
    <?php ##########################?>

    <script>
    // --- Script สำหรับการ์ดแต่ละใบ ---
    (function() {
        const cardIndex = <?php echo $i; ?>;
        const bucket = '<?php echo $bucket; ?>';


        function updateStatus_<?php echo $a;?>(dotId, textId, value) {
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

        function updateStatusAlarm_<?php echo $a;?>(dotId, textId, value) {
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

        function updateStatusAlarm2_<?php echo $a;?>(dotId, textId, value) {
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

                const rs = await response.json();
                const data = rs.payload[0].mqtt;
                const mqtt_name = rs.payload[0].mqtt_name;

                // Update UI elements for this specific card



                if (window['tempChart_' + cardIndex]) {
                    window['tempChart_' + cardIndex].updateSeries([data.temperature]);
                }
                // $('#last-update-time-' + cardIndex).text('Last : ' + data.timestamp.replace(':', ' '));
                $('#last-update-time-' + cardIndex).text('Last : ' + data.timestamp);
                updateStatusAlarm_<?php echo $a;?>('alarm1_dot_' + cardIndex, 'alarm1_status_' + cardIndex, data
                    .overFan1);
                updateStatusAlarm_<?php echo $a;?>('alarm2_dot_' + cardIndex, 'alarm2_status_' + cardIndex, data
                    .overFan2);
                updateStatus_<?php echo $a;?>('fan1_dot_' + cardIndex, 'fan1_status_' + cardIndex, data.fan1);
                updateStatus_<?php echo $a;?>('fan2_dot_' + cardIndex, 'fan2_status_' + cardIndex, data.fan2);

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