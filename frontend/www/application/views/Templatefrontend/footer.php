<?php 
$admin_id = 0;# 0=>เห็นทุกเมนู
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
$copyright=$this->lang->line('copyright');  
##########################################################################
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
##########################################################################
function randomNDigitNumbers($digits){
  $returnString = mt_rand(1, 9);
  while (strlen($returnString) < $digits) {
    $returnString .= mt_rand(0, 9);
  }
  return $returnString;
}
$rad=randomNDigitNumbers(12);

?>



<footer class="footer">
    <div class="container">
        <div class="py-3">
            <div class="row g-4">
                <div class="col-lg-7">
                    <div class="row g-4">
                        <div class="col-md">
                            <div class="subheader mb-3">Our products</div>
                            <ul class="list-unstyled list-separated gap-2">
                                <li><a class="link-secondary" href="<?php echo base_url();?>">UI Kit</a></li>
                                <li>
                                    <a class="link-secondary" href="<?php echo base_url();?>">Open source ui
                                        design</a>
                                </li>
                                <li>
                                    <a class="link-secondary" href="<?php echo base_url();?>">Email templates</a>
                                </li>
                                <li><a class="link-secondary" href="<?php echo base_url();?>">Pricing</a></li>
                            </ul>
                        </div>
                        <div class="col-md">
                            <div class="subheader mb-3">Support</div>
                            <ul class="list-unstyled list-separated gap-2">
                                <li><a class="link-secondary" href="<?php echo base_url();?>">Blog</a></li>
                                <li><a class="link-secondary" href="<?php echo base_url();?>">Documentation</a></li>
                                <li><a class="link-secondary" href="<?php echo base_url();?>">Support</a></li>
                                <li>
                                    <a href="<?php echo base_url();?>" class="link-secondary" target="_blank"
                                        rel="noreferrer">Status</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md">
                            <div class="subheader mb-3">Cmon</div>
                            <ul class="list-unstyled list-separated gap-2">
                                <li><a class="link-secondary" href="<?php echo base_url();?>">About</a></li>
                                <li><a class="link-secondary" href="<?php echo base_url();?>">Blog</a></li>
                                <li><a class="link-secondary" href="<?php echo base_url();?>">Changelog</a></li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 ml-auto">
                    <div class="text-secondary">
                        Cmon comes with tons of well-designed components and features.
                        Start your adventure with Cmon and make your dashboard great
                        again. For free!
                    </div>
                </div>
            </div>

            <div class="row g-4 justify-content-between mt-0 mt-md-2">
                <div class="col-sm-7 col-md-6 col-lg-4">
                    <h5 class="subheader">Payment &amp; Security</h5>
                    <ul class="list-inline mb-0 mt-3">
                        <li class="list-inline-item">
                            <a href="#"><span class="payment payment-1 payment-provider-paypal"></span>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#"><span class="payment payment-1 payment-provider-visa"></span>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#"><span class="payment payment-1 payment-provider-mastercard"></span>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#"><span class="payment payment-1 payment-provider-americanexpress"></span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="col-sm-5 col-md-6 col-lg-3 text-sm-end">
                    <h5 class="subheader">Follow us on</h5>
                    <ul class="list-inline mb-0 mt-3">
                        <li class="list-inline-item">
                            <a class="btn btn-icon btn-facebook" href="#">
                                <!-- Download SVG icon from http://tabler.io/icons/icon/brand-facebook -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="icon icon-1">
                                    <path
                                        d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                </svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="btn btn-icon btn-instagram" href="#">
                                <!-- Download SVG icon from http://tabler.io/icons/icon/brand-instagram -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="icon icon-1">
                                    <path
                                        d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                    <path d="M16.5 7.5v.01" />
                                </svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="btn btn-icon btn-twitter" href="#">
                                <!-- Download SVG icon from http://tabler.io/icons/icon/brand-twitter -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="icon icon-1">
                                    <path
                                        d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                                </svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="btn btn-icon btn-linkedin" href="#">
                                <!-- Download SVG icon from http://tabler.io/icons/icon/brand-linkedin -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="icon icon-1">
                                    <path d="M8 11v5" />
                                    <path d="M8 8v.01" />
                                    <path d="M12 16v-5" />
                                    <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                                    <path
                                        d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>

<footer class="footer">
    <div class="container">
        <div class="py-3 border-top-light text-center text-lg-start">
            <div class="row g-4">
                <div class="col-lg-auto text-lg-end order-lg-last">
                    <div class="row justify-center">
                        <div class="col-auto">
                            ©<a href="<?php echo base_url('');?>" class="link-secondary" target="_blank"
                                rel="noopener noreferrer">cmon io</a>
                        </div>
                        <div class="col-auto">
                            <ul class="list-inline list-inline-dots">
                                <li class="list-inline-item">
                                    <a class="link-secondary" href="<?php echo base_url('');?>">Terms of service</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="link-secondary" href="<?php echo base_url('');?>">Privacy policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg">
                    Cmon Made with
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon text-red icon-inline icon-4">
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg> in Thailand.
                </div>
            </div>
        </div>
    </div>
</footer>


<?php $this->load->view('Templatefrontend/theme_setting');?>


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