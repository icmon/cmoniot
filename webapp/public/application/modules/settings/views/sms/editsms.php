<?php
// ตรวจสอบการล็อกอินและโหลดข้อมูลเริ่มต้น
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
if ($input == null) {
    $input = @$this->input->get();
}

// รองรับกรณีรับ sms_id กับ id
$sms_id = $input['sms_id'] ?? '';
if ($sms_id == "") {
    $sms_id = $input['id'] ?? '';
}

$api_url = $this->config->item('api_url') . 'settings/listsmspage?sms_id=' . $sms_id;
$api_updatealarm = $this->config->item('api_url') . 'settings/updatesms';
$home_url = base_url('settings/sms');
$detail_url = base_url('alarm/sms/detail?sms_id=' . $sms_id);
?>
<!-- CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- JS -->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>

<script>
// ตัวแปรจาก PHP (ใช้ใน JS), กำหนดโดยไม่ใส่เครื่องหมาย quote ซ้อน
var api_url = <?php echo json_encode($api_url); ?>;
var api_updatealarm = <?php echo json_encode($api_updatealarm); ?>;
var sms_id = <?php echo json_encode($sms_id); ?>;
var tokens = <?php echo json_encode($token); ?>;
var home_url = <?php echo json_encode($home_url); ?>;

console.log("api_url:", api_url);
console.log("api_updatealarm:", api_updatealarm);
console.log("token:", tokens);
console.log("home_url:", home_url);
</script>

<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10 mx-auto">
                <form id="alarmForm">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <h3 class="card-title mb-0">Edit SMS</h3>
                            <div>
                                <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                    <i class="fa fa-home"></i> Main
                                </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <input type="hidden" id="sms_id" name="sms_id" />
                            <div class="mb-2">
                                <label class="form-label" for="sms_name">Sms name</label>
                                <input type="text" id="sms_name" name="sms_name" class="form-control" required />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="host">Host</label>
                                <input type="text" id="host" name="host" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="port">Port</label>
                                <input type="text" id="port" name="port" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="username">Username</label>
                                <input type="text" id="username" name="username" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="password">Password</label>
                                <input type="text" id="password" name="password" class="form-control" />
                            </div>
                            <div class="mb-2">
                                <label class="form-label" for="password">apikey</label>
                                <input type="text" id="apikey" name="apikey" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="password">originator</label>
                                <input type="text" id="originator" name="originator" class="form-control" />
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
document.addEventListener('DOMContentLoaded', function() {
    loadDevicealarmData();
});

function loadDevicealarmData() {
    fetch(api_url, {
            headers: {
                'Authorization': `Bearer ${tokens}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(resp => {
            if (resp.payload && resp.payload.data && resp.payload.data.length > 0) {
                const data = resp.payload.data[0];
                document.getElementById('sms_id').value = data.sms_id || '';
                document.getElementById('sms_name').value = data.sms_name || '';
                document.getElementById('host').value = data.host || '';
                document.getElementById('port').value = data.port || '';
                document.getElementById('username').value = data.username || '';
                document.getElementById('password').value = data.password || '';
                document.getElementById('apikey').value = data.apikey || '';
                document.getElementById('originator').value = data.originator || '';
            }
        })
        .catch(error => {
            console.error('Error loading alarm data:', error);
        });
}

document.getElementById('alarmForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateDevicealarmForm()) return;

    // ปิดปุ่ม submit เพื่อป้องกันการส่งซ้ำ
    document.getElementById('submitBtn').disabled = true;

    // สร้าง payload สำหรับส่งข้อมูล
    const formData = {
        sms_id: document.getElementById('sms_id').value,
        sms_name: document.getElementById('sms_name').value,
        host: document.getElementById('host').value,
        port: document.getElementById('port').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        apikey: document.getElementById('apikey').value,
        originator: document.getElementById('originator').value,
    };
    console.log("Sending data:", formData);

    fetch(api_updatealarm, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokens}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(resp => {
            document.getElementById('submitBtn').disabled = false;
            const msgBox = document.getElementById('responseMessage');

            if (resp.status === 'success' || resp.code === 201 || resp.statusCode === 201 || resp.code ===
                200 || resp.statusCode === 200) {
                msgBox.innerHTML = '<div class="alert alert-success">Save data successful!</div>';
                Swal.fire({
                    icon: 'success',
                    title: '<?php echo $this->lang->line('t2_Create_successful'); ?>',
                    text: '<?php echo $this->lang->line('t2_New_data_has_been_created'); ?>',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = home_url;
                });
            } else {
                msgBox.innerHTML = '<div class="alert alert-danger">Save data failed: ' + (resp.message ||
                    'Unknown error') + '</div>';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: resp.message || 'Unknown error',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        })
        .catch(error => {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('responseMessage').innerHTML =
                '<div class="alert alert-danger">Error saving data: ' + error + '</div>';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
                timer: 2000,
                showConfirmButton: false
            });
            console.error('Error:', error);
        });
});

function validateDevicealarmForm() {
    let valid = true;
    let messages = [];

    let smsName = document.getElementById('sms_name').value.trim();
    if (smsName === '') {
        valid = false;
        messages.push('Please enter your sms name');
    }

    // สามารถเพิ่มตรวจสอบอื่น ๆ เช่น ตรวจสอบ port เป็นตัวเลข หรือรูปแบบ sms_name ได้

    if (!valid) {
        Swal.fire({
            icon: 'warning',
            title: 'Incorrect information | ข้อมูลไม่ถูกต้อง',
            html: messages.join('<br>'),
            timer: 2500,
            showConfirmButton: false
        });
    }

    return valid;
}
</script>