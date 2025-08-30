<?php 
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$option = $input['option'] ?? '';
$api_url = $this->config->item('api_url');
$bucket = $input['bucket'] ?? "";
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
<?php $this->load->view('settings/schedule/pagewrapper'); ?>
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
                            <th>Start</th>
                            <th>Event</th>
                            <th>Sunday</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Status</th>
                            <th>Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
const lang = {
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
            fetch(`${baseApiUrl}settings/deleteschedule?schedule_id=${id}`, {
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

async function updateScheduleField(schedule_id, field, value) {
    try {
        Swal.fire({
            title: lang.updatingStatus,
            text: lang.pleaseWait,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
        let payload = {
            schedule_id
        };
        payload[field] = value;
        const response = await fetch(`${baseApiUrl}settings/updatescheduledaystatus`, {
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
        const data = await response.json();
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
    const apiUrl =
        `${baseApiUrl}settings/listschedulepage?page=${page}&event=${event}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}`;
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

const dayTitles = {
    sunday: <?php echo json_encode($this->lang->line('t_sunday')); ?>,
    monday: <?php echo json_encode($this->lang->line('t_monday')); ?>,
    tuesday: <?php echo json_encode($this->lang->line('t_tuesday')); ?>,
    wednesday: <?php echo json_encode($this->lang->line('t_wednesday')); ?>,
    thursday: <?php echo json_encode($this->lang->line('t_thursday')); ?>,
    friday: <?php echo json_encode($this->lang->line('t_friday')); ?>,
    saturday: <?php echo json_encode($this->lang->line('t_saturday')); ?>
};

const eventStatusText = {
    on: <?php echo json_encode($this->lang->line('t_on')); ?>,
    off: <?php echo json_encode($this->lang->line('t_off')); ?>
};
const title_event = <?php echo json_encode($this->lang->line('t2_title_event')); ?>;
const title_events = <?php echo json_encode($this->lang->line('t2_event')); ?>;
const title_status = <?php echo json_encode($this->lang->line('t2_status')); ?>;
const title_start_time = <?php echo json_encode($this->lang->line('t2_start_time')); ?>;
const t2_title = <?php echo json_encode($this->lang->line('t2_title')); ?>;
const t2_status_event = <?php echo json_encode($this->lang->line('t2_status_event')); ?>;
const c_device = <?php echo json_encode($this->lang->line('c_device')); ?>;

let dataTable = null;
$(document).ready(function() {
    dataTable = $('#example').DataTable({
        serverSide: true,
        processing: true,
        pageLength: 10,
        ajax: async function(data, callback, settings) {
            const page = Math.floor(data.start / data.length) + 1;
            const pageSize = data.length;
            const search = filterKeyword;
            const event = filterEvent;
            const apiData = await fetchData(page, pageSize, event, search);
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
                data: 'schedule_id',
                title: "ID"
            },
            {
                data: 'schedule_name',
                title: title_event
            },
            {
                data: 'start',
                title: title_start_time
            },
            // {
            //     data: 'device',
            //     title: c_device
            // },
            {
                data: 'event',
                title: title_event,
                className: "text-center",
                render: function(data, type, row) {
                    const status = Number(data);
                    if (status === 1) {
                        return '<b><span style="color: green;">' + eventStatusText.on +
                            '</span></b>';
                    } else {
                        return '<b><span style="color: red;">' + eventStatusText.off +
                            '</span></b>';
                    }
                }


            },
            ...['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(
                day => ({
                    data: day,
                    title: dayTitles[day],
                    className: "text-center",
                    orderable: true,
                    searchable: false,
                    render: function(data, type, row) {
                        const isChecked = Number(data) === 1 ? 'checked' : '';
                        return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-${day}" type="checkbox" role="switch"
                                id="switch-${day}-${row.schedule_id}" data-schedule_id="${row.schedule_id}" data-field="${day}" ${isChecked}
                                aria-label="Switch for ${row.schedule_id} ${day}">
                        </div>`;
                    }
                })),
            {
                data: 'status',
                title: t2_status_event,
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    const isChecked = Number(data) === 1 ? 'checked' : '';
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch status-switch-status" type="checkbox" role="switch"
                                id="switch-status-${row.schedule_id}" data-schedule_id="${row.schedule_id}" data-field="status" ${isChecked}
                                aria-label="Switch for ${row.schedule_id} status">
                        </div>`;
                }
            },
            {
                data: 'countRs',
                title: "Count"
            },
            {
                data: null,
                title: 'Actions',
                orderable: false,
                searchable: false,
                className: 'dt-body-right dt-head-right',
                render: function(data, type, row) {
                    return ` 
                        <a href="<?php echo base_url('settings/schedule');?>/scheduledata?schedule_id=${row.schedule_id}" class="btn btn-sm btn-success me-1"> Detail</a>
                        <a href="<?php echo base_url('settings/schedule');?>/device?schedule_id=${row.schedule_id}" class="btn btn-sm btn-success me-1"><?php echo $this->lang->line('c_active_device');?></a>
                        <a href="<?php echo base_url('settings/schedule');?>/edit?schedule_id=${row.schedule_id}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>
                        <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow(${row.schedule_id})"><?php echo $this->lang->line('c_delete');?></a>
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
        const schedule_id = $(this).data('schedule_id');
        const field = $(this).data('field');
        const newValue = $(this).is(':checked') ? 1 : 0;
        const success = await updateScheduleField(schedule_id, field, newValue);
        if (!success) {
            $(this).prop('checked', !$(this).prop('checked'));
        }
    });
});

function getStatusHtml(status) {
    if (status === 'on') {
        return '<span style="color: green;">' + eventStatusText.on + '</span>';
    } else if (status === 'off') {
        return '<span style="color: red;">' + eventStatusText.off + '</span>';
    } else {
        return '';
    }
}
</script>