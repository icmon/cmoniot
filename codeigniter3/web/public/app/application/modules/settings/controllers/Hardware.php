<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Hardware extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	}public function apiget(){
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $page=@$input['page'];
                if(!$page){$page==1;}
                $pageSize=@$input['pageSize']; 
                if(!$pageSize){$pageSize==10;}
                $keyword=@$input['keyword']; 
                $config=$this->config;
                // echo '<pre> config=>'; print_r($config); echo '</pre>';   
                $api_url_data= $this->config->item('api_url').'sqlite/productjoin?page='.$page.'&pageSize='.$pageSize.'&keyword='.$keyword;      
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
	
	public function index(){
		$ListSelect = array("title" => 'Settings Hardware');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/hardware/settings';
                        $this->load->view('template/template',$data);
                } 
                
        public function insert(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                //// echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                //// echo 'Schedule insert';
                } 

        public function insertdb(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                //// echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                //// echo 'Schedule insert';
                } 

                public function detail(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                //// echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                echo 'Schedule detail';
                } 

        public function edit(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                //// echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                echo 'Schedule edit';
                } 
        public function editdb(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                //// echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                echo 'Schedule edit';
                } 

        public function delete(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                $id=@$input['id'];
                // //// echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                $array=array('code'=>200,'message'=>'OK','id'=>$id,'payload'=>$input);
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($array);  
                } 

}