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
?> <li class="nav-item <?php if($this->uri->segment(1)=='user'){ ?> active<?php } ?> dropdown">
     <a class="nav-link dropdown-toggle" href="#navbar-layout" data-bs-toggle="dropdown" data-bs-auto-close="outside"
         role="button" aria-expanded="false">

         <span class="nav-link-icon d-md-none d-lg-inline-block">
             <!-- Download SVG icon from http://tabler.io/icons/icon/layout-2 -->
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="icon icon-tabler icons-tabler-outline icon-tabler-chalkboard-teacher">
                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                 <path d="M8 19h-3a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v11a1 1 0 0 1 -1 1" />
                 <path d="M12 14a2 2 0 1 0 4.001 -.001a2 2 0 0 0 -4.001 .001" />
                 <path d="M17 19a2 2 0 0 0 -2 -2h-2a2 2 0 0 0 -2 2" />
             </svg>
         </span><span class="nav-link-title"> <?php echo $this->lang->line('user_menu');?> </span> </a>

     <div class="dropdown-menu">
         <div class="dropdown-menu-columns">
             <div class="dropdown-menu-column">
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='dashboard'){ ?> active<?php } ?>"
                     href="<?php echo base_url('user/dashboard');?>"> Dashboard </a>

                 <a class="dropdown-item<?php if($this->uri->segment(1)=='user' and ($this->uri->segment(2)=='profile' or  $this->uri->segment(2)=='profileupdate')){ ?> active<?php } ?>"
                     href="<?php echo base_url('user/profile');?>"> Profile </a>
                 <!-- 
                 <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='profilesetting'){ ?> active<?php } ?>"
                     href="<?php echo base_url('user/profilesetting');?>"> Profile setting </a> -->
                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='signinlog'){ ?> active<?php } ?>"
                     href="<?php echo base_url('user/log');?>"> Signinlog</a> -->

                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='userinfo'){ ?> active<?php } ?>"
                             href="<?php echo base_url('user/userinfo');?>"> Userinfo</a> -->

                 <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='accesslog'){ ?> active<?php } ?>"
                     href="<?php echo base_url('user/log/accesslog');?>"> Accesslog</a>


             </div>
             <div class="dropdown-menu-column">

                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='profilelist'){ ?> active<?php } ?>"
                             href="<?php echo base_url('user/profilelist');?>">

                             Profile list

                         </a> -->

                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='signinlog'){ ?> active<?php } ?>"
                     href="<?php echo base_url('user/signinlog');?>"> signinlog</a> -->


                 <!-- <a class="dropdown-item <?php if($this->uri->segment(1)=='user' and $this->uri->segment(2)=='alerts'){ ?> active<?php } ?>"
                             href="<?php echo base_url('user/alerts');?>"> Alerts </a> -->

             </div>
         </div>
     </div>

 </li>