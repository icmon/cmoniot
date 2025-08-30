<?php
// ตรวจสอบการล็อกอินและโหลดข้อมูลเริ่มต้น
$language = $this->lang->language;
$lang = $this->lang->line('lang');
$langs = $this->lang->line('langs');

if (!@$_SESSION['token']) {
    redirect(base_url('dashboard'));
    die();
} else {
    $token = $_SESSION['token'];
}

$input = @$this->input->post();
if ($input == null) {
    $input = @$this->input->get();
} 
$api_createemail = $this->config->item('api_url') . 'settings/createemail';
$home_url = base_url('settings/email'); 
?>
<!-- CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/addons/');?>dataTables.dataTables.css" />
<!-- JS -->
<script src="<?php echo base_url('assets/addons/');?>jquery-3.7.1.min.js"></script>
<script src="<?php echo base_url('assets/addons/');?>dataTables.js"></script>
<script src="<?php echo base_url('assets/addons/');?>sweetalert2@11.js"></script>

<script>
// ตัวแปรจาก PHP (ใช้ใน JS), กำหนดโดยไม่ใส่เครื่องหมาย quote ซ้อน
var api_url = <?php echo json_encode($api_url); ?>;
var api_createemail = <?php echo json_encode($api_createemail); ?>;
var tokens = <?php echo json_encode($token); ?>;
var home_url = <?php echo json_encode($home_url); ?>;

console.log("api_url:", api_url);
console.log("api_createemail:", api_createemail);
console.log("token:", tokens);
console.log("home_url:", home_url);
</script>

<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10 mx-auto">
                <form id="alarmForm">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <h3 class="card-title mb-0">Add email</h3>
                            <div>
                                <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                    <i class="fa fa-home"></i> Main
                                </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="mb-2">
                                <label class="form-label" for="email_name">Email name</label>
                                <input type="text" id="email_name" name="email_name" class="form-control" required />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="host">Host</label>
                                <input type="text" id="host" name="host" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="port">Port</label>
                                <input type="text" id="port" name="port" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="username">Username</label>
                                <input type="text" id="username" name="username" class="form-control" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label" for="password">Password</label>
                                <input type="text" id="password" name="password" class="form-control" />
                            </div>

                        </div>

                        <div class="card-footer bg-transparent mt-auto">
                            <div class="btn-list justify-content-end d-flex">
                                <button type="submit" id="submitBtn" class="btn btn-primary btn-2">
                                    <?php echo $this->lang->line('button_submit'); ?>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <div id="responseMessage" style="margin-top:20px;"></div>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('alarmForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent form submission until validated

    // Clear previous messages if you show any
    const messages = [];

    // Get form field values trimmed
    const emailName = document.getElementById('email_name').value.trim();
    const host = document.getElementById('host').value.trim();
    const port = document.getElementById('port').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate email_name (required)
    if (emailName === '') {
        messages.push('Please enter your Email name.');
    }

    // Validate host (optional, but if provided, check basic format)
    // Basic hostname validation (letters, numbers, dots, hyphen)
    if (host !== '') {
        const hostRegex = /^[a-zA-Z0-9.-]+$/;
        if (!hostRegex.test(host)) {
            messages.push('Host contains invalid characters.');
        }
    }

    // Validate port (optional, but if provided, must be number and valid TCP port)
    if (port !== '') {
        const portNum = Number(port);
        if (
            isNaN(portNum) ||
            !Number.isInteger(portNum) ||
            portNum < 1 ||
            portNum > 65535
        ) {
            messages.push('Port must be an integer between 1 and 65535.');
        }
    }

    // Username and password are optional, but can be checked for length or characters if needed
    // For example:
    // if(username !== '' && username.length < 3){
    //     messages.push('Username, if set, must be at least 3 characters.');
    // }

    if (messages.length > 0) {
        // Show error messages to user
        alert(messages.join('\n'));
        return false; // stop submission
    }

    // If here, all validation passed
    // You can proceed with form submission logic (e.g. AJAX/fetch call)
    // Example:
    // this.submit();

    // For example, you might call your existing save routine here
    console.log('Form validated, submitting...');

    // If you're doing AJAX submission as in your previous code, trigger it here
});

document.getElementById('alarmForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateDevicealarmForm()) return;
    // ปิดปุ่ม submit เพื่อป้องกันการส่งซ้ำ
    document.getElementById('submitBtn').disabled = true;
    // สร้าง payload สำหรับส่งข้อมูล
    const formData = {
        email_name: document.getElementById('email_name').value,
        host: document.getElementById('host').value,
        port: document.getElementById('port').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    console.log("Sending data:", formData);

    fetch(api_createemail, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokens}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(resp => {
            document.getElementById('submitBtn').disabled = false;
            const msgBox = document.getElementById('responseMessage');

            if (resp.status === 'success' || resp.code === 201 || resp.statusCode === 201 || resp.code ===
                200 || resp.statusCode === 200) {
                msgBox.innerHTML = '<div class="alert alert-success">Save data successful!</div>';
                Swal.fire({
                    icon: 'success',
                    title: '<?php echo $this->lang->line('t2_Create_successful'); ?>',
                    text: '<?php echo $this->lang->line('t2_New_data_has_been_created'); ?>',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = home_url;
                });
            } else {
                msgBox.innerHTML = '<div class="alert alert-danger">Save data failed: ' + (resp.message ||
                    'Unknown error') + '</div>';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: resp.message || 'Unknown error',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        })
        .catch(error => {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('responseMessage').innerHTML =
                '<div class="alert alert-danger">Error saving data: ' + error + '</div>';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
                timer: 2000,
                showConfirmButton: false
            });
            console.error('Error:', error);
        });
});

function validateDevicealarmForm() {
    let valid = true;
    let messages = [];

    let emailName = document.getElementById('email_name').value.trim();
    if (emailName === '') {
        valid = false;
        messages.push('Please enter your email name');
    }

    // สามารถเพิ่มตรวจสอบอื่น ๆ เช่น ตรวจสอบ port เป็นตัวเลข หรือรูปแบบ email_name ได้

    if (!valid) {
        Swal.fire({
            icon: 'warning',
            title: 'Incorrect information | ข้อมูลไม่ถูกต้อง',
            html: messages.join('<br>'),
            timer: 2500,
            showConfirmButton: false
        });
    }

    return valid;
}
</script>