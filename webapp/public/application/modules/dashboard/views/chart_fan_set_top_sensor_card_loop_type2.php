<div class="border-top my-4"></div>
<?php
$segment1 = $this->uri->segment(1);
$segment2 = $this->uri->segment(2);

// --- ส่วนของการดึงข้อมูลจาก API สำหรับสร้างการ์ด ---
$token = $_SESSION['token'];
$api_call = $this->config->item('api_url') . 'mqtt/fan';
$rsapi = $this->Crul_model->call_api_with_token($api_call, $token);

if ($rsapi['code'] != 200) {
    // echo '<div class="alert alert-danger" role="alert">Error: Could not retrieve initial data from API.</div>';
    
}

$payload = $rsapi['payload'];
if ($payload) {
?>
<div class="row">
    <?php
    $j = 1; // เริ่มต้น index สำหรับการ์ด
    foreach ($payload as $key => $value) {
        // ดึงข้อมูลพื้นฐานสำหรับสร้างการ์ดแต่ละใบ
        $mqtt_id = $value['mqtt_id'];
        $mqtt_name = $value['mqtt_name'];
        $bucket = $value['bucket'];
    ?>

    <!-- Card for sensor #<?php echo $j; ?> -->
    <div class="col-sm-6 col-lg-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                    <div class="subheader">
                        <span id="sensor_name_<?php echo $j;?>"><?php echo $mqtt_name;?></span>:
                        <a href="<?php echo base_url('dashboard/dashboard2').'?bucket='.$bucket; ?>">
                            <span id="temperature_<?php echo $j;?>">--</span>°C
                        </a>
                    </div>
                    <div class="ms-auto lh-1">
                        <div class="dropdown">
                            <a class="dropdown-toggle text-secondary" href="#" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">View</a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item active"
                                    href="<?php echo base_url('dashboard/dashboard2').'?bucket='.$bucket; ?>">Main</a>
                                <a class="dropdown-item"
                                    href="<?php echo base_url('dashboard/details').'?bucket='.$bucket; ?>">Details</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Status Indicators - กำหนดสถานะเริ่มต้นเป็นค่าพื้นฐาน หรือตามที่ต้องการ -->
                <div id="podium-status-<?php echo $j;?>">
                    <div class="row">
                        <!-- Left Column: FAN 1 & Alarm 1 -->
                        <div class="col-6">
                            <div class="row g-2 align-items-center mb-3">
                                <div class="col-auto">
                                    <!-- Initial state: Off (เขียวเข้ม) -->
                                    <span id="fan1_dot_<?php echo $j;?>" class="status-indicator status-dark-green">
                                        <span class="status-indicator-circle"></span>
                                    </span>
                                </div>
                                <div class="col">FAN 1: <strong id="fan1_status_<?php echo $j;?>"
                                        class="text-dark-green">Off</strong></div>
                            </div>
                            <div class="row g-2 align-items-center">
                                <div class="col-auto">
                                    <!-- Initial state: Alarm (แดงเข้ม) -->
                                    <span id="alarm1_dot_<?php echo $j;?>" class="status-indicator status-dark-red">
                                        <span class="status-indicator-circle"></span>
                                    </span>
                                </div>
                                <div class="col">Alarm 1: <strong id="alarm1_status_<?php echo $j;?>"
                                        class="text-dark-red">Alarm</strong></div>
                            </div>
                        </div>
                        <!-- Right Column: FAN 2 & Alarm 2 -->
                        <div class="col-6">
                            <div class="row g-2 align-items-center mb-3">
                                <div class="col-auto">
                                    <!-- Initial state: Off (เขียวเข้ม) -->
                                    <span id="fan2_dot_<?php echo $j;?>" class="status-indicator status-dark-green">
                                        <span class="status-indicator-circle"></span>
                                    </span>
                                </div>
                                <div class="col">FAN 2: <strong id="fan2_status_<?php echo $j;?>"
                                        class="text-dark-green">Off</strong></div>
                            </div>
                            <div class="row g-2 align-items-center">
                                <div class="col-auto">
                                    <!-- Initial state: Alarm (แดงเข้ม) -->
                                    <span id="alarm2_dot_<?php echo $j;?>" class="status-indicator status-dark-red">
                                        <span class="status-indicator-circle"></span>
                                    </span>
                                </div>
                                <div class="col">Alarm 2: <strong id="alarm2_status_<?php echo $j;?>"
                                        class="text-dark-red">Alarm</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Timestamp -->
                <div class="text-secondary text-end mt-2" style="font-size: 0.8rem;">
                    Last update: <span id="time_<?php echo $j;?>">--:--:--</span>
                </div>
            </div>
            <!-- Chart Area -->
            <div id="chart_temperature_<?php echo $j;?>" class="position-relative rounded-bottom chart-sm"></div>
        </div>
    </div>

    <!-- JavaScript for this specific card -->
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const cardIndex = <?php echo $j;?>;
        const bucket = '<?php echo $bucket;?>';
        const bearerToken = '<?php echo $_SESSION['token']; ?>';
        const apiBaseUrl = '<?php echo $this->config->item('api_url'); ?>';
        // ใช้ config item ของ PHP สำหรับ update interval
        const updateInterval =
            <?php echo $this->config->item('api_call_time_mqtt');?>; // แปลงเป็นมิลลิวินาที

        let tempChart; // ประกาศตัวแปร chart ใน scope ของการ์ด

        // --- Helper function to update Fan status (On/Off) ---
        function updateFanStatus(dotId, textId, value) {
            const dotEl = document.getElementById(dotId);
            const textEl = document.getElementById(textId);

            if (!dotEl || !textEl) {
                // console.error(`Element not found for dotId: ${dotId} or textId: ${textId}`);
                return;
            }

            // ลบคลาสสถานะและสีเดิมทั้งหมดออกก่อน เพื่อให้แน่ใจว่าไม่มีสีทับซ้อน
            dotEl.classList.remove('status-green', 'status-dark-green', 'status-red', 'status-dark-red',
                'status-indicator-animated');
            textEl.classList.remove('text-success', 'text-dark-green', 'text-danger', 'text-dark-red');

            if (value == 1) { // On (เขียว)
                dotEl.classList.add('status-green', 'status-indicator-animated');
                textEl.classList.add('text-success');
                textEl.textContent = 'On';
            } else { // Off (เขียวเข้ม)
                dotEl.classList.add('status-dark-green');
                textEl.classList.add('text-dark-green');
                textEl.textContent = 'Off';
            }
        }

        // --- Helper function to update Alarm status (Normal/Alarm) ---
        function updateAlarmStatus(dotId, textId, value) {
            const dotEl = document.getElementById(dotId);
            const textEl = document.getElementById(textId);

            if (!dotEl || !textEl) {
                // console.error(`Element not found for dotId: ${dotId} or textId: ${textId}`);
                return;
            }

            // ลบคลาสสถานะและสีเดิมทั้งหมดออกก่อน
            dotEl.classList.remove('status-green', 'status-dark-green', 'status-red', 'status-dark-red',
                'status-indicator-animated');
            textEl.classList.remove('text-success', 'text-dark-green', 'text-danger', 'text-dark-red');

            if (value == 1) { // Normal (เขียว)
                dotEl.classList.add('status-green', 'status-indicator-animated');
                textEl.classList.add('text-success');
                textEl.textContent = 'Normal';
            } else { // Alarm (แดงเข้ม)
                dotEl.classList.add('status-dark-red');
                textEl.classList.add('text-dark-red');
                textEl.textContent = 'Alarm';
            }
        }

        // --- Main function to fetch data and update UI (Card + Chart) ---
        async function fetchAndUpdateData() {
            try {
                const apiUrl = `${apiBaseUrl}mqtt/mqttsenserchart?bucket=${bucket}`;
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

                const result = await response.json();
                const data = result.mqtt; // ข้อมูลสถานะล่าสุด
                const chartInfo = result.chart; // ข้อมูลสำหรับกราฟ

                // --- Update Card Statuses ---
                document.getElementById(`temperature_${cardIndex}`).textContent = data.temperature;
                document.getElementById(`time_${cardIndex}`).textContent = data.timestamp;

                updateFanStatus(`fan1_dot_${cardIndex}`, `fan1_status_${cardIndex}`, data.fan1);
                updateFanStatus(`fan2_dot_${cardIndex}`, `fan2_status_${cardIndex}`, data.fan2);
                updateAlarmStatus(`alarm1_dot_${cardIndex}`, `alarm1_status_${cardIndex}`, data.overFan1);
                updateAlarmStatus(`alarm2_dot_${cardIndex}`, `alarm2_status_${cardIndex}`, data.overFan2);

                // --- Update Chart ---
                if (tempChart && chartInfo && chartInfo.data && chartInfo.date) {
                    const seriesData = chartInfo.date.map((ts, index) => ({
                        x: new Date(ts).getTime(),
                        y: chartInfo.data[index]
                    }));

                    tempChart.updateSeries([{
                        name: result.datamqtt[0]?.bucket ||
                            'Temperature', // ใช้ชื่อ bucket จาก datamqtt หรือ 'Temperature'
                        data: seriesData
                    }]);
                }

            } catch (error) {
                console.error(`Could not fetch data for card ${cardIndex} (Bucket: ${bucket}):`, error);
                // แสดงสถานะ "N/A" หรือข้อความ Error หากโหลดข้อมูลไม่ได้
                document.getElementById(`temperature_${cardIndex}`).textContent = 'N/A';
                document.getElementById(`time_${cardIndex}`).textContent = 'Error';
                // อาจเปลี่ยนสถานะเป็นสีเทา หรือสีแดง เพื่อบ่งชี้ปัญหา
                updateFanStatus(`fan1_dot_${cardIndex}`, `fan1_status_${cardIndex}`, -
                    1); // -1 เป็นค่าที่บ่งชี้ Error
                updateFanStatus(`fan2_dot_${cardIndex}`, `fan2_status_${cardIndex}`, -1);
                updateAlarmStatus(`alarm1_dot_${cardIndex}`, `alarm1_status_${cardIndex}`, -1);
                updateAlarmStatus(`alarm2_dot_${cardIndex}`, `alarm2_status_${cardIndex}`, -1);
            }
        }

        // --- Initialize ApexChart ---
        const options = {
            chart: {
                type: 'bar',
                height: 50,
                background: 'transparent',
                toolbar: {
                    show: false
                },
                parentHeightOffset: 0,
                sparkline: {
                    enabled: true
                }
            },
            series: [{
                name: 'Temperature',
                data: [] // ข้อมูลจะถูกอัปเดตเมื่อ fetch data
            }],
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    borderRadius: 0,
                    distributed: false,
                    endingShape: 'flat'
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'datetime',
                categories: [],
                labels: {
                    datetimeUTC: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                show: false
            },
            grid: {
                show: false
            },
            tooltip: {
                theme: 'dark',
                x: {
                    format: 'dd MMM yyyy HH:mm:ss'
                },
                y: {
                    formatter: function(value) {
                        return value + ' °C';
                    }
                }
            },
            colors: [
                'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
                'color-mix(in srgb, transparent, var(--tblr-red) 80%)'
            ],
            legend: {
                show: false
            },
            fill: {
                opacity: 1
            }
        };

        tempChart = new ApexCharts(document.getElementById(`chart_temperature_${cardIndex}`), options);
        tempChart.render();

        // --- Initial call and set interval ---
        fetchAndUpdateData();
        setInterval(fetchAndUpdateData, updateInterval);
    });
    </script>
    <?php
    $j++; // เพิ่มค่า $j สำหรับการ์ดถัดไป
    } // end foreach
    ?>
