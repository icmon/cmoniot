<?php
//http://localhost:8081/settings/device?bucket=BAACTW05&mqtt_id=5
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=$input['option'];
// # ดึงค่าพารามิเตอร์จาก GET request เพื่อใช้เป็นค่าเริ่มต้นของฟิลเตอร์
$schedule_id = $input['schedule_id'];
$device_id = $input['device_id'];
$bucket = $input['bucket'];
$mqtt_id = $input['mqtt_id'];
$type_id = $input['type_id'];
$keyword = htmlspecialchars($this->input->get('keyword') ?? '', ENT_QUOTES, 'UTF-8');
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

/*****************/
.blink-orange {
    stroke: orange !important;
    /* เปลี่ยนเส้นขอบเป็นสีส้ม */
    color: orange !important;
    /* สำหรับบางเบราว์เซอร์ */
    animation: blink-orange 1s linear infinite;
}

@keyframes blink-orange {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

/****************/
</style>
<!-- jQuery (จำเป็นสำหรับ DataTables) -->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- DataTables JS -->
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<?php
$language = $this->lang->language;
$lang = $this->lang->line('lang');
$langs = $this->lang->line('langs');
?>
<div class="page-wrapper">
    <!-- BEGIN PAGE HEADER -->
    <div class="page-header d-print-none">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <!-- Page pre-title -->
                    <!-- <div class="page-pretitle">
                        Overview
                    </div> -->
                    <h2 class="page-title">
                        Device
                    </h2>
                </div>
                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">
                        <a href="<?php echo base_url('settings/schedule'); ?>"
                            class="btn btn-primary btn-5 d-none d-sm-inline-block">
                            Schedule
                        </a>
                    </div>
                    <!-- BEGIN MODAL -->
                    <!-- END MODAL -->
                </div>
                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">
                        <a href="<?php echo base_url('settings/schedule/insert'); ?>"
                            class="btn btn-primary btn-5 d-none d-sm-inline-block">
                            <!-- Download SVG icon from http://tabler.io/icons/icon/plus -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-2">
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                            <?php echo $this->lang->line('c_insert');?>
                        </a>
                    </div>
                    <!-- BEGIN MODAL -->
                    <!-- END MODAL -->
                </div>
            </div>
        </div>
    </div>
    <?php  ############################ ?>
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
                            <th>Schedule</th>
                            <th>Event start</th>
                            <th>Device name</th>
                            <th>Location</th>
                            <th>Mqtt name</th>
                            <th>Type</th>
                            <th>Bucket</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <script>
    var schedule_id = '<?php echo $schedule_id;?>';
    var device_id = '<?php echo $device_id;?>';
    var bucket = '<?php echo $bucket;?>';
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUrllisttitle = `${baseApiUrl}mqtt/listtitleall`;
    var apiUrl_getdata_topic = `${baseApiUrl}mqtt/mqtt/getdata?topic=`;
    var api_schedule_detail = `${baseApiUrl}settings/scheduledevicepage`;
    async function loadBucketList() {
        try {
            var response = await fetch(apiUrllisttitle, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            var data = await response.json();
            if (data.statusCode === 200 && Array.isArray(data.payload)) {
                var $select = $('#bucket-filter');
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

    async function loadScheduleDetail() {
        var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        var apiUrl = `${baseApiUrl}settings/scheduledevicepage`;
        try {
            var response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch  Schedule Detail Data');
            var data = await response.json();
            // console.log("api_schedule_detail=>" + api_schedule_detail);
            // console.log("data:");
            // console.info(data);
        } catch (error) {
            console.error('Error loading Schedule Detail Data:', error);
        }
    }
    // เรียกใช้เมื่อโหลดหน้า
    $(document).ready(function() {
        loadBucketList();
        loadDeviceTypes();
        loadScheduleDetail();
        // ... โค้ดอื่น ...
    });
    let controller;
    async function fetchData(params) {
        if (controller) controller.abort();
        controller = new AbortController();
        return fetch(apiUrl + params, {
            headers,
            signal: controller.signal
        }).then(r => r.json());
    }
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
            var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
            var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
            var apiUrl = `${baseApiUrl}settings/updatestatusdeviceid`;
            var response = await fetch(apiUrl, {
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
                var errorText = await response.text();
                throw new Error(`API response: ${response.status}. ${errorText}`);
            }
            var data = await response.json();
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
                    var currentUrl = window.location.href;
                    var url = new URL(currentUrl);
                    var params = url.search; // ได้ query string เช่น ?filter=xxx&status=yyy

                    // รีเฟรชหน้าเดิมพร้อม query string เดิม
                    window.location.href = url.pathname + params;
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
            console.error('<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status'); ?>:',
                error);
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
        //console.log('update devicestatus topic==>' + topic);
        //console.log('message==>' + message);
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
            var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
            var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
            // [FIXED] ประกาศตัวแปร params ที่หายไป
            var params = new URLSearchParams();
            if (topic) params.append('topic', topic);
            if (message !== undefined) params.append('message', String(message)); // ส่งค่า 0 ไปด้วย
            var apiUrl = `${baseApiUrl}mqtt/control?${params.toString()}`;
            var response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.close();
            if (!response.ok) {
                var errorText = await response.text();
                throw new Error(`API response: ${response.status}. ${errorText}`);
            }
            var data = await response.json();
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
            console.error('<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status'); ?>:',
                error);
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
        var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        if (bucket == "") {
            var bucket = '<?php echo $bucket;?>';
        }
        if (mqtt_id == "") {
            var mqtt_id = '<?php echo $mqtt_id;?>';
        }
        var schedule_id = '<?php echo $schedule_id;?>';
        var device_id = '<?php echo $device_id;?>';

        var params = new URLSearchParams({
            page: page,
            pageSize: pageSize,
            schedule_id: schedule_id,
            device_id: device_id,
            bucket: bucket
        });
        if (search) params.append('keyword', search);
        if (type_id != null && type_id !== '') params.append('type_id', type_id);
        if (type_name) params.append('type_name', type_name);
        var apiUrl = `${baseApiUrl}settings/scheduledevicepage?${params.toString()}`;
        // console.log("apiUrl:" + apiUrl);
        // console.log("page:" + apiUrl);
        // console.log("pageSize:" + pageSize);
        // console.log("bucket:" + bucket);
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            // console.log("response:");
            // console.info(response);
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
        var table = $('#devicedatatable').DataTable({
            serverSide: true,
            processing: true,
            pageLength: 10,
            searching: false,
            deferRender: true,
            scroller: true,
            ajax: async function(data, callback, settings) {
                var page = Math.floor(data.start / data.length) + 1;
                var pageSize = data.length;
                var search = $('#keyword-filter').val();
                var bucket = $('#bucket-filter').val();
                var type_id = $('#type-id-filter').val();
                if (type_id == null) {
                    var type_id = params.append('type_id', type_id);
                }
                var mqtt_id = $('#mqtt-id-filter').val();
                var type_name = $('#type-name-filter').val();
                // console.log("page:" + page);
                // console.log("pageSize:" + pageSize);
                // console.log("search:" + search);
                // console.log("bucket:" + bucket);
                // console.log("type_id:" + type_id);
                // console.log("schedule_id:" + schedule_id);
                // console.log("device_id:" + device_id);

                var apiData = await fetchData(page, pageSize, search, bucket, type_id, schedule_id,
                    device_id);

                // console.log("apiData:");
                // console.info(apiData);

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
                    data: 'schedule_name'
                },
                {
                    data: 'schedule_event_start'
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
                }
            ],
            scrollX: true,
            responsive: true
        });
        $('#devicedatatable').on('change', '.status-switch', async function() {
            var device_id = $(this).data('uid');
            var newStatus = $(this).is(':checked') ? 1 : 0;
            var success = await updatedevicestatus(device_id, newStatus);

            if (!success) {
                $(this).prop('checked', !$(this).prop('checked'));
            }
        });
        $('#devicedatatable').on('change', '.device-control-switch', async function() {
            var $switch = $(this);
            var $row = $switch.closest('tr');
            var topic = encodeURI($switch.data('topic'));
            var on_val = $switch.data('on');
            var off_val = $switch.data('off');
            var isChecked = $switch.is(':checked');
            var message = isChecked ? on_val : off_val;
            var success = await statusdevice(topic, message);
            if (!success) {
                $switch.prop('checked', !isChecked);
                return;
            }
            // console.log('+++++++++++devicedatatable++++++++++++++++++');
            // console.log('topic:=>' + topic);
            // console.log('on_val:=>' + on_val);
            // console.log('off_val=>' + off_val);
            // console.log('isChecked=>' + isChecked);
            // console.log('message=>' + message);
            // console.log('success=>' + success);
            // console.log('+++++++++++devicedatatable++++++++++++++++++');
            // อัปเดตคอลัมน์ Data ทันที (ไม่ต้องรอ backend)
            var $dataCell = $row.find('td').eq(9); // index 9 คือคอลัมน์ Data
            if ($dataCell.length) {
                if (isChecked) {
                    $dataCell.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path class="windmill-spin" style="margin-left:6px; fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);"
                        d="M12 2c3.292 0 6 2.435 6 5.5c0 1.337 -.515 2.554 -1.369 3.5h4.369a1 1 0 0 1 1 1c0 3.292 -2.435 6 -5.5 6c-1.336 0 -2.553 -.515 -3.5 -1.368v4.368a1 1 0 0 1 -1 1c-3.292 0 -6 -2.435 -6 -5.5c0 -1.336 .515 -2.553 1.368 -3.5h-4.368a1 1 0 0 1 -1 -1c0 -3.292 2.435 -6 5.5 -6c1.337 0 2.554 .515 3.5 1.369v-4.369a1 1 0 0 1 1 -1z" />
                </svg>
            `);
                } else {
                    $dataCell.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-car-fan">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12.363 2.068l4.912 1.914a2.7 2.7 0 0 1 .68 4.646l-3.045 2.371l6.09 .001a1 1 0 0 1 .932 1.363l-1.914 4.912a2.7 2.7 0 0 1 -4.646 .68l-2.372 -3.047v6.092a1 1 0 0 1 -1.363 .932l-4.912 -1.914a2.7 2.7 0 0 1 -.68 -4.646l3.045 -2.372h-6.09a1 1 0 0 1 -.932 -1.363l1.914 -4.912a2.7 2.7 0 0 1 4.646 -.68l2.371 3.044l.001 -6.089a1 1 0 0 1 1.363 -.932" />
                </svg>
            `);
                }
            }

            // รีโหลดข้อมูลจริงจาก backend หลัง 40 วินาที (40000 ms)
            // setTimeout(function() {
            //     $('#devicedatatable').DataTable().ajax.reload(null, false);
            // }, 40000);
        });



        function debounce(fn, wait = 300) {
            let t;
            return (...a) => {
                clearTimeout(t);
                t = setTimeout(() => fn.apply(this, a), wait);
            };
        }
        $('.filter-input').on('keyup change', debounce(() => table.ajax.reload()));


    });
    // setInterval(function() {
    //     $('#devicedatatable').DataTable().ajax.reload(null, false); // รีโหลดข้อมูลโดยไม่รีเซ็ตหน้า
    // }, <?php  echo $this->config->item('api_call_time_mqtt'); ?>); //10 วินาที
    function deleteRow(id) {
        //console.log("Delete row with ID:", id);
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
                var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
                var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
                var apiUrl = `${baseApiUrl}settings/devicedelete?device_id=${id}`;
                fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            Swal.fire(
                                '<?php echo $this->lang->line('c_data_deleted'); ?>',
                                '<?php echo $this->lang->line('c_data_deleted_successfully'); ?>',
                                'success'
                            );
                            $('#example').DataTable().ajax.reload(null,
                                true); // false เพื่อให้อยู่หน้าเดิม
                        } else {
                            Swal.fire(
                                '<?php echo $this->lang->line('c_error_occurred'); ?>!',
                                data.message ||
                                '<?php echo $this->lang->line('c_not_be_deleted'); ?>',
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
        var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        var apiUrl = `${baseApiUrl}settings/devicetypeall`;
        try {
            var response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch device types');
            var data = await response.json();
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
    </script>