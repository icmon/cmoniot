<!-- BEGIN PAGE BODY -->
<?php
$language = $this->lang->language;
$lang=$this->lang->line('lang');
$langs=$this->lang->line('langs');
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
// echo '<pre> _COOKIE=>'; print_r($_COOKIE); echo '</pre>';  
$uid_sess=@$_SESSION['uid'];
$username_sess=@$_SESSION['username'];
$email_sess=@$_SESSION['email'];
$token=@$_SESSION['token']; 
$uid_api=@$_SESSION['uid_api'];
$role_id=@$_SESSION['role_id'];
$username=@$_SESSION['username'];
$uid=@@$input['uid'];
if(!$uid){
    $uid=@$_SESSION['uid'];
}else if(!$uid){
    $uid=@$profile['uid'];
}
#echo '<pre> uid=>'; print_r($uid); echo '</pre>';  
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
$avatars=base_url('assets/img/cmon.png');
if($username_sess){
 $display_name=$username_sess;
}else{
   $display_name='Cmon';  
} 
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
                <div class="col-12 col-md-3 border-end">
                    <div class="card-body">
                        <h4 class="subheader">settings</h4>

                        <div class="list-group list-group-transparent">
                            <a href="#"
                                class="list-group-item list-group-item-action d-flex align-items-center active">My
                                Account</a>
                            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">My
                                Notifications</a>

                        </div>

                    </div>
                </div>
                <div class="col-12 col-md-9 d-flex flex-column">
                    <?php ############################# ?>
                    <?php ############################# ?>
                    <form class="card card-md" action="<?php echo base_url('user/profileupdatedb');?>" method="post"
                        autocomplete="off" novalidate id="userupdateForm" onsubmit="return validateForm()">
                        <div class="card-body">
                            <h2 class="mb-4">My Account</h2>
                            <!-- <h3 class="card-title">Profile Details</h3> -->
                            <?php ################################?>
                            <h3 class="card-title mt-4">Change email <?php #echo $this->lang->line('email_user');?></h3>
                            <!-- <p class="card-subtitle">Active status.</p> -->
                            <div>

                                <label class="form-check form-switch form-switch-lg">
                                    <input type="hidden" name="email_user_status" value="0">
                                    <input type="checkbox" class="form-check-input" id="email_user_status"
                                        name="email_user_status" value="1">
                                    <span class="form-check-label form-check-label-on"> Active chage email</span>
                                    <span class="form-check-label form-check-label-off"> Inactive chage email</span>

                                </label>

                            </div>
                            <?php ################################?>
                            <div>
                                <div class="row g-2">
                                    <div class="col-md">
                                        <input type="hidden" id="uid" name="uid" value="<?php echo $uid;?>">
                                        <input type="text" id="email" name="email" class="form-control"
                                            value="<?php echo $email;?>" placeholder="Enter email">
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <h3 class="card-title mt-4">Personal Profile </h3>
                            <div class="row align-items-center">
                                <div class="col-auto"><span class="avatar avatar-xl"
                                        style="background-image: url(<?php echo $avatars;?>)">

                                    </span>
                                </div>
                                <div class="col-auto">

                                    <a href="#" class="btn btn-1">

                                        Change avatar

                                    </a>
                                </div>

                            </div>
                            <hr>
                            <h3 class="card-title mt-4">Level : <?php echo $permision_name;?></h3>
                            <?php ################################?>
                            <!-- <p class="card-subtitle">Active status.</p> -->
                            <div>

                                <label class="form-check form-switch form-switch-lg">
                                    <input type="hidden" name="username_status" value="0">
                                    <input type="checkbox" class="form-check-input" id="username_status"
                                        name="username_status" value="1">
                                    <span class="form-check-label form-check-label-on"> Active chage
                                        username</span>
                                    <span class="form-check-label form-check-label-off"> Inactive chage
                                        username</span>

                                </label>

                            </div>
                            <?php ################################?>
                            <div class="row g-3">
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('username');?></div>

                                    <input type="text" id="username" name="username" class="form-control"
                                        value="<?php echo $username;?>">
                                </div>
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('firstname');?></div>
                                    <input type="text" id="firstname" name="firstname" class="form-control"
                                        value="<?php echo $firstname;?>">
                                </div>
                                <div class="col-md">
                                    <div class="form-label"> <?php echo $this->lang->line('lastname');?></div>
                                    <input type="text" id="lastname" name="lastname" class="form-control"
                                        value="<?php echo $lastname;?>">
                                </div>
                            </div>
                            <hr>
                            <h3 class="card-title mt-4">Profile detail</h3>

                            <div class="row g-3">
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('idcard');?></div>
                                    <input type="text" id="idcard" name="idcard" class="form-control"
                                        value="<?php echo $idcard;?>">
                                </div>
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('fullname');?></div>
                                    <input type="text" id="fullname" name="fullname" class="form-control"
                                        value="<?php echo $fullname;?>">
                                </div>
                                <div class="col-md">
                                    <div class="form-label"><?php echo $this->lang->line('nickname');?> </div>
                                    <input type="text" id="nickname" name="nickname" class="form-control"
                                        value="<?php echo $nickname;?>">
                                </div>
                            </div>

                            <h3 class="card-title mt-4"><?php echo $this->lang->line('remark');?> /
                                <?php echo $this->lang->line('detail');?></h3>
                            <div>
                                <div class="row g-2">
                                    <div class="col-md">
                                        <input type="text" id="remark" name="remark" class="form-control"
                                            value="<?php echo $remark;?>" placeholder="Enter remark">
                                    </div>

                                </div>
                            </div>
                            <hr>
                            <?php ################################?>
                            <h3 class="card-title mt-4">Change password</h3>
                            <!-- <p class="card-subtitle">Active status.</p> -->
                            <div>
                                <label class="form-check form-switch form-switch-lg">
                                    <input type="hidden" name="change_password_status" value="0">
                                    <input type="checkbox" class="form-check-input" id="change_password_status"
                                        name="change_password_status" value="1">
                                    <span class="form-check-label form-check-label-on">Active change password</span>
                                    <span class="form-check-label form-check-label-off">Inactive change password</span>
                                </label>
                            </div>

                            <?php ################################?>
                            <div class="mb-3">
                                <label class="form-label"><?php echo $this->lang->line('password');?></label>
                                <div class="input-group input-group-flat">
                                    <input type="password" name="password" id="password" value="" class="form-control"
                                        placeholder="Password" autocomplete="off" required>
                                    <span class="input-group-text">
                                        <a href="#" class="link-secondary toggle-password" title="Show password"
                                            data-bs-toggle="tooltip" data-target="#password">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye">
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

                            <?php ################################?>
                            <div class="mb-3">
                                <label class="form-label"><?php echo $this->lang->line('confirm_password');?></label>
                                <div class="input-group input-group-flat">
                                    <input type="password" name="confirm_password" id="confirm_password" value=""
                                        class="form-control" placeholder="Confirm Password" autocomplete="off" required>
                                    <span class="input-group-text">
                                        <a href="#" class="link-secondary toggle-password" title="Show password"
                                            data-bs-toggle="tooltip" data-target="#confirm_password">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye">
                                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                <path
                                                    d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                                <div class="invalid-feedback"></div>
                            </div>

                            <h3 class="card-title mt-4">Public profile</h3>
                            <!-- <p class="card-subtitle">Active status.</p> -->
                            <div>
                                <?php #echo $public_status;?>
                                <label class="form-check form-switch form-switch-lg">
                                    <input type="hidden" name="public_status" value="0">
                                    <input type="checkbox" class="form-check-input" id="public_status"
                                        name="public_status" value="1" <?php if($public_status==1){?> checked <?php }?>>
                                    <span class="form-check-label form-check-label-on">You're currently
                                        active</span>
                                    <span class="form-check-label form-check-label-off">You're currently
                                        inactive</span>

                                </label>

                            </div>
                            <?php ################################?>
                            <hr>
                            <?php ##############Notification##################?>
                            <div class="mb-3">
                                <label class="form-label">Notification</label>

                                <div class="divide-y">

                                    <div>
                                        <label class="row">
                                            <span class="col">Push Notifications</span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input class="form-check-input" type="checkbox" checked>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">SMS Notifications</span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input class="form-check-input" type="checkbox">
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="row">
                                            <span class="col">Email Notifications</span>
                                            <span class="col-auto">
                                                <label class="form-check form-check-single form-switch">
                                                    <input class="form-check-input" type="checkbox" checked>
                                                </label>
                                            </span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <?php #################Notification###############?>
                            <?php ############Checkboxes####################?>
                            <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
                            <?php  /****container-xl**********/  ?>
                            <hr>
                            <h3 class="card-title">HTTP Request</h3>

                            <div class="card-body">
                                <div class="row row-cards">
                                    <div class="mb-3 col-sm-4 col-md-2">
                                        <label class="form-label required">Method</label>
                                        <select class="form-select">
                                            <option value="GET">GET</option>
                                            <option value="POST">POST</option>
                                            <option value="PUT">PUT</option>
                                            <option value="HEAD">HEAD</option>
                                            <option value="DELETE">DELETE</option>
                                            <option value="PATCH">PATCH</option>
                                        </select>
                                    </div>
                                    <div class="mb-3 col-sm-8 col-md-10">
                                        <label class="form-label required">URL</label>
                                        <input name="url" type="text" class="form-control"
                                            value="https://content.googleapis.com/discovery/v1/apis/surveys/v2/rest">
                                    </div>
                                </div>

                                <?php ######################### ?>
                                <div class="mb-3">
                                    <label class="form-label">Checkboxes</label>
                                    <div>
                                        <label class="form-check">
                                            <input class="form-check-input" type="checkbox" checked>
                                            <span class="form-check-label">Option 1</span>
                                        </label>
                                        <label class="form-check">
                                            <input class="form-check-input" type="checkbox">
                                            <span class="form-check-label">Option 2</span>
                                        </label>
                                        <label class="form-check">
                                            <input class="form-check-input" type="checkbox" disabled>
                                            <span class="form-check-label">Option 3</span>
                                        </label>
                                    </div>
                                </div>
                                <?php ######################### ?>
                                <hr>
                                <h3 class="card-title">Assertions</h3>


                                <div class="table-responsive">
                                    <table class="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Source</th>
                                                <th>Property</th>
                                                <th>Comparison</th>
                                                <th>Target</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="STATUS_CODE" selected="">Status code
                                                        </option>
                                                        <option value="JSON_BODY">JSON body</option>
                                                        <option value="HEADERS">Headers</option>
                                                        <option value="TEXT_BODY">Text body</option>
                                                        <option value="RESPONSE_TIME">Response time</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control">
                                                </td>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="EQUALS" selected="">Equals</option>
                                                        <option value="NOT_EQUALS">Not equals</option>
                                                        <option value="HAS_KEY">Has key</option>
                                                        <option value="NOT_HAS_KEY">Not has key</option>
                                                        <option value="HAS_VALUE">Has value</option>
                                                        <option value="NOT_HAS_VALUE">Not has value</option>
                                                        <option value="IS_EMPTY">Is empty</option>
                                                        <option value="NOT_EMPTY">Is not empty</option>
                                                        <option value="GREATER_THAN">Greater than</option>
                                                        <option value="LESS_THAN">Less than</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" value="200">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="STATUS_CODE">Status code</option>
                                                        <option value="JSON_BODY" selected="">JSON body
                                                        </option>
                                                        <option value="HEADERS">Headers</option>
                                                        <option value="TEXT_BODY">Text body</option>
                                                        <option value="RESPONSE_TIME">Response time</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" value="parameters.alt.type">
                                                </td>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="EQUALS">Equals</option>
                                                        <option value="NOT_EQUALS">Not equals</option>
                                                        <option value="HAS_KEY">Has key</option>
                                                        <option value="NOT_HAS_KEY">Not has key</option>
                                                        <option value="HAS_VALUE" selected="">Has value
                                                        </option>
                                                        <option value="NOT_HAS_VALUE">Not has value</option>
                                                        <option value="IS_EMPTY">Is empty</option>
                                                        <option value="NOT_EMPTY">Is not empty</option>
                                                        <option value="GREATER_THAN">Greater than</option>
                                                        <option value="LESS_THAN">Less than</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" value="string">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="STATUS_CODE">Status code</option>
                                                        <option value="JSON_BODY">JSON body</option>
                                                        <option value="HEADERS">Headers</option>
                                                        <option value="TEXT_BODY">Text body</option>
                                                        <option value="RESPONSE_TIME" selected="">Response
                                                            time
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control">
                                                </td>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="EQUALS">Equals</option>
                                                        <option value="NOT_EQUALS">Not equals</option>
                                                        <option value="HAS_KEY">Has key</option>
                                                        <option value="NOT_HAS_KEY">Not has key</option>
                                                        <option value="HAS_VALUE">Has value</option>
                                                        <option value="NOT_HAS_VALUE">Not has value</option>
                                                        <option value="IS_EMPTY">Is empty</option>
                                                        <option value="NOT_EMPTY">Is not empty</option>
                                                        <option value="GREATER_THAN">Greater than</option>
                                                        <option value="LESS_THAN" selected="">Less than
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" value="500">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="STATUS_CODE">Status code</option>
                                                        <option value="JSON_BODY">JSON body</option>
                                                        <option value="HEADERS" selected="">Headers</option>
                                                        <option value="TEXT_BODY">Text body</option>
                                                        <option value="RESPONSE_TIME">Response time</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" value="content-type">
                                                </td>
                                                <td>
                                                    <select class="form-select">
                                                        <option value="EQUALS" selected="">Equals</option>
                                                        <option value="NOT_EQUALS">Not equals</option>
                                                        <option value="HAS_KEY">Has key</option>
                                                        <option value="NOT_HAS_KEY">Not has key</option>
                                                        <option value="HAS_VALUE">Has value</option>
                                                        <option value="NOT_HAS_VALUE">Not has value</option>
                                                        <option value="IS_EMPTY">Is empty</option>
                                                        <option value="NOT_EMPTY">Is not empty</option>
                                                        <option value="GREATER_THAN">Greater than</option>
                                                        <option value="LESS_THAN">Less than</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control"
                                                        value="application/json; charset=UTF-8">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
                            <?php ################################?>
                        </div>
                        <div class="card-footer bg-transparent mt-auto">
                            <div class="btn-list justify-content-end">
                                <button type="reset" value="Reset" class="btn btn-1">
                                    <?php echo $this->lang->line('button_cancel');?></button>
                                <button type="submit" id="submitBtn" value="Submit" class="btn btn-primary btn-2">
                                    <?php echo $this->lang->line('button_submit');?></button>
                            </div>
                        </div>
                    </form>
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