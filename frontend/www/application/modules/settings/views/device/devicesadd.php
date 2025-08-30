<?php
$language = $this->lang->language;
$lang = $this->lang->line('lang');
$langs = $this->lang->line('langs');

if (!@$_SESSION['token']) {
    redirect(base_url('dashboard'));
    die();
} else {
    $token = $_SESSION['token'];
}
$api_typeall = $this->config->item('api_url') . 'settings/devicetypeall';
$api_createdevice = $this->config->item('api_url') . 'settings/createdevice';
$home_url = base_url('settings/device');

$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$bucket = @$input['bucket'] ?? '';
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
                            <h3 class="card-title">Device</h3>
                        </div>
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div>
                                <h3 class="card-title mb-0">Add Device</h3>
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
                                    <select id="type_id" name="type_id" class="form-select" autocomplete="on"
                                        required></select>
                                    <div class="error-message" id="error-type_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">Setting</label>
                                    <select id="setting_id" name="setting_id" class="form-select" autocomplete="on"
                                        required></select>
                                    <div class="error-message" id="error-setting_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">Location</label>
                                    <select id="location_id" name="location_id" class="form-select" autocomplete="on"
                                        required></select>
                                    <div class="error-message" id="error-location_id"></div>
                                </div>
                                <div>
                                    <label class="form-label">MQTT</label>
                                    <select id="mqtt_id" name="mqtt_id" class="form-select" autocomplete="on"
                                        required></select>
                                    <div class="error-message" id="error-mqtt_id"></div>
                                </div>
                                <!-- Text/Number Inputs -->
                                <div>
                                    <label class="form-label">Device Name</label>
                                    <input type="text" id="device_name" name="device_name" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-device_name"></div>
                                </div>
                                <div>
                                    <label class="form-label">SN</label>
                                    <input type="text" id="sn" name="sn" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-sn"></div>
                                </div>
                                <div>
                                    <label class="form-label">Hardware ID</label>
                                    <input type="number" id="hardware_id" name="hardware_id" class="form-control"
                                        autocomplete="on">
                                    <div class="error-message" id="error-hardware_id"></div>
                                </div>
                                <hr>
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
                                <hr>
                                <div>
                                    <label class="form-label">Time Life</label>
                                    <input type="number" id="time_life" name="time_life" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-time_life"></div>
                                </div>
                                <div>
                                    <label class="form-label">Period</label>
                                    <input type="text" id="period" name="period" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-period"></div>
                                </div>
                                <div>
                                    <label class="form-label">Work Status</label>
                                    <input type="number" id="work_status" name="work_status" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-work_status"></div>
                                </div>
                                <div>
                                    <label class="form-label">Max</label>
                                    <input type="text" id="max" name="max" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-max"></div>
                                </div>
                                <div>
                                    <label class="form-label">Min</label>
                                    <input type="text" id="min" name="min" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-min"></div>
                                </div>
                                <div>
                                    <label class="form-label">Model</label>
                                    <input type="text" id="model" name="model" class="form-control">
                                    <div class="error-message" id="error-model"></div>
                                </div>
                                <div>
                                    <label class="form-label">Vendor</label>
                                    <input type="text" id="vendor" name="vendor" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-vendor"></div>
                                </div>
                                <div>
                                    <label class="form-label">Compare Value</label>
                                    <input type="text" id="comparevalue" name="comparevalue" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-comparevalue"></div>
                                </div>
                                <div>
                                    <label class="form-label">Unit</label>
                                    <input type="text" id="unit" name="unit" class="form-control" autocomplete="on">
                                    <div class="error-message" id="error-unit"></div>
                                </div>
                                <div>
                                    <label class="form-label">OID</label>
                                    <input type="text" id="oid" name="oid" class="form-control" autocomplete="on">
                                    <div class="error-message" id="error-oid"></div>
                                </div>
                                <div>
                                    <label class="form-label">Action ID</label>
                                    <input type="number" id="action_id" name="action_id" class="form-control"
                                        autocomplete="on">
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
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-mqtt_data_value"></div>
                                </div>
                                <div>
                                    <label class="form-label">MQTT Data Control</label>
                                    <input type="text" id="mqtt_data_control" name="mqtt_data_control"
                                        class="form-control" autocomplete="on" required>
                                    <div class="error-message" id="error-mqtt_data_control"></div>
                                </div>
                                <div>
                                    <label class="form-label">Measurement</label>
                                    <input type="text" id="measurement" name="measurement" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-measurement"></div>
                                </div>
                                <hr>
                                <div>
                                    <label class="form-label"><a href="#"> <b>MQTT Control On </b></a></label>
                                    <input type="text" id="mqtt_control_on" name="mqtt_control_on" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-mqtt_control_on"></div>
                                </div>
                                <div>
                                    <label class="form-label"> <a href="#"> <b>MQTT Control Off</b></a></label>
                                    <input type="text" id="mqtt_control_off" name="mqtt_control_off"
                                        class="form-control" autocomplete="on" required>
                                    <div class="error-message" id="error-mqtt_control_off"></div>
                                </div>
                                <hr>
                                <div>
                                    <label class="form-label">Org</label>
                                    <input type="text" id="org" name="org" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-org"></div>
                                </div>
                                <div>
                                    <label class="form-label">Bucket</label>
                                    <input type="text" id="bucket" name="bucket" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-bucket"></div>
                                </div>

                                <hr>
                                <div>
                                    <label class="form-label"> <a href="#"> <b>Mqtt device name </b></a> </label>
                                    <input type="text" id="mqtt_device_name" name="mqtt_device_name"
                                        class="form-control" autocomplete="on">
                                    <div class="error-message" id="error-mqtt_device_name"></div>
                                </div>


                                <div>
                                    <label class="form-label"><a href="#"> <b> Mqtt status over name </b></a></label>
                                    <input type="text" id="mqtt_status_over_name" name="mqtt_status_over_name"
                                        class="form-control" autocomplete="on">
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
                                        class="form-control" autocomplete="on">
                                    <div class="error-message" id="error-mqtt_status_data_name"></div>
                                </div>


                                <div>
                                    <label class="form-label"> <a href="#"> <b> Mqtt act relay name</b></a></label>
                                    <input type="text" id="mqtt_act_relay_name" name="mqtt_act_relay_name"
                                        class="form-control" autocomplete="on">
                                    <div class="error-message" id="error-mqtt_act_relay_name"></div>
                                </div>


                                <div>
                                    <label class="form-label"> <a href="#"> <b> Mqtt control relay name </b></a></label>
                                    <input type="text" id="mqtt_control_relay_name" name="mqtt_control_relay_name"
                                        class="form-control" autocomplete="on">
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
var tokens = <?php echo json_encode($token); ?>;
var bucket = <?php echo json_encode($bucket); ?>;


