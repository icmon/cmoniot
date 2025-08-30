<?php
//http://localhost:8081/settings/device?bucket=BAACTW05&mqtt_id=5
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=$input['option'];

// # ดึงค่าพารามิเตอร์จาก GET request เพื่อใช้เป็นค่าเริ่มต้นของฟิลเตอร์
$keyword = htmlspecialchars($this->input->get('keyword') ?? '', ENT_QUOTES, 'UTF-8');
$bucket = htmlspecialchars($this->input->get('bucket') ?? '', ENT_QUOTES, 'UTF-8');
$type_id = htmlspecialchars($this->input->get('type_id') ?? '', ENT_QUOTES, 'UTF-8');
$mqtt_id = htmlspecialchars($this->input->get('mqtt_id') ?? '', ENT_QUOTES, 'UTF-8');
$type_name = htmlspecialchars($this->input->get('type_name') ?? '', ENT_QUOTES, 'UTF-8');
?>
<style>
td.dt-body-right,
th.dt-head-right {
    text-align: right !important;
}

.table th {
    text-align: center;
}

/*************/

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

.windmill-spin {
    animation: spin 1s linear infinite;
    transform-origin: 50% 50%;
}

.text-green {
    color: #00d97e;
}

.text-dark-green {
    color: #06402B;
}
</style>
<!-- jQuery (จำเป็นสำหรับ DataTables) -->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- DataTables JS -->
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<?php   $this->load->view('settings/device/pagewrapper');  ?>
<div class="page-body">
    <div class="card">
        <!-- ส่วนของฟอร์มสำหรับกรองข้อมูล -->
        <div class="card-body border-bottom py-3">
            <div class="row g-2">
                <div class="col-md-2">
                    <label for="keyword-filter" class="form-label">Keyword</label>
                    <input type="text" id="keyword-filter" class="form-control filter-input"
                        placeholder="Search keyword..." value="<?php echo $keyword; ?>">
                </div>
                <?php ##########################?>
                <div class="col-md-2">
                    <label for="bucket-filter" class="form-label">Bucket</label>
                    <select id="bucket-filter" class="form-select filter-input">
                        <option value="">-- Bucket --</option>

                    </select>
                </div>
                <!-- <?php ##########################?>
                <div class="col-md-2">
                    <label for="bucket-filter" class="form-label">Bucket</label>
                    <input type="text" id="bucket-filter" class="form-control filter-input"
                        placeholder="Filter by Bucket..." value="<?php echo $bucket; ?>">
                </div> -->
                <div class="col-md-2">
                    <label for="type-id-filter" class="form-label">Type</label>
                    <select id="type-id-filter" class="form-control filter-input">
                        <option value="">--Types--</option>

                    </select>
                </div>

                <!-- <div class="col-md-2">
                    <label for="mqtt-id-filter" class="form-label">MQTT ID</label>
                    <input type="text" id="mqtt-id-filter" class="form-control filter-input"
                        placeholder="Filter by MQTT ID..." value="<?php echo $mqtt_id; ?>">
                </div> -->
                <!-- <div class="col-md-2">
                    <label for="type-name-filter" class="form-label">Type Name</label>
                    <input type="text" id="type-name-filter" class="form-control filter-input"
                        placeholder="Filter by Type Name..." value="<?php echo $type_name; ?>">
                </div> -->
            </div>
        </div>

        <div class="table-responsive card-body p-0">
            <table id="devicedatatable" class="table table-vcenter display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <!-- [FIXED] เพิ่ม header "Device" ให้ตรงกับจำนวนคอลัมน์ใน JavaScript -->
                        <th>ID</th>
                        <th>Device name</th>
                        <th>Location</th>
                        <th>Mqtt name</th>
                        <th>Type</th>
                        <th>Bucket</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Control</th>
                        <th>Status</th>
                        <th>Alarm</th>
                        <!-- <th>Actions</th> -->
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script>
var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
var apiUrllisttitle = `${baseApiUrl}mqtt/listtitle`;
async function loadBucketList() {
    try {
        const response = await fetch(apiUrllisttitle, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.statusCode === 200 && Array.isArray(data.payload)) {
            const $select = $('#bucket-filter');
            $select.empty();
            $select.append('<option value="">--  Bucket --</option>');
            data.payload.forEach(item => {
                $select.append(
                    $('<option>', {
                        value: item.bucket,
                        text: item.mqtt_name
                    })
                );
            });
            // เซ็ตค่า value จาก PHP ถ้ามี
            $select.val('<?php echo $bucket; ?>');
        }
    } catch (error) {
        console.error('Error loading bucket list:', error);
    }
}

