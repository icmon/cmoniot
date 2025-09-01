<script type="text/javascript" src="<?php echo base_url('assets/sweetalert2/dist/js/jquery-latest.js');?>"></script>
<script src="<?php echo base_url('assets/sweetalert2/dist/sweetalert-dev.js');?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>">
<style>
.chart-responsive {
    position: relative;
    width: 100%;
    min-height: 200px;
}

@media (max-width: 576px) {
    .chart-responsive {
        min-height: 150px;
    }
}

.chart-responsive {
    min-height: 300px;
}

@media (max-width: 576px) {
    .chart-responsive {
        min-height: 180px;
    }
}
</style>
<?php  
    $input = @$this->input->post();
    if ($input == null) { $input = @$this->input->get(); }
    $bucket=@$input['bucket'];
    $token =$_SESSION['token'];
    $deletecache=@$input['deletecache'];
    $segment1=$this->uri->segment(1);
    $segment2=$this->uri->segment(2);

    $ipi_call = $this->config->item('api_url').'mqtt?bucket='.$bucket.'&deletecache='.$deletecache;
    $rsapi = $this->Crul_model->call_api_with_token($ipi_call, $token);
    if ($rsapi['code'] != 200) { /* echo 'Error: Could not retrieve initial data from API.'; */ }
    $payload=$rsapi['payload'][0];
    $mqtt_name=$payload['mqtt_name'];
    $mqtt_bucket=$payload['device'][0]['mqtt_bucket'];
    $device_name=$payload['device'][0]['device_name'];
    $type_name=$payload['device'][0]['type_name'];
    $mqtt_id=$payload['device'][0]['mqtt_id'];
    $mqtt_data_value = $payload['device'][0]['mqtt_data_value'];
    $bucket =$mqtt_bucket;    
?>
<div class="col-lg-9">
    <div class="card">
        <div class="card-header border-0">
            <!-- เพิ่ม id ให้กับ card-title -->
            <div id="device-card-title" class="card-title">Loading data | กำลังโหลดข้อมูล...</div>
            <div class="ms-auto lh-1">
                <!-- ส่วนอื่นๆ ของคุณ -->
            </div>
        </div>
        <div class="position-relative">
            <?php #----chart--------#?>
            <div id="chart-task-data" class="position-relative"></div>
            <?php #----chart--------#?>
        </div>
        <div class="ms-auto lh-1">
        </div>
        <?php #########################chart-active-users-top################################ ?>
        <div class="table-responsive mt-3">
            <?php  $this->load->view('dashboard/cardtable_data'); ?> 
        </div>
        <?php #########################chart-active-users-top################################ ?>
    </div>
</div>
<script>
// --- Step 1: รับค่าที่จำเป็นจาก PHP ---
// ใช้ json_encode เพื่อความปลอดภัยในการส่งค่าสตริงมายัง JavaScript
var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
/**
 * ฟังก์ชันสำหรับดึงข้อมูลจาก API และอัปเดตหน้าเว็บ
 */
