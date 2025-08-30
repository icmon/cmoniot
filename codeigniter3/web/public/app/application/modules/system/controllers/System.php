<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class System extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	}
	public function index(){
		$ListSelect = array("title" => 'dashboard',"setting" => 'dashboard');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard';
		$this->load->view('template/template',$data);
	}
	public function historylog(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('template/template',$data);
	}
}