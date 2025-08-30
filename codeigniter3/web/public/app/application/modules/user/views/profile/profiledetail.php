<!-- BEGIN PAGE BODY -->
<?php
$language = $this->lang->language;
$lang=$this->lang->line('lang');
$langs=$this->lang->line('langs');
# echo '<pre> uid=>'; print_r($uid); echo '</pre>';  
# echo '<pre> profile=>'; print_r($profile); echo '</pre>'; die();
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();   }
$uid=@@$input['uid'];

$role_id=@$profile['role_id'];
$email=@$profile['email'];
$username=@$profile['username'];
$firstname=@$profile['firstname'];
$lastname=@$profile['lastname'];
$fullname=@$profile['fullname'];
$nickname=@$profile['nickname'];
$idcard=@$profile['idcard'];
$lastsignindate=@$profile['lastsignindate'];
$status=@$profile['status'];
$active_status=@$profile['active_status'];
$network_id=@$profile['network_id'];
$remark=@$profile['remark'];
$infomation_agree_status=@$profile['infomation_agree_status'];
$gender=@$profile['gender'];
$birthday=@$profile['birthday'];
$online_status=@$profile['online_status'];
$message=@$profile['message'];
$network_type_id=@$profile['network_type_id'];
$public_status=@$profile['public_status'];
$type_id=@$profile['type_id'];
$avatarpath=@$profile['avatarpath'];
$avatar=@$profile['avatar'];
$loginfailed=@$profile['loginfailed'];
$refresh_token=@$profile['refresh_token'];
$createddate=@$profile['createddate'];
$updateddate=@$profile['updateddate'];
$deletedate=@$profile['deletedate'];
# echo '<pre> profile=>'; print_r($profile); echo '</pre>';  
$permision_name=@$profile['permision_name'];
$permision_detail=@$profile['permision_detail'];
$permision_insert=@$profile['permision_insert'];
$permision_update=@$profile['permision_update'];
$permision_delete=@$profile['permision_delete'];
$permision_select=@$profile['permision_select'];
$permision_log=@$profile['permision_log'];
$permision_config=@$profile['permision_config'];
$permision_truncate=@$profile['permision_truncate'];
$createddate=@$profile['createddate'];
$updateddate=@$profile['updateddate'];
$deletedate=@$profile['deletedate'];

$public_notification=@$profile['public_notification'];
$sms_notification=@$profile['sms_notification'];
$email_notification=@$profile['email_notification'];
$line_notification=@$profile['line_notification'];
$mobile_number=@$profile['mobile_number'];
$phone_number=@$profile['phone_number'];
$lineid=@$profile['lineid'];
$avatars=base_url('assets/img/cmon.png');
 

#echo '<pre> profile=>'; print_r($profile); echo '</pre>'; die();

?>
<style>
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

