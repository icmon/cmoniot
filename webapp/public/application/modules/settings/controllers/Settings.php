<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Settings extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template'); 
	}
	public function api(){
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
                        // $ListSelect = array("title" => 'Settings Mqtt');
                        // $data = array("ListSelect" => $ListSelect);
                        // $data['content_view'] = 'settings/settings';
                        // $this->load->view('Template/Template',$data);
                $ListSelect = array("title" => 'Settings Mqtt');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/mqtt/settingsmqtt';
		$this->load->view('Template/Template',$data);
                } 
        public function edit(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                echo 'Schedule edit';
                } 
        public function delete(){
                        $input=@$this->input->post(); 
                        if($input==null){$input=@$this->input->get();} 
                        $id=$input['id'];
                        // echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                        $array=array('code'=>200,'message'=>'OK','id'=>$id,'payload'=>$input);
                        ob_clean();
                        header('Content-Type: application/json');
                        echo json_encode($array);  
                } 
	public function design(){
		$ListSelect = array("title" => 'design');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings_UI_design';
		$this->load->view('Template/Template',$data);
	} 
	public function email()
	{
		$this->load->view('email_view');
	}
	public function update_settings()
	{
		$jsonString = json_encode($_POST);
		header('content-type: application/json');
		if(file_put_contents('./assets/json/email_setting.json', $jsonString)){
			echo '{"status":"success"}';
		}else{
			echo '{"status":"failed"}';
		}
	}
	public function get_settings()
	{
		$jsonFile = file_get_contents('./assets/json/email_setting.json');
		header('content-type: application/json');
		echo $jsonFile;
	}
	public function send(){
		// Load Library
		$this->load->library('phpmailer_lib');

                // PHPMailer object
                $mail = $this->phpmailer_lib->load();
                // Email Settings
                $jsonString = file_get_contents('./assets/json/email_setting.json');
                $mail_config = json_decode($jsonString, true);
        

                // SMTP configuration
                $mail->isSMTP();
                $mail->Host 		= $mail_config['email_host'];
                $mail->SMTPAuth 	= true;
                $mail->Username 	= $mail_config['email_username'];
                $mail->Password 	= $mail_config['email_password'];
                $mail->SMTPSecure 	= $mail_config['email_smtp'];
                $mail->Port     	= $mail_config['email_port'];

                $mail->setFrom('no-reply@email.com', 'Test Name');
                $mail->addAddress($_POST["mail_address"]);

                // Add a recipient
                // $mail->addAddress('john.doe@gmail.com');

                // Add cc or bcc 
                // $mail->addCC('cc@example.com');
                // $mail->addBCC('bcc@example.com');

                // Email subject
                $mail->Subject 		= 'Send Email via SMTP using PHPMailer in CodeIgniter';

                // Set email format to HTML
                $mail->isHTML(true);
                // $mail->AddEmbeddedImage($_SERVER['DOCUMENT_ROOT'].'/aos/assets/img/login_logo.png', 'logo');
                $mail->Body = $_POST["mail_message"];

                // Send email
                header('content-type: application/json');
                if(!$mail->send()){
                        echo '{"status":"failed","message":"'.$mail->ErrorInfo.'"}';
                }else{
                echo '{"status":"success","message":"Message has been sent"}';
                }

	}  
} 