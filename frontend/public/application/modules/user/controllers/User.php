<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template'); 
		$this->load->model('User_model');
		//$this->load->view('user/sweetalert2'); 
		$segment1=$this->uri->segment(1);
		$segment2=$this->uri->segment(2);
		$segment3=$this->uri->segment(3);
		$segment4=$this->uri->segment(4);
		$segment5=$this->uri->segment(5);
		$segment6=$this->uri->segment(6);
		$segment7=$this->uri->segment(7);
		$segment8=$this->uri->segment(8);
		$segment9=$this->uri->segment(9);
		$segment10=$this->uri->segment(10);
		#echo '$segment2=>'.$segment2; die();
		if($segment2=='dashboard'){}else{
	?>
<script type="text/javascript" src="<?php echo base_url('assets/sweetalert2/dist/js/jquery-latest.js');?>"></script>
<script src="<?php echo base_url('assets/sweetalert2/dist/sweetalert-dev.js');?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>"><?php  }
	}
	public function index(){
		$ListSelect = array("title" => 'User',"menu" => 'dashboard');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'dashboard';  
		$this->load->view('template/template',$data);
	}
	
	public function dashboard(){
		// $ListSelect = array("title" => 'dashboard2',"setting" => 'dashboard2');
		// $data = array("ListSelect" => $ListSelect); 
		// $data['pagewrapper_seeting'] = 1; 
		// $data['navbar_title'] = 'USER Title';  
		// $btn_list_status=1;
		// $data['btn_list_status'] = $btn_list_status; 
		// $data['navbar_title2'] = 'ADD USER';  
		// if($btn_list_status==1){ 
		// 	$this->load->view('modal_from1',$data);
		// }
		/**************/
		// $data['content_view'] = 'dashboard';
		$data['content_view'] = 'dashboard';
		$this->load->view('template/template',$data);
	}
	
    public function signin(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$theme=	@$input['theme'];
		IF($theme==''){
			$theme_url=base_url('signin?theme=dark');
			redirect($theme_url); 
		}
		if(@$_SESSION['token']){
 			redirect(base_url('home'));  die();
		}  
		$data['content_view'] = 'authentication/signin'; 
		$this->load->view('template/template2',$data);
	}

	public function signindb(){
		ini_set('max_execution_time', 31536000000);
		set_time_limit(31536000000);
		$message='';
		$message_th='';
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$api_url= $this->config->item('api_url');
		 // auth/signin  email
		$username=@@$input['username']; 
		$password=@@$input['password']; 
		// echo '<hr>';  
		// echo '<pre> h api_url=>'; print_r($api_url); echo '</pre>';  
		// echo '<pre> h input=>'; print_r($input); echo '</pre>';   	
		if (!filter_var($username, FILTER_VALIDATE_EMAIL)) {
			// echo "รูปแบบอีเมลไม่ถูกต้อง";
				$api_auth_signin= $this->config->item('api_auth_signinapp');   // auth/signin  email 
				$api_call=$api_url.$api_auth_signin; 
				$postSignin=array('username'=>$username,'password'=>$password);
				$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
				$statusCode=@$rs['statusCode'];
				$code=@$rs['code'];
				// echo '<hr>';  
				// echo '<pre> h api_call=>'; print_r($api_call); echo '</pre>';  
				// echo '<pre> h postSignin=>'; print_r($postSignin); echo '</pre>';  
				// echo '<pre> h rs=>'; print_r($rs); echo '</pre>';  
				// echo '<hr>'; 
				// die(); 
		} else {
			//echo "อีเมลถูกต้อง";
			$api_auth_signin= $this->config->item('api_auth_signin');   // auth/signin  email 
			$api_call=$api_url.$api_auth_signin; 
			$postSignin=array('email'=>$username,'password'=>$password);
			$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
				$statusCode=@$rs['statusCode'];
				$code=@$rs['code'];
				// echo '<hr>';  
				// echo '<pre> h api_call=>'; print_r($api_call); echo '</pre>';  
				// echo '<pre> h postSignin=>'; print_r($postSignin); echo '</pre>';  
				// echo '<pre> h rs=>'; print_r($rs); echo '</pre>';  
				// echo '<hr>'; 
				// die(); 
		} 
		
	  
       if(@$rs['statusCode']=='200' && @$rs['code']=='400'){
		// echo '<pre> rs=>'; print_r($rs); echo '</pre>';   
		// echo '<pre> statusCode=>'; print_r($rs['statusCode']); echo '</pre>';  
		// echo '<pre> code=>'; print_r($rs['code']); echo '</pre>';  die();
				$message=$rs['message'];
				if(!$message){
					$message='Access denied';
				}
				$message_th=$rs['message_th'];
				if(!$message_th){
					$message_th='Access denied';
				}
 				$urldirec=base_url('user/signin').'?theme=dark'; 
				// echo '<pre> message=>'; print_r($message); echo '</pre>';  
				// echo '<pre> message_th=>'; print_r($message_th); echo '</pre>';  
				// echo '<pre> urldirec>'; print_r($urldirec); echo '</pre>';  
				echo'<script>
													$( document ).ready(function() {
														//////////////////
														swal({
														title: " '.$message.'",
														text: "'.$message_th.'",
														timer: 1000,
														showConfirmButton: false
														}, function(){
																	setTimeout(function() {
																		// Javascript URL redirection
																		window.location.replace("'.$urldirec.'");
																	}, 200);
													});
														//////////////////
													}); </script>';  
				die();   
	    } 
		if($code=='200'){
					$message=@$rs['message'];
					$message_th=@$rs['message_th'];
					$statusCode=@$rs['statusCode'];
					$code=@$rs['code'];
					$payload=@$rs['payload'];
					$uid=@$payload['uid'];
					$email=@$payload['email'];
					$username=@$payload['username'];
					$token=@$payload['token'];
					if($token){
							if($token){@$_SESSION['uid']=$uid;}
							if($token){@$_SESSION['email']=$email;}
							if($token){@$_SESSION['username']=$username;} 
							if($token){@$_SESSION['token']=$token;}

					$data_token=array('token'=>$token,'system'=>'login','createdAt'=>date('Y-m-d HL:i:s'));
                    $this->User_model->insert_tokendata($data_token);
					$api_url= $this->config->item('api_url');
					$api_auth_users_profile= $this->config->item('api_auth_users_profile');
					$api_call=$api_url.$api_auth_users_profile;
					$rsapi=$this->Crul_model->call_api_with_token($api_call,$token);
					if($rsapi){
						$rs_api=$rsapi['payload'];
						$uid_api=@$rs_api['uid'];
						$role_id=@$rs_api['role_id'];
						//echo '<pre> role_id=>'; print_r($role_id); echo '</pre>'; 
						$email_api=@$rs_api['email'];
						$username_api=@$rs_api['username'];
						$firstname_api=@$rs_api['firstname'];
						$lastname_api=@$rs_api['lastname'];
						$fullname_api=@$rs_api['fullname'];
						$nickname_api=@$rs_api['nickname'];
						$active_status_api=@$rs_api['active_status'];
						$refresh_token=@$rs_api['refresh_token'];
						$refresh_message=@$rs_api['message'];
						$idcard_api=@$rs_api['idcard'];
						if($uid_api){@$_SESSION['uid_api']=$uid_api;}
						@session_start();
						$_SESSION['layout']='1';
						$_SESSION['role_id_api']=$role_id;
						$_SESSION['firstname_api']=$firstname_api;
						$_SESSION['lastname_api']=$lastname_api;
						// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
						// echo '<pre> rs_api=>'; print_r($rs_api); echo '</pre>';   die(); 
					} 
					$postlogs=array('log_type_id'=>1
									,'uid'=>$uid_api
									,'name'=>"User SignIn"
									,'detail'=>"User SignIn log"
									,'select_status'=>0
									,'insert_status'=>0
									,'update_status'=>0
									,'delete_status'=>0
									,'status'=>1
									,'lang'=>$this->lang->line('lang'));  
					$api_url=@$this->config->item('api_url').'syslog/createlog'; 
					$rss=@$this->Crul_model->call_api_post($api_url,$postlogs);
 
					// echo '<pre>postlogs=>'; print_r($postlogs); echo '</pre>';   
					// echo '<pre>api_url=>'; print_r($api_url); echo '</pre>';
					// echo '<pre>signindb createlog rss=>'; print_r($rss); echo '</pre>';   die();
					// redirect(base_url('dashboard')).'?bucket='.$bucket;  
					//redirect(base_url('dashboard')).'?bucket='.$bucket;  
					$input=@$this->input->post(); 
					if($input==null){$input=@$this->input->get();   }
					$buckets= @$input['bucket'];
					if(@$bucket==""){
						$bucket='BAACTW02';
					} 
					//$urldirec=base_url('home').'?bucket='.$bucket;  
					$urldirec=base_url('home').'?bucket=BAACTW02'; 
					
					// echo '<hr>';   
					// echo '---#############---------';  
					// echo '<pre> 1 OK statusCode2=>'; print_r($statusCode); echo '</pre>';  
					// echo '<pre> 1 OK code=>'; print_r($code); echo '</pre>'; 
					// echo '<pre> 1 payload=>'; print_r($payload); echo '</pre>'; 
					// echo '<pre> 1 message=>'; print_r($message); echo '</pre>'; 
					// echo '<pre> 1 message_th=>'; print_r($message_th); echo '</pre>'; 
					// echo '---#############---------';  
					// echo '<hr>';  
					// die();
											if(!$message){
												$message='Access denied';
											}
											if(!$message_th){
												$message_th='Access denied';
											}
											echo'<script>
															$( document ).ready(function() {
																//////////////////
																swal({
																title: " '.$message.'",
																text: "'.$message_th.'",
																timer: 1000,
																showConfirmButton: false
																}, function(){
																			setTimeout(function() {
																				// Javascript URL redirection
																				window.location.replace("'.$urldirec.'");
																			}, 200);
																});
																//////////////////
															}); </script>'; die();  
				}else{
					if(!$message){
						$message='Access denied';
					}
					if(!$message_th){
						$message_th='Access denied';
					}
											
											// echo '<hr>';   
											// echo '---#############---------';  
											// echo '<pre> 1-1 OK statusCode2=>'; print_r($statusCode); echo '</pre>';  
											// echo '<pre> 1-1 OK code=>'; print_r($code); echo '</pre>'; 
											// echo '<pre> 1-1 payload=>'; print_r($payload); echo '</pre>'; 
											// echo '<pre> 1-1 message=>'; print_r($message); echo '</pre>'; 
											// echo '<pre> 1-1 message_th=>'; print_r($message_th); echo '</pre>'; 
											// echo '---#############---------';  
											// echo '<hr>';  
											// die();
									echo'<script>
													$( document ).ready(function() {
														//////////////////
														swal({
														title: " '.$message.'",
														text: "'.$message_th.'",
														timer: 1000,
														showConfirmButton: false
														}, function(){
																	setTimeout(function() {
																		// Javascript URL redirection
																		window.location.replace("'.$urldirec2.'");
																	}, 200);
													});
														//////////////////
													}); </script>'; die();   
				}
		}else{
									
			if(!$message){
				$message='Access denied';
			}
			if(!$message_th){
				$message_th='Access denied';
			}
									$urldirec2=base_url('user/signin');
											// echo '<hr>';   
											// echo '---#############---------';  
											// echo '<pre> 2 OK statusCode2=>'; print_r($statusCode); echo '</pre>';  
											// echo '<pre> 2 OK code=>'; print_r($code); echo '</pre>';   
											// echo '---#############---------';  
											// echo '<hr>';  
											// die();
									echo'<script>
													$( document ).ready(function() {
														//////////////////
														swal({
														title: " '.$message.'",
														text: "'.$message_th.'",
														timer: 1000,
														showConfirmButton: false
														}, function(){
																	setTimeout(function() {
																		// Javascript URL redirection
																		window.location.replace("'.$urldirec2.'");
																	}, 200);
													});
														//////////////////
													}); </script>'; die();   
					}
	}

	public function signinotp(){
		if(@$_SESSION['token']){
 			redirect(base_url('home'));  die();
		}  
		$data['content_view'] = 'authentication/signin2'; 
		$this->load->view('template/template2',$data);
	}
	
	public function signin2(){
		if(@$_SESSION['token']){
 			redirect(base_url('home'));  die();
		}  
		$data['content_view'] = 'authentication/signin2'; 
		$this->load->view('template/template2',$data);
	}
	
	public function signindbotp(){
		if(@$_SESSION['token']){
 			redirect(base_url('home'));  die();
		} 
		ini_set('max_execution_time', 31536000000);
		set_time_limit(31536000000);
		$message='';
		$message_th='';
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$api_url= $this->config->item('api_url');
		 // auth/signin  email
		$username=@@$input['username']; 
		$password=@@$input['password']; 
		// echo '<hr>';  
		// echo '<pre> h api_url=>'; print_r($api_url); echo '</pre>';  
		// echo '<pre> h input=>'; print_r($input); echo '</pre>';   	
		if (!filter_var($username, FILTER_VALIDATE_EMAIL)) {
			// echo "รูปแบบอีเมลไม่ถูกต้อง";
				$api_auth_signin= $this->config->item('api_auth_signinapp');   // auth/signin  email 
				$api_call=$api_url.$api_auth_signin; 
				$postSignin=array('username'=>$username,'password'=>$password);
				$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
				$statusCode=@$rs['statusCode'];
				$code=@$rs['code'];
				// echo '<hr>';  
				// echo '<pre> h api_call=>'; print_r($api_call); echo '</pre>';  
				// echo '<pre> h postSignin=>'; print_r($postSignin); echo '</pre>';  
				// echo '<pre> h rs=>'; print_r($rs); echo '</pre>';  
				// echo '<hr>'; 
				// die(); 
		} else {
			//echo "อีเมลถูกต้อง";
			$api_auth_signin= $this->config->item('api_signinotp');   // auth/signin  email 
			$api_call=$api_url.$api_auth_signin; 
			$postSignin=array('email'=>$username,'password'=>$password);
			$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
				$statusCode=@$rs['statusCode'];
				$code=@$rs['code'];
				// echo '<hr>';  
				// echo '<pre> h api_call=>'; print_r($api_call); echo '</pre>';  
				// echo '<pre> h postSignin=>'; print_r($postSignin); echo '</pre>';  
				// echo '<pre> h rs=>'; print_r($rs); echo '</pre>';  
				// echo '<hr>'; 
				// die(); 
		} 
		// user/verificationcode
	  
       if(@$rs['statusCode']=='200' && @$rs['code']=='400'){
				// echo '<pre> rs=>'; print_r($rs); echo '</pre>';   
				// echo '<pre> statusCode=>'; print_r($rs['statusCode']); echo '</pre>';  
				// echo '<pre> code=>'; print_r($rs['code']); echo '</pre>';  die();
				$message=$rs['message'];
				if(!$message){
					$message='Access denied';
				}
				$message_th=$rs['message_th'];
				if(!$message_th){
					$message_th='Access denied';
				}
 				$urldirec=base_url('user/signin2'); 
				// echo '<pre> message=>'; print_r($message); echo '</pre>';  
				// echo '<pre> message_th=>'; print_r($message_th); echo '</pre>';  
				// echo '<pre> urldirec>'; print_r($urldirec); echo '</pre>';  
				echo'<script>
													$( document ).ready(function() {
														//////////////////
														swal({
														title: " '.$message.'",
														text: "'.$message_th.'",
														timer: 1000,
														showConfirmButton: false
														}, function(){
																	setTimeout(function() {
																		// Javascript URL redirection
																		window.location.replace("'.$urldirec.'");
																	}, 200);
													});
														//////////////////
													}); </script>';  
				die();   
	    } 
		if($code=='200'){ 
			// echo '<pre> rs=>'; print_r($rs); echo '</pre>';    
			$urldirec=base_url('user/signin2'); 
			$statuscode=@$rs['statuscode'];
			$code=@$rs['code'];
			$message=@$rs['message'];
			$message_th=@$rs['message_th'];
			$statusCode=@$rs['statusCode'];
			$payload=@$rs['payload']; 
			$tokenkey=@$payload['key']; 
			$time=@$payload['time']; 
			$otp=@$payload['otp'];  
			if(!$tokenkey){
					echo'<script>
						$( document ).ready(function() {
							swal({
								title: "Token key is null ",
								text: "Token key is null ",
								timer: 2000,
								showConfirmButton: false
								}, function(){
										setTimeout(function() {
											// Javascript URL redirection 
										 window.location.replace("'.$urldirec.'");
										}, 2000);
							});
					}); </script>'; 
			}	
			if(!$otp){
					echo'<script>
						$( document ).ready(function() {
							swal({
								title: "OTP is null ",
								text: " OTP is null ",
								timer: 2000,
								showConfirmButton: false
								}, function(){
										setTimeout(function() {
											// Javascript URL redirection
											 window.location.replace("'.$urldirec.'");
										}, 2000);
							});
					}); </script>'; 
			}
 			// echo '<pre> code=>'; print_r($rs['code']); echo '</pre>';   
			// echo '<pre> tokenkey=>'; print_r($tokenkey); echo '</pre>'; 
			// echo '<pre> time=>'; print_r($time); echo '</pre>'; 
			// echo '<pre> otp=>'; print_r($otp); echo '</pre>';   
			$this->verificationotp($tokenkey,$otp);
		}else{
					if(!$message){
						$message='Access denied';
					}
					if(!$message_th){
						$message_th='Access denied';
					}
											
											// echo '<hr>';   
											// echo '---#############---------';  
											// echo '<pre> 1-1 OK statusCode2=>'; print_r($statusCode); echo '</pre>';  
											// echo '<pre> 1-1 OK code=>'; print_r($code); echo '</pre>'; 
											// echo '<pre> 1-1 payload=>'; print_r($payload); echo '</pre>'; 
											// echo '<pre> 1-1 message=>'; print_r($message); echo '</pre>'; 
											// echo '<pre> 1-1 message_th=>'; print_r($message_th); echo '</pre>'; 
											// echo '---#############---------';  
											// echo '<hr>';  
											// die();
									$urldirec2=base_url('user/signin2'); 
									echo'<script>
													$( document ).ready(function() {
														//////////////////
														swal({
														title: " '.$message.'",
														text: "'.$message_th.'",
														timer: 1000,
														showConfirmButton: false
														}, function(){
																	setTimeout(function() {
																		// Javascript URL redirection
																		window.location.replace("'.$urldirec2.'");
																	}, 200);
													});
														//////////////////
													}); </script>'; die();   
		}
	}

	public function verifyotpapp(){
		$input=@$this->input->post(); 
		if($input==null){$input=@$this->input->get();   }
		$otpkey=@@$input['otpkey'];
		$otp=@@$input['otp'];
		$urldirec=base_url('user/signin2'); 
			if(!$otpkey){
					echo'<script>
						$( document ).ready(function() {
							swal({
								title: "Token key is null ",
								text: "Token key is null ",
								timer: 2000,
								showConfirmButton: false
								}, function(){
										setTimeout(function() {
											// Javascript URL redirection
											 window.location.replace("'.$urldirec.'");
										}, 2000);
							});
					}); </script>'; 
			}	
			if(!$otp){
					echo'<script>
						$( document ).ready(function() {
							swal({
								title: "OTP is null ",
								text: " OTP is null ",
								timer: 2000,
								showConfirmButton: false
								}, function(){
										setTimeout(function() {
											// Javascript URL redirection
											 window.location.replace("'.$urldirec.'");
										}, 2000);
							});
					}); </script>'; 
			}
			// echo '<pre> otpkey=>'; print_r($otpkey); echo '</pre>';  
			// echo '<pre> otp=>'; print_r($otp); echo '</pre>';  
			$api_url= $this->config->item('api_url');   
			$api_verificationotp= $this->config->item('api_verificationotp');   
			// echo '<pre> api_verificationotp=>'; print_r($api_verificationotp); echo '</pre>';  
			$api_call=$api_url.$api_verificationotp; 
			// echo '<pre> api_call=>'; print_r($api_call); echo '</pre>';  
			$postData=array('otpkey'=>$otpkey,'otp'=>$otp);
			$rs=$this->Crul_model->call_api_post($api_call,$postData);
			$statusCode=@$rs['statusCode'];
			$code=@$rs['code'];
			$message=@$rs['message'];
			$message_th=@$rs['message_th'];
			$statusCode=@$rs['statusCode'];
			if($code==422){
				echo'<script>
						$( document ).ready(function() {
							swal({
								title: "'.$message.'",
								text: "'.$message_th.'",
								timer: 2000,
								showConfirmButton: false
								}, function(){
										setTimeout(function() {
											// Javascript URL redirection
											 window.location.replace("'.$urldirec.'");
										}, 2000);
							});
					}); </script>'; 
			}
			if($code!='200'){
				echo'<script>
						$( document ).ready(function() {
							swal({
								title: "Error..",
								text: "Error..",
								timer: 2000,
								showConfirmButton: false
								}, function(){
										setTimeout(function() {
											// Javascript URL redirection
											 window.location.replace("'.$urldirec.'");
										}, 2000);
							});
					}); </script>'; 
			}
			if($code=='200'){
					$message=@$rs['message'];
					$message_th=@$rs['message_th'];  
					$uid=@$payload['uid'];
					$payload=@$rs['payload']; 
					$email=@$payload['email'];
					$username=@$payload['username'];
					$token=@$payload['token'];
					// echo '<pre> rs=>'; print_r($rs); echo '</pre>'; 
					// echo '<pre> token=>'; print_r($token); echo '</pre>'; 
					// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>'; die();
					if($token){
							if($token){@$_SESSION['uid']=$uid;}
							if($token){@$_SESSION['email']=$email;}
							if($token){@$_SESSION['username']=$username;} 
							if($token){@$_SESSION['token']=$token;}

							$data_token=array('token'=>$token,'system'=>'login','createdAt'=>date('Y-m-d HL:i:s'));
							$this->User_model->insert_tokendata($data_token);
							$api_url= $this->config->item('api_url');
							$api_auth_users_profile= $this->config->item('api_auth_users_profile');
							$api_call=$api_url.$api_auth_users_profile;
							$rsapi=$this->Crul_model->call_api_with_token($api_call,$token);
							if($rsapi){
								$rs_api=$rsapi['payload'];
								$uid_api=@$rs_api['uid'];
								$role_id=@$rs_api['role_id'];
								//echo '<pre> role_id=>'; print_r($role_id); echo '</pre>'; 
								$email_api=@$rs_api['email'];
								$username_api=@$rs_api['username'];
								$firstname_api=@$rs_api['firstname'];
								$lastname_api=@$rs_api['lastname'];
								$fullname_api=@$rs_api['fullname'];
								$nickname_api=@$rs_api['nickname'];
								$active_status_api=@$rs_api['active_status'];
								$refresh_token=@$rs_api['refresh_token'];
								$refresh_message=@$rs_api['message'];
								$idcard_api=@$rs_api['idcard'];
								if($uid_api){@$_SESSION['uid_api']=$uid_api;}
								@session_start();
								$_SESSION['layout']='1';
								$_SESSION['role_id_api']=$role_id;
								$_SESSION['firstname_api']=$firstname_api;
								$_SESSION['lastname_api']=$lastname_api;
								// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
								// echo '<pre> rs_api=>'; print_r($rs_api); echo '</pre>';   die(); 
								$urldirec1=base_url('home');
									echo'<script>
											$( document ).ready(function() {
												swal({
													title: "'.$message.'",
													text: "'.$message_th.'",
													timer: 2000,
													showConfirmButton: false
													}, function(){
															setTimeout(function() {
																// Javascript URL redirection
																window.location.replace("'.$urldirec1.'");
															}, 2000);
												});
										}); </script>'; 
							}
					}else{
						$urldirec3=base_url('user/signin2'); 
						echo'<script>
								$( document ).ready(function() {
									swal({
										title: "Error..",
										text: "Error..",
										timer: 2000,
										showConfirmButton: false
										}, function(){
												setTimeout(function() {
													// Javascript URL redirection
													window.location.replace("'.$urldirec3.'");
												}, 2000);
									});
							}); </script>'; 
					}
			    //echo '<pre> rs=>'; print_r($rs); echo '</pre>';   die(); 
			}
	}	
 
	public function verificationotp($tokenkey='',$otp=''){
			$data = array("tokenkey" => $tokenkey,"otp" => $otp);
			$data['content_view'] = 'authentication/verificationcodeotp'; 
			// echo '<pre> data=>'; print_r($data); echo '</pre>';   
			$this->load->view('template/template2',$data);
	}

	public function verificationotpurl(){
			$input=@$this->input->post(); 
			if($input==null){$input=@$this->input->get();   }
			$tokenkey=@$rs['otpkey'];
			$otp=@$rs['otp'];
			$data = array("tokenkey" => $tokenkey,"otp" => $otp);
			$data['content_view'] = 'authentication/verificationcodeotp'; 
			// echo '<pre> data=>'; print_r($data); echo '</pre>';   
			$this->load->view('template/template2',$data);
	}

    public function signup(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$allowsignup=@@$input['allowsignup'];
		if($allowsignup==''){
			$allow_sign_up_from= $this->config->item('allow_sign_up_from');
		}if($allowsignup==1){
			$allow_sign_up_from= 1;
		}
		if($allow_sign_up_from!=1){
			// echo '<h1>  The system is closed for service. Please contact the administrator if you wish to use it. </h1>';
			// echo '<hr>';
			// echo '<h1>  ระบบปิดให้บริการ ส่วนนี้ กรุณาติดต่อ ผู้ดูแลหากต้องการใช้งาน  </h1>'; 
			$data['content_view'] = 'authentication/signup_allow_status'; 
			$this->load->view('template/template2',$data);
		}else{ 
			$data['content_view'] = 'authentication/signup2'; 
			# $data['content_view'] = 'authentication/signup'; 
			$this->load->view('template/template2',$data);
		}

	}

	public function signupdb(){
		// header('Content-Type: application/json');
		// header('Access-Control-Allow-Origin: *');
		// header('Access-Control-Allow-Methods: POST');
		// header('Access-Control-Allow-Headers: Content-Type');
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get(); }
		$option=@@$input['option'];
		if($option=='1'){ 
			$option='1';
		}else{ 
			$option='0';
		}
		$username=@@$input['username'];
		$email=@@$input['email'];
		$password=@@$input['password'];
		$confirm_password=@@$input['confirm_password'];
		$agree=@@$input['agree'];
		if($agree=='on'){ 
			$agree_option='1';
		}else{ 
			$agree_option='0';
		}
        // {{base_url}}/v1/auth/signup?option=1
		$api_url= $this->config->item('api_url');    
		$api_auth_signin= $this->config->item('api_auth_signup');    	
		$api_call=$api_url.$api_auth_signin.'?option='.$option; 
		$postSignin=array('email'=>$email,'username'=>$username,'password'=>$password,'confirm_password'=>$confirm_password);
		$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
		$statusCode=@$rs['statusCode'];
		$code=@$rs['code'];
		$message=@$rs['message'];
		
		// echo'<hr><pre> api_call=>';print_r($api_call);echo'</pre>';
		// echo'<hr><pre> input=>';print_r($input);echo'</pre>';
		// echo'<hr><pre> rs=>';print_r($rs);echo'</pre>';
		if($code!='200'){ 
			$message=@$rs['message'];
			if(!$message){$message='Access denied';}
			$message_th='Access denied API can not accesss';
			if(!$message){
				$message='Access denied';
			}
			$message_th=@$rs['message_th'];
			if(!$message_th){
				$message_th='Access denied API can not accesss';
			}
			$redirect_url=base_url('user/signup');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message.'/'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
									// window.location.replace("'.$redirect_url_signin.'");
								}, 2000);
					});
			}); </script>'; 
		}else{ 
			$message=@$rs['message'];
			if(!$message){$message='Access denied';}

			$message_th=@$rs['message_th'];
			if(!$message_th){
				$message_th='Access denied API can not accesss';
			}
		    $redirect_url_signin=base_url('user/signin');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message.'/'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									window.location.replace("'.$redirect_url_signin.'");
								}, 2000);
					});
			}); </script>'; 
			die();
		}
	}	

	public function signup3(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$allowsignup=@@$input['allowsignup'];
		if($allowsignup==''){
			$allow_sign_up_from= $this->config->item('allow_sign_up_from');
		}if($allowsignup==1){
			$allow_sign_up_from= 1;
		}
		if($allow_sign_up_from!=1){
			// echo '<h1>  The system is closed for service. Please contact the administrator if you wish to use it. </h1>';
			// echo '<hr>';
			// echo '<h1>  ระบบปิดให้บริการ ส่วนนี้ กรุณาติดต่อ ผู้ดูแลหากต้องการใช้งาน  </h1>'; 
			$data['content_view'] = 'authentication/signup_allow_status'; 
			$this->load->view('template/template2',$data);
		}else{ 
			$data['content_view'] = 'authentication/signup3'; 
			$this->load->view('template/template2',$data);
		}

	}
	public function signup3db(){
		// header('Content-Type: application/json');
		// header('Access-Control-Allow-Origin: *');
		// header('Access-Control-Allow-Methods: POST');
		// header('Access-Control-Allow-Headers: Content-Type');
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get(); }
		$option=@@$input['option'];
		if($option=='1'){ 
			$option='1';
		}else{ 
			$option='0';
		}
		$username=@@$input['username'];
		$email=@@$input['email'];
		$password=@@$input['password'];
		$confirm_password=@@$input['confirm_password'];
		$agree=@@$input['agree'];
		if($agree=='on'){ 
			$agree_option='1';
		}else{ 
			$agree_option='0';
		}
        // {{base_url}}/v1/auth/signup?option=1
		$api_url= $this->config->item('api_url');       	
		$api_call=$api_url.'auth/signup3?option='.$option; 
		$postSignin=array('email'=>$email,'username'=>$username,'password'=>$password,'confirm_password'=>$confirm_password);
		$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
		$statusCode=@$rs['statusCode'];
		$code=@$rs['code'];
		$message=@$rs['message'];
		
		// echo'<hr><pre> api_call=>';print_r($api_call);echo'</pre>';
		// echo'<hr><pre> input=>';print_r($input);echo'</pre>';
		// echo'<hr><pre> rs=>';print_r($rs);echo'</pre>';
		if($code!='200' || $statusCode!='200' ){ 
			$message=@$rs['message'];
			if(!$message){$message='Access denied';}
			$message_th='Access denied API can not accesss';
			if(!$message){
				$message='Access denied';
			}
			$message_th=@$rs['message_th'];
			if(!$message_th){
				$message_th='Access denied API can not accesss';
			}
			$redirect_url=base_url('user/signup');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message.'/'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
									// window.location.replace("'.$redirect_url_signin.'");
								}, 2000);
					});
			}); </script>'; 
		}else{ 
			$message=@$rs['message'];
			if(!$message){$message='Access denied';}

			$message_th=@$rs['message_th'];
			if(!$message_th){
				$message_th='Access denied API can not accesss';
			}
		    $redirect_url_signin=base_url('user/signin');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message.'/'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									window.location.replace("'.$redirect_url_signin.'");
								}, 2000);
					});
			}); </script>'; 
			die();
		}
	}	

    public function forgotpassword(){
		//echo '<pre>segment1=>'; print_r($this->uri->segment(1)); echo '</pre>';   
		$data['content_view'] = 'authentication/forgotpassword'; 
		$this->load->view('template/template2',$data);
	}

	public function get_user_by_email($email) {
       //echo '<pre> get_user_by_email email=>'; print_r($email); echo '</pre>';  die();

    }
   
	function validatePasswordReset($postData) {
		$errors = [];
		$password = isset($postData['password']) ? trim($postData['password']) : '';
		$confirmPassword = isset($postData['confirm_password']) ? trim($postData['confirm_password']) : '';
		$code = isset($postData['code']) ? trim($postData['code']) : '';
		$email = isset($postData['email']) ? trim($postData['email']) : '';

		// ตรวจสอบ Token/Code
		if (empty($code)) {
			$errors[] = 'รหัสยืนยันไม่ถูกต้อง';
		}

		// ตรวจสอบ Email
		if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$errors[] = 'อีเมลไม่ถูกต้อง';
		}

		// ตรวจสอบรหัสผ่าน
		if (empty($password)) {
			$errors[] = 'กรุณากรอกรหัสผ่าน';
		} else {
			// ตรวจสอบความยาว
			if (strlen($password) < 8) {
				$errors[] = 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร';
			}

			// ตรวจสอบความแข็งแกร่ง
			$passwordPattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
			if (!preg_match($passwordPattern, $password)) {
				$errors[] = 'รหัสผ่านต้องประกอบด้วย: ตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ (@$!%*?&)';
			}
		}

		// ตรวจสอบการยืนยันรหัสผ่าน
		if (empty($confirmPassword)) {
			$errors[] = 'กรุณายืนยันรหัสผ่าน';
		} elseif ($password !== $confirmPassword) {
			$errors[] = 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน';
		}

		return [
			'isValid' => empty($errors),
			'errors' => $errors,
			'data' => [
				'password' => $password,
				'email' => $email,
				'code' => $code
			]
		];
	}

	public function resetpassword(){
		if(@$_SESSION['token']){
 			redirect(base_url('home'));  die();
		} 
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$code = @@$input['code'];
		$email = @@$input['email'];

		if(!$code){   
            $redirect_url=base_url('user/forgotpassword');
			// echo'<script>
			// 	$( document ).ready(function() {
			// 		swal({
			// 			title: " No code found to verify identity.",
			// 			text: " ไม่พบ code สำหรับยืนยันตัวตน",
			// 			timer: 2000,
			// 			showConfirmButton: false
			// 			}, function(){
			// 					setTimeout(function() {
			// 						// Javascript URL redirection
			// 						window.history.back(); 
			// 					}, 2000);
			// 		});
			// }); </script>'; 
			echo'<script>
					$( document ).ready(function() {
						swal({
								title: " No code found to verify identity.",
								text: " ไม่พบ code สำหรับยืนยันตัวตน",
								timer: 1000,
								showConfirmButton: false
							}, function(){
											setTimeout(function() {
											// Javascript URL redirection
											window.location.replace("'.$redirect_url.'");
								}, 200);
							});
				}); </script>';  
			die();
        } if(!$email){   
            $redirect_url=base_url('user/forgotpassword'); 
			echo'<script>
					$( document ).ready(function() {
						swal({
								title: " No email found to verify identity.",
								text: " ไม่พบ email สำหรับยืนยันตัวตน",
								timer: 1000,
								showConfirmButton: false
							}, function(){
											setTimeout(function() {
											// Javascript URL redirection
											window.location.replace("'.$redirect_url.'");
								}, 200);
							});
				}); </script>';  
			die();
        } 
		$ListSelect = array("title" => 'resetpassword');
		$data = array("code" => $code, "email_user" => $email);
		$data['content_view'] = 'authentication/resetpassword'; 
		// echo '<pre> input=>'; print_r($input); echo '</pre>';   
		// echo '<pre>data>'; print_r($data); echo '</pre>';   
		$this->load->view('template/template2',$data);
	}
	
	public function resetdb(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$code=@@$input['code'];
		if(!$code){
			$message='code is null'; 
			$message_th='code is null can not accesss'; 
			$redirect_url=base_url('user/signup');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
								}, 2000);
					});
			}); </script>'; 
		}
		$email=@@$input['email'];
		if(!$code){
			$message='email is null'; 
			$message_th='email is null can not accesss'; 
			$redirect_url=base_url('user/signup');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
								}, 2000);
					});
			}); </script>'; 
		}
		$password=@@$input['password'];
		if(!$password){
			$message='password is null'; 
			$message_th='password is null can not accesss'; 
			$redirect_url=base_url('user/signup');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
								}, 2000);
					});
			}); </script>'; 
		}
		$confirm_password=@@$input['confirm_password'];
 		if(!$confirm_password){
			$message='confirm password is null'; 
			$message_th='confirm password is null can not accesss'; 
			$redirect_url=base_url('user/signup');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
								}, 2000);
					});
			}); </script>'; 
		} 
		$api_url= $this->config->item('api_url');   
		$api_resetpassword= $this->config->item('api_resetpassword');   
		$api_call=$api_url.$api_resetpassword; 
		$postData=array('password'=>$password,'confirm_password'=>$confirm_password);
		$token=$code;
		$result=$this->Crul_model->call_api_with_token_post($api_call,$token,$postData);  
		$statusCode=$result['statusCode'];
		$message='-';
		$message_th='-';
		$code='400';
		if($statusCode=='200'){
			$code=$result['code'];
			$message=$result['message'];
			$message_th=$result['message_th']; 
		}
		if($code=='400'){
			 $redirect_url=base_url('user/forgotpassword');
			 echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
								}, 2000);
					});
			}); </script>'; 
			die();
		}
		if($code=='200'){
			 $redirect_url=base_url('user/signin');
			 echo'<script>
					$( document ).ready(function() {
						swal({
								title: "'.$message.'",
								text: "'.$message_th.'",
								timer: 1000,
								showConfirmButton: false
							}, function(){
											setTimeout(function() {
											// Javascript URL redirection
											window.location.replace("'.$redirect_url.'");
								}, 200);
							});
				}); </script>';  
			die();
		}
		// echo'<hr><pre> rapi_url=>';print_r($api_url);echo'</pre>'; 
		// die();
		
	}

    public function update_user($user_id, $data) {
        // echo '<pre> get_user_by_email email=>'; print_r($user_id); echo '</pre>'; 
		// echo '<pre> data email=>'; print_r($data); echo '</pre>';    die();
    }
    
    public function get_user_by_reset_code($reset_code) {
       //echo '<pre> data reset_code=>'; print_r($reset_code); echo '</pre>';    die();
    }
    
    public function reset_password($user_id, $new_password) {
        $data = array(
            'password' => password_hash($new_password, PASSWORD_DEFAULT),
            'reset_pass' => null,
            'reset_time' => null
        );
        //echo '<pre> data user_id=>'; print_r($user_id); echo '</pre>'; 
		//echo '<pre> data data=>'; print_r($data); echo '</pre>';   die();
    }
	
    public function forgotpassworddb(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$email = @@$input['email'];
		//echo'<hr><pre> verificationcodedb input=>';print_r($input);echo'</pre>';
        // ตรวจสอบว่ามีการส่งอีเมลมาหรือไม่
        if(empty($email)) {
				$this->session->set_flashdata('error', 'กรุณากรอกอีเมล');
				// $redirect_url=base_url('signin');
				$redirect_url=base_url('user/forgotpassword');
				redirect($redirect_url);
            return;
        }
        // ตรวจสอบว่าอีเมลนี้มีในระบบหรือไม่ 
		$api_url= $this->config->item('api_url');    
		$api_forgot_password= $this->config->item('api_forgot_password');    	
		$api_call=$api_url.$api_forgot_password; 
		$postSignin=array('email'=>$email);
		$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
		$statusCode=@$rs['statusCode'];
		$code=@$rs['code'];
		$payload=@$rs['payload'];
		$uid=@$rs['uid'];
		$message=@$rs['message'];
		$message_th=@$rs['message_th'];
 
		#echo'<hr><pre> api_call=>';print_r($rs);echo'</pre>';
 
        if(!$payload) {
            $redirect_url=base_url('user/forgotpassword');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
								}, 2000);
					});
			}); </script>'; 
			die();
        } 
		$token=@$rs['token'];
		$payload=@$rs['payload'];
		$did=@$rs['did'];
		$TokenDate=@$rs['TokenDate'];
		$user=$payload;
		$email=$payload;
		$reset_code=$token;
		// echo'<hr><pre> token=>';print_r($token);echo'</pre>';  
		// echo'<hr><pre> payload>';print_r($payload);echo'</pre>';  
		// echo'<hr><pre> did=>';print_r($did);echo'</pre>';
		// echo'<hr><pre> TokenDate=>';print_r($TokenDate);echo'</pre>'; die();
        // ส่งอีเมล
        $this->send_reset_email($email, $reset_code, $user);
        
       // $this->session->set_flashdata('success', 'ลิงก์รีเซ็ตรหัสผ่านได้ถูกส่งไปยังอีเมลของคุณแล้ว');
        redirect('user/resetpassword'); 
		die();
	}

	private function send_reset_email($email, $reset_code, $name) {
       # kongnakornna@gmail.com
	   $urldirec2=base_url('user/resetpassword?code='.$reset_code.'&email='.$email);									// echo '<hr>';   
	   redirect( $urldirec2); 
		die();

        $this->load->library('email');
        /*
			EMAIL_FROM=noreply@cmonio.com
			EMAIL_HOST=smtp.office365.com
			EMAIL_PORT=587
			EMAIL_ID=cmoniots@gmail.com
			EMAIL_PASS=cmoniots@0955#
			EMAIL_G_HOST=smtp.gmail.com
			EMAIL_G_PORT=587
			EMAIL_G_ID=cmoniots@gmail.com
			EMAIL_G_PASS=cmoniots@0955#
			GOOGLE_CLIENT_ID=cmoniots@gmail.com
		*/
        // กำหนดค่าอีเมล
        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'smtp.gmail.com';
        $config['smtp_port'] = 587;
        $config['smtp_user'] = 'cmoniots@gmail.com';
        $config['smtp_pass'] = 'cmoniots@0955#';
        $config['smtp_crypto'] = 'tls';
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        
        $this->email->initialize($config);
        
        // เนื้อหาอีเมล
        $reset_link = base_url('user/resetpassword/' . $reset_code);
        
        $message = "
        <html>
        <body>
            <h2>รีเซ็ตรหัสผ่าน</h2>
            <p>สวัสดี คุณ{$name},</p>
            <p>คุณได้ขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ</p>
            <p>กรุณาคลิกลิงก์ด้านล่างเพื่อสร้างรหัสผ่านใหม่:</p>
            <p><a href='{$reset_link}' style='background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>รีเซ็ตรหัสผ่าน</a></p>
            <p>หรือคัดลอกลิงก์นี้ไปวางในเบราว์เซอร์:</p>
            <p>{$reset_link}</p>
            <p>ลิงก์นี้จะหมดอายุใน 24 ชั่วโมง</p>
            <p>หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยต่ออีเมลนี้</p>
        </body>
        </html>
        ";
        
        $this->email->from('noreply@yoursite.com', 'Your Website');
        $this->email->to($email);
        $this->email->subject('รีเซ็ตรหัสผ่าน');
        $this->email->message($message);
        
        return $this->email->send();
    }

	public function authlock(){ 
		$data['content_view'] = 'authentication/authlock'; 
		$this->load->view('template/template2',$data);
	}

	public function authlockdb(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		echo'<hr><pre> verificationcodedb input=>';print_r($input);echo'</pre>';
		echo 'authlockdb'; 
		die();
	}

    function signout(){
		$this->logout();
	}
	
	function logout(){
        //  echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
		//  echo '<pre> _COOKIE=>'; print_r($_COOKIE); echo '</pre>';  die(); 
		$token=$_SESSION['token'];
		if(!$token){
			redirect(base_url('user/signin')); die();
		}
		// echo '<pre> token=>'; print_r($token); echo '</pre>';  
		// die(); 
		$postlogs=array('log_type_id'=>2
									,'uid'=>$_SESSION['uid']
									,'name'=>"User Signout"
									,'detail'=>"User Signout log" 
									,'status'=>2
									,'lang'=>$this->lang->line('lang'));  
		$api_url= $this->config->item('api_url').'syslog/createlog'; 
		$rss=$this->Crul_model->call_api_post($api_url,$postlogs);
 

		$api_url= $this->config->item('api_url');
		$api_auth_users_logout= $this->config->item('api_auth_users_logout');
		$api_call=$api_url.$api_auth_users_logout;
		$rs=$this->Crul_model->call_api_with_token($api_call,$token);
		//echo '<pre> api rs=>'; print_r($rs); echo '</pre>';   die(); 
		$message=@$rs['message'];
		$message_th=@$rs['message_th'];
		@session_destroy();
		if (count($_COOKIE) > 0) {
			foreach ($_COOKIE as $key => $value) {
				setcookie($key, '', time() - 3600, '/');
    			unset($_COOKIE[$key]); // optional: ลบตัวแปรใน PHP ในหน้านี้
				//echo "ชื่อคุกกี้: $key, ค่า: $value<br>";
			}
		} else {
			//echo "ไม่มีคุกกี้ในระบบ";
		}
		// $config['sess_save_path'] 	= BASEPATH.'/log/ci_session_cmon';  // system\log\ci_session_cmon
        @$this->session->sess_destroy();
		$sess_path = BASEPATH.'/log'; // หรือ path ที่ตั้งไว้ใน sess_save_path
		foreach (glob($sess_path . '/ci_session_cmon*') as $filename) {
			@unlink($filename);
		}
		// $cookies = ['user', 'session_id', 'cart'];
		// foreach ($cookies as $cookie) {
		// 	setcookie($cookie, '', time() - 3600, '/');
		// 	unset($_COOKIE[$cookie]);
		// }
		// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
		// echo '<pre> _COOKIE=>'; print_r($_COOKIE); echo '</pre>';  

		$language=$this->lang->language;
		// $title=$message || $language['logout'];
		// $msgst=$message_th || $language['logout']; 
		$title=$language['logout'];
		$msgst=$language['logout'];  
		$urldirec1=base_url('');
		$urldirec=base_url('/user/signin');
		
					$this->User_model->delete_tokenn($token);
					//echo '<pre> 2 OK $urldirec=>'; print_r($urldirec); echo '</pre>';  die();
					echo'<script>
									$( document ).ready(function() {
										//////////////////
										swal({
										title: " '.$title.'",
										text: "'.$msgst.'",
										timer: 1000,
										showConfirmButton: false
										}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.location.replace("'.base_url('user/signin').'");
													}, 200);
									});
										//////////////////
									});
		</script>';

		redirect(base_url('user/signin'));
		//echo 'logout';
		die(); 
	}
 
    public function signinlink(){
		$ListSelect = array("title" => 'signinlink');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/signinlink'; 
		$this->load->view('template/template2',$data);
	}

	public function signinlinkdb(){
		 echo 'signinlinkdb'; die();
	}

    public function verificationcode(){
		$ListSelect = array("title" => 'verificationcode');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/verificationcode'; 
		$this->load->view('template/template2',$data);
	}

	public function verificationcodedb(){
		 $input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		echo'<hr><pre> verificationcodedb input=>';print_r($input);echo'</pre>';
		 redirect(base_url('home'));
		echo 'verificationcodedb'; die();
	}

	public function termsofservice(){
		$ListSelect = array("title" => 'termsofservice');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'authentication/termsofservice'; 
		$this->load->view('template/template2',$data);
	}
	
	public function termsofservicedb(){
		 echo 'termsofservicedb'; die();
	}
	
	/*********Authentication**********/
	public function setting(){
		$ListSelect = array("title" => 'profile');
		$data = array("ListSelect" => $ListSelect);
		$token=@$_SESSION['token'];
		if($_SESSION['role_id_api']){
			$api_url= $this->config->item('api_url');
			$api_auth_users_profile= $this->config->item('api_auth_users_profile');
			$api_call=$api_url.$api_auth_users_profile;
			$rsapi=$this->Crul_model->call_api_with_token($api_call,$token);
			if($rsapi){
				$rs_api=$rsapi['payload'];
				$uid_api=@$rs_api['uid'];
				$role_id=@$rs_api['role_id'];
				//echo '<pre> role_id=>'; print_r($role_id); echo '</pre>'; 
				$email_api=@$rs_api['email'];
				$username_api=@$rs_api['username'];
				$firstname_api=@$rs_api['firstname'];
				$lastname_api=@$rs_api['lastname'];
				$fullname_api=@$rs_api['fullname'];
				$nickname_api=@$rs_api['nickname'];
				$active_status_api=@$rs_api['active_status'];
				$refresh_token=@$rs_api['refresh_token'];
				$refresh_message=@$rs_api['message'];
				$idcard_api=@$rs_api['idcard'];
				if($uid_api){@$_SESSION['uid_api']=$uid_api;}
				$_SESSION['role_id_api']=$role_id;
				$_SESSION['firstname_api']=$firstname_api;
				$_SESSION['lastname_api']=$lastname_api;
				// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
				// echo '<pre> rs_api=>'; print_r($rs_api); echo '</pre>';   die(); 
				$data['profile'] = $rs_api;
			}
		}else{
			$data['profile'] = '';
		} 
		$data['content_view'] = 'profile/profileupdate_ui_demo';
		// echo '<pre> data=>'; print_r($data); echo '</pre>'; 
		$this->load->view('template/template',$data);
	}

	public function profile(){
		$ListSelect = array("title" => 'profile');
		$data = array("ListSelect" => $ListSelect);
		$token=@$_SESSION['token'];
		if($_SESSION['role_id_api']){
			$api_url= $this->config->item('api_url');
			$api_auth_users_profile= $this->config->item('api_auth_users_profile');
			$api_call=$api_url.$api_auth_users_profile;
			$rsapi=$this->Crul_model->call_api_with_token($api_call,$token);
			if($rsapi){
				$rs_api=$rsapi['payload'];
				$uid_api=@$rs_api['uid'];
				$role_id=@$rs_api['role_id'];
				//echo '<pre> role_id=>'; print_r($role_id); echo '</pre>'; 
				$email_api=@$rs_api['email'];
				$username_api=@$rs_api['username'];
				$firstname_api=@$rs_api['firstname'];
				$lastname_api=@$rs_api['lastname'];
				$fullname_api=@$rs_api['fullname'];
				$nickname_api=@$rs_api['nickname'];
				$active_status_api=@$rs_api['active_status'];
				$refresh_token=@$rs_api['refresh_token'];
				$refresh_message=@$rs_api['message'];
				$idcard_api=@$rs_api['idcard'];
				if($uid_api){@$_SESSION['uid_api']=$uid_api;}
				$_SESSION['role_id_api']=$role_id;
				$_SESSION['firstname_api']=$firstname_api;
				$_SESSION['lastname_api']=$lastname_api;
				// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
				// echo '<pre> rs_api=>'; print_r($rs_api); echo '</pre>';   die(); 
				$data['profile'] = $rs_api;
			}
		}else{
			$data['profile'] = '';
		} 
		$data['content_view'] = 'profile/profile';
		// echo '<pre> data=>'; print_r($data); echo '</pre>'; 
		$this->load->view('template/template',$data);
	}

	public function profileadd(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$allowsignup=@@$input['allowsignup'];
		if($allowsignup==''){
			$allow_sign_up_from= $this->config->item('allow_sign_up_from');
		}if($allowsignup==1){
			$allow_sign_up_from= 1;
		} 
		$data['content_view'] = 'authentication/profileadd'; 
		$this->load->view('template/template2',$data);
	}

	public function profileadddb(){
		// header('Content-Type: application/json');
		// header('Access-Control-Allow-Origin: *');
		// header('Access-Control-Allow-Methods: POST');
		// header('Access-Control-Allow-Headers: Content-Type');
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get(); }
		$option=@@$input['option'];
		if($option=='1'){ 
			$option='1';
		}else{ 
			$option='0';
		}
		$username=@@$input['username'];
		$email=@@$input['email'];
		$password=@@$input['password'];
		$confirm_password=@@$input['confirm_password'];
		$agree=@@$input['agree'];
		if($agree=='on'){ 
			$agree_option='1';
		}else{ 
			$agree_option='0';
		}
        // {{base_url}}/v1/auth/signup?option=1
		$api_url= $this->config->item('api_url');    
		$api_auth_signin= $this->config->item('api_auth_signup');    	
		$api_call=$api_url.$api_auth_signin.'?option='.$option; 
		$postSignin=array('email'=>$email,'username'=>$username,'password'=>$password,'confirm_password'=>$confirm_password);
		$rs=$this->Crul_model->call_api_post($api_call,$postSignin);
		$statusCode=@$rs['statusCode'];
		$code=@$rs['code'];
		$message=@$rs['message'];
		
		// echo'<hr><pre> api_call=>';print_r($api_call);echo'</pre>';
		// echo'<hr><pre> input=>';print_r($input);echo'</pre>';
		// echo'<hr><pre> rs=>';print_r($rs);echo'</pre>';
		if($code!='200'){
			$message=@$rs['message'];
			if(!$message){$message='Access denied';}
			if(!$message){
				$message='Access denied';
			}
			$message_th=@$rs['message_th'];
			if(!$message_th){
				$message_th='Access denied API can not accesss';
			}
			$redirect_url=base_url('user/profileadd');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message.'/'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									// Javascript URL redirection
									window.history.back(); 
								}, 2000);
					});
			}); </script>'; 
		}else{
			$message=@$rs['message'];
			if(!$message){$message='Access denied';}
			$message_th=@$rs['message_th'];
			if(!$message_th){
				$message_th='Access denied API can not accesss';
			}
		    $redirect_url_signin=base_url('user/dashboard');
			echo'<script>
				$( document ).ready(function() {
					swal({
						title: " '.$message.'",
						text: "'.$message.'/'.$message_th.'",
						timer: 2000,
						showConfirmButton: false
						}, function(){
								setTimeout(function() {
									window.location.replace("'.$redirect_url_signin.'");
								}, 2000);
					});
			}); </script>'; 
			die();
		}
	}	

	public function profiledetail(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$ListSelect = array("title" => 'profile');
		$data = array("ListSelect" => $ListSelect);
		$token=@$_SESSION['token'];
		$uid=@@$input['uid'];
		$api_url= $this->config->item('api_url').'users/profiledetail?uid='.$uid; 
		#echo '<pre> api_url=>'; print_r($api_url); echo '</pre>'; 
		$rsapi=$this->Crul_model->call_api_with_token($api_url,$token);
		if($rsapi){
			$data['profile'] =$rsapi['payload'];
		}else{
			$message=$rs['message'];
				if(!$message){
					$message='This user is not found.';
				}
				$message_th=$rs['message_th'];
				if(!$message_th){
					$message_th='ไม่พบผู้ใช้รายนี้.';
				}
 				$urldirec=base_url('user/dashboard');  
				echo'<script>
													$( document ).ready(function() {
														//////////////////
														swal({
														title: " '.$message.'",
														text: "'.$message_th.'",
														timer: 1000,
														showConfirmButton: false
														}, function(){
																	setTimeout(function() {
																		// Javascript URL redirection
																		window.location.replace("'.$urldirec.'");
																	}, 200);
													});
														//////////////////
													}); </script>';  
				die();   
			$data['profile'] = '';
		} 
		$data['content_view'] = 'profile/profiledetail';
		// echo '<pre> input=>'; print_r($input); echo '</pre>'; 
		// echo '<pre> data=>'; print_r($data); echo '</pre>'; die();
		$this->load->view('template/template',$data);
	}

    public function profileupdate(){
		
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		$ListSelect = array("title" => 'profile');
		$data = array("ListSelect" => $ListSelect);
		$token=@$_SESSION['token'];
		$uid=@@$input['uid'];
		$api_url= $this->config->item('api_url').'users/profiledetail?uid='.$uid; 
		#echo '<pre> api_url=>'; print_r($api_url); echo '</pre>'; 
		$rsapi=$this->Crul_model->call_api_with_token($api_url,$token);
		$api_url_data= $this->config->item('api_url').'roles';      
        $rs=$this->Crul_model->call_api_with_token($api_url_data,$token);

		if($rsapi){
			$data['profile'] =$rsapi['payload'];
			$data['listroles'] =$rs['payload'];
		}else{
			$message=$rs['message'];
				if(!$message){
					$message='This user is not found.';
				}
				$message_th=$rs['message_th'];
				if(!$message_th){
					$message_th='ไม่พบผู้ใช้รายนี้.';
				}
 				$urldirec=base_url('user/dashboard');  
				echo'<script>
													$( document ).ready(function() {
														//////////////////
														swal({
														title: " '.$message.'",
														text: "'.$message_th.'",
														timer: 1000,
														showConfirmButton: false
														}, function(){
																	setTimeout(function() {
																		// Javascript URL redirection
																		window.location.replace("'.$urldirec.'");
																	}, 200);
													});
														//////////////////
													}); </script>';  
				die();   
			$data['profile'] = '';
		} 
		$data['content_view'] = 'profile/profileupdate'; 
		$this->load->view('template/template',$data); 
	}
	
	public function profileupdatedb(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		// echo '<pre> input=>'; print_r($input); echo '</pre>';  die();
		$api_url= $this->config->item('api_url'); 
		/*
			(
				[email_user_status] => 0
				[uid] => 6a68cc3f-8fed-451b-af72-720d064f2a86
				[email] => kongnakornna@gmail.com
				[username] => kongnakornna
				[firstname] => Kongnakorn
				[lastname] => Jantakun
				[idcard] => 3650700350357
				[fullname] => Konagnkaorn
				[nickname] => Nakorn
				[remark] => 1
				[chage_password_status] => 0
				[password] => 
				[confirm_password] => 
				[public_status] => 1
			)
		*/
		$input_set_array=[];
		$api_url= $this->config->item('api_url');
		$api_updateprofile= $this->config->item('api_updateprofile');
		$api_call=$api_url.$api_updateprofile;
		$token=@$_SESSION['token']; 
		// echo '<pre> h email_user_status=>'; print_r($email_user_status); echo '</pre>';  
		$email_user_status=@@$input['email_user_status']; 
		if($email_user_status=='1'){
			$email=@@$input['email']; 
			$uid=@@$input['uid']; 
			$input_array=array('uid'=>$uid ,'email'=>$email);
			$rsapi=$this->Crul_model->call_api_with_token_post($api_call,$token,$input_array);
			// echo '<pre> h input_array=>'; print_r($input_array); echo '</pre>';  
			// echo '<pre> h rsapi=>'; print_r($rsapi); echo '</pre>';  die();
			$statusCode=@$rsapi['statusCode'];
			$code=@$rsapi['code'];
			if($code=='422'){
							$redirect_url=base_url('user/profile');
							$email_api=@$rsapi['payload']['email'];
							$message1=@$rsapi['message'];
							$message_th1=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message1.'",
											text: "'.$message_th1.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
			}
		}elseif($email_user_status=='0'){
			$email=''; 
		}

		$input_set_array['email']=$email;
		/**********************/
		$username_status=@@$input['username_status']; 
		if($username_status=='1'){
			$username=@@$input['username']; 
			$uid=@@$input['uid'];  
			$input_array2=array('uid'=>$uid ,'username'=>$username);
			$rsapi=$this->Crul_model->call_api_with_token_post($api_call,$token,$input_array2);
			// echo '<pre> h input_array2=>'; print_r($input_array2); echo '</pre>';  
			// echo '<pre> h rsapi=>'; print_r($rsapi); echo '</pre>';  die();
			$statusCode=@$rsapi['statusCode'];
			$code=@$rsapi['code'];
			if($code=='422'){
							$redirect_url=base_url('user/profile');
							$email_api=@$rsapi['payload']['email'];
							$message2=@$rsapi['message'];
							$message_th2=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message2.'",
											text: "'.$message_th2.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
			}
		}else if($username_status=='0'){
			$username=''; 
		}
		$input_set_array['username']=$username;
		/**********************/
		
		$change_password_status=@@$input['change_password_status']; 
		if($change_password_status==1){
			$password=@@$input['password']; 
			$confirm_password=@@$input['confirm_password']; 
		}else if($change_password_status==0){
			$password=''; 
			$confirm_password=''; 
		}
		$input_set_array['password']=$password;
		$input_set_array['confirm_password']=$confirm_password;

		// echo '<pre> ALL input_set_array=>'; print_r($input_set_array); echo '</pre>'; 
		// echo '<pre> ALL input=>'; print_r($input); echo '</pre>'; die();

		$uid=@@$input['uid']; 
	 
		$firstname=@@$input['firstname']; 
		$lastname=@@$input['lastname']; 
		$idcard=@@$input['idcard']; 
		$fullname=@@$input['fullname']; 
		$nickname=@@$input['nickname']; 
		$remark=@@$input['remark']; 
		$public_status=@@$input['public_status']; 
		
		$input_set_array['uid']=$uid;
		$input_set_array['firstname']=$firstname;
		$input_set_array['lastname']=$lastname;
		$input_set_array['idcard']=$idcard;
		$input_set_array['fullname']=$fullname;
		$input_set_array['nickname']=$nickname;
		$input_set_array['remark']=$remark;
		$input_set_array['public_status']=$public_status;
		$input_set_array['public_notification']=@@$input['public_notification']; 
		$input_set_array['sms_notification']=@@$input['sms_notification']; 
		$input_set_array['email_notification']=@@$input['email_notification']; 
		$input_set_array['mobile_number']=@@$input['mobile_number']; 
		$input_set_array['phone_number']=@@$input['phone_number']; 
		$input_set_array['lineid']=@@$input['lineid']; 
		$input_set_array['line_notification']=@@$input['line_notification']; 

		// echo '<pre> h input_set_array=>'; print_r($input_set_array); echo '</pre>';  die();
		$rsapi=$this->Crul_model->call_api_with_token_post($api_call,$token,$input_set_array);
		$statusCode=@$rsapi['statusCode'];
		$code=@$rsapi['code'];
		if($code=='422'){
							$redirect_url=base_url('user/profile');
							$email_api=@$rsapi['payload']['email'];
							$message=@$rsapi['message'];
							$message_th=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message.'",
											text: "'.$message_th.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
		}
		if($code=='400'){ 
							$message=@$rsapi['message'];
							$message_th=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message.'",
											text: "'.$message_th.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
		}
        // echo '<pre> h input_set_array=>'; print_r($input_set_array); echo '</pre>'; 
		// echo '<pre> h rsapi=>'; print_r($rsapi); echo '</pre>';  die();
		if($code=='200'){
							$redirect_url=base_url('user/profile');
							$email_api=@$rsapi['payload']['email'];
							$message=@$rsapi['message'];
							$message_th=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message.'",
											text: "'.$message_th.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														// window.history.back(); 
														window.location.replace("'.$redirect_url.'");
													}, 2000);
										});
							}); </script>'; 
							die();
		}
		  
	}

	public function profileupdatedb2(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		// echo '<pre> input=>'; print_r($input); echo '</pre>';  die();
		$api_url= $this->config->item('api_url'); 
		$input_set_array=[];
		$api_url= $this->config->item('api_url');
		$api_updateprofile= $this->config->item('api_updateprofile');
		$api_call=$api_url.$api_updateprofile;
		$token=@$_SESSION['token']; 
		// echo '<pre> h email_user_status=>'; print_r($email_user_status); echo '</pre>';  
		$email_user_status=@@$input['email_user_status']; 
		if($email_user_status=='1'){
			$email=@@$input['email']; 
			$uid=@@$input['uid']; 
			$input_array=array('uid'=>$uid ,'email'=>$email); 
			$rsapi=$this->Crul_model->call_api_with_token_post($api_call,$token,$input_array);
			// echo '<pre> h input_array=>'; print_r($input_array); echo '</pre>';  
			// echo '<pre> h rsapi=>'; print_r($rsapi); echo '</pre>';  die();
			$statusCode=@$rsapi['statusCode'];
			$code=@$rsapi['code'];
			if($code=='422'){
							$redirect_url=base_url('user/dashboard');
							$email_api=@$rsapi['payload']['email'];
							$message1=@$rsapi['message'];
							$message_th1=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message1.'",
											text: "'.$message_th1.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
			}
		}elseif($email_user_status=='0'){
			$email=''; 
		}

		$input_set_array['email']=$email;
		/**********************/
		$username_status=@@$input['username_status']; 
		if($username_status=='1'){
			$username=@@$input['username']; 
			$uid=@@$input['uid'];  
			$input_array2=array('uid'=>$uid ,'username'=>$username);
			$rsapi=$this->Crul_model->call_api_with_token_post($api_call,$token,$input_array2);
			// echo '<pre> h input_array2=>'; print_r($input_array2); echo '</pre>';  
			// echo '<pre> h rsapi=>'; print_r($rsapi); echo '</pre>';  die();
			$statusCode=@$rsapi['statusCode'];
			$code=@$rsapi['code'];
			if($code=='422'){
							$redirect_url=base_url('user/dashboard');
							$email_api=@$rsapi['payload']['email'];
							$message2=@$rsapi['message'];
							$message_th2=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message2.'",
											text: "'.$message_th2.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
			}
		}else if($username_status=='0'){
			$username=''; 
		}
		$input_set_array['username']=$username;
		/**********************/
		
		$change_password_status=@@$input['change_password_status']; 
		if($change_password_status==1){
			$password=@@$input['password']; 
			$confirm_password=@@$input['confirm_password']; 
		}else if($change_password_status==0){
			$password=''; 
			$confirm_password=''; 
		}
		$input_set_array['password']=$password;
		$input_set_array['confirm_password']=$confirm_password;

		// echo '<pre> ALL input_set_array=>'; print_r($input_set_array); echo '</pre>'; 
		// echo '<pre> ALL input=>'; print_r($input); echo '</pre>'; die();

		$uid=@@$input['uid']; 
	 
		$firstname=@@$input['firstname']; 
		$lastname=@@$input['lastname']; 
		$idcard=@@$input['idcard']; 
		$fullname=@@$input['fullname']; 
		$nickname=@@$input['nickname']; 
		$remark=@@$input['remark']; 
		$public_status=@@$input['public_status']; 
		$role_id=@@$input['role_id']; 
		$input_set_array['uid']=$uid;
		$input_set_array['role_id']=$role_id;
		$input_set_array['firstname']=$firstname;
		$input_set_array['lastname']=$lastname;
		$input_set_array['idcard']=$idcard;
		$input_set_array['fullname']=$fullname;
		$input_set_array['nickname']=$nickname;
		$input_set_array['remark']=$remark;
		$input_set_array['public_status']=$public_status;
		$input_set_array['public_notification']=@@$input['public_notification']; 
		$input_set_array['sms_notification']=@@$input['sms_notification']; 
		$input_set_array['email_notification']=@@$input['email_notification']; 
		$input_set_array['mobile_number']=@@$input['mobile_number']; 
		$input_set_array['phone_number']=@@$input['phone_number']; 
		$input_set_array['lineid']=@@$input['lineid']; 
		$input_set_array['line_notification']=@@$input['line_notification']; 
		$permision_insert=@@$input['permision_insert']; 
		if($permision_insert==""){$permision_insert=0;}
		$permision_update=@@$input['permision_update']; 
		if($permision_update==""){$permision_update=0;}
		$permision_delete=@@$input['permision_delete']; 
		if($permision_delete==""){$permision_delete=0;}
		$permision_select=@@$input['permision_select']; 
		if($permision_select==""){$permision_select=0;} 
		$permision_log=@@$input['permision_log']; 
		if($permision_log==""){$permision_log=0;}
		$permision_config=@@$input['permision_config']; 
		if($permision_config==""){$permision_config=0;}
		$permision_truncate=@@$input['permision_truncate']; 
		if($permision_truncate==""){$permision_truncate=0;}
		// $input_set_array['permision_insert']=@$permision_insert; 
		// $input_set_array['permision_update']=@$permision_update; 
		// $input_set_array['permision_delete']=@$permision_delete; 
		// $input_set_array['permision_select']=@$permision_select; 
		// $input_set_array['permision_log']=@$permision_log; 
		// $input_set_array['permision_config']=@$permision_config; 
		// $input_set_array['permision_truncate']=@$permision_truncate; 
		// echo '<pre> api_call=>'; print_r($api_call); echo '</pre>';  
		// echo '<pre> token=>'; print_r($token); echo '</pre>';  
		// echo '<pre> input_set_array=>'; print_r($input_set_array); echo '</pre>';  die();
		// echo '<pre> h input_set_array=>'; print_r($input_set_array); echo '</pre>';  die();
		$rsapi=$this->Crul_model->call_api_with_token_post($api_call,$token,$input_set_array);
		$statusCode=@$rsapi['statusCode'];
		$code=@$rsapi['code'];
		if($code=='422'){
							$redirect_url=base_url('user/dashboard');
							$email_api=@$rsapi['payload']['email'];
							$message=@$rsapi['message'];
							$message_th=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message.'",
											text: "'.$message_th.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
		}
		if($code=='400'){ 
							$message=@$rsapi['message'];
							$message_th=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message.'",
											text: "'.$message_th.'",
											timer: 2000,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection
														window.history.back(); 
													}, 2000);
										});
							}); </script>'; 
							die();
		}
        // echo '<pre> h input_set_array=>'; print_r($input_set_array); echo '</pre>'; 
		// echo '<pre> h rsapi=>'; print_r($rsapi); echo '</pre>';  die();
		if($code=='200'){
							$redirect_url=base_url('user/profileupdate').'?uid='.$uid;
							$email_api=@$rsapi['payload']['email'];
							$message=@$rsapi['message'];
							$message_th=@$rsapi['message_th'];
							echo'<script>
								$( document ).ready(function() {
										swal({
											title: " '.$message.'",
											text: "'.$message_th.'",
											timer: 200,
											showConfirmButton: false
											}, function(){
													setTimeout(function() {
														// Javascript URL redirection 
														window.location.replace("'.$redirect_url.'");
														//window.history.back(); 
													}, 200);
										});
							}); </script>'; 
							die();
		}
		  
	}

	public function profiledeletedb(){
		 echo 'profiledeletedb'; die();
	}

	public function profilesetting(){
		$ListSelect = array("title" => 'profilesetting');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'profile/profilesetting';
		$this->load->view('template/template',$data);
	}
	
	public function profilesettingdb(){
		$input=@$this->input->post(); 
        if($input==null){$input=@$this->input->get();   }
		
		//echo '<pre> input=>'; print_r($input); echo '</pre>'; 

		die();
	}

	public function profilelist(){
		$ListSelect = array("title" => 'profilelist');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'profile/profilelist';
		$this->load->view('template/template',$data);
	}
	
	public function alerts(){
		$ListSelect = array("title" => 'alerts');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'alerts';
		$this->load->view('template/template',$data);
	}
 
	public function accesslog(){
		$ListSelect = array("title" => 'accesslog');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'accesslog';
		$this->load->view('template/template',$data);
	}
	
	public function userinfo(){
		$ListSelect = array("title" => 'userinfo');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'userinfo';
		$this->load->view('template/template',$data);
	} 
	
	public function phpinfo(){
		// Show all information, defaults to INFO_ALL
		phpinfo();
		// Show just the module information.
		// phpinfo(8) yields identical results.
		phpinfo(INFO_MODULES);
	} 
}