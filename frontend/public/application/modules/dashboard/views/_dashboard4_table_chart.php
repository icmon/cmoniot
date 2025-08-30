<?php #################### ?>
<script type="text/javascript" src="<?php echo base_url('assets/sweetalert2/dist/js/jquery-latest.js');?>"></script>
<script src="<?php echo base_url('assets/sweetalert2/dist/sweetalert-dev.js');?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>">
<?php ####################
 $senser_count=4; // สมมติว่ามี 4 sensors ตามตัวอย่างโค้ดที่ให้มา
 $rem='58'; /**ปรับความสูง Card  50rem **/
 ?>

<?php /**Using Storage*/?>
<style>
/* CSS Styles (Existing CSS provided in search results - no changes here unless specifically requested for styling) */
.table th,
.table td {
    width: auto;
}

.table th:nth-child(1) {
    width: 15%;
}

/* LOCATION */
.table th:nth-child(2) {
    width: 15%;
}

/* NAME */
.table th:nth-child(3) {
    width: 10%;
}

/* DATA */
.table th:nth-child(4) {
    width: 8%;
}

/* ALARM */
.table th:nth-child(5) {
    width: 8%;
}

/* FAN 1 */
.table th:nth-child(6) {
    width: 8%;
}

/* FAN 2 */
.table th:nth-child(7) {
    width: 20%;
}

/* DATE */
.table th:nth-child(8) {
    width: 16%;
}

/* Progress Bar */
.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
}

