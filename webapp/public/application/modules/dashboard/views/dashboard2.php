<?php
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=$input['option'];
?>
<!-- BEGIN PAGE BODY -->
<div class="page-body">
    <?php /*****body**********/  ?>
    <div class="container-xl">
        <div class="row row-deck row-cards">
            <?php #################### ?>
            <?php /**Fan Chart*/?>
            <?php   
                 $this->load->view('dashboard/fan_chart_sensor_type3_dashboard2'); 
            ?>
            <?php /**Fan Chart*/?>
            <?php  
            # $this->load->view('dashboard/chart_fan_set_top_sensor');  
            # $this->load->view('dashboard/chart_fan_set_top_sensor_v2'); 
              $this->load->view('dashboard/dashboard2_chart_fan_set_top_sensor'); 
            ?>
            <?php ######## card_box_2?>
            <?php  $this->load->view('dashboard/chart_fan_set_top_sensor_loop_card'); ?>
            <?php #########################chart-fan################################ ?>
        </div>

    </div>
    <?php   /*****body**********/ ?>
</div>


<!-- CSS เพิ่มเติมสำหรับ status-indicator สีเขียว/แดง -->
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
<!-- ส่วน JavaScript -->
<script src="<?php echo base_url('assets');?>/js/jquery.min.js" defer></script>
<script src="<?php echo base_url('assets');?>/js/apexcharts"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> -->
<?php 
    // Data  api
    $this->load->view('dashboard/data_js_v1');
    $this->load->view('dashboard/page_script_js');
?>