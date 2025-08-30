<?php
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
if ($input == null) { $input = @$this->input->get(); }
$id = $input['id'] ?? '';
$api_url = $this->config->item('api_url') . 'settings/lismqtt?mqtt_id=' . $id;

$home_url = base_url('settings/mqtt');
$edit_url = base_url('settings/mqtt/edit?id=' . $id);
?>
<script>
var apiUrl = <?php echo json_encode($api_url); ?>;
var token = <?php echo json_encode($token); ?>;
var mqtt_ids = <?php echo json_encode($input['id']); ?>;
</script>

<style>
body.theme-dark {
    background-color: #18191a !important;
    color: #f1f1f1 !important;
}

body.theme-dark .card {
    background-color: #23272b !important;
    color: #f1f1f1;
    border-color: #343a40;
    box-shadow: 0 0 15px 1px #1118;
}

body.theme-dark .card-header {
    background-color: #23272b !important;
    color: #fff;
}

body.theme-dark .btn-light {
    background: #333 !important;
    color: #fff !important;
    border-color: #444 !important;
}

body.theme-dark .btn-warning {
    background: #f59e42 !important;
    color: #23272b !important;
    border-color: #f59e42 !important;
}

body.theme-dark .table-mqtt {
    background-color: #23272b;
    color: #f1f1f1;
    border-color: #444;
}

body.theme-dark .table-mqtt th,
body.theme-dark .table-mqtt td {
    border-color: #444;
}

body.theme-dark .table-mqtt th {
    background: #222;
    color: #fff;
}

body.theme-light {
    background-color: #f8f9fa !important;
    color: #212529 !important;
}

body.theme-light .card {
    background-color: #f8fbff !important;
    color: #212529;
    border-color: #dee2e6;
    box-shadow: 0 0 15px 1px #b0c4de44;
}

body.theme-light .card-header {
    background-color: #007bff !important;
    color: #fff;
}

body.theme-light .btn-light {
    background: #fff !important;
    color: #007bff !important;
    border-color: #007bff !important;
}

body.theme-light .btn-warning {
    background: #ffc107 !important;
    color: #212529 !important;
    border-color: #ffc107 !important;
}

body.theme-light .table-mqtt {
    background-color: #f8fbff;
    color: #212529;
    border-color: #dee2e6;
}

body.theme-light .table-mqtt th,
body.theme-light .table-mqtt td {
    border-color: #dee2e6;
}

body.theme-light .table-mqtt th {
    background: #e9ecef;
    color: #212529;
}

.table-mqtt {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0;
}

.table-mqtt th,
.table-mqtt td {
    padding: 8px 12px;
    border: 1px solid;
    text-align: left;
    vertical-align: top;
    word-break: break-all;
}

@media (max-width: 700px) {

    .table-mqtt,
    .table-mqtt thead,
    .table-mqtt tbody,
    .table-mqtt th,
    .table-mqtt td,
    .table-mqtt tr {
        display: block;
        width: 100%;
    }

    .table-mqtt tr {
        margin-bottom: 10px;
        border: 1px solid #444;
    }

    .table-mqtt th {
        background: #222;
        color: #fff;
        font-weight: bold;
        padding-top: 12px;
    }

    .table-mqtt td {
        border: none;
        position: relative;
        padding-left: 50%;
        background: inherit;
    }

    .theme-light .table-mqtt td {
        background: #f8fbff;
        color: #212529;
    }

    .theme-dark .table-mqtt td {
        background: #23272b;
        color: #f1f1f1;
    }

    .table-mqtt td:before {
        position: absolute;
        left: 12px;
        width: 45%;
        white-space: nowrap;
        content: attr(data-label);
        font-weight: bold;
        color: #ffc107;
    }
}

.card-header .d-flex {
    width: 100%;
}

@media (max-width: 575.98px) {
    .card-header .d-flex {
        float: none;
        display: block;
        margin-top: 0.5rem;
    }
}
</style>
<style>
:root {
    --tblr-primary: #206bc4;
    --tblr-red: #d63939;
}

body.theme-dark {
    --tblr-primary: #4dabf7;
    --tblr-red: #ff8787;
    background: #18191a;
    color: #f1f1f1;
}

body.theme-light {
    --tblr-primary: #206bc4;
    --tblr-red: #d63939;
    background: #f8f9fa;
    color: #212529;
}

/* Custom link colors */
a.custom-link-primary {
    color: color-mix(in srgb, transparent, var(--tblr-primary) 100%);
    text-decoration: underline;
    transition: color 0.2s;
}

a.custom-link-primary:hover {
    color: color-mix(in srgb, transparent, var(--tblr-primary) 70%);
}

a.custom-link-red {
    color: color-mix(in srgb, transparent, var(--tblr-red) 80%);
    text-decoration: underline;
    transition: color 0.2s;
}

a.custom-link-red:hover {
    color: color-mix(in srgb, transparent, var(--tblr-red) 100%);
}

/* ตัวอย่างสำหรับปุ่ม */
.btn-custom-mix {
    background: color-mix(in srgb, transparent, var(--tblr-primary) 100%);
    color: #fff;
    border: none;
    padding: 0.375rem 1rem;
    border-radius: 4px;
    margin-right: 0.5rem;
    transition: background 0.2s;
}

.btn-custom-mix:hover {
    background: color-mix(in srgb, transparent, var(--tblr-primary) 70%);
}