async function fetchDataAndUpdatePage() {
    try {
        // --- Step 2: ดึงค่า parameters จาก URL ของเบราว์เซอร์ ---
        // เช่น ถ้า URL คือ: yoursite.com/page?bucket=BAACTW01&deletecache=true
        var urlParams = new URLSearchParams(window.location.search);
        var bucket = '<?php echo $bucket;?>';
        var deletecache = urlParams.get('deletecache');
        if (!bucket) {
            // document.getElementById('device-card-title').textContent = 'เกิดข้อผิดพลาด: ไม่พบ Bucket';
            // console.error("Bucket parameter is missing from URL.");
            // return; // หยุดการทำงานถ้าไม่มี bucket
            // --- Step 3: สร้าง API URL ---
            var apiUrl = `${baseApiUrl}mqtt?deletecache=${deletecache || ''}`;
        } else {
            // --- Step 3: สร้าง API URL ---
            var apiUrl = `${baseApiUrl}mqtt?bucket=${bucket}&deletecache=${deletecache || ''}`;
        }
        // --- Step 4: เรียก API ด้วย fetch พร้อม Bearer Token ---
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

        // --- Step 5: แปลงข้อมูล response เป็น JSON ---
        var apiResponse = await response.json(); // เทียบเท่ากับตัวแปร $apirs ใน PHP

        // --- Step 6: ดึงข้อมูลที่ต้องการจาก payload ---
        var payload = apiResponse.payload[0];
        var mqtt_name = payload.mqtt_name;
        var device_name = payload.device[0].device_name;
        // สามารถดึงข้อมูลอื่นๆ เช่น mqtt_org, bucket ได้จากตัวแปร payload

        // --- Step 7: อัปเดตข้อมูลลงใน HTML ---
        var titleElement = document.getElementById('device-card-title');
        if (titleElement) {
            titleElement.textContent = `${mqtt_name} | ${device_name}`;
        }

    } catch (error) {
        console.error('Failed to fetch data from API:', error);
        var titleElement = document.getElementById('device-card-title');
        if (titleElement) {
            titleElement.textContent = 'Unable to load data. | ไม่สามารถโหลดข้อมูลได้';
        }
        //    // handle error
        //    // alert('API IOT Error fetching data');
        //     console.error('Error fetching data:', error);
        //     // swal({
        //     //     title: "API IOT Error fetching data",
        //     //     text: '' + error + '',
        //     //     timer: 1000,
        //     //     showConfirmButton: false
        //     // });
        //     var bucket= '<?php echo $bucket; ?>';
        //     let timerInterval;
        //     Swal.fire({
        //         title: "IoT connectivity issues! "+bucket,
        //         html: "IoT Failure Checker <b></b> to check the device | การเชื่อมต่อ IoT ขัดข้อง กรุณาตรวจสอบ การเชื่มต่อ อุปปกรณ์",
        //         timer: 10000,
        //         timerProgressBar: true,
        //         didOpen: () => {
        //             Swal.showLoading();
        //             var timer = Swal.getPopup().querySelector("b");
        //             timerInterval = setInterval(() => {
        //                 timer.textContent = `${Swal.getTimerLeft()}`;
        //             }, 6000);
        //         },
        //         willClose: () => {
        //             clearInterval(timerInterval);
        //         }
        //     }).then((result) => {
        //         /* Read more about handling dismissals below */
        //         if (result.dismiss === Swal.DismissReason.timer) {
        //             console.log(
        //                 "IoT Failure Checker <b></b> to check the device | การเชื่อมต่อ IoT ขัดข้อง กรุณาตรวจสอบ การเชื่มต่อ อุปปกรณ์");
        //         }
        //     });
        //     console.log('redirect===>' + redirect);

    }
}
// สั่งให้ฟังก์ชันทำงานทันทีที่หน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', fetchDataAndUpdatePage);
</script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    let chart = null;
    var options = {
        chart: {
            type: "area",
            fontFamily: 'inherit',
            height: 200, // <--- ปรับตรงนี้
            parentHeightOffset: 20,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true
            },
            stacked: true,
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            colors: [
                'color-mix(in srgb, transparent, var(--tblr-primary) 10%)',
                'color-mix(in srgb, transparent, var(--tblr-primary) 10%)',
            ],
            type: 'solid'
        },
        stroke: {
            width: 2,
            lineCap: "round",
            curve: "smooth",
        },
        series: [{
            name: "",
            data: []
        }],
        tooltip: {
            theme: 'dark',
            x: {
                // format: 'dd MMM yyyy HH:mm:ss'
                // format: 'dd-MM-yyyy HH:mm:ss'
                format: 'yyyy-MM-dd HH:mm:ss',
            }
        },
        grid: {
            padding: {
                top: -20,
                right: 0,
                left: -4,
                bottom: -4
            },
            strokeDashArray: 4,
        },
        xaxis: {
            type: 'datetime', // เปลี่ยนจาก 'category' เป็น 'datetime'
            labels: {
                datetimeUTC: false,
                // format: 'dd MMM HH:mm:ss',
                // format: 'yyyy-MM-dd HH:mm:ss',
                 format: 'HH:mm:ss',
                // formatter: undefined // ให้ ApexCharts จัดการเอง
            },
            tooltip: {
                enabled: true
            },
            axisBorder: {
                show: true
            },
        },
        yaxis: {
            labels: {
                padding: 4,
                formatter: function(val) {
                    return val + " °C"
                }
            }
        },
        legend: {
            show: true
        },
        colors: [
            'color-mix(in srgb, transparent, var(--tblr-primary) 95%)',
            'color-mix(in srgb, transparent, var(--tblr-red) 95%)'
        ]
    };
    chart = new ApexCharts(document.getElementById('chart-task-data'), options);
    chart.render();
    async function fetchAndUpdateChart() {
        var redirect = '<?php echo base_url('error500');?>';
        try {
            var apiUrl =
                '<?php echo $this->config->item('api_url').'mqtt/sensercharts?bucket=';?><?php echo $bucket; ?>';
            var bearerToken = '<?php echo $_SESSION['token'];?>';
            // --- MODIFICATION START ---
            var response = await fetch(apiUrl, {
                method: 'GET', // It's good practice to be explicit, though GET is the default
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });
            // --- MODIFICATION END ---
            var data = await response.json();
            // console.log("apiUrl=>" + apiUrl);
            // console.log("bearerToken=>" + bearerToken);
            // console.log("data=>");
            // console.info(data);
            var measurement = data.payload.measurement;
            var chartData = data.chart.data;
            // สมมติ data.chart.date เป็น array ของวันที่ในรูปแบบ 'YYYY-MM-DD HH:mm:ss'
            // แปลงเป็น timestamp หรือ ISO string
            var labels = data.chart.date.map(dt => new Date(dt).toISOString());

            // สร้าง array ของ object {x: datetime, y: value}
            var seriesData = labels.map((dt, idx) => ({
                x: dt,
                y: chartData[idx]
            }));

            chart.updateOptions({
                series: [{
                    name: measurement,
                    data: seriesData
                }]
            });
        } catch (error) {
            // alert('API IOT Error fetching data');
            console.error('Error fetching data:', error);
            // swal({
            //     title: "API IOT Error fetching data",
            //     text: '' + error + '',
            //     timer: 1000,
            //     showConfirmButton: false
            // });
            let timerInterval;
            // Swal.fire({
            //     title: "API IOT Issue fetching data!",
            //     html: "I will close in <b></b> milliseconds | ระเชื่อมต่อ IoT ขัดข้อง กำลังพยาม ตรวจสอบ",
            //     timer: 10000,
            //     timerProgressBar: true,
            //     didOpen: () => {
            //         Swal.showLoading();
            //         var timer = Swal.getPopup().querySelector("b");
            //         timerInterval = setInterval(() => {
            //             timer.textContent = `${Swal.getTimerLeft()}`;
            //         }, 100);
            //     },
            //     willClose: () => {
            //         clearInterval(timerInterval);
            //     }
            // }).then((result) => {
            //     /* Read more about handling dismissals below */
            //     if (result.dismiss === Swal.DismissReason.timer) {
            //         console.log(
            //             "I was closed by the timer .ระเชื่อมต่อ IoT ขัดข้อง กำลังพยาม ตรวจสอบ");
            //     }
            // });
            //console.log('redirect===>' + redirect);

        }
    }
    fetchAndUpdateChart();
    setInterval(fetchAndUpdateChart, <?php echo $this->config->item('api_call_time');?>);
});
</script>

<script src="<?php echo base_url('assets');?>/js/chart.js" defer></script>
<script src="<?php echo base_url('assets');?>/js/chartjs-plugin-zoom.js" defer></script>