<?php ####################### ?>
<?php ####################### ?>
<?php ####################### ?>
<?php #----chart_task_data--------#?>
<div id="chart_task_data" class="position-relative rounded-bottom chart-sm"></div>
<script>
// --- Step 1: รับค่าที่จำเป็นจาก PHP ---
// ใช้ json_encode เพื่อความปลอดภัยในการส่งค่าสตริงมายัง JavaScript
var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
let tempChart_<?php echo $m;?>;
document.addEventListener("DOMContentLoaded", function() {
    let chart = null;
    var options = {
        chart: {
            type: "area",
            fontFamily: 'inherit',
            height: 150,
            parentHeightOffset: 0,
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
                'color-mix(in srgb, transparent, var(--tblr-primary) 16%)',
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
            name: "",
            data: []
        }],
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd MMM yyyy HH:mm :ss'
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
                format: 'dd MMM HH:mm :ss',
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
            'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
            'color-mix(in srgb, transparent, var(--tblr-red) 80%)'
        ]
    };
    chart = new ApexCharts(document.getElementById('chart_task_data'), options);
    chart.render();
    async function fetchAndUpdateChart() {
        var redirect = '<?php echo base_url('error500');?>';
        try {
            // api_url  /v1/mqtt/sensercharts?bucket=BAACTW02
            ///v1/mqtt/sensercharts?bucket=BAACTW05
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
            var bucket ='<?php echo $bucket; ?>';
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
            //         }, 6000);
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
            // console.log('redirect===>' + redirect);
           // handle error
           // alert('API IOT Error fetching data');
            console.error('Error fetching data:', error);
            // swal({
            //     title: "API IOT Error fetching data",
            //     text: '' + error + '',
            //     timer: 1000,
            //     showConfirmButton: false
            // });
            let timerInterval;
            Swal.fire({
                title: "IoT connectivity issues! "+bucket,
                html: "IoT Failure Checker <b></b> to check the device | การเชื่อมต่อ IoT ขัดข้อง กรุณาตรวจสอบ การเชื่มต่อ อุปปกรณ์",
                timer: 10000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    var timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 6000);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log(
                        "IoT Failure Checker <b></b> to check the device | การเชื่อมต่อ IoT ขัดข้อง กรุณาตรวจสอบ การเชื่มต่อ อุปปกรณ์");
                }
            });
            console.log('redirect===>' + redirect);

        }
    }
    fetchAndUpdateChart();
    setInterval(fetchAndUpdateChart, <?php  echo $this->config->item('api_call_time'); ?>);
});
</script>
<?php #----chart_task_data--------#?>
<?php ####################### ?>
<?php ####################### ?>
<?php ####################### ?>