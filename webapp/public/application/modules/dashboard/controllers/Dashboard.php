<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template');
	}
	public function index(){
		$token=$_SESSION['token'];
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		}
		$ListSelect = array("title" => 'dashboard',"setting" => 'dashboard');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard4';
		$this->load->view('Template/Template',$data);
	}
	
	public function details(){
		$ListSelect = array("title" => 'details',"setting" => 'details');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'details_monitor';
		$this->load->view('Template/Template',$data);
	}
	public function manual(){
		$ListSelect = array("title" => 'manual',"setting" => 'manual');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'manual';
		$this->load->view('Template/Template',$data);
	}
	public function dashboard1(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$buckets= $input['bucket'];
		if($bucket==""){
			$bucket='BAACTW02';
		}  
		if(!$buckets){ 
			$base_url=$urldirec=base_url('dashboard1').'?bucket=BAACTW02'; 
			redirect($base_url);  
		}
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard1';
		$this->load->view('Template/Template',$data);
	}

	public function dashboard2(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$buckets= $input['bucket'];
		if($bucket==""){
			$bucket='BAACTW02';
		}  
		if(!$buckets){ 
			$base_url=$urldirec=base_url('dashboard2').'?bucket=BAACTW02'; 
			redirect($base_url);  
		}
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	public function dashboard3(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$buckets= $input['bucket'];
		if($bucket==""){
			$bucket='BAACTW02';
		}  
		if(!$buckets){ 
			$base_url=$urldirec=base_url('dashboard3').'?bucket=BAACTW02'; 
			redirect($base_url);  
		}
		$ListSelect = array("title" => 'dashboard3',"setting" => 'dashboard3');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard3';
		$this->load->view('Template/Template',$data);
	}

	public function dashboard4(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$buckets= $input['bucket'];
		if($bucket==""){
			$bucket='BAACTW02';
		}  
		if(!$buckets){ 
			$base_url=$urldirec=base_url('dashboard4').'?bucket=BAACTW02'; 
			redirect($base_url);  
		}
		$ListSelect = array("title" => 'dashboard4',"setting" => 'dashboard4');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard4';
		$this->load->view('Template/Template',$data);
	}
	 
}