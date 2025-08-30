 <?php 
$urlnodered=$this->config->item('urlnodered');
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$admin_id=0;# 0=>เห็นทุกเมนู
$navbar_fix='';
$breadcrumb_fix='';
$language=$this->lang->language;
$lang=$this->lang->line('lang');
$langs=$this->lang->line('langs');
$dashboard=$this->lang->line('dashboard');
$welcome=$this->lang->line('welcome');
$settings=$this->lang->line('settings');
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
$role_id_api=@$_SESSION['role_id_api'];
if($role_id_api==""){
    $role_id_api=4;
}
$role_id_set=@$input['role_id'];
if($role_id_set){
    $role_id_api=$role_id_set;
}
 
/************************/ 
if(@$input['debug']==2){
    if($role_id_api==1){
            echo '<hr>';
            echo '_COOKIE<pre>';print_r($_COOKIE);echo '</pre>';
            echo '<hr>';
            echo '_SESSION <pre>';print_r($_SESSION);echo '</pre>';
            echo '<hr>'; 
            echo '<br> lang :'.$lang;
            echo '<br> segment1 :'.$segment1;
            echo '<br> segment2 :'.$segment2;
            echo '<br> segment3 :'.$segment3;
            echo '<br> segment4 :'.$segment4;
            echo '<br> segment5 :'.$segment5;
            echo '<br> segment6 :'.$segment6;
            echo '<br> segment7 :'.$segment7;
            echo '<br> segment8 :'.$segment8;
            echo '<br> segment9 :'.$segment9;
            echo '<br> segment10 :'.$segment10;
            echo '<hr>';
    }
}
?>
 <div class="col">
     <!-- BEGIN NAVBAR MENU -->
     <ul class="navbar-nav">
         <?php ######Home####### ?>
         <li class="<?php if($this->uri->segment(1)=='home'){ ?> active<?php } ?> nav-item">
             <a class="nav-link" href="<?php echo base_url('home').'?bucket=BAACTW02';?>">
                 <span class="nav-link-icon d-md-none d-lg-inline-block">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="icon icon-tabler icons-tabler-outline icon-tabler-home-search">
                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                         <path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4.7" />
                         <path d="M9 21v-6a2 2 0 0 1 2 -2h2" />
                         <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                         <path d="M20.2 20.2l1.8 1.8" />
                     </svg>
                 </span>
                 <span class="nav-link-title"><?php echo  $this->lang->line('home');?></span>
             </a>
         </li>
         <?php $this->load->view('template/navbar_menu_dashboard');?>
         <?php #$this->load->view('template/navbar_menu_log');?>
         <?php  
            if($role_id_api==1){
                $this->load->view('template/navbar_menu_setting_dev');
                $this->load->view('template/navbar_menu_user_dev'); 
                $this->load->view('template/navbar_menu_help');
            }else if($role_id_api==2){
                $this->load->view('template/navbar_menu_setting_admin');
                $this->load->view('template/navbar_menu_user_admin'); 
                $this->load->view('template/navbar_menu_help');
            }else if($role_id_api==3){
                $this->load->view('template/navbar_menu_setting_user');
                $this->load->view('template/navbar_menu_user'); 
                $this->load->view('template/navbar_menu_help');
            }else if($role_id_api>=4){
                $this->load->view('template/navbar_menu_setting_enduser');
                $this->load->view('template/navbar_menu_enduser'); 
                $this->load->view('template/navbar_menu_help');
            } 
         ?>
         <?php #$this->load->view('template/navbar_menu_other');?>
     </ul>
     <!-- END NAVBAR MENU -->
 </div>