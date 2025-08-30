<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Nodered extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	}
	public function index(){
		$ListSelect = array("title" => 'Nodered');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/nodered/settings_nodered';
		$this->load->view('template/template',$data);
    }      
    public function create(){
			$ListSelect = array("title" => 'Create');
			$data = array("ListSelect" => $ListSelect);
			$data['content_view'] = 'settings/nodered/create_nodered';
			$this->load->view('template/template',$data);
    } 
    public function edit(){
			$ListSelect = array("title" => 'Edit');
			$data = array("ListSelect" => $ListSelect);
			$data['content_view'] = 'settings/nodered/edit_nodered';
			$this->load->view('template/template',$data);
    }        
}