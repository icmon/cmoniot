<?php #################### ?>
<script type="text/javascript" src="<?php echo base_url('assets/sweetalert2/dist/js/jquery-latest.js');?>"></script>
<script src="<?php echo base_url('assets/sweetalert2/dist/sweetalert-dev.js');?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>">
<?php 
$apiCallInterval=$this->config->item('api_call_time');
if($apiCallInterval==''){
$apiCallInterval='5000';
} 
?>
<?php /**Using Storage*/?>
<style>
/* CSS Styles (Existing CSS provided in search results - no changes here unless specifically requested for styling) */
.table th,
.table td {
    width: auto;
}

.table th:nth-child(1) {
    width: 15%;
}

/* LOCATION */
.table th:nth-child(2) {
    width: 15%;
}

/* NAME */
.table th:nth-child(3) {
    width: 10%;
}

/* DATA */
.table th:nth-child(4) {
    width: 8%;
}

/* ALARM */
.table th:nth-child(5) {
    width: 8%;
}

/* FAN 1 */
.table th:nth-child(6) {
    width: 8%;
}

/* FAN 2 */
.table th:nth-child(7) {
    width: 20%;
}

/* DATE */
.table th:nth-child(8) {
    width: 16%;
}

/* Progress Bar */
.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
}

.status-indicator-animated {
    animation: pulse 2s infinite;
}

.text-green {
    color: rgb(4, 139, 4) !important;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.progress-xs {
    height: 8px;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
}

.tooltip-custom {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #555;
    font-family: inherit;
    line-height: 1.4;
}

.tooltip-custom div {
    margin-bottom: 2px;
}

.tooltip-custom div:last-child {
    margin-bottom: 0;
}

.card-body-scrollable::-webkit-scrollbar {
    width: 10px;
}

.card-body-scrollable::-webkit-scrollbar-thumb {
    background: #34495e;
    border-radius: 4px;
}

.card-body-scrollable::-webkit-scrollbar-thumb {
    background: #888;
    /* สีของ thumb */
    border-radius: 4px;
}

.card-body-scrollable::-webkit-scrollbar-thumb:hover {
    background: #4a5f7a;
}

table {
    overflow: visible;
}

/* ปรับแต่ง scrollbar ให้สวยงาม */
.table-responsive::-webkit-scrollbar {
    height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* ซ่อน scrollbar ที่ซ้ำซ้อน */
.datatable {
    overflow: visible !important;
}

/* สำหรับ responsive */
@media (max-width: 992px) {
    .table-responsive {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch;
        /* สำหรับ iOS */
    }

    .card-body-scrollable {
        overflow-x: auto !important;
    }
}

/* แก้ไข Sticky Header */
.table {
    border-collapse: separate;
    border-spacing: 0;
    position: relative;
}

.table thead th {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}

/* แก้ไข overflow ใน parent elements */
.card-body-scrollable {
    overflow: visible !important;
    position: relative;
}

.table-responsive {
    overflow-x: auto !important;
    overflow-y: visible !important;
    position: relative;
}

/* เพิ่มใน style section */
.table {
    border-collapse: separate;
    border-spacing: 0;
    position: relative;
    width: 100%;
}

.table thead th {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}

/* ... (CSS ที่มีอยู่แล้วใน paste.txt) ... */

/* เพิ่ม: สีเขียวเข้ม (สำหรับ FAN Off) */
.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    box-shadow: 0 0 6px #06402B;
}

/* เพิ่ม: สีแดงเข้ม (สำหรับ Alarm) */
.status-indicator.status-dark-red .status-indicator-circle {
    background: #8B0000 !important;
    box-shadow: 0 0 6px #8B0000;
}

/* เพิ่ม: Text Colors สำหรับสีเขียวเข้มและแดงเข้ม หากต้องการแสดงข้อความด้วย */
.text-dark-green {
    color: #06402B !important;
}

.text-dark-red {
    color: #8B0000 !important;
}

/* หากต้องการให้สถานะเริ่มต้นใน HTML เป็นสีเขียวเข้ม/แดงเข้ม */
/* ตรวจสอบว่า .status-indicator.status-green และ .status-indicator.status-red มีอยู่จริงและมีสีตามต้องการ */
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    /* เขียวปกติ */
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    /* แดงปกติ (ถ้าใช้สำหรับอื่นที่ไม่ใช่ Alarm) */
    box-shadow: 0 0 6px #fa5252;
}

