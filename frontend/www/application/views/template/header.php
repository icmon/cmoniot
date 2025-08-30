<?php 
ini_set('max_execution_time', 31536000000);
set_time_limit(31536000000);
$urlnodered=$this->config->item('urlnodered');
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
ob_end_flush();
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
@session_start();
$layout_sess=@$_SESSION['layout'];
if($layout_sess==''){
  $_SESSION['layout']='0';
  $layout='fluid';
}else if($layout_sess=='1'){
  $_SESSION['layout']='1';
  $layout='fluid';
}else if($layout_sess=='2'){
  $_SESSION['layout']='2';
  $layout='boxed';
}else if($layout_sess=='3'){
  $_SESSION['layout']='3';
  $layout='';
}
$role_id_api=@$_SESSION['role_id_api'];
if($role_id_api==""){
    $role_id_api=4;
}
if(@@@$input['debug']==1){
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
<script type="text/javascript" src="<?php echo base_url('assets/sweetalert2/dist/js/jquery-latest.js');?>"></script>
<script src="<?php echo base_url('assets/sweetalert2/dist/sweetalert-dev.js');?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>">
<?php
$token=$_SESSION['token'];
if(!$token){
  	// $title=$language['logout'];
		// $msgst=$language['logout'];  
  	// $urldirec=base_url('/signin');
		// 			//echo '<pre> 2 OK $urldirec=>'; print_r($urldirec); echo '</pre>';  die();
		// 			echo'<script>
		// 							$( document ).ready(function() {
		// 								//////////////////
		// 								swal({
		// 								title: " '.$title.'",
		// 								text: "'.$msgst.'",
		// 								timer: 1000,
		// 								showConfirmButton: false
		// 								}, function(){
		// 											setTimeout(function() {
		// 												// Javascript URL redirection
		// 												window.location.replace("'.base_url('signin').'");
		// 											}, 200);
		// 							});
		// 								//////////////////
		// 							});
		// </script>'; 
	  // redirect(base_url('/signin')); die();
}
$token=@$_SESSION['token'];
if(!@$_SESSION['role_id_api']){
    $api_url= $this->config->item('api_url');
    $api_auth_users_profile= $this->config->item('api_auth_users_profile');
    $api_call=$api_url.$api_auth_users_profile;
    $rsapi=$this->Crul_model->call_api_with_token($api_call,$token);
    if($rsapi){
        $rs_api=$rsapi['payload'];
        $uid_api=@$rs_api['uid'];
        $role_id=@$rs_api['role_id'];
        //echo '<pre> role_id=>'; print_r($role_id); echo '</pre>'; 
        $email_api=@$rs_api['email'];
        $username_api=@$rs_api['username'];
        $firstname_api=@$rs_api['firstname'];
        $lastname_api=@$rs_api['lastname'];
        $fullname_api=@$rs_api['fullname'];
        $nickname_api=@$rs_api['nickname'];
        $active_status_api=@$rs_api['active_status'];
        $refresh_token=@$rs_api['refresh_token'];
        $refresh_message=@$rs_api['message'];
        $idcard_api=@$rs_api['idcard'];
        if($uid_api){@$_SESSION['uid_api']=$uid_api;}
        $_SESSION['role_id_api']=$role_id;
        $_SESSION['firstname_api']=$firstname_api;
        $_SESSION['lastname_api']=$lastname_api;
        // echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
        // echo '<pre> rs_api=>'; print_r($rs_api); echo '</pre>';   die(); 
    }
}
$uid_api_1=@$_SESSION['uid_api'];
$role_id_1=@$_SESSION['role_id'];
$username_1=@$_SESSION['username'];
$firstname_api_1=@$_SESSION['firstname_api'];
$lastname_api_1=@$_SESSION['lastname_api'];
$role_id_api_1=@$_SESSION['role_id_api'];
 
function randomNDigitNumber($digits){
  $returnString = mt_rand(1, 9);
  while (strlen($returnString) < $digits) {
    $returnString .= mt_rand(0, 9);
  }
  return $returnString;
}
$rad=randomNDigitNumber(12);
?>
<!doctype html>
<html lang="<?php echo $lang;?>">
<?php /*------------------------html ------------------------ */?>
<?php /*------------------------head ------------------------ */?>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><?php echo $titleweb;?></title>
    <link rel="shortcut icon" href="<?php echo base_url('assets/favicon.ico'); ?>" />
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<?php echo base_url('assets');?>/libs/jsvectormap/dist/jsvectormap.css?<?php echo $rad;?>"
        rel="stylesheet" />
    <!-- END PAGE LEVEL STYLES -->
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="<?php echo base_url('assets');?>/dist/css/tabler.css?<?php echo $rad;?>" rel="stylesheet" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PLUGINS STYLES -->
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-flags.css?<?php echo $rad;?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-socials.css?<?php echo $rad;?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-payments.css?<?php echo $rad;?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-vendors.css?<?php echo $rad;?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-marketing.css?<?php echo $rad;?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-themes.css?<?php echo $rad;?>" rel="stylesheet" />
    <!-- END PLUGINS STYLES -->
    <!-- BEGIN DEMO STYLES -->
    <link href="<?php echo base_url('assets');?>/preview/css/demo.css?<?php echo $rad;?>" rel="stylesheet" />
    <!-- END DEMO STYLES -->
    <!-- BEGIN CUSTOM FONT -->
    <!--  @import url('https://rsms.me/inter/inter.css'); -->
    <style>
    @import url('<?php echo base_url('assets');?>/inter/inter.css');
    </style>
    <!-- END CUSTOM FONT -->
</head>
<?php /*------------------------head ------------------------ */?>
<?php 
	$this->load->view('template/navbar');
?>