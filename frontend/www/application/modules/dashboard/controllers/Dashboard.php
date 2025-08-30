<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
		$config= $this->load->config; 
		$this->bucket_default=$this->config->item('bucket_default');
		$this->bucket_default_air=$this->config->item('bucket_default_air');
		$input=@$this->input->post(); 
		if($input==null){$input=@$this->input->get();   }
		$this->bucket=@$input['bucket']; 
	}
	public function index(){
		$token=$_SESSION['token'];
		$bucket_input=@$this->bucket; 
		$bucket_default=@$this->bucket_default; 
		if(!$bucket_input){
			$urldirec=base_url('/dashboard').'?bucket='.$bucket_default; 
			redirect($urldirec);
		} 
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		}  
		$ListSelect = array("title" => 'dashboard',"setting" => 'dashboard');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard4';
		$this->load->view('template/template',$data);
	}
	public function details(){
		$ListSelect = array("title" => 'details',"setting" => 'details');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'details_monitor';
		$this->load->view('template/template',$data);
	}
	public function manual(){
		$ListSelect = array("title" => 'manual',"setting" => 'manual');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'manual';
		$this->load->view('template/template',$data);
	}
	public function dashboard1(){
		$token=$_SESSION['token']; 
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		} 
		$bucket_input=@$this->bucket; 
		$bucket_default=@$this->bucket_default; 
		if(!$bucket_input){
			$urldirec=base_url('/dashboard/dashboard1').'?bucket='.$bucket_default; 
			redirect($urldirec);
		} 
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard1';
		$this->load->view('template/template',$data);
	}
	public function dashboard2(){
		$token=$_SESSION['token']; 
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		} 
		$bucket_input=@$this->bucket; 
		$bucket_default=@$this->bucket_default; 
		if(!$bucket_input){
			$urldirec=base_url('/dashboard/dashboard2').'?bucket='.$bucket_default; 
			redirect($urldirec);
		} 
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('template/template',$data);
	}
	public function dashboard3(){
		$token=$_SESSION['token']; 
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		} 
		$bucket_input=@$this->bucket; 
		$bucket_default=@$this->bucket_default; 
		if(!$bucket_input){
			$urldirec=base_url('/dashboard/dashboard3').'?bucket='.$bucket_default; 
			redirect($urldirec);
		} 
		$ListSelect = array("title" => 'dashboard3',"setting" => 'dashboard3');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard3';
		$this->load->view('template/template',$data);
	}
	public function dashboard4(){
		$token=$_SESSION['token']; 
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		} 
		$bucket_input=@$this->bucket; 
		$bucket_default=@$this->bucket_default; 
		if(!$bucket_input){
			$urldirec=base_url('/dashboard/dashboard4').'?bucket='.$bucket_default; 
			redirect($urldirec);
		} 
		$ListSelect = array("title" => 'dashboard4',"setting" => 'dashboard4');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard4';
		$this->load->view('template/template',$data);
	}
	public function air(){
		$token=$_SESSION['token']; 
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		} 
		$bucket_input=@$this->bucket; 
		$bucket_default_air=@$this->bucket_default_air; 
		if(!$bucket_input){
			$urldirec=base_url('/dashboard/air').'?bucket='.$bucket_default_air; 
			redirect($urldirec);
		} 
		$ListSelect = array("title" => 'dashboardair',"setting" => 'dashboardair');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboardair';
		$this->load->view('template/template',$data);
	}
	public function overallair(){
		$token=$_SESSION['token']; 
		if(!$token){
			$urldirec=base_url('/signin').'?theme=dark'; 
			redirect($urldirec); die();
		} 
		$bucket_input=@$this->bucket; 
		$bucket_default_air=@$this->bucket_default_air; 
		if(!$bucket_input){
			$urldirec=base_url('/dashboard/overallair').'?bucket='.$bucket_default_air; 
			redirect($urldirec);
		} 
		$ListSelect = array("title" => 'overallair',"setting" => 'overallair');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboardoverallair';
		$this->load->view('template/template',$data);
	}
}