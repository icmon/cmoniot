<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=$input['option'];
$api_url= base_url('settings/apiget').'?option='.$option.'&';
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
<?php $this->load->view('pagewrapper'); ?>
<div class="card-body">
    <div class="card">
        <div class="table-responsive card-body p-0">
            <?php ############card#################?>
            <table id="example" class="table table-vcenter display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ชื่อสินค้า</th>
                        <th>หมวดหมู่</th>
                        <th>รายละเอียด</th>
                        <th>ราคา</th>
                        <th>วันที่สร้าง</th>
                    </tr>
                </thead>
            </table>

            <?php ###############card##############?>
        </div>
    </div>
</div>

<script>
async function fetchData(page = 1, pageSize = 10, search = '') {
    // ปรับ URL ตาม API จริง
    const url =
        `<?php echo $api_url;?>page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

$(document).ready(function() {
    // กำหนด DataTable แบบ server-side
    $('#example').DataTable({
        serverSide: true,
        processing: true,
        pageLength: 10, // ค่าเริ่มต้น
        ajax: async function(data, callback, settings) {
            // DataTables จะส่งข้อมูล page, length, search มาใน data
            const page = Math.floor(data.start / data.length) + 1;
            const pageSize = data.length;
            const search = data.search.value;
            const apiData = await fetchData(page, pageSize, search);
            callback({
                draw: data.draw,
                recordsTotal: apiData.total,
                recordsFiltered: apiData.total,
                data: apiData.payload.map(row => [
                    row.id,
                    row.title,
                    row.type_name,
                    row.description,
                    row.price,
                    row.createddate
                ])
            });
        },
        columns: [{
                title: "ID"
            },
            {
                title: "ชื่อสินค้า"
            },
            {
                title: "หมวดหมู่"
            },
            {
                title: "รายละเอียด"
            },
            {
                title: "ราคา"
            },
            {
                title: "วันที่สร้าง"
            }, {
                data: null,
                title: 'Actions',
                colors: [
                    'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
                    'color-mix(in srgb, transparent, var(--tblr-red) 80%)'
                ],
                legend: {
                    show: true
                },
                orderable: true,
                searchable: true,
                render: function(data, type, row, meta) {
                    // console.log('row=>' + row); // ดูค่าจริง
                    return `
                        <a href="<?php echo base_url('settings/schedule');?>/detail?id=${row[0]}" class="btn btn-sm btn-info me-1"><?php echo $this->lang->line('c_detail');?></a>
                        <a href="<?php echo base_url('settings/schedule');?>/edit?id=${row[0]}" class="btn btn-sm btn-warning me-1"><?php echo $this->lang->line('c_edit');?></a>
                        <a href="javascript:void(0);" class="btn btn-sm btn-danger" onclick="deleteRow(${row[0]})"><?php echo $this->lang->line('c_delete');?></a>
                    `;
                }
            }
        ],
        scrollX: true,
        responsive: true, // ... (options อื่นๆ เช่น ajax, columns)
        columnDefs: [{
            targets: -1, // คอลัมน์สุดท้าย (Actions)
            className: 'dt-body-right dt-head-right',
            render: function(data, type, row, meta) {
                if (row && row[0] !== undefined && row[0] !== null) {
                    return `<a href="detail?id=${row[0]}" class="btn btn-sm btn-info me-1">Detail</a>`;
                } else {
                    return `<span class="text-muted">No ID</span>`;
                }
            }
        }],
        // ... (options อื่นๆ)
    });
});
// ตัวอย่างฟังก์ชันลบ (คุณต้องเขียนเองให้เหมาะกับระบบ)
function deleteRow(id) {
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
            fetch(`<?php echo base_url('settings/schedule');?>/delete?id=${id}`, {
                    method: 'GET' // เปลี่ยนเป็น DELETE แทน GET
                })
                .then(res => res.json())
                .then(data => {
                    console.log('data=>'); // แก้ไข consol เป็น console
                    console.info(data); // แก้ไข consol เป็น console

                    // ตรวจสอบ response จาก API
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