// --- Utility: อ่าน query string ---
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// --- โหลด select options พร้อม callback หลังโหลดเสร็จ ---
function loadSelectOptions(apiUrl, selectId, valueKey, textKey, callback) {
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
                if (selectId === 'mqtt_id') {
                    data.payload.sort((a, b) => a.mqtt_id - b.mqtt_id);
                }
                data.payload.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item[valueKey];
                    option.textContent = item[textKey];
                    select.appendChild(option);
                });
            }
            if (typeof callback === 'function') callback();
        });
}

document.addEventListener('DOMContentLoaded', function() {
    // --- ตั้งค่า bucket จาก query string ---
    var mqtt_id = getQueryParam('mqtt_id');
    var bucketValue = getQueryParam('bucket');
    if (bucketValue) {
        /*
         mqtt_data_value: document.getElementById('mqtt_data_value').value,
            mqtt_data_control: document.getElementById('mqtt_data_control').value,
         */
        document.getElementById('mqtt_control_on').value = 1;
        document.getElementById('mqtt_control_off').value = 0;
        document.getElementById('mqtt_data_value').value = bucketValue + '/DATA';
        document.getElementById('mqtt_data_control').value = bucketValue + '/CONTROL';
        document.getElementById('status_warning').value = '32';
        document.getElementById('recovery_warning').value = '25';
        document.getElementById('status_alert').value = '35';
        document.getElementById('recovery_alert').value = '25';
        document.getElementById('org').value = 'cmon_org';
        document.getElementById('org').value = 'cmon_org';
        document.getElementById('bucket').value = bucketValue;
        document.getElementById('time_life').value = '3600';
        document.getElementById('period').value = '35';
        document.getElementById('work_status').value = '1';
        document.getElementById('max').value = '35';
        document.getElementById('min').value = '25';
        document.getElementById('model').value = 'cmon';
        document.getElementById('unit').value = '°C';
        document.getElementById('vendor').value = 'cmon';
        document.getElementById('comparevalue').value = '1';
        document.getElementById('mqtt_device_name').value;
        document.getElementById('mqtt_status_over_name').value;
        document.getElementById('mqtt_status_data_name').value =
            '{"0":"bucket","1":"temperature","2":"contRelay1","3":"actRelay1","4":"fan1","5":"overFan1","6":"contRelay2","7":"actRelay2","8":"fan2","9":"overFan2"}';
        document.getElementById('mqtt_act_relay_name').value;
        document.getElementById('mqtt_control_relay_name').value;

    }

    // --- โหลด mqtt_id และ set ค่า default จาก query string ---
    loadSelectOptions(`${baseApiUrl}settings/lismqttall`, 'mqtt_id', 'mqtt_id', 'mqtt_name', function() {
        const mqttIdValue = getQueryParam('mqtt_id');
        if (mqttIdValue) {
            document.getElementById('mqtt_id').value = mqttIdValue;
        }
    });

    // --- โหลด select อื่นๆ ---
    loadSelectOptions(`${baseApiUrl}settings/devicetypeall`, 'type_id', 'type_id', 'type_name');
    loadSelectOptions(`${baseApiUrl}settings/settingall`, 'setting_id', 'setting_id', 'setting_name');
    loadSelectOptions(`${baseApiUrl}settings/locationall`, 'location_id', 'location_id', 'location_name');

    // --- Submit Form ---
    document.getElementById('devicesAddForm').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;

        // เก็บข้อมูลฟอร์ม
        const formData = {
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
            mqtt_data_value: encodeURI(document.getElementById('mqtt_data_value').value),
            mqtt_data_control: encodeURI(document.getElementById('mqtt_data_control').value),
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
        // ส่งข้อมูลไป API
        /***************/
        fetch(`${baseApiUrl}settings/createdevice`, {
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
                        '<div class="alert alert-success">Create successful!</div>';
                    Swal.fire({
                        icon: 'success',
                        title: 'Data creation successful / สร้างข้อมูลสำเร็จ..',
                        text: 'New device added successfully. /เพิ่มอุปกรณ์ใหม่เรียบร้อยแล้ว..',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    }).then(() => {
                        window.location.href =
                            "<?php echo base_url('settings/device?bucket='); ?>" +
                            bucketValue + '&mqtt_id=' + mqtt_id;
                    });
                } else {
                    document.getElementById('responseMessage').innerHTML =
                        '<div class="alert alert-danger">Create failed: ' + (resp.message ||
                            'Unknown error') + '</div>';

                    // ---------- focus ช่องแรกที่ error ที่ field หลังบ้านแจ้ง errors ----------
                    let firstField = null;
                    if (resp.errors && typeof resp.errors === 'object') {
                        Object.keys(resp.errors).forEach(function(key) {
                            let input = document.getElementById(key);
                            let errDiv = document.getElementById('error-' + key);
                            if (input) {
                                input.classList.add('input-error');
                                if (!firstField) firstField = input;
                            }
                            if (errDiv) errDiv.textContent = resp.errors[key];
                        });
                        if (firstField) firstField.focus();
                    } else {
                        // Show swal ปกติ
                        Swal.fire('Create failed: ' + (resp.message || 'Unknown error'),
                            (resp.message_th || 'Unknown error'),
                            'error'
                        );
                    }
                }
            })
            .catch(error => {
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('responseMessage').innerHTML =
                    '<div class="alert alert-danger">Error: ' + error + '</div>';
            });
        /***************/
    });
});
</script>