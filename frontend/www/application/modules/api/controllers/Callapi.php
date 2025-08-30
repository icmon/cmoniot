<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//require_once APPPATH."/third_party/Requests/Requests.php";
class Callapi extends CI_Controller {
    public function __construct(){ 
        parent::__construct();
        @session_start();
        $token=$_SESSION['token'];
        if(!$token){   redirect(base_url('/signin')); die(); }
        header('Content-Type: application/json');
        $this->load->helper('jwt');
    } 
      
    public function index(){
        // $this->load->model('Crul_model');
        //$apiurl=base_url('api');  
        //echo '<pre> apiurl=>'; print_r($apiurl); echo '</pre>';  
        $token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNDkzZTc0LWNkYzMtNDA2MC04ZGIyLTIyMDQ2M2E4MGYyMCIsImlhdCI6MTc0NzQ3ODIwOSwiZXhwIjoxNzUwMDcwMjA5fQ.Gfvwe_DR5-KysXNY3J0SU2zhW8Vsi2F4MH-yXUVdxMg';
        $bucket="cmon_bucket";
        $field='value';
        $start='-1h';
        $stop='now()';
        $measurement='room2Temp';
        $windowPeriod='5s';
        $limit='200';
        $offset='0';
        $mean='last';
        $url_path="http://localhost:3003/v1/iot/getsenserchart?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        //header('Content-Type: application/json');
        echo json_encode($api_path);  
    }

    public function getsenserchart(){
        // $this->load->model('Crul_model');
        //$apiurl=base_url('api');  
        //echo '<pre> apiurl=>'; print_r($apiurl); echo '</pre>';  
        $token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNDkzZTc0LWNkYzMtNDA2MC04ZGIyLTIyMDQ2M2E4MGYyMCIsImlhdCI6MTc0NzQ3ODIwOSwiZXhwIjoxNzUwMDcwMjA5fQ.Gfvwe_DR5-KysXNY3J0SU2zhW8Vsi2F4MH-yXUVdxMg';
        $bucket="cmon_bucket";
        $field='value';
        $start='-1h';
        $stop='now()';
        $measurement='room2Temp';
        $windowPeriod='5s';
        $limit='200';
        $offset='0';
        $mean='last';
        $url_path="http://localhost:3003/v1/iot/getsenserchart?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        //header('Content-Type: application/json');
        echo json_encode($api_path);  
    }
    
    public function getsenser(){
        // $this->load->model('Crul_model');
        //$apiurl=base_url('api');  
        //echo '<pre> apiurl=>'; print_r($apiurl); echo '</pre>';  
        $token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNDkzZTc0LWNkYzMtNDA2MC04ZGIyLTIyMDQ2M2E4MGYyMCIsImlhdCI6MTc0NzQ3ODIwOSwiZXhwIjoxNzUwMDcwMjA5fQ.Gfvwe_DR5-KysXNY3J0SU2zhW8Vsi2F4MH-yXUVdxMg';
        $bucket="cmon_bucket";
        $field='value';
        $start='-8s';
        $stop='now()';
        $measurement='room2Temp';
        $windowPeriod='5s';
        $limit='1';
        $offset='0';
        $mean='last';
        $url_path="http://localhost:3003/v1/iot/getsenser?bucket=".$bucket."&field=".$field."&start=".$start."&stop=".$stop."&measurement=".$measurement."&windowPeriod=".$windowPeriod."&limit=".$limit."&offset=".$offset."&mean=".$mean;
        #echo '<pre> url_path=>'; print_r($url_path); echo '</pre>';  
        $api_path=$this->Crul_model->call_api_with_token($url_path,$token);
        //echo '<pre> api_path=>'; print_r($api_path); echo '</pre>';  
        //header('Content-Type: application/json');
        echo json_encode($api_path);  
    }
}