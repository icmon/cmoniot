<!-- BEGIN PAGE BODY -->
<?php #  $this->load->view('user/pagewrapper'); ?>
<div class="page-body">
    <?php  /*****body**********/  ?>
    <?php ######## card_box_1?>
    <?php  #$this->load->view('user/card_box_1'); ?>
    <?php  $this->load->view('user/card_user_dashboard'); ?>
    <?php #$this->load->view('user/card_user_dashboard_1'); ?>
</div> <!-- END PAGE BODY -->
<!-- END PAGE BODY -->
<?php 
  $this->load->view('user/data_js_d2');
 $this->load->view('user/page_script_js');
?>