<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=@$input['option'];
$api_url= base_url('user/api/apiget').'?option='.$option.'&';
$apipostupdateprofile= base_url('user/api/apipostupdateprofile');
$apiprofiledelete= base_url('user/api/apiprofiledelete');
// http://localhost/user/api/apipostupdateprofile?uid=6a68cc3f-8fed-451b-af72-720d064f2a86&active_status=1
// const response = await fetch(`http://localhost/user/apipostupdateprofile?uid=${userId}&active_status=${newStatus}`, {
/*
// http://localhost/user/api/apiprofiledelete?uid=ca2c3c79-118b-4d57-b20f-2572e52c28ed
onst apiUrl =`http://localhost/user/apiget?option=&page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`;
*/
?>
<style>
<?php #################?>td.dt-body-right,
th.dt-head-right {
    text-align: right !important;
}

.table th {
    text-align: center;
}

form-switch .form-check-input {
    height: 1.25rem;
    width: 2.5rem;
    cursor: pointer;
}

.action-buttons .btn {
    margin-right: 0.25rem;
}

.avatar-xs {
    width: 1.65rem;
    height: 1.65rem;
}
</style>
<!-- jQuery (จำเป็นสำหรับ DataTables)  /libs/-->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- DataTables JS -->
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>
<?php  $this->load->view('user/pagewrapper_user'); ?>
<div class="page-body">
    <div class="container-xl">
        <div class="card">
            <div class="card-table">
                <div class="card-header">
                    <h3 class="card-title mb-0">User </h3>
                </div>
                <div class="table-responsive">
                    <table id="example" class="table table-vcenter table-selectable">
                        <thead>
                            <tr>
                                <th class="w-1"></th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>firstname</th>
                                <th>lastname</th>
                                <th>login failed</th>
                                <th>status</th>
                                <th>Createddate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- ข้อมูลจะถูกเติมด้วย JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<?php /*****body**********/?>
<script>
// ฟังก์ชันสำหรับอัปเดตสถานะผ่าน API
async function updateStatus(userId, newStatus) {
    try {
        // แสดง loading indicator ขณะกำลังอัปเดต
        Swal.fire({
            title: '<?php echo $this->lang->line('t2_updating_status');?>',
            text: '<?php echo $this->lang->line('t2_please_wait_a_moment');?>',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
        var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
        var apiUrl = `${baseApiUrl}users/updatestatus`; // URL without query parameters
        var response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json' // Now this header is essential
            },
            // The body must be a JSON-serialized string
            body: JSON.stringify({
                uid: userId,
                active_status: newStatus
            })
        });
        console.log('apiUrl=>' + apiUrl);
        console.info(response);
        Swal.close(); // ปิด loading indicator

        if (!response.ok) {
            const errorText = await response.text(); // ดึงรายละเอียดข้อผิดพลาดเพิ่มเติม
            throw new Error(`API ตอบกลับด้วยสถานะ: ${response.status}. ${errorText}`);
        }
        const data = await response.json();
        // console.log('data=>');
        // console.info(data);
        // console.log('<?php echo $this->lang->line('t2_please_Update_successful');?>:', data);
        // ตรวจสอบ response จาก API (ปรับ `data.code === 200` หรือ `data.success` ตามโครงสร้างจริง)
        if (data.code === 200 || data.success === true) {
            Swal.fire(
                '<?php echo $this->lang->line('t2_please_Update_successful');?>!',
                data.message ||
                '<?php echo $this->lang->line('t2_please_User_status_ha_been_updated');?>', // ใช้ข้อความจาก API ถ้ามี
                'success'
            );
            // หากต้องการโหลดข้อมูลตารางใหม่หลังอัปเดตสำเร็จ (ไม่จำเป็นเสมอไป)
            // $('#example').DataTable().ajax.reload(null, false); // false เพื่อให้อยู่หน้าเดิม
            return true;
        } else {
            Swal.fire(
                '<?php echo $this->lang->line('t2_please_Update_failed');?>!',
                data.message ||
                '<?php echo $this->lang->line('t2_please_Unabletoupdatestatus');?>', // ใช้ข้อความจาก API ถ้ามี
                'error'
            );
            return false;
        }

    } catch (error) {
        Swal.close(); // ปิด loading indicator กรณีเกิดข้อผิดพลาด
        console.error('<?php echo $this->lang->line('t2_An_error_occurred_while_updating_the_status');?>:', error);
        Swal.fire(
            ' <?php echo $this->lang->line('t2_An_error_occurred');?>!',
            `<?php echo $this->lang->line('t2_The_status_could_not_be_updated');?>: ${error.message}`,
            'error'
        );
        return false;
    }
}


