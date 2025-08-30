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
<!--  BEGIN FOOTER  -->
<footer class="footer footer-transparent d-print-none">
    <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
            <div class="col-lg-auto ms-lg-auto">
                <ul class="list-inline list-inline-dots mb-0">
                    <li class="list-inline-item"><a href="<?php echo base_url('about');?>#manual" target="_blank"
                            class="link-secondary" rel="noopener">Documentation</a></li>
                    <li class="list-inline-item"><a href="<?php echo base_url('about');?>#license" target="_blank"
                            class="link-secondary" rel="noopener">License</a>
                    </li>

                    <li class="list-inline-item">
                        <a href="<?php echo base_url('about');?>#manual" target="_blank" class="link-secondary"
                            rel="noopener">
                            <!-- Download SVG icon from http://tabler.io/icons/icon/heart -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon text-pink icon-inline icon-4">
                                <path
                                    d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            </svg>
                            CmonIoT
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-12 col-lg-auto mt-3 mt-lg-0">
                <ul class="list-inline list-inline-dots mb-0">
                    <li class="list-inline-item">
                        Copyright &copy;
                        <a href="." class="link-secondary">Cmon</a>
                        <?php echo $this->lang->line('copyright');?>
                        . All rights reserved.
                    </li>
                    <!-- <li class="list-inline-item">  ## </li> -->
                </ul>
            </div>
        </div>
    </div>
</footer>
<!--  END FOOTER  -->
</div>
</div>
<div class="settings">
    <a href="#" class="btn btn-floating btn-icon btn-primary" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSettings">
        <!-- Download SVG icon from http://tabler.io/icons/icon/brush -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1">
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
                                <input name="theme-primary" type="radio" value="blue" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-blue"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="azure" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-azure"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="indigo" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-indigo"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="purple" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-purple"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="pink" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-pink"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="red" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-red"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="orange" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-orange"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="yellow" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-yellow"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="lime" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-lime"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="green" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-green"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="teal" class="form-colorinput-input" />
                                <span class="form-colorinput-color bg-teal"></span>
                            </label>
                        </div>

                        <div class="col-auto">
                            <label class="form-colorinput">
                                <input name="theme-primary" type="radio" value="cyan" class="form-colorinput-input" />
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
                                <input type="radio" name="theme-base" value="gray" class="form-check-input" checked />
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
                                <input type="radio" name="theme-radius" value="1" class="form-check-input" checked />
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
<?php 
       // Option Theme Builder
	   $this->load->view('template/theme_builder');
?>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const percentageText = document.getElementById('percentage');
    const mainContent = document.querySelector('.main-content');
    // ค้นหารูปภาพทั้งหมดในส่วนเนื้อหาหลัก
    const images = document.querySelectorAll('.main-content img');
    const totalImages = images.length;
    let loadedImages = 0;
    // ถ้าไม่มีรูปภาพให้โหลดเลย ให้ซ่อน preloader ทันที
    if (totalImages === 0) {
        hidePreloader();
        return;
    }

    function imageLoaded() {
        loadedImages++;
        // คำนวณเปอร์เซ็นต์
        let percent = Math.round((loadedImages / totalImages) * 100);
        // อัปเดต UI
        percentageText.textContent = `${percent}%`;
        progressBar.style.width = `${percent}%`;
        // เมื่อโหลดครบทุกรูปแล้ว
        if (loadedImages === totalImages) {
            // หน่วงเวลาเล็กน้อยเพื่อให้ผู้ใช้เห็น 100% ก่อนหายไป
            setTimeout(hidePreloader, 550);
        }
    }

    function hidePreloader() {
        preloader.classList.add('loaded');
        mainContent.style.display = 'block';
        document.body.style.overflow = 'auto'; // คืนค่า scrollbar
    }
    // เพิ่ม Event Listener ให้กับทุกรูปภาพ
    images.forEach(img => {
        // ตรวจสอบว่ารูปโหลดเสร็จจาก cache แล้วหรือยัง
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            // จัดการกรณีรูปโหลดไม่สำเร็จด้วย เพื่อไม่ให้ preloader ค้าง
            img.addEventListener('error', imageLoaded);
        }
    });
});
</script>
</body>
<?php /*------------------------html ------------------------ */?>

</html>