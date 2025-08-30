 <!-- BEGIN PAGE BODY -->
 <?php
$language = $this->lang->language;
$lang=$this->lang->line('lang');
$langs=$this->lang->line('langs');
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$tab=$input['tab'];
?> <div class="card-body">
     <h4 class="subheader">settings</h4>
     <div class="list-group list-group-transparent">
         <a href="<?php echo base_url('settings').'?tab=1';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==1 || $tab==''){?> active <?php }?>">
             Schedule
         </a>
         <a href="<?php echo base_url('settings').'?tab=2';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==2){?>active <?php }?>">
             Alarm setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=3';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==3){?>active <?php }?>">
             Influxdb setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=4';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==4){?>active <?php }?>">
             Device setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=5';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==5){?>active <?php }?>">
             Location setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=6';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==6){?>active <?php }?>">
             Hardware configuration
         </a>
         <a href="<?php echo base_url('settings').'?tab=7';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==7){?>active <?php }?>">
             Sensor configuration
         </a>
         <a href="<?php echo base_url('settings').'?tab=8';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==8){?>active <?php }?>">
             Nodered setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=9';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==9){?>active <?php }?>">
             Mqtt setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=10';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==10){?>active <?php }?>">
             Email notification
         </a>
         <a href="<?php echo base_url('settings').'?tab=11';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==11){?>active <?php }?>">
             Line notification
         </a>
         <a href="<?php echo base_url('settings').'?tab=12';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==12){?>active <?php }?>">
             SMS notification
         </a>
         <a href="<?php echo base_url('settings').'?tab=13';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==13){?>active <?php }?>">
             Host setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=14';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==14){?>active <?php }?>">
             API setting
         </a>
         <a href="<?php echo base_url('settings').'?tab=15';?>"
             class="list-group-item list-group-item-action d-flex align-items-center <?php if($tab==15){?>active <?php }?>">
             Token setting
         </a>
     </div>
 </div>