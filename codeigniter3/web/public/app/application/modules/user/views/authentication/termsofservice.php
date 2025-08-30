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
    @import url('https://rsms.me/inter/inter.css');
    </style>
    <!-- END CUSTOM FONT -->
</head>

<body>
    <!-- BEGIN GLOBAL THEME SCRIPT -->
    <script src="<?php echo base_url('assets');?>/dist/js/tabler-theme.js"></script>
    <!-- END GLOBAL THEME SCRIPT -->

    <div class="page page-center">
        <div class="container container-narrow py-4">

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
            <div class="card card-md">
                <div class="card-body">
                    <h3 class="card-title"></h3>
                    <div class="markdown">

                        <p>We (the folks at Cmon) run a website hosting platform called <a href="#">Cmon.io</a> and
                            would love for you to use it. Cmon.io's
                            basic service is free, and we offer paid upgrades for advanced features. Our service is
                            designed to give you as much control and ownership over what goes on your website as
                            possible. However, be responsible in what you publish. In particular, make sure that none of
                            the prohibited items (like spam, viruses, or serious threats of violence) appear in your
                            content.</p>
                        <hr>
                        <p>The following terms and conditions govern all use of the Cmon.io website and all content,
                            services, and products available at or through the website. Our Services are offered subject
                            to your acceptance without modification of all of the terms and conditions contained herein
                            and all other operating rules, policies (including, without limitation, <a href="#">Cmon's
                                Privacy Policy</a> and procedures
                            that may be published from time to time by Cmon (collectively, the &quot;Agreement&quot;).
                            You agree that we may automatically upgrade our Services, and these terms will apply to any
                            upgrades.</p>
                        <p>Please read this Agreement carefully before accessing or using our Services. By accessing or
                            using any part of our services, you agree to become bound by the terms and conditions of
                            this agreement. If you do not agree to all the terms and conditions of this agreement, then
                            you may not access or use any of our services. If these terms and conditions are considered
                            an offer by Cmon, acceptance is expressly limited to these terms.</p>
                        <p>Our Services are not directed to users younger than 16, and access and use of our Services is
                            only offered to users 16 years of age or older. If you are under 16 years old, please do not
                            register to use our Services. Any person who registers as a user or provides their personal
                            information to our Services represents that they are 16 years of age or older. Use of our
                            Services requires a Cmon.io account. You agree to provide us with complete and accurate
                            information when you register for an account. You will be solely responsible and liable for
                            any activity that occurs under your username. You are responsible for keeping your password
                            secure.</p>
                        <h3>1. Cmon.io.</h3>
                        <ul>
                            <li>
                                <p><strong>Responsibility of Contributors.</strong> If you post material to Cmon.io,
                                    post links on Cmon.io, or otherwise make (or allow any third party to make)
                                    material available (any such material, &quot;Content&quot;), you are entirely
                                    responsible for the content of, and any harm resulting from, that Content or your
                                    conduct. That is the case regardless of what form the Content takes, which includes,
                                    but is not limited to text, photo, video, audio, or code. By using Cmon.io, you
                                    represent and warrant that your Content and conduct do not violate these terms. By
                                    submitting Content to Cmon for inclusion on your account, you grant Cmon a
                                    world-wide, royalty-free, and non-exclusive license to reproduce, modify, adapt and
                                    publish the Content solely for the purpose of displaying, distributing, and
                                    promoting your changelog. If you delete Content, Cmon will use reasonable efforts
                                    to remove it from Cmon.io, but you acknowledge that caching or references to the
                                    Content may not be made immediately unavailable. Without limiting any of those
                                    representations or warranties, Cmon has the right (though not the obligation) to,
                                    in Cmon's sole discretion, (i) reclaim your username or website's URL due to
                                    prolonged inactivity, (ii) refuse or remove any content that, in Cmon's reasonable
                                    opinion, violates any Cmon policy or is in any way harmful or objectionable, or
                                    (iii) terminate or deny access to and use of Cmon.io to any individual or entity
                                    for any reason. Cmon will have no obligation to provide a refund of any amounts
                                    previously paid.</p>
                            </li>
                            <li>
                                <p><strong>HTTPS.</strong> We offer free HTTPS on all Cmon.io accounts by default.</p>
                            </li>
                        </ul>
                        <h3>2. Responsibility of Visitors.</h3>
                        <p>Cmon has not reviewed, and cannot review, all of the material, including computer software,
                            posted to our Services, and cannot therefore be responsible for that material's content, use
                            or effects. By operating our Services, Cmon does not represent or imply that it endorses
                            the material there posted, or that it believes such material to be accurate, useful, or
                            non-harmful. You are responsible for taking precautions as necessary to protect yourself and
                            your computer systems from viruses, worms, Trojan horses, and other harmful or destructive
                            content. Our Services may contain content that is offensive, indecent, or otherwise
                            objectionable, as well as content containing technical inaccuracies, typographical mistakes,
                            and other errors. Our Services may also contain material that violates the privacy or
                            publicity rights, or infringes the intellectual property and other proprietary rights, of
                            third parties, or the downloading, copying or use of which is subject to additional terms
                            and conditions, stated or unstated. Cmon disclaims any responsibility for any harm
                            resulting from the use by visitors of our Services, or from any downloading by those
                            visitors of content there posted.</p>
                        <h3>3. Content Posted on Other Websites.</h3>
                        <p>We have not reviewed, and cannot review, all of the material, including computer software,
                            made available through the websites and webpages to which Cmon links, and that link to
                            Cmon. Cmon does not have any control over those non-Cmon websites, and is not
                            responsible for their contents or their use. By linking to a non-Cmon website, Cmon does
                            not represent or imply that it endorses such website. You are responsible for taking
                            precautions as necessary to protect yourself and your computer systems from viruses, worms,
                            Trojan horses, and other harmful or destructive content. Cmon disclaims any responsibility
                            for any harm resulting from your use of non-Cmon websites and webpages.</p>
                        <h3>5. Copyright Infringement and DMCA Policy.</h3>
                        <p>As Cmon asks others to respect its intellectual property rights, it respects the
                            intellectual property rights of others. If you believe that material located on or linked to
                            by Cmon.io violates your copyright, you are encouraged to notify Cmon in accordance with
                            Cmon's Digital Millennium Copyright Act (&quot;DMCA&quot;) Policy. Cmon will respond to
                            all such notices, including as required or appropriate by removing the infringing material
                            or disabling all links to the infringing material. Cmon will terminate a visitor's access
                            to and use of the Website if, under appropriate circumstances, the visitor is determined to
                            be a repeat infringer of the copyrights or other intellectual property rights of Cmon or
                            others. In the case of such termination, Cmon will have no obligation to provide a refund
                            of any amounts previously paid to Cmon.</p>
                        <h3>6. Intellectual Property.</h3>
                        <p>This Agreement does not transfer from Cmon to you any Cmon or third party intellectual
                            property, and all right, title, and interest in and to such property will remain (as between
                            the parties) solely with Cmon. Cmon, Cmon.io, the Cmon.io logo, and all other
                            trademarks, service marks, graphics and logos used in connection with Cmon.io or our
                            Services, are trademarks or registered trademarks of Cmon or Cmon's licensors. Other
                            trademarks, service marks, graphics and logos used in connection with our Services may be
                            the trademarks of other third parties. Your use of our Services grants you no right or
                            license to reproduce or otherwise use any Cmon or third-party trademarks.</p>
                        <h3>7. Changes.</h3>
                        <p>We are constantly updating our Services, and that means sometimes we have to change the legal
                            terms under which our Services are offered. If we make changes that are material, we will
                            let you know by posting on our changelog, or by sending you an email or other communication
                            before the changes take effect. The notice will designate a reasonable period of time after
                            which the new terms will take effect.</p>
                        <h3>8. Disclaimer of Warranties.</h3>
                        <p>Our Services are provided &quot;as is.&quot; Cmon and its suppliers and licensors hereby
                            disclaim all warranties of any kind, express or implied, including, without limitation, the
                            warranties of merchantability, fitness for a particular purpose and non-infringement.
                            Neither Cmon nor its suppliers and licensors, makes any warranty that our Services will be
                            error free or that access thereto will be continuous or uninterrupted.</p>
                        <h3>9. License.</h3>
                        <p>By using Cmon, You are acknowledging that You have read and have agreed to <a href="#">Cmon's
                                License</a>, so please read them
                            carefully.</p>
                        <h3>10. General Representation and Warranty.</h3>
                        <p>You represent and warrant that (i) your use of our Services will be in strict accordance with
                            the Cmon Privacy Policy, with this Agreement, and with all applicable laws and regulations
                            (including without limitation any local laws or regulations in your country, state, city, or
                            other governmental area, regarding online conduct and acceptable content, and including all
                            applicable laws regarding the transmission of technical data exported from the United States
                            or the country in which you reside) and (ii) your use of our Services will not infringe or
                            misappropriate the intellectual property rights of any third party.</p>
                        <h3>12. Refund Policy.</h3>
                        <p>Payments for Cmon are not refundable for any reason.</p>
                        <h3>13. Translation.</h3>
                        <p>These Terms of Service were originally written in English (US). We may translate these terms
                            into other languages. In the event of a conflict between a translated version of these Terms
                            of Service and the English version, the English version will control.</p>

                    </div>
                </div>
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