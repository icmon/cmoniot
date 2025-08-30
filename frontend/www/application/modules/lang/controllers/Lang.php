<?php

class Lang extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
	}

	public function index() 
	{
		$this->load->view('index');
	}

	public function language() 
	{
		$lang = $this->input->get('lang');
		$uri = $this->input->get('uri');
		
		if($lang == 'english' || $lang == 'thai'){
			$this->session->set_userdata('language', $lang);
			redirect($uri);
		} else {
			redirect('/');
		}
	}
	public function theme() 
	{
		$theme = $this->input->get('theme');
		$uri = $this->input->get('uri');
		@session_start();
		$layout_sess=@$_SESSION['layout'];
		if($theme==''){
			// $_SESSION['layout']='0';
			$this->session->set_userdata('layout', 0);
			redirect($uri);
			$layout='fluid';
		}else if($theme=='1'){
			// $_SESSION['layout']='1';
			$this->session->set_userdata('layout', 1);
			$layout='fluid';
			redirect($uri);
		}else if($theme=='2'){
			// $_SESSION['layout']='2';
			$this->session->set_userdata('layout', 2);
			$layout='boxed';
			redirect($uri);
		}else if($theme=='3'){
			// $_SESSION['layout']='3'; 
			$this->session->set_userdata('layout', 3);
			$layout='';
			redirect($uri);
		} else {
			redirect('/');
		}

		// 	if($lang == 'english' || $lang == 'thai'){
		// 		$this->session->set_userdata('language', $lang);
		// 		redirect($uri);
		// 	} else {
		// 		redirect('/');
		// 	}

	}
}