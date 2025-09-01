<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Iot extends CI_Controller {
    public function __construct(){ 
        parent::__construct();
        @session_start();
        $token=$_SESSION['token'];
        if(!$token){   redirect(base_url('/signin')); die(); }
       # header('Content-Type: application/json');
        $this->load->helper('jwt');
    } 
    // $config['api_url']='http://192.168.1.59:3003/v1/';
    // http://localhost:8081:3003/v1/mqtt
    // http://localhost:8081:3003/v1/mqtt
    // http://localhost:8081:3003/v1/mqtt/device?topic=BAACTW02/DATA
    // http://localhost:8081:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=1
    // mqtt_list_paginate_active
    // http://localhost:8081:3003/v1/mqtt/sensercharts?bucket=BAACTW02&field=value&start=-5m&stop=now()&measurement=temperature&windowPeriod=5m&limit=150&offset=0&mean=last
    // http://localhost:8081:3003/v1/mqtt/senserchart?bucket=BAACTW02
    // http://localhost:8081:3003/v1/mqtt/sensercharts?bucket=BAACTW02&deletecache=1
    // http://localhost:8081:3003/v1/mqtt/sensercharts?bucket=BAACTW02
    // http://localhost:8081:3003/v1/mqtt
    // http://localhost:8081:3003/v1/mqtt/device?topic=BAACTW02/DATA
    // http://localhost:8081:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=1
    // mqtt_list_paginate_active
    // http://localhost:8081:3003/v1/mqtt/getdevice?topic=BAACTW02/DATA
    // http://localhost:8081:3003/v1/mqtt/device?topic=BAACTW02/DATA
    // http://localhost:8081:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=0
    // http://localhost:8081:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=1
    // http://localhost:8081:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=2
    // http://localhost:8081:3003/v1/mqtt/control?topic=BAACTW02/CONTROL&message=3


    /*
        http://localhost:8081:8081/api/iot/mqtt
        http://localhost:8081:8081/api/iot/mqttcontrol?topic=BAACTW02/CONTROL&message=0
        http://localhost:8081:8081/api/iot/mqttcontrol?topic=BAACTW02/CONTROL&message=1

        http://localhost:8081:8081/api/iot/mqttgetdevice?topic=BAACTW02/CONTROL
        http://localhost:8081:8081/api/iot/mqttsenserchart?topic=BAACTW02
        http://localhost:8081:8081/api/iot/mqttsensercharts?topic=BAACTW02


        http://localhost:8081/api/iot/mqttgetdevice?device=BAACTW02/DATA
        http://localhost:8081/api/iot/mqttsensercharts?bucket=BAACTW02
        http://localhost:8081/api/iot/mqttsenserchart?bucket=BAACTW02

        //  http://localhost:8081/api/iot/mqtt
        //  http://localhost:8081/api/iot/mqttsensercharts?bucket=BAACTW02
        //  http://localhost:8081/api/iot/mqttsenserchart?bucket=BAACTW02
        //  http://localhost:8081/api/iot/getdevice?device=BAACTW02/DATA
    
    */
    public function index(){
        $data=array('status' => false,
                    'code'=>200,
                    'message' => 'Index',
                    'message_th' => 'Index'
                ); 
        header('Content-Type: application/json');
        echo json_encode($data);   die(); 
        
    }

    public function chio(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $windowPeriod='5m';
        $limit='300';
        $offset='0';
        $mean='last';
        //echo '<pre> token=>'; print_r($token); echo '</pre>';  
        $config=$this->config;
        //echo '<pre> config=>'; print_r($config); echo '</pre>';   
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenserchart;
        //echo '<pre> api_call=>'; print_r($api_call); echo '</pre>'; die(); 
        $url_path= $api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        // echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  die();
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if(!$api_path){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }
    //http://localhost:8081/api/iot/mqtt
    public function mqtt(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();} 
        $config=$this->config;
        //echo '<pre> config=>'; print_r($config); echo '</pre>';   
        $api_url= $this->config->item('api_url').'mqtt'.'?deletecache='.@$input['deletecache'].'&bucket='.@$input['bucket'];
        $api_path=$this->Crul_model->call_api_with_token($api_url,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        } 
        $code=$api_path['code'];
        if($code!='200'){
            // echo 'Error data api'; die();
        }
        $payload=$api_path['payload'];
        $arr=array();
        $arrray_data=array();
        if($payload){
        $i=1;
        foreach ($payload as $key=>$value) {
                  $arr['number']=$i;
                  $arr['mqtt_id']=$value['mqtt_id'];
                  $arr['mqtt_name']=$value['mqtt_name']; 
                  $arr['org']=$value['org'];
                  $arr['bucket']=$value['bucket'];
                  $mqtt=$value['mqtt'];
                  $device=$value['device'];
                //   $arr['value']=$value;
                //   $arr['device']=$device; 
                //   $arr['mqtt']=$mqtt;
                  $arr['device_name']=$mqtt['mqtt_dada'];
                  $arr['mqtt_dada']=$mqtt['mqtt_dada'];
                  $arr['timestamp']=$mqtt['timestamp'];
                  $arr['temperature']=$mqtt['temperature'];
                  $arr['contRelay1']=$mqtt['contRelay1'];
                  $arr['contRelay2']=$mqtt['contRelay2'];
                  $arr['actRelay2']=$mqtt['actRelay2'];
                  $arr['actRelay1']=$mqtt['actRelay1'];
                  $arr['fan1']=$mqtt['fan1'];
                  $arr['overFan1']=$mqtt['overFan1'];
                  $arr['fan2']=$mqtt['fan2'];
                  $arr['overFan2']=$mqtt['overFan2']; 
                  $arr['device_name_1']=$device['0']['device_name'];
                  $arr['device_name_1_status_warning']=$device['0']['status_warning'];
                  $arr['device_name_1_recovery_warning']=$device['0']['recovery_warning'];
                  $arr['device_name_1_status_alert']=$device['0']['status_alert'];
                  $arr['device_name_1_recovery_alert']=$device['0']['recovery_alert'];
                  $arr['device_name_2']=$device['1']['device_name'];
                  $arr['device_name_3']=$device['2']['device_name'];
                  $arr['location_name']=$device['0']['location_name'];   
                $arrray_data[]=$arr;
            }
        }

        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($arrray_data);  
    }

    public function mqtt2(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();} 
        $config=$this->config;
        //echo '<pre> config=>'; print_r($config); echo '</pre>';   
        $api_url= $this->config->item('api_url').'mqtt'.'?deletecache='.@$input['deletecache'];
        $api_path=$this->Crul_model->call_api_with_token($api_url,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }
    
     //http://localhost:8081/api/iot/titledevice
    public function titledevice(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();} 
        $config=$this->config;
        //echo '<pre> config=>'; print_r($config); echo '</pre>';   
        $api_url= $this->config->item('api_url').'mqtt'.'?deletecache='.@$input['deletecache'];
        $api_path=$this->Crul_model->call_api_with_token($api_url,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        } 
        $code=$api_path['code'];
        if($code!='200'){
            // echo 'Error data api'; die();
        }
        $payload=$api_path['payload'];
        $arr=array();
        $arrray_data=array();
        if($payload){
        $i=1;
        foreach ($payload as $key=>$value) {
                  $arr['number']=$i;
                  $arr['mqtt_id']=$value['mqtt_id'];
                  $arr['mqtt_name']=$value['mqtt_name']; 
                  $arr['org']=$value['org'];
                  $arr['bucket']=$value['bucket'];
                  $mqtt=$value['mqtt'];
                  $device=$value['device'];
                //   $arr['value']=$value;
                //   $arr['device']=$device; 
                //   $arr['mqtt']=$mqtt;
                  $arr['device_name']=$mqtt['mqtt_dada'];
                  $arr['mqtt_dada']=$mqtt['mqtt_dada'];
                  $arr['timestamp']=$mqtt['timestamp'];
                  $arr['temperature']=$mqtt['temperature'];
                  $arr['contRelay1']=$mqtt['contRelay1'];
                  $arr['contRelay2']=$mqtt['contRelay2'];
                  $arr['actRelay2']=$mqtt['actRelay2'];
                  $arr['actRelay1']=$mqtt['actRelay1'];
                  $arr['fan1']=$mqtt['fan1'];
                  $arr['overFan1']=$mqtt['overFan1'];
                  $arr['fan2']=$mqtt['fan2'];
                  $arr['overFan2']=$mqtt['overFan2']; 
                  $arr['device_name_1']=$device['0']['device_name'];
                  $arr['device_name_1_status_warning']=$device['0']['status_warning'];
                  $arr['device_name_1_recovery_warning']=$device['0']['recovery_warning'];
                  $arr['device_name_1_status_alert']=$device['0']['status_alert'];
                  $arr['device_name_1_recovery_alert']=$device['0']['recovery_alert'];
                  $arr['device_name_2']=$device['1']['device_name'];
                  $arr['device_name_3']=$device['2']['device_name'];
                  $arr['location_name']=$device['0']['location_name'];   
                $arrray_data[]=$arr;
            }
        }

        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($arrray_data);  
    }

    public function mqttcontrol(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();} 
        $config=$this->config;
        $api_url=  $this->config->item('api_url');
 
        $topic=@$input['topic'];
       if($topic==''){
                $data=array('status' => false,'code'=>500,'message' => 'Please check topic input'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $message=@$input['message'];
        if($message==''){
                $data=array('status' => false,'code'=>500,'message' => 'Please check message input'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
       
        // $config['api_url']='http://192.168.1.59:3003/v1/';
        // 
        $api_url=  $this->config->item('api_url').'mqtt/control?topic='.$topic.'&message='.$message.'&deletecache='.@$input['deletecache'];
       //  echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';  
        $api_res=$this->Crul_model->call_api_with_token($api_url,$token);
        if($api_res==''){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        // echo '<pre> config=>'; print_r($config); echo '</pre>';   
        // echo '<pre> input=>'; print_r($input); echo '</pre>';
        // die(); 
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_res);  
    }
    // <<base_url>>/v1/mqtt/getdevice?topic=BAACTW02/DATA&deletecache=
    // http://localhost:8081/api/iot/mqttgetdevice?device=BAACTW02/DATA
    public function mqttgetdevice(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();} 
        $config=$this->config;

        // echo '<pre> config=>'; print_r($config); echo '</pre>';   
        // <<base_url>>/v1/mqtt/getdevice?topic=BAACTW02/DATA&deletecache=1
        // http://localhost:8081/api/iot/mqttgetdevice?device=BAACTW02/DATA

        $device=@$input['device'];
        if($device==''){
                $data=array('status' => false,'code'=>500,'message' => 'Please check topic device'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }   
        $apiurl= $this->config->item('api_url');
        $api_url=  $apiurl.'mqtt/getdevice?topic='.$device.'&deletecache='.@$input['deletecache'];
        $api_res=$this->Crul_model->call_api_with_token($api_url,$token);
        if($api_res==''){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $statusCode=@$api_res['statusCode'];
        $code=@$api_res['code'];
        if( $code!='200'){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        } 
        
        $topic=@$api_res['topic'];
        $timestamp=@$api_res['timestamp'];
        $data=@$api_res['data'];
        $type_name=@$api_res['type_name'];
        $type_id=@$api_res['type_id'];
        $payload=@$api_res['payload'];
        $dataFrom=@$api_res['dataFrom'];
        $cache2=@$api_res['cache2'];
        
        // http://localhost:8081/api/iot/mqttgetdevice?device=BAACTW02/DATA&deletecache=
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';  
        // echo '<pre> data=>'; print_r($data); echo '</pre>';  
        // echo '<pre> payload=>'; print_r($payload); echo '</pre>';  
        // echo '<pre> api_res=>'; print_r($api_res); echo '</pre>';  die();

        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_res);  
    }
    // http://localhost:8081/api/iot/mqttsensercharts?bucket=BAACTW02
    public function mqttsensercharts(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();} 
        $config=$this->config;
        //echo '<pre> config=>'; print_r($config); echo '</pre>';   
         $device=@$input['device'];
        if($device==''){ $device=@$input['bucket'];}
        if($device==''){ 
                $data=array('status' => false,'code'=>500,'message' => 'Please check topic device'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }   
        $apiurl= $this->config->item('api_url');
        $api_url=  $apiurl.'mqtt/sensercharts?bucket='.$device.'&deletecache='.@$input['deletecache'];
        $api_res=$this->Crul_model->call_api_with_token($api_url,$token);
        if($api_res==''){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json'); 
        $code=@$api_res['code'];
        $statuscode=@$api_res['statuscode'];
        $bucket=@$api_res['bucket']; 
        $payload=@$api_res['payload'];   
        $measurement=@$payload['measurement']; 
        $value=@$payload['value']; 
        $start=@$payload['start']; 
        $stop=@$payload['stop']; 
        $time=@$payload['time']; 
        $chart=@$api_res['chart']; 
        $api_array=array("code"=>$code,
                        "statuscode"=>$statuscode,
                        "bucket"=>$bucket,
                        "measurement"=>$measurement,
                        "value"=>$value,
                        "start"=>$start,
                        "stop"=>$stop,
                        "time"=>$time,
                        "chart"=>$chart,
                        // "payload"=>$payload,
                        );
        echo json_encode($api_array);  
    }
    // http://localhost:8081/api/iot/mqttsenserchart?bucket=BAACTW02
    public function mqttsenserchart(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();} 
        $config=$this->config;
        //echo '<pre> config=>'; print_r($config); echo '</pre>';   
        $device=@$input['device'];
        if($device==''){ $device=@$input['bucket'];}
        if($device==''){
                $data=array('status' => false,'code'=>500,'message' => 'Please check topic device'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }   
        $apiurl= $this->config->item('api_url');
        $api_url=  $apiurl.'mqtt/senserchart?bucket='.$device.'&deletecache='.@$input['deletecache'];
        $api_res=$this->Crul_model->call_api_with_token($api_url,$token);
        if($api_res==''){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$api_url); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }

        /*
         mqttgetdevice
        */

        //echo '<pre> api_res=>'; print_r($api_res); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_res);  
    }
    // http://localhost:8081/api/iot/devicemonitor?bucket=BAACTW02
    public function devicemonitor(){ 
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $device=@$input['device']; // || 'BAACTW05/DATA';
        if($device==''){$device=@$input['bucket'];} 
        $deletecache=@$input['deletecache']; // || 'BAACTW05/DATA'; 
        $apiurl= $this->config->item('api_url').'mqtt/getdevice?topic='.$device.'&deletecache='.@$input['deletecache']; 
        // <<base_url>>/v1/mqtt/getdevice?topic=BAACTW02/DATA&deletecache=
        // http://localhost:8081/api/iot/devicemonitor?bucket=BAACTW02
        echo '<pre> apiurl=>'; print_r($apiurl); echo '</pre>'; 
        echo '<pre> token=>'; print_r($token); echo '</pre>';  
        $apirs=$this->Crul_model->call_api_with_token($apiurl,$token);  
        echo '<pre> apirs=>'; print_r($apirs); echo '</pre>';  die(); 

        if($apirs){
            // $config['api_url']='http://192.168.1.59:3003/v1/';
            $chart_apiurl= $this->config->item('api_url');
            //v1/mqtt/senserchart?bucket=BAACTW02
            $bucket=$apirs['payload']['0']['mqtt_bucket'];
            $chart_api_url=  $chart_apiurl.'mqtt/senserchart?bucket='.$bucket.'&deletecache='.@$input['deletecache'];
            $chart_api=$this->Crul_model->call_api_with_token($chart_api_url,$token);
            if($chart_api==''){
                    $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$chart_api_url); 
                    header('Content-Type: application/json');
                    echo json_encode($data);   die(); 
            }
            header('Content-Type: application/json');
             $data=array('status' => true,
                            'code'=>200,
                            'message' => 'OK',
                            'message_th' => 'OK',
                            "mqtt_dada"=> $apirs['data']['mqtt_dada'],
                            "timestamp"=> $apirs['data']['timestamp'],
                            "temperature"=> $apirs['data']['temperature'],
                            "contRelay1"=> $apirs['data']['contRelay1'],
                            "actRelay1"=> $apirs['data']['actRelay1'],
                            "contRelay2"=> $apirs['data']['contRelay2'],
                            "actRelay2"=> $apirs['data']['actRelay2'],
                            "value"=> $apirs['data']['temperature'],
                            "alert"=> $apirs['data']['overFan1'],
                            "fan1"=> $apirs['data']['fan1'],
                            "fan1_alarm"=> $apirs['data']['overFan1'],
                            "fan2"=> $apirs['data']['fan2'],
                            "fan2_alarm"=> $apirs['data']['overFan2'],
                            "timestamp"=> $apirs['data']['timestamp'], 
                            "bucket"=> $apirs['payload']['0']['mqtt_bucket'],
                            'device_name_1'=>$apirs['payload']['0']['device_name'],
                            'device_name_1_status_warning'=>$apirs['payload']['0']['status_warning'],
                            'device_name_1_recovery_warning'=>$apirs['payload']['0']['recovery_warning'],
                            'device_name_1_status_alert'=>$apirs['payload']['0']['status_alert'],
                            'device_name_1_recovery_alert'=>$apirs['payload']['0']['recovery_alert'],
                            'device_name_2'=>$apirs['payload']['1']['device_name'],
                            'device_name_3'=>$apirs['payload']['2']['device_name'],
                            'chart'=>$chart_api['chart'],
                            "url"=>$apiurl,
                            "url_chart_api"=>$chart_api_url,
                            //'payload'=>$apirs['payload'],
                            "payload_data"=> $apirs['data'], 
                        ); 
            echo json_encode($data);   die(); 
                
        }else{ 
            $data=array('status' => false
                            ,'code'=>500
                            ,'message' => 'Error! Api IoT cannot Connect Please check'
                            ,'message_th' => 'Error! Api IoT cannot Connect Please check'
                            ,'payload'=> array("timestamp"=> date('Y-m-d H:i:s'),
                                        "deviceId"=> "Error",
                                        "temperature"=> '0',
                                        "contRelay1"=>'0',
                                        "actRelay1"=> '0',
                                        "fan1"=> '0',
                                        "overFan1"=> '0',
                                        "contRelay2"=> '0',
                                        "actRelay2"=> '0',
                                        "fan2"=> '0',
                                        "overFan2"=> '0',
                                        "device_id_1"=> '0',
                                        "device_id_2"=> '0',
                                        "device_id_3"=> '0',
                                        'chart'=>[],
                                        "url"=>$apiurl
                                        )
                        ); 
                header('Content-Type: application/json');
                echo json_encode($data);   
                die(); 
        }
    }

    public function devicemonitorV33(){
        // http://localhost:8081/api/iot/getdevice?device=BAACTW02/DATA
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $device=@$input['device']; // || 'BAACTW05/DATA';
        if($device==''){$device=@$input['bucket'];} 
        $deletecache=@$input['deletecache']; // || 'BAACTW05/DATA';
        //http://localhost:8081:3003/v1/mqtt/getdevice?topic=BAACTW02/DATA
        //http://192.168.1.57:3003/v1/mqtt/getdevice?topic=BAACTW02/DATA
        $apiurl= $this->config->item('api_url').'mqtt/getdevice?topic='.$device.'&deletecache='.@$input['deletecache'];  // mqtt/getdevice?topic=BAACTW05/DATA
        $apirs=$this->Crul_model->call_api_with_token($apiurl,$token);
        // echo '<pre> input=>'; print_r($input); echo '</pre>';  
        // echo '<pre> apiurl=>'; print_r($apiurl); echo '</pre>';  
        // echo '<pre> apirs=>'; print_r($apirs); echo '</pre>';  die(); 
        if($apirs){
            // $config['api_url']='http://192.168.1.59:3003/v1/';
            $chart_apiurl= $this->config->item('api_url');
            //v1/mqtt/senserchart?bucket=BAACTW02
            $bucket=$apirs['payload']['0']['mqtt_bucket'];
            $chart_api_url=  $chart_apiurl.'mqtt/senserchart?bucket='.$bucket.'&deletecache='.@$input['deletecache'];
            $chart_api=$this->Crul_model->call_api_with_token($chart_api_url,$token);
            if($chart_api==''){
                    $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check '.$chart_api_url); 
                    header('Content-Type: application/json');
                    echo json_encode($data);   die(); 
            }
            header('Content-Type: application/json');
             $data=array('status' => true,
                            'code'=>200,
                            'message' => 'OK',
                            'message_th' => 'OK',
                            "mqtt_dada"=> $apirs['data']['mqtt_dada'],
                            "timestamp"=> $apirs['data']['timestamp'],
                            "temperature"=> $apirs['data']['temperature'],
                            "contRelay1"=> $apirs['data']['contRelay1'],
                            "actRelay1"=> $apirs['data']['actRelay1'],
                            "contRelay2"=> $apirs['data']['contRelay2'],
                            "actRelay2"=> $apirs['data']['actRelay2'],
                            "value"=> $apirs['data']['temperature'],
                            "alert"=> $apirs['data']['overFan1'],
                            "fan1"=> $apirs['data']['fan1'],
                            "fan1_alarm"=> $apirs['data']['overFan1'],
                            "fan2"=> $apirs['data']['fan2'],
                            "fan2_alarm"=> $apirs['data']['overFan2'],
                            "timestamp"=> $apirs['data']['timestamp'], 
                            "bucket"=> $apirs['payload']['0']['mqtt_bucket'],
                            'device_name_1'=>$apirs['payload']['0']['device_name'],
                            'device_name_1_status_warning'=>$apirs['payload']['0']['status_warning'],
                            'device_name_1_recovery_warning'=>$apirs['payload']['0']['recovery_warning'],
                            'device_name_1_status_alert'=>$apirs['payload']['0']['status_alert'],
                            'device_name_1_recovery_alert'=>$apirs['payload']['0']['recovery_alert'],
                            'device_name_2'=>$apirs['payload']['1']['device_name'],
                            'device_name_3'=>$apirs['payload']['2']['device_name'],
                            'chart'=>$chart_api['chart'],
                            "url"=>$apiurl,
                            "url_chart_api"=>$chart_api_url,
                            //'payload'=>$apirs['payload'],
                            "payload_data"=> $apirs['data'], 
                        ); 
            echo json_encode($data);   die(); 
                
        }else{ 
            $data=array('status' => false
                            ,'code'=>500
                            ,'message' => 'Error! Api IoT cannot Connect Please check'
                            ,'message_th' => 'Error! Api IoT cannot Connect Please check'
                            ,'payload'=> array("timestamp"=> date('Y-m-d H:i:s'),
                                        "deviceId"=> "Error",
                                        "temperature"=> '0',
                                        "contRelay1"=>'0',
                                        "actRelay1"=> '0',
                                        "fan1"=> '0',
                                        "overFan1"=> '0',
                                        "contRelay2"=> '0',
                                        "actRelay2"=> '0',
                                        "fan2"=> '0',
                                        "overFan2"=> '0',
                                        "device_id_1"=> '0',
                                        "device_id_2"=> '0',
                                        "device_id_3"=> '0',
                                        'chart'=>[],
                                        "url"=>$apiurl
                                        )
                        ); 
                header('Content-Type: application/json');
                echo json_encode($data);   
                die(); 
        }
    }

    // http://localhost:8081/api/iot/devicemonitor22?device=BAACTW02/DATA
    public function devicemonitorV2(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-30s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_t_0=$api_path['chart']['data']['0'];
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();   
        $array=[];
        $array['bucket']=$bucket;
        $array['field']=$field;
        $array['start']='-2m';
        $array['stop']="now()";
        $array['measurement']=$measurement;
        $array['windowPeriod']=$windowPeriod;
        $array['limit']="20";
        $array['offset']="0";
        $array['mean']=$mean;
        $data=array('bucket'=>$api_data_t_0['bucket'],
                    'value'=>$api_data_0,
                    'time'=>$api_path['chart']['data']['0']['time'],
                    'measurement'=>$api_path['chart']['data']['0']['measurement'],
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'chart'=>$this->getsenserchart_rt($array),
                    'address'=>$api_call,
                    'code'=>200,
                    //'url_path_chart'=>$url_path_chart
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    // http://localhost:8081/api/iot/getdevice?device=BAACTW02/DATA
    public function getdevice(){
        // http://localhost:8081/api/iot/getdevice?device=BAACTW02/DATA
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $device=@$input['device']; // || 'BAACTW05/DATA';
        $deletecache=@$input['deletecache']; // || 'BAACTW05/DATA';
        //http://localhost:8081:3003/v1/mqtt/getdevice?topic=BAACTW02/DATA
        //http://192.168.1.57:3003/v1/mqtt/getdevice?topic=BAACTW02/DATA
        $apiurl= $this->config->item('api_url').'mqtt/getdevice?topic='.$device.'&deletecache='.@$input['deletecache'];  // mqtt/getdevice?topic=BAACTW05/DATA
        $apirs=$this->Crul_model->call_api_with_token($apiurl,$token);
        // echo '<pre> input=>'; print_r($input); echo '</pre>';  
        // echo '<pre> apiurl=>'; print_r($apiurl); echo '</pre>';  
        // echo '<pre> apirs=>'; print_r($apirs); echo '</pre>';  die(); 
        if($apirs){
            header('Content-Type: application/json');
            /*
            'mq.mqtt_name AS mqtt_name',   
            'mq.org AS mqtt_org',
            'mq.bucket AS mqtt_bucket',    
            'mq.envavorment AS mqtt_envavorment', 
            */
             $data=array('status' => true,
                            'code'=>200,
                            'message' => 'OK',
                            'message_th' => 'OK',
                            'mqtt_name'=>$apirs['payload']['0']['mqtt_name'],
                            'mqtt_org'=>$apirs['payload']['0']['mqtt_org'],
                            'mqtt_bucket'=>$apirs['payload']['0']['mqtt_bucket'],
                            'mqtt_envavorment'=>$apirs['payload']['0']['mqtt_envavorment'],
                            'mqtt_dada'=>$apirs['payload']['0']['mqtt_dada'],
                            "mqtt_dada"=> $apirs['data']['mqtt_dada'],
                            "timestamp"=> $apirs['data']['timestamp'],
                            "temperature"=> $apirs['data']['temperature'],
                            "contRelay1"=> $apirs['data']['contRelay1'],
                            "actRelay1"=> $apirs['data']['actRelay1'],
                            "contRelay2"=> $apirs['data']['contRelay2'],
                            "actRelay2"=> $apirs['data']['actRelay2'],
                            "value"=> $apirs['data']['temperature'],
                            "alert"=> $apirs['data']['overFan1'],
                            "fan1"=> $apirs['data']['fan1'],
                            "fan1_alarm"=> $apirs['data']['overFan1'],
                            "fan2"=> $apirs['data']['fan2'],
                            "fan2_alarm"=> $apirs['data']['overFan2'],
                            "timestamp"=> $apirs['data']['timestamp'], 
                            'device_name_1'=>$apirs['payload']['0']['device_name'],
                            'device_name_1_status_warning'=>$apirs['payload']['0']['status_warning'],
                            'device_name_1_recovery_warning'=>$apirs['payload']['0']['recovery_warning'],
                            'device_name_1_status_alert'=>$apirs['payload']['0']['status_alert'],
                            'device_name_1_recovery_alert'=>$apirs['payload']['0']['recovery_alert'],
                            'device_name_2'=>$apirs['payload']['1']['device_name'],
                            'device_name_3'=>$apirs['payload']['2']['device_name'],
                            "url"=>$apiurl,
                            //'al'=>$apirs,
                            "payload_data"=> $apirs['data'], 
                        ); 
            echo json_encode($data);   die(); 
                
        }else{ 
            $data=array('status' => false
                            ,'code'=>500
                            ,'message' => 'Error! Api IoT cannot Connect Please check'
                            ,'message_th' => 'Error! Api IoT cannot Connect Please check'
                            ,'payload'=> array("timestamp"=> date('Y-m-d H:i:s'),
                                        "deviceId"=> "Error",
                                        "temperature"=> '0',
                                        "contRelay1"=>'0',
                                        "actRelay1"=> '0',
                                        "fan1"=> '0',
                                        "overFan1"=> '0',
                                        "contRelay2"=> '0',
                                        "actRelay2"=> '0',
                                        "fan2"=> '0',
                                        "overFan2"=> '0',
                                        "device_id_1"=> '0',
                                        "device_id_2"=> '0',
                                        "device_id_3"=> '0',
                                        "url"=>$apiurl
                                        )
                        ); 
                header('Content-Type: application/json');
                echo json_encode($data);   
                die(); 
        }
    }

    public function getsenserfilter(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'code'=>200,
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function getsenserchartfilter(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $windowPeriod='15m';
        $limit='300';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenserchart;
        $url_path= $api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }
    
    public function chartbucket(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-8m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                    $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                    header('Content-Type: application/json');
                    echo json_encode($data);   die(); 
        }
        $api_data_t_0=$api_path['chart']['data']['0'];
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();   
        $array=[];
        $array['bucket']=$bucket;
        $array['field']=$field;
        $array['start']='-8m';
        $array['stop']="now()";
        $array['measurement']=$measurement;
        $array['windowPeriod']=$windowPeriod;
        $array['limit']="100";
        $array['offset']="0";
        $array['mean']=$mean;
        $data=array('bucket'=>$api_data_t_0['bucket'],
                    'value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'chart'=>$this->getsenserchart_rt($array),
                    'code'=>200,
                    //'url_path_chart'=>$url_path_chart
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function devicemonitorv4(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_t_0=$api_path['chart']['data']['0'];
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();   
        $array=[];
        $array['bucket']=$bucket;
        $array['field']=$field;
        $array['start']='-1m';
        $array['stop']="now()";
        $array['measurement']=$measurement;
        $array['windowPeriod']=$windowPeriod;
        $array['limit']="100";
        $array['offset']="0";
        $array['mean']=$mean;
        $data=array('bucket'=>$api_data_t_0['bucket'],
                    'value'=>$api_data_0,
                    'time'=>$api_path['chart']['data']['0']['time'],
                    'measurement'=>$api_path['chart']['data']['0']['measurement'],
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'chart'=>$this->getsenserchart_rt($array),
                    'code'=>200,
                    //'url_path_chart'=>$url_path_chart
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function getsenserchart_rt($array){ 
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $bucket=$array['bucket'];// || "BAACTW02";
        $field=$array['field'];
        $start=$array['start'];
        $stop=$array['stop'];
        $measurement=$array['measurement'] ;
        $windowPeriod=$array['windowPeriod'];
        $limit=$array['limit'];
        $offset=$array['offset'];
        $mean=$array['mean'];

        //  echo '<pre> array=>'; print_r($array); echo '</pre>';   
        //  echo '<pre> bucket=>'; print_r($bucket); echo '</pre>';
        //  echo '<pre> field=>'; print_r($field); echo '</pre>'; 
        //  echo '<pre> start=>'; print_r($start); echo '</pre>'; 
        //  echo '<pre> stop=>'; print_r($stop); echo '</pre>'; 
        //  echo '<pre> measurement=>'; print_r($measurement); echo '</pre>'; 
        //  echo '<pre> windowPeriod=>'; print_r($windowPeriod); echo '</pre>'; 
        //  echo '<pre> limit=>'; print_r($limit); echo '</pre>'; 
        //  echo '<pre> offset=>'; print_r($offset); echo '</pre>'; 
        //  echo '<pre> mean=>'; print_r($mean); echo '</pre>';   die();
        
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenserchart;
        $url_path= $api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        return $api_path['chart'];
    }
    
    public function getdatatble(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $limit='20';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url2');
        //echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';  
        $api_data= $this->config->item('api_iot_table'); 
        $api_call=$api_url;
        $url_path= $api_call."?bucket=".$bucket;
        //echo '<pre> token=>'; print_r($token); echo '</pre>';  
        //echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $rss=$this->Crul_model->call_api_with_data($url_path,$token);
        if($rss==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        // echo '<pre> rss=>'; print_r($rss); echo '</pre>';    die();  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($rss);  
       
    }

    public function getsenserchart(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-30m';
        $stop='now()';
        $measurement='temperature';
        $windowPeriod='30m';
        $limit='300';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenserchart;
        $url_path= $api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }

    public function getsenser(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';

       /*
       
          // BAACTW02
          // BAACTW03
          // BAACTW04
          // BAACTW05
          from(bucket: "BAACTW02")
            //|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
            |> range(start: -30s, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "ActRelay1" 
              or r["_measurement"] == "ActRelay2" 
              or r["_measurement"] == "ContRelay1" 
              or r["_measurement"] == "ContRelay2" 
              or r["_measurement"] == "Fan1" 
              or r["_measurement"] == "Fan2" 
              or r["_measurement"] == "OverFan1" 
              or r["_measurement"] == "OverFan2" 
              or r["_measurement"] == "temperature")
            |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
            |> limit(n:1, offset: 0)
            |> yield(name: "last")
            */


        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        } 
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'value_info'=>$api_path['chart']['data']['0'],
                    'alert_info'=>$api_path1['chart']['data']['0'],
                    'fan1_info'=>$api_path2['chart']['data']['0'],
                    'fan2_info'=>$api_path3['chart']['data']['0'],
                    'code'=>200,
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }
    
    public function getsenserlist(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='1s';
        $limit='5';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
         //echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        //echo '<pre> api_path1=>'; print_r($api_path1); echo '</pre>';  
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('Temp'=>$api_path,
                    'Alert'=>$api_path1,
                    'Fan1'=>$api_path2,
                    'Fan1'=>$api_path2,
                    'Fan2'=>$api_path3,
                    'code'=>200,
                    // 'value_info'=>$api_path['chart']['data']['0'],
                    // 'alert_info'=>$api_path1['chart']['data']['0'],
                    // 'fan1_info'=>$api_path2['chart']['data']['0'],
                    // 'fan2_info'=>$api_path3['chart']['data']['0'],
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function getsenserlistdatamonitor(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='10';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }

    public function getsenserlistdata(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='3';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }

    public function getsenserlistdata2(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-15m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15s';
        $limit='300';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }

    public function getsenser1(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'code'=>200,
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }
    
    public function getsenser2(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW03";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'code'=>200,
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function getsenser3(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW04";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'code'=>200,
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function getsenser4(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }else{
            $bucket=@$input['bucket'];
        }
        if(@$bucket==''){
            $bucket="BAACTW05";
        }
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3,
                    'code'=>200,
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function getsenserV0(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $bucket="BAACTW02";
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }
    
    public function getsenserV1(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $bucket="BAACTW02";
        $field='value';
        $start='-1m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='room1Amp';
        $measurement2='room1Relay1';
        $measurement3='room1Relay2';
        $windowPeriod='15m';
        $limit='1';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url');
        $api_getsenser= $this->config->item('api_getsenser');
        $api_getsenserchart= $this->config->item('api_getsenserchart');
        // echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';
        // echo '<pre> api_getsenser=>'; print_r($api_getsenser); echo '</pre>';
        // echo '<pre> api_getsenserchart=>'; print_r($api_getsenserchart); echo '</pre>';  die(); 
        $api_call=$api_url.$api_getsenser;
        $url_path=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        if($api_path==""){
                $data=array('status' => false,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        $api_data_1=$api_path1['chart']['data']['0']['value'];
        /******************/
        $url_path2=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement2."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path2=$this->Crul_model->call_api_with_token($url_path2,$token);
        $api_data_2=$api_path2['chart']['data']['0']['value'];
        /******************/
        $url_path3=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement3."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path3=$this->Crul_model->call_api_with_token($url_path3,$token);
        $api_data_3=$api_path3['chart']['data']['0']['value'];
        // echo '<pre> api_data_0=>'; print_r($api_data_0); echo '</pre>'; 
        // echo '<pre> api_data_1=>'; print_r($api_data_1); echo '</pre>'; 
        // echo '<pre> api_data_2=>'; print_r($api_data_2); echo '</pre>'; 
        // echo '<pre> api_data_3=>'; print_r($api_data_3); echo '</pre>';  die();  
        $data=array('value'=>$api_data_0,
                    'alert'=>$api_data_1,
                    'fan1'=>$api_data_2,
                    'fan2'=>$api_data_3
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }
}