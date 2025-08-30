<?php 
$i='ch7';
?>
<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$sensor_name_set1=@@$input['bucket'];
if($sensor_name_set1==''){
   $sensor_name_set1="BAACTW02";
}
?>
<?php ##############?>
<div class="col-md-4">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title"> <?php #echo $sensor_name_set1; ?> Temperature
                <span id="time_<?php echo $i;?>"></span>
            </h4>
            <div id="chart-uptime-incidents" class="position-relative">
                <?php ###################?>
                <div id="podium<?php echo $i;?>-status">
                    <div id="chart-temperature-<?php echo $i;?>" style="max-width:220px;margin:30px auto 20px auto;">
                    </div>
                    <?php ###################?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php ##############?>
<script>
function updateStatus_<?php echo $i;?>(dotId, textId, value) {
    if (value == 1) {
        $('#' + dotId).removeClass('status-red').addClass('status-green');
        $('#' + textId).removeClass('text-danger').addClass('text-success').text('ON');
    } else {
        $('#' + dotId).removeClass('status-green').addClass('status-red');
        $('#' + textId).removeClass('text-success').addClass('text-danger').text('OFF');
    }
}
let tempChart_<?php echo $i;?>;

function fetchAndUpdate_<?php echo $i;?>() {
    $.getJSON('<?php echo base_url($this->config->item('api_iot_getsenser_top')).$sensor_name_set1;?>', function(data) {
        // console.log('time');
        // console.info(data.value_info.time);
        $('#time_<?php echo $i;?>').text(data.value_info.time);
        updateStatus_<?php echo $i;?>('alert-dot_<?php echo $i;?>', 'alert-status-<?php echo $i;?>',
            data
            .alert);
        updateStatus_<?php echo $i;?>('fan1-dot_<?php echo $i;?>', 'fan1-status-<?php echo $i;?>', data
            .fan1);
        updateStatus_<?php echo $i;?>('fan2-dot_<?php echo $i;?>', 'fan2-status-<?php echo $i;?>', data
            .fan2);
        if (tempChart_<?php echo $i;?>) {
            tempChart_<?php echo $i;?>.updateSeries([data.value]);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    tempChart_<?php echo $i;?> = new ApexCharts(document.getElementById(
        'chart-temperature-<?php echo $i;?>'), {
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
    tempChart_<?php echo $i;?>.render();
    fetchAndUpdate_<?php echo $i;?>();
    setInterval(fetchAndUpdate_<?php echo $i;?>, <?php echo $this->config->item('api_call_time');?>); // 10 Sec
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