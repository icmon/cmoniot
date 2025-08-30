<?php 
$a = 'a7';
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$bucket         = @$input['bucket'];
$token          = $_SESSION['token'];
$deletecache    = @$input['deletecache'];
$segment1       = $this->uri->segment(1);
$segment2       = $this->uri->segment(2);

$api_call = $this->config->item('api_url').'mqtt?bucket='.$bucket.'&deletecache='.$deletecache;
$rsapi = $this->Crul_model->call_api_with_token($api_call, $token);
if ($rsapi['code'] != 200) { /* echo 'Error: Could not retrieve initial data from API.'; */ }
$payload         = $rsapi['payload'][0];
$mqtt_name       = $payload['mqtt_name'];
$mqtt_bucket     = $payload['device'][0]['mqtt_bucket'];
$device_name     = $payload['device'][0]['device_name'];
$type_name       = $payload['device'][0]['type_name'];
$mqtt_id         = $payload['device'][0]['mqtt_id'];
$mqtt_data_value = $payload['device'][0]['mqtt_data_value'];
$bucket          = $mqtt_bucket; // สำคัญสำหรับ API ต่อไป
?>
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

.bell-animate-ring {
    animation: bell-ring-fast 1s cubic-bezier(.36, .07, .19, .97) both;
    transform-origin: 50% 8px;
    /* ปรับให้ใจกลางที่ก้านกระดิ่ง */
}

.bell-animate-flash {
    animation: bell-flash 1.5s linear infinite;
}
</style>

<div class="col-sm-4 col-lg-3">
    <div class="card">
        <div class="card-body pb-2">
            <div class="d-flex align-items-center mb-2">
                <div class="flex-grow-1">
                    <span id="device_cardtitle_<?php echo $a;?>" class="fw-semibold"
                        style="font-size:1rem;"><?php echo $mqtt_name; ?></span>
                </div>
                <div>
                    <div class="dropdown">
                        <a class="dropdown-toggle text-secondary small" href="#" data-bs-toggle="dropdown">View</a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item active"
                                href="<?php echo base_url('dashboard/dashboard3').'?bucket='.$bucket; ?>">Main</a>
                            <a class="dropdown-item"
                                href="<?php echo base_url('settings/device').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id; ?>">Details</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="chart-temperature-<?php echo $a;?>" class="position-relative rounded-bottom chart-sm"></div>
            <div class="row text-center mb-2">
                <!-- FAN 1 -->
                <div class="col-6 mb-2 d-flex flex-column align-items-center">
                    <span id="fan1_dot_<?php echo $a;?>" class="status-indicator"><span
                            class="status-indicator-circle"></span></span>
                    <a
                        href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id; ?>">
                        <svg id="fan1_<?php echo $a;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path id="fan1_<?php echo $a;?>_windmill_path" class="text-success"
                                style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                        </svg>
                    </a>
                    <span class="mt-1">FAN 1: <span id="fan1_status_<?php echo $a;?>"
                            class="fw-bold text-success">On</span></span>
                </div>
                <!-- FAN 2 -->
                <div class="col-6 mb-2 d-flex flex-column align-items-center">
                    <span id="fan2_dot_<?php echo $a;?>" class="status-indicator"><span
                            class="status-indicator-circle"></span></span>
                    <a
                        href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id; ?>">
                        <svg id="fan2_<?php echo $a;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path id="fan2_<?php echo $a;?>_windmill_path" class="text-success"
                                style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                        </svg>
                    </a>
                    <span class="mt-1">FAN 2: <span id="fan2_status_<?php echo $a;?>"
                            class="fw-bold text-success">On</span></span>
                </div>
                <!-- Alarm 1 -->
                <div class="col-6 d-flex flex-column align-items-center">
                    <span id="alarm1_dot_container_<?php echo $a;?>"></span>
                    <span>Alarm 1: <span id="alarm1_status_<?php echo $a;?>"
                            class="fw-bold text-success">Normal</span></span>
                </div>
                <!-- Alarm 2 -->
                <div class="col-6 d-flex flex-column align-items-center">
                    <span id="alarm2_dot_container_<?php echo $a;?>"></span>
                    <span>Alarm 2: <span id="alarm2_status_<?php echo $a;?>"
                            class="fw-bold text-success">Normal</span></span>
                </div>
            </div>
            <div class="text-secondary text-end small mt-2">
                <span id="last-update-time">--:--:--</span> <span id="temperature_<?php echo $a;?>"
                    class="fw-bold text-warning ms-2" style="font-size:0.8rem;">--°C</span>
            </div>
        </div>
    </div>
