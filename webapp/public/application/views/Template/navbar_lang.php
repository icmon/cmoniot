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
  ?>
  <div class="nav-item dropdown d-none d-md-flex">
      <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications"
          data-bs-auto-close="outside" aria-expanded="false">
          <?php echo $lang_name;?>
      </a>


      <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
          <div class="card">
              <div class="list-group list-group-flush list-group-hoverable">
                  <div class="list-group-item">
                      <div class="row align-items-center">
                          <div class="col-auto">
                              <a href="<?php echo $base_url;?>/lang/language?lang=thai&uri=<?php print(uri_string()).'?uid='.$input['uid'];; ?>"
                                  class="list-group-item-actions show">
                                  <span class="demo-icons-list-item" title="Thailand" data-bs-toggle="tooltip"
                                      data-bs-placement="top">
                                      <span class="flag flag-country-th"> </span>
                                  </span>
                              </a>
                          </div>
                      </div>
                  </div>
                  <div class="list-group-item">
                      <div class="row align-items-center">
                          <div class="col-auto">
                              <a href="<?php echo $base_url;?>/lang/language?lang=english&uri=<?php print(uri_string()).'?uid='.$input['uid'];;  ?>"
                                  class="list-group-item-actions show">
                                  <span class="demo-icons-list-item" title="United States of America"
                                      data-bs-toggle="tooltip" data-bs-placement="top">
                                      <span class="flag flag-country-us"></span>
                                  </span>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </div>