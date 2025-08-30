<?php 
    $a='a7';
    $input=@$this->input->post(); 
    if($input==null){$input=@$this->input->get();}
    $bucket=@@$input['bucket'];
    $token=$_SESSION['token'];
    $deletecache=@@$input['deletecache']; 
    $segment1 = $this->uri->segment(1);
    $segment2 = $this->uri->segment(2);
    $token = $_SESSION['token'];
    $api_call = $this->config->item('api_url').'mqtt?bucket='. $bucket.'&deletecache='. $deletecache;
    $rsapi = $this->Crul_model->call_api_with_token($api_call, $token);
    if ($rsapi['code'] != 200) {
        // echo 'Error: Could not retrieve initial data from API.'; 
        
    }
    $payload = $rsapi['payload']['0'];
    $mqtt_name=$payload['mqtt_name'];
    $mqtt_bucket=$payload['device']['0']['mqtt_bucket'];
    $device_name=$payload['device']['0']['device_name'];
    $type_name=$payload['device']['0']['type_name'];
    $mqtt_data_value=$payload['device']['0']['mqtt_data_value'];
    $bucket=$mqtt_bucket;
    $token=$_SESSION['token'];
 
// $token=$_SESSION['token'];
// $api_call=$this->config->item('api_url').'mqtt?bucket='.$bucket;
// $rsapi=$this->Crul_model->call_api_with_token($api_call,$token);
// $code=$rsapi['code'];
// if($code!=200){
//     echo 'Error data api'; die();
// }
//http://localhost:8081/api/iot/mqttsensercharts?bucket=BAACTW02
?>
<style>
/* CSS เดิมของคุณสำหรับ status-green และ status-red */
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

/* 
  เพิ่ม 2 คลาสนี้เข้าไป สำหรับสีเขียวเข้ม (Dark Green)
  #06402B เป็นสีเขียวเข้มที่ดูใกล้ดำ
*/
.status-indicator.status-dark-green .status-indicator-circle {
    background: #06402B !important;
    /* สีเขียวเข้มสำหรับจุด */
    box-shadow: 0 0 6px #06402B;
}

.text-dark-green {
    color: #06402B !important;
    /* สีเขียวเข้มสำหรับข้อความ */
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
</style>

<style>
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}
</style>

<div class="col-sm-4 col-lg-3">
    <div class="card">
        <div class="card-body pb-2">
            <!-- Header -->
            <div class="d-flex align-items-center mb-2">
                <div class="flex-grow-1">
                    <span class="fw-semibold" style="font-size:1rem;"><?php echo $mqtt_name; ?></span>

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
            <!-- Chart Area -->
            <div id="chart-temperature-<?php echo $a;?>" class="position-relative rounded-bottom chart-sm"></div>
            <div class="row text-center mb-2">
                <!-- FAN 1 -->
                <div class="col-6 mb-2 d-flex flex-column align-items-center">
                    <!-- <svg id="fan1_<?php echo $a;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                        height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path id="fan1_<?php echo $a;?>_windmill_path" class="text-success"
                            d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                    </svg> -->
                    <a
                        href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>">
                        <svg id="fan1_<?php echo $a;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path id="fan1_<?php echo $a;?>_windmill_path" class="isFanOn ? 'windmill-spin' : ''"
                                style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                        </svg>
                    </a>
                    <span class="mt-1">FAN 1: <span id="fan1_status_<?php echo $a;?>"
                            class="fw-bold text-success">On</span></span>
                </div>
                <!-- FAN 2 -->
                <div class="col-6 mb-2 d-flex flex-column align-items-center">
                    <!-- <svg id="fan2_<?php echo $a;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                        height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path id="fan2_<?php echo $a;?>_windmill_path" class="text-success"
                            d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                    </svg> -->
                    <a
                        href="<?php echo base_url('settings/device/deviceactive').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id ; ?>">
                        <svg id="fan2_<?php echo $a;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path id="fan2_<?php echo $a;?>_windmill_path" class="isFanOn ? 'windmill-spin' : ''"
                                style="margin-left:6px;  fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                                d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                        </svg>
                    </a>
                    <span class="mt-1">FAN 2: <span id="fan2_status_<?php echo $a;?>"
                            class="fw-bold text-success">On</span></span>
                </div>
                <!-- Alarm 1 -->
                <div class="col-6 d-flex flex-column align-items-center">
                    <span id="alarm1_dot_<?php echo $a;?>" class="status-indicator status-green mb-1">
                        <span class="status-indicator-circle"></span>
                    </span>
                    <span>Alarm 1: <span id="alarm1_status_<?php echo $a;?>"
                            class="fw-bold text-success">Normal</span></span>
                </div>
                <!-- Alarm 2 -->
                <div class="col-6 d-flex flex-column align-items-center">
                    <span id="alarm2_dot_<?php echo $a;?>" class="status-indicator status-green mb-1">
                        <span class="status-indicator-circle"></span>
                    </span>
                    <span>Alarm 2: <span id="alarm2_status_<?php echo $a;?>"
                            class="fw-bold text-success">Normal</span></span>
                </div>
            </div>
            <!-- Timestamp -->
            <!-- <div class="text-secondary text-end small mt-2">
                <span id="temperature_<?php echo $a;?>" class="fw-bold text-warning ms-2"
                    style="font-size:1.2rem;">--°C</span>
            </div> -->
            <div class="text-secondary text-end small mt-2">
                <span id="last-update-time">--:--:--</span> <span id="temperature_<?php echo $a;?>"
                    class="fw-bold text-warning ms-2" style="font-size:0.8rem;">--°C</span>
            </div>
        </div>



    </div>
