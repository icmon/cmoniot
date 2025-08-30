<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=@$input['option'];
$api_url= base_url('user/api/apilistuserlogget').'?option='.$option.'&';
// http://localhost/user/api/apilistuserlogget?option=
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
<?php $this->load->view('user/pagewrapper_singinlog'); ?>
<div class="page-body">
    <?php  /*****body**********/  ?>
    <div class="card-body">
        <div class="card">
            <div class="table-responsive card-body p-0">
                <?php ############card#################?>
                <table id="example" class="table table-vcenter display responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Log name</th>
                            <th>Type name</th>
                            <th>Detail</th>
                            <th>Username</th>
                            <th>Date</th>
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
async function fetchData(page = 1, pageSize = 10, search = '') {
    // ปรับ URL ตาม API จริง
    const url = `<?php echo $api_url;?>page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(search)}`;
    // console.log('url=>' + url);
    const response = await fetch(url);
    // console.log('response=>');
    // console.info(response);
    const data = await response.json();
    // console.log('data.payload.data=>');
    // console.info(data.payload.data);
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
            const apiData1 = await fetchData(page, pageSize, search);
            const apiData = apiData1.payload;
            console.log('apiData=>');
            console.info(apiData);
            callback({
                draw: data.draw,
                recordsTotal: apiData.total,
                recordsFiltered: apiData.total,
                data: apiData.data.map(row => [
                    row.id,
                    row.log_name,
                    row.type_name,
                    row.detail,
                    row.username,
                    row.createddate
                ])
            });
        },
        columns: [{
                title: "ID"
            },
            {
                title: "Logname"
            },
            {
                title: "Type name"
            },
            {
                title: "Detail"
            },
            {
                title: "Username"
            },
            {
                title: "Date"
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
                        <a href="<?php echo base_url('user/log');?>/detail?id=${row[0]}" class="btn btn-sm btn-info me-1"><?php echo $this->lang->line('c_detail');?></a>
                         
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
</script>