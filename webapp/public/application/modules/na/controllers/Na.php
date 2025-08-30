<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Na extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template');
	}
	public function index(){
		$ListSelect = array("title" => 'demo',
					"setting" => 'Na',
					);
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'Na';
		$this->load->view('Template/Template',$data);
	}
}