async function fetchData(page = 1, pageSize = 10, search = '') {
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUrl =
        `${baseApiUrl}users/list?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}`;
    var response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`, // เพิ่ม Authorization header [3][5]
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // console.log('fetchData=>');
    // console.info(data);
    return data;
}
// Helper function to render cell data, replacing empty values with '-'
const renderCellData = function(data, type, row, meta) {
    if (data === null || data === undefined || (typeof data === 'string' && data.trim() === '')) {
        return '-';
    }
    return data;
};
$(document).ready(function() {
    $('#example').DataTable({
        serverSide: true,
        processing: true,
        pageLength: 10,
        ajax: async function(data, callback, settings) {
            const page = Math.floor(data.start / data.length) + 1;
            const pageSize = data.length;
            const search = data.search.value;
            const apiData = await fetchData(page, pageSize, search);
            if (apiData && apiData.payload.data) {
                callback({
                    draw: data.draw,
                    recordsTotal: apiData.payload.total,
                    recordsFiltered: apiData.payload.total,
                    data: apiData.payload.data.map(row => [
                        row.username, // 0
                        row.email, // 1
                        row.firstname, // 2
                        row.lastname, // 3
                        row.loginfailed, // 4
                        row.active_status, // 5
                        row.createddate, // 6
                        row.uid // 7
                    ])
                });
            } else {
                // กรณีที่ fetchData คืนค่า null (เกิด Error) หรือไม่มีข้อมูล
                // ส่งข้อมูลว่างกลับไปให้ DataTables เพื่อหยุดการโหลด และแสดงข้อความ "ไม่พบข้อมูล"
                callback({
                    draw: data.draw,
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: []
                });
            }
        },
        columns: [{
                data: 0,
                title: "Username",
                render: renderCellData
            }, // แสดง '-' ถ้า Username ว่าง
            {
                data: 1,
                title: "Email",
                render: renderCellData
            }, // แสดง '-' ถ้า Email ว่าง
            {
                data: 2,
                title: "Firstname",
                render: renderCellData
            }, // แสดง '-' ถ้า Firstname ว่าง
            {
                data: 3,
                title: "Lastname",
                render: renderCellData
            }, // แสดง '-' ถ้า Lastname ว่าง
            {
                data: 4, // Index ของ loginfailed
                title: "Login Failed",
                className: "text-center", // จัดกึ่งกลาง
                render: function(data, type, row, meta) {
                    const loginFailedCount = parseInt(data, 10); // แปลงเป็นตัวเลข
                    if (type ===
                        'display') { // ใช้เงื่อนไขนี้เพื่อให้ render เฉพาะตอนแสดงผล
                        if (loginFailedCount >= 10) {
                            return '<span style="color: red; font-weight: bold;">User lock</span>';
                        } else {
                            return '<span style="color: green; font-weight: bold;">Ready</span>';
                        }
                    }
                    return data; // คืนค่าเดิมสำหรับการ sort, filter ฯลฯ
                }
            },
            {
                data: 5, // active_status
                title: "Status",
                className: "text-center", //จัดกึ่งกลางเนื้อหาใน cell
                orderable: true, // ให้สามารถเรียงลำดับตามสถานะได้
                searchable: false, // โดยทั่วไปไม่ค้นหาจาก switch โดยตรง
                render: function(data, type, row, meta) {
                    // data คือค่า active_status (row[5])
                    // row[7] คือ uid
                    const uid = row[7];
                    const isChecked = parseInt(data, 10) === 1 ? 'checked' : '';
                    // ใช้ Bootstrap 5 form-switch
                    return `
                        <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 p-0" style="height: 1.5rem;">
                            <input class="form-check-input status-switch" type="checkbox" role="switch" 
                                   id="switch-${uid}" data-uid="${uid}" ${isChecked} 
                                   aria-label="User status switch for ${row[0]}">
                        </div>`;
                }
            },
            {
                data: 6,
                title: "Created Date"
            },
            {
                data: 7, // uid
                title: 'Actions',
                className: 'dt-body-right dt-head-right', // จัดชิดขวา
                orderable: false,
                searchable: false,
                render: function(data_uid, type, row, meta) {
                    // data_uid คือ row[7]
                    return `
                        <div class="action-buttons">
                            <a href="<?php echo base_url('user/profiledetail');?>?uid=${data_uid}" class="btn btn-sm btn-info me-1" title="<?php echo $this->lang->line('c_detail');?>"><?php echo $this->lang->line('c_detail');?></a>
                            <a href="<?php echo base_url('user/profileupdate');?>?uid=${data_uid}" class="btn btn-sm btn-warning me-1" title="<?php echo $this->lang->line('c_edit');?>"><?php echo $this->lang->line('c_edit');?></a>
                            <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow('${data_uid}')" title="<?php echo $this->lang->line('c_delete');?>"><?php echo $this->lang->line('c_delete');?></a>
                        </div>
                    `;
                }
            }
        ],
        scrollX: true,
        responsive: true,
        // columnDefs: [] // ลบ columnDefs เดิมที่ซ้ำซ้อนกับ Actions column ออก หรือปรับปรุงตามความจำเป็น
        // หากมี columnDefs อื่นๆ ที่ไม่เกี่ยวข้องกับ Actions สามารถคงไว้ได้
    });

    // Event listener สำหรับ status switch (ใช้ event delegation)
    $('#example tbody').on('change', '.status-switch', async function() {
        const checkbox = $(this);
        const uid = checkbox.data('uid');
        const newStatus = checkbox.is(':checked') ? 1 : 0;

        // ปิดการใช้งาน checkbox ชั่วคราวเพื่อป้องกันการคลิกซ้ำ
        checkbox.prop('disabled', true);

        const success = await updateStatus(uid, newStatus);

        if (!success) {
            // หากการอัปเดตไม่สำเร็จ ให้เปลี่ยนสถานะ checkbox กลับไปเป็นเหมือนเดิม
            checkbox.prop('checked', !checkbox.is(':checked'));
        }
        // เปิดการใช้งาน checkbox อีกครั้ง
        checkbox.prop('disabled', false);
    });
});

// ฟังก์ชันลบ (คงเดิมจากไฟล์ต้นฉบับ)
function deleteRow(uid) {
    Swal.fire({
        title: '<?php echo $this->lang->line('c_confirm_data_deletion_information');?>',
        text: "<?php echo $this->lang->line('c_confirm_data_deletion_information');?>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '<?php echo $this->lang->line('c_delete');?>',
        cancelButtonText: '<?php echo $this->lang->line('c_cancel');?>'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`<?php echo $apiprofiledelete;?>?uid=${uid}`, {
                    method: 'GET' // หรือ 'DELETE' หาก API รองรับ
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        Swal.fire(
                            '<?php echo $this->lang->line('c_data_deleted');?>',
                            '<?php echo $this->lang->line('c_data_deleted_successfully');?>',
                            'success'
                        );
                        $('#example').DataTable().ajax.reload();
                    } else {
                        Swal.fire(
                            '<?php echo $this->lang->line('c_error_occurred');?>!',
                            data.message ||
                            '<?php echo $this->lang->line('c_not_be_deleted');?>',
                            'error'
                        );
                    }
                })
                .catch(() => {
                    Swal.fire(
                        '<?php echo $this->lang->line('c_error_occurred');?>!',
                        '<?php echo $this->lang->line('c_not_be_deleted');?>',
                        'error'
                    );
                });
        }
    });
}
</script>