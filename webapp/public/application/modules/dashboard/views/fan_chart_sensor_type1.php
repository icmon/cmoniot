<div class="col-lg-9">
    <div class="card">
        <div class="card-header border-0">
            <div class="card-title">Podium floor 7</div>
        </div>
        <div class="position-relative">

            <?php #----chart--------#?>

            <div class="chart-responsive position-relative">
                <canvas id="iotChart" height="60"></canvas>
            </div>
            <?php #----chart--------#?>
        </div>

        <?php #########################chart-active-users-top################################ ?>
        <div class="table-responsive mt-3">
            <?php   $this->load->view('dashboard/cardtable_data');  ?>
        </div>
        <?php #########################chart-active-users-top################################ ?>
    </div>
</div>


<script src="<?php echo base_url('assets');?>/js/chart.js" defer></script>
<script src="<?php echo base_url('assets');?>/js/chartjs-plugin-zoom.js" defer></script>
<!-- https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/ -->
<script>
const ctx = document.getElementById('iotChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        /* ... */
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        // ...options อื่น ๆ
    }
});
</script>
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

<script>
let iotChart = null;

function fetchAndUpdateChart() {
    fetch('<?php echo base_url($this->config->item('api_iot_chart'));?>')
        .then(res => res.json())
        .then(data => {
            console.log("data=>");
            console.info(data);
            const measurement = data.payload.measurement;
            const chartData = data.chart.data;
            const chartLabels = data.chart.date.map(dt => {
                // แสดงเฉพาะเวลา HH:mm :ss
                const t = dt.split(':');
                return t[1] + ':' + t[2] + ':' + t[3];
            });

            // ตัวอย่างข้อมูลเส้นที่ 2 (mock) เพื่อให้เหมือนภาพตัวอย่าง
            // คุณสามารถเปลี่ยนเป็นข้อมูลจริงจาก API ได้
            const chartData2 = chartData.map(v => v - 400 + Math.floor(Math.random() * 20 - 10));

            const ctx = document.getElementById('iotChart').getContext('2d');
            if (!iotChart) {
                iotChart = new Chart(ctx, {
                    type: 'line',
                    fontFamily: 'inherit',
                    height: 120,
                    sparkline: {
                        enabled: true
                    },
                    animations: {
                        enabled: false
                    },
                    data: {
                        labels: chartLabels,
                        datasets: [{
                                label: measurement,
                                data: chartData,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                fill: true,
                                tension: 0.35,
                                pointRadius: 0, // <<<<<< ไม่แสดงจุดบนเส้น
                                pointHoverRadius: 15, // (ถ้าต้องการให้ hover แล้วเห็นจุด)
                                borderWidth: 2,
                            },
                            {
                                label: 'Date',
                                data: chartData2,
                                borderColor: 'rgba(139, 0, 0, 1)',
                                backgroundColor: 'rgba(139, 0, 0, 0.1)',
                                fill: true,
                                tension: 0.35,
                                pointRadius: 0, // <<<<<< ไม่แสดงจุดบนเส้น
                                pointHoverRadius: 15, // (ถ้าต้องการให้ hover แล้วเห็นจุด)
                                borderWidth: 2,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            },
                            plotOptions: {
                                radialBar: {
                                    hollow: {
                                        margin: 0,
                                        size: '60%'
                                    },
                                    track: {
                                        margin: 0
                                    },
                                    dataLabels: {
                                        show: false
                                    }
                                }
                            },
                            colors: [
                                'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
                                'color-mix(in srgb, transparent, var(--tblr-gray-400) 100%)'
                            ],
                            legend: {
                                show: false,
                            },
                            tooltip: {
                                backgroundColor: 'rgba(255,255,255,0.92)',
                                titleColor: '#23263a',
                                bodyColor: '#23263a',
                                borderColor: '#ddd',
                                borderWidth: 1,
                                padding: 5,
                                displayColors: false
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#bbb'
                                },
                                grid: {
                                    color: '#333'
                                }
                            },
                            y: {
                                min: 0,
                                max: 95,
                                ticks: {
                                    color: '#bbb'
                                },
                                grid: {
                                    color: '#333'
                                }
                            }
                        }
                    }
                });
            } else {
                iotChart.data.labels = chartLabels;
                iotChart.data.datasets[0].data = chartData;
                iotChart.data.datasets[1].data = chartData2;
                iotChart.update();
            }
        });
}

// เรียกครั้งแรก
fetchAndUpdateChart();
// อัปเดตทุก 5 วินาที
setInterval(fetchAndUpdateChart, <?php echo $this->config->item('api_call_time');?>); // 10 Sec
</script>