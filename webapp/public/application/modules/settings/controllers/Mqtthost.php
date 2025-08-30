<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Mqtthost extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template'); 
	}
	public function index(){
            $ListSelect = array("title" => 'Mqtt host');
            $data = array("ListSelect" => $ListSelect);
            $data['content_view'] = 'settings/mqtthost/settingsmqtthost';
            $this->load->view('Template/Template',$data);
    } 
    public function create(){
            $ListSelect = array("title" => 'Mqtt host');
            $data = array("ListSelect" => $ListSelect);
            $data['content_view'] = 'settings/mqtthost/createmqtthost';
            $this->load->view('Template/Template',$data);
    } 
     
    public function edit(){
            $ListSelect = array("title" => 'Mqtt host');
            $data = array("ListSelect" => $ListSelect);
            $data['content_view'] = 'settings/mqtthost/editmqtthost';
            $this->load->view('Template/Template',$data);
    }   
} 