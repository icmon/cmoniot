<?php 
    $input=@$this->input->post(); 
    if($input==null){$input=@$this->input->get();}
    $bucket=@$input['bucket'];
    $token=$_SESSION['token'];
    $deletecache=@$input['deletecache']; 
    $segment1 = $this->uri->segment(1);
    $segment2 = $this->uri->segment(2);
    $token = $_SESSION['token'];
    $mpi_call = $this->config->item('api_url').'mqtt?bucket='. $bucket.'&deletecache='. $deletecache;
    $rsapi = $this->Crul_model->call_api_with_token($mpi_call, $token);
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
 
    $m='S4';
    $floor=$m;
    $podium=$m;
    $senser_no=$m;
    $cenrent=$m;
    $fan1=$m;
    $fan2=$m;
    $nuittemp='°C';
?>
<style>
.text-green {
    color: #28a745 !important;
}

.text-red {
    color: #dc3545 !important;
}

.text-dark-green {
    color: #06402B !important;
}

/* ซ่อน scrollbar แต่ยังคงสามารถเลื่อนได้ */
.card {
    overflow: auto;
}

/* สำหรับ Chrome, Safari และ Opera */
.card::-webkit-scrollbar {
    display: none;
}

/* สำหรับ IE และ Edge */
.card {
    -ms-overflow-style: none;
}

/* สำหรับ Firefox */
.card {
    scrollbar-width: none;
}

/* ซ่อน scrollbar ในส่วน chart */
#chart_temperature_<?php echo $m;

?> {
    overflow: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE และ Edge */
}

#chart_temperature_<?php echo $m;

?>::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
}

/* ซ่อน scrollbar ทั้งหน้า */
body {
    overflow: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE และ Edge */
}

body::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
}

<style>.status-indicator.status-green .status-indicator-circle {
    background: #00d97e !important;
    box-shadow: 0 0 6px #00d97e;
}

.status-indicator.status-red .status-indicator-circle {
    background: #fa5252 !important;
    box-shadow: 0 0 6px #fa5252;
}

.chart-responsive {
    position: relative;
    width: 100%;
    min-height: 200px;
}

@media (max-width: 576px) {
    .chart-responsive {
        min-height: 150px;
    }
}

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
<?php ########### -----responsive layout -----############?>
<?php #echo base_url('settings/device').'?bucket='.$bucket.'&mqtt_id='.$mqtt_id;?>
<?php
                // --- จำลองข้อมูลสถานะให้ตรงกับภาพ [1] ---
                $device_status = [
                    'fan1' => ['text' => 'OFF', 'class' => 'danger', 'dot_class' => 'red'],
                    'alarm1' => ['text' => 'normal', 'class' => 'success', 'dot_class' => 'green'],
                    'fan2' => ['text' => 'ON', 'class' => 'success', 'dot_class' => 'green'],
                    'alarm2' => ['text' => 'normal', 'class' => 'success', 'dot_class' => 'red'], // Text: green, Dot: red
                ];
            ?>
