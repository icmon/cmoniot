<!-- BEGIN PAGE BODY -->
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
<div class="page-wrapper">
    <!-- BEGIN PAGE HEADER -->
    <div class="page-header d-print-none">
        <div class="container">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <span id="alert-dot_<?php echo $i;?>"
                        class="status-indicator status-green status-indicator-animated">
                        <span class="status-indicator-circle"></span>
                        <span class="status-indicator-circle"></span>
                        <span class="status-indicator-circle"></span>
                    </span>
                </div>

                <div class="col">
                    <div class="col">
                        <h2 class="page-title mb-0" style="font-size:1.2rem;">Alerts !</h2>
                        <div>
                            <span id="alert-status-<?php echo $i;?>" class="text-success">ON</span>
                            <span class="text-secondary d-block" style="font-size:0.9em;">· Checked every 1
                                minutes</span>
                        </div>
                    </div>
                    <?php ###################?>
                </div>

                <div class="col-md-auto ms-auto d-print-none">
                    <div class="btn-list">

                        <a href="#" class="btn btn-2">

                            <!-- Download SVG icon from http://tabler.io/icons/icon/settings -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-2">
                                <path
                                    d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            </svg>

                            Configure

                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- END PAGE HEADER -->

    <!-- BEGIN PAGE BODY -->
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="row g-3 align-items-center mb-2">
                                <div class="col-auto">
                                    <span id="fan1-dot_<?php echo $i;?>"
                                        class="status-indicator status-green status-indicator-animated">
                                        <span class="status-indicator-circle"></span>
                                        <span class="status-indicator-circle"></span>
                                        <span class="status-indicator-circle"></span>
                                    </span>
                                </div>
                                <div class="col">
                                    <span class="d-block"
                                        style="font-size:1.1rem;font-weight:600;"><?php echo $sensor_name_set1;?> FAN
                                        1</span>
                                    <span id="fan1-status-<?php echo $i;?>" class="text-success">ON</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="row g-3 align-items-center mb-2">
                                <div class="col-auto">
                                    <span id="fan2-dot_<?php echo $i;?>"
                                        class="status-indicator status-green status-indicator-animated">
                                        <span class="status-indicator-circle"></span>
                                        <span class="status-indicator-circle"></span>
                                        <span class="status-indicator-circle"></span>
                                    </span>
                                </div>
                                <div class="col">
                                    <span class="d-block"
                                        style="font-size:1.1rem;font-weight:600;"><?php echo $sensor_name_set1;?> FAN
                                        2</span>
                                    <span id="fan2-status-<?php echo $i;?>" class="text-success">ON</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php ##############?>
                <?php   $this->load->view('dashboard/details_monitor_chart_sensor');  ?>
                <?php ##############?>
                <?php   $this->load->view('dashboard/details_chart_fan_set_top_sensor');  ?>
                <?php ##############?>
                <div class="col-12">
                    <div class="card">
                        <div class="card-table table-responsive">
                            <?php   $this->load->view('dashboard/details_monitor_cardtable_data');  ?>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <!-- END PAGE BODY -->
    <?php 
 $this->load->view('dashboard/data_js_d2');
 $this->load->view('dashboard/page_script_js');
?>