<?php 
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$option = @$input['option'] ?? '';
$api_url = $this->config->item('api_url');
$token = $_SESSION['token'] ?? '';
$bucket = @$input['bucket'] ?? '';
if (!$token) {
    redirect(base_url('dashboard'));
    die();
}
?>
<style>
td.dt-body-right,
th.dt-head-right {
    text-align: right !important;
}

.table th {
    text-align: center;
}
</style>
<!-- jQuery, DataTables, SweetAlert2 -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>flatpickr.min.css" />
<script src="<?php echo base_url('assets/addons/');?>flatpickr.js"></script>
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>

<div class="page-wrapper">
    <!-- BEGIN PAGE HEADER -->
    <div class="page-header d-print-none">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        Schedule log
                    </h2>
                </div>
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">
                        <a href="<?php echo base_url('settings/schedule');?>"
                            class="btn btn-primary btn-5 d-none d-sm-inline-block" data-bs-target="#modal-report">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-2">
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                            schedule
                        </a>
                        <a href="#" class="btn btn-primary btn-6 d-sm-none btn-icon" data-bs-toggle="modal"
                            data-bs-target="#modal-report" aria-label="Create new report">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-2">
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END PAGE HEADER -->

    <div class="page-body">
        <div class="card-body">
            <div class="row mb-3">
                <!-- Filter Event -->
                <div class="col-md-2">
                    <label for="filter-event" class="form-label">Event</label>
                    <select id="filter-event" class="form-select">
                        <option value=""> --<?php echo $this->lang->line('c_all');?> --</option>
                        <option value="1"><?php echo $this->lang->line('t_on'); ?></option>
                        <option value="0"><?php echo $this->lang->line('t_off'); ?></option>
                    </select>
                </div>

                <!-- Filter System (Location) -->
                <div class="col-md-2">
                    <label for="filterLocation" class="form-label">System</label>
                    <select id="filterLocation" class="form-select">
                        <option value=""> --<?php echo $this->lang->line('c_all');?> --</option>
                    </select>
                </div>

                <?php ##########################?>
                <div class="col-md-2">
                    <label for="bucket-filter" class="form-label">Location</label>
                    <select id="bucket-filter" class="form-select filter-input">
                        <option value="">-- list --</option>
                    </select>
                </div>

                <div class="col-md-2">
                    <label for="type-id-filter" class="form-label">Type</label>
                    <select id="type-id-filter" class="form-control filter-input">
                        <option value="">--list--</option>
                    </select>
                </div>

                <!-- Filter Start Datetime -->
                <div class="col-md-1">
                    <label for="filter-start" class="form-label">Start datetime</label>
                    <input type="datetime-local" id="filter-start" class="form-control" />
                </div>

                <!-- Filter End Datetime -->
                <div class="col-md-1">
                    <label for="filter-end" class="form-label">End datetime</label>
                    <input type="datetime-local" id="filter-end" class="form-control" />
                </div>
            </div>

            <div class="card">
                <div class="table-responsive card-body p-0">
                    <table id="example" class="table table-vcenter display responsive nowrap" style="width:100%">
                        <thead>
                            <tr>
                                <th>schedule</th>
                                <th>event</th>
                                <th>event start</th>
                                <th>device</th>
                                <th>day</th>
                                <th>location</th>
                                <th>type</th>
                                <th>system</th>
                                <th>date</th>
                                <th>time</th>
                                <th>dotime</th>
                                <!-- <th>device id</th>
                                <th>schedule id</th> -->
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
    var apiLocationAll = "<?php echo $api_url; ?>settings/locationall";
    var apiList = "<?php echo $api_url; ?>settings/scheduleprocesslogpaginate";
    var token = <?php echo json_encode($token); ?>;

    var title_event = <?php echo json_encode($this->lang->line('t2_event')); ?>;
    var eventStatusText = {
        on: <?php echo json_encode($this->lang->line('t_on')); ?>,
        off: <?php echo json_encode($this->lang->line('t_off')); ?>
    };
    // ติดตั้ง flatpickr ให้ input id filter-start และ filter-end
    flatpickr("#filter-start", {
        enableTime: true,
        dateFormat: "d/m/Y H:i:S",
        time_24hr: true
    });

    flatpickr("#filter-end", {
        enableTime: true,
        dateFormat: "d/m/Y H:i:S",
        time_24hr: true
    });

    function convertDMYtoISO(datetimeStr) {
        // datetimeStr ตัวอย่าง: "01/08/2025 17:01:01"
        if (!datetimeStr) return '';
        const [datePart, timePart] = datetimeStr.split(' ');
        if (!datePart) return '';

        const [day, month, year] = datePart.split('/');

        if (!day || !month || !year) return '';

        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timePart || '00:00:00'}`;
    }
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUrllisttitle = `${baseApiUrl}mqtt/listtitleall`;
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
                $select.append('<option value="">--  List --</option>');
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

    function loadLocationFilter() {
        fetch(apiLocationAll, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(resp => {
                var select = document.getElementById('filterLocation');
                select.innerHTML = '<option value="">--<?php echo $this->lang->line('c_all');?>--</option>';
                if (resp && Array.isArray(resp.payload)) {
                    resp.payload.forEach(loc => {
                        var option = document.createElement('option');
                        option.value = loc.location_id;
                        option.textContent = loc.location_name;
                        select.appendChild(option);
                    });
                }
            });
    }
    // แปลง datetime-local "YYYY-MM-DDTHH:mm" เป็น "YYYY-MM-DD HH:mm:ss"
    function formatDateTimeLocal(datetimeLocal) {
        if (!datetimeLocal) return '';
        return datetimeLocal.replace('T', ' ') + ':00';
    }

    // แปลงเวลา 12 ชม. พร้อม AM/PM เป็น 24 ชม.
    function convertTo24Hour(time12h) {
        if (!time12h) return '';
        var [time, modifier] = time12h.split(' ');
        if (!modifier) return time; // ไม่มี AM/PM ให้คืนค่าเดิม
        var [hours, minutes, seconds] = time.split(':');
        if (hours === '12') hours = '00';
        if (modifier.toLowerCase() === 'pm') hours = parseInt(hours, 10) + 12;
        return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    }

    async function fetchData(page = 1, pageSize = 10, search = '', type_id = '', event = '', location_id = '', start =
        '', end = '', bucket = '') {
        var url =
            `${apiList}?page=${page}&pageSize=${pageSize}` +
            `&keyword=${encodeURIComponent(search)}` +
            `&event=${event}` +
            `&type_id=${type_id}` +
            `&bucket=${bucket}` +
            `&location_id=${location_id}` +
            `&start=${encodeURIComponent(start)}` +
            `&end=${encodeURIComponent(end)}`;
        var response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        return await response.json();
    }

    $(document).ready(function() {
        loadLocationFilter();
        loadBucketList();
        loadDeviceTypes();

        var table = $('#example').DataTable({
            serverSide: true,
            processing: true,
            pageLength: 10,
            ajax: async function(data, callback, settings) {
                var page = Math.floor(data.start / data.length) + 1;
                var pageSize = data.length;
                var search = data.search.value;
                var location_id = $('#filterLocation').val();
                var event = $('#filter-event').val();
                var bucket = $('#bucket-filter').val();
                var type_id = $('#type-id-filter').val();
                if (type_id == null) {
                    var type_id = params.append('type_id', type_id);
                }
                var rawStart = $('#filter-start').val();
                var rawEnd = $('#filter-end').val();

                var start1 = formatDateTimeLocal(rawStart);
                var end1 = formatDateTimeLocal(rawEnd);
                var start = convertDMYtoISO(rawStart);
                var end = convertDMYtoISO(rawEnd);
                var apiData = await fetchData(page, pageSize, search, type_id, event, location_id,
                    start, end, bucket);

                if (apiData && apiData.payload && apiData.payload.data) {
                    callback({
                        draw: data.draw,
                        recordsTotal: apiData.payload.total,
                        recordsFiltered: apiData.payload.total,
                        data: apiData.payload.data
                    });
                } else {
                    callback({
                        draw: data.draw,
                        recordsTotal: 0,
                        recordsFiltered: 0,
                        data: []
                    });
                }
            },
            columns: [{
                    data: 'schedule_name',
                    title: "schedule"
                },
                {
                    data: 'event',
                    title: title_event,
                    className: "text-center",
                    render: function(data) {
                        var eventNum = Number(data);
                        if (eventNum === 1) {
                            return '<b><span style="color: green;">' + eventStatusText.on +
                                '</span></b>';
                        } else {
                            return '<b><span style="color: red;">' + eventStatusText.off +
                                '</span></b>';
                        }
                    }
                },
                {
                    data: 'schedule_event_start',
                    title: "start"
                },
                {
                    data: 'device_name',
                    title: "device"
                },
                {
                    data: 'day',
                    title: "day"
                },
                {
                    data: 'mqtt_name',
                    title: "Name"
                },
                {
                    data: 'type_name',
                    title: "Type"
                },
                {
                    data: 'location_name',
                    title: "system"
                },
                {
                    data: 'date',
                    title: "date"
                },
                {
                    data: 'time',
                    title: "time",
                    render: function(data) {
                        if (!data) return '';
                        // หากมี AM/PM แปลงเป็น 24 ชม.
                        if (data.toLowerCase().includes('am') || data.toLowerCase().includes(
                                'pm')) {
                            return convertTo24Hour(data);
                        }
                        return data; // แสดงตามเดิม (24 ชม.)
                    }
                },
                {
                    data: 'dotime',
                    title: "dotime"
                }
                // ,{
                //     data: 'deviceid',
                //     title: "device id"
                // },
                // {
                //     data: 'schedule_id',
                //     title: "schedule id"
                // }
            ],
            scrollX: true,
            responsive: true
        });

        // โหลดข้อมูลใหม่เมื่อเปลี่ยนฟิลเตอร์ทั้งหมดยกเว้น filterType (ถ้าเปิดใช้ later)
        $('#filter-event, #filterLocation, #filter-start, #filter-end,#bucket-filter,#type-id-filter').on(
            'change',
            function() {
                table.ajax.reload();
            });
    });
    </script>