<?php 
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$option = $input['option'] ?? '';
$api_url = $this->config->item('api_url');
$token = $_SESSION['token'] ?? '';
$bucket = $input['bucket'] ?? '';
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
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<?php $this->load->view('settings/mqtt/pagewrapper'); ?>

<div class="page-body">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-md-3">
                <select id="filterType" class="form-select">
                    <option value="">-- Type --</option>
                </select>
            </div>
            <div class="col-md-3">
                <select id="filterLocation" class="form-select">
                    <option value="">-- Location --</option>
                </select>
            </div>
        </div>
        <div class="card">
            <div class="table-responsive card-body p-0">
                <table id="example" class="table table-vcenter display responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>Sort</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Location</th>
                            <!-- <th>Host</th>
                            <th>Port</th>
                            <th>Bucket</th>
                            <th>Org</th> -->
                            <th>Date</th>
                            <th>Device</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
const apiTypeAll = "<?php echo $api_url; ?>settings/typeall";
const apiLocationAll = "<?php echo $api_url; ?>settings/locationall";
const apiList = "<?php echo $api_url; ?>settings/lismqtt";
const apiDelete = "<?php echo $api_url; ?>deletemqtt";
const apiUpdateStatus = "<?php echo $api_url; ?>settings/updatemqttstatus";
const token = <?php echo json_encode($token); ?>;
const bucket = <?php echo json_encode($bucket); ?>;
const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
// โหลด Filter Type
function loadTypeFilter() {
    fetch(apiTypeAll, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(resp => {
            const select = document.getElementById('filterType');
            select.innerHTML = '<option value="">-- Type --</option>';
            if (resp && Array.isArray(resp.payload)) {
                resp.payload.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.type_id;
                    option.textContent = type.type_name;
                    select.appendChild(option);
                });
            }
        });
}

// โหลด Filter Location
function loadLocationFilter() {
    fetch(apiLocationAll, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(resp => {
            const select = document.getElementById('filterLocation');
            select.innerHTML = '<option value="">-- Location --</option>';
            if (resp && Array.isArray(resp.payload)) {
                resp.payload.forEach(loc => {
                    const option = document.createElement('option');
                    option.value = loc.location_id;
                    option.textContent = loc.location_name;
                    select.appendChild(option);
                });
            }
        });
}

// ลบข้อมูล
function deleteRow(id) {
    Swal.fire({
        title: 'ยืนยันการลบข้อมูล?',
        text: "คุณต้องการลบข้อมูลนี้จริงหรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${apiDelete}?mqtt_id=${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        Swal.fire('ลบแล้ว!', 'ข้อมูลถูกลบเรียบร้อย', 'success');
                        $('#example').DataTable().ajax.reload(null, false);
                    } else {
                        Swal.fire('เกิดข้อผิดพลาด!', data.message || 'ไม่สามารถลบข้อมูลได้', 'error');
                    }
                })
                .catch(() => {
                    Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถลบข้อมูลได้', 'error');
                });
        }
    });
}

async function updatemqttstatus(mqtt_id, newStatus) {
    try {
        Swal.fire({
            title: 'กำลังอัปเดตสถานะ...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const apiUpdateStatusV1 = `${baseApiUrl}settings/updatemqttstatus`;
        const response = await fetch(apiUpdateStatusV1, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mqtt_id: mqtt_id,
                status: newStatus
            })
        });
        Swal.close();
        const data = await response.json();
        if (data.code === 200 || data.success === true) {
            Swal.fire({
                icon: 'success',
                title: data.message || 'อัปเดตสำเร็จ!',
                text: data.message_th || 'อัปเดตสำเร็จ',
                timer: 1200,
                showConfirmButton: false
            });
            // ทำงานเบื้องหลังโดยไม่ต้องรอผลลัพธ์
            (async () => {
                var deletecache = 1;
                try {
                    await fetch(`${baseApiUrl}mqtt/listtitle?deletecache=${deletecache}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });
                    await fetch(`${baseApiUrl}settings/listdevicepageactive?deletecache=${deletecache}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });
                    await fetch(`${baseApiUrl}settings/listdevicepage?deletecache=${deletecache}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });
                    await fetch(`${baseApiUrl}settings/listdevicealarm?deletecache=${deletecache}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });
                } catch (e) {
                    // จัดการ error ถ้าต้องการ
                }
            })();

            // return ทันที ไม่ต้องรอ background
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'อัปเดตล้มเหลว!',
                text: data.message || 'ไม่สามารถอัปเดตสถานะได้',
                timer: 1500,
                showConfirmButton: false
            });
            return false;
        }
    } catch (error) {
        Swal.close();
        Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถอัปเดตสถานะได้', 'error');
        return false;
    }
}

