<?php /***card-body*/?>
<?php 
/*
$config['api_iot_getsenserchartfilter'] ='iot/getsenserchartfilter';
$config['api_iot_devicemonitor'] ='iot/devicemonitor';

// http://localhost/cmonphpiot/api/iot/getsenserchartfilter?bucket=BAACTW03
// http://localhost/cmonphpiot/api/iot/devicemonitor?bucket=BAACTW02
 
*/?>

<?php /***card-Sales*/?>
<?php #################### ?>
<?php /***card-Revenue*/
$i=4;
?>
<div class="col-sm-6 col-lg-3">
    <div class="card">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div class="subheader"> BAACTW02
                    <br>
                    <h6> Temperature : 30.66 °C </h6>
                    <h6> Temperature : 30.66 °C </h6>

                </div>
                <div class="ms-auto lh-1">
                    <span id="fan1-dot_<?php echo $i;?>"
                        class="status-indicator status-green status-indicator-animated">
                        <span class="status-indicator-circle"></span>
                        <span class="status-indicator-circle"></span>
                        <span class="status-indicator-circle"></span>
                    </span>
                    Alerts : <span id="fan1-status-<?php echo $i;?>" class="text-success">ON</span>
                </div>
            </div>
            <div class="d-flex align-items-baseline">
                <div class="h3 mb-0 me-2">$4,300</div>

            </div>
        </div>
        <div id="chart-revenue-bg" class="position-relative  rounded-bottom chart-sm"></div>
    </div>

</div>
<?php #################### ?>
<?php /***card-Revenue*/?>