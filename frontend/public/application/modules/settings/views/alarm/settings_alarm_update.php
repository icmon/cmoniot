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

$alarm_action_id = @$input['alarm_action_id'] ?? '';
$api_url = $this->config->item('api_url') . 'settings/alarmdevice?alarm_action_id=' . $alarm_action_id;
$api_updatealarm= $this->config->item('api_url') . 'settings/updatealarmdevice';
$home_url = base_url('settings/alarm');
$detail_url = base_url('alarm/alarm/detail?alarm_action_id=' . $alarm_action_id);



// http://localhost:3003/v1/settings/alarmdevice?alarm_action_id=1
// echo '<hr> api_url=>'.$api_url;
// echo '<br> api_updatealarm=>'.$api_updatealarm;
// echo '<br> home_url=>'.$home_url;
// echo '<br> detail_url=>'.$detail_url;
// JSON.payload.data[0]
?>
<!-- CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- JS -->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>

<script>
// ตัวแปรจาก PHP (ใช้ใน JS)
var api_url = <?php echo json_encode($api_url); ?>;
var api_updatealarm = <?php echo json_encode($api_updatealarm); ?>;
var alarm_action_id = <?php echo json_encode($alarm_action_id); ?>;
var tokens = <?php echo json_encode($token); ?>;
var home_url = <?php echo json_encode($home_url); ?>;
</script>

<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10 mx-auto">
                <form id="alarmForm">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <h3 class="card-title mb-0">Edit Alarm</h3>
                            <div>
                                <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                    <i class="fa fa-home"></i> Main
                                </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <input type="hidden" id="alarm_action_id" name="alarm_action_id" />

                            <div class="mb-2">
                                <label class="form-label" for="action_name">Alarm name</label>
                                <input type="text" id="action_name" name="action_name" class="form-control" required />
                            </div>

                            <div class="mb-2">
                                <label class="form-label"
                                    for="time_life"><?php echo $this->lang->line('t2_life_time_alarm'); ?></label>
                                <input type="text" id="time_life" name="time_life" class="form-control" required
                                    placeholder="HH:mm" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="event">Event</label>
                                <select id="event" name="event" class="form-select" required>
                                    <option value="1"><?php echo $this->lang->line('t_on'); ?></option>
                                    <option value="0"><?php echo $this->lang->line('t_off'); ?></option>
                                </select>
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="status_warning">Warning</label>
                                <input type="text" id="status_warning" name="status_warning" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="recovery_warning">Recovery Warning</label>
                                <input type="text" id="recovery_warning" name="recovery_warning" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="status_alert">Alert</label>
                                <input type="text" id="status_alert" name="status_alert" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="recovery_alert">Recovery Alert</label>
                                <input type="text" id="recovery_alert" name="recovery_alert" class="form-control" />
                            </div>

                            <!-- Checkbox switches -->
                            <div class="mb-3">
                                <label class="form-label">Alarm Notification Methods</label>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="email_alarm"
                                        name="email_alarm" />
                                    <label class="form-check-label" for="email_alarm">Email alarm</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="line_alarm" name="line_alarm" />
                                    <label class="form-check-label" for="line_alarm">Line alarm</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="telegram_alarm"
                                        name="telegram_alarm" />
                                    <label class="form-check-label" for="telegram_alarm">Telegram alarm</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="sms_alarm" name="sms_alarm" />
                                    <label class="form-check-label" for="sms_alarm">SMS alarm</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="nonc_alarm" name="nonc_alarm" />
                                    <label class="form-check-label" for="nonc_alarm">NONC alarm</label>
                                </div>
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

    // Flatpickr ตั้งค่า time_life ให้เลือกเวลา step 1 นาที
    // flatpickr("#time_life", {
    //     enableTime: true,
    //     noCalendar: true,
    //     dateFormat: "H:i",
    //     time_24hr: true,
    //     minuteIncrement: 1
    // });
});


function loadDevicealarmData() {
    // ถ้ามี alarm_action_id ให้เรียก API ดึงข้อมูลมาแสดงในฟอร์ม
    //http://192.168.1.59:3003/v1/settings/updatealarmdevice
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

                // กำหนดค่าแต่ละฟิลด์ในฟอร์ม
                document.getElementById('alarm_action_id').value = data.alarm_action_id || '';
                document.getElementById('action_name').value = data.action_name || '';
                document.getElementById('time_life').value = data.time_life || '';
                document.getElementById('event').value = (data.event !== undefined) ? data.event : '1';

                document.getElementById('status_warning').value = data.status_warning || '';
                document.getElementById('recovery_warning').value = data.recovery_warning || '';
                document.getElementById('status_alert').value = data.status_alert || '';
                document.getElementById('recovery_alert').value = data.recovery_alert || '';

                // Checkbox แปลงค่า 1 เป็น true, 0 หรือไม่มีก็ false
                document.getElementById('email_alarm').checked = (data.email_alarm == 1);
                document.getElementById('line_alarm').checked = (data.line_alarm == 1);
                document.getElementById('telegram_alarm').checked = (data.telegram_alarm == 1);
                document.getElementById('sms_alarm').checked = (data.sms_alarm == 1);
                document.getElementById('nonc_alarm').checked = (data.nonc_alarm == 1);
            }
        })
        .catch(error => {
            console.error('Error loading alarm data:', error);
        });
}


// เมื่อ submit ฟอร์ม
document.getElementById('alarmForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateDevicealarmForm()) return;

    // ปิดปุ่ม submit ชั่วคราวป้องกันส่งซ้ำ
    document.getElementById('submitBtn').disabled = true;

    // สร้าง payload จากฟอร์ม
    const formData = {
        alarm_action_id: document.getElementById('alarm_action_id').value,
        action_name: document.getElementById('action_name').value,
        status_warning: document.getElementById('status_warning').value,
        recovery_warning: document.getElementById('recovery_warning').value,
        status_alert: document.getElementById('status_alert').value,
        recovery_alert: document.getElementById('recovery_alert').value,
        email_alarm: document.getElementById('email_alarm').checked ? 1 : 0,
        line_alarm: document.getElementById('line_alarm').checked ? 1 : 0,
        telegram_alarm: document.getElementById('telegram_alarm').checked ? 1 : 0,
        sms_alarm: document.getElementById('sms_alarm').checked ? 1 : 0,
        nonc_alarm: document.getElementById('nonc_alarm').checked ? 1 : 0,
        time_life: document.getElementById('time_life').value,
        event: document.getElementById('event').value
    };

    // Debug Log
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

    let actionName = document.getElementById('action_name').value.trim();
    if (actionName === '') {
        valid = false;
        messages.push('กรุณากรอกชื่อ Alarm');
    }

    //let timeLife = document.getElementById('time_life').value.trim();
    // ตรวจสอบรูปแบบเวลา HH:mm
    // if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(timeLife)) {
    //     valid = false;
    //     messages.push('กรุณากรอกเวลา life time ให้ถูกต้อง (รูปแบบ HH:mm เช่น 08:30)');
    // }

    if (!valid) {
        Swal.fire({
            icon: 'warning',
            title: 'ข้อมูลไม่ถูกต้อง',
            html: messages.join('<br>'),
            timer: 2500,
            showConfirmButton: false
        });
    }

    return valid;
}
</script>