// ดึงข้อมูล (สำหรับ DataTables)
async function fetchData(page = 1, pageSize = 10, search = '', type_id = '', location_id = '') {
    const url =
        `${apiList}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}&bucket=${bucket}&type_id=${type_id}&location_id=${location_id}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    return await response.json();
}

$(document).ready(function() {
    loadTypeFilter();
    loadLocationFilter();

    const table = $('#example').DataTable({
        serverSide: true,
        processing: true,
        pageLength: 10,
        ajax: async function(data, callback) {
            const page = Math.floor(data.start / data.length) + 1;
            const pageSize = data.length;
            const search = data.search.value;
            const type_id = $('#filterType').val();
            const location_id = $('#filterLocation').val();
            const apiData = await fetchData(page, pageSize, search, type_id, location_id);
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
                data: 'sort',
                title: "Sort"
            }, {
                data: 'mqtt_id',
                title: "ID"
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
                title: "Location"
            },
            // {
            //     data: 'host',
            //     title: "Host"
            // },
            // {
            //     data: 'port',
            //     title: "Port"
            // },
            // {
            //     data: 'bucket',
            //     title: "Bucket"
            // },
            // {
            //     data: 'org',
            //     title: "Org"
            // },
            {
                data: 'updateddate',
                title: "Date"
            },
            {
                data: null,
                title: 'Device',
                orderable: false,
                searchable: false,
                className: 'dt-body-right dt-head-right',
                render: function(data, type, row, meta) {
                    var device_count = row.device_count;
                    if (row.device_count == 0) {
                        return `<a href="<?php echo base_url('settings/device/devicesadd');?>?bucket=${row.bucket}&mqtt_id=${row.mqtt_id}" class="btn btn-sm btn-warning me-1">Add Device</a>`;
                    } else if (row.status == 1) {
                        return `<a href="<?php echo base_url('settings/device/deviceactive');?>?bucket=${row.bucket}&mqtt_id=${row.mqtt_id}" class="btn btn-sm btn-info me-1">Device (${row.device_count})</a>`;
                    } else {
                        return ``;
                        // return ` <a href="<?php echo base_url('settings/device');?>?bucket=${row.bucket}&mqtt_id=${row.mqtt_id}" class="btn btn-sm btn-info me-1"> Device (${row.device_count}) </a>`;
                    }
                }
            },
            {
                data: 'status',
                title: "Status",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row) {
                    if (row.device_count == 0) return '';
                    const isChecked = Number(data) === 1 ? 'checked' : '';
                    return `<div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height:1.5rem;">
                        <input class="form-check-input status-switch" type="checkbox" data-uid="${row.mqtt_id}" ${isChecked}>
                    </div>`;
                }
            },
            {
                data: null,
                title: 'Actions',
                orderable: false,
                searchable: false,
                className: 'dt-body-right dt-head-right',
                render: function(data, type, row) {
                    return `
                        <a href="<?php echo base_url('settings/mqtt');?>/detail?id=${row.mqtt_id}" class="btn btn-sm btn-info me-1">Detail</a>
                        <a href="<?php echo base_url('settings/mqtt');?>/edit?id=${row.mqtt_id}" class="btn btn-sm btn-warning me-1">Edit</a> 
                    `;
                    //  return `
                    //     <a href="<?php echo base_url('settings/mqtt');?>/detail?id=${row.mqtt_id}" class="btn btn-sm btn-info me-1">Detail</a>
                    //     <a href="<?php echo base_url('settings/mqtt');?>/edit?id=${row.mqtt_id}" class="btn btn-sm btn-warning me-1">Edit</a>
                    //     <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow(${row.mqtt_id})">Delete</a>
                    // `;
                }
            }
        ],
        scrollX: true,
        responsive: true
    });

    // เมื่อเปลี่ยน Filter ให้รีโหลดตาราง
    $('#filterType, #filterLocation').on('change', function() {
        table.ajax.reload(null, true);
    });

    // สวิตช์สถานะ
    $('#example').on('change', '.status-switch', async function() {
        var mqtt_id = $(this).data('uid');
        var newStatus = $(this).is(':checked') ? 1 : 0;
        var success = await updatemqttstatus(mqtt_id, newStatus);

        if (!success) {
            // ถ้าอัปเดตไม่สำเร็จ ให้สลับสถานะกลับ
            $(this).prop('checked', !$(this).prop('checked'));
        } else {
            // ถ้าอัปเดตสำเร็จ รีเฟรช DataTable หน้าเดิม (ไม่เปลี่ยนหน้า)
            $('#example').DataTable().ajax.reload(null, false);
        }
    });

});
</script>