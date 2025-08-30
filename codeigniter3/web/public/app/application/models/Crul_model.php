<?php
class Crul_model extends CI_Model {
    public function __construct() {
    	header('Content-Type: text/html; charset=utf-8');
        parent::__construct();
    } 

    public function call_api_with_data($url,$token){ 
        //$this->output->delete_cache();
        // This will cache the entire page output for 1 minute.
        // $this->output->cache(1);  
        echo '<pre> url=>'; print_r($url); echo '</pre>';  
        echo '<pre> data=>'; print_r($data); echo '</pre>';  
        
        $ch = curl_init($url);
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For HTTPS, if needed
        $response = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($response, true);
        
        // echo '<pre> token=>'; print_r($token); echo '</pre>';  
        // echo '<pre> url=>'; print_r($url); echo '</pre>';  
        // echo '<pre> data=>'; print_r($data); echo '</pre>';  
        return $data;
    }

    public function call_api_with_token2($url,$token){ 
       // $this->output->cache(1); 
        // $this->output->delete_cache();
        // รายการ API ที่ต้องการเรียก
            $api_calls = [
                    'url' => $ur, 
                    'token' => $token
                ];

            // เรียกใช้งานฟังก์ชัน async
            $results = call_multiple_apis_async($api_calls); 
        return $results;
    }

    public function call_api_with_token($url,$token){ 
        //$this->output->delete_cache();
        // This will cache the entire page output for 1 minute.
        // $this->output->cache(1); 
        // $this->output->delete_cache();

        $ch = curl_init($url);
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For HTTPS, if needed
        $response = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($response, true);
        // echo '<pre> url=>'; print_r($url); echo '</pre>';  
        // echo '<pre> token=>'; print_r($token); echo '</pre>';  
        // echo '<pre> data=>'; print_r($data); echo '</pre>';  
        return $data;
    }

    public function call_api_with_token_post($url,$token,$data=array()){
        //  $this->output->cache(3);  // Cache for 60 minutes
        // $url = 'https://api.example.com/endpoint';
        // $token = 'your_token_here';
        // // Data to be sent in POST request
        // $data = [
        //     'name'  => 'John Doe',
        //     'email' => 'john@example.com'
        // ];
        // Initialize cURL
        /*
        {
            "email": "cmoniots@gmail.com",
            "password": "Na@0955@#"
            }
        */
        $secretkey='Na@0955@#';
        $ch = curl_init($url);
        // Encode data as JSON
        $payload = json_encode($data);
        // Set headers, including Authorization
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token,
           // 'secretkey:'.$secretkey
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Set cURL options for POST
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        // Return response as string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Execute request
        $result = curl_exec($ch);
        // Close cURL
        curl_close($ch);
        // Handle response
        $response = json_decode($result, true);
        //echo '<pre> response=>'; print_r($response); echo '</pre>';  
        return $response;
    }

    public function call_api_post($url,$data=array()){
        //  $this->output->cache(3);  // Cache for 60 minutes
        // echo '<pre> url=>'; print_r($url); echo '</pre>';   
        // echo '<pre> data=>'; print_r($data); echo '</pre>';   
        // $url = 'https://api.example.com/endpoint';
        // $token = 'your_token_here';
        // // Data to be sent in POST request
        // $data = [
        //     'name'  => 'John Doe',
        //     'email' => 'john@example.com'
        // ];
        // Initialize cURL
       // header('Content-Type: application/json; charset=utf-8');
        $ch = curl_init($url);
        // Encode data as JSON
        $payload = json_encode($data); 
         $headers = [
            'Content-Type: application/json', 
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Set cURL options for POST
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        // Return response as string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Execute request
        $result = curl_exec($ch);
        // Close cURL
        curl_close($ch);
        // Handle response
        //  echo '<pre> payload=>'; print_r($payload); echo '</pre>';  
        //  echo '<pre> result=>'; print_r($result); echo '</pre>';  
        $response = json_decode($result, true);
        // echo '<pre> call_api_post  url=>'; print_r($url); echo '</pre>';   
        // echo '<pre> payload=>'; print_r($payload); echo '</pre>';   
        // echo '<pre> response=>'; print_r($response); echo '</pre>';  
        return $response;
    }
 
}

//   $this->output->delete_cache();
//   $this->output->cache(1); 
// php codeigniter3   async  await