<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=@$input['option'];
$api_url= $this->config->item('api_url');
$bucket=@$input['bucket'] ?? "";

//?bucket=BAACTW26
?>
<style>
<?php #################?>td.dt-body-right,
th.dt-head-right {
    text-align: right !important;
}

.table th {
    text-align: center;
}
</style>
<!-- jQuery (จำเป็นสำหรับ DataTables)  /libs/-->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- DataTables JS -->
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<?php $this->load->view('settings/mqtt/pagewrapper'); ?>
<div class="page-body">
    <?php  /*****body**********/  ?>
    <div class="card-body">
        <div class="card">
            <div class="table-responsive card-body p-0">
                <?php ############card#################?>
                <table id="example" class="table table-vcenter display responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>Sort</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>bucket</th>
                            <th>org</th>
                            <th>date</th>
                            <th>devicecount</th>
                            <th>status</th>
                        </tr>
                    </thead>
                </table>

                <?php ###############card##############?>
            </div>
        </div>
    </div>
</div>
<?php /*****body**********/?>
<script>
// ฟังก์ชันสำหรับอัปเดตสถานะผ่าน API
function deleteRow(id) {
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
            // เตรียม token และ url
            var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
            var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
            var apiUrl_delete = `${baseApiUrl}deletemqtt?mqtt_id=${id}`;

            fetch(apiUrl_delete, {
                    method: 'DELETE',
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
                        // รีเฟรช DataTable โดยไม่เปลี่ยนหน้า
                        $('#example').DataTable().ajax.reload(null, false);
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


async function updatemqttstatus(mqtt_id, newStatus) {
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
        var apiUrl = `${baseApiUrl}settings/updatemqttstatus`;
        var response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mqtt_id: mqtt_id,
                status: newStatus
            })
        });
        var apiUrldeletecache = `${baseApiUrl}mqtt?deletecache=1`;
        var responsedeletecache = await fetch(apiUrldeletecache, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        var datdeletecachea = await responsedeletecache.json();
        // console.log('datdeletecachea=>');
        // console.info(datdeletecachea);
        Swal.close();
        if (!response.ok) {
            var errorText = await response.text();
            throw new Error(`API ตอบกลับด้วยสถานะ: ${response.status}. ${errorText}`);
        }
        const data = await response.json();
        if (data.code === 200 || data.success === true) {
            // Swal.fire(
            //     '<?php echo $this->lang->line('t2_please_Update_successful'); ?>!',
            //     data.message || '<?php echo $this->lang->line('t2_please_User_status_ha_been_updated'); ?>',
            //     'success'
            // );
            // return true; // คืนค่า true เมื่อสำเร็จ
            Swal.fire({
                icon: 'success',
                title: '<?php echo $this->lang->line('t2_please_Update_successful'); ?>!',
                text: '<?php echo $this->lang->line('t2_please_User_status_ha_been_updated'); ?>',
                timer: 1500,
                timerProgressBar: true,
                // ไม่ต้องซ่อนปุ่ม
                // showConfirmButton: false, 

                didOpen: () => {
                    // ทำให้ปุ่ม OK กดไม่ได้ (Disabled)
                    const confirmButton = Swal.getConfirmButton();
                    if (confirmButton) {
                        confirmButton.disabled = true;
                    }
                }
            });
            return true;
        } else {
            // Swal.fire(
            //     '<?php echo $this->lang->line('t2_please_Update_failed'); ?>!',
            //     data.message || '<?php echo $this->lang->line('t2_please_Unabletoupdatemqttstatus'); ?>',
            //     'error'
            // );
            Swal.fire({
                icon: 'success',
                title: '<?php echo $this->lang->line('t2_please_Update_failed'); ?>!',
                text: '<?php echo $this->lang->line('t2_please_Unabletoupdatemqttstatus'); ?>',
                timer: 1500,
                timerProgressBar: true,
                // ไม่ต้องซ่อนปุ่ม
                // showConfirmButton: false, 

                didOpen: () => {
                    // ทำให้ปุ่ม OK กดไม่ได้ (Disabled)
                    const confirmButton = Swal.getConfirmButton();
                    if (confirmButton) {
                        confirmButton.disabled = true;
                    }
                }
            });
            return false; // คืนค่า false เมื่อล้มเหลว
        }
    } catch (error) {
        Swal.close();
        console.error('<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status'); ?>:', error);
        Swal.fire(
            '<?php echo $this->lang->line('t2_An_error_occurred'); ?>!',
            `<?php echo $this->lang->line('t2_The_status_could_not_be_updated'); ?>: ${error.message}`,
            'error'
        );
        return false; // คืนค่า false เมื่อเกิดข้อผิดพลาด
    }
}

