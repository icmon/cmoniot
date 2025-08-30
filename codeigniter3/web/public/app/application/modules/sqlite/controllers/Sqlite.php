<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sqlite extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
		$this->load->model('Sqlite_model');
	}
	
	public function index(){
 		$this->load->helper('url');
	    $this->load->library('session');
        $this->load->library("pagination");
		$startdate = $this->input->get_post('startdate',TRUE);
        $enddate = $this->input->get_post('enddate',TRUE);
		$rs_data= $this->Sqlite_model->get_data();
		$ListSelectata = array("title" => 'sqlite');
		$data['title']  = $ListSelectata;
		$data['rs']  = $rs_data;
		$data['content_view'] = 'sqlite';
		// echo '<pre>APPPATH=>'.APPPATH.'</pre>';
		// Debug(APPPATH); 
		// Debug($data);

		$this->load->view('template/template',$data);
	}
}