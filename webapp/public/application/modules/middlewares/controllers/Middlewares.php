<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Middlewares extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template');
	}
    /*********Authentication**********/
    public function signin(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/signin'; 
		$this->load->view($data);
	}
	
	public function signindb(){
		 echo 'signindb';
	}

    public function signup(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/signup'; 
		$this->load->view($data);
	}

	public function signupdb(){
		 echo 'signupdb';
	}

    public function forgotpassword(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/forgotpassword'; 
		$this->load->view($data);
	}
	
    public function forgotpassworddb(){
		 echo 'forgotpassworddb';
	}

	public function authlock(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/authlock'; 
		$this->load->view($data);
	}

	public function authlockdb(){
		 echo 'authlockdb';
	}

    function signout(){
		echo 'signout';
		die(); 
	}
	
	function logout(){
		echo 'logout';
		die(); 
	}
 
    public function signinlink(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/signinlink'; 
		$this->load->view($data);
	}

	public function signinlinkdb(){
		 echo 'signinlinkdb';
	}

    public function verificationcode(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/verificationcode'; 
		$this->load->view($data);
	}

	public function verificationcodedb(){
		 echo 'verificationcodedb';
	}


	public function termsofservice(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/termsofservice'; 
		$this->load->view($data);
	}
	
	public function termsofservicedb(){
		 echo 'termsofservicedb';
	}
	/*********Authentication**********/
	
	public function index(){
		$ListSelect = array("title" => 'dashboard',"setting" => 'dashboard');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard';
		$this->load->view('Template/Template',$data);
	}
	public function profile(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}

	public function profileadd(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	public function profileadddb(){
		 echo 'profileadddb';
	}

    public function profileupdate(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	
	public function profileupdatedb(){
		 echo 'profileupdatedb';
	}

	public function profiledeletedb(){
		 echo 'profiledeletedb';
	}

	public function profilesetting(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	
	public function profilesettingdb(){
		 echo 'profilesettingdb';
	}

	public function profilelist(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	

	public function alerts(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	public function signlog(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	public function accesslog(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
	
	public function userinfo(){
		$ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard2';
		$this->load->view('Template/Template',$data);
	}
}