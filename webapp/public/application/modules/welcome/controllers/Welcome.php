<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends MY_Controller
{
    public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template'); 
        # if(!$this->session->userdata('is_logged_in')){redirect(base_url());}
	}
	public function index()
	{
		$this->load->model('welcome_model');
		//$this->load->view('welcome_message');
		$this->load->view('index');
	}
}