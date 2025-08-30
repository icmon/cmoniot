<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Influxdb extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	}
	public function index(){
			$ListSelect = array("title" => 'Settings Influxdb');
			$data = array("ListSelect" => $ListSelect);
			$data['content_view'] = 'settings/influxdb/settingsinfluxdb';
			$this->load->view('template/template',$data);
    }      
    public function create(){
			$ListSelect = array("title" => 'Settings Influxdb');
			$data = array("ListSelect" => $ListSelect);
			$data['content_view'] = 'settings/influxdb/createinfluxdb';
			$this->load->view('template/template',$data);
    } 
    public function edit(){
			$ListSelect = array("title" => 'Settings Influxdb');
			$data = array("ListSelect" => $ListSelect);
			$data['content_view'] = 'settings/influxdb/editinfluxdb';
			$this->load->view('template/template',$data);
    }        
}