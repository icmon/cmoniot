<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Redisapi extends CI_Controller {
    public function __construct(){ 
        parent::__construct();
        @session_start();
        $token=$_SESSION['token'];
        if(!$token){   redirect(base_url('/signin')); die(); }
       # header('Content-Type: application/json');
        $this->load->helper('jwt');
        $this->load->model('Moodel_cache');
    } 
	##########*******redis*****   redisapi**############
    	
	public function index_get() {
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$redis_host = $this->config->item('redis_host');
		$redis_port = $this->config->item('redis_port');
		//Connecting to Redis server on localhost 
		$redis = new Redis(); 
		$redis->connect($redis_host, $redis_port); 
		$cache_info=$this->cache->redis->cache_info();

		$cache_listkeys = $redis->keys("*"); 
		$is_supported=$this->cache->redis->is_supported();
		$data_all=array('cache_is_supported'=>$is_supported,'cache_info'=>$cache_info,'cache_listkeys'=>$cache_listkeys,'count_listkeys'=>count($cache_listkeys),);
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
	

	}	
	public function redistestliberery_get(){
			$deletekey=@$this->input->get('deletekey');
			$data_redis_model=$this->model_cache->get_redis_result($deletekey);
			if($data_redis_model!==''){$this->response(array('header'=>array(
													'title'=>'REST_Controller::HTTP_OK',
													'message'=>' DATA OK',
													'status'=>TRUE,
													'code'=>200), 
													'data'=> $data_redis_model),200);
			}elseif($data_redis_model==''){$this->response(array('header'=>array(
													'title'=>'HTTP_BAD_REQUEST',
													'message'=>'Data could not be found',
													'status'=>FALSE, 
													'code'=>204), 
													'data'=> $data_redis_model),204);
			}else{$this->set_response([
							'status'=>FALSE,
							'title'=>'REST_Controller::HTTP_NOT_FOUND',
							'message'=>'User could not be found',
							'code'=>404
						], REST_Controller::HTTP_NOT_FOUND);
			}
			die(); 
    }
	public function redistest_get() {
			$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
			$redis_servers = $this->config->item('redis_servers');
			$redis_host = $this->config->item('redis_host');
			$redis_port = $this->config->item('redis_port');
			//Connecting to Redis server on localhost 
			$redis = new Redis(); 
			$redis->connect($redis_host, $redis_port); 
			$data1="Connection to server sucessfully"; 
			//check whether server is running or not 
			$data2="Server is running: ".$redis->ping(); 
			//set the data in redis string 
			$redis->set("tutorial-name", "Redis tutorial"); 
			// Get the stored data and print it 
			$order_by=@$this->input->get('order');
			$limit=@$this->input->get('limit');
			if($order_by==null){$order_by='asc';}if($limit==null){$limit='20';} 
			$dataresult = 'test';
			$key='ams_entrance-keys-json-orderby-'.$order_by.'-limit-'.$limit;
			$deletekey=@$this->input->get('deletekey');
			if($deletekey==1){
				$deletekeys=$redis->delete($key); 
				//echo '<pre> redis delkey -> '; print_r($key); echo '</pre>'; die();
				$deletekeys_msg='deletekey done';
			}else{
				$deletekeys_msg='deletekey not work';
			}
			
			$jsondata=json_encode($dataresult, JSON_NUMERIC_CHECK);
			$setkey=$redis->set($key,$jsondata); 
			$getkey=$redis->get($key);
			$jsondatadecode=json_decode($getkey);
			$getdata=$jsondatadecode;
			$arList=$redis->keys("*"); 
			$data3="Set red is:: ".$setkey; 
			$data4="Get redis:: ".$getkey;
			$data=array('redis_servers'=>$redis_servers,
                        'key'=>$key,
                        'data1'=>$data1,
                        'data2'=>$data2,
                        'data3'=>$data3,
                        'data4'=>$data4,
                        'getdata_count'=>count($getdata),
                        'getdata'=>$getdata,
                        'Listkeysall_count'=>count($arList),
                        'Listkeysall'=>$arList,
                        'deletekeys'=>$deletekeys_msg,
                        );
			/*
                echo '<pre> redis-> '; print_r($data); echo '</pre>'; 
                echo '<pre>  jsondatadecode-> '; print_r($jsondatadecode); echo '</pre>'; 
                echo '<pre> redis getkey-> '; print_r($getkey); echo '</pre>'; 
			*/
			$data_all=$data;
			
			if($data_all!==''){$this->response(array('header'=>array(
													'title'=>'REST_Controller::HTTP_OK',
													'message'=>' DATA OK',
													'status'=>TRUE,
													'code'=>200), 
													'data'=> $data_all),200);
			}elseif($data_all==''){$this->response(array('header'=>array(
													'title'=>'HTTP_BAD_REQUEST',
													'message'=>'Data could not be found',
													'status'=>FALSE, 
													'code'=>204), 
													'data'=> $data_all),204);
			}else{$this->set_response([
							'status'=>FALSE,
							'title'=>'REST_Controller::HTTP_NOT_FOUND',
							'message'=>'User could not be found',
							'code'=>404
						], REST_Controller::HTTP_NOT_FOUND);
			}
	}		
	public function redislibrarytest_get(){
			#################################################################
			$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
			$connection=$this->cache->redis->connection();
			#echo '<pre> Connection-> '; print_r($connection); echo '</pre>'; die();
			$order_by=@$this->input->get('order');
			$limit=@$this->input->get('limit');
			if($order_by==null){$order_by='asc';}if($limit==null){$limit='20';} 
			$dataresult = 'test';
			$key='ams_entrance-keys-json-order-by-'.$order_by.'-limit-'.$limit;
			$setkeysdata=$this->cache->redis->setkeysdata($key,$dataresult);
			#echo '<pre> setkeysdata-> '; print_r($setkeysdata); echo '</pre>'; die();
			$data=array('Connection'=>$connection,'Keys'=>$key,'redis_servers'=>$setkeysdata,);
			$data_all=$data;
			if($data_all!==''){$this->response(array('header'=>array(
													'title'=>'REST_Controller::HTTP_OK',
													'message'=>' DATA OK',
													'status'=>TRUE,
													'code'=>200), 
													'data'=> $data_all),200);
			}elseif($data_all==''){$this->response(array('header'=>array(
													'title'=>'HTTP_BAD_REQUEST',
													'message'=>'Data could not be found',
													'status'=>FALSE, 
													'code'=>204), 
													'data'=> $data_all),204);
			}else{$this->set_response([
							'status'=>FALSE,
							'title'=>'REST_Controller::HTTP_NOT_FOUND',
							'message'=>'User could not be found',
							'code'=>404
						], REST_Controller::HTTP_NOT_FOUND);
			}
			#################################################################
	}		
	public function redislibraryget_get(){
			#################################################################
			$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
			$connection=$this->cache->redis->connection();
			$order_by=@$this->input->get('order');
			$limit=@$this->input->get('limit');
			if($order_by==null){$order_by='asc';}if($limit==null){$limit='20';} 
			$key='ams_entrance-keys-json-order-by-'.$order_by.'-limit-'.$limit;
			$getkeysdata=$this->cache->redis->getkeysdata($key);
			$data=array('Connection'=>$connection,'Keys'=>$key,'getdata'=>$getkeysdata,);
			$data_all=$data;
			if($data_all!==''){$this->response(array('header'=>array(
													'title'=>'REST_Controller::HTTP_OK',
													'message'=>' DATA OK',
													'status'=>TRUE,
													'code'=>200), 
													'data'=> $data_all),200);
			}elseif($data_all==''){$this->response(array('header'=>array(
													'title'=>'HTTP_BAD_REQUEST',
													'message'=>'Data could not be found',
													'status'=>FALSE, 
													'code'=>204), 
													'data'=> $data_all),204);
			}else{$this->set_response([
							'status'=>FALSE,
							'title'=>'REST_Controller::HTTP_NOT_FOUND',
							'message'=>'User could not be found',
							'code'=>404
						], REST_Controller::HTTP_NOT_FOUND);
			}
			#################################################################
	}		
	public function redislibraryset_get(){
		#################################################################
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$connection=$this->cache->redis->connection();
		#echo '<pre> Connection-> '; print_r($connection); echo '</pre>'; die();
		$order_by=@$this->input->get('order');
		$limit=@$this->input->get('limit');
		if($order_by==null){$order_by='asc';}if($limit==null){$limit='20';} 
		$key='ams_entrance-keys-json-order-by-'.$order_by.'-limit-'.$limit;
		$deletekey=@$this->get('deletekey');
		if($deletekey!=''|| $deletekey==1){
		$deletekeysdata=$this->cache->redis->deletekeysdata($key);
		}else{
		$deletekeysdata='Null';
		}
		$getkeysdata=$this->cache->redis->getkeysdata($key);
		$countget=$getkeysdata['count'];
		if($countget==0){
		$dataresult = 'test';
		$redata=$this->cache->redis->setkeysdata($key,$dataresult);
		$status='form db query data ';
		#echo '<pre> $redata-> '; print_r($redata); echo '</pre>'; die();
		}else{
		$redata=$getkeysdata;
		$status='form Redis cache data';
		}
		$data=array('Connection'=>$connection,'Keys'=>$key,'redata'=>$redata,'status'=>$status,'deletekey'=>$deletekeysdata,'countget'=>$countget);
		$data_all=$data;
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
		#################################################################
	}		
	public function redislibrarydelete_get(){
		#################################################################
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$connection=$this->cache->redis->connection();
		#echo '<pre> Connection-> '; print_r($connection); echo '</pre>'; die();
		$order_by=@$this->input->get('order');
		$limit=@$this->input->get('limit');
		if($order_by==null){$order_by='asc';}if($limit==null){$limit='20';} 
		$key='ams_entrance-keys-json-order-by-'.$order_by.'-limit-'.$limit;
		$deletekey=@$this->get('deletekey');
        $data = 'test';
		if($deletekey!=''|| $deletekey==1){
		$deletekeysdata=$this->cache->redis->deletekeysdata($key);
		}else{
		$deletekeysdata='Null';
		}
		$data=array('Connection'=>$connection,'Keys'=>$key,'deletekey'=>$deletekeysdata);
		$data_all=$data;
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
		#################################################################
	}		
	public function redisinfo_get() {
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$redis_host = $this->config->item('redis_host');
		$redis_port = $this->config->item('redis_port');
		//Connecting to Redis server on localhost 
		$redis = new Redis(); 
		$redis->connect($redis_host, $redis_port); 
		$cache_info=$this->cache->redis->cache_info();

		$cache_listkeys = $redis->keys("*"); 
		$is_supported=$this->cache->redis->is_supported();
		$data_all=array('cache_is_supported'=>$is_supported,'cache_info'=>$cache_info,'cache_listkeys'=>$cache_listkeys,'count_listkeys'=>count($cache_listkeys),);
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
	

	}		
	public function redislibrarygetbykey_get(){
		#################################################################
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$connection=$this->cache->redis->connection();
		$key=@$this->input->get('key');
		$getkeysdata=$this->cache->redis->getkeysdata($key);
		$data=array('Connection'=>$connection,'Keys'=>$key,'getdata'=>$getkeysdata,);
		$data_all=$data;
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
		#################################################################
	}		
	public function redislibrarygetbyexists_get(){
		#################################################################
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$connection=$this->cache->redis->connection();
		$key=@$this->input->get('key');
		$getkeysdata=$this->cache->redis->keyexists($key);
		$data=array('Connection'=>$connection,'Keys'=>$key,'getdata'=>$getkeysdata,);
		$data_all=$data;
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
		#################################################################
	}		
	public function redislibraryclean_get(){
		#################################################################
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$connection=$this->cache->redis->connection();
		$getkeysdata=$this->cache->redis->clean();
		$data=array('Connection'=>$connection,'getdata'=>$getkeysdata,);
		$data_all=$data;
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
		#################################################################
	}		
	public function redislibrarymgetkey_get(){
		#################################################################
		$this->load->driver('cache', array('adapter' => 'redis', 'backup' => 'file'));
		$connection=$this->cache->redis->connection();
		$key=@$this->input->get('key');
		$arrKeys = array('ams_entrance-keys-json-order-by-asc-limit-1','ams_entrance-keys-json-order-by-asc-limit-2','ams_entrance-keys-json-order-by-asc-limit-3');
		$getkeysdata=$this->cache->redis->mgetkeysdata($arrKeys);
		$data=array('Connection'=>$connection,'Keys'=>$arrKeys,'getdata'=>$getkeysdata,);
		$data_all=$data;
		if($data_all!==''){$this->response(array('header'=>array(
												'title'=>'REST_Controller::HTTP_OK',
												'message'=>' DATA OK',
												'status'=>TRUE,
												'code'=>200), 
												'data'=> $data_all),200);
		}elseif($data_all==''){$this->response(array('header'=>array(
												'title'=>'HTTP_BAD_REQUEST',
												'message'=>'Data could not be found',
												'status'=>FALSE, 
												'code'=>204), 
												'data'=> $data_all),204);
		}else{$this->set_response([
						'status'=>FALSE,
						'title'=>'REST_Controller::HTTP_NOT_FOUND',
						'message'=>'User could not be found',
						'code'=>404
					], REST_Controller::HTTP_NOT_FOUND);
		}
		#################################################################
	}		
	
}
 