/* เพิ่ม animation สำหรับจุดสถานะที่ active */
.status-indicator.status-indicator-animated {
    animation: pulse 2s infinite;
}



/* เพิ่มสำหรับขนาด chart-sm */
.chart-sm {
    min-height: 80px;
}

/*************************/
/************************/
.card {
    border-radius: 8px;
    overflow: hidden;
    /* เพิ่มโค้ดสำหรับ scroll bar และความสูง 80% */
    max-height: 80vh;
    /* กำหนดความสูงสูงสุด 80% ของ viewport height */
    overflow-y: auto;
    /* เปิดใช้งาน scroll bar แนวตั้งเมื่อเนื้อหาเกิน */
    overflow-x: hidden;
    /* ซ่อน scroll bar แนวนอน (ถ้าไม่ต้องการ) */
    padding: 0;
    /* ลบ padding เดิมที่อาจทำให้เกิด scrollbar โดยไม่จำเป็น */
    margin: 0;
    /* ลบ margin เดิมที่อาจทำให้เกิด scrollbar โดยไม่จำเป็น */
}

/* ยกเลิกการซ่อน scrollbar สำหรับ .card เพื่อให้ scrollbar แสดง */
.card::-webkit-scrollbar {
    display: block;
    /* Chrome, Safari, Opera */
    width: 18px;
    /* กำหนดความกว้างของ scroll bar */
}

.card {
    scrollbar-width: auto;
    /* Firefox - แสดง scroll bar */
    -ms-overflow-style: auto;
    /* IE และ Edge - แสดง scroll bar */
}

/* สไตล์อื่นๆ ยังคงเดิม */
.card-header {
    padding: 1rem 1.5rem;
    text-transform: uppercase;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}


/******************** */
@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

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

/**************/
.table thead th {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}

.table-responsive {
    max-height: 450px;
    overflow-y: auto;
}

.table thead th {
    position: sticky;
    top: 0;
    /* หรือสีพื้นหลังของคุณ */
    z-index: 100;
}

/* CSS สำหรับ Custom Scrollbar */
.table-container {
    /* max-height: 320px; */
    max-height: 90%;
    /* กำหนดความสูงสูงสุด */
    overflow-y: auto;
    /* เปิดใช้งาน scrollbar แนวตั้ง */

    border-radius: 0.375rem;
}

.table thead th {
    position: sticky;
    top: 0;
}

thead tr:first-child th {
    position: sticky;
    top: 0;
}

.fan-off {
    opacity: 0.5 !important;
    /* จางลง 50% */
}

.windmill-spin {
    animation: spin 1s linear infinite;
    transform-origin: 50% 50%;
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

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

/*****************/
.table th,
.table td {
    width: auto;
}

.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
}

.status-indicator-animated {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    box-shadow: 0 0 6px #06402B;
}