.status-indicator-animated {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.progress-xs {
    height: 8px;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
}

.tooltip-custom {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #555;
    font-family: inherit;
    line-height: 1.4;
}

.tooltip-custom div {
    margin-bottom: 2px;
}

.tooltip-custom div:last-child {
    margin-bottom: 0;
}

.card-body-scrollable::-webkit-scrollbar {
    width: 8px;
}

.card-body-scrollable::-webkit-scrollbar-thumb {
    background: #34495e;
    border-radius: 4px;
}

.card-body-scrollable::-webkit-scrollbar-thumb {
    background: #888;
    /* สีของ thumb */
    border-radius: 4px;
}

.card-body-scrollable::-webkit-scrollbar-thumb:hover {
    background: #4a5f7a;
}

table {
    overflow: visible;
}

/* ปรับแต่ง scrollbar ให้สวยงาม */
.table-responsive::-webkit-scrollbar {
    height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* ซ่อน scrollbar ที่ซ้ำซ้อน */
.datatable {
    overflow: visible !important;
}

/* สำหรับ responsive */
@media (max-width: 992px) {
    .table-responsive {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch;
        /* สำหรับ iOS */
    }

    .card-body-scrollable {
        overflow-x: auto !important;
    }
}

/* แก้ไข Sticky Header */
.table {
    border-collapse: separate;
    border-spacing: 0;
    position: relative;
}

.table thead th {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}

/* แก้ไข overflow ใน parent elements */
.card-body-scrollable {
    overflow: visible !important;
    position: relative;
}

.table-responsive {
    overflow-x: auto !important;
    overflow-y: visible !important;
    position: relative;
}

/* เพิ่มใน style section */
.table {
    border-collapse: separate;
    border-spacing: 0;
    position: relative;
    width: 100%;
}

.table thead th {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
}
</style>
<div class="col-lg-5">
    <div class="row row-cards">
        <div class="col-12">
            <div class="card" style="height: 95rem">
                <div class="card-body" style="height: 100%; overflow-y: auto;">
                    <div class="table-responsive" style="height: 100%; overflow-x: auto;">
                        <table class="table table-selectable card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th style="width: 15%;">Location s</th>
                                    <th style="width: 15%;">Time</th>
                                    <th style="width: 10%;">Temperature</th>
                                    <th style="width: 8%;">FAN 1</th>
                                    <th style="width: 8%;"> <a href="#">Alarm 1</a></th>
                                    <th style="width: 8%;">FAN 2</th>
                                    <th style="width: 8%;"> <a href="#">Alarm 2</a></th>
                                    <th style="width: 16%;">Progress</th>
                                </tr>
                            </thead>
                            <tbody id="deviceTableBody">
                                <?php 
                                    // --- ส่วนของการดึงข้อมูลจาก API สำหรับสร้างการ์ด ---
                                    $token = $_SESSION['token'];
                                    $api_call = $this->config->item('api_url') . 'mqtt/fan';
                                    $rsapi = $this->Crul_model->call_api_with_token($api_call, $token);

                                    // ตรวจสอบ error จาก API call ก่อนดำเนินการต่อ
                                    if (!isset($rsapi['code']) || $rsapi['code'] != 200) {
                                        //echo '<tr><td colspan="8" class="text-center">Error: Could not retrieve initial data from API. Please check API endpoint or token.</td></tr>'; 
                                        // ไม่ใช้ die() เพื่อให้ส่วนอื่นของหน้าเว็บยังสามารถโหลดได้
                                    } else {
                                        $payload = $rsapi['payload'];
                                        $sensor_buckets = []; // เก็บ bucket names เพื่อใช้ใน JavaScript
                                        $i = 1; 
                                        foreach ($payload as $key => $value) {
                                            $mqtt_id = $value['mqtt_id'];
                                            $mqtt_name = $value['mqtt_name']; 
                                            $org = $value['org']; 
                                            $bucket = $value['bucket'];  
                                            $mqtt = $value['mqtt'];  
                                            $device = $value['device'];  
                                            // เก็บ bucket name ใน array เพื่อส่งไปให้ JavaScript
                                            $sensor_buckets[$i] = $bucket;
                                ?>
                                <tr id="row_<?php echo $i;?>">
                                    <td id="location_<?php echo $i;?>">
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket;?>">
                                            <?php echo $mqtt_name;?>
                                        </a>
                                    </td>
                                    <td id="name_<?php echo $i;?>">
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket;?>">
                                            <span id="date_time_<?php echo $i;?>">--</span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket;?>">
                                            <b id="temp_value_<?php echo $i;?>">-- °C</b>
                                        </a>
                                    </td>

                                    <td>
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket;?>">
                                            <span id="fan1_dot_<?php echo $i;?>"
                                                class="status-indicator status-green status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket;?>">
                                            <span id="alarm1_dot_<?php echo $i;?>"
                                                class="status-indicator status-red status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket;?>">
                                            <span id="fan2_dot_<?php echo $i;?>"
                                                class="status-indicator status-red status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="<?php echo base_url('dashboard/dashboard4').'?bucket='.$bucket;?>">
                                            <span id="alarm2_dot_<?php echo $i;?>"
                                                class="status-indicator status-red status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </a>
                                    </td>
                                    <td>
                                        <div id="chart_cmon_bg_<?php echo $i;?>"
                                            class="position-relative rounded-bottom chart-sm">
                                        </div>
                                    </td>
                                </tr>
                                <?php 
                                        $i++; // เพิ่มค่า $i หลังจากใช้งาน
                                        } 
                                    } // End of if ($rsapi['code'] != 200) else
                                  ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// กำหนด apiBaseUrl
const apiBaseUrl = '<?php echo $this->config->item('api_url'); ?>';

// ประกาศ sensor_buckets ที่ส่งมาจาก PHP
const sensorNames = <?php echo json_encode($sensor_buckets); ?>;

// ฟังก์ชันสำหรับดึงข้อมูลจาก API สำหรับ sensor เดียว
async function fetchSensorData(sensorIndex, bucketName) {
    try {
        const bucket = bucketName;
        const bearerToken = '<?php echo $_SESSION['token']; ?>';
        const apiUrl = `${apiBaseUrl}mqtt/mqttsenserchart?bucket=${bucket}`; // แก้ URL API ตามที่ควรจะเป็น

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // โยน Error หาก response ไม่สำเร็จ
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        // ตรวจสอบโครงสร้างของ result.mqtt ก่อนใช้งาน
        const data = result.mqtt; // `data` ควรมาจาก `result.mqtt`
        const chartInfo = result.chart;

        //console.log(`fetchSensorData for bucket ${bucketName} result:`, result);
        console.log(`data :`);
        console.info(data);

        if (result.code === 200 && data) { // ตรวจสอบว่า `data` มีอยู่จริง
            updateSensorRow(sensorIndex, data);
            updateChart(sensorIndex, result); // ส่ง `result` ทั้งหมด เพราะ `chart` อยู่ใน `result`
        } else {
            console.error(`API Error for ${bucketName}:`, result);
            // สามารถเพิ่ม SweetAlert2 เพื่อแจ้งผู้ใช้เกี่ยวกับข้อผิดพลาด API
        }
    } catch (error) {
        console.error(`Fetch Error for bucket ${bucketName}:`, error);
        // SweetAlert2 สำหรับแจ้งข้อผิดพลาดจากการ fetch
        // Swal.fire({
        //     title: "API IOT Issue fetching data!",
        //     html: `Error fetching data for ${bucketName}: <br> ${error.message}`,
        //     icon: "error",
        //     timer: 60000,
        //     timerProgressBar: true,
        // });
    }
}

// ฟังก์ชันสำหรับอัปเดตข้อมูลในแถว
function updateSensorRow(sensorIndex, data) {
    // console.log(`updateSensorRow data for sensor ${sensorIndex}:`, data); // เพื่อ debug

    // ตรวจสอบว่า property ที่จะใช้งานมีอยู่จริงใน data ก่อนนำไปใช้
    if (data.temperature !== undefined) {
        document.getElementById(`temp_value_${sensorIndex}`).textContent =
            `${data.temperature.toFixed(2)} °C`;
    } else {
        document.getElementById(`temp_value_${sensorIndex}`).textContent = `-- °C`;
    }

    // อัปเดตสถานะ Alarm 1
    const alarm1Dot = document.getElementById(`alarm1_dot_${sensorIndex}`);
    if (alarm1Dot && data.overFan1 !== undefined) {
        alarm1Dot.className =
            `status-indicator ${data.overFan1 ? 'status-green' : 'status-red'} status-indicator-animated`; // ปรับ logic ตามที่ต้องการ (ถ้า overFan1 เป็น true คือมีปัญหา ควรเป็นสีแดง)
    }

    // อัปเดตสถานะ Alarm 2
    const alarm2Dot = document.getElementById(`alarm2_dot_${sensorIndex}`);
    if (alarm2Dot && data.overFan2 !== undefined) {
        alarm2Dot.className =
            `status-indicator ${data.overFan2 ? 'status-green' : 'status-red'} status-indicator-animated`; // ปรับ logic ตามที่ต้องการ
    }

    // อัปเดตสถานะ FAN 1
    const fan1Dot = document.getElementById(`fan1_dot_${sensorIndex}`);
    if (fan1Dot && data.fan1 !== undefined) {
        fan1Dot.className =
            `status-indicator ${data.fan1 ? 'status-green' : 'status-red'} status-indicator-animated`; // ถ้า fan1 เป็น true คือทำงาน ควรเป็นสีเขียว
    }

    // อัปเดตสถานะ FAN 2
    const fan2Dot = document.getElementById(`fan2_dot_${sensorIndex}`);
    if (fan2Dot && data.fan2 !== undefined) {
        fan2Dot.className =
            `status-indicator ${data.fan2 ? 'status-green' : 'status-red'} status-indicator-animated`; // ถ้า fan2 เป็น true คือทำงาน ควรเป็นสีเขียว
    }

    // อัปเดตวันที่และเวลา
    if (data.timestamp !== undefined) {
        document.getElementById(`date_time_${sensorIndex}`).textContent = data.timestamp;
    } else {
        document.getElementById(`date_time_${sensorIndex}`).textContent = `--`;
    }
}

// ฟังก์ชันสำหรับอัปเดตกราฟ
function updateChart(sensorIndex, result) { // รับ `result` ทั้งหมด
    const chartId = `chart_cmon_bg_${sensorIndex}`;
    const data = result.mqtt; // ข้อมูลหลักจาก mqtt
    const chartData = result.chart; // ข้อมูลสำหรับ chart

    // ลบกราฟเก่าถ้ามี
    if (window.tabler_chart && window.tabler_chart[chartId]) {
        window.tabler_chart[chartId].destroy();
    }

    // สร้างกราฟใหม่
    if (window.ApexCharts && chartData && chartData.data && chartData.date) {
        window.tabler_chart = window.tabler_chart || {};
        window.tabler_chart[chartId] = new ApexCharts(document.getElementById(chartId), {
            chart: {
                type: "area",
                fontFamily: 'inherit',
                height: 40,
                sparkline: {
                    enabled: true
                },
                animations: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                colors: [
                    'color-mix(in srgb, transparent, var(--tblr-primary) 16%)',
                ],
                type: 'solid'
            },
            stroke: {
                width: 2,
                lineCap: "round",
                curve: "smooth",
            },
            series: [{
                name: "Temperature",
                data: chartData.data
            }], // ใช้ chartData.data
            tooltip: {
                enabled: true,
                theme: 'dark',
                custom: function({
                    series,
                    seriesIndex,
                    dataPointIndex,
                    w
                }) {
                    const temperature = series[seriesIndex][dataPointIndex];
                    const dateTime = chartData.date[dataPointIndex]; // ใช้ chartData.date
                    const formattedDate = dateTime ? dateTime.replace(':', ' ') : 'N/A';
                    const sensorName = sensorNames[sensorIndex] ||
                        'Unknown Sensor'; // ดึงจาก sensorNames array
                    return `
                          <div class="tooltip-custom" style="padding: 5px; background: #333; color: white; border-radius: 4px; font-size: 10px;">
                              <div><strong>Temperature:</strong> ${temperature !== undefined ? temperature.toFixed(2) : 'N/A'} °C</div>
                              <div><strong>Time:</strong> ${formattedDate}</div>
                              <div><strong>Sensor:</strong> ${sensorName}</div>
                          </div>
                      `;
                }
            },
            grid: {
                strokeDashArray: 4,
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    padding: 0,
                    formatter: function(value, timestamp) {
                        const date = new Date(timestamp);
                        return date.toLocaleDateString('th-TH', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }
                },
                tooltip: {
                    enabled: true,
                    formatter: function(val) {
                        const date = new Date(val);
                        return date.toLocaleString('th-TH', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
                    }
                },
                axisBorder: {
                    show: false,
                },
            },
            yaxis: {
                labels: {
                    padding: 4,
                    formatter: function(value) {
                        return value !== undefined ? value.toFixed(1) + ' °C' : 'N/A °C';
                    }
                },
                title: {
                    text: 'Temperature (°C)',
                    style: {
                        fontSize: '10px'
                    }
                }
            },
            labels: chartData.date.map(date => { // ใช้ chartData.date
                // แปลงวันที่ให้เป็น timestamp ที่ถูกต้อง
                const formattedDate = date ? date.replace(':', ' ') : '';
                return new Date(formattedDate).getTime();
            }).filter(timestamp => !isNaN(timestamp)), // กรองค่าที่ไม่ถูกต้อง
            colors: [
                'color-mix(in srgb, transparent, var(--tblr-primary) 100%)'
            ],
            legend: {
                show: false,
            },
        });
        window.tabler_chart[chartId].render();
    } else {
        console.warn(`Chart data is incomplete or missing for sensor ${sensorIndex}.`);
    }
}

// ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด sensors
async function fetchAllSensorsData() {
    // ใช้ Object.keys(sensorNames).length แทน $senser_count ใน PHP
    // เนื่องจาก $senser_count อาจไม่ได้สะท้อนจำนวน sensor จริงๆ ที่มาจาก API
    const numSensors = Object.keys(sensorNames).length;
    for (let i = 1; i <= numSensors; i++) {
        const bucketName = sensorNames[i];
        if (bucketName) { // ตรวจสอบว่า bucketName มีอยู่จริง
            await fetchSensorData(i, bucketName);
            // หน่วงเวลาเล็กน้อยระหว่างการเรียก API เพื่อไม่ให้ทำงานหนักเกินไป
            await new Promise(resolve => setTimeout(resolve, 300));
        } else {
            console.warn(`Bucket name not found for sensor index ${i}. Skipping fetch.`);
        }
    }
}

// เรียกใช้ฟังก์ชันทันทีเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', function() {
    fetchAllSensorsData();
});

// ตั้งค่าให้เรียก API ทุกๆ x วินาที
// ตรวจสอบให้แน่ใจว่า 'api_call_time' ถูกกำหนดใน config ของ CodeIgniter
const apiCallInterval =
    <?php  echo $this->config->item('api_call_time2'); ?>; // แปลงเป็นมิลลิวินาที, default 10 วินาที
setInterval(fetchAllSensorsData, apiCallInterval);
//console.log('API call interval set to: ' + (apiCallInterval / 1000) + ' seconds');
</script>