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
   
    public function index(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        if($input==''){
            $bucket="BAACTW02";
        }
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-8m';
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
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
		}
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($api_path);  
    }

    public function getsenserfilter(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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

    public function getsenserchartfilter(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-5m';
        $stop='now()';
        $measurement='temperature';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $array['start']='-15m';
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
                    //'url_path_chart'=>$url_path_chart
        );
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($data);  
    }

    public function devicemonitor(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $array['start']='-5m';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $limit='20';
        $offset='0';
        $mean='last';
        $api_url= $this->config->item('api_url2');
        echo '<pre> api_url=>'; print_r($api_url); echo '</pre>';  
        $api_data= $this->config->item('api_iot_table'); 
        $api_call=$api_url;
        $url_path= $api_call."?bucket=".$bucket;
         echo '<pre> token=>'; print_r($token); echo '</pre>';  
        echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $rss=$this->Crul_model->call_api_with_data($url_path,$token);
        if(!$rss){
 		  redirect(base_url('error500'));  die();
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
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-5m';
        $stop='now()';
        $measurement='temperature';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-10s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
		}
        $api_data_0=$api_path['chart']['data']['0']['value'];
        /******************/
        $url_path1=$api_call."?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement1."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
         echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path1=$this->Crul_model->call_api_with_token($url_path1,$token);
        echo '<pre> api_path1=>'; print_r($api_path1); echo '</pre>';  
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
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-50s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
         if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $bucket=@@$input['bucket'];
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
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW02";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
    
    public function getsenser2(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW03";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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

    public function getsenser3(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW04";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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

    public function getsenser4(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();}
        $bucket=@@$input['bucket'];
        if(@$bucket==''){
            $bucket="BAACTW05";
        }
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $measurement1='ActRelay1';
        $measurement2='Fan1';
        $measurement3='Fan2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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

    public function getsenserV0(){
        if(!@$_SESSION['token']){
 			redirect(base_url('dashboard'));  die();
		}else{
             $token=$_SESSION['token'];
        } 
        $bucket="BAACTW02";
        $field='value';
        $start='-5s';
        $stop='now()';
        $measurement='temperature';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
        $start='-5m';
        $stop='now()';
        $measurement='temperature';
        $measurement1='room1Amp';
        $measurement2='room1Relay1';
        $measurement3='room1Relay2';
        $windowPeriod='5s';
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
        if(!$api_path){
 		  redirect(base_url('error500'));  die();
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
/*
from(bucket: "BAACTW02")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "room2Relay2" or r["_measurement"] == "room3Amp" or r["_measurement"] == "room3Relay1" or r["_measurement"] == "room3Relay2" or r["_measurement"] == "room4Amp" or r["_measurement"] == "room4Relay1" or r["_measurement"] == "room4Relay2" or r["_measurement"] == "room1Relay1" or r["_measurement"] == "room1Relay2" or r["_measurement"] == "room2Amp" or r["_measurement"] == "room2Relay1")
  |> filter(fn: (r) => r["_field"] == "value"  or(r["_field"] == "value" and r["_value"] != "0.5"))
  |> aggregateWindow(every: v.windowPeriod, fn: last, createEmpty: false)
  |> yield(name: "last")

*/