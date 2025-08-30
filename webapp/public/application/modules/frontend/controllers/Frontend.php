<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Frontend extends MY_Controller
{
    public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template'); 
		ini_set('max_execution_time', 31536000000);
		set_time_limit(31536000000);
        # if(!$this->session->userdata('is_logged_in')){redirect(base_url());}
	}
	public function index()
	{

		$this->load->model('frontend_model'); 
		$data['content_view'] = 'index'; 
		$this->load->view('Templatefrontend/Template',$data);
	}
	public function pricecing()
	{
		$this->load->model('frontend_model'); 
		$data['content_view'] = 'pricecing'; 
		$this->load->view('Templatefrontend/Template',$data);
	}
		public function about()
	{
		$this->load->model('frontend_model'); 
		$data['content_view'] = 'about'; 
		$this->load->view('Templatefrontend/Template',$data);
	}
	public function sulution()
	{
		$this->load->model('frontend_model'); 
		$data['content_view'] = 'sulution'; 
		$this->load->view('Templatefrontend/Template',$data);
	}

}