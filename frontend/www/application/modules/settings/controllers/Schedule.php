<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Schedule extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('template');
	        }
        public function apiget(){
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $page=@$input['page'];
                if(!$page){$page==1;}
                $pageSize=@$input['pageSize']; 
                if(!$pageSize){$pageSize==10;}
                $keyword=@$input['keyword']; 
                $config=$this->config;
                // echo '<pre> config=>'; print_r($config); echo '</pre>';   
                $api_url_data= $this->config->item('api_url').'sqlite/productjoin?page='.$page.'&pageSize='.$pageSize.'&keyword='.$keyword;      
                $rs=$this->Crul_model->call_api_with_token($api_url_data,$_SESSION['token']);
                if(!$rs){
                        $data=array('status' => FALSE,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                        header('Content-Type: application/json');
                        echo json_encode($data);   die(); 
                }
                //echo '<pre> rs=>'; print_r($rs); echo '</pre>';  
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($rs);  
                }
        public function api(){
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $page=@$input['page'];
                if(!$page){$page==1;}
                $pageSize=@$input['pageSize']; 
                if(!$pageSize){$pageSize==10;}
                $keyword=@$input['keyword']; 
                $config=$this->config;
                // echo '<pre> config=>'; print_r($config); echo '</pre>';   
                $api_url_data= $this->config->item('api_url').'sqlite/productjoin?page='.$page.'&pageSize='.$pageSize.'&keyword='.$keyword;      
                $rs=$this->Crul_model->call_api_with_token($api_url_data,$_SESSION['token']);
                if(!$rs){
                        $data=array('status' => FALSE,'code'=>500,'message' => 'Error! Api IoT cannot Connect Please check'); 
                        header('Content-Type: application/json');
                        echo json_encode($data);   die(); 
                }
                //echo '<pre> rs=>'; print_r($rs); echo '</pre>';  
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($rs);  
                }
	public function index(){
		$ListSelect = array("title" => 'Schedule');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/schedule/settings_schedule';
		$this->load->view('template/template',$data);
                }        
        public function device(){
		$ListSelect = array("title" => 'Schedule');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/schedule/device_schedule';
		$this->load->view('template/template',$data);
                }  
        public function scheduledata(){
		$ListSelect = array("title" => 'Schedule');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/schedule/device_schedule_data';
		$this->load->view('template/template',$data);
                }  
        public function logs(){
		$ListSelect = array("title" => 'Schedule');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/schedule/setting_schedule_log';
		$this->load->view('template/template',$data);
                } 
        public function insert(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
		$ListSelect = array("title" => 'Schedule');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/schedule/addschedule';
		$this->load->view('template/template',$data);
                } 

        public function insertdb(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                // echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                // echo 'Schedule insert';
                } 
        public function detail(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                // echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                echo 'Schedule detail';
                } 
        public function edit(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
		$ListSelect = array("title" => 'Schedule');
		$data = array("ListSelect" => $ListSelect);
		$data['content_view'] = 'settings/schedule/editschedule';
		$this->load->view('template/template',$data);
                } 
        public function editdb(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                // echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                echo 'Schedule edit';
                } 

        public function delete(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                $id=@$input['id'];
                // // echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                $array=array('code'=>200,'message'=>'OK','id'=>$id,'payload'=>$input);
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($array);  
	} 
        // // http://192.168.1.58:8081/settings/schedule/device?schedule_id=1
}
/*
* การแจ้งเตือน 
* * * * * * * * * * * * * * * * * * 
1. Warning เตือนภัยระดับกลาง   เช่น =>  35  องศาเชลเชียส
2. Alarm  เตือนภัยระดับร้ายแรง    เช่น =>37  องศาเชลเชียส
3. Warning recovery ยกเลิก=>เตือนภัยระดับกลาง   เช่น =>32  องศาเชลเชียส
4. Alarm recovery   ยกเลิก=>เตือนภัยระดับร้ายแรง  เช่น =>34  องศาเชลเชียส
* * * * * * * * * * * * * * * * * * 
* การแจ้งเตือน  แบบ Popup 
* การแจ้งเตือน แบบ สัญลักษณ์บอลลูน (Set up a balloon symbol alarm.) 
* การแจ้งเตือน บน Dashboard
* การแจ้งเตือน ส่งการแจ้งเตียน 
  1. Warning 
      =>ส่งการแจ้งเตียนภัย 
      1.1.1  Email -> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      1.1.2  Line  -> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      1.1.3  SMS   -> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      1.1.4 NO/NC   
        1.1.4.1.Siren speaker (ลำโพงไซเรน) 
        1.1.4.2.Siren Light (แสงสว่างไซเรน)
       
    1.2 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์ 

  * * * * * * * * * * * * * * * * * * 
  2. Alarm
     =>ส่งการแจ้งเตียนภัย
      2.1.เลือกทำงาน 
      2.1.1  Email ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.2  Line  ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.3  SMS   ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.4 NO/NC 
        2.1.4.1.Siren speaker (ลำโพงไซเรน) 
        2.1.4.2.Siren Light (แสงสว่างไซเรน)
        1.1.5 เลือคนที่จะส่ง การ แจ้งเตียนภัย
      2.1.5 เลือคนที่จะส่ง การ แจ้งเตียนภัย
    2.2 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์ 
  * * * * * * * * * * * * * * * * * * 
  3. Recovery Warning  ระบบกลับมาสู่ภาวะ ปกติ
    3.1.เลือกทำงาน 
      3.1.1  Email ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      3.1.2  Line  ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      3.1.3  SMS   ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
    3.2 เลือคนที่จะส่ง การ แจ้งเตียนภัย
    3.3 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์ 
  * * * * * * * * * * * * * * * * * * 
  4. Recovery Alarm   ระบบกลับมาสู่ภาวะ ปกติ
      4.1.เลือกทำงาน 
            4.1.1  Email  ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
            4.1.2  Line   ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
            4.1.3  SMS    ---> เลือคนที่จะส่ง การ แจ้งเตียนภัย
      4.2 เลือคนที่จะส่ง การ แจ้งเตียนภัย
      4.3 สั่งงานอุปกรณ์ 
      --เลือกอุปกรณ์  เช่น พัดลม 1 พัดลม 2
      --เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์   

  - การบันทึกกระบวนการทำงาน แต่สถานะ  
  - ไม่ให้มีการส่ง ซ้ำ xxx ชั่วโมง
  - การบันทึก  สถานะ การส่ง ตรวจสอบว่าส่ง  
  - สร้าง Link กด รับทราบแล้ว  updat status action
  - ปิดการแจ้งเตียน รายบุคคล
  - ปิดการแจ้งเตียน ทั้งหมด
  * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * 
  Schedule  ตั้งค่าทำงาน ตามตารางเวลา 
  1.ตั้งค่าชื่อการ ทำงาน
  2.ตั้งค่าทำงาน ตามตารางเวลา เช่น 8.00
  3.ที่เลือกให้ทำงาน
  4.เลือกการ สั่งงานอุปกรณ์ 
        -- เปิด อุปกรณ์ 
        -- ปิด อุปกรณ์     
  5.เลือกการ สั่งงานอุปกรณ์  ตามปฎิทิน สัปดาห์ 
    -จันทร์
    -อังคาร
    -พุธ
    -พถหัส
    -ศุกร์
    -เสาร์
    -อาทิตย์
  - การบันทึกกระบวนการทำงาน แต่สถานะ  
  * * * * * * * * * * * * * * * * * * 
  * * * * * * * * * * * * * * * * * * 
*/