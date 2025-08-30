<?php 
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$option = @$input['option'] ?? '';
$api_url = $this->config->item('api_url');
$bucket = @$input['bucket'] ?? "";
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

<!-- jQuery -->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- DataTables JS -->
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<?php $this->load->view('settings/alarm/pagewrapper'); ?>
<div class="page-body">
    <div class="card-body">
        <div class="card">
            <!-- Filter Section -->
            <div class="row mb-3 mt-3 ms-2 me-2">
                <div class="col-md-3">
                    <label for="filter-event" class="form-label">Event</label>
                    <select id="filter-event" class="form-select">
                        <option value=""><?php echo $this->lang->line('c_all');?></option>
                        <option value="1"><?php echo $this->lang->line('t_on'); ?></option>
                        <option value="0"><?php echo $this->lang->line('t_off'); ?></option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="filter-keyword" class="form-label">Keyword</label>
                    <input type="text" id="filter-keyword" class="form-control" placeholder="Search...">
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button id="btn-filter"
                        class="btn btn-primary w-100"><?php echo $this->lang->line('c_search'); ?></button>
                </div>
            </div>
            <!-- Table Section -->
            <div class="table-responsive card-body p-0">
                <table id="example" class="table table-vcenter display responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Event</th>
                            <th>Time life</th>
                            <th>Warning</th>
                            <th>Recovery Warning</th>
                            <th>Alert</th>
                            <th>Recovery Alert</th>
                            <th>Email</th>
                            <!-- <th>Line</th>
                            <th>Telegram</th>
                            <th>Sms</th>
                            <th>NONC</th> -->
                            <th>Status</th>
                            <th>Count Alarm</th>
                            <th>Action</th>
                            <th>Device</th>
                            <th>Control</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>


<script>
var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
var lang = {
    confirmDelete: '<?php echo $this->lang->line('c_confirm_data_deletion_information'); ?>',
    delete: '<?php echo $this->lang->line('c_delete'); ?>',
    cancel: '<?php echo $this->lang->line('c_cancel'); ?>',
    deleted: '<?php echo $this->lang->line('c_data_deleted'); ?>',
    deletedSuccess: '<?php echo $this->lang->line('c_data_deleted_successfully'); ?>',
    errorOccurred: '<?php echo $this->lang->line('c_error_occurred'); ?>',
    notBeDeleted: '<?php echo $this->lang->line('c_not_be_deleted'); ?>',
    updatingStatus: '<?php echo $this->lang->line('t2_updating_status'); ?>',
    pleaseWait: '<?php echo $this->lang->line('t2_please_wait_a_moment'); ?>',
    updateSuccess: '<?php echo $this->lang->line('t2_please_Update_successful'); ?>',
    updateFailed: '<?php echo $this->lang->line('t2_please_Update_failed'); ?>',
    statusUpdated: '<?php echo $this->lang->line('t2_please_User_status_ha_been_updated'); ?>',
    unableToUpdate: '<?php echo $this->lang->line('t2_please_Unabletoupdatemqttstatus'); ?>',
    errorWhileUpdating: '<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status'); ?>',
    error: '<?php echo $this->lang->line('t2_An_error_occurred'); ?>',
    couldNotUpdate: '<?php echo $this->lang->line('t2_The_status_could_not_be_updated'); ?>'
};

function deleteRow(id) {
    Swal.fire({
        title: lang.confirmDelete,
        text: lang.confirmDelete,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: lang.delete,
        cancelButtonText: lang.cancel
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${baseApiUrl}settings/deletearmdevice?alarm_action_id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        Swal.fire(lang.deleted, lang.deletedSuccess, 'success');
                        $('#example').DataTable().ajax.reload(null, false);
                    } else {
                        Swal.fire(lang.errorOccurred, data.message || lang.notBeDeleted, 'error');
                    }
                })
                .catch((error) => {
                    console.error('Delete Error:', error);
                    Swal.fire(lang.errorOccurred, lang.notBeDeleted, 'error');
                });
        }
    });
}

