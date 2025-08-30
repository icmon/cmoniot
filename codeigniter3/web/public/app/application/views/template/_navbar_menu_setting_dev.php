 <?php 
$urlnodered=$this->config->item('urlnodered');
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
#ob_end_flush();
# แปลภาษา
# File THAI --> application\language\thai\app_lang.php
# File English --> application\language\english\app_lang.php	
$admin_id=0;# 0=>เห็นทุกเมนู
$navbar_fix='';
$breadcrumb_fix='';
$language=$this->lang->language;
$lang=$this->lang->line('lang');
$langs=$this->lang->line('langs');
$dashboard=$this->lang->line('dashboard');
$welcome=$this->lang->line('welcome');
$settings=$this->lang->line('settings');
$preview=$this->lang->line('preview');
$website=$this->lang->line('website');
$profile=$this->lang->line('profile');
$logout=$this->lang->line('logout');
$titleweb=$this->lang->line('titleweb');
$apps=$this->lang->line('apps');
$company=$this->lang->line('company');
$login=$this->lang->line('login');
$username=$this->lang->line('username');
$password=$this->lang->line('password');
$remember=$this->lang->line('remember');
$forgot=$this->lang->line('forgot');
$email=$this->lang->line('email');
$sendemail=$this->lang->line('sendemail');
$register=$this->lang->line('register');
$reset=$this->lang->line('reset');
######################
if($lang=='th'){
	$langs_th='ภาษาไทย';
	$langs_en='ภาษาอังกถษ';
}else if($lang=='en'){
	$langs_th='Thai';
	$langs_en='English';
}
$segment1=$this->uri->segment(1);
$segment2=$this->uri->segment(2);
$segment3=$this->uri->segment(3);
$segment4=$this->uri->segment(4);
$segment5=$this->uri->segment(5);
$segment6=$this->uri->segment(6);
$segment7=$this->uri->segment(7);
$segment8=$this->uri->segment(8);
$segment9=$this->uri->segment(9);
$segment10=$this->uri->segment(10);
/************************/ 
?>
 <li class="nav-item <?php if($this->uri->segment(1)=='settings'){ ?> active<?php } ?> dropdown">
     <a class="nav-link dropdown-toggle" href="#navbar-layout" data-bs-toggle="dropdown" data-bs-auto-close="outside"
         role="button" aria-expanded="false">

         <span class="nav-link-icon d-md-none d-lg-inline-block">
             <!-- Download SVG icon from http://tabler.io/icons/icon/layout-2 -->
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="icon icon-tabler icons-tabler-outline icon-tabler-settings-plus">
                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                 <path
                     d="M12.483 20.935c-.862 .239 -1.898 -.178 -2.158 -1.252a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.08 .262 1.496 1.308 1.247 2.173" />
                 <path d="M16 19h6" />
                 <path d="M19 16v6" />
                 <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
             </svg>
         </span><span class="nav-link-title"> <?php echo $this->lang->line('navbar_menu_setting');?> </span> </a>

     <div class="dropdown-menu">
         <div class="dropdown-menu-columns">
             <div class="dropdown-menu-column">
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)==''){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings');?>">
                     <?php echo $this->lang->line('navbar_menu_setting');?>
                 </a>
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='alarm'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/alarm');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Alarm Config
                 </a>
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='mqtt'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/mqtt');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     IoT Config
                 </a>

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='device'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/device');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Device
                 </a>

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='sensor'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/sensor');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Sensor
                 </a>

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='influxdb'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/influxdb');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Influxdb
                 </a>
                 <?php /*?>
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='alarm'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/alarm');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Alarm
                 </a>
                 <?php */?>

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='nodered'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/nodered');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Nodered
                 </a>
                 <?php /*>
                                         <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='hardware'){ ?>
                 active<?php } ?>" href="<?php echo base_url('settings/hardware');?>">
                 <?php # echo $this->lang->line('navbar_menu_token');?>
                 Hardware
                 </a>
                 <?php */?>

                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='host'){ ?>
 active<?php } ?>" href="<?php echo base_url('settings/host');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Host
                 </a> -->

             </div>
             <div class="dropdown-menu-column">
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='schedule'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/schedule');?>">
                     <?php echo $this->lang->line('navbar_menu_schedule');?>
                 </a>
                 <?php ############## ?>

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='mqtthost'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/mqtthost');?>">
                     Mqtt host
                 </a>
                 <?php ############## ?>

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='email'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/email');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Email
                 </a>
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='sms'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/sms');?>">
                     SMS
                 </a>

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='line'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/line');?>">
                     <?php # echo $this->lang->line('navbar_menu_token');?>
                     Line
                 </a>
                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='token'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/token');?>">
                     <?php echo $this->lang->line('navbar_menu_token');?>
                 </a>
                 -->
                 <!-- 
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='api'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/api');?>"> API
                 </a> -->
                 <?php ############## ?>
                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='settings' and $this->uri->segment(2)=='location'){ ?> active<?php } ?>"
                     href="<?php echo base_url('settings/location');?>">
                     <?php echo $this->lang->line('navbar_menu_location');?> </a> -->
                 <?php ############## ?>
             </div>
         </div>
     </div>
 </li>
