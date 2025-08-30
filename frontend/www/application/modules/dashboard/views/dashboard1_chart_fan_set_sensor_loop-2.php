<style>
/* ตัวอย่าง: สั้นๆ เฉพาะส่วนที่สำคัญ - สามารถรวม/ยุบ class ซ้ำซ้อนที่เกิดจาก merge ได้ */
.status-indicator {
    display: inline-block;
    vertical-align: middle;
}

.status-indicator-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
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

.text-green {
    color: rgb(4, 139, 4) !important;
}

/* Animation */
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.windmill-spin {
    animation: spin 1s linear infinite;
    transform-origin: 50% 50%;
}

@keyframes bell-ring {
    ...
    /* ตามเดิมในโค้ด */
}

.bell-animate {
    animation: bell-ring 1s infinite;
    transform-origin: 50% 8px;
}

@keyframes bell-ring-fast {
    ...
}

@keyframes bell-flash {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

.bell-animate-flash {
    animation: bell-ring-fast 0.3s cubic-bezier(.36, .07, .19, .97) infinite, bell-flash 0.6s linear infinite;
    transform-origin: 50% 10%;
}
</style>

<?php 
$segment1 = $this->uri->segment(1);
$segment2 = $this->uri->segment(2);
$token = $_SESSION['token'];
$api_call = $this->config->item('api_url') . 'mqtt/fan';
$rsapi = $this->Crul_model->call_api_with_token($api_call, $token);

if ($rsapi['code'] != 200) {  /* แสดง error ได้ถ้าต้องการ */ }
$payload = $rsapi['payload'];
if ($payload) {
?>
<div class="row">
    <?php
$j = 1;
foreach ($payload as $key => $value) {
    $mqtt_number = $j;
    $mqtt_id = $value['mqtt_id'];
    $mqtt_name = $value['mqtt_name'];
    $org = $value['org'];
    $bucket = $value['bucket'];
    $mqtt_dada = $value['mqtt'];
    $device_name = $mqtt_dada['mqtt_dada'];
    $timestamp = $mqtt_dada['timestamp'];
    $temperature = $mqtt_dada['temperature'];
?>
    <style>
    #chart-temperature-<?php echo $j;

    ?> {
        margin: 0 auto;
        display: block;
    }
    </style>
    <div class="col-sm-6 col-lg-3 mb-4">
        <div class="card bg-dark text-light shadow-sm border-0">
            <div class="card-body pb-2">
                <!-- Header -->
                <div class="d-flex align-items-center mb-2">
                    <div class="flex-grow-1">
                        <span id="sensor_name_<?php echo $j;?>" class="fw-bold"><?php echo $mqtt_name;?></span>
                        <a href="<?php echo base_url('dashboard/dashboard1').'?bucket='.$bucket; ?>"
                            class="text-warning fw-bold ms-2" style="font-size:0.9rem;">
                            <span id="temperature_<?php echo $j;?>">--</span>°C
                        </a>
                    </div>
                    <div>
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
                <!-- Status Section -->
                <div id="chart-temperature-<?php echo $j;?>" class="position-relative rounded-bottom chart-sm"></div>
                <div class="row text-center mb-2">
                    <!-- FAN 1 -->
                    <div class="col-6 mb-2">
                        <div class="d-flex flex-column align-items-center">
                            <a
                                href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>">
                                <svg id="fan1_<?php echo $j;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                    style="vertical-align: middle;">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path id="fan1_<?php echo $j;?>_windmill_path"
                                        style="margin-left:6px; fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                        d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                                </svg>
                            </a>
                            <div class="small mt-1">FAN 1: <span id="fan1_status_<?php echo $j;?>"
                                    class="fw-bold text-success">On</span></div>
                        </div>
                    </div>
                    <!-- FAN 2 -->
                    <div class="col-6 mb-2">
                        <div class="d-flex flex-column align-items-center">
                            <a
                                href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>">
                                <svg id="fan2_<?php echo $j;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                    style="vertical-align: middle;">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path id="fan2_<?php echo $j;?>_windmill_path"
                                        style="margin-left:6px; fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                        d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                                </svg>
                            </a>
                            <div class="small mt-1">FAN 2: <span id="fan2_status_<?php echo $j;?>"
                                    class="fw-bold text-success">On</span></div>
                        </div>
                    </div>
                    <!-- Alarm 1 -->
                    <div class="col-6">
                        <div class="d-flex flex-column align-items-center">
                            <span id="alarm1_dot_container_<?php echo $j;?>"></span>
                            <div class="small">Alarm 1: <span id="alarm1_status_<?php echo $j;?>"
                                    class="fw-bold text-success">Normal</span></div>
                        </div>
                    </div>
                    <!-- Alarm 2 -->
                    <div class="col-6">
                        <div class="d-flex flex-column align-items-center">
                            <span id="alarm2_dot_container_<?php echo $j;?>"></span>
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
            <div id="chart_temperature_<?php echo $j;?>" class="position-relative rounded-bottom chart-sm"></div>
        </div>
    </div>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        var cardIndex = <?php echo json_encode($j); ?>;
        var bucket = <?php echo json_encode($bucket); ?>;
        var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        var apiBaseUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        var updateInterval = <?php echo json_encode($this->config->item('api_call_time_mqtt')); ?>;
        let tempChart;

        async function setFanStatus(fanNum, status) {
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
        async function setAlarmStatus(alarmNum, status) {
            updateAlarmIcon(alarmNum, status, cardIndex);
            const text = document.getElementById(`alarm${alarmNum}_status_${cardIndex}`);
            text?.classList.remove('text-success', 'text-dark-red');
            text?.classList.add(status == 1 ? 'text-success' : 'text-dark-red');
            text.textContent = status == 1 ? 'Normal' : 'Alarm';
        }

        function updateAlarmIcon(id, status, j) {
            const container = document.getElementById(`alarm${id}_dot_container_${j}`);
            if (!container) return;
            if (status == 0) {
                container.innerHTML =
                    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ... class="bell-animate-flash">...</svg>`;
            } else {
                container.innerHTML = `<svg id="alarm${id}_dot_${j}" ... style="color:#00d97e;"></svg>`;
            }
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

        // Chart options
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
                colors: ['color-mix(in srgb, transparent, var(--tblr-primary) 16%)'],
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
                }
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
            colors: ['color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
                'color-mix(in srgb, transparent, var(--tblr-red) 80%)'
            ]
        };
        tempChart = new ApexCharts(document.getElementById(`chart_temperature_${cardIndex}`), options);
        tempChart.render();

        tempChart_<?php echo $j;?> = new ApexCharts(document.getElementById(
            'chart-temperature-<?php echo $j;?>'), {
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
                            formatter: function(val) {
                                return val + "°C";
                            }
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
        tempChart_<?php echo $j;?>.render();

        fetchAndUpdate_<?php echo $j;?>();
        setInterval(fetchAndUpdate_<?php echo $j;?>, updateInterval);

        // Initial call and set interval
        fetchAndUpdateData();
        setInterval(fetchAndUpdateData, updateInterval);
    });
    </script>
    <?php $j++; } // end foreach ?>
</div>
<?php } ?>