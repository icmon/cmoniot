<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Log extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template'); 
		$this->load->model('User_model');
		//$this->load->view('user/sweetalert2'); 
		$segment1=$this->uri->segment(1);
		$segment2=$this->uri->segment(2);
		$segment3=$this->uri->segment(3);
		$segment4=$this->uri->segment(4);
		$segment5=$this->uri->segment(5);
		$segment6=$this->uri->segment(6);
		$segment7=$this->uri->segment(7);
		$segment8=$this->uri->segment(8);
		$segment9=$this->uri->segment(9);
		$segment10=$this->uri->segment(10);
		#echo '$segment2=>'.$segment2; die(); 
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
	}
	public function index(){  
		$this->signinlog();
	}
    
	public function signinlog(){
		$ListSelect = array("title" => 'signinlog');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'signinlog';
		$this->load->view('template/template',$data);
	}
    
    public function detail(){
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
        //  {{base_url}}/v1/syslog/listuserlog?id=1
		$ListSelect = array("title" => 'signinlog');
		$data = array("ListSelect" => $ListSelect);
        $id=@@$input['id'];
		$api_url= $this->config->item('api_url').'syslog/listuserlog?id='.$id; 
		#echo '<pre> api_url=>'; print_r($api_url); echo '</pre>'; 
        $token=@$_SESSION['token'];
		$rsapi=$this->Crul_model->call_api_with_token($api_url,$token);
		if($rsapi){
            #echo '<pre> rsapi=>'; print_r($rsapi); echo '</pre>'; 
			$data['log'] =$rsapi['payload']['data'][0];
		}else{
            redirect(base_url('user/log')); die();
            echo'--Not have data--'; die();
        }
		$data['content_view'] = 'signinlogdetail';
		$this->load->view('template/template',$data);
	}

    public function accesslog(){
		$ListSelect = array("title" => 'Access logs');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'accesslogs';
		$this->load->view('template/template',$data);
	}
} 