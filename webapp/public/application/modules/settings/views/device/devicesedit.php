<?php
$language = $this->lang->language;
$lang = $this->lang->line('lang');
$langs = $this->lang->line('langs');
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$bucket = $input['bucket'] ?? '';
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
$home_url = base_url('settings/device');
$device_id = $input['id'];
if(!$device_id){
    $device_id = $input['device_id'];
}
$mqtt_url = base_url('settings/mqtt');
if($device_id==""){
    redirect(base_url('settings/device'));  die();
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
                <form class="space-y" id="devicesAddForm" autocomplete="off">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Edit Device </h3>
                        </div>
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div>
                                <a href="<?php echo $mqtt_url; ?>">
                                    <h3 class="card-title mb-0">MQTT</h3>
                                </a>
                                <div>
                                </div>
                            </div>

                            <div>
                                <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                    <i class="fa fa-home"></i> Main
                                </a>
                            </div>

                        </div>
                        <div class="card-body">
                            <div class="space-y">
                                <!-- Selects -->
                                <div>
                                    <label class="form-label">Type</label>
                                    <select id="type_id" name="type_id" class="form-select" required></select>
                                    <div class="error-message" id="error-type_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">Setting</label>
                                    <select id="setting_id" name="setting_id" class="form-select" required></select>
                                    <div class="error-message" id="error-setting_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">Location</label>
                                    <select id="location_id" name="location_id" class="form-select" required></select>
                                    <div class="error-message" id="error-location_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">MQTT</label>
                                    <select id="mqtt_id" name="mqtt_id" class="form-select" required></select>
                                    <div class="error-message" id="error-mqtt_id"></div>
                                </div>
                                <!-- Text/Number Inputs -->
                                <div>
                                    <label class="form-label">Device Name</label>
                                    <input type="text" id="device_name" name="device_name" class="form-control"
                                        required>
                                    <div class="error-message" id="error-device_name"></div>
                                </div>
                                <div>
                                    <label class="form-label">SN</label>
                                    <input type="text" id="sn" name="sn" class="form-control" required>
                                    <div class="error-message" id="error-sn"></div>
                                </div>
                                <div>
                                    <label class="form-label">Hardware ID</label>
                                    <input type="number" id="hardware_id" name="hardware_id" class="form-control">
                                    <div class="error-message" id="error-hardware_id"></div>
                                </div>
                                <div>
                                    <label class="form-label"> <a href="#"> <b>Warning</b></a> </label>
                                    <input type="text" id="status_warning" name="status_warning" class="form-control"
                                        required>
                                    <div class="error-message" id="error-status_warning"></div>
                                </div>
                                <div>
                                    <label class="form-label"> <a href="#"> <b>Recovery Warning </b></a></label>
                                    <input type="text" id="recovery_warning" name="recovery_warning"
                                        class="form-control" required>
                                    <div class="error-message" id="error-recovery_warning"></div>
                                </div>
                                <div>
                                    <label class="form-label"> <a href="#"> <b>Alert</b></a> </label>
                                    <input type="text" id="status_alert" name="status_alert" class="form-control"
                                        required>
                                    <div class="error-message" id="error-status_alert"></div>
                                </div>
                                <div>
                                    <label class="form-label"> <a href="#"> <b>Recovery Alert</b></a> </label>
                                    <input type="text" id="recovery_alert" name="recovery_alert" class="form-control"
                                        required>
                                    <div class="error-message" id="error-recovery_alert"></div>
                                </div>
                                <div>
                                    <label class="form-label">Time Life</label>
                                    <input type="number" id="time_life" name="time_life" class="form-control" required>
                                    <div class="error-message" id="error-time_life"></div>
                                </div>
                                <div>
                                    <label class="form-label">Period</label>
                                    <input type="text" id="period" name="period" class="form-control">
                                    <div class="error-message" id="error-period"></div>
                                </div>
                                <div>
                                    <label class="form-label">Work Status</label>
                                    <input type="number" id="work_status" name="work_status" class="form-control"
                                        required>
                                    <div class="error-message" id="error-work_status"></div>
                                </div>
                                <div>
                                    <label class="form-label">Max</label>
                                    <input type="text" id="max" name="max" class="form-control">
                                    <div class="error-message" id="error-max"></div>
                                </div>
                                <div>
                                    <label class="form-label">Min</label>
                                    <input type="text" id="min" name="min" class="form-control">
                                    <div class="error-message" id="error-min"></div>
                                </div>
                                <div>
                                    <label class="form-label">Model</label>
                                    <input type="text" id="model" name="model" class="form-control">
                                    <div class="error-message" id="error-model"></div>
                                </div>
                                <div>
                                    <label class="form-label">Vendor</label>
                                    <input type="text" id="vendor" name="vendor" class="form-control">
                                    <div class="error-message" id="error-vendor"></div>
                                </div>
                                <div>
                                    <label class="form-label">Compare Value</label>
                                    <input type="text" id="comparevalue" name="comparevalue" class="form-control"
                                        required>
                                    <div class="error-message" id="error-comparevalue"></div>
                                </div>
                                <div>
                                    <label class="form-label">Unit</label>
                                    <input type="text" id="unit" name="unit" class="form-control">
                                    <div class="error-message" id="error-unit"></div>
                                </div>
                                <div>
                                    <label class="form-label">OID</label>
                                    <input type="text" id="oid" name="oid" class="form-control">
                                    <div class="error-message" id="error-oid"></div>
                                </div>
                                <div>
                                    <label class="form-label">Action ID</label>
                                    <input type="number" id="action_id" name="action_id" class="form-control">
                                    <div class="error-message" id="error-action_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">Status Alert ID</label>
                                    <input type="number" id="status_alert_id" name="status_alert_id"
                                        class="form-control">
                                    <div class="error-message" id="error-status_alert_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">MQTT Data Value</label>
                                    <input type="text" id="mqtt_data_value" name="mqtt_data_value" class="form-control"
                                        required>
                                    <div class="error-message" id="error-mqtt_data_value"></div>
                                </div>
                                <div>
                                    <label class="form-label">MQTT Data Control</label>
                                    <input type="text" id="mqtt_data_control" name="mqtt_data_control"
                                        class="form-control" required>
                                    <div class="error-message" id="error-mqtt_data_control"></div>
                                </div>
                                <div>
                                    <label class="form-label">Measurement</label>
                                    <input type="text" id="measurement" name="measurement" class="form-control"
                                        required>
                                    <div class="error-message" id="error-measurement"></div>
                                </div>
                                <hr>
                                <div>
                                    <label class="form-label"><a href="#"> <b> MQTT Control On </b></a></label>
                                    <input type="text" id="mqtt_control_on" name="mqtt_control_on" class="form-control"
                                        required>
                                    <div class="error-message" id="error-mqtt_control_on"></div>
                                </div>
                                <div>
                                    <label class="form-label"><a href="#"> <b> MQTT Control Off </b></a></label>
                                    <input type="text" id="mqtt_control_off" name="mqtt_control_off"
                                        class="form-control" required>
                                    <div class="error-message" id="error-mqtt_control_off"></div>
                                </div>
                                <hr>
                                <div>
                                    <label class="form-label">Org</label>
                                    <input type="text" id="org" name="org" class="form-control" required>
                                    <div class="error-message" id="error-org"></div>
                                </div>
                                <div>
                                    <label class="form-label">Bucket</label>
                                    <input type="text" id="bucket" name="bucket" class="form-control" required>
                                    <div class="error-message" id="error-bucket"></div>
                                </div>
                                <hr>
                                <div>
                                    <label class="form-label"> <a href="#"> <b>Mqtt device name </b></a> </label>
                                    <input type="text" id="mqtt_device_name" name="mqtt_device_name"
                                        class="form-control">
                                    <div class="error-message" id="error-mqtt_device_name"></div>
                                </div>
                                <div>
                                    <label class="form-label"><a href="#"> <b> Mqtt status over name </b></a> </label>
                                    <input type="text" id="mqtt_status_over_name" name="mqtt_status_over_name"
                                        class="form-control">
                                    <div class="error-message" id="error-mqtt_status_over_name"></div>
                                </div>
                                <div>
                                    <label class="form-label"><a href="#"> <b> Mqtt Config </b></a></label>
                                    <label class="form-label">EXP1:
                                        {"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}
                                    </label>
                                    <label class="form-label">EXP2:
                                        {"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"IO1","5":"overIO1","6":"contRelay2","7":"actRelay2","8":"IO2","9":"overIO2","10":"contRelay3","11":"actRelay3","12":"IO3","13":"overIO3"}
                                    </label>
                                    <input type="text" id="mqtt_status_data_name" name="mqtt_status_data_name"
                                        class="form-control">
                                    <div class="error-message" id="error-mqtt_status_data_name"></div>
                                </div>
                                <div>
                                    <label class="form-label"> <a href="#"> <b> Mqtt act relay name </b></a> </label>
                                    <input type="text" id="mqtt_act_relay_name" name="mqtt_act_relay_name"
                                        class="form-control">
                                    <div class="error-message" id="error-mqtt_act_relay_name"></div>
                                </div>
                                <div>
                                    <label class="form-label"><a href="#"> <b> Mqtt control relay name </b></a> </label>
                                    <input type="text" id="mqtt_control_relay_name" name="mqtt_control_relay_name"
                                        class="form-control">
                                    <div class="error-message" id="error-mqtt_control_relay_name"></div>
                                </div>

                                <input type="hidden" id="status" name="status" value="0">
                            </div>
                        </div>
                        <div class="card-footer bg-transparent mt-auto">
                            <div class="btn-list justify-content-end d-flex">
                                <button type="submit" id="submitBtn" class="btn btn-primary btn-2">
                                    <?php echo $this->lang->line('button_submit'); ?>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
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
async function fetchDeviceData(device_id) {
    var apiUrl = `${baseApiUrl}settings/deviceeditget?device_id=${device_id}`;
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

function fillForm(data) {
    loadSelectOptions(`${baseApiUrl}settings/devicetypeall`, 'type_id', 'type_id', 'type_name', data.type_id);
    loadSelectOptions(`${baseApiUrl}settings/settingall`, 'setting_id', 'setting_id', 'setting_name', data.setting_id);
    loadSelectOptions(`${baseApiUrl}settings/locationall`, 'location_id', 'location_id', 'location_name', data
        .location_id);
    loadSelectOptions(`${baseApiUrl}settings/lismqttall`, 'mqtt_id', 'mqtt_id', 'mqtt_name', data.mqtt_id);

    document.getElementById('device_name').value = data.device_name || '';
    document.getElementById('sn').value = data.sn || '';
    document.getElementById('hardware_id').value = data.hardware_id || '';
    document.getElementById('status_warning').value = data.status_warning || '';
    document.getElementById('recovery_warning').value = data.recovery_warning || '';
    document.getElementById('status_alert').value = data.status_alert || '';
    document.getElementById('recovery_alert').value = data.recovery_alert || '';
    document.getElementById('time_life').value = data.time_life || '';
    document.getElementById('period').value = data.period || '';
    document.getElementById('work_status').value = data.work_status || '';
    document.getElementById('max').value = data.max || '';
    document.getElementById('min').value = data.min || '';
    document.getElementById('model').value = data.model || '';
    document.getElementById('vendor').value = data.vendor || '';
    document.getElementById('comparevalue').value = data.comparevalue || '';
    document.getElementById('unit').value = data.unit || '';
    document.getElementById('oid').value = data.oid || '';
    document.getElementById('action_id').value = data.action_id || '';
    document.getElementById('status_alert_id').value = data.status_alert_id || '';
    document.getElementById('mqtt_data_value').value = encodeURI(data.mqtt_data_value) || '';
    document.getElementById('mqtt_data_control').value = encodeURI(data.mqtt_data_control) || '';
    document.getElementById('measurement').value = data.measurement || '';
    document.getElementById('mqtt_control_on').value = data.mqtt_control_on || '';
    document.getElementById('mqtt_control_off').value = data.mqtt_control_off || '';
    document.getElementById('org').value = data.org || data.mqtt_org || '';
    document.getElementById('bucket').value = data.bucket || data.mqtt_bucket || '';
    document.getElementById('status').value = data.status || '';
    document.getElementById('mqtt_device_name').value = data.mqtt_device_name || '';
    document.getElementById('mqtt_status_over_name').value = data.mqtt_status_over_name || '';
    document.getElementById('mqtt_status_data_name').value = data.mqtt_status_data_name || '';
    document.getElementById('mqtt_act_relay_name').value = data.mqtt_act_relay_name || '';
    document.getElementById('mqtt_control_relay_name').value = data.mqtt_control_relay_name || '';
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
        loadSelectOptions(`${baseApiUrl}settings/devicetypeall`, 'type_id', 'type_id', 'type_name');
        loadSelectOptions(`${baseApiUrl}settings/settingall`, 'setting_id', 'setting_id', 'setting_name');
        loadSelectOptions(`${baseApiUrl}settings/locationall`, 'location_id', 'location_id',
            'location_name');
        loadSelectOptions(`${baseApiUrl}settings/lismqttall`, 'mqtt_id', 'mqtt_id', 'mqtt_name');
    }

    document.getElementById('devicesAddForm').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;

        const formData = {
            device_id: device_id,
            type_id: document.getElementById('type_id').value,
            setting_id: document.getElementById('setting_id').value,
            location_id: document.getElementById('location_id').value,
            mqtt_id: document.getElementById('mqtt_id').value,
            device_name: document.getElementById('device_name').value,
            sn: document.getElementById('sn').value,
            hardware_id: document.getElementById('hardware_id').value,
            status_warning: document.getElementById('status_warning').value,
            recovery_warning: document.getElementById('recovery_warning').value,
            status_alert: document.getElementById('status_alert').value,
            recovery_alert: document.getElementById('recovery_alert').value,
            time_life: document.getElementById('time_life').value,
            period: document.getElementById('period').value,
            work_status: document.getElementById('work_status').value,
            max: document.getElementById('max').value,
            min: document.getElementById('min').value,
            model: document.getElementById('model').value,
            vendor: document.getElementById('vendor').value,
            comparevalue: document.getElementById('comparevalue').value,
            unit: document.getElementById('unit').value,
            oid: document.getElementById('oid').value,
            action_id: document.getElementById('action_id').value,
            status_alert_id: document.getElementById('status_alert_id').value,
            mqtt_data_value: document.getElementById('mqtt_data_value').value,
            mqtt_data_control: document.getElementById('mqtt_data_control').value,
            measurement: document.getElementById('measurement').value,
            mqtt_control_on: document.getElementById('mqtt_control_on').value,
            mqtt_control_off: document.getElementById('mqtt_control_off').value,
            org: document.getElementById('org').value,
            bucket: document.getElementById('bucket').value,
            status: document.getElementById('status').value,
            mqtt_device_name: document.getElementById('mqtt_device_name').value,
            mqtt_status_over_name: document.getElementById('mqtt_status_over_name').value,
            mqtt_status_data_name: document.getElementById('mqtt_status_data_name').value,
            mqtt_act_relay_name: document.getElementById('mqtt_act_relay_name').value,
            mqtt_control_relay_name: document.getElementById('mqtt_control_relay_name').value,
        };

        // Validate
        let hasError = false;
        Object.keys(formData).forEach(key => {
            const input = document.getElementById(key);
            if (input && input.hasAttribute('required') && !formData[key]) {
                document.getElementById('error-' + key).textContent = 'กรุณากรอกข้อมูล';
                hasError = true;
            } else if (document.getElementById('error-' + key)) {
                document.getElementById('error-' + key).textContent = '';
            }
        });
        if (hasError) {
            document.getElementById('submitBtn').disabled = false;
            return;
        }

        // ส่งข้อมูลไป API updatedevice
        fetch(`${baseApiUrl}settings/updatedevice`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(resp => {
                document.getElementById('submitBtn').disabled = false;
                if (resp.status === 'success' || resp.code === 200) {
                    document.getElementById('responseMessage').innerHTML =
                        '<div class="alert alert-success">Update successful!</div>';
                    Swal.fire({
                        icon: 'success',
                        title: 'Update successful.',
                        text: 'Device update  successfully. | แก้ไขอุปกรณ์เรียบร้อยแล้ว',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    }).then(() => {
                        window.location.href =
                            "<?php echo base_url('settings/device/edit?id='); ?>" +
                            device_id;
                    });
                } else {
                    document.getElementById('responseMessage').innerHTML =
                        '<div class="alert alert-danger">Update failed: ' + (resp.message ||
                            'Unknown error') + '</div>';
                }
            })
            .catch(error => {
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('responseMessage').innerHTML =
                    '<div class="alert alert-danger">Error: ' + error + '</div>';
            });
    });
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