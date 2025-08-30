<!-- paste.txt -->
<style>
/* ... (CSS เดิมของคุณสำหรับ status-green และ status-red) ... */

/* เพิ่มคลาสนี้สำหรับสีเขียวเข้ม */
.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    /* Hex code สำหรับ Dark Green */
    box-shadow: 0 0 6px #06402B;
}

/* หากต้องการให้ข้อความสีเขียวเข้มด้วย (คล้าย text-muted แต่เป็นเขียวเข้ม) */
.text-dark-green {
    color: #06402B !important;
}

.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    /* สีเขียว */
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

/******************** */
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.windmill-spin {
    animation: spin 1s linear infinite;
    /* origin center for SVG */
    transform-origin: 50% 50%;
}
</style>

<div class="border-top my-4"></div>
<?php 
$segment1 = $this->uri->segment(1);
$segment2 = $this->uri->segment(2);
// ... (ไม่จำเป็นต้องประกาศ segment ทั้ง 10 ตัว ถ้าไม่ได้ใช้)

// --- ส่วนของการดึงข้อมูลจาก API สำหรับสร้างการ์ด ---
$token = $_SESSION['token'];
$api_call = $this->config->item('api_url') . 'mqtt/fan';
$rsapi = $this->Crul_model->call_api_with_token($api_call, $token);

if ($rsapi['code'] != 200) {
    // echo 'Error: Could not retrieve initial data from API.'; 
   
}

