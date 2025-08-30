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
$api_LocationAll = $this->config->item('api_url') . 'settings/locationall';
$api_typeall = $this->config->item('api_url') . 'settings/typeall';
$api_createmqtt = $this->config->item('api_url') . 'settings/createmqtt';
$home_url = base_url('settings/mqtt');
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

<!-- jQuery (จำเป็นสำหรับ DataTables)  /libs/-->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- DataTables JS -->
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>

<script>
var apiLocationAll = <?php echo json_encode($api_LocationAll); ?>;
var apiTypeAll = <?php echo json_encode($api_typeall); ?>;
var apiCreateMqtt = <?php echo json_encode($api_createmqtt); ?>;
var tokens = <?php echo json_encode($token); ?>;
</script>

<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10 mx-auto">
                <form class="space-y" id="mqttForm" autocomplete="off">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">MQTT</h3>
                        </div>

                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div>
                                <h3 class="card-title mb-0">Add New</h3>
                            </div>
                            <div>
                                <div class="d-flex gap-2">
                                    <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                        <i class="fa fa-home"></i> Main
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
                                        <!-- ตัวเลือกจะถูกโหลดด้วย JS -->
                                    </select>
                                    <div class="error-message" id="error-mqtt_type_id"></div>
                                </div>

                                <div>
                                    <label class="form-label">Location</label>
                                    <select id="location_id" name="location_id" class="form-select">
                                        <option value="">-- Select Location --</option>
                                        <!-- ตัวเลือกจะถูกโหลดด้วย JS -->
                                    </select>
                                    <div class="error-message" id="error-location_id"></div>
                                </div>

                                <div>
                                    <label class="form-label">MQTT Name</label>
                                    <input type="text" id="mqtt_name" name="mqtt_name" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-mqtt_name"></div>
                                </div>
                                <div>
                                    <label class="form-label">Host</label>
                                    <input type="text" id="host" name="host" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-host"></div>
                                </div>
                                <div>
                                    <label class="form-label">Port</label>
                                    <input type="number" id="port" name="port" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-port"></div>
                                </div>
                                <div>
                                    <label class="form-label">Username</label>
                                    <input type="text" id="username" name="username" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-username"></div>
                                </div>
                                <div>
                                    <label class="form-label">Password</label>
                                    <input type="text" id="password" name="password" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-password"></div>
                                </div>
                                <div>
                                    <label class="form-label">Secret</label>
                                    <input type="text" id="secret" name="secret" class="form-control" autocomplete="on"
                                        required>
                                    <div class="error-message" id="error-secret"></div>
                                </div>
                                <div>
                                    <label class="form-label">Expire In</label>
                                    <input type="text" id="expire_in" name="expire_in" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-expire_in"></div>
                                </div>
                                <div>
                                    <label class="form-label">Token value</label>
                                    <input type="text" id="token_value" name="token_value" class="form-control"
                                        autocomplete="on" required>
                                    <div class="error-message" id="error-token_value"></div>
                                </div>
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
                                <?php ###################?>
                                <div>
                                    <label class="form-label">Envavorment</label>
                                    <input type="text" id="envavorment" name="envavorment" class="form-control"
                                        autocomplete="on">
                                    <div class="error-message" id="error-envavorment"></div>
                                </div>
                                <?php ###################?>
                                <div>
                                    <label class="form-label">Latitude</label>
                                    <input type="text" id="latitude" name="latitude" class="form-control"
                                        autocomplete="on">
                                    <div class="error-message" id="error-latitude"></div>
                                </div>
                                <?php ###################?>
                                <div>
                                    <label class="form-label">Longitude</label>
                                    <input type="text" id="longitude" name="longitude" class="form-control"
                                        autocomplete="on">
                                    <div class="error-message" id="error-longitude"></div>
                                </div>
                                <?php ###################?>
                                <input type="hidden" id="status" name="status" value="0">
                                <input type="hidden" id="sort" name="sort" value="1">
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
// โหลด type list จาก API
function loadTypeList() {
    fetch(apiTypeAll, {
            headers: {
                'Authorization': 'Bearer ' + tokens
            }
        })
        .then(response => response.json())
        .then(resp => {
            if (resp && Array.isArray(resp.payload)) {
                const select = document.getElementById('mqtt_type_id');
                select.innerHTML = '<option value="">-- Select Type --</option>';
                resp.payload.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.type_id;
                    option.textContent = type.type_name;
                    select.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching type list:', error);
        });
}

function loadLocationList() {
    fetch(apiLocationAll, {
            headers: {
                'Authorization': 'Bearer ' + tokens
            }
        })
        .then(response => response.json())
        .then(resp => {
            if (resp && Array.isArray(resp.payload)) {
                const select = document.getElementById('location_id');
                select.innerHTML = '<option value="">-- Select Location --</option>';
                resp.payload.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location.location_id;
                    option.textContent = location.location_name;
                    select.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching type list:', error);
        });
}

// ฟังก์ชันแสดง/ลบ error
function setError(inputId, message) {
    const input = document.getElementById(inputId);
    input.classList.add('input-error');
    input.classList.remove('input-success');
    document.getElementById('error-' + inputId).textContent = message;
}

function setSuccess(inputId) {
    const input = document.getElementById(inputId);
    input.classList.remove('input-error');
    input.classList.add('input-success');
    document.getElementById('error-' + inputId).textContent = '';
}

// ตรวจสอบข้อมูลฟอร์ม
function validateForm(formData) {
    let errors = [];

    // Type
    if (!formData.mqtt_type_id) {
        setError('mqtt_type_id', 'กรุณาเลือกประเภท');
        errors.push('mqtt_type_id');
    } else {
        setSuccess('mqtt_type_id');
    }
    // location
    if (!formData.location_id) {
        setError('location_id', 'กรุณาเลือก location');
        errors.push('location_id');
    } else {
        setSuccess('location_id');
    }
    // MQTT Name
    if (!formData.mqtt_name || formData.mqtt_name.trim().length < 3) {
        setError('mqtt_name', 'กรุณากรอกชื่อ MQTT อย่างน้อย 3 ตัวอักษร');
        errors.push('mqtt_name');
    } else {
        setSuccess('mqtt_name');
    }
    // Host
    if (!formData.host || !/^([a-zA-Z0-9\.\-]+)$/.test(formData.host)) {
        setError('host', 'กรุณากรอก Host ให้ถูกต้อง (เช่น domain หรือ IP)');
        errors.push('host');
    } else {
        setSuccess('host');
    }
    // Port
    if (!formData.port || isNaN(formData.port) || formData.port < 1 || formData.port > 65535) {
        setError('port', 'กรุณากรอก Port (1-65535)');
        errors.push('port');
    } else {
        setSuccess('port');
    }

    // ลบ error อื่นๆ ที่ไม่ได้ validate
    ['username', 'password', 'secret', 'expire_in', 'token_value', 'org', 'bucket', 'envavorment'].forEach(id =>
        setSuccess(id));

    return errors;
}

document.addEventListener('DOMContentLoaded', function() {
    loadTypeList();
    loadLocationList();

    document.getElementById('mqttForm').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;

        // ตรวจสอบ token ก่อน
        if (!tokens || tokens === "" || tokens === null || tokens === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Token Error',
                text: 'Session หมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
                confirmButtonText: 'ตกลง'
            }).then(() => {
                window.location.href = "<?php echo base_url('dashboard'); ?>";
            });
            document.getElementById('submitBtn').disabled = false;
            return false;
        }

        // เก็บข้อมูลฟอร์ม
        var formData = {
            mqtt_type_id: document.getElementById('mqtt_type_id').value,
            location_id: document.getElementById('location_id').value,
            sort: document.getElementById('sort').value,
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
            status: document.getElementById('status').value, // <-- เพิ่ม ,
            latitude: document.getElementById('latitude').value, // <-- เพิ่ม ,
            longitude: document.getElementById('longitude').value
        };


        // validate
        const errors = validateForm(formData);
        if (errors.length > 0) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById(errors[0]).focus();
            return false;
        }

        // ส่งข้อมูลไป API
        const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        const apiCreateMqtt = `${baseApiUrl}settings/createmqtt`
        fetch(apiCreateMqtt, {
                method: 'POST',
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
                    msgBox.innerHTML = '<div class="alert alert-success">Create successful!</div>';
                    Swal.fire({
                        icon: 'success',
                        title: '<?php echo $this->lang->line('t2_Create_successful'); ?>',
                        text: '<?php echo $this->lang->line('t2_New_data_has_been_created'); ?>',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    }).then(() => {
                        // Redirect หลังจากแสดง Swal เสร็จ
                        window.location.href = "<?php echo base_url('settings/mqtt'); ?>";
                    });
                    // ถ้าอยาก redirect ทันที (ไม่ต้องรอ Swal ปิด) ให้ย้าย window.location.href มานอก Swal
                    // document.getElementById('mqttForm').reset();
                    // ['mqtt_type_id', 'mqtt_name', ...].forEach(id => setSuccess(id));
                } else {
                    msgBox.innerHTML = '<div class="alert alert-danger">Create failed: ' + (resp
                        .message || 'Unknown error') + '</div>';
                }
            })
            .catch(error => {
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('responseMessage').innerHTML =
                    '<div class="alert alert-danger">Error creating data: ' + error + '</div>';
                console.error(error);
            });

    });
});
</script>