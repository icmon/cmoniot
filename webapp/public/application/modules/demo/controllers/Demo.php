<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template');
	}
	public function index(){
		$ListSelect = array("title" => 'demo',"setting" => 'Demo');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'Demo';
		$this->load->view('Template/Template',$data);
	}
	public function dashboard(){
		$ListSelect = array("title" => 'demo',"setting" => 'Demo');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard';
		$this->load->view('Template/Template',$data);
	}
	public function dashboard1(){
		$ListSelect = array("title" => 'demo',"setting" => 'Demo');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard1';
		$this->load->view('Template/Template',$data);
	}
	public function dashboard2(){
		$ListSelect = array("title" => 'demo',"setting" => 'Demo');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	public function dashboard3(){
		$ListSelect = array("title" => 'demo',"setting" => 'Demo');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard3';
		$this->load->view('Template/Template',$data);
	}
	public function test(){
		$ListSelect = array("title" => 'demo',"setting" => 'Demo');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'Test';
		$this->load->view('Template/Template',$data);
	}
}