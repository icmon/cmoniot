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
$avatars=base_url('assets/img/cmon.png');
$display_name='Cmon';
$position='Noc';
?>
<header class="navbar navbar-expand-lg navbar-transparent py-3">
    <div class="container">
        <!-- BEGIN NAVBAR LOGO --><a href="<?php echo base_url();?>" class="navbar-brand navbar-brand-autodark">
            <img src="<?php echo base_url('assets/img/logo/logo-dark.png');?>" width="80" height="15"></a>
        <!-- END NAVBAR LOGO -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <nav class="navbar-nav ms-auto">
                <div class="nav-item">
                    <a class="nav-link active" href="<?php echo base_url('/main');?>"><span
                            class="nav-link-title"><?php echo $this->lang->line('home');?></span></a>
                </div>

                <div class="nav-item">
                    <a class="nav-link" href="<?php echo base_url('pricecing');?>"><span
                            class="nav-link-title"><?php echo $this->lang->line('menu_pricecing');?></span></a>
                </div>
                <div class="nav-item">
                    <a class="nav-link" href="<?php echo base_url('about');?>"><span
                            class="nav-link-title"><?php echo $this->lang->line('menu_aboutus');?></span></a>
                </div>
                <div class="nav-item">
                    <a class="nav-link" href="<?php echo base_url('sulution');?>"><span
                            class="nav-link-title"><?php echo $this->lang->line('menu_sulution');?></span></a>
                </div>
                <div>
                    <a href="<?php echo base_url();?>/lang/language?lang=english&uri=<?php print(uri_string()); ?>">
                        <img src="<?php echo base_url();?>/assets/lang/en.png" onClick="lanfTrans('en');" height="25"
                            title="<?php  echo $this->lang->line('english');?>"> </a> <a
                        href="<?php echo base_url();?>/lang/language?lang=thai&uri=<?php print(uri_string()); ?>"><img
                            src="<?php echo base_url();?>/assets/lang/th.png" onClick="lanfTrans('th');" height="25"
                            title="<?php  echo $this->lang->line('thai');?>"> </a>
                </div>
                <div class="nav-item ms-4">
                    <a href="<?php echo base_url('user/signin');?>" class="btn btn-primary">Demo now</a>
                </div>

            </nav>
        </div>
    </div>
</header>