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
 <li class="nav-item dropdown <?php  if($this->uri->segment(1)=='dashboard'){ ?> active<?php } ?>">
     <a class="nav-link dropdown-toggle" href="#navbar-form" data-bs-toggle="dropdown" data-bs-auto-close="outside"
         role="button" aria-expanded="false">
         <span class="nav-link-icon d-md-none d-lg-inline-block">
             <!-- Download SVG icon from http://tabler.io/icons/icon/checkbox -->
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-horizontal">
                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                 <path d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-12z" />
                 <path d="M9 17h6" />
             </svg>
         </span>
         <span class="nav-link-title"> <?php echo $this->lang->line('dashboard'); ?></span></a>
     <div class="dropdown-menu">
         <?php #-----------##?>
         <a class="dropdown-item <?php if($this->uri->segment(1)=='dashboard'  and $this->uri->segment(2)==''){ ?> active<?php } ?>"
             href="<?php echo base_url('dashboard');?>">
             <?php echo $this->lang->line('dashboard_overall');?> </a>
         <?php #-----------##?>
         <a class="dropdown-item <?php if($this->uri->segment(1)=='dashboard' and $this->uri->segment(2)=='dashboard1'){ ?> active<?php } ?>"
             href="<?php echo base_url('dashboard/dashboard1');?>">
             <?php echo $this->lang->line('dashboard');?> 1 </a>
         <?php #-----------##?>
         <a class="dropdown-item <?php if($this->uri->segment(1)=='dashboard' and $this->uri->segment(2)=='dashboard2'){ ?> active<?php } ?>"
             href="<?php echo base_url('dashboard/dashboard2');?>">
             <?php echo $this->lang->line('dashboard');?> 2 </a>
         <?php #-----------##?>
         <a class="dropdown-item <?php if($this->uri->segment(1)=='dashboard' and $this->uri->segment(2)=='dashboard3'){ ?> active<?php } ?>"
             href="<?php echo base_url('dashboard/dashboard3');?>">
             <?php echo $this->lang->line('dashboard');?> 3 </a>
         <?php #-----------##?>
         <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='dashboard' and $this->uri->segment(2)=='dashboard4'){ ?> active<?php } ?>"
             href="<?php echo base_url('dashboard/dashboard4');?>">
             <?php echo $this->lang->line('dashboard');?> 4 
              <span class="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>   
                </a> -->
         <?php #-----------##?>
         <a class="dropdown-item <?php if($this->uri->segment(1)=='dashboard' and $this->uri->segment(2)=='air'){ ?> active<?php } ?>"
             href="<?php echo base_url('dashboard/air');?>">Air<span
                 class="badge badge-sm bg-green-lt text-uppercase ms-auto">Air conditioner</span> </a>
         <?php #-----------##?>
         <a class="dropdown-item <?php if($this->uri->segment(1)=='dashboard' and $this->uri->segment(2)=='overallair'){ ?> active<?php } ?>"
             href="<?php echo base_url('dashboard/overallair');?>">Overall Air </a>
         <?php #-----------##?>
     </div>

 </li>
 <?php ############# ?>