.status-indicator.status-dark-red .status-indicator-circle {
    background: #8B0000 !important;
    box-shadow: 0 0 6px #8B0000;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

.windmill-spin {
    animation: spin 1s linear infinite;
    transform-origin: 50% 50%;
}

.fan-off {
    opacity: 0.5 !important;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.bell-animate-flash {
    animation: bell-ring-fast 0.3s cubic-bezier(.36, .07, .19, .97) infinite, bell-flash 0.6s linear infinite;
    transform-origin: 50% 10%;
}

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

.card {
    height: 95rem;
}

/****************/
</style>
<div class="col-lg-5">
    <div class="row row-cards">
        <div class="col-12">
            <div class="card">
                <div class="card-body" style="height: 100%; overflow-y: auto;">
                    <div style="max-height: 750px; overflow-y: auto;">
                        <table
                            class="table table-selectable card-table table-vcenter text-nowrap datatable table-vcenter"
                            id="sensorTable" style="width:100%; border-collapse:collapse;">
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Time</th>
                                    <th>Temperature</th>
                                    <th>FAN 1</th>
                                    <th>Alarm 1</th>
                                    <th>FAN 2</th>
                                    <th>Alarm 2</th>
                                </tr>
                            </thead>
                            <tbody id="deviceTableBody">
                                <?php
                                $token = $_SESSION['token'];
                                $api_call = $this->config->item('api_url') . 'mqtt/fan';
                                $rsapi = $this->Crul_model->call_api_with_token($api_call, $token);

                                if (!isset($rsapi['code']) || $rsapi['code'] != 200) {
                                    //echo '<tr><td colspan="8" class="text-center">Error: Could not retrieve initial data from API. Please check API endpoint or token.</td></tr>';
                                } else {
                                    $payload = $rsapi['payload'];
                                    $sensor_buckets = [];
                                    $i = 1;
                                    foreach ($payload as $key => $value) {
                                        $mqtt_id = $value['mqtt_id'];
                                        $mqtt_name = $value['mqtt_name'];
                                        $bucket = $value['bucket'];
                                        $sensor_buckets[$i] = $bucket;
                                ?>
                                <tr id="row_<?php echo $i; ?>">
                                    <td id="location_<?php echo $i; ?>">
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket; ?>">
                                            <?php echo $mqtt_name; ?>
                                        </a>
                                    </td>
                                    <td id="name_<?php echo $i; ?>">
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket; ?>">
                                            <span id="date_time_<?php echo $i; ?>">--</span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket; ?>">
                                            <b id="temp_value_<?php echo $i; ?>">-- °C</b>
                                        </a>
                                    </td>
                                    <td> <a href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>"
                                            target="_blank">
                                            <svg id="fan1_<?php echo $i;?>_windmill_icon"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path id="fan1_<?php echo $i;?>_windmill_path"
                                                    style="margin-left:6px; fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                                    d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                                            </svg></a>
                                    </td>
                                    <td><a href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>"
                                            target="_blank">
                                            <span id="alarm1_dot_container_<?php echo $i; ?>"></span></a>
                                    </td>
                                    <td> <a href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>"
                                            target="_blank">
                                            <svg id="fan2_<?php echo $i;?>_windmill_icon"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path id="fan2_<?php echo $i;?>_windmill_path"
                                                    style="margin-left:6px; fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                                    d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                                            </svg></a>
                                    </td>
                                    <td><a href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>"
                                            target="_blank">
                                            <span id="alarm2_dot_container_<?php echo $i; ?>"></span></a>
                                    </td>
                                </tr>
                                <?php $i++; }} ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// กำหนด apiBaseUrl
const apiBaseUrl = '<?php echo $this->config->item('api_url'); ?>';

// ประกาศ sensor_buckets ที่ส่งมาจาก PHP
const sensorNames = <?php echo json_encode($sensor_buckets); ?>;

/**************************************/
async function fetchSensorData(sensorIndex, bucketName) {
    try {
        const bearerToken = '<?php echo $_SESSION['token']; ?>';
        const apiUrl = `${apiBaseUrl}mqtt/mqttsenserchart?bucket=${bucketName}`;
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
        if (result.code === 200 && data) {
            updateSensorRow(sensorIndex, data);
            // updateChart(sensorIndex, result); // ถ้ามีส่วนกราฟ
        }
    } catch (error) {
        // handle error
    }
}

function updateSensorRow(sensorIndex, data) {
    document.getElementById(`temp_value_${sensorIndex}`).textContent =
        data.temperature !== undefined ? `${data.temperature.toFixed(2)} °C` : `-- °C`;
    document.getElementById(`date_time_${sensorIndex}`).textContent =
        data.timestamp !== undefined ? data.timestamp : `--`;

    // FAN 1
    const fan1Dot = document.getElementById(`fan1_dot_${sensorIndex}`);
    if (fan1Dot && data.fan1 !== undefined) {
        fan1Dot.classList.remove('status-green', 'status-dark-green', 'status-indicator-animated');
        if (data.fan1 == 1) {
            fan1Dot.classList.add('status-green', 'status-indicator-animated');
        } else {
            fan1Dot.classList.add('status-dark-green');
        }
    }
    setFanStatus('fan1_' + sensorIndex, data.fan1);

    // FAN 2
    const fan2Dot = document.getElementById(`fan2_dot_${sensorIndex}`);
    if (fan2Dot && data.fan2 !== undefined) {
        fan2Dot.classList.remove('status-green', 'status-dark-green', 'status-indicator-animated');
        if (data.fan2 == 1) {
            fan2Dot.classList.add('status-green', 'status-indicator-animated');
        } else {
            fan2Dot.classList.add('status-dark-green');
        }
    }
    setFanStatus('fan2_' + sensorIndex, data.fan2);

    // Alarm 1
    updateAlarmIcon(1, data.overFan1, sensorIndex);

    // Alarm 2
    updateAlarmIcon(2, data.overFan2, sensorIndex);
}

function setFanStatus(fan, status) {
    var path = document.getElementById(fan + '_windmill_path');
    var icon = document.getElementById(fan + '_windmill_icon');
    if (icon) {
        if (status == 1) {
            icon.classList.remove('fan-off');
            icon.classList.add('windmill-spin');
        } else {
            icon.classList.remove('windmill-spin');
            icon.classList.add('fan-off');
        }
    }
    if (path) {
        path.classList.remove('text-green', 'text-dark-green');
        if (status == 1) {
            path.classList.add('text-green');
        } else {
            path.classList.add('text-dark-green');
        }
    }
}

function updateAlarmIcon(id, status, i) {
    const container = document.getElementById(`alarm${id}_dot_container_${i}`);
    if (!container) return;
    if (status == 0) {
        container.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="currentColor"
            class="icon icon-tabler icons-tabler-filled icon-tabler-bell-ringing bell-animate-flash">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path fill="#FF0000" stroke="#000" d="M17.451 2.344a1 1 0 0 1 1.41 -.099a12.05 12.05 0 0 1 3.048 4.064a1 1 0 1 1 -1.818 .836a10.05 10.05 0 0 0 -2.54 -3.39a1 1 0 0 1 -.1 -1.41z"/>
            <path fill="#FF0000" stroke="#000" d="M5.136 2.245a1 1 0 0 1 1.312 1.51a10.05 10.05 0 0 0 -2.54 3.39a1 1 0 1 1 -1.817 -.835a12.05 12.05 0 0 1 3.045 -4.065z"/>
            <path fill="#FF0000" stroke="#000" d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"/>
            <path fill="#FF0000" stroke="#000" d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"/>
        </svg>`;
    } else {
        container.innerHTML = `<svg id="alarm${id}_dot_${i}" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none"
            class="icon icon-tabler icons-tabler-filled icon-tabler-sun-high">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path fill="#00d97e" d="M12 19a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1m-4.95 -2.05a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m11.314 0l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m-5.049 -9.836a5 5 0 1 1 -2.532 9.674a5 5 0 0 1 2.532 -9.674m-9.315 3.886a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm18 0a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm-16.364 -6.778l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m14.142 0a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m-7.778 -3.222a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1"/>
        </svg>`;
    }
}

async function fetchAllSensorsData() {
    const numSensors = Object.keys(sensorNames).length;
    for (let i = 1; i <= numSensors; i++) {
        const bucketName = sensorNames[i];
        if (bucketName) {
            await fetchSensorData(i, bucketName);
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
}
var apiCallIntervalV2 = <?php echo $apiCallInterval;?>; // แปลงเป็นมิลลิวินาที, default 10 วินาที
document.addEventListener('DOMContentLoaded', function() {
    fetchAllSensorsData();
    setInterval(fetchAllSensorsData, apiCallIntervalV2);
});
</script>