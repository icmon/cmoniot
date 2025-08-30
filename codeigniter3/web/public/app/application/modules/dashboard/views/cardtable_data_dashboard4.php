<?php 
    $input=@$this->input->post(); 
    if($input==null){$input=@$this->input->get();}
    $sensor_name=@@$input['bucket'];
    $token=$_SESSION['token'];
    $deletecache=@@$input['deletecache']; 
    $pageSize=@@$input['pageSize']; 
    if($pageSize==''){$pageSize=10;}
    $segment1 = $this->uri->segment(1);
    $segment2 = $this->uri->segment(2);
    $token = $_SESSION['token'];
    $api_call = $this->config->item('api_url') . 'mqtt/fan';
?>
<style>
/* CSS สำหรับ Custom Scrollbar */
.table-container {
    /* max-height: 320px; */
    max-height: 95%;
    /* กำหนดความสูงสูงสุด */
    overflow-y: auto;
    /* เปิดใช้งาน scrollbar แนวตั้ง */

    border-radius: 0.375rem;
}

.table thead th {
    position: sticky;
    top: 0;
}

thead tr:first-child th {
    position: sticky;
    top: 0;
}

.table-container {
    /* height: 180px; */
    /* แสดง 4 แถว (4 x 45px) */
     height: 99%;
    overflow-y: auto;
    border-radius: 0.375rem;
}
</style>

<div class="table-responsive">
    <div class="table-container" id="tableContainer">
        <table class="table table-selectable card-table table-vcenter text-nowrap datatable table-vcenter"
            id="sensorTable">
            <thead>
                <tr>
                    <!-- <th width="10%">NO</th> -->
                    <th width="30%"><a href="#"> Location </a></th>
                    <th width="20%">Name</th>
                    <th width="20%"><a href="#"> Data </a></th>
                    <th width="30%">Date Time</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be inserted here -->
            </tbody>
        </table>
    </div>
</div>

<!-- Scrollbar Info Display -->
<div class="scrollbar-info mt-2">
    <!-- <small class="text-muted">
        แสดง: <span id="visibleRows">0</span> จาก <span id="totalRows">0</span> รายการ
        | ตำแหน่ง: <span id="scrollPosition">0%</span>
    </small> -->
    <small class="text-muted">
        Display: <span id="visibleRows">0</span> From <span id="totalRows">0</span> Rows | Rank: <span id="scrollPosition">0%</span>
    </small>
</div>

<script>
// $config['api_iot_getsenserlistdata2']='api/iot/getsenserlistdata2?bucket=';
let currentData = [];
async function fetchTableSensorData() {
    try {
        // var apiUrl =
        //     '<?php #echo $this->config->item('api_url').'settings/listdevicealarmlimit?pageSize='.$pageSize.'&deletecache=';?><?php #echo $deletecache; ?>';
        var apiUrl =
            '<?php echo $this->config->item('api_url').'settings/listdevicealarm?deletecache=';?><?php echo $deletecache; ?>';
        var bearerToken = '<?php echo $_SESSION['token'];?>';

        var response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`, // เพิ่ม Authorization header [3][5]
                'Content-Type': 'application/json'
            }
        });
        // ตรวจสอบว่า request สำเร็จหรือไม่
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const tableBody = document.querySelector('#sensorTable tbody');
        const tableContainer = document.getElementById('tableContainer');

        // เก็บตำแหน่ง scroll ปัจจุบัน
        const currentScrollTop = tableContainer.scrollTop;

        tableBody.innerHTML = '';
        currentData = [];

        if (data && data.payload) {
            data.payload.forEach((item, idx) => {
                const row = `<tr>   
                                    <td> <a href="<?php echo base_url('settings/device/deviceactive').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}"> ${item.mqtt_name}</a> </td>
                                    <td><a href="<?php echo base_url('settings/alarm/logs').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}"> ${item.device_name}</a> </td>
                                    <td> <a href="<?php echo base_url('settings/alarm/logs').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}"> ${item.sensor_data_name}  </a> </td>
                                     <td><a href="<?php echo base_url('settings/alarm/logsemail').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}"> ${item.timestamp}</a> </td>
                                </tr>`;
                tableBody.innerHTML += row;
                currentData.push(item);
            });

            // คืนค่าตำแหน่ง scroll
            tableContainer.scrollTop = currentScrollTop;

            // อัพเดทข้อมูล scrollbar
            updateScrollbarInfo();
        }
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}

// ฟังก์ชันสำหรับอัพเดทข้อมูล scrollbar
function updateScrollbarInfo() {
    const tableContainer = document.getElementById('tableContainer');
    const totalRows = currentData.length;
    const containerHeight = tableContainer.clientHeight;
    const scrollHeight = tableContainer.scrollHeight;
    const scrollTop = tableContainer.scrollTop;

    // คำนวณเปอร์เซ็นต์การ scroll
    const scrollPercentage = scrollHeight > containerHeight ?
        Math.round((scrollTop / (scrollHeight - containerHeight)) * 100) : 0;

    // คำนวณจำนวนแถวที่มองเห็น (ประมาณ)
    const rowHeight = 45; // ประมาณความสูงของแต่ละแถว
    const visibleRows = Math.min(Math.ceil(containerHeight / rowHeight), totalRows);

    // อัพเดท UI
    document.getElementById('totalRows').textContent = totalRows;
    document.getElementById('visibleRows').textContent = visibleRows;
    document.getElementById('scrollPosition').textContent = scrollPercentage + '%';
}

// เพิ่ม Event Listener สำหรับ scroll
document.getElementById('tableContainer').addEventListener('scroll', function() {
    updateScrollbarInfo();
});

// ฟังก์ชันสำหรับ scroll ไปยังตำแหน่งที่กำหนด
function scrollToPosition(percentage) {
    const tableContainer = document.getElementById('tableContainer');
    const maxScroll = tableContainer.scrollHeight - tableContainer.clientHeight;
    const targetScroll = (percentage / 100) * maxScroll;

    tableContainer.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
}

// ฟังก์ชันสำหรับ scroll ไปยังแถวที่กำหนด
function scrollToRow(rowIndex) {
    const tableContainer = document.getElementById('tableContainer');
    const rowHeight = 10;
    const targetScroll = rowIndex * rowHeight;

    tableContainer.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
}
// เพิ่มปุ่มควบคุม scroll (ถ้าต้องการ)
function addScrollControls() {
    const controlsHtml = `
        <div class="scroll-controls mt-2">
            <button class="btn btn-sm btn-outline-primary" onclick="scrollToPosition(0)">
                <i class="fas fa-angle-double-up"></i> ด้านบน
            </button>
            <button class="btn btn-sm btn-outline-primary" onclick="scrollToPosition(50)">
                <i class="fas fa-minus"></i> กลาง
            </button>
            <button class="btn btn-sm btn-outline-primary" onclick="scrollToPosition(100)">
                <i class="fas fa-angle-double-down"></i> ด้านล่าง
            </button>
        </div>
    `;
    document.querySelector('.scrollbar-info').insertAdjacentHTML('afterend', controlsHtml);
}
// ดึงข้อมูลครั้งแรก
fetchTableSensorData();
// ดึงข้อมูลทุก 10 วินาที
setInterval(fetchTableSensorData, <?php echo $this->config->item('api_call_time_mqtt');?>);
</script>