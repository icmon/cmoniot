<?php
@session_start();
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
$language=$this->lang->language;
$lang=$this->lang->line('lang');
?>
<script type="text/javascript" src="<?php echo base_url('assets/sweetalert2/dist/js/jquery-latest.js');?>"></script>
<script src="<?php echo base_url('assets/sweetalert2/dist/sweetalert-dev.js');?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/sweetalert2/dist/sweetalert.css');?>">
<?php
$token=$_SESSION['token'];
if(!$token){
  	$title=$language['logout'];
	$msgst=$language['logout'];  
  	$urldirec=base_url('/signin').'?theme=dark';
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
														window.location.replace("'.base_url('signin').'");
													}, 200);
									});
										//////////////////
									});
		</script>'; 
	  redirect($urldirec); die();
}
if($this->uri->segment(1)=='userlogs'){ }
$baseurl_refash=base_url('lang/language').'?lang=english&uri='.$segment1;
if(!$lang){
  redirect($baseurl_refash); die();
}
$this->load->view('template/header');
if(@$pagewrapper_seeting==1){
    $this->load->view('Template/pagewrapper_seeting'); 
}
//echo '<pre>pagewrapper_seeting=>'; print_r($pagewrapper_seeting); echo '</pre>';  
#Start: PAGE CONTENT  
################################## Body Content ################################
if(isset($content_view) && !isset($content_data)){
		$this->load->view($content_view); 
	}if(isset($content_view) && isset($content_data)){
		foreach($content_data as $key =>$value){
				$data[$key] = $value;
			}
		//echo '<pre>data=>'; print_r($data); echo '</pre>';  
		$this->load->view($content_view,$data);
	}
################################## Body Content ################################
#End:PAGE CONTENT 
$this->load->view('template/footer');
?>