$payload = $rsapi['payload'];
if ($payload) {
?>
<div class="row">
    <?php
    // FIX 1: ย้ายการกำหนดค่า $j มาไว้นอก loop และเริ่มต้นที่ 1
    $j = 1; 
    foreach ($payload as $key => $value) {
        // ดึงข้อมูลพื้นฐานสำหรับสร้างการ์ดแต่ละใบ
        $mqtt_id = $value['mqtt_id'];
        $mqtt_name = $value['mqtt_name']; 
        $bucket = $value['bucket'];
    ?>

    <div class="col-sm-6 col-lg-3 mb-4">
        <div class="card bg-dark text-light shadow-sm border-0">
            <div class="card-body pb-2">
                <!-- Header: Sensor name & Temp -->
                <div class="d-flex align-items-center mb-2">
                    <div class="flex-grow-1">
                        <span id="sensor_name_<?php echo $j;?>" class="fw-bold"><?php echo $mqtt_name;?></span>
                        <a href="<?php echo base_url('dashboard/dashboard2').'?bucket='.$bucket; ?>"
                            class="text-warning fw-bold ms-2" style="font-size:1.1rem;">
                            <span id="temperature_<?php echo $j;?>">--</span>°C
                        </a>
                    </div>
                    <div>
                        <div class="dropdown">
                            <a class="dropdown-toggle text-secondary small" href="#" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">View</a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item active"
                                    href="<?php echo base_url('dashboard/dashboard2').'?bucket='.$bucket; ?>">Main</a>
                                <a class="dropdown-item"
                                    href="<?php echo base_url('settings/device').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>">Details</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Status Section -->
                <div class="row text-center mb-2">
                    <!-- FAN 1 -->
                    <div class="col-6 mb-2">
                        <div class="d-flex flex-column align-items-center">
                            <svg id="fan1_<?php echo $j;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path id="fan1_<?php echo $j;?>_windmill_path" class="text-green"
                                    style="margin-left:6px;"
                                    d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                            </svg>
                            <div class="small mt-1">FAN 1: <span id="fan1_status_<?php echo $j;?>"
                                    class="fw-bold text-success">On</span></div>
                        </div>
                    </div>
                    <!-- FAN 2 -->
                    <div class="col-6 mb-2">
                        <div class="d-flex flex-column align-items-center">
                            <svg id="fan2_<?php echo $j;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path id="fan2_<?php echo $j;?>_windmill_path" class="text-green"
                                    style="margin-left:6px;"
                                    d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                            </svg>
                            <div class="small mt-1">FAN 2: <span id="fan2_status_<?php echo $j;?>"
                                    class="fw-bold text-success">On</span></div>
                        </div>
                    </div>
                    <!-- Alarm 1 -->
                    <div class="col-6">
                        <div class="d-flex flex-column align-items-center">
                            <span id="alarm1_dot_<?php echo $j;?>" class="status-indicator status-green mb-1"><span
                                    class="status-indicator-circle"></span></span>
                            <div class="small">Alarm 1: <span id="alarm1_status_<?php echo $j;?>"
                                    class="fw-bold text-success">Normal</span></div>
                        </div>
                    </div>
                    <!-- Alarm 2 -->
                    <div class="col-6">
                        <div class="d-flex flex-column align-items-center">
                            <span id="alarm2_dot_<?php echo $j;?>" class="status-indicator status-green mb-1"><span
                                    class="status-indicator-circle"></span></span>
                            <div class="small">Alarm 2: <span id="alarm2_status_<?php echo $j;?>"
                                    class="fw-bold text-success">Normal</span></div>
                        </div>
                    </div>
                </div>

                <!-- Timestamp -->
                <div class="text-secondary text-end small mt-2">
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

        // FIX 2: เปลี่ยนตัวแปร $i และอื่นๆ ให้เป็น $j ทั้งหมด
        const cardIndex = <?php echo $j;?>;
        const bucket = '<?php echo $bucket;?>';
        const bearerToken = '<?php echo $_SESSION['token']; ?>';
        const apiBaseUrl = '<?php echo $this->config->item('api_url'); ?>';
        const updateInterval = <?php echo $this->config->item('api_call_time_mqtt'); ?>;

        let tempChart;

        function updateFanStatus(dotId, textId, value) {
            const allDotClasses = 'status-green status-dark-green status-dark-red status-red';
            const allTextClasses = 'text-success text-dark-green text-dark-red text-danger';

            if (value == 1) {
                $('#' + dotId).removeClass(allDotClasses).addClass('status-green');
                $('#' + textId).removeClass(allTextClasses).addClass('text-success').text('On');
            } else {
                $('#' + dotId).removeClass(allDotClasses).addClass('status-dark-green');
                $('#' + textId).removeClass(allTextClasses).addClass('text-dark-green').text('Off');
            }
        }

        function updateAlarmStatus(dotId, textId, value) {
            const allDotClasses = 'status-green status-dark-green status-dark-red status-red';
            const allTextClasses = 'text-success text-dark-green text-dark-red text-danger';

            if (value == 1) {
                $('#' + dotId).removeClass(allDotClasses).addClass('status-green');
                $('#' + textId).removeClass(allTextClasses).addClass('text-success').text('Normal');
            } else {
                $('#' + dotId).removeClass(allDotClasses).addClass('status-dark-red');
                $('#' + textId).removeClass(allTextClasses).addClass('text-dark-red').text('Alarm');
            }
        }


        // --- Main function to fetch data and update UI (Card + Chart) ---
        // FIX 3: รวมการ fetch ข้อมูลสำหรับสถานะและกราฟไว้ในฟังก์ชันเดียวเพื่อประสิทธิภาพ
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
                const data = result.mqtt;
                const chartInfo = result.chart;

                // --- Update Card Statuses ---
                document.getElementById(`temperature_${cardIndex}`).textContent = data.temperature;
                document.getElementById(`time_${cardIndex}`).textContent = data.timestamp;

                // FIX 4: แก้ไขการเรียกฟังก์ชันและ ID ให้ถูกต้อง
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
                        name: result.datamqtt['0']?.bucket || 'Temperature',
                        data: seriesData
                    }]);
                }


                // อัปเดตสถานะ fan/alarm
                // FAN 1
                setFanStatus(`fan1_${cardIndex}`, data.fan1);
                // FAN 2
                setFanStatus(`fan2_${cardIndex}`, data.fan2);


            } catch (error) {
                console.error(`Could not fetch data for card ${cardIndex} (Bucket: ${bucket}):`, error);
            }
        }

        /********************************************************/
        function setFanStatus(fan, status) {
            var path = document.getElementById(fan + '_windmill_path');
            var icon = document.getElementById(fan + '_windmill_icon');
            var text = document.getElementById(fan + '_status_text'); // อาจไม่มี

            if (status == 1) {
                if (path) {
                    path.classList.remove('text-dark-green');
                    path.classList.add('text-green');
                }
                if (icon) icon.classList.add('windmill-spin');
                if (text) {
                    text.classList.remove('text-dark-green');
                    text.classList.add('text-green');
                    text.textContent = 'ON';
                }
            } else {
                if (path) {
                    path.classList.remove('text-green');
                    path.classList.add('text-dark-green');
                }
                if (icon) icon.classList.remove('windmill-spin');
                if (text) {
                    text.classList.remove('text-green');
                    text.classList.add('text-dark-green');
                    text.textContent = 'OFF';
                }
            }
        }

        // --- Initialize ApexChart ---
        const options = {
            chart: {
                type: "area",
                fontFamily: 'inherit',
                height: 80,
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
                    'color-mix(in srgb, transparent, var(--tblr-primary) 16%)',
                    'color-mix(in srgb, transparent, var(--tblr-primary) 16%)',
                ],
                type: 'solid'
            },
            stroke: {
                width: 2,
                lineCap: "round",
                curve: "smooth",
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
                type: 'datetime', // เปลี่ยนจาก 'category' เป็น 'datetime'
                labels: {
                    datetimeUTC: false,
                    format: 'dd MMM HH:mm :ss',
                    // formatter: undefined // ให้ ApexCharts จัดการเอง
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

        tempChart = new ApexCharts(document.getElementById(`chart_temperature_${cardIndex}`), options);
        tempChart.render();

        // --- Initial call and set interval ---
        fetchAndUpdateData();
        setInterval(fetchAndUpdateData, updateInterval);
    });
    </script>
    <?php 
    // FIX 5: เพิ่มค่า $j หลังจากจบการทำงานของ 1 การ์ด
    $j++;
    } // end foreach
?>
</div> <!-- end .row -->
<?php 
} // end if ($payload)
?>

<!-- FIX 6: ย้าย Style มาไว้นอก Loop เพื่อไม่ให้สร้างซ้ำซ้อน -->
<style>
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

.chart-sm {
    min-height: 80px;
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




<?php /*?>

<span id="fan1_dot_<?php echo $j;?>" class="status-indicator status-red"><span class="status-indicator-circle"></span>

    เปลียนเป็น


    <svg id="fan1_<?php echo $j;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path id="fan1_<?php echo $j;?>_windmill_path" class="text-green" style="margin-left:6px;"
            d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
    </svg>




    <span id="fan2_dot_<?php echo $j;?>" class="status-indicator status-red"><span
            class="status-indicator-circle"></span>

        เปลียนเป็น

        <svg id="fan2_<?php echo $j;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path id="fan2_<?php echo $j;?>_windmill_path" class="text-green" style="margin-left:6px;"
                d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
        </svg>

        <?php */?>