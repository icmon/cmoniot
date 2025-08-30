<?php
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
if($this->uri->segment(1)=='userlogs'){ }
$baseurl_refash=base_url('lang/language').'?lang=english&uri='.$segment1;
if(!$lang){
  redirect($baseurl_refash); die();
}
$this->load->view('Templatefrontend/header');
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
$this->load->view('Templatefrontend/footer');
?>