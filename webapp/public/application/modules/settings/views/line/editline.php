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

// รองรับกรณีรับ line_id กับ id
$line_id = $input['line_id'] ?? '';
if ($line_id == "") {
    $line_id = $input['id'] ?? '';
}

$api_url = $this->config->item('api_url') . 'settings/listlinepage?line_id=' . $line_id;
$api_updatealarm = $this->config->item('api_url') . 'settings/updateline';
$home_url = base_url('settings/line');
$detail_url = base_url('alarm/line/detail?line_id=' . $line_id);
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
var line_id = <?php echo json_encode($line_id); ?>;
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
                            <h3 class="card-title mb-0">Edit</h3>
                            <div>
                                <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                    <i class="fa fa-home"></i> Main
                                </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <input type="hidden" id="line_id" name="line_id" />
                            <div class="mb-2">
                                <label class="form-label" for="line_name">Line name</label>
                                <input type="text" id="line_name" name="line_name" class="form-control" required />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="client_id">client id</label>
                                <input type="text" id="client_id" name="client_id" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="client_secret">client secret</label>
                                <input type="text" id="client_secret" name="client_secret" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="secret_key">secret key</label>
                                <input type="text" id="secret_key" name="secret_key" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="redirect_uri">redirect uri</label>
                                <input type="text" id="redirect_uri" name="redirect_uri" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="grant_type">grant type</label>
                                <input type="text" id="grant_type" name="grant_type" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="code">code</label>
                                <input type="text" id="code" name="code" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="accesstoken">accesstoken</label>
                                <input type="text" id="accesstoken" name="accesstoken" class="form-control" />
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
                document.getElementById('line_id').value = data.line_id || '';
                document.getElementById('line_name').value = data.line_name || '';
                document.getElementById('client_id').value = data.client_id || '';
                document.getElementById('client_secret').value = data.client_secret || '';
                document.getElementById('secret_key').value = data.secret_key || '';
                document.getElementById('redirect_uri').value = data.redirect_uri || '';
                document.getElementById('grant_type').value = data.grant_type || '';
                document.getElementById('code').value = data.code || '';
                document.getElementById('accesstoken').value = data.accesstoken || '';
                // document.getElementById('status').value = data.status || ''; 

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
        line_id: document.getElementById('line_id').value,
        line_name: document.getElementById('line_name').value,
        client_id: document.getElementById('client_id').value,
        client_secret: document.getElementById('client_secret').value,
        secret_key: document.getElementById('secret_key').value,
        redirect_uri: document.getElementById('redirect_uri').value,
        grant_type: document.getElementById('grant_type').value,
        code: document.getElementById('code').value,
        accesstoken: document.getElementById('accesstoken').value,
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

    let lineName = document.getElementById('line_name').value.trim();
    if (lineName === '') {
        valid = false;
        messages.push('Please enter your line name');
    }

    // สามารถเพิ่มตรวจสอบอื่น ๆ เช่น ตรวจสอบ client_secret เป็นตัวเลข หรือรูปแบบ line_name ได้

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