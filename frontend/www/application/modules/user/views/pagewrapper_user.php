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

                        User
                    </h2>

                </div>

                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">

                        <a href="<?php echo base_url('user/profileadd');?>"
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

                        <a href="#" class="btn btn-primary btn-6 d-sm-none btn-icon" data-bs-toggle="modal"
                            data-bs-target="#modal-report" aria-label="Create new report">

                            <!-- Download SVG icon from http://tabler.io/icons/icon/plus -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-2">
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>

                        </a>
                    </div>

                    <!-- BEGIN MODAL -->

                    <!-- END MODAL -->

                </div>

            </div>
        </div>
    </div>

    <!-- END PAGE HEADER -->
    <?php $this->load->view('settings/sensor/modal_from'); ?>