</div>

<script>
// --- Step 1: รับค่าที่จำเป็นจาก PHP ---
// ใช้ json_encode เพื่อความปลอดภัยในการส่งค่าสตริงมายัง JavaScript
var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
/**
 * ฟังก์ชันสำหรับดึงข้อมูลจาก API และอัปเดตหน้าเว็บ
 */
async function fetchDataAndUpdatePage() {
    try {
        // --- Step 2: ดึงค่า parameters จาก URL ของเบราว์เซอร์ ---
        // เช่น ถ้า URL คือ: yoursite.com/page?bucket=BAACTW02&deletecache=true
        var urlParams = new URLSearchParams(window.location.search);
        var bucket = urlParams.get('bucket');

        var deletecache = urlParams.get('deletecache');
        if (!bucket) {
            // --- Step 3: สร้าง API URL ---
            var apiUrl = `${baseApiUrl}mqtt?deletecache=${deletecache || ''}`;
        } else {
            // --- Step 3: สร้าง API URL ---
            var apiUrl = `${baseApiUrl}mqtt?bucket=${bucket}&deletecache=${deletecache || ''}`;
        }
        // --- Step 4: เรียก API ด้วย fetch พร้อม Bearer Token ---
        var response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`, // เพิ่ม Authorization header [3][5]
                'Content-Type': 'application/json'
            }
        });

        // ตรวจสอบว่า request สำเร็จหรือไม่
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        // --- Step 5: แปลงข้อมูล response เป็น JSON ---
        var apiResponse = await response.json(); // เทียบเท่ากับตัวแปร $apirs ใน PHP

        // --- Step 6: ดึงข้อมูลที่ต้องการจาก payload ---
        var payload = apiResponse.payload[0];
        var mqtt_name = apiResponse.payload[0].mqtt_name;
        // alert(bucket);
        // alert(mqtt_name);
        var device_name = payload.device[0].device_name;
        // สามารถดึงข้อมูลอื่นๆ เช่น mqtt_org, bucket ได้จากตัวแปร payload

        // --- Step 7: อัปเดตข้อมูลลงใน HTML ---
        var titleElement = document.getElementById('device_cardtitle_<?php echo $a; ?>');
        if (titleElement) {
            titleElement.textContent = `${mqtt_name}`;
        }

    } catch (error) {
        console.error('Failed to fetch data from API:', error);
        var titleElement = document.getElementById('device_cardtitle_<?php echo $a; ?>');
        if (titleElement) {
            titleElement.textContent = 'Unable to load data. | ไม่สามารถโหลดข้อมูลได้';
        }
    }
}
// สั่งให้ฟังก์ชันทำงานทันทีที่หน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', fetchDataAndUpdatePage);

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

function updateStatus2_<?php echo $a;?>(dotId, textId, value) {
    if (value == 1) {
        $('#' + dotId).removeClass('status-red').addClass('status-green');
        $('#' + textId).removeClass('text-danger').addClass('text-success').text('On');
    } else {
        $('#' + dotId).removeClass('status-green').addClass('status-red');
        $('#' + textId).removeClass('text-success').addClass('text-danger').text('Off');
    }
}

function updateStatus_<?php echo $a;?>(dotId, textId, value) {
    // FAN: On = สีเขียว, Off = สีเขียวเข้ม
    var allDotClasses = 'status-green status-dark-green status-dark-red status-red';
    var allTextClasses = 'text-success text-dark-green text-dark-red text-danger';

    if (value == 1) {
        $('#' + dotId).removeClass(allDotClasses).addClass('status-green');
        $('#' + textId).removeClass(allTextClasses).addClass('text-success').text('On');
    } else {
        $('#' + dotId).removeClass(allDotClasses).addClass('status-dark-green');
        $('#' + textId).removeClass(allTextClasses).addClass('text-dark-green').text('Off');
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

var tempChart_<?php echo $a;?>;
async function fetchAndUpdate_<?php echo $a;?>() {
    // 1. กำหนด URL และ Bearer Token
    var apiUrl = '<?php echo $this->config->item('api_url').'mqtt?bucket=';?><?php echo $bucket; ?>';
    var bearerToken = '<?php echo $_SESSION['token'];?>';
    // console.log("apiUrl:=>", apiUrl);
    // console.log("bearerToken:=>");
    // console.info(apiUrl);
    try {
        // 2. เรียก API ด้วย fetch พร้อมส่ง Header
        var response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        // 3. ตรวจสอบว่าการเรียก API สำเร็จหรือไม่
        if (!response) {
            // หากไม่สำเร็จ (เช่น ได้รับ status 401, 404, 500) ให้โยน error
            throw new Error(`HTTP error! Status: ${response.code}`);
        }
        // 4. แปลงข้อมูลที่ได้จาก response เป็น JSON
        var rs = await response.json();
        var data = rs.payload[0].mqtt;
        var device = rs.payload[0].device;
        var mqtt_name = rs.payload[0].mqtt_name;
        // console.log("rs=>");
        // console.info(rs);
        // console.log("data=>");
        // console.info(data);

        // 5. อัปเดตข้อมูลในหน้าเว็บ (ส่วนนี้เหมือนของเดิม)
        updateStatus_<?php echo $a;?>('mqtt_name_<?php echo $a;?>', 'mqtt_name-<?php echo $a;?>', mqtt_name);
        updateStatusAlarm_<?php echo $a;?>('alarm1_dot_<?php echo $a;?>', 'alarm1_status_<?php echo $a;?>', data
            .overFan1);
        updateStatusAlarm_<?php echo $a;?>('alarm2_dot_<?php echo $a;?>', 'alarm2_status_<?php echo $a;?>', data
            .overFan2);
        updateStatus_<?php echo $a;?>('fan1_dot_<?php echo $a;?>', 'fan1_status_<?php echo $a;?>', data
            .fan1);
        updateStatus_<?php echo $a;?>('fan2_dot_<?php echo $a;?>', 'fan2_status_<?php echo $a;?>', data
            .fan2);
        if (tempChart_<?php echo $a;?>) {
            tempChart_<?php echo $a;?>.updateSeries([data.temperature]);
        }
        $('#last-update-time').text('Last : ' + data.timestamp);

        // อัปเดตสถานะ fan/alarm
        // FAN 1
        setFanStatus(`fan1_<?php echo $a;?>`, data.fan1);
        // FAN 2
        setFanStatus(`fan2_<?php echo $a;?>`, data.fan2);

        // ในฟังก์ชัน fetchAndUpdate
        document.getElementById('temperature_<?php echo $a;?>').textContent =
            parseFloat(data.temperature).toFixed(2) + '°C';



    } catch (error) {
        // 6. จัดการ Error กรณีที่เรียก API ไม่สำเร็จ หรือมีปัญหา Network
        console.error("Could not fetch data:", error);
        // คุณอาจจะเพิ่มโค้ดเพื่อแสดงข้อความ error บน UI ตรงนี้ได้
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

var updateInterval = <?php echo json_encode($this->config->item('api_call_time_mqtt')); ?>;
document.addEventListener("DOMContentLoaded", function() {
    tempChart_<?php echo $a;?> = new ApexCharts(document.getElementById(
        'chart-temperature-<?php echo $a;?>'), {
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
                },
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
    setInterval(fetchAndUpdate_<?php echo $a;?>, updateInterval); // Interval x Sec
});
</script>

<style>
.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}
</style>