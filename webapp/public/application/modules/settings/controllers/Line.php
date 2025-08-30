<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Line extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template');
	}
	public function index(){
		$ListSelect = array("title" => 'Settings Line');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/line/linesettings';
		$this->load->view('Template/Template',$data);
        } 
        public function create(){
		$ListSelect = array("title" => 'Settings Line');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/line/linecreate';
		$this->load->view('Template/Template',$data);
        }  
        public function edit(){
		$ListSelect = array("title" => 'Settings Line');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/line/editline';
		$this->load->view('Template/Template',$data);
        }  
}