<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Backend extends CI_Controller {
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
        $page=$input['page'];
        if(!$page){$page==1;}
        $pageSize=$input['pageSize']; 
        if(!$pageSize){$pageSize==10;}
        $keyword=$input['keyword']; 
        $config=$this->config;
        //echo '<pre> config=>'; print_r($config); echo '</pre>';   
        $api_url_data= $this->config->item('api_url').$this->config->item('api_sqlite_productjoin').'?page='.$page.'&pageSize='.$pageSize.'&keyword='.$keyword;   
        $rs=$this->Crul_model->call_api_with_token($api_url_data,$_SESSION['token']);
        if(!$rs){
                $data=array('status' => FALSE,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                header('Content-Type: application/json');
                echo json_encode($data);   die(); 
        }
        //echo '<pre> rs=>'; print_r($rs); echo '</pre>';  
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($rs);  
    }

    
}
 