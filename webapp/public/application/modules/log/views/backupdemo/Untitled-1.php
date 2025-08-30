            <?php #########################chart-fan-4################################ ?>
            <div class="col-sm-4 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <div class="h2 subheader">Sennsor SN:DEADBEEFFEED </div>
                        <?php #################?>
                        <div class="page-header d-print-none">
                            <div class="container">
                                <div class="row g-3 align-items-center">
                                    <div class="col-auto">
                                        <span class="status-indicator status-green status-indicator-animated">
                                            <span class="status-indicator-circle"></span>
                                            <span class="status-indicator-circle"></span>
                                            <span class="status-indicator-circle"></span>
                                        </span>
                                    </div>

                                    <div class="col">
                                        <h2 class="page-title">
                                            Alerts !
                                        </h2>
                                        <div class="text-secondary">
                                            <ul class="list-inline list-inline-dots mb-0">
                                                <li class="list-inline-item"><span class="text-green">ON</span></li>
                                                <li class="list-inline-item">Checked every 1 minutes</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php #################?>
                        <div id="chart-fan-4" class="position-relative "></div>
                        <div class="d-flex align-items-baseline">

                            <div class="me-auto">
                                <?php #################?>
                                <div class="page-header d-print-none">
                                    <div class="container">
                                        <div class="row g-3 align-items-center">
                                            <div class="col-auto">
                                                <span class="status-indicator status-green status-indicator-animated">
                                                    <span class="status-indicator-circle"></span>
                                                    <span class="status-indicator-circle"></span>
                                                    <span class="status-indicator-circle"></span>
                                                </span>
                                            </div>

                                            <div class="col">
                                                <h5 class="page-title">
                                                    FAN 1
                                                </h5>
                                                <div class="text-secondary">
                                                    <ul class="list-inline list-inline-dots mb-0">
                                                        <li class="list-inline-item"><span class="text-green">ON
                                                                !</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php #################?>
                                <?php #################?>
                                <div class="page-header d-print-none">
                                    <div class="container">
                                        <div class="row g-3 align-items-center">
                                            <div class="col-auto">
                                                <span class="status-indicator status-red status-indicator-animated">
                                                    <span class="status-indicator-circle"></span>
                                                    <span class="status-indicator-circle"></span>
                                                    <span class="status-indicator-circle"></span>
                                                </span>
                                            </div>

                                            <div class="col">
                                                <h5 class="page-title">
                                                    FAN 2
                                                </h5>
                                                <div class="text-secondary">
                                                    <ul class="list-inline list-inline-dots mb-0">
                                                        <li class="list-inline-item"><span class="text-red">OFF
                                                                !</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php #################?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--- chart-fan-4-->
            <script>
            document.addEventListener("DOMContentLoaded", function() {
                window.tabler_chart = window.tabler_chart || {};
                window.ApexCharts && (window.tabler_chart["chart-fan-4"] = new ApexCharts(document
                    .getElementById('chart-fan-4'), {
                        chart: {
                            type: "radialBar",
                            fontFamily: 'inherit',
                            height: 192,
                            sparkline: {
                                enabled: true
                            },
                            animations: {
                                enabled: true
                            },
                        },
                        plotOptions: {
                            radialBar: {
                                startAngle: -180,
                                endAngle: 180,
                                hollow: {
                                    margin: 50,
                                    size: "50%"
                                },
                                dataLabels: {
                                    show: true,
                                    value: {
                                        offsetY: -10,
                                        fontSize: '24px',
                                    }
                                },
                            },
                        },
                        series: [35.82],
                        labels: [""],
                        tooltip: {
                            theme: 'dark'
                        },
                        grid: {
                            strokeDashArray: 10,
                        },
                        colors: [
                            'color-mix(in srgb, transparent, var(--tblr-primary) 100%)'
                        ],
                        legend: {
                            show: false,
                        },
                    })).render();
            });
            </script>
            <?php #########################chart-fan-4################################ ?> 