async function updatealarmsField(alarm_action_id, field, value) {
    try {
        Swal.fire({
            title: lang.updatingStatus,
            text: lang.pleaseWait,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
        let payload = {
            alarm_action_id
        };
        payload[field] = value;
        console.log('alarm_action_id:', alarm_action_id);
        console.log('field:', field);
        console.log('value:', value);
        console.log('payload:');
        console.info(payload);
        // settings/deletearmdevice
        var response = await fetch(`${baseApiUrl}settings/updatealarmstatus`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        Swal.close();
        if (!response.ok) {
            let errorText = await response.text();
            throw new Error(`API responded with status: ${response.status}. ${errorText}`);
        }
        var data = await response.json();
        if (data.code === 200 || data.success === true) {
            Swal.fire({
                icon: 'success',
                title: lang.updateSuccess,
                text: lang.statusUpdated,
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: lang.updateFailed,
                text: data.message || lang.unableToUpdate,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return false;
        }
    } catch (error) {
        Swal.close();
        console.error(lang.errorWhileUpdating, error);
        Swal.fire(
            lang.error,
            `${lang.couldNotUpdate}: ${error.message}`,
            'error'
        );
        return false;
    }
}

// ตัวแปร filter
let filterEvent = '';
let filterKeyword = '';

// ปรับ fetchData ให้รับ event, keyword
async function fetchData(page = 1, pageSize = 10, event = '', search = '') {
    var apiUrl =
        `${baseApiUrl}settings/alarmdevice?page=${page}&event=${event}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}`;
    var response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}
var eventStatusText = {
    on: <?php echo json_encode($this->lang->line('t_on')); ?>,
    off: <?php echo json_encode($this->lang->line('t_off')); ?>
};
var title_event = <?php echo json_encode($this->lang->line('t2_event')); ?>;
var title_status = <?php echo json_encode($this->lang->line('t2_status_event')); ?>;
var life_time_alarm = <?php echo json_encode($this->lang->line('t2_life_time_alarm')); ?>;
var title_start_time = <?php echo json_encode($this->lang->line('t2_start_time')); ?>;
var t2_title = <?php echo json_encode($this->lang->line('t2_title_event')); ?>;
var c_device = <?php echo json_encode($this->lang->line('c_device')); ?>;
let dataTable = null;
$(document).ready(function() {
    dataTable = $('#example').DataTable({
        serverSide: true,
        processing: true,
        pageLength: 10,
        ajax: async function(data, callback, settings) {
            var page = Math.floor(data.start / data.length) + 1;
            var pageSize = data.length;
            var search = filterKeyword;
            var event = filterEvent;
            var apiData = await fetchData(page, pageSize, event, search);
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
                data: 'alarm_action_id',
                title: "ID"
            },
            {
                data: 'action_name',
                title: t2_title
            },
            {
                data: 'event',
                title: title_event,
                className: "text-center",
                render: function(data, type, row) {
                    const status = Number(data);
                    if (status === 1) {
                        return '<span style="color: green;">' + eventStatusText.on + '</span>';
                    } else if (status === 0) {
                        return '<span style="color: red;">' + eventStatusText.off + '</span>';
                    } else {
                        return '<span style="color: gray;">-</span>';
                    }
                }
                // render: function(data, type, row) {
                //     return Number(data) === 1 ? eventStatusText.on : eventStatusText.off;
                // }
            },
            {
                data: 'time_life',
                title: life_time_alarm
            }, {
                data: 'status_warning',
                title: "Warning"
            }, {
                data: 'recovery_warning',
                title: "Recovery Warning"
            }, {
                data: 'status_alert',
                title: "Alert"
            }, {
                data: 'recovery_alert',
                title: "Recovery Alert"
            }, {
                data: 'email_alarm',
                title: "Email",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    // console.log('isChecked:', isChecked);
                    // console.log('row.email_alarm:', row.email_alarm);
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-status" type="checkbox" role="switch"
                                id="switch-status-${row.alarm_action_id}" data-alarm_action_id="${row.alarm_action_id}" data-field="email_alarm" ${isChecked}
                                aria-label="Switch for ${row.alarm_action_id} status">
                        </div>`;
                }
            }, /*{
                data: 'line_alarm',
                title: "Line",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    // console.log('isChecked:', isChecked);
                    // console.log('row.line_alarm:', row.line_alarm);
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-status" type="checkbox" role="switch"
                                id="switch-status-${row.alarm_action_id}" data-alarm_action_id="${row.alarm_action_id}" data-field="line_alarm" ${isChecked}
                                aria-label="Switch for ${row.alarm_action_id} status">
                        </div>`;
                }
            }, {
                data: 'telegram_alarm',
                title: "Telegram",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    // console.log('isChecked:', isChecked);
                    // console.log('row.telegram_alarm:', row.telegram_alarm);
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-status" type="checkbox" role="switch"
                                id="switch-status-${row.alarm_action_id}" data-alarm_action_id="${row.alarm_action_id}" data-field="telegram_alarm" ${isChecked}
                                aria-label="Switch for ${row.alarm_action_id} status">
                        </div>`;
                }
            }, {
                data: 'sms_alarm',
                title: "SMS",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    // console.log('isChecked:', isChecked);
                    // console.log('row.sms_alarm:', row.sms_alarm);
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-status" type="checkbox" role="switch"
                                id="switch-status-${row.alarm_action_id}" data-alarm_action_id="${row.alarm_action_id}" data-field="sms_alarm" ${isChecked}
                                aria-label="Switch for ${row.alarm_action_id} status">
                        </div>`;
                }
            }, {
                data: 'nonc_alarm',
                title: "NONC",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    // console.log('isChecked:', isChecked);
                    // console.log('row.nonc_alarm:', row.nonc_alarm);
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-status" type="checkbox" role="switch"
                                id="switch-status-${row.alarm_action_id}" data-alarm_action_id="${row.alarm_action_id}" data-field="nonc_alarm" ${isChecked}
                                aria-label="Switch for ${row.alarm_action_id} status">
                        </div>`;
                }
            },
			*/
            {
                data: 'status',
                title: title_status,
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    // console.log('isChecked:', isChecked);
                    // console.log('row.alarm_action_id:', row.alarm_action_id);
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-status" type="checkbox" role="switch"
                                id="switch-status-${row.alarm_action_id}" data-alarm_action_id="${row.alarm_action_id}" data-field="status" ${isChecked}
                                aria-label="Switch for ${row.alarm_action_id} status">
                        </div>`;
                }
            },
            {
                data: 'count_device',
                title: "Count Alarm"
            },
            {
                data: null,
                title: 'Action',
                orderable: false,
                searchable: false,
                className: 'dt-body-right dt-head-right',
                render: function(data, type, row) {
                    return `
                        <a href="<?php echo base_url('settings/alarm');?>/devicealarm?alarm_action_id=${row.alarm_action_id}" class="btn btn-sm btn-warning me-1"> Alarm </a>
                      `;
                }
            },
            {
                data: 'count_device_event',
                title: "Count Event"
            },
            {
                data: null,
                title: 'Action',
                orderable: false,
                searchable: false,
                className: 'dt-body-right dt-head-right',
                render: function(data, type, row) {
                    return ` <a href="<?php echo base_url('settings/alarm');?>/deviceaction?alarm_action_id=${row.alarm_action_id}" class="btn btn-sm btn-success me-1"> Control </a>
                        <a href="<?php echo base_url('settings/alarm');?>/edit?alarm_action_id=${row.alarm_action_id}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>
                        <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow(${row.alarm_action_id})"><?php echo $this->lang->line('c_delete');?></a>
                    `;
                }
            }
        ],
        scrollX: true,
        responsive: true
    });

    // Filter Event/Keyword
    $('#btn-filter').on('click', function() {
        filterEvent = $('#filter-event').val();
        filterKeyword = $('#filter-keyword').val();
        dataTable.ajax.reload();
    });
    $('#filter-keyword').on('keypress', function(e) {
        if (e.which === 13) {
            $('#btn-filter').click();
        }
    });
    $('#filter-event').on('change', function() {
        $('#btn-filter').click();
    });

    // Event Listener สำหรับ status-switch
    $('#example').on('change', '.status-switch', async function() {
        var alarm_action_id = $(this).data('alarm_action_id');
        var field = $(this).data('field');
        var newValue = $(this).is(':checked') ? 1 : 0;
        console.log('alarm_action_id:', alarm_action_id);
        console.log('field:', field);
        console.log('newValue:', newValue);
        var success = await updatealarmsField(alarm_action_id, field, newValue);
        if (!success) {
            $(this).prop('checked', !$(this).prop('checked'));
        }
    });
});
</script>
