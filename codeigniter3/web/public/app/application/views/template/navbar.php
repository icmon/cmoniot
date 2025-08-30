<?php 
$language = $this->lang->language;
$lang=$this->lang->line('lang');
$langs=$this->lang->line('langs');
$dashboard=$this->lang->line('dashboard');
$welcome=$this->lang->line('welcome');
$settings=$this->lang->line('settings');
$preview=$this->lang->line('preview');
$website=$this->lang->line('website');
$profile=$this->lang->line('profile');
$logout=$this->lang->line('logout'); 
$urlnodered=$this->config->item('urlnodered');
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
// echo '<pre> _COOKIE=>'; print_r($_COOKIE); echo '</pre>';  
$uid_sess=@$_SESSION['uid'];
$username_sess=@$_SESSION['username'];
$email_sess=@$_SESSION['email'];
$token=@$_SESSION['token']; 
$uid_api=@$_SESSION['uid_api'];
$role_id=@$_SESSION['role_id'];
$username=@$_SESSION['username'];
$firstname_api=@$_SESSION['firstname_api'];
$lastname_api=@$_SESSION['lastname_api'];
$role_id_api=@$_SESSION['role_id_api'];
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
//echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';   die(); 

$avatars=base_url('assets/img/cmon.png');
//echo '<pre> username_sess=>'; print_r($username_sess); echo '</pre>';  
if(@$username_sess){
 $display_name=$username_sess;
}else{
   $display_name='Cmon';  
} 
$position='Cmon user';
$pagewrapper_seeting=0;
@session_start();
$layout_sess=@$_SESSION['layout'];
if($layout_sess==''){
  $layout='fluid';
}else if($layout_sess=='0'){
  $layout='fluid';
}else if($layout_sess=='1'){
  $layout='fluid';
}else if($layout_sess=='2'){
  $layout='boxed';
}else if($layout_sess=='3'){
  $layout='';
}else if($layout_sess=='3'){
  $layout='';
}
?>
<?php if($layout==''){?>

<body>
    <?php }else{?>

    <body class="layout-<?php echo $layout;?>">
        <?php }?>
        <!-- BEGIN GLOBAL THEME SCRIPT -->
        <script src="<?php echo base_url('assets');?>/dist/js/tabler-theme.js"></script>
        <!-- END GLOBAL THEME SCRIPT -->
        <div class="page">
            <!-- BEGIN NAVBAR  -->
            <?php /*------------------------NAVBAR ------------------------ */?>
            <header class="navbar navbar-expand-md d-print-none">
                <div class="container-xl">
                    <!-- BEGIN NAVBAR TOGGLER -->
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"
                        aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <!-- END NAVBAR TOGGLER -->

                    <!-- BEGIN NAVBAR LOGO -->
                    <?php # echo base_url('assets/img/logo/logo-dark.png');?>
                    <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <img src="<?php echo base_url('assets/img/logo/logo-dark.png');?>" width="80" height="15"
                            viewBox="0 0 232 68" class="navbar-brand-image">
                        <!-- <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="110" height="32" viewBox="0 0 232 68"
                            class="navbar-brand-image">
                            <path
                                d="M64.6 16.2C63 9.9 58.1 5 51.8 3.4 40 1.5 28 1.5 16.2 3.4 9.9 5 5 9.9 3.4 16.2 1.5 28 1.5 40 3.4 51.8 5 58.1 9.9 63 16.2 64.6c11.8 1.9 23.8 1.9 35.6 0C58.1 63 63 58.1 64.6 51.8c1.9-11.8 1.9-23.8 0-35.6zM33.3 36.3c-2.8 4.4-6.6 8.2-11.1 11-1.5.9-3.3.9-4.8.1s-2.4-2.3-2.5-4c0-1.7.9-3.3 2.4-4.1 2.3-1.4 4.4-3.2 6.1-5.3-1.8-2.1-3.8-3.8-6.1-5.3-2.3-1.3-3-4.2-1.7-6.4s4.3-2.9 6.5-1.6c4.5 2.8 8.2 6.5 11.1 10.9 1 1.4 1 3.3.1 4.7zM49.2 46H37.8c-2.1 0-3.8-1-3.8-3s1.7-3 3.8-3h11.4c2.1 0 3.8 1 3.8 3s-1.7 3-3.8 3z"
                                fill="#066fd1" style="fill: var(--tblr-primary, #066fd1)" />
                            <path
                                d="M105.8 46.1c.4 0 .9.2 1.2.6s.6 1 .6 1.7c0 .9-.5 1.6-1.4 2.2s-2 .9-3.2.9c-2 0-3.7-.4-5-1.3s-2-2.6-2-5.4V31.6h-2.2c-.8 0-1.4-.3-1.9-.8s-.9-1.1-.9-1.9c0-.7.3-1.4.8-1.8s1.2-.7 1.9-.7h2.2v-3.1c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v3.1h3.4c.8 0 1.4.3 1.9.8s.8 1.2.8 1.9-.3 1.4-.8 1.8-1.2.7-1.9.7h-3.4v13c0 .7.2 1.2.5 1.5s.8.5 1.4.5c.3 0 .6-.1 1.1-.2.5-.2.8-.3 1.2-.3zm28-20.7c.8 0 1.5.3 2.1.8.5.5.8 1.2.8 2.1v20.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2-.8-.8-1.2-.8-2.1c-.8.9-1.9 1.7-3.2 2.4-1.3.7-2.8 1-4.3 1-2.2 0-4.2-.6-6-1.7-1.8-1.1-3.2-2.7-4.2-4.7s-1.6-4.3-1.6-6.9c0-2.6.5-4.9 1.5-6.9s2.4-3.6 4.2-4.8c1.8-1.1 3.7-1.7 5.9-1.7 1.5 0 3 .3 4.3.8 1.3.6 2.5 1.3 3.4 2.1 0-.8.3-1.5.8-2.1.5-.5 1.2-.7 2-.7zm-9.7 21.3c2.1 0 3.8-.8 5.1-2.3s2-3.4 2-5.7-.7-4.2-2-5.8c-1.3-1.5-3-2.3-5.1-2.3-2 0-3.7.8-5 2.3-1.3 1.5-2 3.5-2 5.8s.6 4.2 1.9 5.7 3 2.3 5.1 2.3zm32.1-21.3c2.2 0 4.2.6 6 1.7 1.8 1.1 3.2 2.7 4.2 4.7s1.6 4.3 1.6 6.9-.5 4.9-1.5 6.9-2.4 3.6-4.2 4.8c-1.8 1.1-3.7 1.7-5.9 1.7-1.5 0-3-.3-4.3-.9s-2.5-1.4-3.4-2.3v.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.5-.8-1.2-.8-2.1V18.9c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v10c.8-1 1.8-1.8 3.2-2.5 1.3-.7 2.8-1 4.3-1zm-.7 21.3c2 0 3.7-.8 5-2.3s2-3.5 2-5.8-.6-4.2-1.9-5.7-3-2.3-5.1-2.3-3.8.8-5.1 2.3-2 3.4-2 5.7.7 4.2 2 5.8c1.3 1.6 3 2.3 5.1 2.3zm23.6 1.9c0 .8-.3 1.5-.8 2.1s-1.3.8-2.1.8-1.5-.3-2-.8-.8-1.3-.8-2.1V18.9c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v29.7zm29.3-10.5c0 .8-.3 1.4-.9 1.9-.6.5-1.2.7-2 .7h-15.8c.4 1.9 1.3 3.4 2.6 4.4 1.4 1.1 2.9 1.6 4.7 1.6 1.3 0 2.3-.1 3.1-.4.7-.2 1.3-.5 1.8-.8.4-.3.7-.5.9-.6.6-.3 1.1-.4 1.6-.4.7 0 1.2.2 1.7.7s.7 1 .7 1.7c0 .9-.4 1.6-1.3 2.4-.9.7-2.1 1.4-3.6 1.9s-3 .8-4.6.8c-2.7 0-5-.6-7-1.7s-3.5-2.7-4.6-4.6-1.6-4.2-1.6-6.6c0-2.8.6-5.2 1.7-7.2s2.7-3.7 4.6-4.8 3.9-1.7 6-1.7 4.1.6 6 1.7 3.4 2.7 4.5 4.7c.9 1.9 1.5 4.1 1.5 6.3zm-12.2-7.5c-3.7 0-5.9 1.7-6.6 5.2h12.6v-.3c-.1-1.3-.8-2.5-2-3.5s-2.5-1.4-4-1.4zm30.3-5.2c1 0 1.8.3 2.4.8.7.5 1 1.2 1 1.9 0 1-.3 1.7-.8 2.2-.5.5-1.1.8-1.8.7-.5 0-1-.1-1.6-.3-.2-.1-.4-.1-.6-.2-.4-.1-.7-.1-1.1-.1-.8 0-1.6.3-2.4.8s-1.4 1.3-1.9 2.3-.7 2.3-.7 3.7v11.4c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.6-.8-1.3-.8-2.1V28.8c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v.6c.7-1.3 1.8-2.3 3.2-3 1.3-.7 2.8-1 4.3-1z"
                                fill-rule="evenodd" clip-rule="evenodd" fill="#4a4a4a" />
                        </svg></a> -->
                    </div>
                    <div class="navbar-nav flex-row order-md-last">
                        <?php  
                    $this->load->view('template/navbar_item');
                    ?>
                        <div class="d-none d-md-flex">
                            <?php 
						$this->load->view('template/navbar_changetheme');
						#$this->load->view('template/navbar_notifications');
						//$this->load->view('template/navbar_app');
						// $this->load->view('template/navbar_lang');
                        $this->load->view('template/navbar_theme');
						?>
                        </div>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown"
                                aria-label="Open user menu">
                                <span class="avatar avatar-sm" style="background-image: url(<?php echo $avatars;?>)">

                                </span>

                                <div class="d-none d-xl-block ps-2">
                                    <div><?php echo $display_name;?></div>
                                    <div class="mt-1 small text-secondary"><?php echo $position;?> </div>
                                </div>

                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <a href="<?php echo base_url('dashboard');?>" class="dropdown-item">
                                    <?php echo $this->lang->line('overview'); ?></a>
                                <a href="<?php echo base_url('user/profile');?>"
                                    class="dropdown-item"><?php echo $this->lang->line('profile'); ?></a>
                                <a href="<?php echo base_url('log/history');?>" class="dropdown-item">History log </a>
                                <div class="dropdown-divider"></div>
                                <a href="<?php echo base_url('settings');?>"
                                    class="dropdown-item"><?php echo $this->lang->line('settings'); ?></a>
                                <a href="<?php echo base_url('user/logout'); ?>" class="dropdown-item" id="logout-link">
                                    <?php echo $this->lang->line('logout'); ?>
                                </a>

                                <div class="dropdown-divider"></div>
                                <a href="<?php echo base_url();?>/lang/language?lang=english&uri=<?php print(uri_string()).'?uid='.@@$input['uid']; ?>"
                                    class="dropdown-item">
                                    <img src="<?=base_url()?>/assets/lang/en.png" onClick="lanfTrans('en');" height="25"
                                        title="<?php  echo $this->lang->line('english');?>"> English </a>
                                <a href="<?php echo base_url();?>/lang/language?lang=thai&uri=<?php print(uri_string()).'?uid='.@@$input['uid'];  ?>"
                                    class="dropdown-item">
                                    <img src="<?=base_url()?>/assets/lang/th.png" onClick="lanfTrans('th');" height="25"
                                        title="<?php  echo $this->lang->line('thai');?>"> Thai </a>

                            </div>
                        </div>
                    </div>

                </div>
            </header>
            <?php /*------------------------NAVBAR ------------------------ */?>
            <style>
            .confirm-btn {
                background-color: #e53935;
                /* สีแดง */
                color: #fff;
            }
            </style>
            <script src="<?php echo base_url('assets/sweetalert2/npm/sweetalert211.js');?>"></script>
            <link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>">
            <script>
            document.addEventListener('DOMContentLoaded', function() {
                var logoutBtn = document.getElementById('logout-link');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault(); // ยกเลิกการทำงานปกติของลิงก์

                        Swal.fire({
                            title: "<?php echo $this->lang->line('logout'); ?>",
                            text: "<?php echo $this->lang->line('areyousure'); ?>",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: '<?php echo $this->lang->line('menu_set_confirm'); ?>',
                            cancelButtonText: '<?php echo $this->lang->line('menu_set_cancel');?>',
                            confirmButtonColor: '#e53935', // สีแดง
                            cancelButtonColor: '#310FF0FF' // สีเทา (ถ้าต้องการ)
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "<?php echo base_url('user/logout'); ?>";
                            }
                        });
                    });
                }
            });
            </script>

            <?php  $this->load->view('template/theme_setting'); ?>
            <?php /*-------------NAVBAR ---------------------- */?>
            <!-- END NAVBAR  -->
            <!-- END PAGE HEADER -->