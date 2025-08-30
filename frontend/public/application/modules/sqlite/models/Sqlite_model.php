<?php
class Sqlite_model extends CI_Model{
    public function __construct(){
		parent::__construct();
        //$DBsqlite = $this->load->database('sqlite');
		//$DBmysqlt = $this->load->database('mysql', TRUE);
    }
	public function gettokendata($token){
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

	public function inserttokendata($data){
			$token=$data['token'];
		    $total_token=$this->total_token($token);
			if($total_token>=1){
				return '1'; 
				die();
			}
			$insert = $this->db->insert('sd_token', $data);
			return $insert;
	}

	public function totaltoken($token){
        $language = $this->lang->language['lang'];
  		$this->db->distinct();
		$this->db->select('*');
		$this->db->from('sd_token');
		$this->db->where('token',$token); 
		$count_all_results=$this->db->count_all_results();		
		$last_query=$this->db->last_query();
		// echo '<pre>last_query=>'.$last_query.'</pre>';
		// Debug($count_all_results); die();
  		return $count_all_results;
 	}

	public function deletetokenn($token){
		$total_token=$this->total_token($token);
		if($total_token>=1){
				$this->db->where('token',$token);
				$this->db->delete('sd_token'); 
		}
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

	public function get_data(){
		
			// Default DB
    		// $result1 = $this->db->get('product')->result();
			// Debug($result1);
			
			// Second DB 
			// โหลด database group 'mysql'
			// $DBmysqlt = $this->load->database('mysql', TRUE);
			// // สร้าง query
			// $DBmysqlt->select('u.*');
			// $DBmysqlt->from('sd_user u');
			// // ถ้ามีเงื่อนไขเพิ่มเติม เช่น where
			// // $DBmysqlt->where('p.status', 1);
			// $query = $DBmysqlt->where('1=1');
			// $query = $DBmysqlt->get();
			// $result = $query->result();
			// Debug($result);

         	$language = $this->lang->language['lang']; 
         	$this->db->select('p.*,t.type_name');
			$this->db->from('product as p');
			$this->db->join('product_type as t', 'p.type_id = t.type_id'); 
         	$query = $this->db->get();
         	$last_query=$this->db->last_query();
			//echo '<pre>last_query=>'.$last_query.'</pre>';
         	$rs=$query->result_array();
			// Debug($last_query);
			// Debug($rs);
			return $rs;
    }

	public function getdataall(){
         	$language = $this->lang->language['lang']; 
         	$this->db->select('*');
         	$this->db->from('product');
         	$query = $this->db->get();
         	$last_query=$this->db->last_query();
			echo '<pre>last_query=>'.$last_query.'</pre>';
         	return $query->result_array();
    }

 	public function total($startdate=NULL,$enddate= NULL){
        $language = $this->lang->language['lang'];
  		$this->db->distinct();
		$this->db->select('*');
		$this->db->from('product');
		if($startdate != null && $enddate != null){
			$this->db->where('createdAt BETWEEN "'. $startdate. '" and "'. $enddate.'"');
		}
		$this->db->order_by('createdAt', 'desc');
		$this->db->order_by('id', 'asc');
  		return $this->db->count_all_results();
 	}
  
    public function get_max_order(){
		$language = $this->lang->language['lang'];
		$this->db->select('max(id) as max_order');
		$this->db->from('product');
		$query = $this->db->get();
		return $query->result_array(); 
    }

    public function get_max_id(){
		$this->db->select('max(id) as max_id');
		$this->db->from('product');
		$query = $this->db->get();
		return $query->result_array(); 
    }
    
    public function getSelecthw($default = 0,$name = "id"){
    		$language = $this->lang->language;
    		 //debug($language); die();    		
    		$first = "--- ".$language['please_select']." ---";
	    	if($default == 0) $rows = $this->getproductna(null, 1);
	    	else $rows = $this->getproductna($default, 1);
	    	$rows = $this->getproductna(null, 1);
	    	$opt = array();
	    	$opt[]	= makeOption(0,$first);
	    	for($i=0;$i<count($rows);$i++){
	    		$row = @$rows[$i];
	    		$opt[]	= makeOption($row['id'], $row['title'].':'.$row['hardware_ip']);
	    	}
	    	return selectList( $opt, $name, 'class="form-control"', 'value', 'text',$default);
    }
    
    public function getSelect($default = 0,$name = "id"){
    		$language = $this->lang->language;
    		 //debug($language); die();    		
    		$first = "--- ".$language['please_select']." ---";
	    	if($default == 0) $rows = $this->getproductna(null, 1);
	    	else $rows = $this->getproductna($default, 1);
	    	$rows = $this->getproductna(null, 1);
	    	  
	    	$opt = array();
	    	$opt[]	= makeOption(0,$first);
	    	for($i=0;$i<count($rows);$i++){
	    		$row = @$rows[$i];
	    		$opt[]	= makeOption($row['id'], $row['title']);
	    	}
	    	return selectList( $opt, $name, 'class="form-control"', 'value', 'text',$default);
    }
    
    public function getSelecthwmap($default = 0,$name = "id"){
    		$language = $this->lang->language;
    		 //debug($language); die();    		
    		$first = "--- ".$language['please_select']." ---";
    		
	    	if($default == 0) $rows = $this->getproductna(null, 1);
	    	else $rows = $this->getproductna($default, 1);
	    	$rows = $this->getproductna(null, 1);
	    	  
	    	$opt = array();
	    	$opt[]	= makeOption(0,$first);
	    	for($i=0;$i<count($rows);$i++){
	    		$row = @$rows[$i];
	    		$opt[]	= makeOption($row['id'], $row['title']);
	    	}
	    	return selectList( $opt, $name, 'class="form-control"', 'value', 'text',$default);
    }
    
    public function getSelectna($default = 0,$name = "id"){
    		$language = $this->lang->language;
    		 //debug($language); die();    		
    		$first = "--- ".$language['please_select']." ---";
    		
	    	if($default == 0) $rows = $this->getproductna(null, 1);
	    	else $rows = $this->getproductna($default, 1);
	    	$rows = $this->getproductna(null, 1);
	    	  
	    	$opt = array();
	    	$opt[]	= makeOption(0,$first);
	    	for($i=0;$i<count($rows);$i++){
	    		$row = @$rows[$i];
	    		$opt[]	= makeOption($row['id'], $row['title']);
	    	}
	    	return selectList( $opt, $name, 'class="form-control"', 'value', 'text',$default);
    }
	
    public function getproductna($id=null, $status=1) {
		$language = $this->lang->language['lang'];
		$this->db->select('*');
		$this->db->from('product');
		
		//$this->db->where('status', 1);
		$query = $this->db->get();
		//echo $this->db->last_query(); Die();
		return $query->result_array(); 
	}
     
    public function getproduct_by_id($id){
		$language = $this->lang->language['lang'];
		$this->db->select('*');
		$this->db->from('product');
		$this->db->where('id', $id);
		
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		//echo $this->db->last_query();
		return $query->result_array(); 
    }

    public function getproduct($pageIndex = 1, $limit = 100,$startdate= null,$enddate= null) {
		$language = $this->lang->language['lang'];
		// Turn caching on for this one query
		//$this->db->cache_on();
		// Turn caching off for this one query
		//$this->db->cache_off();
		//$this->db->count_all('product');
		$this->db->distinct();
		$this->db->select('p.*,t.type_name');
		$this->db->from('product as p');
		$this->db->join('product_type as t', 'p.type_id = t.type_id'); 
		//$this->db->where('createdAt', $date); 
		if($startdate != null && $enddate != null){
			$this->db->where('p.createdAt BETWEEN "'. $startdate. '" and "'. $enddate.'"');
		} 
		$this->db->order_by('p.id', 'desc');
		//$this->db->distinct('id');
		$this->db->limit($limit, ($pageIndex - 1) * $limit);
        //Clears all existing cache files
		//$this->db->cache_delete_all();
		$query = $this->db->get();
		 //Debug($this->db->last_query());
		 //die();
		return $query->result_array();
	}

    function countproduct($id=null, $search_string=null, $order=null){
		$this->db->select('*');
		$this->db->from('product');
		if($id != null && $id != 0){
			$this->db->where('id', $id);
		}
		if($search_string){
			$this->db->like('title', $search_string);
		}

		$query = $this->db->get();
		return $query->num_rows();        
    }
	
	function store_insertt($data){
			$insert = $this->db->insert('product', $data);
			return $insert;
	}
		
    // function product_update($id = 0,$data){
	// 		if($id > 0){
	// 				$this->db->where('id', $id); 
	// 				$this->db->update('product', $data);
	// 				$report = array();
	// 				////$report['error'] = $this->db->_error_number();
	// 				////$report['message'] = $this->db->_error_message();
	// 				if($report !== 0){
	// 					return true;
	// 				}else{
	// 					return false;
	// 				}					
	// 		}else{
                    
    //                     //Debug($data);die();
	// 				$insert = $this->db->insert('product', $data);
	// 				//echo $this->db->last_query();
	// 				return $insert;
	// 		}
	// }

    function updateproduct($id, $data){

		$this->db->where('id', $id);
		$this->db->update('product', $data);
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

	function update_order($id, $order = 1){
		$data['order_by'] = $order;
		$this->db->where('id', $id);
		$this->db->update('product', $data);
		//Debug($this->db->last_query());
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

	function update_orderid_to_down($order, $max){
		$this->db->set('order_by', 'order_by + 1', FALSE); 
		$this->db->where('order_by >=', $order); 
		$this->db->where('order_by <=', $max); 
		$this->db->update('product');
		//Debug($this->db->last_query());
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}	

	function update_orderid_to_up($order, $min){
		$this->db->set('order_by', 'order_by - 1', FALSE); 
		$this->db->where('order_by >', $min); 
		$this->db->where('order_by <=', $order); 
		$this->db->update('product');
		//Debug($this->db->last_query());
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

	function update_orderadd(){

		$this->db->set('order_by', 'order_by + 1', FALSE); 
		$this->db->update('product');
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

	function update_orderdel($order){
		$this->db->set('order_by', 'order_by - 1', FALSE); 
		$this->db->where('order_by >', $order); 
		$this->db->update('product');
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

	function statusproduct($id, $enable = 1){
		$data['status'] = $enable;
		$this->db->where('id', $id);
		$this->db->update('product', $data);
		//echo $this->db->last_query();
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}	
     
    public function get_status($id){
    	$language = $this->lang->language['lang'];
    	$this->db->select('title,status');
    	$this->db->from('product');
    	$this->db->where('id', $id);
    	$query = $this->db->get();
    	//echo $this->db->last_query();
    	return $query->result_array();
    
    }
      
    public function get_status2($id){
         	$language = $this->lang->language['lang'];
          //echo $id;die();
         	$this->db->select('*');
         	$this->db->from('product');
         	$this->db->where('id', $id);
         	
         	$query = $this->db->get();
         	 #echo $this->db->last_query();
         	return $query->result_array();
    }
    
	function statusproduct2($id, $enable = 1){

		$data['status'] = $enable;
		$this->db->where('id', $id);
		$this->db->update('product', $data);
		
		//echo $this->db->last_query();
		
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}
     
    function deleteproduct($id){

		$data = array(
				'status' => 2
		);
		$this->db->where('id', $id);
		$this->db->update('product', $data);
		
		$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

    function getproducte_edit($id=null, $_status=null, $order='order_by', $order_type='Asc', $limit_start = 0, $listpage = 20){
		
		$language = $this->lang->language['lang'];
		$this->db->select('*');
		$this->db->from('product');

		if($id != null && $id > 0){
			$this->db->where('id', $id);
		}
		$query = $this->db->get();
		//Debug($this->db->last_query());
		//die();
		return $query->result_array();
    }

	public function getSelectproducttype_by_id($id){
			$language = $this->lang->language['lang'];
			$this->db->select('id');
			$this->db->from('product');
			$this->db->where('id', $id);
			
			$query = $this->db->get();
			//echo $this->db->last_query();die();
			return $query->result_array(); 
	}

 	public function getSelectproducttype_by_id2($id){
			$language = $this->lang->language['lang'];
			$this->db->select('*');
			$this->db->from('product');
			$this->db->where('id', $id);
			
			$query = $this->db->get();
			//echo $this->db->last_query();die();
			return $query->result_array(); 
	    }
	    
     function delete_setingworktime($id){
		$this->db->where('id',$id);
		$this->db->delete('product'); 
	}
	
	function deleteproduct_by_admin($id){
		$this->db->where('id',$id);
		$this->db->delete('product'); 
	}
 
}
?>