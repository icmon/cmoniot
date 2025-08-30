<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Api extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template'); 
		$this->load->model('User_model');
	}
	public function apiget(){
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
                // echo '<pre> config=>'; print_r($config); echo '</pre>';   
                $api_url_data= $this->config->item('api_url').'users/list?page='.$page.'&pageSize='.$pageSize.'&keyword='.$keyword;      
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
        public function apipostupdateprofile(){
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $uid=$input['uid']; 
                if($uid==''){
                        $data=array('status' => FALSE,'code'=>500,'message' => 'Error! uid Api IoT cannot Connect Please check','uid'=>$uid); 
                        header('Content-Type: application/json');
                        echo json_encode($data);   die(); 
                }
                
                $active_status=$input['active_status'];  
                if($active_status==''){
                        $data=array('status' => FALSE,'code'=>500,'message' => 'Error! active_status Api IoT cannot Connect Please check','data'=>$active_status); 
                        header('Content-Type: application/json');
                        echo json_encode($data);   die(); 
                }
                $config=$this->config;
                $url= $this->config->item('api_url').'users/updateprofile';     
                $array=array('uid'=>$uid,'active_status'=>$active_status); 
                $rs=$this->Crul_model->call_api_with_token_post($url,$token,$array);
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
        public function apiprofiledelete(){
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $uid=$input['uid']; 
                if($uid==''){
                        $data=array('status' => FALSE,'code'=>500,'message' => 'Error! uid Api IoT cannot Connect Please check','uid'=>$uid); 
                        header('Content-Type: application/json');
                        echo json_encode($data);   die(); 
                }
                
                $api_url_data= $this->config->item('api_url').'users/deleteprofile?uid='.$uid;      
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
        public function roles(){
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
                // echo '<pre> config=>'; print_r($config); echo '</pre>';   
                $api_url_data= $this->config->item('api_url').'roles';      
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
        public function apilistuserlogget(){
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
                $id=$input['id']; 
                $log_type_id=$input['log_type_id']; 
                $sort=$input['sort']; 
                if($sort==''){
                    $sort='create-DESC';
                }
                $config=$this->config;
                // echo '<pre> config=>'; print_r($config); echo '</pre>';   
                //{{base_url}}/v1/syslog/listuserlog?sort=id-DESC
                $api_url_data= $this->config->item('api_url').'syslog/listuserlog?page='.$page.'&pageSize='.$pageSize.'&keyword='.$keyword.'&sort='.$sort.'&log_type_id='.$log_type_id.'&id='.$id;              
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