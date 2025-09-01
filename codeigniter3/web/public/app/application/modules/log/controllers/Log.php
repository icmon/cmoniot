<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Log extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	}
	public function index(){ 
		$this->history();
	}

	public function detail(){
        $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
        //  {{base_url}}/v1/syslog/listuserlog?id=1
		$ListSelect = array("title" => 'signinlog');
		$data = array("ListSelect" => $ListSelect);
        $id=@$input['id'];
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

	public function history(){
		$ListSelect = array("title" => 'History log');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'historylog';
		$this->load->view('template/template',$data);
	}
	public function alerts(){
		$ListSelect = array("title" => 'alerts');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'alerts';
		$this->load->view('template/template',$data);
	}
	public function signlog(){
		$ListSelect = array("title" => 'signlog');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'signlog';
		$this->load->view('template/template',$data);
	}
	public function accesslog(){
		$ListSelect = array("title" => 'accesslog');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'accesslog';
		$this->load->view('template/template',$data);
	} 
	public function historylog(){
		$ListSelect = array("title" => 'historylog');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'historylog';
		$this->load->view('template/template',$data);
	}
}