<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Sms extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	}
	public function index(){
		$ListSelect = array("title" => 'SMS');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/sms/settingssms';
		$this->load->view('template/template',$data);
	} 
        public function create(){
		$ListSelect = array("title" => 'SMS');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/sms/createsms';
		$this->load->view('template/template',$data);
	}   
        public function edit(){
		$ListSelect = array("title" => 'SMS');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/sms/editsms';
		$this->load->view('template/template',$data);
	}   
}