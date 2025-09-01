<?php 
    $input = @$this->input->post(); 
    if ($input == null) {
        $input = @$this->input->get();
    }
    $sensor_name = @$input['bucket'];
    $token = $_SESSION['token'];
    $deletecache = @$input['deletecache']; 
    $pageSize = @$input['pageSize']; 
    if ($pageSize == '') {
        $pageSize = 10;
    }
    $segment1 = $this->uri->segment(1);
    $segment2 = $this->uri->segment(2);
?>
<div class="nav-item dropdown d-none d-md-flex">
    <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications"
       data-bs-auto-close="outside" aria-expanded="false">
        <!-- Bell SVG icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1">
            <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
       <span id="notificationBadge" class="badge bg-red badge-notification badge-blink" style="display:none;"></span>
    </a>
    <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
        <div class="card">
            <div class="card-header d-flex">
                <span class="status-dot status-dot-animated bg-red d-block"></span> &nbsp;&nbsp;
                <h3 class="card-title">Notifications</h3>
            </div>
            <div class="list-group-Notifi list-group-Notifi-flush list-group-Notifi-hoverable">
                <div class="list-group-Notifi-item">
                    <div class="row align-items-center">                       
                        <div id="tableContainerNotifi" style="max-height: 400px; overflow-y: auto; width: 100%;">
                            <table class="table table-selectable card-table table-vcenter text-nowrap datatable table-vcenter"
                                   id="sensorTableNotifi">
                                <thead>
                                    <tr>
                                        <th width="30%"><a href="#">Location</a></th>
                                        <th width="20%">Name</th>
                                        <th width="20%"><a href="#">Data</a></th>
                                        <th width="30%">Date Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Notifications inserted here by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="scrollbar-info mt-2" style="padding: 0 1rem;">
                <small>
                    Total rows: <span id="totalRowsNotifi">0</span>, 
                    Visible rows: <span id="visibleRows">0</span>, 
                    Scroll: <span id="scrollPosition">0%</span>
                </small>
            </div>
        </div>
    </div>
</div>

<script>
let currentDataNotifi = [];
async function fetchNotificationsData() {
    try {
        const apiUrlNoti = '<?php echo $this->config->item('api_url').'settings/listdevicealarm?deletecache=';?><?php echo $deletecache; ?>';
        const bearerToken = '<?php echo $_SESSION['token'];?>';

        const response = await fetch(apiUrlNoti, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

        const data = await response.json();
        const tableBody = document.querySelector('#sensorTableNotifi tbody');
        const container = document.getElementById('tableContainerNotifi');

        const scrollTop = container ? container.scrollTop : 0;

        const badge = document.getElementById('notificationBadge');

        if (data && data.payload && data.payload.length > 0) {
            badge.style.display = 'inline-block'; // show badge
            // populate table rows ...
        } else {
            badge.style.display = 'none'; // hide badge
            // show no data message ...
        }

        tableBody.innerHTML = '';
        currentDataNotifi = [];

        if (data && data.payload && data.payload.length > 0) {
            data.payload.forEach(item => {
                const row = `<tr>
                    <td><a href="<?php echo base_url('settings/device/deviceactive').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}">${item.mqtt_name}</a></td>
                    <td><a href="<?php echo base_url('settings/alarm/logs').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}">${item.device_name}</a></td>
                    <td><a href="<?php echo base_url('settings/alarm/logs').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}">${item.sensor_data_name}</a></td>
                    <td><a href="<?php echo base_url('settings/alarm/logsemail').'?bucket=';?>${item.mqtt_bucket}&mqtt_id=${item.mqtt_id}">${item.timestamp}</a></td>
                </tr>`;
                tableBody.innerHTML += row;
                currentDataNotifi.push(item);
            });
            if (container) container.scrollTop = scrollTop;
            updateScrollbarInfoNotifi();
        } else {
            // ถ้าไม่มีข้อมูล ให้แสดง alert และข้อความในตาราง
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center">ไม่มีข้อมูลการแจ้งเตือน</td></tr>`;
            currentDataNotifi = [];
            if (container) container.scrollTop = 0;
            updateScrollbarInfoNotifi();
        }
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}

function updateScrollbarInfoNotifi() {
    const container = document.getElementById('tableContainerNotifi');
    if (!container) return;

    const totalRows = currentDataNotifi.length;
    const containerHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;

    const scrollPercent = scrollHeight > containerHeight
        ? Math.round((scrollTop / (scrollHeight - containerHeight)) * 100)
        : 0;

    const rowHeight = 45;
    const visibleRows = Math.min(Math.ceil(containerHeight / rowHeight), totalRows);

    document.getElementById('totalRowsNotifi').textContent = totalRows;
    document.getElementById('visibleRows').textContent = visibleRows;
    document.getElementById('scrollPosition').textContent = scrollPercent + '%';
}

document.getElementById('tableContainerNotifi')?.addEventListener('scroll', updateScrollbarInfoNotifi);

// Initial load
fetchNotificationsData();
// Refresh periodically, time in milliseconds from PHP config
setInterval(fetchNotificationsData, <?php echo $this->config->item('api_call_time_mqtt');?>);
</script>
