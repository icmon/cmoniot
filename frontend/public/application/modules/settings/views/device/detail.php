<?php
$language = $this->lang->language;
$lang = $this->lang->line('lang');
$langs = $this->lang->line('langs');
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$bucket = @$input['bucket'] ?? '';
if (!@$_SESSION['token']) {
    redirect(base_url('dashboard'));
    die();
} else {
    $token = $_SESSION['token'];
}
$api_typeall = $this->config->item('api_url') . 'settings/devicetypeall';
$api_settingall = $this->config->item('api_url') . 'settings/settingall';
$api_locationall = $this->config->item('api_url') . 'settings/locationall';
$api_mqttall = $this->config->item('api_url') . 'settings/lismqttall';
$api_lupdatedevice = $this->config->item('api_url') . 'settings/updatedevice';
$api_deviceeditget = $this->config->item('api_url') . 'settings/deviceeditget';
$device_id = @$input['id'];
if($device_id==""){
    redirect(base_url('settings/device'));  die();
}
$home_url = base_url('settings/device');
$Edit_url = base_url('settings/device/edit?id='.$device_id);

if(!$device_id){
    $device_id = @$input['device_id'];
}
?>
<style>
.input-error {
    border: 2px solid #ff3b3b !important;
    background: #fff0f0;
}

.error-message {
    color: #ff3b3b;
    font-size: 0.9em;
    margin-top: 2px;
    min-height: 1em;
}
</style>
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10 mx-auto">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <div>
                            <h3 class="card-title mb-0">Detail Device </h3>
                        </div>
                        <div>
                            <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                <i class="fa fa-home"></i> Main
                            </a>
                            <a href="<?php echo $Edit_url; ?>" class="btn btn-light btn-sm">
                                <i class="fa fa-home"></i> Edit
                            </a>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="space-y">
                            <div>
                                <label class="form-label">
                                    <h1>Device Name :<a href="#">
                                            <b><label id="device_name" class="form-label-static"></label></b>
                                        </a></h1>
                                </label>
                            </div>
                            <hr>
                            <div>
                                <label class="form-label">Type :
                                    <a href="#"><b><label id="type_name" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Setting :
                                    <a href="#"><b><label id="setting_name" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Location :
                                    <a href="#"><b><label id="location_name" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">MQTT :
                                    <a href="#"><b><label id="mqtt_name" class="form-label-static"></label></b></a>
                                </label>
                            </div>

                            <div>
                                <label class="form-label">SN :
                                    <a href="#"><b><label id="sn" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Hardware ID :
                                    <a href="#"><b><label id="hardware_id" class="form-label-static"></label></b></a>
                                </label>
                            </div>

                            <div>
                                <label class="form-label">Time Life :
                                    <a href="#"><b><label id="time_life" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Period :
                                    <a href="#"><b><label id="period" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Work Status :
                                    <a href="#"><b><label id="work_status" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Max :
                                    <a href="#"><b><label id="max" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Min :
                                    <a href="#"><b><label id="min" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Model :
                                    <a href="#"><b><label id="model" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Vendor :
                                    <a href="#"><b><label id="vendor" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Compare Value :
                                    <a href="#"><b><label id="comparevalue" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Unit :
                                    <a href="#"><b><label id="unit" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">OID :
                                    <a href="#"><b><label id="oid" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Action ID :
                                    <a href="#"><b><label id="action_id" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Status Alert ID :
                                    <a href="#"><b><label id="status_alert_id"
                                                class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">MQTT Data Value :
                                    <a href="#"><b><label id="mqtt_data_value"
                                                class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">MQTT Data Control :
                                    <a href="#"><b><label id="mqtt_data_control"
                                                class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Measurement :
                                    <a href="#"><b><label id="measurement" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <hr>
                            <div>
                                <label class="form-label">MQTT Control On :
                                    <a href="#"><b><label id="mqtt_control_on"
                                                class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">MQTT Control Off :
                                    <a href="#"><b><label id="mqtt_control_off"
                                                class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <hr>
                            <div>
                                <label class="form-label">Org :
                                    <a href="#"><b><label id="org" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Bucket :
                                    <a href="#"><b><label id="bucket" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <hr>
                            <div>
                                <label class="form-label">Mqtt device name :
                                    <a href="#"><b><label id="mqtt_device_name"
                                                class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">
                                    Mqtt over name :
                                    <a href="#"><b><span id="mqtt_status_over_name"
                                                class="form-label-static"></span></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">
                                    Mqtt status:
                                    <a href="#"><b><span id="mqtt_status_data_name"
                                                class="form-label-static"></span></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">
                                    Mqtt act relay name :
                                    <a href="#"><b><span id="mqtt_act_relay_name"
                                                class="form-label-static"></span></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">
                                    Mqtt control relay name :
                                    <a href="#"><b><span id="mqtt_control_relay_name"
                                                class="form-label-static"></span></b></a>
                                </label>
                            </div>
                            <hr>
                            <div>
                                <label class="form-label">Warning :
                                    <a href="#"><b><label id="status_warning" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Recovery Warning :
                                    <a href="#"><b><label id="recovery_warning"
                                                class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Alert :
                                    <a href="#"><b><label id="status_alert" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <div>
                                <label class="form-label">Recovery Alert :
                                    <a href="#"><b><label id="recovery_alert" class="form-label-static"></label></b></a>
                                </label>
                            </div>
                            <hr>
                        </div>
                    </div>

                </div>

            </div>

            <div id="responseMessage" style="margin-top:20px;"></div>
        </div>
    </div>
</div>
</div>
<script>
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var device_id = <?php echo json_encode($device_id); ?>;

