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


/*****************/
/* สีและสถานะต่างๆ */
.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    box-shadow: 0 0 6px #06402B;
}

.text-dark-green {
    color: #06402B !important;
}

.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-dark-red .status-indicator-circle {
    background: #8B0000 !important;
    box-shadow: 0 0 6px #8B0000;
}

.text-success {
    color: #28a745 !important;
}

.text-dark-red {
    color: #8B0000 !important;
}

/* FAN Animation */
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.windmill-spin {
    animation: spin 1s linear infinite;
    transform-origin: 50% 50%;
}

/* Bell Animation */
@keyframes bell-ring-fast {
    0% {
        transform: rotate(0deg);
    }

    10% {
        transform: rotate(-20deg);
    }

    20% {
        transform: rotate(15deg);
    }

    30% {
        transform: rotate(-12deg);
    }

    40% {
        transform: rotate(8deg);
    }

    50% {
        transform: rotate(-6deg);
    }

    60% {
        transform: rotate(3deg);
    }

    70% {
        transform: rotate(-2deg);
    }

    80% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(0deg);
    }
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
    animation:
        bell-ring-fast 0.3s cubic-bezier(.36, .07, .19, .97) infinite,
        bell-flash 0.6s linear infinite;
    transform-origin: 50% 10%;
}


/*****************/
</style>


<div class="border-top my-4"></div>
<?php 
$segment1 = $this->uri->segment(1);
$segment2 = $this->uri->segment(2);
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
    $j = 1; 
    foreach ($payload as $key => $value) {
        $mqtt_id = $value['mqtt_id'];
        $mqtt_name = $value['mqtt_name']; 
        $bucket = $value['bucket'];
    ?>
    <div class="col-sm-6 col-lg-3 mb-4">
        <div class="card bg-dark text-light shadow-sm border-0">
            <div class="card-body pb-2">
                <!-- Header -->
                <div class="d-flex align-items-center mb-2">
                    <div class="flex-grow-1">
                        <span id="sensor_name_<?php echo $j;?>" class="fw-bold"><?php echo $mqtt_name;?></span>
                        <a href="<?php echo base_url('dashboard/dashboard3').'?bucket='.$bucket; ?>"
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
                                    href="<?php echo base_url('dashboard/dashboard3').'?bucket='.$bucket; ?>">Main</a>
                                <a class="dropdown-item"
                                    href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>">Details</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Status Section -->
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
            <!-- Chart Area -->
            <div id="chart_temperature_<?php echo $j;?>" class="position-relative rounded-bottom chart-sm"></div>
        </div>
    </div>
    <!-- JavaScript for this specific card -->
    <script>
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
                document.getElementById(`alarm${id}_dot_container_${j}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="currentColor"
                                                    class="icon icon-tabler icons-tabler-filled icon-tabler-bell-ringing bell-animate-flash">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path fill="#FF0000" stroke="#000" d="M17.451 2.344a1 1 0 0 1 1.41 -.099a12.05 12.05 0 0 1 3.048 4.064a1 1 0 1 1 -1.818 .836a10.05 10.05 0 0 0 -2.54 -3.39a1 1 0 0 1 -.1 -1.41z"/>
                                                    <path fill="#FF0000" stroke="#000" d="M5.136 2.245a1 1 0 0 1 1.312 1.51a10.05 10.05 0 0 0 -2.54 3.39a1 1 0 1 1 -1.817 -.835a12.05 12.05 0 0 1 3.045 -4.065z"/>
                                                    <path fill="#FF0000" stroke="#000" d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"/>
                                                    <path fill="#FF0000" stroke="#000" d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"/>
                                                </svg>`;
            } else {
                container.innerHTML = `<svg id="alarm${id}_dot_${j}" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none"
                                        class="icon icon-tabler icons-tabler-filled icon-tabler-sun-high">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path fill="#00d97e" d="M12 19a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1m-4.95 -2.05a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m11.314 0l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m-5.049 -9.836a5 5 0 1 1 -2.532 9.674a5 5 0 0 1 2.532 -9.674m-9.315 3.886a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm18 0a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm-16.364 -6.778l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m14.142 0a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m-7.778 -3.222a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1" />
                                    </svg> `;
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
                    // format: 'dd MMM yyyy HH:mm:ss'
                    format: 'yyyy-MM-dd HH:mm:ss'
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
                    format: 'HH:mm :ss'
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

        // Initial call and set interval
        fetchAndUpdateData();
        setInterval(fetchAndUpdateData, updateInterval);
    });
    </script>
    <?php $j++; } // end foreach ?>
</div>
<?php } ?>