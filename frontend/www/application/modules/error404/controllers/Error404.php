<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Error404 extends MY_Controller {
    public function __construct()    {
        parent::__construct();
		//$this->load->library('session');
        //$this->load->driver('session');
       
    }
	public function index(){   
		$this->load->view('app/error404');
		
	}
    public function notfound(){   
		$this->load->view('app/notfound');
		
	}
 
}

/*
window.setInterval(function(){
  /// call your function here
}, 5000); // for every 5 sec
*/