// โหลด option ของ select และ set ค่า value หลังโหลดเสร็จ
function loadSelectOptions(apiUrl, selectId, valueKey, textKey, selectedValue) {
    fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select --</option>';
            if (data.payload && Array.isArray(data.payload)) {
                data.payload.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item[valueKey];
                    option.textContent = item[textKey];
                    select.appendChild(option);
                });
                // set ค่า value หลังโหลด option เสร็จ
                if (selectedValue !== undefined && selectedValue !== null) {
                    select.value = selectedValue;
                }
            }
        });
}

// ดึงข้อมูล device จาก API แล้วเติมค่าในฟอร์ม
async function fetchDeviceDataA1(device_id) {
    var apiUrl = `${baseApiUrl}settings/devicedetail?device_id=${device_id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Could not fetch data:", error);
        return null;
    }
}
// ดึงข้อมูล device จาก API แล้วเติมข้อมูลในฟอร์ม read-only
async function fetchDeviceData(device_id) {
    var apiUrl = `${baseApiUrl}settings/devicedetail?device_id=${device_id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const resp = await response.json();
        // ตรวจสอบโครงสร้างตอบกลับ API
        if (resp && resp.payload) {
            // console.log("resp.payload.data :");
            // console.info(resp.payload.data);
            // บาง API อาจตอบกลับเป็น payload.data ให้ปรับตามนี้
            var data = (resp.payload.data && Array.isArray(resp.payload.data) && resp.payload.data.length > 0) ?
                resp.payload.data[0] : resp.payload;
            // console.log("fetchDeviceData data :");
            // console.info(data);
            fillForm(data);
        } else {
            alert('ไม่พบข้อมูลอุปกรณ์');
        }
    } catch (error) {
        console.error("Could not fetch data:", error);
        //alert('โหลดข้อมูลไม่สำเร็จ');
    }
}

function fillForm(data) {
    console.log("fillForm data:");
    console.info(data);
    if (!data) return;
    console.log("=====================");
    console.log("data.mqtt_device_name:" + data.mqtt_device_name);
    console.log("data.mqtt_status_over_name:" + data.mqtt_status_over_name);
    console.log("data.mqtt_status_data_name:" + data.mqtt_status_data_name);
    console.log("data.mqtt_act_relay_name:" + data.mqtt_act_relay_name);
    console.log("data.mqtt_control_relay_name:" + data.mqtt_control_relay_name);
    console.log("=====================");
    document.getElementById('mqtt_device_name').textContent = data.mqtt_device_name || '';
    document.getElementById('mqtt_status_over_name').textContent = data.mqtt_status_over_name || '';
    document.getElementById('mqtt_status_data_name').textContent = data.mqtt_status_data_name || '';
    document.getElementById('mqtt_act_relay_name').textContent = data.mqtt_act_relay_name || '';
    document.getElementById('mqtt_control_relay_name').textContent = data.mqtt_control_relay_name || '';
    console.log("=====================");
    document.getElementById('type_name').textContent = data.type_name || '-';
    document.getElementById('location_name').textContent = data.location_name || '';
    document.getElementById('setting_name').textContent = data.setting_name || '';
    document.getElementById('mqtt_name').textContent = data.mqtt_name || '';
    document.getElementById('device_name').textContent = data.device_name || '';
    document.getElementById('sn').textContent = data.sn || '';
    document.getElementById('hardware_id').textContent = data.hardware_id || '';
    document.getElementById('status_warning').textContent = data.status_warning || '';
    document.getElementById('recovery_warning').textContent = data.recovery_warning || '';
    document.getElementById('status_alert').textContent = data.status_alert || '';
    document.getElementById('recovery_alert').textContent = data.recovery_alert || '';
    document.getElementById('time_life').textContent = data.time_life || '';
    document.getElementById('period').textContent = data.period || '';
    document.getElementById('work_status').textContent = data.work_status || '';
    document.getElementById('max').textContent = data.max || '';
    document.getElementById('min').textContent = data.min || '';
    document.getElementById('model').textContent = data.model || '';
    document.getElementById('vendor').textContent = data.vendor || '';
    document.getElementById('comparevalue').textContent = data.comparevalue || '';
    document.getElementById('unit').textContent = data.unit || '';
    document.getElementById('oid').textContent = data.oid || '';
    document.getElementById('action_id').textContent = data.action_id || '';
    document.getElementById('status_alert_id').textContent = data.status_alert_id || '';
    document.getElementById('mqtt_data_value').textContent = data.mqtt_data_value || '';
    document.getElementById('mqtt_data_control').textContent = data.mqtt_data_control || '';
    document.getElementById('measurement').textContent = data.measurement || '';
    document.getElementById('mqtt_control_on').textContent = data.mqtt_control_on || '';
    document.getElementById('mqtt_control_off').textContent = data.mqtt_control_off || '';
    document.getElementById('org').textContent = data.org || data.mqtt_org || '';
    document.getElementById('bucket').textContent = data.bucket || data.mqtt_bucket || '';
    // document.getElementById('status').textContent = data.status || '';
}


document.addEventListener('DOMContentLoaded', async function() {
    if (device_id) {
        const resp = await fetchDeviceData(device_id);
        let data = null;
        if (resp && resp.payload) {
            if (Array.isArray(resp.payload.data) && resp.payload.data.length > 0) {
                data = resp.payload.data[0];
            } else {
                data = resp.payload;
            }
        }
        if (data) fillForm(data);
    } else {

    }


});

// ฟังก์ชันอ่าน query string จาก URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
}

// เมื่อโหลดหน้าเสร็จ ให้ใส่ค่า bucket ลงใน input
document.addEventListener('DOMContentLoaded', function() {
    const bucketValue = getQueryParam('bucket');
    if (bucketValue) {
        document.getElementById('bucket').value = bucketValue;
    }
});
</script>