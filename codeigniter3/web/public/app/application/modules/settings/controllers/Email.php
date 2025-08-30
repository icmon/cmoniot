<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Email extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	}
	public function apiget(){
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
		$ListSelect = array("title" => 'Settings Email');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/email/emaillist';
		$this->load->view('template/template',$data);
        }   
        public function create(){
                $input=@$this->input->post(); 
		$ListSelect = array("title" => 'Settings Email');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/email/emailcreate';
		$this->load->view('template/template',$data);
        }  
        public function edit(){
                $input=@$this->input->post(); 
		$ListSelect = array("title" => 'Settings Email');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/email/editemail';
		$this->load->view('template/template',$data);
        } 
}