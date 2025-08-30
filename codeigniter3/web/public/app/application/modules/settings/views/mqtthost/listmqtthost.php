<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=@$input['option'];
$api_url= $this->config->item('api_url');
$email_id=@$input['email_id'] ?? "";
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
<?php $this->load->view('settings/mqtthost/pagewrapper'); ?>
<div class="page-body">
    <?php  /*****body**********/  ?>
    <div class="card-body">
        <div class="card">
            <div class="table-responsive card-body p-0">
                <?php ############card#################?>
                <table id="example" class="table table-vcenter display responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>Hostname</th>
                            <th>Host</th>
                            <th>Port</th>
                            <th>username</th>
                            <th>password</th>
                            <th>date</th>
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
<?php 
$role_id_api = @$_SESSION['role_id_api'];   
 if($role_id_api==''){
    $role_id_api=4;
 }
 ?>
<script>
var role_id_api = <?php echo json_encode($role_id_api); ?>;
var api_url = <?php echo json_encode($api_url); ?>;
var email_id = <?php echo json_encode($email_id); ?>;
var tokens = <?php echo json_encode($token); ?>;
async function updateemailstatus(email_id, newStatus) {
    try {
        // Swal.fire({
        //     title: '<?php echo $this->lang->line('t2_updating_status'); ?>',
        //     text: '<?php echo $this->lang->line('t2_please_wait_a_moment'); ?>',
        //     allowOutsideClick: false,
        //     didOpen: () => {
        //         Swal.showLoading();
        //     }
        // });

        var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        var apiUrl = `${baseApiUrl}settings/updateemailstatus`;

        var response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_id: email_id,
                status: newStatus
            })
        });

        // เคลียร์ cache
        var apiUrldeletecache = `${baseApiUrl}settings/listemail?deletecache=1`;
        await fetch(apiUrldeletecache, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        Swal.close();

        if (!response.ok) {
            var errorText = await response.text();
            throw new Error(`API ตอบกลับด้วยสถานะ: ${response.status}. ${errorText}`);
        }

        const data = await response.json();

        if (data.code === 200 || data.success === true) {
            // Swal.fire({
            //     icon: 'success',
            //     title: '<?php echo $this->lang->line('t2_please_Update_successful'); ?>!',
            //     text: '<?php echo $this->lang->line('t2_please_User_status_ha_been_updated'); ?>',
            //     timer: 1000,
            //     timerProgressBar: true,
            //     didOpen: () => {
            //         const confirmButton = Swal.getConfirmButton();
            //         if (confirmButton) confirmButton.disabled = false;
            //     }
            // });

            // ✅ รีโหลด DataTable หลังอัปเดตสำเร็จ โดยคงอยู่หน้าปัจจุบัน
            $('#example').DataTable().ajax.reload(null, false);

            return true;
        } else {
            // Swal.fire({
            //     icon: 'error',
            //     title: '<?php echo $this->lang->line('t2_please_Update_failed'); ?>!',
            //     text: '<?php echo $this->lang->line('t2_please_Unabletoupdateemailstatus'); ?>',
            //     timer: 1500,
            //     timerProgressBar: true,
            //     didOpen: () => {
            //         const confirmButton = Swal.getConfirmButton();
            //         if (confirmButton) confirmButton.disabled = true;
            //     }
            // });
            // return false;
        }
    } catch (error) {
        // Swal.close();
        // console.error('<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status'); ?>:', error);
        // Swal.fire(
        //     '<?php echo $this->lang->line('t2_An_error_occurred'); ?>!',
        //     `<?php echo $this->lang->line('t2_The_status_could_not_be_updated'); ?>: ${error.message}`,
        //     'error'
        // );
        // return false;
    }
}
async function fetchData(page = 1, pageSize = 10, search = '') {
    var email_id = <?php echo json_encode($email_id); ?>;
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUrl =
        `${baseApiUrl}settings/listemail?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}&email_id=${email_id}`;
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
                data: 'email_name',
                title: "name."
            },
            {
                data: 'host',
                title: "host"
            },
            {
                data: 'port',
                title: "port"
            },
            {
                data: 'username',
                title: "username"
            },
            {
                data: 'password',
                title: "password"
            },
            {
                data: 'updateddate',
                title: "date"
            },
            {
                data: 'status',
                title: "Status",
                className: "text-center",
                orderable: true,
                searchable: false,
                render: function(data, type, row, meta) {
                    var isChecked = Number(data) === 1 ? 'checked' : '';
                    return `<div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                        <input class="form-check-input status-switch" type="checkbox" role="switch"
                            id="switch-${row.email_id}" data-email_id="${row.email_id}" ${isChecked}
                            aria-label="User status switch for ${row.email_id}">
                    </div>`;
                }
            },
            {
                data: null,
                title: "Actions",
                orderable: false,
                searchable: false,
                className: "dt-body-right dt-head-right",
                render: function(data, type, row, meta) {
                    // var editBtn =
                    //     `<a href="<?php echo base_url('settings/email');?>/edit?email_id=${row.email_id}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>`;
                    // var deleteBtn =
                    //     `<a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow('${row.email_id}')"><?php echo $this->lang->line('c_delete');?></a>`;
                    // return (row.status == 1) ? editBtn : (editBtn + deleteBtn);
                    if (role_id_api == 1) {
                        var editBtn =
                            `<a href="<?php echo base_url('settings/email');?>/edit?email_id=${row.email_id}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>`;
                        var deleteBtn =
                            `<a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow('${row.email_id}')"><?php echo $this->lang->line('c_delete');?></a>`;
                    } else if (role_id_api == 2) {
                        var editBtn =
                            `<a href="<?php echo base_url('settings/email');?>/edit?email_id=${row.email_id}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>`;
                        var deleteBtn = '';
                    } else {
                        var editBtn = '-';
                        var deleteBtn = '';
                    }
                    return (row.status == 1) ? '----------------' : (editBtn + deleteBtn);
                }
            }
        ],
        scrollX: true,
        responsive: true,
        // [FIX 4] ลบ columnDefs ที่ซ้ำซ้อนออก
    });

    // [FIX 1] เพิ่ม Event Listener สำหรับดักจับการเปลี่ยนแปลงของ status-switch
    // Event: เมื่อเปลี่ยนสวิตช์สถานะ
    // Event Listener สำหรับเปลี่ยนสถานะ
    $('#example').on('change', '.status-switch', async function() {
        const email_id = $(this).data('email_id');
        const newStatus = $(this).is(':checked') ? 1 : 0;
        const success = await updateemailstatus(email_id, newStatus);

        if (!success) {
            $(this).prop('checked', !$(this).prop('checked'));
        }
    });

    // กำหนดตัวแปรไว้ใน scope สูงสุด เพื่อใช้ร่วมกันทั้งสคริปต์
    const bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    const baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;

    // ฟังก์ชันลบแถวข้อมูล
    // make deleteRow global
    window.deleteRow = function(email_id) {
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
                let bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
                let baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
                fetch(`${baseApiUrl}settings/deleteemail?email_id=${email_id}`, {
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
                            $('#example').DataTable().ajax.reload(null, false);
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
    };
    // แนวทาง: ฟังก์ชัน deleteRow ต้องอยู่ global
    window.deleteRow = deleteRow;
});
</script>