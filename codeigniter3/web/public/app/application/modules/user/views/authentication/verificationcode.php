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
$base_url=$this->config->item('base_url');
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
<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <title><?php echo $titleweb;?></title>
    <link rel="shortcut icon" href="<?php echo base_url('assets/favicon.ico'); ?>" />


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
    <style>
    @import url('<?php echo base_url('assets');?>/inter/inter.css');
    </style>
    <!-- END CUSTOM FONT -->
</head>

<body>
    <!-- BEGIN GLOBAL THEME SCRIPT -->
    <script src="<?php echo base_url('assets');?>/dist/js/tabler-theme.js"></script>
    <!-- END GLOBAL THEME SCRIPT -->

    <div class="page page-center">
        <div class="container container-tight py-4">

            <div class="text-center mb-4  navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                <a href="<?php echo base_url('/main');?>">
                    <img src="<?php echo base_url('assets/img/logo/logo-dark.png');?>" width="80" height="15"
                        viewBox="0 0 232 68" class="navbar-brand-image"></a>
            </div>
            <div class="text-center">
                <a href="<?php echo $base_url;?>/lang/language?lang=english&uri=<?php print(uri_string()); ?>"> <img
                        src="<?=base_url()?>/assets/lang/en.png" onClick="lanfTrans('en');" height="25"
                        title="<?php  echo $this->lang->line('english');?>"> </a> <a
                    href="<?php echo $base_url;?>/lang/language?lang=thai&uri=<?php print(uri_string()); ?>"><img
                        src="<?=base_url()?>/assets/lang/th.png" onClick="lanfTrans('th');" height="25"
                        title="<?php  echo $this->lang->line('thai');?>"> </a>
            </div>

            <form class="card card-md" action="<?php echo base_url('user/verificationcodedb');?>" method="post"
                autocomplete="off" novalidate>
                <div class="card-body">
                    <h2 class="card-title card-title-lg text-center mb-4">Authenticate Your Account</h2>

                    <p class="my-4 text-center">Please confirm your account by entering the authorization code sent to
                        <strong>xxx</strong>.
                    </p>

                    <div class="my-5">
                        <div class="row g-4">

                            <input type="text" name="code" class="form-control" placeholder="code" autocomplete="off">

                        </div>
                    </div>

                    <div class="my-4">
                        <label class="form-check">
                            <input type="checkbox" class="form-check-input" />
                            Dont't ask for codes again on this device
                        </label>
                    </div>

                    <div class="form-footer">
                        <div class="btn-list flex-nowrap">

                            <a href="<?php echo base_url('user/signin');?>" class="btn btn-3 w-100">

                                Cancel

                            </a>

                            <button type="submit" class="btn btn-primary btn-3 w-100">Verify</button>
                        </div>


                    </div>
                </div>
        </div>
        </form>

        <div class="text-center text-secondary mt-3">
            It may take a minute to receive your code. Haven't received it? <a
                href="<?php echo base_url('user/signin');?>">Resend a new code.</a>
        </div>

    </div>
    </div>

    <div class="settings">
        <a href="#" class="btn btn-floating btn-icon btn-primary" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSettings">
            <!-- Download SVG icon from http://tabler.io/icons/icon/brush -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-1">
                <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
                <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
                <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
                <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
            </svg>
        </a>

        <form class="offcanvas offcanvas-start offcanvas-narrow" tabindex="-1" id="offcanvasSettings">
            <div class="offcanvas-header">
                <h2 class="offcanvas-title">Theme Builder</h2>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column">
                <div>
                    <div class="mb-4">
                        <label class="form-label">Color mode</label>
                        <p class="form-hint">Choose the color mode for your app.</p>

                        <label class="form-check">
                            <div class="form-selectgroup-item">
                                <input type="radio" name="theme" value="light" class="form-check-input" checked />
                                <div class="form-check-label">Light</div>
                            </div>
                        </label>

                        <label class="form-check">
                            <div class="form-selectgroup-item">
                                <input type="radio" name="theme" value="dark" class="form-check-input" />
                                <div class="form-check-label">Dark</div>
                            </div>
                        </label>

                    </div>

                    <div class="mb-4">
                        <label class="form-label">Color scheme</label>
                        <p class="form-hint">The perfect color mode for your app.</p>

                        <div class="row g-2">

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="blue"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-blue"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="azure"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-azure"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="indigo"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-indigo"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="purple"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-purple"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="pink"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-pink"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="red"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-red"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="orange"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-orange"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="yellow"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-yellow"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="lime"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-lime"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="green"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-green"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="teal"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-teal"></span>
                                </label>
                            </div>

                            <div class="col-auto">
                                <label class="form-colorinput">
                                    <input name="theme-primary" type="radio" value="cyan"
                                        class="form-colorinput-input" />
                                    <span class="form-colorinput-color bg-cyan"></span>
                                </label>
                            </div>

                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label">Font family</label>
                        <p class="form-hint">Choose the font family that fits your app.</p>

                        <div>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-font" value="sans-serif" class="form-check-input"
                                        checked />
                                    <div class="form-check-label">Sans-serif</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-font" value="serif" class="form-check-input" />
                                    <div class="form-check-label">Serif</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-font" value="monospace" class="form-check-input" />
                                    <div class="form-check-label">Monospace</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-font" value="comic" class="form-check-input" />
                                    <div class="form-check-label">Comic</div>
                                </div>
                            </label>

                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label">Theme base</label>
                        <p class="form-hint">Choose the gray shade for your app.</p>

                        <div>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-base" value="slate" class="form-check-input" />
                                    <div class="form-check-label">Slate</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-base" value="gray" class="form-check-input"
                                        checked />
                                    <div class="form-check-label">Gray</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-base" value="zinc" class="form-check-input" />
                                    <div class="form-check-label">Zinc</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-base" value="neutral" class="form-check-input" />
                                    <div class="form-check-label">Neutral</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-base" value="stone" class="form-check-input" />
                                    <div class="form-check-label">Stone</div>
                                </div>
                            </label>

                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label">Corner Radius</label>
                        <p class="form-hint">
                            Choose the border radius factor for your app.
                        </p>

                        <div>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-radius" value="0" class="form-check-input" />
                                    <div class="form-check-label">0</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-radius" value="0.5" class="form-check-input" />
                                    <div class="form-check-label">0.5</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-radius" value="1" class="form-check-input"
                                        checked />
                                    <div class="form-check-label">1</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-radius" value="1.5" class="form-check-input" />
                                    <div class="form-check-label">1.5</div>
                                </div>
                            </label>

                            <label class="form-check">
                                <div class="form-selectgroup-item">
                                    <input type="radio" name="theme-radius" value="2" class="form-check-input" />
                                    <div class="form-check-label">2</div>
                                </div>
                            </label>

                        </div>
                    </div>
                </div>

                <div class="mt-auto space-y">
                    <button type="button" class="btn w-100" id="reset-changes">
                        <!-- Download SVG icon from http://tabler.io/icons/icon/rotate -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-1">
                            <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
                        </svg>
                        Reset changes
                    </button>
                    <a href="#" class="btn btn-primary w-100" data-bs-dismiss="offcanvas">
                        <!-- Download SVG icon from http://tabler.io/icons/icon/settings -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-1">
                            <path
                                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        </svg>
                        Save settings
                    </a>
                </div>

            </div>
        </form>
    </div>

    <!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
    <script src="<?php echo base_url('assets');?>/dist/js/tabler.js" defer></script>
    <!-- END GLOBAL MANDATORY SCRIPTS -->

    <!-- BEGIN DEMO SCRIPTS -->
    <script src="<?php echo base_url('assets');?>/preview/js/demo.js" defer></script>
    <!-- END DEMO SCRIPTS -->

    <!-- BEGIN PAGE SCRIPTS -->
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        var inputs = document.querySelectorAll('[data-code-input]');
        // Attach an event listener to each input element
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('input', function(e) {
                // If the input field has a character, and there is a next input field, focus it
                if (e.target.value.length === e.target.maxLength && i + 1 < inputs.length) {
                    inputs[i + 1].focus();
                }
            });
            inputs[i].addEventListener('keydown', function(e) {
                // If the input field is empty and the keyCode for Backspace (8) is detected, and there is a previous input field, focus it
                if (e.target.value.length === 0 && e.keyCode === 8 && i > 0) {
                    inputs[i - 1].focus();
                }
            });
        }
    });
    </script>

    <script>
    document.addEventListener("DOMContentLoaded", function() {
        var themeConfig = {
            theme: "light",
            "theme-base": "gray",
            "theme-font": "sans-serif",
            "theme-primary": "blue",
            "theme-radius": "1",
        }
        var url = new URL(window.location)
        var form = document.getElementById("offcanvasSettings")
        var resetButton = document.getElementById("reset-changes")
        var checkItems = function() {
            for (var key in themeConfig) {
                var value = window.localStorage["tabler-" + key] || themeConfig[key]
                if (!!value) {
                    var radios = form.querySelectorAll(`[name="${key}"]`)
                    if (!!radios) {
                        radios.forEach((radio) => {
                            radio.checked = radio.value === value
                        })
                    }
                }
            }
        }
        form.addEventListener("change", function(event) {
            var target = event.target,
                name = target.name,
                value = target.value
            for (var key in themeConfig) {
                if (name === key) {
                    document.documentElement.setAttribute("data-bs-" + key, value)
                    window.localStorage.setItem("tabler-" + key, value)
                    url.searchParams.set(key, value)
                }
            }
            window.history.pushState({}, "", url)
        })
        resetButton.addEventListener("click", function() {
            for (var key in themeConfig) {
                var value = themeConfig[key]
                document.documentElement.removeAttribute("data-bs-" + key)
                window.localStorage.removeItem("tabler-" + key)
                url.searchParams.delete(key)
            }
            checkItems()
            window.history.pushState({}, "", url)
        })
        checkItems()
    })
    </script>
    <!-- END PAGE SCRIPTS -->
</body>

</html>