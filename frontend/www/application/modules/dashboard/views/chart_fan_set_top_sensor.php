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
</style>

<div class="col-sm-4 col-lg-3">
    <div class="card">
        <div class="card-header border-0">
            <div id="device_cardtitle_<?php echo $a; ?>" class="card-title"> Loading data | กำลังโหลดข้อมูล...
                <a href="<?php echo base_url('dashboard/dashboard1?bucket=').$bucket;?>"> <?php echo $mqtt_name; ?></a>
            </div>
            <div class="ms-auto lh-1">
                <!-- ส่วนอื่นๆ ของคุณ -->
            </div>
        </div>


        <div id="podium<?php echo $a;?>-status">
            <div class="row g-3 align-items-center mb-2">
                <div class="col">
                    <div>
                        &nbsp;&nbsp; &nbsp;&nbsp;<a href=""> <span id="last-update-time"></span> </a>
                    </div>
                </div>
            </div>
            <div id="chart-temperature-<?php echo $a;?>" style="max-width:220px;margin:30px auto 20px auto;"></div>
            <?php /********************************/ ?>
            <?php
                // --- จำลองข้อมูลสถานะให้ตรงกับภาพ [1] ---
                $device_status = [
                    'fan1' => ['text' => 'OFF', 'class' => 'danger', 'dot_class' => 'red'],
                    'alarm1' => ['text' => 'normal', 'class' => 'success', 'dot_class' => 'green'],
                    'fan2' => ['text' => 'ON', 'class' => 'success', 'dot_class' => 'green'],
                    'alarm2' => ['text' => 'normal', 'class' => 'success', 'dot_class' => 'red'], // Text: green, Dot: red
                ];
            ?>
            <!-- จัดวางเป็น 2 คอลัมน์ (ซ้าย-ขวา) เพื่อความสวยงาม -->
            <div class="row">

                <!-- คอลัมน์ซ้าย: FAN 1 และ Alarm 1 -->
                <div class="col-6">
                    <!-- FAN 1 -->
                    <div class="row g-3 align-items-center mb-3">
                        <div class="col-auto">
                            <span id="fan1_dot_<?php echo $a;?>"
                                class="status-indicator status-<?php echo $device_status['fan1']['dot_class']; ?> status-indicator-animated">
                                <span class="status-indicator-circle"></span>
                            </span>
                        </div>
                        <div class="col">
                            <span>FAN 1</span>
                            <span id="fan1_status_<?php echo $a;?>"
                                class="text-<?php echo $device_status['fan1']['class']; ?>"><?php echo $device_status['fan1']['text']; ?></span>
                        </div>
                    </div>
                    <!-- Alarm 1 -->
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <span id="alarm1_dot_<?php echo $a;?>"
                                class="status-indicator status-<?php echo $device_status['alarm1']['dot_class']; ?> status-indicator-animated">
                                <span class="status-indicator-circle"></span>
                            </span>
                        </div>
                        <div class="col">
                            <span>Alarm 1</span>
                            <span id="alarm1_status_<?php echo $a;?>"
                                class="text-<?php echo $device_status['alarm1']['class']; ?>"><?php echo $device_status['alarm1']['text']; ?></span>
                        </div>
                    </div>
                </div>

                <!-- คอลัมน์ขวา: FAN 2 และ Alarm 2 -->
                <div class="col-6">
                    <!-- FAN 2 -->
                    <div class="row g-3 align-items-center mb-3">
                        <div class="col-auto">
                            <span id="fan2_dot_<?php echo $a;?>"
                                class="status-indicator status-<?php echo $device_status['fan2']['dot_class']; ?> status-indicator-animated">
                                <span class="status-indicator-circle"></span>
                            </span>
                        </div>
                        <div class="col">
                            <span>FAN 2</span>
                            <span id="fan2_status_<?php echo $a;?>"
                                class="text-<?php echo $device_status['fan2']['class']; ?>"><?php echo $device_status['fan2']['text']; ?></span>
                        </div>
                    </div>
                    <!-- Alarm 2 -->
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <span id="alarm2_dot_<?php echo $a;?>"
                                class="status-indicator status-<?php echo $device_status['alarm2']['dot_class']; ?> status-indicator-animated">
                                <span class="status-indicator-circle"></span>
                            </span>
                        </div>
                        <div class="col">
                            <span>Alarm 2</span>
                            <span id="alarm2_status_<?php echo $a;?>"
                                class="text-<?php echo $device_status['alarm2']['class']; ?>"><?php echo $device_status['alarm2']['text']; ?></span>
                        </div>
                    </div>
                </div>

            </div>

            <?php /********************************/ ?>
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
</script>
<script>
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

let tempChart_<?php echo $a;?>;



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

    } catch (error) {
        // 6. จัดการ Error กรณีที่เรียก API ไม่สำเร็จ หรือมีปัญหา Network
        console.error("Could not fetch data:", error);
        // คุณอาจจะเพิ่มโค้ดเพื่อแสดงข้อความ error บน UI ตรงนี้ได้
    }
}
const updateInterval = <?php echo $this->config->item('api_call_time_mqtt'); ?>;
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
    setInterval(fetchAndUpdate_<?php echo $a;?>, updateInterval); // 10 Sec
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