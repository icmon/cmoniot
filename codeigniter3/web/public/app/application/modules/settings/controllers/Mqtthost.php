<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Mqtthost extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template'); 
	}
	public function index(){
            $ListSelect = array("title" => 'Mqtt host');
            $data = array("ListSelect" => $ListSelect);
            $data['content_view'] = 'settings/mqtthost/settingsmqtthost';
            $this->load->view('template/template',$data);
    } 
    public function create(){
            $ListSelect = array("title" => 'Mqtt host');
            $data = array("ListSelect" => $ListSelect);
            $data['content_view'] = 'settings/mqtthost/createmqtthost';
            $this->load->view('template/template',$data);
    } 
     
    public function edit(){
            $ListSelect = array("title" => 'Mqtt host');
            $data = array("ListSelect" => $ListSelect);
            $data['content_view'] = 'settings/mqtthost/editmqtthost';
            $this->load->view('template/template',$data);
    }   
} 