<div class="container-fluid">
    <div class="row">
        <!-- Chart Column -->
        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
            <div class="chart-wrapper">
                <?php ########### -----วงกลม -----############?>
                <div id="chart_temperature_<?php echo $m;?>" class="position-relative chart-container"></div>
                <?php ########### -----วงกลม -----############?>
            </div>
        </div>
        <!-- Content Column -->
        <div class="col-lg-8 col-md-8 col-sm-12">
            <?php ##################?>
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="subheader">
                        <!-- เพิ่ม id ให้กับ card-title -->
                        <div id="device_card_title" class="card-title">Loading data | กำลังโหลดข้อมูล...</div>
                        <div class="ms-auto lh-1">
                            <!-- ส่วนอื่นๆ ของคุณ -->
                            <div>
                                &nbsp;<span id="last_update_time"></span>
                                <!-- เพิ่ม ID ที่ไม่ซ้ำกัน -->
                            </div>
                        </div>
                        <br><br>
                        <div id="podium<?php echo $m;?>-status">
                            <div class="row g-3 align-items-center mb-2 center">
                                <div class="col-auto">
                                    <?php ##########------------------------------------############?>
                                    <!-- SVG Windmill Icon สำหรับ FAN 1 -->
                                    <svg id="fan1_<?php echo $m;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                        style="vertical-align: middle;">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path id="fan1_<?php echo $m;?>_windmill_path" class="text-green"
                                            style="margin-left:6px;"
                                            d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                                    </svg>
                                    <span id="fan1_<?php echo $m;?>_status_text" class="text-green"
                                        style="margin-left:8px;">OFF</span>
                                    <?php ##########------------------------------------############?>
                                </div>
                                <div class="col-auto">
                                    <span id="alarm1_dot_<?php echo $m;?>"
                                        class="status-indicator status-red status-indicator-animated">
                                        <span class="status-indicator-circle"></span>
                                        <!-- <span class="status-indicator-circle"></span>
                                        <span class="status-indicator-circle"></span> -->
                                    </span>
                                    <span>Alarm 1 </span>
                                    <span id="alarm1_status_<?php echo $m;?>" class="text-danger"
                                        style="margin-left:6px;">Alarm</span>
                                </div>


                                <div class="col-auto">
                                    <?php ##########------------------------------------############?>
                                    <!-- SVG Windmill Icon สำหรับ FAN 2 -->
                                    <svg id="fan2_<?php echo $m;?>_windmill_icon" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                        style="vertical-align: middle;">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path id="fan2_<?php echo $m;?>_windmill_path" class="text-green"
                                            style="margin-left:6px;"
                                            d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                                    </svg>
                                    <span id="fan2_<?php echo $m;?>_status_text" class="text-green"
                                        style="margin-left:8px;">OFF</span>
                                    <?php ##########------------------------------------############?>
                                </div>
                                <div class="col-auto">
                                    <span id="alarm2_dot_<?php echo $m;?>"
                                        class="status-indicator status-red status-indicator-animated">
                                        <span class="status-indicator-circle"></span>
                                        <!-- <span class="status-indicator-circle"></span>
                                        <span class="status-indicator-circle"></span> -->
                                    </span>
                                    <span>Alarm </span>
                                    <span id="alarm2_status_<?php echo $m;?>" class="text-danger"
                                        style="margin-left:6px;">Alarm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php ####################?>

        </div>
    </div>
