<div class="col-lg-9">
    <div class="card">
        <div class="card-header border-0">
            <div class="card-title">Podium floor 7</div>
        </div>
        <div class="position-relative">

            <?php #----chart--------#?>

            <!--  -->
            <?php #----chart--------#?>

            <div id="chart-task-data" class="position-relative"></div>
            <?php #----chart--------#?>

        </div>

        <?php #########################chart-active-users-top################################ ?>
        <div class="table-responsive mt-3">
            <?php   $this->load->view('dashboard/cardtable_data');  ?>
        </div>
        <?php #########################chart-active-users-top################################ ?>
    </div>
</div>




<script>
document.addEventListener("DOMContentLoaded", function() {
    let chart = null;

    // สร้างกราฟเปล่า
    const options = {
        chart: {
            type: "area",
            fontFamily: 'inherit',
            height: 200,
            parentHeightOffset: 0,
            toolbar: {
                show: false
            },
            animations: {
                enabled: false
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
            theme: 'dark'
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
            categories: [],
            labels: {
                padding: 0,
                formatter: function(val) {
                    return val + " ° C"
                }
            },
            tooltip: {
                enabled: false
            },
            axisBorder: {
                show: false
            },
            type: 'category', // ใช้ 'category' สำหรับข้อมูลที่ไม่ใช่ timestamp
        },
        yaxis: {
            labels: {
                padding: 4,
                formatter: function(val) {
                    return val + " ° C"
                }
            }
        },
        legend: {
            show: false
        },
        colors: [
            'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
            'color-mix(in srgb, transparent, var(--tblr-red) 100%)'
        ]
    };

    chart = new ApexCharts(document.getElementById('chart-task-data'), options);
    chart.render();
    // ฟังก์ชันดึงข้อมูลและอัปเดตกราฟ
    async function fetchAndUpdateChart() {
        try {

            const response = await fetch('<?php echo base_url($this->config->item('api_iot_chart'));?>');
            const data = await response.json();
            // console.log('data=>');
            // console.info(data);

            const measurement = data.payload.measurement;
            const chartData = data.chart.data;
            const chartLabels1 = data.chart.date.map(dt => {
                // แสดงเฉพาะเวลา HH:mm :ss
                const t = dt.split(':');
                return t[1] + ':' + t[2] + ':' + t[3];
            });
            const chartLabels = data.chart.date.map(dt => {
                // แสดงเฉพาะเวลา HH:mm :ss
                const t = dt.split(':');
                return t[1] + ':' + t[2] + ':' + t[3];
            });
            const labels = chartLabels;
            const values = chartData; // + "°C";

            // console.log('measurement=>');
            // console.info(measurement);
            // console.log('labels=>');
            // console.info(labels);
            // console.log('values=>');
            // console.info(values);

            chart.updateOptions({
                xaxis: {
                    categories: labels,
                    formatter: function(val) {
                        return val + "° C";
                    }
                },
                series: [{
                    name: measurement, // + ' ' + chartLabels1,
                    data: values
                }]
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // ดึงข้อมูลครั้งแรก
    fetchAndUpdateChart();
    // อัปเดตทุก 10 วินาที
    setInterval(fetchAndUpdateChart, <?php echo $this->config->item('api_call_time');?>);
});
</script>
<script src="<?php echo base_url('assets');?>/js/chart.js" defer></script>
<script src="<?php echo base_url('assets');?>/js/chartjs-plugin-zoom.js" defer></script>
<!-- https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/ -->

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
</style>