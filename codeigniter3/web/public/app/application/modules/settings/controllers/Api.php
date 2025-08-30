<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends MX_Controller {
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
	public function noderedapi(){
                // api_url_nodered
                // http://localhost/settings/api/noderedapi
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $config=$this->config;
                // echo '<pre> config=>'; print_r($config); echo '</pre>';      
                $api_node_red= $this->config->item('api_url_nodered').'/auth/token';   
		$postSignin=array('client_id'=>'node-red-admin',
                                'grant_type'=>'password',
                                'scope'=>'*',
                                'username'=>'admin',
                                'password'=>'password');
		$rs=$this->Crul_model->call_api_post($api_node_red,$postSignin);
                $access_token=$rs['access_token'];
                $expires_in=$rs['expires_in'];
                $token_type=$rs['token_type'];
                // echo '<pre> api_node_red=>'; print_r($api_node_red); echo '</pre>';  
                // echo '<pre> postSignin=>'; print_r($postSignin); echo '</pre>';  
                // echo '<pre> rs=>'; print_r($rs); echo '</pre>';  die();
                $api_url_data= $this->config->item('api_url_nodered').'/flows';      
                $rss=$this->Crul_model->call_api_with_token($api_url_data,$access_token);
                //$nodes=$rss[''];
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($rss);  
        } 
        public function noderedgetbyflowid(){
                // api_url_nodered
                // http://localhost/settings/api/noderedapi
                // http://localhost/settings/api/noderedgetbyflowid
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $config=$this->config;
                // echo '<pre> config=>'; print_r($config); echo '</pre>';      
                $api_node_red= $this->config->item('api_url_nodered').'/auth/token';   
		$postSignin=array('client_id'=>'node-red-admin',
                                'grant_type'=>'password',
                                'scope'=>'*',
                                'username'=>'admin',
                                'password'=>'password');
		$rs=$this->Crul_model->call_api_post($api_node_red,$postSignin);
                $access_token=$rs['access_token'];
                $expires_in=$rs['expires_in'];
                $token_type=$rs['token_type'];
                // echo '<pre> api_node_red=>'; print_r($api_node_red); echo '</pre>';  
                // echo '<pre> postSignin=>'; print_r($postSignin); echo '</pre>';  
                // echo '<pre> rs=>'; print_r($rs); echo '</pre>';  die();
                $api_url_data= $this->config->item('api_url_nodered').'/flows';      
                $rss=$this->Crul_model->call_api_with_token($api_url_data,$access_token);
                $data=array();
                if($rss){
                   $rs=array();
                   foreach($rss as $key => $value) { 
                      $rs['id'] = $value['id'];
                      $name = $value['name'];
                      $rs['name'] = $value['name'];
                      $type = $value['type'];
                      $rs['type'] = $type;
                      $rs['property'] = $value['property'];
                       $rs['property'] = $value['property'];
                       //if($name && $type=='function'){
                       if($name){
                        if($name=='BAACTW02/DATA'){
                             $data[]=$value;   
                        } 
                       } 
                   }
                }
                // echo '<pre> data=>'; print_r($data); echo '</pre>'; 
                // echo '<pre> rss=>'; print_r($rss); echo '</pre>';    die();
                ob_clean();
                header('Content-Type: application/json'); 
                echo json_encode($data);  
        } 
        public function index(){
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
                // // echo '<pre> config=>'; print_r($config); echo '</pre>';   
                // $api_url_data= $this->config->item('api_url').'sqlite/productjoin?page='.$page.'&pageSize='.$pageSize.'&keyword='.$keyword;      
                // $rs=$this->Crul_model->call_api_with_token($api_url_data,$_SESSION['token']);
                // if(!$rs){
                //         $data=array('status' => FALSE,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                //         header('Content-Type: application/json');
                //         echo json_encode($data);   die(); 
                // }
                // //echo '<pre> rs=>'; print_r($rs); echo '</pre>';  
                // ob_clean();
                // header('Content-Type: application/json');
                // echo json_encode($rs);  
		 $ListSelect = array("title" => 'Settings Mqtt');
                $data = array("ListSelect" => $ListSelect);
                 $data['content_view'] = 'settings/api/settings';
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