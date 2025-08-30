<!-- แทนที่ <hr> ด้วย div ที่มีคลาสสำหรับสร้างเส้นคั่นและระยะห่าง -->
<div class="border-top my-4"></div>
<?php 
$segment1=$this->uri->segment(1);
$segment2=$this->uri->segment(2);
$segment3=$this->uri->segment(3);
$segment4=$this->uri->segment(4);
$segment5=$this->uri->segment(5);
$segment6=$this->uri->segment(6);
$segment7=$this->uri->segment(7);
$segment8=$this->uri->segment(8);
$segment9=$this->uri->segment(9);
$segment10=$this->uri->segment(10);
// --- ส่วนของการดึงข้อมูลจาก API ---
$token = $_SESSION['token'];
$api_call = $this->config->item('api_url') . 'mqtt/fan';
$rsapi = $this->Crul_model->call_api_with_token($api_call, $token);
$code = $rsapi['code'];
if ($code != 200) {
    echo 'Error data api'; 
    die();
}
//echo '$segment2=>'.$segment2;
$payload = $rsapi['payload'];
if ($payload) {
?>
<!-- 1. เพิ่ม <div class="row"> เพื่อครอบการ์ดทั้งหมด -->
<div class="row">
    <?php
    $j= 1;
    foreach ($payload as $key => $value) {
        $mqtt_number = $j;
        $mqtt_id = $value['mqtt_id'];
        $mqtt_name = $value['mqtt_name']; 
        $org = $value['org'];
        $bucket = $value['bucket'];
        $mqtt_dada = $value['mqtt'];
        $device_name = $mqtt_dada['mqtt_dada'];
        $timestamp = $mqtt_dada['timestamp'];
        $temperature = $mqtt_dada['temperature'];
?>
    <?php #------------------------------# ?>
    <div class="col-sm-6 col-lg-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="subheader"><a href="<?php echo base_url('dashboard/dashboard2').'?bucket='.$bucket?>">
                            <span id="sensor_name_<?php echo $j;?>"> <?php echo $mqtt_name;?>
                            </span> :
                            <span id="temperature_<?php echo $j;?>">--</span></a>
                        <div class="dropdown">
                            <a class="dropdown-toggle text-secondary" href="#" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">view</a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item active"
                                    href="<?php echo base_url('dashboard/dashboard2').'?bucket='.$bucket?>">Main</a>
                                <a class="dropdown-item"
                                    href="<?php echo base_url('dashboard/details').'?bucket='.$bucket?>">Details</a>
                            </div>
                            <span id="time_<?php echo $j;?>"></span>
                        </div>
                        <div id="podium<?php echo $j;?>-status">

                            <div id="chart-temperature-<?php echo $a;?>"
                                style="max-width:220px;margin:30px auto 20px auto;"></div>
                            <?php /********************************/ ?>
                            <?php
                                // --- จำลองข้อมูลสถานะให้ตรงกับภาพ [1] ---
                                $device_status = [
                                    'fan1' => ['text' => 'OFF', 'class' => 'danger', 'dot_class' => 'red'],
                                    'alarm1' => ['text' => 'normal', 'class' => 'success', 'dot_class' => 'green'],
                                    'fan2' => ['text' => 'ON', 'class' => 'success', 'dot_class' => 'green'],
                                    'alarm2' => ['text' => 'normal', 'class' => 'success', 'dot_class' => 'red'], // Text: green, Dot: red
                                ];
                            ?>
                            <!-- จัดวางเป็น 2 คอลัมน์ (ซ้าย-ขวา) เพื่อความสวยงาม -->
                            <div class="row">

                                <!-- คอลัมน์ซ้าย: FAN 1 และ Alarm 1 -->
                                <div class="col-6">
                                    <!-- FAN 1 -->
                                    <div class="row g-3 align-items-center mb-3">
                                        <div class="col-auto">
                                            <span id="fan1_dot_<?php echo $j;?>"
                                                class="status-indicator status-<?php echo $device_status['fan1']['dot_class']; ?> status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span>FAN 1</span>
                                            <span id="fan1_set_status_<?php echo $j;?>"
                                                class="text-<?php echo $device_status['fan1']['class']; ?>"><?php echo $device_status['fan1']['text']; ?></span>
                                        </div>
                                    </div>
                                    <!-- Alarm 1 -->
                                    <div class="row g-3 align-items-center">
                                        <div class="col-auto">
                                            <span id="alarm1_dot_<?php echo $j;?>"
                                                class="status-indicator status-<?php echo $device_status['alarm1']['dot_class']; ?> status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span>Alarm 1</span>
                                            <span id="alarm1_set_status_<?php echo $j;?>"
                                                class="text-<?php echo $device_status['alarm1']['class']; ?>"><?php #echo $device_status['alarm1']['text']; ?></span>
                                        </div>
                                    </div>
                                </div>

                                <!-- คอลัมน์ขวา: FAN 2 และ Alarm 2 -->
                                <div class="col-6">
                                    <!-- FAN 2 -->
                                    <div class="row g-3 align-items-center mb-3">
                                        <div class="col-auto">
                                            <span id="fan2_dot_<?php echo $j;?>"
                                                class="status-indicator status-<?php echo $device_status['fan2']['dot_class']; ?> status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span>FAN 2</span>
                                            <span id="fan2_set_status_<?php echo $j;?>"
                                                class="text-<?php echo $device_status['fan2']['class']; ?>"><?php echo $device_status['fan2']['text']; ?></span>
                                        </div>
                                    </div>
                                    <!-- Alarm 2 -->
                                    <div class="row g-3 align-items-center">
                                        <div class="col-auto">
                                            <span id="alarm2_dot_<?php echo $j;?>"
                                                class="status-indicator status-<?php echo $device_status['alarm2']['dot_class']; ?> status-indicator-animated">
                                                <span class="status-indicator-circle"></span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span>Alarm 2</span>
                                            <span id="alarm2_set_status_<?php echo $j;?>"
                                                class="text-<?php echo $device_status['alarm2']['class']; ?>"><?php #echo $device_status['alarm2']['text']; ?></span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <?php /********************************/ ?>

                        </div>
                    </div>
                </div>
            </div>
            <div id="chart_temperature_<?php echo $j;?>" class="position-relative rounded-bottom chart-sm"></div>
        </div>
    </div>

    <?php ####################### ?>
    <script>
    //console.log("updateStatus_=>" + updateStatus_<?php echo $j;?>);

    var tempChart_<?php echo $i;?>;

    function updateStatus(dotId, textId, value) {
        console.log("-----updateStatus------");
        console.log("dotId=>" + dotId);
        console.log("textId=>" + textId);
        console.log("value=>" + value);
        if (value == 1) {
            $('#' + dotId).removeClass('status-red').addClass('status-green');
            $('#' + textId).removeClass('text-danger').addClass('text-success').text('ON');
        } else {
            $('#' + dotId).removeClass('status-green').addClass('status-red');
            $('#' + textId).removeClass('text-success').addClass('text-danger').text('OFF');
        }
    }

    async function fetchAndUpdate_<?php echo $j;?>() {
        try {
            var bucket_<?php echo $j;?> = '<?php echo $bucket;?>';
            var apiUrl = '<?php echo $this->config->item('api_url').'mqtt/mqttsenserchart?bucket='.$bucket; ?>';
            var bearerToken = '<?php echo $_SESSION['token']; ?>';
            var response_<?php echo $j;?> = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response_<?php echo $j;?>) {
                throw new Error(`HTTP error! Status: ${response_<?php echo $j;?>.status}`);
            }

            // //console.log('1_apiUrl=>' + apiUrl);
            // //console.log('1_response=>');
            // //console.info(response);

            var rs = await response_<?php echo $j;?>.json();
            var data = rs.mqtt;
            var mqtt_name = rs.mqtt_name;
            var chart = rs.chart;

            var fan1 = data.fan1;
            var fan2 = data.fan2;
            var overFan1 = data.overFan1;
            var overFan2 = data.overFan2;
            var overFan2 = data.overFan2;
            var chart_data = chart.data;
            var chart_date = chart.date;

            // console.log("bucket_<?php echo $j;?>=>" + bucket_<?php echo $j;?>);
            // console.log("apiUrl=>" + apiUrl);
            // console.log("fan1=>" + fan1);
            // console.log("fan2=>" + fan2);
            // console.log("overFan1=>" + overFan1);
            // console.log("overFan2=>" + overFan2);
            // console.log("chart_data=>");
            // console.info(chart_data);
            // console.log("chart_date=>");
            // console.info(chart_date);
            // console.log("data.temperature=>");
            // console.info(data.temperature);
            // console.log("data.timestamp=>");
            // console.info(data.timestamp);


            // อัปเดตค่าที่แสดงผล
            $('#temperature_<?php echo $j;?>').text(data.temperature);
            $('#time_<?php echo $j;?>').text(data.timestamp);
            updateStatus('alarm1_set_status_<?php echo $j;?>', 'alarm1_set_status_<?php echo $j;?>', data.overFan1);
            updateStatus('alarm2_set_status_<?php echo $j;?>', 'alarm2_set_status_<?php echo $j;?>', data.overFan2);
            updateStatus('fan1_set_dot_<?php echo $j;?>', 'fan1_set_status_<?php echo $j;?>', data.fan1);
            updateStatus('fan2_set_dot_<?php echo $j;?>', 'fan2_set_status_<?php echo $j;?>', data.fan2);


            // อัปเดตกราฟ (ถ้ามี)
            if (tempChart_<?php echo $j;?> && chart && chart_data) {
                tempChart_<?php echo $j;?>.updateSeries([chart_data]);
            }

            if (window['tempChart_<?php echo $j;?>']) {
                window['tempChart_<?php echo $j;?>'].updateSeries([data.temperature]);
            }
            // $('#last-update-time-').text('Last : ' + data.timestamp.replace(':', ' '));
            $('#last-update-time-<?php echo $j;?>').text('Last : ' + data.timestamp);

            // $('#device-card-title-').text(mqtt_name);
            var segment2 = <?php echo $segment2;?>;
            // Update UI elements for this specific card 
            // alert(deviceId);
            var destinationUrl = '/dashboard/' + segment2 + '?bucket=' + bucket;
            $('#device-card-title-<?php echo $j;?>').html('<a href="' + destinationUrl + '">' + mqtt_name +
                '</a>');

        } catch (error) {
            //console.error(`Could not fetch data for card ${<?php echo $j;?>}:`, error);
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        let chart = null;
        const options = {
            chart: {
                type: "area",
                fontFamily: 'inherit',
                height: 80,
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
        chart = new ApexCharts(document.getElementById('chart_temperature_<?php echo $j;?>'), options);
        chart.render();
        async function fetchAndUpdateChart() {
            var redirect = '<?php echo base_url('error500');?>';
            try {
                var apiUrl =
                    '<?php echo $this->config->item('api_url').'mqtt/mqttsenserchart?bucket='.$bucket; ?>'
                var bearerToken = '<?php echo $_SESSION['token']; ?>';
                var response_<?php echo $j;?> = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response_<?php echo $j;?>) {
                    throw new Error(`HTTP error! Status: ${response_<?php echo $j;?>.status}`);
                }

                //console.log('apiUrl=>' + apiUrl);
                //console.log('response_<?php echo $j;?>=>');
                //console.info(response_<?php echo $j;?>);

                var rs = await response_<?php echo $j;?>.json();
                var data = rs.mqtt;
                var mqtt_name = rs.mqtt_name;
                var chart = rs.chart;
                var measurement = rs.datamqtt['0'].bucket;
                var chartData = chart.data;
                var chartDate = chart.date;

                //console.log('measurement=>');
                //console.info(measurement);
                //console.log('chartData=>');
                //console.info(chartData);
                //console.log('chartDate=>');
                //console.info(chartDate);


                // สมมติ data.chart.date เป็น array ของวันที่ในรูปแบบ 'YYYY-MM-DD HH:mm:ss'
                // แปลงเป็น timestamp หรือ ISO string
                const labels = chartDate.map(dt => new Date(dt).toISOString());

                // สร้าง array ของ object {x: datetime, y: value}
                const seriesData = labels.map((dt, idx) => ({
                    x: dt,
                    y: chartData[idx]
                }));

                // console.log('measurement=>');
                // console.info(measurement);
                // console.log('seriesData=>');
                // console.info(seriesData);

                chart.updateOptions({
                    series: [{
                        name: measurement,
                        data: seriesData
                    }]
                });
            } catch (error) {
                console.error('Error fetching data_<?php echo $j;?>:', error);

            }
        }
        fetchAndUpdateChart();
        setInterval(fetchAndUpdateChart, <?php echo $this->config->item('api_call_time_mqtt');?>);
        /*******************/
        fetchAndUpdate_<?php echo $j;?>();
        setInterval(fetchAndUpdate_<?php echo $j;?>,
            <?php echo $this->config->item('api_call_time_mqtt');?>); // 10 วินาที
    });
    </script>

    <?php 
    $j++;
}} ?>
    <style>
    .status-indicator.status-green .status-indicator-circle {
        background: #00d97e !important;
        box-shadow: 0 0 6px #00d97e;
    }

    .status-indicator.status-red .status-indicator-circle {
        background: #fa5252 !important;
        box-shadow: 0 0 6px #fa5252;
    }
    </style>
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