</div> <!-- end .row -->
<?php
} // end if ($payload)
?>

<!-- FIX: ย้าย Style มาไว้นอก Loop เพื่อไม่ให้สร้างซ้ำซ้อน -->
<style>
/* CSS สำหรับจุดสถานะ */
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    /* เขียวเข้มสำหรับ FAN Off */
    box-shadow: 0 0 6px #06402B;
}

.status-indicator.status-red .status-indicator-circle {
    /* สำหรับสถานะอื่นๆ ที่ยังคงใช้สีแดงปกติ */
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

.status-indicator.status-dark-red .status-indicator-circle {
    background: #8B0000 !important;
    /* แดงเข้มสำหรับ Alarm */
    box-shadow: 0 0 6px #8B0000;
}

/* CSS สำหรับข้อความสถานะ */
.text-success {
    color: #28a745 !important;
    /* เขียวปกติ */
}

.text-dark-green {
    color: #06402B !important;
    /* เขียวเข้ม */
}

.text-danger {
    color: #dc3545 !important;
    /* แดงปกติ (อาจใช้สำหรับ Error หรือสถานะอื่นที่ไม่ใช่ Alarm) */
}

.text-dark-red {
    color: #8B0000 !important;
    /* แดงเข้ม */
}

/* อื่นๆ */
.chart-sm {
    min-height: 80px;
}
</style>