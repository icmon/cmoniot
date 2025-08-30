<?php 
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
/************************/
function randomNDigitNumber($digits){
  $returnString = mt_rand(1, 9);
  while (strlen($returnString) < $digits) {
    $returnString .= mt_rand(0, 9);
  }
  return $returnString;
}
$rad=randomNDigitNumber(12);
?>
<?php
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
if($this->uri->segment(1)=='userlogs'){ }
$base_url=base_url();
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Cmon IO</title>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="<?php echo base_url('assets');?>/dist/css/tabler.css" rel="stylesheet" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PLUGINS STYLES -->
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-flags.css" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-socials.css" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-payments.css" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-vendors.css" rel="stylesheet" />
    <link href="<?php echo base_url('assets');?>/dist/css/tabler-marketing.css" rel="stylesheet" />
    <!-- END PLUGINS STYLES -->
    <!-- BEGIN DEMO STYLES -->
    <link href="<?php echo base_url('assets');?>/preview/css/demo.css" rel="stylesheet" />
    <!-- END DEMO STYLES -->

    <!-- BEGIN CUSTOM FONT -->
    <!-- <style>
    @import url('https://rsms.me/inter/inter.css');
    </style> -->
    <style>
    @import url('<?php echo base_url('assets');?>/inter/inter.css');
    </style>
    <!-- END CUSTOM FONT -->
</head>

<body class=" body-marketing body-gradient">
    <!-- BEGIN GLOBAL THEME SCRIPT -->
    <script src="<?php echo base_url('assets');?>/dist/js/tabler-theme.js"></script>
    <!-- END GLOBAL THEME SCRIPT -->

    <?php
$this->load->view('Templatefrontend/navbar');
?>