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
$schedule_id = $input['schedule_id'] ?? '';
$api_url = $this->config->item('api_url') . 'settings/listschedulepage?schedule_id=' . $schedule_id;
$api_updateschedule = $this->config->item('api_url') . 'settings/updateschedule';
$home_url = base_url('settings/schedule');
?>

<!-- Flatpickr CSS & JS -->
<link rel="stylesheet" href="<?php echo base_url('assets/css/');?>flatpickr.min.css">
<script src="<?php echo base_url('assets/js/flatpickr.js');?>"></script>
<!-- jQuery (จำเป็นสำหรับ DataTables)  /libs/-->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>

<script>
var apiUrl = <?php echo json_encode($api_url); ?>;
var apiUpdateSchedule = <?php echo json_encode($api_updateschedule); ?>;
var tokens = <?php echo json_encode($token); ?>;
</script>

<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10 mx-auto">
                <form id="scheduleForm">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">SCHEDULE</h3>
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
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <input type="hidden" id="schedule_id" name="schedule_id">
                            <div class="mb-2">
                                <label class="form-label"><?php echo $this->lang->line('t_schedule_name'); ?></label>
                                <input type="text" id="schedule_name" name="schedule_name" class="form-control">
                            </div>
                            <div class="mb-2">
                                <label class="form-label"><?php echo $this->lang->line('t_start_time'); ?></label>
                                <input type="time" id="start" name="start" class="form-control" min="00:00" max="23:59"
                                    step="60" pattern="^([0-1][0-9]|2[0-3]):[0-5][0-9]$" placeholder="00:00"
                                    autocomplete="off" />
                                <small>กรอกเวลาเป็น 00:00-23:59</small>


                            </div>

                            <div class="mb-2">
                                <label class="form-label">Event</label>
                                <select id="event" name="event" class="form-select">
                                    <option value="1"><?php echo $this->lang->line('t_on'); ?></option>
                                    <option value="0"><?php echo $this->lang->line('t_off'); ?></option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <label class="form-label"><?php echo $this->lang->line('t_days'); ?></label>
                                <div class="row">
                                    <?php
                                    $days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
                                    foreach ($days as $day) {
                                    ?>
                                    <div class="col-4">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" id="<?php echo $day; ?>"
                                                name="<?php echo $day; ?>">
                                            <label class="form-check-label" for="<?php echo $day; ?>">
                                                <?php echo $this->lang->line('t_'.$day); ?>
                                            </label>
                                        </div>
                                    </div>
                                    <?php } ?>
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
    loadScheduleData();
});

function loadScheduleData() {
    fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${tokens}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(resp => {
            const data = resp.payload && resp.payload.data && resp.payload.data[0] ? resp.payload.data[0] : null;
            if (!data) return;

            document.getElementById('schedule_id').value = data.schedule_id || '';
            document.getElementById('schedule_name').value = data.schedule_name || '';
            document.getElementById('start').value = data.start || '';
            document.getElementById('event').value = data.event || 0;

            ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].forEach(day => {
                document.getElementById(day).checked = !!data[day];
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // เรียก validate
    if (!validateScheduleForm()) return;
    document.getElementById('submitBtn').disabled = true;


    const formData = {
        schedule_id: document.getElementById('schedule_id').value,
        schedule_name: document.getElementById('schedule_name').value,
        start: document.getElementById('start').value,
        event: document.getElementById('event').value,
        sunday: document.getElementById('sunday').checked ? 1 : 0,
        monday: document.getElementById('monday').checked ? 1 : 0,
        tuesday: document.getElementById('tuesday').checked ? 1 : 0,
        wednesday: document.getElementById('wednesday').checked ? 1 : 0,
        thursday: document.getElementById('thursday').checked ? 1 : 0,
        friday: document.getElementById('friday').checked ? 1 : 0,
        saturday: document.getElementById('saturday').checked ? 1 : 0,
    };

    fetch(apiUpdateSchedule, {
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
            let msgBox = document.getElementById('responseMessage');

            if (resp.code === 200 || resp.statusCode === 200 || resp.code === 201 || resp.statusCode ===
                201 || resp.status === 'success') {
                msgBox.innerHTML = '<div class="alert alert-success">Update successful!</div>';
                Swal.fire({
                    icon: 'success',
                    title: '<?php echo $this->lang->line('t2_Update_successful'); ?>',
                    text: '<?php echo $this->lang->line('t2_Update_has_been_successful'); ?>',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                }).then(() => {
                    // Redirect หลังจากแสดง Swal เสร็จ
                    window.location.href =
                        "<?php echo base_url('settings/schedule/edit?schedule_id='.$schedule_id ); ?>";
                });
            } else {
                msgBox.innerHTML = '<div class="alert alert-danger">Update failed: ' + (resp.message ||
                    'Unknown error') + '</div>';
                Swal.fire({
                    icon: 'error',
                    title: 'Unknown error!',
                    text: resp.message + ' ' + resp.messageTh,
                    timer: 1200,
                    showConfirmButton: false
                });
            }
        })
        .catch(error => {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('responseMessage').innerHTML =
                '<div class="alert alert-danger">Error updating data: ' + error + '</div>';
            Swal.fire({
                icon: 'error',
                title: 'Error updating data:',
                text: resp.message + ' ' + resp.messageTh,
                timer: 1200,
                showConfirmButton: false
            });
            console.error(error);
        });
});

function validateScheduleForm() {
    let valid = true;
    let msg = [];

    // ตรวจสอบชื่อ schedule
    const scheduleName = document.getElementById('schedule_name').value.trim();
    if (scheduleName === '') {
        valid = false;
        msg.push('กรุณากรอกชื่อ Schedule');
    }

    // ตรวจสอบเวลา
    const start = document.getElementById('start').value.trim();
    if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(start)) {
        valid = false;
        msg.push('กรุณากรอกเวลาให้ถูกต้อง (เช่น 08:30)');
    }

    // ตรวจสอบว่าต้องเลือกวันอย่างน้อย 1 วัน
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let checked = days.some(day => document.getElementById(day).checked);
    if (!checked) {
        valid = false;
        msg.push('กรุณาเลือกวันอย่างน้อย 1 วัน');
    }

    if (!valid) {
        Swal.fire({
            icon: 'warning',
            title: 'ข้อมูลไม่ถูกต้อง',
            html: msg.join('<br>'),
            timer: 1500,
            showConfirmButton: false
        });
    }

    return valid;
}


document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateScheduleForm()) return;

    document.getElementById('submitBtn').disabled = true;

    // ... โค้ด submit API ตามเดิม ...
});


flatpickr("#start", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true
});
</script>