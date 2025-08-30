<!-- BEGIN PAGE BODY -->
<?php   $this->load->view('home/pagewrapper'); ?>
<div class="page-body">
    <?php  /*****body**********/  ?>
    <div class="container-xl">
        <div class="row row-deck row-cards">
            <?php ######## card_box_1?>
            <?php $this->load->view('home/card_box_1'); ?>
            <?php ######## card_box_2?>
            <?php $this->load->view('home/card_box_2'); ?>
            <?php ######## card_box_3?>
            <?php $this->load->view('home/card_box_3'); ?>
            <?php ########Invoices############ ?>
            <?php $this->load->view('home/card_box_4'); ?>
        </div>
    </div>
    <?php /*****body**********/?>
</div> <!-- END PAGE BODY -->
<!-- END PAGE BODY -->
<?php 
       // Data  api
   
     $this->load->view('home/data_js_d2');
     $this->load->view('home/page_script_js');
 
    ?>