<div class="page-body">
    <div class="container-xl">
        <?php #$this->load->view('user/card_box_profile'); ?>

        <div class="card">
            <div class="row g-0">
                <div class="col-12 col-md-2 border-end">
                    <div class="card-body">
                        <h4 class="subheader">settings</h4>

                        <div class="list-group list-group-transparent">
                            <a href="#"
                                class="list-group-item list-group-item-action d-flex align-items-center active">My
                                Account</a>
                            <!-- <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">My
                                Notifications</a> -->

                        </div>

                    </div>
                </div>
                <div class="col-12 col-md-10 d-flex flex-column">
                    <?php ############################# ?>
                    <div class="card-body">
                        <h2 class="mb-4">
                            <a href="<?php echo base_url('user/profileupdate?uid=').$uid;?>">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-cash-edit">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3" />
                                    <path d="M11 19h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v1.25" />
                                    <path d="M18.42 15.61a2.1 2.1 0 1 1 2.97 2.97l-3.39 3.42h-3v-3z" />
                                </svg>
                                Profile : <?php echo $username;?>
                            </a>
                        </h2>
                        <!-- <h3 class="card-title">Profile Details</h3> -->
                        <?php ################################?>
                        <h3 class="card-title mt-4 col-3 col-form-label"> email: <?php echo $email;?>
                            <?php ################################?>
                            <h3 class="card-title mt-4"><a
                                    href="<?php echo base_url('user/profileupdate?uid=').$uid;?>">Personal Profile </a>
                            </h3>
                            <div class="row align-items-center">
                                <div class="col-auto"><span class="avatar avatar-xl"
                                        style="background-image: url(<?php echo $avatars;?>)">
                                    </span>
                                </div>

                            </div>
                            <hr>
                            <h3 class="card-title mt-4">Level : <?php echo $permision_name;?></h3>
                            <?php ################################?>
                            <?php ################################?>
                            <div class="row g-3">
                                <div class="col-md">
                                    <?php echo $this->lang->line('username');?> : <?php echo $username;?></div>


                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('firstname');?> :
                                        <?php echo $firstname;?> </div>

                                </div>
                                <div class="col-md">
                                    <div class="form-label"> <?php echo $this->lang->line('lastname');?> :
                                        <?php echo $lastname;?></div>

                                </div>
                            </div>
                            <hr>
                            <h3 class="card-title mt-4">Profile detail</h3>

                            <div class="row g-3">
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('idcard');?> :
                                        <?php echo $idcard;?></div>

                                </div>
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('fullname');?> :
                                        <?php echo $fullname;?></div>

                                </div>
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('nickname');?> :
                                        <?php echo $nickname;?></div>

                                </div>
                            </div>

                            <br>
                            <div class="row g-3">
                                <div class="col-md">
                                    <div class="form-label col-3 col-form-label required">
                                        <?php echo $this->lang->line('mobile_number');?>: <?php echo $mobile_number;?>
                                    </div>

                                </div>

                                <div class="col-md">
                                    <div class="form-label col-3 col-form-label required">
                                        <?php echo $this->lang->line('phone_number');?> : <?php echo $phone_number;?>
                                    </div>

                                </div>


                                <div class="col-md">
                                    <div class="form-label col-3 col-form-label required">
                                        <?php echo $this->lang->line('lineid');?> : <?php echo $lineid;?></div>

                                </div>

                            </div>


                            <h3 class="card-title mt-4"><?php echo $this->lang->line('remark');?> /
                                <?php echo $this->lang->line('detail');?></h3>
                            <div>
                                <div class="row g-2">
                                    <div class="col-md">
                                        <?php echo $remark;?>
                                    </div>

                                </div>
                            </div>
                            <hr>
                            <?php ##############Notification##################?>
                            <div class="mb-3">
                                <label class="form-label">Notification</label>

                                <div class="divide-y">

                                    <div>
                                        <label class="row">
                                            <span class="col">Push Notifications : <a href="#">Device IOT </a></span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">

                                                    <input type="hidden" id="public_notification"
                                                        name="public_notification" value="0">
                                                    <input class="form-check-input" type="checkbox"
                                                        id="public_notification" name="public_notification" value="1"
                                                        <?php if($public_notification==1){?> checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">SMS Notifications : <a
                                                    href="#"><?php echo $mobile_number;?>
                                                </a></span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="hidden" id="sms_notification" name="sms_notification"
                                                        value="0">
                                                    <input class="form-check-input" type="checkbox"
                                                        id="sms_notification" name="sms_notification" value="1"
                                                        <?php if($sms_notification==1){?> checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">Line Notifications : <a
                                                    href="#"><?php echo $lineid;?></a></span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="hidden" id="line_notification" name="line_notification"
                                                        value="0">
                                                    <input class="form-check-input" type="checkbox"
                                                        id="line_notification" name="line_notification" value="1"
                                                        <?php if($line_notification==1){?> checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">Email Notifications : <a
                                                    href="#"><?php echo $email;?></a></span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="hidden" id="email_notification"
                                                        name="email_notification" value="0">
                                                    <input class="form-check-input" type="checkbox"
                                                        id="email_notification" name="email_notification" value="1"
                                                        <?php if($email_notification==1){?> checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <?php #################Notification###############?>
                            <hr>
                            <?php ##############option##################?>
                            <div class="row">
                                <label class="col-3 col-form-label pt-0"><b>Permision : <a href="#">Level
                                            <?php echo $permision_name;?></b></a>
                                </label>
                                <div class="col">
                                    <?php ##############permision_insert##################?>
                                    <label class="form-check">
                                        <input class="form-check-input" type="checkbox" id="permision_insert"
                                            name="permision_insert" value="1" <?php if($permision_insert==1){?>checked
                                            <?php }?>>
                                        <span class="form-check-label">Insert data</span>
                                    </label>
                                    <?php ##############permision_insert##################?>
                                    <?php ##############permision_update##################?>
                                    <label class="form-check">
                                        <input class="form-check-input" type="checkbox" id="permision_update"
                                            name="permision_update" value="1" <?php if($permision_update==1){?>checked
                                            <?php }?>>
                                        <span class="form-check-label">Update data</span>
                                    </label>
                                    <?php ##############permision_delete##################?>
                                    <label class="form-check">
                                        <input class="form-check-input" type="checkbox" id="permision_delete"
                                            name="permision_delete" value="1" <?php if($permision_delete==1){?>checked
                                            <?php }?>>
                                        <span class="form-check-label">Delete data</span>
                                    </label>
                                    <?php ##############permision_delete##################?>
                                    <label class="form-check">
                                        <input class="form-check-input" type="checkbox" id="permision_select"
                                            name="permision_select" value="1" <?php if($permision_select==1){?>checked
                                            <?php }?>>
                                        <span class="form-check-label">Select data</span>
                                    </label>
                                    <?php ##############permision_delete##################?>
                                    <label class="form-check">
                                        <input class="form-check-input" type="checkbox" id="permision_log"
                                            name="permision_log" value="1" <?php if($permision_log==1){?>checked
                                            <?php }?>>
                                        <span class="form-check-label">Select log</span>
                                    </label>
                                    <?php ##############permision_delete##################?>
                                    <label class="form-check">
                                        <input class="form-check-input" type="checkbox" id="permision_config"
                                            name="permision_config" value="1" <?php if($permision_config==1){?>checked
                                            <?php }?>>
                                        <span class="form-check-label">Config</span>
                                    </label>
                                    <?php ##############permision_delete##################?>
                                    <label class="form-check">
                                        <input class="form-check-input" type="checkbox" id="permision_truncate"
                                            name="permision_truncate" value="1"
                                            <?php if($permision_truncate==1){?>checked <?php }?>>
                                        <span class="form-check-label">Truncate</span>
                                    </label>
                                    <?php ##############******** *******##################?>
                                </div>
                                <?php 
                                /*
                                    $permision_name=@$profile['permision_name'];
                                    $permision_detail=@$profile['permision_detail'];
                                    $permision_insert=@$profile['permision_insert'];
                                    $permision_update=@$profile['permision_update'];
                                    $permision_delete=@$profile['permision_delete'];
                                    $permision_select=@$profile['permision_select'];
                                    $permision_log=@$profile['permision_log'];
                                    $permision_config=@$profile['permision_config'];
                                    $permision_truncate=@$profile['permision_truncate'];
                                    $createddate=@$profile['createddate'];
                                    $updateddate=@$profile['updateddate'];
                                    $deletedate=@$profile['deletedate'];
                                */?>
                                <?php ###############option#################?>
                            </div>
                            <?php ##################option##############?>

                            <?php ############################# ?>
                            <?php ############################# ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END PAGE BODY -->
    <script>
    /****************************/
    function handleCheckbox(checkbox) {
        checkbox.value = checkbox.checked ? 1 : 0;
    }
    // หรือใช้ event listener
    document.getElementById('checkbox').addEventListener('change', function() {
        this.value = this.checked ? 1 : 0;
    });
    /****************************/
    </script>
    <?php ############################# ?>
    <!-- BEGIN PAGE SCRIPTS -->
    <script>
    /****************************/
    /****************************/
    /****************************/
    /****************************/
    /****************************/
    /****************************/
    </script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSelector = this.getAttribute('data-target');
                const passwordField = document.querySelector(targetSelector);
                const icon = this.querySelector('.icon-eye');
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    this.title = 'Hide password';
                    // เปลี่ยนไอคอนเป็น eye-off
                    icon.innerHTML = `
                    <path d="M10.585 10.585a2 2 0 0 0 2.829 2.829" />
                    <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6a22.84 22.84 0 0 1 2.582 -4.066" />
                    <path d="M6.117 6.117a21.998 21.998 0 0 1 5.883 -1.117c3.6 0 6.6 2 9 6a22.84 22.84 0 0 1 -1.582 2.066" />
                    <path d="M3 3l18 18" />
                `;
                } else {
                    passwordField.type = 'password';
                    this.title = 'Show password';
                    // เปลี่ยนไอคอนกลับเป็น eye
                    icon.innerHTML = `
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                `;
                }
            });
        });
    });
    // Password validation function
    function validatePassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirm_password');
        let isValid = true;
        let errors = [];
        // Clear previous validation states
        clearValidationErrors();
        // 1. Check password length (minimum 8 characters)
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
            isValid = false;
        }
        // 2. Check for uppercase letter
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
            isValid = false;
        }
        // 3. Check for lowercase letter
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
            isValid = false;
        }
        // 4. Check for number
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
            isValid = false;
        }
        // 5. Check for special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.push('Password must contain at least one special character');
            isValid = false;
        }
        // 6. Check password confirmation
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
            showFieldError(confirmPasswordField, 'Passwords do not match');
            isValid = false;
        }
        // Display errors or success
        if (!isValid) {
            showFieldError(passwordField, errors.join('<br>'));
            updatePasswordStrength(password, false);
        } else {
            showFieldSuccess(passwordField);
            showFieldSuccess(confirmPasswordField);
            updatePasswordStrength(password, true);
        }
        return isValid;
    }
    // Password strength indicator
    function updatePasswordStrength(password, isValid) {
        const strengthDiv = document.querySelector('.password-strength');
        if (!strengthDiv) return;
        let strength = 0;
        let strengthText = '';
        let strengthClass = '';
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
        switch (strength) {
            case 0:
            case 1:
                strengthText = 'Very Weak';
                strengthClass = 'text-danger';
                break;
            case 2:
                strengthText = 'Weak';
                strengthClass = 'text-warning';
                break;
            case 3:
                strengthText = 'Fair';
                strengthClass = 'text-info';
                break;
            case 4:
                strengthText = 'Good';
                strengthClass = 'text-primary';
                break;
            case 5:
                strengthText = 'Strong';
                strengthClass = 'text-success';
                break;
        }
        const progressWidth = (strength / 5) * 100;
        strengthDiv.innerHTML = `
        <div class="progress" style="height: 4px;">
            <div class="progress-bar ${strengthClass.replace('text-', 'bg-')}" 
                 style="width: ${progressWidth}%"></div>
        </div>
        <small class="${strengthClass}">Password strength: ${strengthText}</small>
    `;
    }
    // Show field error
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        const feedback = field.parentNode.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.innerHTML = message;
            feedback.style.display = 'block';
        }
    }
    // Show field success
    function showFieldSuccess(field) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
        const feedback = field.parentNode.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    }
    // Clear validation errors
    function clearValidationErrors() {
        const fields = ['password', 'confirm_password'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.classList.remove('is-invalid', 'is-valid');
            }
        });
        document.querySelectorAll('.invalid-feedback').forEach(feedback => {
            feedback.style.display = 'none';
        });
    }
    // Real-time validation
    document.addEventListener('DOMContentLoaded', function() {
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirm_password');
        if (passwordField) {
            passwordField.addEventListener('input', function() {
                if (this.value.length > 0) {
                    validatePassword();
                } else {
                    clearValidationErrors();
                    document.querySelector('.password-strength').innerHTML = '';
                }
            });
        }
        if (confirmPasswordField) {
            confirmPasswordField.addEventListener('input', function() {
                if (this.value.length > 0) {
                    validatePassword();
                }
            });
        }
    });
    // Form submission validation
    function validateForm() {
        const changePasswordStatus = document.getElementById('change_password_status');
        // If password change is enabled, validate passwords
        if (changePasswordStatus && changePasswordStatus.checked) {
            return validatePassword();
        }
        return true; // If password change is disabled, skip validation
    }
    </script>