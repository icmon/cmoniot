<?php

class User_model extends CI_Model
{   
	public function __construct(){
		parent::__construct();
        //$DBsqlite = $this->load->database('sqlite');
		//$DBmysqlt = $this->load->database('mysql', TRUE);
    }
	
	public function get_tokendata($token){
			if($token==''){
				return '';
			}
         	$language = $this->lang->language['lang']; 
         	$this->db->select('*');
			$this->db->from('sd_token'); 
			$this->db->where('token', $token);
         	$query = $this->db->get();
         	$last_query=$this->db->last_query();
			//echo '<pre>last_query=>'.$last_query.'</pre>';
         	$rs=$query->result_array();
			// Debug($last_query);
			// Debug($rs);
			return $rs['0']['token'];
    }

	function insert_tokendata($data){
			$token=$data['token'];
		    $total_token=$this->total_token($token);
			if($total_token>=1){
				return '1'; 
				die();
			}
			$insert = $this->db->insert('sd_token', $data);
			return $insert;
	}

	public function total_token($token){
        $language = $this->lang->language['lang'];
  		$this->db->distinct();
		$this->db->select('*');
		$this->db->from('sd_token');
		$this->db->where('token',$token); 
  		return $this->db->count_all_results();
 	}

	function delete_tokenn($token){
		$total_token=$this->total_token($token);
		if($total_token>=1){
				$this->db->where('token',$token);
				$this->db->delete('sd_token'); 
		}
	}
	
}