</div>
<?php ########### -----responsive layout -----############?>
<div id="chart_task_data" class="position-relative rounded-bottom chart-sm"></div>
<?php #----chart--------#?>
<?php ####################### ?>
<script>
// --- Step 1: รับค่าที่จำเป็นจาก PHP ---
// ใช้ json_encode เพื่อความปลอดภัยในการส่งค่าสตริงมายัง JavaScript
var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
let tempChart_<?php echo $m;?>;
document.addEventListener("DOMContentLoaded", function() {
    let chart = null;
    var options = {
        chart: {
            type: "area",
            fontFamily: 'inherit',
            height: 150,
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
    chart = new ApexCharts(document.getElementById('chart_task_data'), options);
    chart.render();
    async function fetchAndUpdateChart() {
        var redirect = '<?php echo base_url('error500');?>';
        try {
            // api_url  /v1/mqtt/sensercharts?bucket=BAACTW02
            ///v1/mqtt/sensercharts?bucket=BAACTW05
            var apiUrl =
                '<?php echo $this->config->item('api_url').'mqtt/sensercharts?bucket=';?><?php echo $bucket; ?>';
            var bearerToken = '<?php echo $_SESSION['token'];?>';
            // --- MODIFICATION START ---
            var response = await fetch(apiUrl, {
                method: 'GET', // It's good practice to be explicit, though GET is the default
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            // --- MODIFICATION END ---
            var data = await response.json();
            // console.log("apiUrl=>" + apiUrl);
            // console.log("bearerToken=>" + bearerToken);
            // console.log("data=>");
            // console.info(data);
            var measurement = data.payload.measurement;
            var chartData = data.chart.data;
            // สมมติ data.chart.date เป็น array ของวันที่ในรูปแบบ 'YYYY-MM-DD HH:mm:ss'
            // แปลงเป็น timestamp หรือ ISO string
            var labels = data.chart.date.map(dt => new Date(dt).toISOString());

            // สร้าง array ของ object {x: datetime, y: value}
            var seriesData = labels.map((dt, idx) => ({
                x: dt,
                y: chartData[idx]
            }));

            chart.updateOptions({
                series: [{
                    name: measurement,
                    data: seriesData
                }]
            });
        } catch (error) {
            // alert('API IOT Error fetching data');
            console.error('Error fetching data:', error);
            // swal({
            //     title: "API IOT Error fetching data",
            //     text: '' + error + '',
            //     timer: 1000,
            //     showConfirmButton: false
            // });
            let timerInterval;
            // Swal.fire({
            //     title: "API IOT Issue fetching data!",
            //     html: "I will close in <b></b> milliseconds | ระเชื่อมต่อ IoT ขัดข้อง กำลังพยาม ตรวจสอบ",
            //     timer: 10000,
            //     timerProgressBar: true,
            //     didOpen: () => {
            //         Swal.showLoading();
            //         var timer = Swal.getPopup().querySelector("b");
            //         timerInterval = setInterval(() => {
            //             timer.textContent = `${Swal.getTimerLeft()}`;
            //         }, 6000);
            //     },
            //     willClose: () => {
            //         clearInterval(timerInterval);
            //     }
            // }).then((result) => {
            //     /* Read more about handling dismissals below */
            //     if (result.dismiss === Swal.DismissReason.timer) {
            //         console.log(
            //             "I was closed by the timer .ระเชื่อมต่อ IoT ขัดข้อง กำลังพยาม ตรวจสอบ");
            //     }
            // });
            console.log('redirect===>' + redirect);

        }
    }
    fetchAndUpdateChart();
    setInterval(fetchAndUpdateChart, <?php  echo $this->config->item('api_call_time'); ?>);
});
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
        var apiResponse = await response.json(); // เทียบเท่ากับตัวแปร $mpirs ใน PHP

        // --- Step 6: ดึงข้อมูลที่ต้องการจาก payload ---
        var payload = apiResponse.payload[0];
        var mqtt_name = apiResponse.payload[0].mqtt_name;
        // alert(bucket);
        // alert(mqtt_name);
        var device_name = payload.device[0].device_name;
        // สามารถดึงข้อมูลอื่นๆ เช่น mqtt_org, bucket ได้จากตัวแปร payload

        // --- Step 7: อัปเดตข้อมูลลงใน HTML ---
        var titleElement = document.getElementById('device_cardtitle_<?php echo $m; ?>');
        if (titleElement) {
            titleElement.textContent = `${mqtt_name}`;
        }

    } catch (error) {
        console.error('Failed to fetch data from API:', error);
        var titleElement = document.getElementById('device_cardtitle_<?php echo $m; ?>');
        if (titleElement) {
            titleElement.textContent = 'Unable to load data. | ไม่สามารถโหลดข้อมูลได้';
        }
    }
}
// สั่งให้ฟังก์ชันทำงานทันทีที่หน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', fetchDataAndUpdatePage);

function updateStatus5_<?php echo $m;?>(dotId, textId, value) {
    if (value == 1) {
        $('#' + dotId).removeClass('status-red').addClass('status-green');
        $('#' + textId).removeClass('text-danger').addClass('text-success').text('On');
    } else {
        $('#' + dotId).removeClass('status-green').addClass('status-red');
        $('#' + textId).removeClass('text-success').addClass('text-danger').text('Off');
    }
}

function updateStatusAlarm5_<?php echo $m;?>(dotId, textId, value) {
    if (value == 1) {
        $('#' + dotId).removeClass('status-red').addClass('status-green');
        $('#' + textId).removeClass('text-danger').addClass('text-success').text('Normal');
    } else {
        $('#' + dotId).removeClass('status-green').addClass('status-red');
        $('#' + textId).removeClass('text-success').addClass('text-danger').text('Alarm');
    }
}

function updateStatus_<?php echo $m;?>(dotId, textId, value) {
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

function updateStatusAlarm_<?php echo $m;?>(dotId, textId, value) {
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
async function fetchAndUpdate_<?php echo $m;?>() {
    // 1. กำหนด URL และ Bearer Token
    var apiUrl = '<?php echo $this->config->item('api_url').'mqtt?bucket=';?><?php echo $bucket; ?>';
    var bearerToken = '<?php echo $_SESSION['token'];?>';
    // console.log("apiUrl:=>", apiUrl);
    // console.log("bearerToken:=>");
    console.info(apiUrl);
    try {
        // 2. เรียก API ด้วย fetch พร้อมส่ง Header
        var urlParams = new URLSearchParams(window.location.search);
        var bucket = urlParams.get('bucket');
        var deletecache = urlParams.get('deletecache');
        if (!bucket) {
            // document.getElementById('device_card_title').textContent = 'เกิดข้อผิดพลาด: ไม่พบ Bucket';
            // console.error("Bucket parameter is missing from URL.");
            // return; // หยุดการทำงานถ้าไม่มี bucket
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
        var apiResponse = await response.json(); // เทียบเท่ากับตัวแปร $mpirs ใน PHP

        // --- Step 6: ดึงข้อมูลที่ต้องการจาก payload ---
        var payload = apiResponse.payload[0];

        // console.log("payload=>");
        // console.info(payload);

        var mqtt_name = payload.mqtt_name;
        var device_name = payload.device[0].device_name;
        // สามารถดึงข้อมูลอื่นๆ เช่น mqtt_org, bucket ได้จากตัวแปร payload

        // --- Step 7: อัปเดตข้อมูลลงใน HTML ---
        var titleElement = document.getElementById('device_card_title');
        if (titleElement) {
            titleElement.textContent = `${mqtt_name}`;
        }
        var data = payload.mqtt;
        var device = payload.device;
        var mqtt_name = payload.mqtt_name;

        // console.log("data=>");
        // console.info(data);

        // 5. อัปเดตข้อมูลในหน้าเว็บ (ส่วนนี้เหมือนของเดิม)

        updateStatus_<?php echo $m;?>('mqtt_name_<?php echo $m;?>', 'mqtt_name-<?php echo $m;?>', mqtt_name);
        updateStatusAlarm_<?php echo $m;?>('alarm1_dot_<?php echo $m;?>', 'alarm1_status_<?php echo $m;?>', data
            .overFan1);
        updateStatusAlarm_<?php echo $m;?>('alarm2_dot_<?php echo $m;?>', 'alarm2_status_<?php echo $m;?>', data
            .overFan2);
        updateStatus_<?php echo $m;?>('fan1_dot_<?php echo $m;?>', 'fan1_status_<?php echo $m;?>', data
            .fan1);
        updateStatus_<?php echo $m;?>('fan2_dot_<?php echo $m;?>', 'fan2_status_<?php echo $m;?>', data
            .fan2);

        // อัปเดตสถานะ fan/alarm
        setFanStatus('fan1_<?php echo $m;?>', data.fan1);
        setFanStatus('fan2_<?php echo $m;?>', data.fan2);

        if (tempChart_<?php echo $m;?>) {
            tempChart_<?php echo $m;?>.updateSeries([data.temperature]);
        }
        $('#last_update_time').text('Date : ' + data.timestamp);

    } catch (error) {
        // 6. จัดการ Error กรณีที่เรียก API ไม่สำเร็จ หรือมีปัญหา Network
        console.error("Could not fetch data:", error);
        // คุณอาจจะเพิ่มโค้ดเพื่อแสดงข้อความ error บน UI ตรงนี้ได้
    }
}

function setFanStatus(fan, status) {
    var path = document.getElementById(fan + '_windmill_path');
    var text = document.getElementById(fan + '_status_text');
    if (status == 1) {
        path.classList.remove('text-dark-green');
        path.classList.add('text-green');
        text.classList.remove('text-dark-green');
        text.classList.add('text-green');
        text.textContent = 'ON';
    } else {
        path.classList.remove('text-green');
        path.classList.add('text-dark-green');
        text.classList.remove('text-green');
        text.classList.add('text-dark-green');
        text.textContent = 'OFF';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    tempChart_<?php echo $m;?> = new ApexCharts(document.getElementById(
        'chart_temperature_<?php echo $m;?>'), {
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
    tempChart_<?php echo $m;?>.render();
    fetchAndUpdate_<?php echo $m;?>();
    setInterval(fetchAndUpdate_<?php echo $m;?>,
        <?php  echo $this->config->item('api_call_time'); ?>); // 10 Sec
});
</script>

<?php ##################################?>
<?php ##################################?>
<?php /*?>
<!-- ปุ่มทดสอบ -->
<br>
<button onclick="setFanStatus('fan1_<?php echo $m;?>', 1)">FAN 1 ON</button>
<button onclick="setFanStatus('fan1_<?php echo $m;?>', 0)">FAN 1 OFF</button>
<button onclick="setFanStatus('fan2_<?php echo $m;?>', 1)">FAN 2 ON</button>
<button onclick="setFanStatus('fan2_<?php echo $m;?>', 0)">FAN 2 OFF</button>
<?php */?>
<?php ##################################?>
<?php ##################################?>