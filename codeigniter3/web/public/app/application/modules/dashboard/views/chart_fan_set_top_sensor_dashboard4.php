<?php 
$a='a7';
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
    $sensor_name_set=@$input['bucket'];
if($sensor_name_set==''){
   $sensor_name_set="BAACTW02";
}
?>
<div class="col-lg-5">
    <div class="card">
        <div class="card-body">
            <div class="h2 subheader"><?php echo $sensor_name_set;?> </div>

            <div id="podium<?php echo $a;?>-status">
                <div class="row g-3 align-items-center mb-2">
                    <div class="col-auto">
                        <span id="alert-dot_<?php echo $a;?>"
                            class="status-indicator status-green status-indicator-animated">
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                        </span>
                    </div>
                    <div class="col">
                        <h2 class="page-title mb-0" style="font-size:1.2rem;">Alarm !</h2>
                        <div>
                            <span id="alert-status-<?php echo $a;?>" class="text-success">ON</span>
                            <span class="text-secondary d-block" style="font-size:0.9em;">· Checked every
                                <?php echo $this->config->item('api_call_time_mqtt');?>
                                seconds</span>
                            <span id="last-update-time"></span>
                        </div>
                    </div>
                </div>
                <div id="chart_temperature_<?php echo $a;?>" style="max-width:220px;margin:30px auto 20px auto;"></div>
                <div class="row g-3 align-items-center mb-2">
                    <div class="col-auto">
                        <span id="fan1-dot_<?php echo $a;?>"
                            class="status-indicator status-green status-indicator-animated">
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                        </span>
                    </div>
                    <div class="col">
                        <span class="d-block" style="font-size:1.1rem;font-weight:600;">FAN 1</span>
                        <span id="fan1-status-<?php echo $a;?>" class="text-success">ON</span>
                    </div>
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <span id="fan2-dot_<?php echo $a;?>"
                            class="status-indicator status-green status-indicator-animated">
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                            <span class="status-indicator-circle"></span>
                        </span>
                    </div>
                    <div class="col">
                        <span class="d-block" style="font-size:1.1rem;font-weight:600;">FAN 2</span>
                        <span id="fan2-status-<?php echo $a;?>" class="text-success">ON</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
function updateStatus_<?php echo $a;?>(dotId, textId, value) {
    if (value == 1) {
        $('#' + dotId).removeClass('status-red').addClass('status-green');
        $('#' + textId).removeClass('text-danger').addClass('text-success').text('ON');
    } else {
        $('#' + dotId).removeClass('status-green').addClass('status-red');
        $('#' + textId).removeClass('text-success').addClass('text-danger').text('OFF');
    }
}
let tempChart_<?php echo $a;?>;

function fetchAndUpdate_<?php echo $a;?>() {
    $.getJSON('<?php echo base_url($this->config->item('api_iot_getsenser_top'));?>', function(data) {
        updateStatus_<?php echo $a;?>('alert-dot_<?php echo $a;?>', 'alert-status-<?php echo $a;?>', data
            .alert);
        updateStatus_<?php echo $a;?>('fan1-dot_<?php echo $a;?>', 'fan1-status-<?php echo $a;?>', data.fan1);
        updateStatus_<?php echo $a;?>('fan2-dot_<?php echo $a;?>', 'fan2-status-<?php echo $a;?>', data.fan2);
        if (tempChart_<?php echo $a;?>) {
            tempChart_<?php echo $a;?>.updateSeries([data.value]);
        }
        // เพิ่มบรรทัดนี้เพื่ออัปเดตเวลา
        $('#last-update-time').text('Last : ' + data.value_info.time.replace(':', ' '));
    });
}

document.addEventListener("DOMContentLoaded", function() {
    tempChart_<?php echo $a;?> = new ApexCharts(document.getElementById('chart_temperature_<?php echo $a;?>'), {
        chart: {
            type: "radialBar",
            height: 150,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true
            }
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
                        offsetY: -4,
                        fontSize: '20px',
                        formatter: function(val) {
                            return val + "°C";
                        }
                    }
                },
            }
        },
        series: [0],
        labels: [""],
        tooltip: {
            theme: 'dark'
        },
        grid: {
            strokeDashArray: 10
        },
        colors: ['color-mix(in srgb, transparent, var(--tblr-primary) 100%)'],
        legend: {
            show: false
        }
    });
    tempChart_<?php echo $a;?>.render();
    fetchAndUpdate_<?php echo $a;?>();
    setInterval(fetchAndUpdate_<?php echo $a;?>,
        <?php echo $this->config->item('api_call_time_mqtt');?>); // 10 Sec
});
</script>

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