<style>
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

#chart-temperature-<?php echo $a;

?> {
    margin: 0 auto;
    display: block;
}

.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
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
                            class="text-warning fw-bold ms-2" style="font-size:0.8rem;">
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
                            <svg id="fan_<?php echo $j;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path id="fan_<?php echo $j;?>_windmill_path" class="isFanOn ? 'windmill-spin' : ''"
                                    style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
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
                                <path id="fan2_<?php echo $j;?>_windmill_path" class="isFanOn ? 'windmill-spin' : ''"
                                    style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                    d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                            </svg>
                            <div class="small mt-1">FAN 2: <span id="fan2_status_<?php echo $j;?>"
                                    class="fw-bold text-success">On</span></div>
                        </div>
                    </div>
                    <!-- Alarm 1 -->
                    <div class="col-6">
                        <div class="d-flex flex-column align-items-center">
                            <!-- <span id="alarm1_dot_<?php echo $j;?>" class="status-indicator status-green mb-1"><span
                                    class="status-indicator-circle"></span></span> -->
                            <svg id="alarm1_dot_<?php echo $j;?>" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="currentColor"
                                class="icon icon-tabler icons-tabler-filled icon-tabler-sun-high">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M12 19a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1m-4.95 -2.05a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m11.314 0l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m-5.049 -9.836a5 5 0 1 1 -2.532 9.674a5 5 0 0 1 2.532 -9.674m-9.315 3.886a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm18 0a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm-16.364 -6.778l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m14.142 0a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m-7.778 -3.222a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1" />
                            </svg>

                            <div class="small">Alarm 1: <span id="alarm1_status_<?php echo $j;?>"
                                    class="fw-bold text-success">Normal</span></div>
                        </div>
                    </div>
                    <!-- Alarm 2 -->
                    <div class="col-6">
                        <div class="d-flex flex-column align-items-center">
                            <!-- <span id="alarm2_dot_<?php echo $j;?>" class="status-indicator status-green mb-1"><span
                                    class="status-indicator-circle"></span></span> -->
                            <svg id="alarm2_dot_<?php echo $j;?>" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="currentColor"
                                class="icon icon-tabler icons-tabler-filled icon-tabler-sun-high">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M12 19a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1m-4.95 -2.05a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m11.314 0l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m-5.049 -9.836a5 5 0 1 1 -2.532 9.674a5 5 0 0 1 2.532 -9.674m-9.315 3.886a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm18 0a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm-16.364 -6.778l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m14.142 0a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m-7.778 -3.222a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1" />
                            </svg>

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
    /********************************************************/
    document.addEventListener("DOMContentLoaded", function() {
        var cardIndex = <?php echo json_encode($j); ?>;
        var bucket = <?php echo json_encode($bucket); ?>;
        var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        var apiBaseUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        var updateInterval = <?php echo json_encode($this->config->item('api_call_time_mqtt')); ?>;
        let tempChart;

        function setFanStatus(fanNum, status) {
            const path = document.getElementById(`fan${fanNum}_${cardIndex}_windmill_path`);
            const icon = document.getElementById(`fan${fanNum}_${cardIndex}_windmill_icon`);
            const text = document.getElementById(`fan${fanNum}_status_${cardIndex}`);
            if (status == 1) {
                path?.classList.replace('text-dark-green', 'text-success');
                icon?.classList.add('windmill-spin');
                text?.classList.replace('text-dark-green', 'text-success');
                text.textContent = 'On';
            } else {
                path?.classList.replace('text-success', 'text-dark-green');
                icon?.classList.remove('windmill-spin');
                text?.classList.replace('text-success', 'text-dark-green');
                text.textContent = 'Off';
            }
        }

        function setAlarmStatus(alarmNum, status) {
            const dot = document.getElementById(`alarm${alarmNum}_dot_${cardIndex}`);
            const text = document.getElementById(`alarm${alarmNum}_status_${cardIndex}`);
            dot?.setAttribute('fill', status == 1 ? '#00d97e' : '#ff0000');
            text?.classList.remove('text-success', 'text-dark-red');
            text?.classList.add(status == 1 ? 'text-success' : 'text-dark-red');
            text.textContent = status == 1 ? 'Normal' : 'Alarm';
        }
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
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const result = await response.json();
                const data = result.mqtt;
                const chartInfo = result.chart;

                document.getElementById(`temperature_${cardIndex}`).textContent = data.temperature;
                document.getElementById(`time_${cardIndex}`).textContent = data.timestamp;
                setFanStatus(1, data.fan1);
                setFanStatus(2, data.fan2);
                setAlarmStatus(1, data.overFan1);
                setAlarmStatus(2, data.overFan2);

                if (tempChart && chartInfo && chartInfo.data && chartInfo.date) {
                    const seriesData = chartInfo.date.map((ts, idx) => ({
                        x: new Date(ts).getTime(),
                        y: chartInfo.data[idx]
                    }));
                    tempChart.updateSeries([{
                        name: result.datamqtt['0']?.bucket || 'Temperature',
                        data: seriesData
                    }]);
                }
            } catch (error) {
                console.error(`Could not fetch data for card ${cardIndex} (Bucket: ${bucket}):`, error);
            }
        }
        /********************************************************/
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
                    'color-mix(in srgb, transparent, var(--tblr-primary) 80%)',
                    'color-mix(in srgb, transparent, var(--tblr-primary) 70%)',
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
        /********************************************************/
        tempChart = new ApexCharts(document.getElementById(`chart_temperature_${cardIndex}`), options);
        tempChart.render();
        /********************************************************/
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