$(document).ready(function() {
    loadBucketList();
    // ... โค้ดเดิม ...
});

async function updatedevicestatus(device_id, newStatus) {
    if (typeof device_id === 'undefined' || device_id === null) {
        console.error("Device ID is undefined. Aborting update.");
        Swal.fire('Error!', 'Could not update status: Device ID is missing.', 'error');
        return false;
    }

    try {
        Swal.fire({
            title: '<?php echo $this->lang->line('t2_updating_status'); ?>',
            text: '<?php echo $this->lang->line('t2_please_wait_a_moment'); ?>',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        const apiUrl = `${baseApiUrl}settings/updatestatusdeviceid`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                device_id: device_id,
                status: newStatus
            })
        });

        Swal.close();

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API response: ${response.status}. ${errorText}`);
        }

        const data = await response.json();

        if (data.code === 200 || data.success === true) {
            Swal.fire({
                icon: 'success',
                title: '<?php echo $this->lang->line('t2_please_Update_successful'); ?>',
                text: data.message ||
                    '<?php echo $this->lang->line('t2_please_User_status_ha_been_updated'); ?>',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                // ดึง query string ปัจจุบัน (Filter)
                const currentUrl = window.location.href;
                const url = new URL(currentUrl);
                const params = url.search; // ได้ query string เช่น ?filter=xxx&status=yyy

                // รีเฟรชหน้าเดิมพร้อม query string เดิม
                //window.location.href = url.pathname + params;
                $('#devicedatatable').DataTable().ajax.reload(null, false); // รีโหลดข้อมูลโดยไม่รีเซ็ตหน้า
            });
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: '<?php echo $this->lang->line('t2_please_Update_failed'); ?>',
                text: data.message ||
                    '<?php echo $this->lang->line('t2_please_Unabletoupdatemqttstatus'); ?>',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return false;
        }
    } catch (error) {
        Swal.close();
        console.error('<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status'); ?>:', error);
        Swal.fire(
            '<?php echo $this->lang->line('t2_An_error_occurred'); ?>!',
            `<?php echo $this->lang->line('t2_The_status_could_not_be_updated'); ?>: ${error.message}`,
            'error'
        );
        return false;
    }
}
// [FIXED] แก้ไขฟังก์ชัน statusdevice ให้ทำงานถูกต้อง
async function statusdevice(topic, message) {
    console.log('update devicestatus topic==>' + topic);
    console.log('message==>' + message);

    if (typeof topic === 'undefined' || topic === null) {
        console.error("Topic is undefined. Aborting update.");
        Swal.fire('Error!', 'Could not send command: Topic is missing.', 'error');
        return false;
    }

    try {
        Swal.fire({
            title: '<?php echo $this->lang->line('t2_updating_status'); ?>',
            text: '<?php echo $this->lang->line('t2_please_wait_a_moment'); ?>',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;

        // [FIXED] ประกาศตัวแปร params ที่หายไป
        const params = new URLSearchParams();
        if (topic) params.append('topic', topic);
        if (message !== undefined) params.append('message', String(message)); // ส่งค่า 0 ไปด้วย

        const apiUrl = `${baseApiUrl}mqtt/control?${params.toString()}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        Swal.close();

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API response: ${response.status}. ${errorText}`);
        }

        const data = await response.json();

        if (data.code === 200 || data.success === true) {
            Swal.fire({
                icon: 'success',
                title: '<?php echo $this->lang->line('t2_please_Update_successful'); ?>!',
                text: data.message ||
                    '<?php echo $this->lang->line('t2_please_User_status_ha_been_updated'); ?>',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: '<?php echo $this->lang->line('t2_please_Update_failed'); ?>!',
                text: data.message ||
                    '<?php echo $this->lang->line('t2_please_Unabletoupdatemqttstatus'); ?>',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return false;
        }
    } catch (error) {
        Swal.close();
        console.error('<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status'); ?>:', error);
        Swal.fire(
            '<?php echo $this->lang->line('t2_An_error_occurred'); ?>!',
            `<?php echo $this->lang->line('t2_The_status_could_not_be_updated'); ?>: ${error.message}`,
            'error'
        );
        return false;
    }
}
async function fetchData(page = 1, pageSize = 10, search = '', bucket = '', type_id = '', mqtt_id = '', type_name =
    '') {
    const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize
    });
    if (search) params.append('keyword', search);
    if (bucket != null && bucket !== '') params.append('bucket', bucket);
    if (type_id != null && type_id !== '') params.append('type_id', type_id);
    if (mqtt_id) params.append('mqtt_id', mqtt_id);
    if (type_name) params.append('type_name', type_name);

    const apiUrl = `${baseApiUrl}settings/listdevicepage?${params.toString()}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch data:", error);
        return null;
    }
}
$(document).ready(function() {
    const table = $('#devicedatatable').DataTable({
        serverSide: true,
        processing: true,
        pageLength: 10,
        searching: false,
        ajax: async function(data, callback, settings) {
            const page = Math.floor(data.start / data.length) + 1;
            const pageSize = data.length;
            const search = $('#keyword-filter').val();
            const bucket = $('#bucket-filter').val();
            const type_id = $('#type-id-filter').val();
            const mqtt_id = $('#mqtt-id-filter').val();
            const type_name = $('#type-name-filter').val();

            const apiData = await fetchData(page, pageSize, search, bucket, type_id, mqtt_id,
                type_name);

            callback({
                draw: data.draw,
                recordsTotal: apiData?.payload?.total || 0,
                recordsFiltered: apiData?.payload?.total || 0,
                data: apiData?.payload?.data || []
            });
        },
        columns: [{
                data: 'device_id'
            },
            {
                data: 'device_name'
            },
            {
                data: 'location_name'
            },
            {
                data: 'mqtt_name'
            },
            {
                data: 'type_name'
            },
            {
                data: 'mqtt_bucket'
            },
            {
                data: 'timestamp'
            },
            {
                data: 'status',
                className: "text-center",
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    const device_id = row.device_id;
                    const isChecked = Number(data) === 1 ? 'checked' : '';
                    return `<div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                                    <input class="form-check-input status-switch" type="checkbox" role="switch"
                                           id="switch-${device_id}" data-uid="${device_id}" ${isChecked}
                                           aria-label="User status switch for ${device_id}">
                                </div>`;
                }
            }, {
                //Control
                data: null,
                defaultContent: '',
                className: "text-center",
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    var topic = row.mqtt_data_control;
                    var timestamp = row.timestamp;
                    var temperature = row.temperature_value;
                    var unit = row.unit;
                    var mqtt_dada = row.mqtt_dada;
                    var contRelay1 = row.contRelay1;
                    var actRelay1 = row.actRelay1;
                    var contRelay2 = row.contRelay2;
                    var actRelay2 = row.actRelay2;
                    var fan1 = row.fan1;
                    var overFan1 = row.overFan1;
                    var fan2 = row.fan2;
                    var overFan2 = row.overFan2;

                    // http://192.168.1.59:3003/v1/settings/listdevicepage?page=1&pageSize=10
                    // http://localhost:3003/v1/mqtt/getdevice?topic=BAACTW02/DATA
                    // http://localhost:3003/v1/mqtt/control?topic=BAACTW04/CONTROL&message=3

                    if ((row.type_id == 2 || row.type_id == 3) && row.status == 1) {
                        // [FIXED] แก้ไขตรรกะการตรวจสอบสถานะและ class ของ input
                        if (fan1 == 1 || fan2 == 1) {
                            var isChecked = 'checked';
                        } else {
                            var isChecked = row.mqtt_data_value == row.mqtt_control_on ?
                                'checked' : '';
                        }
                        var topic = encodeURI(row.mqtt_data_control);
                        var on_val = encodeURI(row.mqtt_control_on);
                        var off_val = encodeURI(row.mqtt_control_off);

                        return `<div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                                        <input class="form-check-input device-control-switch" type="checkbox" role="switch"
                                            id="device_switch_${topic}" 
                                            data-topic="${topic}" 
                                            data-on="${on_val}"
                                            data-off="${off_val}"
                                            ${isChecked}>
                                    </div>`;

                    } else {
                        var temperature2 =
                            '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>';
                        return `<div>${temperature2}</div>`;
                    }


                }
            }, {
                // [FIXED] แก้ไขคอลัมน์ "Device"
                data: null,
                defaultContent: '',
                className: "text-center",
                orderable: false,
                searchable: false,
                /*********************/
                render: function(data, type, row) {
                    const svgId = `fan2_${row.device_id}_windmill_icon`;
                    const isFanOn = Number(row.fan2) === 1;

                    var topic = row.mqtt_data_control;
                    var timestamp = row.timestamp;
                    var temperature = row.temperature_value;
                    var unit = row.unit;
                    var mqtt_dada = row.mqtt_dada;
                    var contRelay1 = row.contRelay1;
                    var actRelay1 = row.actRelay1;
                    var contRelay2 = row.contRelay2;
                    var actRelay2 = row.actRelay2;
                    var fan1 = row.fan1;
                    var overFan1 = row.overFan1;
                    var fan2 = row.fan2;
                    var overFan2 = row.overFan2;

                    if ((row.type_id == 2 || row.type_id == 3) && row.status == 1) {
                        // [FIXED] แก้ไขตรรกะการตรวจสอบสถานะและ class ของ input
                        if (fan1 == 1 || fan2 == 1) {
                            var isChecked = 'checked';
                        } else {
                            var isChecked = row.mqtt_data_value == row.mqtt_control_on ?
                                'checked' : '';
                        }
                        var topic = encodeURI(row.mqtt_data_control);
                        var on_val = encodeURI(row.mqtt_control_on);
                        var off_val = encodeURI(row.mqtt_control_off);

                        const spinClass = isFanOn ? 'windmill-spin' : '';
                        const fillStyle =
                            "fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);";

                        return `
<svg id="${svgId}"
    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path class="${spinClass}" style="margin-left:6px; ${fillStyle}"
        d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
</svg>
`;

                    } else {
                        // ตรวจสอบ undefined/null และกำหนดค่าเริ่มต้น
                        var temperature = (typeof row.temperature_value !== 'undefined' && row
                            .temperature_value !== null) ? row.temperature_value : '-';
                        if (row.type_id != 2 && row.status == 1) {
                            return `<div><a href="#">${temperature} ${row.unit}</a></div>`;
                        } else {
                            var temperature2 = '-';
                            return `<div>${temperature2}</div>`;
                        }
                    }

                }
                /*********************/
            }, {
                data: 'Alarm',
                className: "text-center",
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    var type_id_io = row.type_id;
                    var overFan1 = row.overFan1;
                    var overFan2 = row.overFan2;
                    var device_name = row.device_name;
                    var measurement = row.measurement;

                    if (row.type_id == 2) {
                        var isChecked = Number(overFan1) === 1 ? 'checked' : '';
                        if (overFan1 === 1) {
                            return `<label class="form-selectgroup-item"> 
                            <input type="checkbox" name="overFan1" value="sun" class="form-selectgroup-input" ${isChecked}>
                            <span class="form-selectgroup-label">
                           <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-windmill-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.061 11.06c1.18 -.824 1.939 -2.11 1.939 -3.56c0 -2.49 -2.24 -4.5 -5 -4.5v5" /><path d="M12 12c0 2.76 2.01 5 4.5 5c.166 0 .33 -.01 .49 -.03m2.624 -1.36c.856 -.91 1.386 -2.19 1.386 -3.61h-5" /><path d="M12 12c-2.76 0 -5 2.01 -5 4.5s2.24 4.5 5 4.5v-9z" /><path d="M6.981 7.033c-2.244 .285 -3.981 2.402 -3.981 4.967h9" /><path d="M3 3l18 18" /></svg>
                            </span>
                        </label>`;

                        } else {

                            return `<label class="form-selectgroup-item"> 
                            <input type="checkbox" name="overFan1" value="sun" class="form-selectgroup-input" ${isChecked}>
                            <span class="form-selectgroup-label">
                           <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-windmill"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" /></svg>
                            </span>
                        </label>`;

                        }
                    } else if (row.type_id == 3) {
                        var isChecked = Number(overFan2) === 1 ? 'checked' : '';
                        if (overFan2 === 1) {

                            return `<label class="form-selectgroup-item"> 
                            <input type="checkbox" name="overFan2" value="sun" class="form-selectgroup-input" ${isChecked}>
                            <span class="form-selectgroup-label">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-windmill-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.061 11.06c1.18 -.824 1.939 -2.11 1.939 -3.56c0 -2.49 -2.24 -4.5 -5 -4.5v5" /><path d="M12 12c0 2.76 2.01 5 4.5 5c.166 0 .33 -.01 .49 -.03m2.624 -1.36c.856 -.91 1.386 -2.19 1.386 -3.61h-5" /><path d="M12 12c-2.76 0 -5 2.01 -5 4.5s2.24 4.5 5 4.5v-9z" /><path d="M6.981 7.033c-2.244 .285 -3.981 2.402 -3.981 4.967h9" /><path d="M3 3l18 18" /></svg>   
                        </span>
                        </label>`;
                        } else {

                            return `<label class="form-selectgroup-item"> 
                            <input type="checkbox" name="overFan2" value="sun" class="form-selectgroup-input" ${isChecked}>
                            <span class="form-selectgroup-label">
                           <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-windmill"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" /></svg>
                            </span>
                        </label>`;
                        }


                    } else {
                        var temperature_val = row.temperature_value;
                        var status_warning = row.status_warning;
                        var recovery_warning = row.recovery_warning;
                        var status_alert = row.status_alert;
                        var recovery_alert = row.recovery_alert;
                        if ((temperature_val >= status_warning) || (temperature_val >=
                                status_alert)) {
                            var statu_alark = 1;
                            // alert(status_warning);
                            // alert(status_alert);



                            var isChecked2 = Number(statu_alark) === 1 ? 'checked' : '';
                            return `<label class="form-selectgroup-item">  
                         <input type="checkbox" name="temp" value="cloud-rain"  class="form-selectgroup-input" ${isChecked2}>  <span class="form-selectgroup-label"> 
                          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-temperature-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10v3.5a4 4 0 1 0 5.836 2.33m-1.836 -5.83v-5a2 2 0 1 0 -4 0v1" /><path d="M13 9h1" /><path d="M3 3l18 18" /></svg>
                         </span>
                            </label>`;

                        } else {
                            var statu_alark = 0;
                            var isChecked2 = Number(statu_alark) === 1 ? 'checked' : '';
                            return `<label class="form-selectgroup-item">  
                         <input type="checkbox" name="temp" value="cloud-rain"  class="form-selectgroup-input" ${isChecked2}>  <span class="form-selectgroup-label"> 
                           <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-temperature-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 1 0 -4 0v8.5" /><path d="M4 9h4" /><path d="M13 16a4 4 0 1 0 0 -8a4.07 4.07 0 0 0 -1 .124" /><path d="M13 3v1" /><path d="M21 12h1" /><path d="M13 20v1" /><path d="M19.4 5.6l-.7 .7" /><path d="M18.7 17.7l.7 .7" /></svg>
                         </span>
                            </label>`;

                        }
                    }
                }
            }
            // ,{
            //     data: null,
            //     title: 'Actions',
            //     orderable: false,
            //     searchable: false,
            //     className: 'dt-body-right dt-head-right',
            //     render: function(data, type, row) {
            //         return `<a href="<?php echo base_url('settings/device');?>/detail?id=${row.device_id}" class="btn btn-sm btn-info me-1"><?php echo $this->lang->line('c_detail');?></a>
            //                     <a href="<?php echo base_url('settings/device');?>/edit?id=${row.device_id}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>
            //                     <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow(${row.device_id})"><?php echo $this->lang->line('c_delete');?></a>`;
            //     }
            // }
        ],
        scrollX: true,
        responsive: true
    });

    $('#devicedatatable').on('change', '.status-switch', async function() {
        const device_id = $(this).data('uid');
        const newStatus = $(this).is(':checked') ? 1 : 0;
        const success = await updatedevicestatus(device_id, newStatus);

        if (!success) {
            $(this).prop('checked', !$(this).prop('checked'));
        }
    });

    // [FIXED] แก้ไข event handler สำหรับสวิตช์ควบคุมอุปกรณ์
    $('#devicedatatable').on('change', '.device-control-switch', async function() {
        const topic = encodeURI($(this).data('topic'));
        const on_val = $(this).data('on');
        const off_val = $(this).data('off');
        const message = $(this).is(':checked') ? on_val : off_val;

        const success = await statusdevice(topic, message);

        if (!success) {
            $(this).prop('checked', !$(this).prop('checked'));
        }
    });

    $('.filter-input').on('keyup change', function() {
        table.ajax.reload();
    });
});
setInterval(function() {
    $('#devicedatatable').DataTable().ajax.reload(null, false); // รีโหลดข้อมูลโดยไม่รีเซ็ตหน้า
}, 10000); //120 วินาที
function deleteRow(id) {
    console.log("Delete row with ID:", id);
    Swal.fire({
        title: '<?php echo $this->lang->line('c_confirm_data_deletion_information'); ?>',
        text: "<?php echo $this->lang->line('c_confirm_data_deletion_information'); ?>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '<?php echo $this->lang->line('c_delete'); ?>',
        cancelButtonText: '<?php echo $this->lang->line('c_cancel'); ?>'
    }).then((result) => {
        if (result.isConfirmed) {
            // [FIX 5] ปรับปรุง method เป็น 'DELETE' ตามหลัก RESTful API
            fetch(`<?php echo base_url('settings/devicedelete');?>/delete?device_id=${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        Swal.fire(
                            '<?php echo $this->lang->line('c_data_deleted'); ?>',
                            '<?php echo $this->lang->line('c_data_deleted_successfully'); ?>',
                            'success'
                        );
                        $('#example').DataTable().ajax.reload(null, true); // false เพื่อให้อยู่หน้าเดิม
                    } else {
                        Swal.fire(
                            '<?php echo $this->lang->line('c_error_occurred'); ?>!',
                            data.message || '<?php echo $this->lang->line('c_not_be_deleted'); ?>',
                            'error'
                        );
                    }
                })
                .catch((error) => {
                    console.error('Delete Error:', error);
                    Swal.fire(
                        '<?php echo $this->lang->line('c_error_occurred'); ?>!',
                        '<?php echo $this->lang->line('c_not_be_deleted'); ?>',
                        'error'
                    );
                });
        }
    });
}
async function loadDeviceTypes() {
    const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    const apiUrl = `${baseApiUrl}settings/devicetypeall`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch device types');
        const data = await response.json();

        // ลบ option เดิม (ยกเว้นตัวแรก)
        $('#type-id-filter').find('option:not(:first)').remove();

        if (Array.isArray(data.payload)) {
            data.payload.forEach(item => {
                if (item.status === 1) { // แสดงเฉพาะ type ที่เปิดใช้งาน
                    $('#type-id-filter').append(
                        $('<option>', {
                            value: item.type_id,
                            text: item.type_name
                        })
                    );
                }
            });
        }
    } catch (error) {
        console.error('Error loading device types:', error);
    }
}
// เรียกใช้เมื่อโหลดหน้า
$(document).ready(function() {
    loadDeviceTypes();
    // ... โค้ดอื่น ...
});
</script>