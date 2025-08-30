<?php 
$urlnodered=$this->config->item('urlnodered');
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
ob_end_flush();
# แปลภาษา
$admin_id=0;
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
if($lang=='th'){
	$langs_th='ภาษาไทย';
	$langs_en='ภาษาอังกฤษ';
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

    .password-strength {
        font-size: 0.875rem;
    }

    .is-invalid {
        border-color: #dc3545;
    }

    .is-valid {
        border-color: #198754;
    }

    .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #dc3545;
    }

    .is-invalid~.invalid-feedback {
        display: block;
    }

    .spinner-border-sm {
        width: 1rem;
        height: 1rem;
    }

    .form-control:focus {
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
    }
    </style>
    <!-- END CUSTOM FONT -->
</head>

<body>
    <script src="<?php echo base_url('assets');?>/dist/js/tabler-theme.js"></script>
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
            <form class="card card-md" action="<?php echo base_url('user/signup3db');?>" method="post"
                autocomplete="off" novalidate id="registrationForm">
                <div class="card-body">
                    <h2 class="card-title text-center mb-4">Create new account</h2>
                    <input type="hidden" id="option" name="option" value="1" />
                    <div class="mb-3">
                        <label class="form-label"><?php echo $this->lang->line('email_user');?></label>
                        <input type="email" name="email" id="email" value="" class="form-control"
                            placeholder="Enter email" required>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label"> <?php echo $this->lang->line('username');?> </label>
                        <input type="text" name="username" id="username" value="" class="form-control"
                            placeholder="Enter Username" required>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><?php echo $this->lang->line('password');?></label>
                        <div class="input-group input-group-flat">
                            <input type="password" name="password" id="password" value="" class="form-control"
                                placeholder="Password" autocomplete="off" required>
                            <span class="input-group-text">
                                <a href="#" class="link-secondary toggle-password" title="Show password"
                                    data-bs-toggle="tooltip">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon icon-1">
                                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                        <path
                                            d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <div class="invalid-feedback"></div>
                        <div class="password-strength mt-2"></div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><?php echo $this->lang->line('confirm_password');?></label>
                        <div class="input-group input-group-flat">
                            <input type="password" name="confirm_password" id="confirm_password" value=""
                                class="form-control" placeholder="Confirm Password" autocomplete="off" required>
                            <span class="input-group-text">
                                <a href="#" class="link-secondary toggle-password" title="Show password"
                                    data-bs-toggle="tooltip">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon icon-1">
                                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                        <path
                                            d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="mb-3">
                        <label class="form-check">
                            <input type="checkbox" name="agree" id="agree" class="form-check-input" required />
                            <span class="form-check-label">Agree the <a
                                    href="<?php echo base_url('user/termsofservice');?>" tabindex="-1"
                                    target="_blank">terms
                                    and policy | ยอมรับเงื่อนไขการใช้งาน </a>.</span>
                        </label>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-footer">
                        <button type="submit" class="btn btn-primary w-100" id="submitBtn">
                            <?php echo $this->lang->line('button_create_new_account');?></button>
                    </div>
                </div>
            </form>
            <div class="text-center text-secondary mt-3">
                Already have account? <a href="<?php echo base_url('user/signin');?>"
                    tabindex="-1"><?php echo $this->lang->line('button_sign_in');?></a>
            </div>
        </div>
    </div>

    <div class="settings">
        <a href="#" class="btn btn-floating btn-icon btn-primary" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSettings">
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
                <!-- ...Theme builder content... -->
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
    // Theme builder script as before...

    // --- Registration Form Validation ---
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('registrationForm');
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm_password');
        const agree = document.getElementById('agree');
        const submitBtn = document.getElementById('submitBtn');

        // Show error
        function showError(input, message) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            const feedback = input.parentElement.querySelector('.invalid-feedback') ||
                input.closest('.mb-3').querySelector('.invalid-feedback');
            if (feedback) {
                feedback.textContent = message;
                feedback.style.display = 'block';
            }
        }

        // Show success
        function showSuccess(input) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            const feedback = input.parentElement.querySelector('.invalid-feedback') ||
                input.closest('.mb-3').querySelector('.invalid-feedback');
            if (feedback) {
                feedback.style.display = 'none';
            }
        }

        // Username validation
        function validateUsername() {
            const value = username.value.trim();
            if (value === '') {
                showError(username, 'กรุณากรอกชื่อผู้ใช้ / Please enter your username.');
                return false;
            } else if (value.length < 5) {
                showError(username,
                    'ชื่อผู้ใช้ต้องมีอย่างน้อย 5 ตัวอักษร / Username must contain at least 5 characters.');
                return false;
            } else if (value.length > 30) {
                showError(username,
                    'ชื่อผู้ใช้ต้องไม่เกิน 30 ตัวอักษร / Username must not exceed 30 characters.');
                return false;
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                showError(username,
                    'ชื่อผู้ใช้ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _ / Usernames can only contain letters, numbers, and _'
                );
                return false;
            } else {
                showSuccess(username);
                return true;
            }
        }

        // Email validation
        function validateEmail() {
            const value = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                showError(email, 'กรุณากรอกอีเมล / Please enter your email address.');
                return false;
            } else if (!emailRegex.test(value)) {
                showError(email, 'รูปแบบอีเมลไม่ถูกต้อง / Email format is invalid.');
                return false;
            } else {
                showSuccess(email);
                return true;
            }
        }

        // Password strength check
        function checkPasswordStrength(password) {
            let strength = 0;
            let feedback = [];
            if (password.length >= 8) strength++;
            else feedback.push('อย่างน้อย 8 ตัวอักษร / At least 8 characters');
            if (/[a-z]/.test(password)) strength++;
            else feedback.push('ตัวอักษรพิมพ์เล็ก / Lowercase letters');
            if (/[A-Z]/.test(password)) strength++;
            else feedback.push('ตัวอักษรพิมพ์ใหญ่ / Capital letters');
            if (/[0-9]/.test(password)) strength++;
            else feedback.push('ตัวเลข / Number');
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            else feedback.push('อักขระพิเศษ / Special characters');
            return {
                strength,
                feedback
            };
        }

        // Password validation
        // function validatePassword() {
        //     const value = password.value;
        //     const strengthIndicator = password.closest('.mb-3').querySelector('.password-strength');
        //     if (value === '') {
        //         showError(password, 'กรุณากรอกรหัสผ่าน / Please enter your password.');
        //         strengthIndicator.innerHTML = '';
        //         return false;
        //     }
        //     const {
        //         strength,
        //         feedback
        //     } = checkPasswordStrength(value);
        //     if (strength < 3) {
        //         showError(password,
        //             `รหัสผ่านไม่แข็งแกร่งพอ / Password is not strong enough. ต้องมี: ${feedback.join(', ')}`
        //             );
        //         strengthIndicator.innerHTML =
        //             `<small class="text-danger">ความแข็งแกร่ง: อ่อน / Strength: Weak</small>`;
        //         return false;
        //     } else {
        //         showSuccess(password);
        //         const strengthText = strength === 5 ? 'แข็งแกร่งมาก / Very strong' : strength === 4 ?
        //             'แข็งแกร่ง / Strong' : 'ปานกลาง / Moderate';
        //         const strengthClass = strength === 5 ? 'text-success' : strength === 4 ? 'text-info' :
        //             'text-warning';
        //         strengthIndicator.innerHTML =
        //             `<small class="${strengthClass}">ความแข็งแกร่ง / Strength: ${strengthText}</small>`;
        //         return true;
        //     }
        // }

        // Confirm password validation
        function validateConfirmPassword() {
            const value = confirmPassword.value;
            if (value === '') {
                showError(confirmPassword, 'กรุณายืนยันรหัสผ่าน / Please confirm your password.');
                return false;
            } else if (value !== password.value) {
                showError(confirmPassword, 'รหัสผ่านไม่ตรงกัน / Passwords do not match');
                return false;
            } else {
                showSuccess(confirmPassword);
                return true;
            }
        }

        // Checkbox validation
        function validateAgree() {
            if (!agree.checked) {
                showError(agree, 'กรุณายอมรับเงื่อนไขการใช้งาน / Please accept the terms of use.');
                return false;
            } else {
                showSuccess(agree);
                return true;
            }
        }

        // Real-time validation
        username.addEventListener('blur', validateUsername);
        username.addEventListener('input', validateUsername);
        email.addEventListener('blur', validateEmail);
        email.addEventListener('input', validateEmail);
        password.addEventListener('blur', validatePassword);
        password.addEventListener('input', validatePassword);
        confirmPassword.addEventListener('blur', validateConfirmPassword);
        confirmPassword.addEventListener('input', validateConfirmPassword);
        agree.addEventListener('change', validateAgree);

        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.closest('.input-group').querySelector('input');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const isUsernameValid = validateUsername();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            const isAgreeValid = validateAgree();
            if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid &&
                isAgreeValid) {
                // Loading spinner
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML =
                    `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>กำลังสร้างบัญชี...`;
                setTimeout(() => {
                    form.submit();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 1000);
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.is-invalid');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    firstError.focus();
                }
            }
        });
    });
    </script>
    <!-- END PAGE SCRIPTS -->
</body>

</html>