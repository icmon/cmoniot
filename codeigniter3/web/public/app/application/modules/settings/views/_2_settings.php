<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=@$input['option'];
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
<!-- ส่วนของ CSS สามารถใช้ Tabler หรือ Bootstrap 5 + Custom CSS สำหรับ Dark Mode -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body {
    background: #222;
    color: #fff;
}

.table thead {
    background: #222;
    color: #fff;
}

.btn-primary {
    background: #206bc4;
    border: none;
}

.btn-warning {
    background: #f76707;
    border: none;
    color: #fff;
}

.btn-danger {
    background: #d63939;
    border: none;
}

.btn-success {
    background: #2fb344;
    border: none;
}

.form-control,
.form-select {
    background: #222;
    color: #fff;
    border: 1px solid #444;
}

.pagination .page-item.active .page-link {
    background: #206bc4;
    border: none;
}

.pagination .page-link {
    background: #222;
    color: #fff;
    border: 1px solid #444;
}

/* ปรับพื้นหลัง Pagination และ Dropdown ให้เป็นสีเข้ม */
.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_paginate,
.dataTables_wrapper .dataTables_filter,
.dataTables_wrapper .dataTables_info {
    background: #1c2536 !important;
    /* สีเข้มแบบในภาพ */
    color: #fff !important;
    border: none;
}

/* ปรับปุ่ม active ของ Pagination */
.dataTables_wrapper .dataTables_paginate .paginate_button.current,
.dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
    background: #22c55e !important;
    /* สีเขียว */
    color: #fff !important;
    border-radius: 4px;
    border: none;
}

/* ปรับปุ่ม Pagination อื่น ๆ */
.dataTables_wrapper .dataTables_paginate .paginate_button {
    background: transparent !important;
    color: #fff !important;
    border: none;
}

/* หัวตาราง */
table.dataTable thead th,
.table thead th {
    background-color: #232e3c !important;
    color: #bfc9d4 !important;
    border-bottom: 1px solid #334155;
    text-align: center;
    font-weight: 600;
}

/* Dropdown (select) */
.dataTables_wrapper select,
.dataTables_length select,
.dataTables_paginate select {
    background-color: #232e3c !important;
    color: #bfc9d4 !important;
    border: 1px solid #334155 !important;
}

/* กล่องค้นหา */
.dataTables_filter input[type="search"] {
    background-color: #232e3c !important;
    color: #bfc9d4 !important;
    border: 1px solid #334155 !important;
}

/* Pagination */
.dataTables_wrapper .dataTables_paginate .paginate_button {
    background: transparent !important;
    color: #bfc9d4 !important;
    border: none !important;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current,
.dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
    background: #22c55e !important;
    color: #fff !important;
    border-radius: 4px;
}

/* ปรับ label */
.dataTables_wrapper .dataTables_length label,
.dataTables_wrapper .dataTables_filter label {
    color: #bfc9d4 !important;
}
</style>

<div class="container-xl mt-4">
    <div class="card bg-dark text-white">
        <div class="card-header d-flex justify-content-between align-items-center">
            <button class="btn btn-success" id="create-new">+ Create new</button>
            <div>
                <label for="search-input" class="form-label mb-0 me-2">Search:</label>
                <input type="text" id="search-input" class="form-control d-inline-block" style="width:200px;">
            </div>
        </div>
        <div class="card-body">
            <table class="table table-vcenter table-striped" id="datatable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ชื่อ</th>
                        <th>หมวดหมู่</th>
                        <th>รายละเอียด</th>
                        <th>ราคา</th>
                        <th>วันที่สร้าง</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data will be inserted here -->
                </tbody>
            </table>
            <nav>
                <ul class="pagination justify-content-end" id="pagination">
                    <!-- Pagination will be inserted here -->
                </ul>
            </nav>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#datatable tbody');
    const searchInput = document.getElementById('search-input');
    const pagination = document.getElementById('pagination');
    let currentPage = 1;
    let pageSize = 10;
    let totalPages = 1;
    let keyword = '';

    async function fetchData(page = 1, pageSize = 10, keyword = '') {
        const url =
            `http://localhost/settings/apiget?option=&page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`;
        const res = await fetch(url);
        const data = await res.json();
        totalPages = data.totalPages || 1;
        return data.payload;
    }

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(row => {
            tableBody.innerHTML += `
        <tr>
          <td>${row.id}</td>
          <td>${row.title}</td>
          <td>${row.type_name}</td>
          <td>${row.description}</td>
          <td>${row.price}</td>
          <td>${row.createddate}</td>
          <td>
            <button class="btn btn-primary btn-sm">Detail</button>
            <button class="btn btn-warning btn-sm">Edit</button>
            <button class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      `;
        });
    }

    function renderPagination() {
        let html = '';
        html += `<li class="page-item${currentPage === 1 ? ' disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage - 1}">&laquo;</a>
    </li>`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<li class="page-item${i === currentPage ? ' active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>`;
        }
        html += `<li class="page-item${currentPage === totalPages ? ' disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage + 1}">&raquo;</a>
    </li>`;
        pagination.innerHTML = html;
    }

    async function loadTable() {
        const data = await fetchData(currentPage, pageSize, keyword);
        renderTable(data);
        renderPagination();
    }

    searchInput.addEventListener('input', function() {
        keyword = this.value;
        currentPage = 1;
        loadTable();
    });

    pagination.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = parseInt(e.target.getAttribute('data-page'));
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                loadTable();
            }
        }
    });

    loadTable();
});
</script>