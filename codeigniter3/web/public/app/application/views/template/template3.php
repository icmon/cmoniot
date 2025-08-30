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
$lang=$this->lang->line('lang');
if($this->uri->segment(1)=='userlogs'){ }
$baseurl_refash=base_url('lang/language').'?lang=english&uri='.$segment1;
if(!$lang){
  redirect($baseurl_refash); die();
}

$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();   }
$debugapp=@$input['debugapp']; 

function get_ipv4_from_interface($interface) {
    // Escape the interface name to prevent shell injection.
    $escaped_interface = escapeshellarg($interface);

    // Command to get IPv4 address for a specific interface.
    $command = "ip -4 addr show $escaped_interface | grep 'inet '";

    // Execute the command and capture the output.
    $output = shell_exec($command);

    // If the output is not empty, use a regular expression to find the IP address.
    if (!empty($output)) {
        preg_match('/inet (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/', $output, $matches);
        if (isset($matches[1])) {
            return $matches[1];
        }
    }

    return null; // Return null if no IP address is found.
}

// Get the IPv4 address for the "eth0" Ethernet interface.
// Note: On some Ubuntu systems, the interface name might be different, e.g., 'enp0s3' or 'ens33'.
// You can run `ip addr` in your terminal to find the correct name.
$ethernet_ip = get_ipv4_from_interface('eth0');
$server_ipv4 = @$_SERVER['SERVER_ADDR'];
$PHP_SELF = @$_SERVER['PHP_SELF'];
$SERVER_NAME = @$_SERVER['SERVER_NAME'];
$HTTP_HOST = @$_SERVER['HTTP_HOST'];
$HTTP_REFERER = @$_SERVER['HTTP_REFERER'];
$HTTP_USER_AGENT = @$_SERVER['HTTP_USER_AGENT'];
$SCRIPT_NAME = @$_SERVER['SCRIPT_NAME'];
$config= $this->load->config; 
$bucket_default=$this->config->item('bucket_default');
 $base_url_api = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
 if($debugapp==1){
	echo "<hr>bucket_default=> ".$bucket_default;
	echo "<hr>base_url_api=> ".$base_url_api;
	if ($ethernet_ip) {
		echo "<hr> Ethernet IPv4 Address: " . $ethernet_ip;
	} else {
		echo "<hr> Could not find an IPv4 address for the specified interface.";
	} 
	echo "<hr>S ERVER IPv4 Address=> ".$server_ipv4;
	echo "<br> PHP_SELF:=> " .$PHP_SELF;
	echo "<br> SERVER_NAME:=> " .$SERVER_NAME;
	echo "<br> HTTP_HOST=>" .$HTTP_HOST;
	echo "<br> HTTP_REFERER:=> " .$HTTP_REFERER;
	echo "<br> HTTP_USER_AGENT=> " .$HTTP_USER_AGENT;
	echo "<br> SCRIPT_NAME:=>" .$SCRIPT_NAME;
	echo '<hr> SERVER <pre>';print_r($_SERVER);echo '</pre>';
	echo '<hr> config <pre>';print_r($config);echo '</pre>';
}
if($this->uri->segment(1)=='userlogs'){ }
if(isset($content_view) && !isset($content_data)){
		$this->load->view($content_view); 
	}if(isset($content_view) && isset($content_data)){
		foreach($content_data as $key =>$value){
				$data[$key] = $value;
			}
		$this->load->view($content_view,$data);
	}
################################## Body Content ################################
?>