</div>
<script>
var tempChart_<?php echo $a;?>;
var updateInterval = <?php echo json_encode($this->config->item('api_call_time_mqtt')); ?> || 5000;


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


function setAlarmStatus(alarmNum, status, suffix) {
    updateAlarmIcon(alarmNum, status, suffix);
    const text = document.getElementById(`alarm${alarmNum}_status_${suffix}`);
    if (!text) return;
    text.classList.remove('text-success', 'text-dark-red');
    text.classList.add(status == 1 ? 'text-success' : 'text-dark-red');
    text.textContent = status == 1 ? 'Normal' : 'Alarm';
}

function updateStatus_<?php echo $a;?>(dotId, textId, value) {
    // FAN: On = สีเขียว, Off = สีเขียวเข้ม
    var allDotClasses = 'status-green status-dark-green status-dark-red status-red';
    var allTextClasses = 'text-success text-dark-green text-dark-red text-danger';
    $('#' + dotId).removeClass(allDotClasses).addClass(value == 1 ? 'status-green' : 'status-dark-green');
    $('#' + textId).removeClass(allTextClasses).addClass(value == 1 ? 'text-success' : 'text-dark-green').text(value ==
        1 ? 'On' : 'Off');
}

function setFanWindmillIcon(fan, status) {
    var icon = document.getElementById(fan + '_windmill_icon');
    var path = document.getElementById(fan + '_windmill_path');
    if (icon) icon.classList[status == 1 ? 'add' : 'remove']('windmill-spin');
    if (path) {
        path.classList.remove('text-success', 'text-dark-green');
        path.classList.add(status == 1 ? 'text-success' : 'text-dark-green');
    }
}
async function fetchAndUpdate_<?php echo $a;?>() {
    var apiUrl = '<?php echo $this->config->item('api_url').'mqtt?bucket=';?><?php echo $bucket; ?>';
    var bearerToken = '<?php echo $_SESSION['token'];?>';
    try {
        var response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        var rs = await response.json();
        var data = rs.payload[0].mqtt;
        // FAN 1
        updateStatus_<?php echo $a;?>('fan1_dot_<?php echo $a;?>', 'fan1_status_<?php echo $a;?>', data.fan1);
        setFanWindmillIcon('fan1_<?php echo $a;?>', data.fan1);
        // FAN 2
        updateStatus_<?php echo $a;?>('fan2_dot_<?php echo $a;?>', 'fan2_status_<?php echo $a;?>', data.fan2);
        setFanWindmillIcon('fan2_<?php echo $a;?>', data.fan2);
        // ALARM 1
        setAlarmStatus(1, data.overFan1, '<?php echo $a;?>');
        // ALARM 2
        setAlarmStatus(2, data.overFan2, '<?php echo $a;?>');
        $('#last-update-time').text('Last : ' + (data.timestamp || '--:--:--'));
        $('#temperature_<?php echo $a;?>').text(typeof data.temperature !== "undefined" ? parseFloat(data
            .temperature).toFixed(2) + '°C' : '--°C');
        if (tempChart_<?php echo $a;?> && typeof data.temperature !== "undefined") {
            tempChart_<?php echo $a;?>.updateSeries([parseFloat(data.temperature)]);
        }
    } catch (error) {
        console.error("Could not fetch data:", error);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    tempChart_<?php echo $a;?> = new ApexCharts(document.getElementById('chart-temperature-<?php echo $a;?>'), {
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
    tempChart_<?php echo $a;?>.render();
    fetchAndUpdate_<?php echo $a;?>();
    setInterval(fetchAndUpdate_<?php echo $a;?>, updateInterval);
});
</script>