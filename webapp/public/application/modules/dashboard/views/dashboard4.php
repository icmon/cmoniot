<!-- BEGIN PAGE BODY -->
<?php  # $this->load->view('dashboard/pagewrapper'); ?>
<div class="page-body">
    <?php  /*****body**********/ ?>
    <div class="container-xl">
        <div class="row row-deck row-cards">
            <?php   
            #$this->load->view('dashboard/dashboard4_card_top'); 
            ?>
            <?php #################### ?>
            <?php    
                $this->load->view('dashboard/fan_chart_sensor_dashboard4'); 
                
            ?>
            <?php #################### ?>
            <?php /**Using Storage*/?>
            <?php   
             $this->load->view('dashboard/dashboard4_table_chart'); 
            ?>
            <?php #################### ?>
        </div>
    </div> <?php 
    /*****body**********/
    ?>
</div> <!-- END PAGE BODY -->
<!-- END PAGE BODY -->
<?php 
       // Data  api
     $this->load->view('dashboard/data_js_d2');
     $this->load->view('dashboard/page_script_js');
?>