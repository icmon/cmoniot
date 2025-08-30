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

$id=@$log['id'];
$log_type_id=@$log['log_type_id'];
$uid=@$log['uid'];
$log_name=@$log['log_name'];
$type_name=@$log['type_name'];
$detail=@$log['detail'];
$select_status=@$log['select_status'];
if(!$select_status){$select_status='0';}
$insert_status=@$log['insert_status'];
if(!$insert_status){$insert_status='0';}
$update_status=@$log['update_status'];
if(!$update_status){$update_status='0';}
$delete_status=@$log['delete_status'];
if(!$delete_status){$delete_status='0';}
$status=@$log['status'];
if(!$status){$status='0';}
$usernam=@$log['usernam'];
$firstname=@$log['firstname'];
$lang=@$log['lang'];
$createddate=@$log['createddate'];
$updateddate=@$log['updateddate'];
 

 #echo '<pre> log=>'; print_r($log); echo '</pre>'; die();

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

                <div class="col-12 col-md-12 d-flex flex-column">
                    <?php ############################# ?>
                    <div class="card-body">
                        <h2 class="mb-4">
                            log name : <?php echo $log_name;?>
                        </h2>
                        <!-- <h3 class="card-title">Profile Details</h3> -->
                        <?php ################################?>
                        <h3 class="card-title mt-4 col-3 col-form-label"> Type name : <?php echo $type_name;?>
                            <h3 class="card-title mt-4">Detail : <?php echo $detail;?></h3>
                            <?php ################################?>
                            <h3 class="card-title mt-4">Date : <?php echo $createddate;?></h3>
                            <h3 class="card-title mt-4">Lang : <?php echo $lang;?></h3>
                            <?php ##############Notification##################?>
                            <div class="mb-3">
                                <div class="divide-y">
                                    <div>
                                        <label class="row">
                                            <span class="col">Access : <a href="#">log </a></span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">

                                                    <input type="hidden" id="select_status" name="select_status"
                                                        value="0">
                                                    <input class="form-check-input" type="checkbox" id="select_status"
                                                        name="select_status" value="1" <?php if($select_status==1){?>
                                                        checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">Insert status : <a href="#"><?php echo $mobile_number;?>
                                                </a></span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="hidden" id="insert_status" name="insert_status"
                                                        value="0">
                                                    <input class="form-check-input" type="checkbox" id="insert_status"
                                                        name="insert_status" value="1" <?php if($insert_status==1){?>
                                                        checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">Update status : </span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="hidden" id="update_status" name="update_status"
                                                        value="0">
                                                    <input class="form-check-input" type="checkbox" id="update_status"
                                                        name="update_status" value="1" <?php if($update_status==1){?>
                                                        checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">Delete status: </span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="hidden" id="delete_status" name="delete_status"
                                                        value="0">
                                                    <input class="form-check-input" type="checkbox" id="delete_status"
                                                        name="delete_status" value="1" <?php if($delete_status==1){?>
                                                        checked <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">Status: </span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="hidden" id="status" name="status" value="0">
                                                    <input class="form-check-input" type="checkbox" id="status"
                                                        name="status" value="1" <?php if($status==1){?> checked
                                                        <?php }?>>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                </div>
                            </div>
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