async function fetchData(page = 1, pageSize = 10, search = '') {

    var bucket = <?php echo json_encode($bucket); ?>;
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUrl =
        `${baseApiUrl}settings/lismqtt?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}&bucket=${bucket}`;

    var response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    return data;
}

$(document).ready(function() {
    $('#example').DataTable({
        serverSide: true,
        processing: true,
        pageLength: 10,
        ajax: async function(data, callback, settings) {
            var page = Math.floor(data.start / data.length) + 1;
            var pageSize = data.length;
            var search = data.search.value;
            var apiData = await fetchData(page, pageSize, search);

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
                title: "Sort."
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
                data: 'host',
                title: "Host"
            },
            {
                data: 'port',
                title: "port"
            },
            {
                data: 'bucket',
                title: "Bucket"
            },
            {
                data: 'org',
                title: "Org"
            },
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
                    if (device_count == 0) {
                        return `
                            <a href="<?php echo base_url('settings/device/devicesadd');?>?bucket=${row.bucket}&mqtt_id=${row.mqtt_id}" class="btn btn-sm btn-warning me-1"> Add Device  </a> 
                            
                        `;
                    } else {
                        return `
                            <a href="<?php echo base_url('settings/device');?>?bucket=${row.bucket}&mqtt_id=${row.mqtt_id}" class="btn btn-sm btn-info me-1"> Device (${row.device_count}) </a> 
                        `;
                    }
                }
            },
            {
                data: 'status',
                title: "Status",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row, meta) {
                    var mqtt_id = row.mqtt_id;
                    var device_count = row.device_count;
                    // [FIX 3] แก้ไขการตรวจสอบค่า checked ให้ถูกต้อง
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    if (device_count == 0) {
                        return '';

                    } else {
                        return `
                            <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                                <input class="form-check-input status-switch" type="checkbox" role="switch"
                                       id="switch-${mqtt_id}" data-uid="${mqtt_id}" ${isChecked}
                                       aria-label="User status switch for ${mqtt_id}">
                            </div>`;

                    }

                }

            },
            {
                data: null,
                title: 'Actions',
                orderable: false,
                searchable: false,
                className: 'dt-body-right dt-head-right',
                render: function(data, type, row, meta) {
                    return `
                            <a href="<?php echo base_url('settings/mqtt');?>/detail?id=${row.mqtt_id}" class="btn btn-sm btn-info me-1"><?php echo $this->lang->line('c_detail');?></a>
                            <a href="<?php echo base_url('settings/mqtt');?>/edit?id=${row.mqtt_id}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>
                            <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow(${row.mqtt_id})"><?php echo $this->lang->line('c_delete');?></a>
                        `;
                }
            }
        ],
        scrollX: true,
        responsive: true,
        // [FIX 4] ลบ columnDefs ที่ซ้ำซ้อนออก
    });

    // [FIX 1] เพิ่ม Event Listener สำหรับดักจับการเปลี่ยนแปลงของ status-switch
    $('#example').on('change', '.status-switch', async function() {
        var mqtt_id = $(this).data('uid');
        var newStatus = $(this).is(':checked') ? 1 : 0;
        var success = await updatemqttstatus(mqtt_id, newStatus);

        // [FIX 2] หากอัปเดตไม่สำเร็จ ให้เปลี่ยนสถานะสวิตช์กลับไปที่เดิม
        if (!success) {
            $(this).prop('checked', !$(this).prop('checked'));
        }
    });
});

function deleteRow(id) {
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
            fetch(`<?php echo base_url('settings/mqttdelete');?>/delete?id=${id}`, {
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
</script>