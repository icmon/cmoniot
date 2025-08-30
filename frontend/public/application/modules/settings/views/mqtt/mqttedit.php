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
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$id = @$input['id'] ?? '';
$api_url = $this->config->item('api_url') . 'settings/lismqtt?mqtt_id=' . $id;
$api_typeall = $this->config->item('api_url') . 'settings/typeall';
$api_updatemqtt = $this->config->item('api_url') . 'settings/updatemqtt';
$home_url = base_url('settings/mqtt');
$detail_url = base_url('settings/mqtt/detail?id=' . $id);
$api_LocationAll = $this->config->item('api_url') . 'settings/locationall';
?>

<!-- jQuery (จำเป็นสำหรับ DataTables)  /libs/-->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- DataTables JS -->
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<script>
var mqtt_ids = <?php echo json_encode(@$input['id']); ?>;
var apiUrl = <?php echo json_encode($api_url); ?>;
var apiTypeAll = <?php echo json_encode($api_typeall); ?>;
var api_LocationAll = <?php echo json_encode($api_LocationAll); ?>;
var apiUpdateMqtt = <?php echo json_encode($api_updatemqtt); ?>;
var tokens = <?php echo json_encode($token); ?>;
</script>

<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10 mx-auto">
                <form class="space-y" id="mqttForm">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">MQTT</h3>
                            <input type="hidden" id="mqtt_id" name="mqtt_id" class="form-control">
                        </div>
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div>
                                <h3 class="card-title mb-0">Information</h3>
                            </div>
                            <div>
                                <div class="d-flex gap-2">
                                    <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                        <i class="fa fa-home"></i> Main
                                    </a>
                                    <a href="<?php echo $detail_url; ?>" class="btn btn-warning btn-sm">
                                        <i class="fa fa-edit"></i> Detail
                                    </a>

                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="space-y">
                                <div>
                                    <label class="form-label">Type</label>
                                    <select id="mqtt_type_id" name="mqtt_type_id" class="form-select">
                                        <option value="">-- Select Type --</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="form-label">Location</label>
                                    <select id="location_id" name="location_id" class="form-select">
                                        <option value="">-- Select Location --</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="form-label">MQTT Name</label>
                                    <input type="text" id="mqtt_name" name="mqtt_name" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Host</label>
                                    <input type="text" id="host" name="host" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Port</label>
                                    <input type="number" id="port" name="port" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Username</label>
                                    <input type="text" id="username" name="username" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Password</label>
                                    <input type="text" id="password" name="password" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Secret</label>
                                    <input type="text" id="secret" name="secret" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Expire In</label>
                                    <input type="text" id="expire_in" name="expire_in" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Token value</label>
                                    <input type="text" id="token_value" name="token_value" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Org</label>
                                    <input type="text" id="org" name="org" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Bucket</label>
                                    <input type="text" id="bucket" name="bucket" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Envavorment</label>
                                    <input type="text" id="envavorment" name="envavorment" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Latitude</label>
                                    <input type="text" id="latitude" name="latitude" class="form-control">
                                </div>
                                <div>
                                    <label class="form-label">Longitude</label>
                                    <input type="text" id="longitude" name="longitude" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent mt-auto">
                            <div class="btn-list justify-content-end d-flex">
                                <button type="submit" id="submitBtn" value="Submit" class="btn btn-primary btn-2">
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
var mqttTypeIdValue = null;
var LocationValue = null;
// Load type list and set selected if available
function loadTypeList(selectedTypeId = null) {
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var api_typeall = `${baseApiUrl}settings/typeall`
    <?php echo $id; ?>;
    fetch(api_typeall, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(resp => {
            if (resp && Array.isArray(resp.payload)) {
                var select = document.getElementById('mqtt_type_id');
                select.innerHTML = '<option value="">-- Select Type --</option>';
                resp.payload.forEach(type => {
                    var option = document.createElement('option');
                    option.value = type.type_id;
                    option.textContent = type.type_name;
                    select.appendChild(option);
                });
                // Set selected value if provided
                if (selectedTypeId) {
                    select.value = selectedTypeId;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching type list:', error);
        });
}

function loadLocationList(selectedlocation_id = null) {
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiLocationAll = `${baseApiUrl}settings/locationall`
    fetch(apiLocationAll, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(resp => {
            if (resp && Array.isArray(resp.payload)) {
                var select = document.getElementById('location_id');
                select.innerHTML = '<option value="">-- Select Type --</option>';
                resp.payload.forEach(type => {
                    var option = document.createElement('option');
                    option.value = type.location_id;
                    option.textContent = type.location_name;
                    select.appendChild(option);
                });
                // Set selected value if provided
                if (selectedlocation_id) {
                    select.value = selectedlocation_id;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching type list:', error);
        });
}

// Load MQTT data and set form fields
function loadMqttData() {
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUrl = `${baseApiUrl}settings/lismqtt?mqtt_id=` + mqtt_ids;
    fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(resp => {
            var data = resp.payload && resp.payload.data && resp.payload.data[0] ? resp.payload.data[0] : null;
            if (!data) {
                loadTypeList();
                loadLocationList();
                return;
            }

            document.getElementById('mqtt_id').value = data.mqtt_id || '';
            mqttTypeIdValue = data.mqtt_type_id || '';
            LocationValue = data.location_id || '';
            // alert(LocationValue);
            document.getElementById('mqtt_name').value = data.mqtt_name || '';
            document.getElementById('host').value = data.host || '';
            document.getElementById('port').value = data.port || '';
            document.getElementById('username').value = data.username || '';
            document.getElementById('password').value = data.password || '';
            document.getElementById('secret').value = data.secret || '';
            document.getElementById('expire_in').value = data.expire_in || '';
            document.getElementById('token_value').value = data.token_value || '';
            document.getElementById('org').value = data.org || '';
            document.getElementById('bucket').value = data.bucket || '';
            document.getElementById('envavorment').value = data.envavorment || '';
            document.getElementById('latitude').value = data.latitude || '';
            document.getElementById('longitude').value = data.longitude || '';

            // Load type list and set selected
            loadTypeList(mqttTypeIdValue);
            loadLocationList(LocationValue);
        })
        .catch(error => {
            console.error('Error fetching MQTT data:', error);
            loadTypeList();
            loadLocationList();
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadMqttData();
});

// Form submit handler for updating data via API
document.getElementById('mqttForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    document.getElementById('submitBtn').disabled = true;

    // Collect form data
    var formData = {
        mqtt_id: document.getElementById('mqtt_id').value,
        mqtt_type_id: document.getElementById('mqtt_type_id').value,
        location_id: document.getElementById('location_id').value,
        mqtt_name: document.getElementById('mqtt_name').value,
        host: document.getElementById('host').value,
        port: document.getElementById('port').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        secret: document.getElementById('secret').value,
        expire_in: document.getElementById('expire_in').value,
        token_value: document.getElementById('token_value').value,
        org: document.getElementById('org').value,
        bucket: document.getElementById('bucket').value,
        envavorment: document.getElementById('envavorment').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value
    };


    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUpdateMqtt = `${baseApiUrl}settings/updatemqtt`
    // Send update request to API
    fetch(apiUpdateMqtt, {
            method: 'POST', // Change to 'PUT' if your API expects PUT
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(resp => {
            document.getElementById('submitBtn').disabled = false;
            let msgBox = document.getElementById('responseMessage');
            if (resp.status === 'success' || resp.code === 200) {
                msgBox.innerHTML = '<div class="alert alert-success">Update successful!</div>';
                Swal.fire({
                    icon: 'success',
                    title: '<?php echo $this->lang->line('t2_please_Update_successful'); ?>!',
                    text: '<?php echo $this->lang->line('t2_please_Update_successful'); ?>',
                    timer: 500,
                    timerProgressBar: true,
                    // ไม่ต้องซ่อนปุ่ม
                    showConfirmButton: false,

                    didOpen: () => {
                        // ทำให้ปุ่ม OK กดไม่ได้ (Disabled)
                        var confirmButton = Swal.getConfirmButton();
                        if (confirmButton) {
                            confirmButton.disabled = true;
                        }
                    }
                });
                return true;
            } else {
                msgBox.innerHTML = '<div class="alert alert-danger">Update failed: ' + (resp.message ||
                    'Unknown error') + '</div>';
            }
        })
        .catch(error => {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('responseMessage').innerHTML =
                '<div class="alert alert-danger">Error updating data: ' + error + '</div>';
            console.error(error);
        });
});
</script>