.btn-custom-red {
    background: color-mix(in srgb, transparent, var(--tblr-red) 80%);
    color: #fff;
    border: none;
    padding: 0.375rem 1rem;
    border-radius: 4px;
    transition: background 0.2s;
}

.btn-custom-red:hover {
    background: color-mix(in srgb, transparent, var(--tblr-red) 100%);
}

/* Theme toggle button */
.theme-toggle-btn {
    margin-left: 1rem;
    background: #8882;
    border: none;
    border-radius: 4px;
    padding: 0.375rem 0.75rem;
    color: inherit;
    cursor: pointer;
}
</style>
<div class="page-body">
    <div class="container-xl">
        <div class="row justify-content-center">
            <div class="col-10 col-lg-12 mx-auto">
                <div class="card shadow-sm">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <div>
                            <h3 class="card-title mb-0">MQTT Information</h3>
                        </div>
                        <div>
                            <div class="d-flex gap-2">
                                <a href="<?php echo $home_url; ?>" class="btn btn-light btn-sm">
                                    <i class="fa fa-home"></i> Main
                                </a>
                                <a href="<?php echo $edit_url; ?>" class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i> Edit
                                </a>
                                <button id="toggleThemeBtn" class="btn btn-secondary btn-sm" title="เปลี่ยนธีม">
                                    <i class="fa fa-moon"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div style="overflow-x:auto;">
                            <table class="table-mqtt">
                                <tbody>
                                    <tr>
                                        <th>Type</th>
                                        <td id="type_name"></td>
                                    </tr>
                                    <tr>
                                        <th>MQTT Name</th>
                                        <td id="mqtt_name"></td>
                                    </tr>
                                    <tr>
                                        <th>Host</th>
                                        <td id="host"></td>
                                    </tr>
                                    <tr>
                                        <th>Port</th>
                                        <td id="port"></td>
                                    </tr>
                                    <tr>
                                        <th>Username</th>
                                        <td id="username"></td>
                                    </tr>
                                    <tr>
                                        <th>Password</th>
                                        <td id="password"></td>
                                    </tr>
                                    <tr>
                                        <th>Secret</th>
                                        <td id="secret"></td>
                                    </tr>
                                    <tr>
                                        <th>Expire In</th>
                                        <td id="expire_in"></td>
                                    </tr>
                                    <tr>
                                        <th>Token</th>
                                        <td id="token_field"></td>
                                    </tr>
                                    <tr>
                                        <th>Org</th>
                                        <td id="org"></td>
                                    </tr>
                                    <tr>
                                        <th>Bucket</th>
                                        <td id="bucket"></td>
                                    </tr>
                                    <tr>
                                        <th>Envavorment</th>
                                        <td id="envavorment"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="responseMessage" style="margin-top:20px;"></div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

<script>
function setValue(id, value, label) {
    var td = document.getElementById(id);
    if (td) {
        td.textContent = value ?? '';
        td.setAttribute('data-label', label);
    }
}

function loadMqttData() {
    var bearerToken = <?php echo json_encode($_SESSION['token']); ?>;
    var baseApiUrl = <?php echo json_encode($this->config->item('api_url')); ?>;
    var apiUrl = `${baseApiUrl}settings/lismqtt?mqtt_id=` + mqtt_ids;
    fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(resp => {
            var data = resp.payload && resp.payload.data && resp.payload.data[0] ? resp.payload.data[0] :
                null;
            if (!data) {
                document.getElementById('responseMessage').innerHTML =
                    '<div class="alert alert-danger">ไม่พบข้อมูล</div>';
                return;
            }
            setValue('type_name', data.type_name, 'Type');
            setValue('mqtt_name', data.mqtt_name, 'MQTT Name');
            setValue('host', data.host, 'Host');
            setValue('port', data.port, 'Port');
            setValue('username', data.username, 'Username');
            setValue('password', data.password, 'Password');
            setValue('secret', data.secret, 'Secret');
            setValue('expire_in', data.expire_in, 'Expire In');
            setValue('token_field', data.token_value, 'Token');
            setValue('org', data.org, 'Org');
            setValue('bucket', data.bucket, 'Bucket');
            setValue('envavorment', data.envavorment, 'Envavorment');
        })
        .catch(error => {
            document.getElementById('responseMessage').innerHTML =
                '<div class="alert alert-danger">เกิดข้อผิดพลาด: ' + error + '</div>';
        });
}
// Theme logic
function getThemeFromQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    var theme = urlParams.get('theme');
    if (theme === 'dark' || theme === 'light') return theme;
    return null;
}

function getTheme() {
    let theme = localStorage.getItem('tabler-theme');
    if (theme === 'dark' || theme === 'light') return theme;
    theme = getThemeFromQuery();
    if (theme) return theme;
    return 'light';
}

function setTheme(theme) {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('tabler-theme', theme);
    var btn = document.getElementById('toggleThemeBtn');
    if (btn) {
        btn.innerHTML = theme === 'dark' ?
            '<i class="fa fa-sun"></i>' :
            '<i class="fa fa-moon"></i>';
        btn.title = theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setTheme(getTheme());
    loadMqttData();
    var btn = document.getElementById('toggleThemeBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            let theme = getTheme();
            theme = (theme === 'dark') ? 'light' : 'dark';
            setTheme(theme);
        });
    }
});
</script>