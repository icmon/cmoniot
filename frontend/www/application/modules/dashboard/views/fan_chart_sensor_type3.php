<div class="col-lg-9">
    <div class="card">
        <div class="card-header border-0">
            <div class="card-title">Podium floor 7</div>
            <div class="ms-auto lh-1">
                <div class="dropdown">
                    <a class="dropdown-toggle text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">Last 7 days</a>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item active" href="#">Last 7 days</a>
                        <a class="dropdown-item" href="#">Last 30 days</a>
                        <a class="dropdown-item" href="#">Last 3 months</a>
                    </div>
                </div>

            </div>
        </div>
        <div class="position-relative">
            <?php #----chart--------#?>
            <div id="chart-task-data" class="position-relative"></div>
            <?php #----chart--------#?>
        </div>
        <?php #########################chart-active-users-top################################ ?>
        <div class="table-responsive mt-3">
            <?php   $this->load->view('dashboard/cardtable_data');  ?>
            <?php   #$this->load->view('dashboard/cardtable_data1');  ?>
        </div>
        <?php #########################chart-active-users-top################################ ?>
    </div>
</div>
<script>
document.addEventListener("DOMContentLoaded", function() {
    let chart = null;
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
    chart = new ApexCharts(document.getElementById('chart-task-data'), options);
    chart.render();
    async function fetchAndUpdateChart() {
        try {
            const response = await fetch('<?php echo base_url($this->config->item('api_iot_chart'));?>');
            const data = await response.json();
            const measurement = data.payload.measurement;
            const chartData = data.chart.data;
            // สมมติ data.chart.date เป็น array ของวันที่ในรูปแบบ 'YYYY-MM-DD HH:mm:ss'
            // แปลงเป็น timestamp หรือ ISO string
            const labels = data.chart.date.map(dt => new Date(dt).toISOString());

            // สร้าง array ของ object {x: datetime, y: value}
            const seriesData = labels.map((dt, idx) => ({
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
            console.error('Error fetching data:', error);
        }
    }
    fetchAndUpdateChart();
    setInterval(fetchAndUpdateChart, <?php echo $this->config->item('api_call_time');?>);
});
</script>
<script src="<?php echo base_url('assets');?>/js/chart.js" defer></script>
<script src="<?php echo base_url('assets');?>/js/chartjs-plugin-zoom.js" defer></script>
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