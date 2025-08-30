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
 <?php ####Log######### ?>
 <li class="nav-item dropdown <?php  if($this->uri->segment(1)=='log'){ ?>active<?php } ?>">
     <a class="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" data-bs-auto-close="outside"
         role="button" aria-expanded="false">

         <span class="nav-link-icon d-md-none d-lg-inline-block">
             <!-- Download SVG icon from http://tabler.io/icons/icon/package -->
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="icon icon-tabler icons-tabler-outline icon-tabler-database-search">
                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                 <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" />
                 <path d="M4 6v6c0 1.657 3.582 3 8 3m8 -3.5v-5.5" />
                 <path d="M4 12v6c0 1.657 3.582 3 8 3" />
                 <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                 <path d="M20.2 20.2l1.8 1.8" />
             </svg>
         </span>
         <span class="nav-link-title"> <?php echo $this->lang->line('menu_log');?> </span> </a>

     <div class="dropdown-menu">
         <div class="dropdown-menu-columns">
             <div class="dropdown-menu-column">
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='log' and $this->uri->segment(2)=='history'){ ?> active<?php } ?>"
                     href="<?php echo base_url('log/history');?>"> History log <span
                         class="badge badge-sm bg-green-lt text-uppercase ms-auto">System</span>
                     <a class="dropdown-item <?php if($this->uri->segment(1)=='log' and $this->uri->segment(2)=='alerts'){ ?> active<?php } ?>"
                         href="<?php echo base_url('log/alerts');?>"> Alerts log </a>
                     <div class="dropend">
                         <a class="dropdown-item dropdown-toggle <?php if($this->uri->segment(1)=='log' and ($this->uri->segment(2)=='signlog' or $this->uri->segment(2)=='accesslog')){ ?> active<?php } ?>"
                             href="#sidebar-authentication" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                             role="button" aria-expanded="false">
                             Authentication log </a>
                         <div
                             class="dropdown-menu <?php if($this->uri->segment(1)=='log' and $this->uri->segment(2)=='signlog'){ ?> active<?php } ?>">
                             <a href="<?php echo base_url('log/signlog');?>" class="dropdown-item"> SignIn
                                 log </a>
                             <a href="<?php echo base_url('log/accesslog');?>" class="dropdown-item"> Access
                                 log </a>
                         </div>
                     </div>
             </div>
             <div class="dropdown-menu-column">
                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='log' and $this->uri->segment(2)=='user'){ ?> active<?php } ?>"
                             href="<?php echo base_url('log/user');?>"> User log</a> -->

                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='log' and $this->uri->segment(2)=='historylog'){ ?> active<?php } ?>"
                                 href="<?php echo base_url('log/historylog');?>"> History log</a> -->

             </div>
         </div>
     </div>

 </li>
 <?php #####Layout######## ?>