<!-- BEGIN PAGE BODY -->
<?php #  $this->load->view('dashboard/pagewrapper'); ?>
<div class="page-body">
    <?php  /*****body**********/  ?>
    <div class="container-xl">
        <div class="row row-deck row-cards">
            <?php ######## card_box_1?>
            <?php $this->load->view('dashboard/card_box_1'); ?>
            <?php ######## card_box_2?>
            <?php $this->load->view('dashboard/card_box_2'); ?>
            <?php ######## card_box_3?>
            <?php $this->load->view('dashboard/card_box_3'); ?>
            <?php ########Invoices############ ?>
            <?php $this->load->view('dashboard/card_box_4'); ?>
        </div>
    </div>
    <?php /*****body**********/?>
</div> <!-- END PAGE BODY -->
<!-- END PAGE BODY -->
<?php 
       // Data  api
   
     $this->load->view('dashboard/data_js_d2');
     $this->load->view('dashboard/page_script_js');
 
    ?>