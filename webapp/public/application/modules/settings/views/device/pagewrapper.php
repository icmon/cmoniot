<?php
$language = $this->lang->language;
$lang = $this->lang->line('lang');
$langs = $this->lang->line('langs');
$input = @$this->input->post();
if ($input == null) { $input = @$this->input->get(); }
$bucket = $input['bucket'] ?? '';
$mqtt_id = $input['mqtt_id'] ?? '';
//&mqtt_id=27
?>
<div class="page-wrapper">
    <!-- BEGIN PAGE HEADER -->

    <div class="page-header d-print-none">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">

                    <!-- Page pre-title -->
                    <!-- <div class="page-pretitle">
                        Overview
                    </div> -->

                    <h2 class="page-title">

                        Device
                    </h2>

                </div>
                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">

                        <a href="<?php echo base_url('settings/mqtt'); ?>"
                            class="btn btn-primary btn-5 d-none d-sm-inline-block">

                            MQTT
                        </a>

                    </div>

                    <!-- BEGIN MODAL -->

                    <!-- END MODAL -->

                </div>

                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">

                        <a href="<?php echo base_url('settings/device/devicesadd?bucket=').$bucket.'&mqtt_id='.$mqtt_id; ?>"
                            class="btn btn-primary btn-5 d-none d-sm-inline-block">

                            <!-- Download SVG icon from http://tabler.io/icons/icon/plus -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-2">
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>

                            <?php echo $this->lang->line('c_insert');?>

                        </a>

                    </div>

                    <!-- BEGIN MODAL -->

                    <!-- END MODAL -->

                </div>

            </div>
        </div>
    </div>