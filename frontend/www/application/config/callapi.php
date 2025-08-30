<?php
$HTTP_HOST = @$_SERVER['HTTP_HOST'];
if($HTTP_HOST==""){
    $HTTP_HOST='127.0.0.1';
} 
$api_url='http://'.$HTTP_HOST; 
$base_url_api = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
//echo "<br> HTTP_HOST=>" .$HTTP_HOST;
if($base_url_api=='http://localhost'){
    $SERVER_PORT = @$_SERVER['SERVER_PORT'];
    $REMOTE_PORT = @$_SERVER['REMOTE_PORT']; 
    $REMOTE_ADDR = @$_SERVER['REMOTE_ADDR'];
    $server_ipv4 = @$_SERVER['SERVER_ADDR'];
    #echo "<br> REMOTE_ADDR=>" .$REMOTE_ADDR;  
    $HTTP_HOST_LOCAL='127.0.0.1';
    $HTTP_HOST=$REMOTE_ADDR;  
    $api_url='http://'.$HTTP_HOST; 
    $base_url_api=$api_url;
 }else if($base_url_api=='http://127.0.0.1'){
    $SERVER_PORT = @$_SERVER['SERVER_PORT'];
    $REMOTE_PORT = @$_SERVER['REMOTE_PORT']; 
    $REMOTE_ADDR = @$_SERVER['REMOTE_ADDR'];
    $server_ipv4 = @$_SERVER['SERVER_ADDR'];
    #echo "<br> REMOTE_ADDR=>" .$REMOTE_ADDR;  
    $HTTP_HOST_LOCAL='127.0.0.1';
    $HTTP_HOST=$REMOTE_ADDR;  
    $api_url='http://'.$HTTP_HOST; 
    $base_url_api=$api_url;
 }
//  else{
//     $REMOTE_ADDR = @$_SERVER['HTTP_HOST'];
//     $HTTP_HOST=$REMOTE_ADDR;  
//     $api_url='http://'.$HTTP_HOST; 
//     $base_url_api=$api_url;
//  }
// echo "<br> base_url_api=>" .$base_url_api; die();

$config['bucket_default']='BAACTW02';
$config['bucket_default_air']='AIR1';
$config['api_url']=$base_url_api.':3003/v1/';
$config['api_url2']=$base_url_api.'api';
$config['api_url_nodered']=$base_url_api.':1881';  
$config['allow_sign_up_from']='1';
$config['api_call_time_mqtt_switch']='10000'; 
$config['api_call_time_mqtt']='10000';
$config['api_call_time']='10000';  
$config['api_call_time2']='10000';  
$config['api_getsenser']='iot/sensers';
$config['api_getsenserchart']='iot/sensercharts';
$config['api_auth_signin']='auth/signin';
$config['api_auth_signinuser']='auth/signinuser';
$config['api_auth_signinapp']='auth/signinapp';
$config['api_auth_users_logout']='users/logout';
$config['api_auth_users_profile']='users/profile';
$config['api_auth_signup']='auth/signup';
$config['api_iot_chart']='api/iot';  
$config['api_iot_getsenser_top']='api/iot/getsenser?bucket=';
$config['api_iot_getsenser']='api/iot/getsenser?bucket=';
$config['api_iot_getsenserlistdata']='api/iot/getsenserlistdata?bucket=';
$config['api_iot_getsenserlistdata2']='api/iot/getsenserlistdata2?bucket=';
$config['api_iot_getsenserlistdata_monitor']='api/iot/getsenserlistdatamonitor?bucket=';
$config['api_data']='api';
$config['api_iot_table']='iot/getdatatble?bucket=';
$config['api_iot_getsenserchartfilter']='/api/iot/getsenserchartfilter?bucket=';
$config['api_iot_devicemonitor']='/api/iot/devicemonitor?bucket=';
$config['api_iot_devicemonitorv2']='/api/iot/devicemonitorv2?bucket=';
$config['api_iot_chart_bucket']='/api/iot/chartbucket?bucket=';
$config['api_forgot_password']='users/forgot-password';
$config['api_resetpassword']='users/resetpassword';
$config['api_updateprofile']='users/updateprofile';
$config['api_signinotp']='auth/signinotp';
$config['api_verificationotp']='auth/verifyuserotp';
$config['api_sqlite_productjoin']='sqlite/productjoin';