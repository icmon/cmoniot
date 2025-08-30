<?php
$base_url=base_url();
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
$lang_name=$this->lang->line('lang_name');
######################
if($lang=='th'){
	$langs_th='ภาษาไทย';
	$langs_en='ภาษาอังกถษ';
}else if($lang=='en'){
	$langs_th='Thai';
	$langs_en='English';
}else{
    $lang_name='EN';
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
@session_start();
$layout_sess=@$_SESSION['layout'];
if($layout_sess==''){
  $_SESSION['layout']='0';
  $layout_name='Fluid';
}else if($layout_sess=='1'){
  $_SESSION['layout']='1';
  $layout_name='Fluid';
}else if($layout_sess=='2'){
  $_SESSION['layout']='2';
  $layout_name='Boxed';
}else if($layout_sess=='3'){
  $_SESSION['layout']='3';
  $layout_name='Boxed 2';
}
?>
<script>
function openFullscreen() {
    const elem = document.documentElement; // ทั้งหน้าเว็บ
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // สำหรับ Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // สำหรับ IE11
        elem.msRequestFullscreen();
    }
}
</script>

<div class="nav-item dropdown d-none d-md-flex">
    <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications"
        data-bs-auto-close="outside" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-alt">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 8h4v4h-4z" />
            <path d="M6 4l0 4" />
            <path d="M6 12l0 8" />
            <path d="M10 14h4v4h-4z" />
            <path d="M12 4l0 10" />
            <path d="M12 18l0 2" />
            <path d="M16 5h4v4h-4z" />
            <path d="M18 4l0 1" />
            <path d="M18 9l0 11" />
        </svg><?php #echo $layout_name;?>
        <span class="badge badge-sm bg-orange text-red-fg">Theme </span>
    </a>
    <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
        <div class="card">
            <div class="list-group list-group-flush list-group-hoverable">
                <?php ########################## ?>
                <div class="list-group-item">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="<?php echo $base_url;?>/lang/theme?theme=1&uri=<?php print(uri_string()); ?>"
                                class="list-group-item-actions show">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-autofit-width">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M20.121 12.879a3 3 0 0 0 -4.242 0l-.085 .09l-.083 .094l-.08 .096l-.115 .158a3 3 0 0 0 -.515 1.59l.001 .093h-6.003v-.092a3 3 0 0 0 -5.12 -2.03a.514 .514 0 0 1 -.878 -.363l-.001 -6.515a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.514a.515 .515 0 0 1 -.879 .365" />
                                    <path
                                        d="M11 18a1 1 0 0 1 -1 1h-4.584l1.291 1.293a1 1 0 0 1 .083 1.32l-.083 .094a1 1 0 0 1 -1.414 0l-3 -3a1 1 0 0 1 -.097 -.112l-.071 -.11l-.054 -.114l-.035 -.105l-.03 -.149l-.006 -.117l.003 -.075l.017 -.126l.03 -.111l.044 -.111l.052 -.098l.067 -.096l.08 -.09l3 -3a1 1 0 0 1 1.414 1.414l-1.293 1.293h4.586a1 1 0 0 1 1 1m10.989 -.148l.007 .058l.004 .09l-.003 .075l-.017 .126l-.03 .111l-.044 .111l-.052 .098l-.074 .104l-.073 .082l-3 3a1 1 0 1 1 -1.414 -1.414l1.292 -1.293h-4.585a1 1 0 0 1 0 -2h4.585l-1.292 -1.293a1 1 0 0 1 -.083 -1.32l.083 -.094a1 1 0 0 1 1.414 0l3 3q .054 .053 .097 .112l.071 .11l.054 .114l.035 .105z" />
                                </svg> Fluid
                            </a>
                        </div>
                    </div>
                </div>
                <?php ########################## ?>
                <div class="list-group-item">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="<?php echo $base_url;?>/lang/theme?theme=2&uri=<?php print(uri_string()); ?>"
                                class="list-group-item-actions show">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-minimize">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 9l4 0l0 -4" />
                                    <path d="M3 3l6 6" />
                                    <path d="M5 15l4 0l0 4" />
                                    <path d="M3 21l6 -6" />
                                    <path d="M19 9l-4 0l0 -4" />
                                    <path d="M15 9l6 -6" />
                                    <path d="M19 15l-4 0l0 4" />
                                    <path d="M15 15l6 6" />
                                </svg> Boxed
                            </a>
                        </div>
                    </div>
                </div>
                <?php ########################## ?>
                <div class="list-group-item">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="<?php echo $base_url;?>/lang/theme?theme=3&uri=<?php print(uri_string()); ?>"
                                class="list-group-item-actions show">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-aspect-ratio">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                                    <path d="M7 12v-3h3" />
                                    <path d="M17 12v3h-3" />
                                </svg> Boxed 2
                            </a>
                        </div>
                    </div>
                </div>
                <?php ########################## ?>
                <?php ########################## ?>
                <div class="list-group-item">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="#" onclick="openFullscreen()" class="list-group-item-actions show">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-maximize">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M16 4l4 0l0 4" />
                                    <path d="M14 10l6 -6" />
                                    <path d="M8 20l-4 0l0 -4" />
                                    <path d="M4 20l6 -6" />
                                    <path d="M16 20l4 0l0 -4" />
                                    <path d="M14 14l6 6" />
                                    <path d="M8 4l-4 0l0 4" />
                                    <path d="M4 4l6 6" />
                                </svg> Full Screen
                            </a>
                        </div>
                    </div>
                </div>
                <?php ########################## ?>
            </div>
        </div>

    </div>
</div>