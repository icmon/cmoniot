<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template');
	}

	public function index(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$buckets= $input['bucket'];
		if($bucket==""){
			$bucket='BAACTW02';
		} 
		$base_url2=base_url('home').'?bucket='.$bucket;
		if(!$buckets){ 
			$base_url=$urldirec=base_url('home').'?bucket=BAACTW02'; 
			redirect($base_url);  
		} 
		$ListSelect = array("title" => 'dashboard');
		$data = array("ListSelect" => $ListSelect);
		// $data['content_view'] = 'home/dashboard2home';
		// $data['content_view'] = 'dashboard/dashboard1';
		// $data['content_view'] = 'dashboard/dashboard2';
		// $data['content_view'] = 'dashboard/dashboard3';
		$data['content_view'] = 'dashboard/dashboard4';
		
		$this->load->view('Template/Template',$data);
	}
	public function dashboard(){
		$ListSelect = array("title" => 'Home',"menu" => 'dashboard');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	} 
}