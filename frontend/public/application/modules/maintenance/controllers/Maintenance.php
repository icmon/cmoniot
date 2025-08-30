<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Maintenance extends MY_Controller {
    public function __construct()    {
        parent::__construct();
		//$this->load->library('session');
        //$this->load->driver('session');
       
    }
	public function index(){   
		$this->load->view('app/maintenance');
		
	}
 
}

/*
window.setInterval(function(){
  /// call your function here
}, 5000); // for every 5 sec
*/