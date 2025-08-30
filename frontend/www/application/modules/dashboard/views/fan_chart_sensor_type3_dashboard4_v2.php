<script type="text/javascript" src="<?php echo base_url('assets/sweetalert2/dist/js/jquery-latest.js');?>"></script>
<script src="<?php echo base_url('assets/sweetalert2/dist/sweetalert-dev.js');?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>">
<?php 
    $input=@$this->input->post(); 
    if($input==null){$input=@$this->input->get();}
    $themeop=@@$input['op'];
    $sensor_name=@@$input['bucket'];
    $token=$_SESSION['token'];
    $deletecache=@@$input['deletecache']; 
    $segment1 = $this->uri->segment(1);
    $segment2 = $this->uri->segment(2);
    $token = $_SESSION['token'];
    $api_call = $this->config->item('api_url') . 'mqtt/fan';
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
?>
<style>
</style>
<div class="col-lg-7">
    <div class="card">
        <?php ########### -----table -----############?>
        <div class="ms-auto lh-1">
        </div>
        <?php #########################chart-active-users-top################################ ?>
        <div class="table-responsive mt-3">
            <?php 
            if($themeop==1 || $themeop==""){
                $this->load->view('dashboard/chart_fan_set_top_sensor_card_dashboard4_Main_V1'); 
               # $this->load->view('dashboard/chart_fan_set_top_sensor_card_dashboard4_Main'); 
            }else if($themeop==2){
                 $this->load->view('dashboard/chart_fan_set_top_sensor_card_dashboard4_V1'); 
            }else if($themeop==3){
                 $this->load->view('dashboard/chart_fan_set_top_sensor_card_dashboard4_V2'); 
            }else if($themeop==4){
                $this->load->view('dashboard/chart_fan_set_top_sensor_card_dashboard4'); 
            }
            ?>
        </div>
        <div class="table-responsive mt-3">
            <?php  $this->load->view('dashboard/cardtable_data_dashboard4');  ?>
        </div>

        <?php #########################chart-active-users-top################################ ?>
    </div>
</div>


<script>
function updateStatus_<?php echo $m;?>(dotId, textId, value) {
    if (value == 1) {
        $('#' + dotId).removeClass('status-red').addClass('status-green');
        $('#' + textId).removeClass('text-danger').addClass('text-success').text('On');
    } else {
        $('#' + dotId).removeClass('status-green').addClass('status-red');
        $('#' + textId).removeClass('text-success').addClass('text-danger').text('Off');
    }
}

function updateStatusAlarm_<?php echo $m;?>(dotId, textId, value) {
    if (value == 1) {
        $('#' + dotId).removeClass('status-red').addClass('status-green');
        $('#' + textId).removeClass('text-danger').addClass('text-success').text('Normal');
    } else {
        $('#' + dotId).removeClass('status-green').addClass('status-red');
        $('#' + textId).removeClass('text-success').addClass('text-danger').text('Alarm');
    }
}
let tempChart_<?php echo $m;?>;


var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
async function fetchAndUpdate_<?php echo $m;?>() {
    // 1. กำหนด URL และ Bearer Token
    var apiUrl = '<?php echo $this->config->item('api_url').'mqtt?bucket=';?><?php echo $bucket; ?>';
    var bearerToken = '<?php echo $_SESSION['token'];?>';
    // console.log("apiUrl:=>", apiUrl);
    // console.log("bearerToken:=>");
    // console.info(apiUrl);
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
        var apiResponse = await response.json(); // เทียบเท่ากับตัวแปร $apirs ใน PHP

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
        updateStatus_<?php echo $m;?>('mqtt_name_<?php echo $m;?>', 'mqtt_name_<?php echo $m;?>', mqtt_name);
        updateStatusAlarm_<?php echo $m;?>('alarm1_dot_<?php echo $m;?>', 'alarm1_status_<?php echo $m;?>', data
            .overFan1);
        updateStatusAlarm_<?php echo $m;?>('alarm2_dot_<?php echo $m;?>', 'alarm2_status_<?php echo $m;?>', data
            .overFan2);
        updateStatus_<?php echo $m;?>('fan1_dot_<?php echo $m;?>', 'fan1_status_<?php echo $m;?>', data
            .fan1);
        updateStatus_<?php echo $m;?>('fan2_dot_<?php echo $m;?>', 'fan2_status_<?php echo $m;?>', data
            .fan2);
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

document.addEventListener("DOMContentLoaded", function() {
    tempChart_<?php echo $m;?> = new ApexCharts(document.getElementById(
        'chart_temperature_<?php echo $m;?>'), {
        chart: {
            type: "radialBar",
            height: 250,
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
<script src="<?php echo base_url('assets');?>/js/chart.js" defer></script>
<script src="<?php echo base_url('assets');?>/js/chartjs-plugin-zoom.js" defer></script>