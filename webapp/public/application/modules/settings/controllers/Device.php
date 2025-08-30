<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Device extends MX_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->config->item('Template');
	}
        public function apiget(){
                if(!@$_SESSION['token']){
                        redirect(base_url('dashboard'));  die();
                }else{
                $token=$_SESSION['token'];
                } 
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $page=$input['page'];
                if(!$page){$page==1;}
                $pageSize=$input['pageSize']; 
                if(!$pageSize){$pageSize==10;}
                $keyword=$input['keyword']; 
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
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $option=$input['option'];
		$ListSelect = array("title" => 'Settings Device');
		$data = array("ListSelect" => $ListSelect);
                if($option=="" || $option==1){
                        // http://192.168.1.59:3003/v1/settings/listdevicepageall?page=1&pageSize=10&bucket=BAACTW04
                         $data['content_view'] = 'settings/device/devicesettings_v1';
                       // $data['content_view'] = 'settings/device/devicesettings';
                }else{
                        // $data['content_view'] = 'settings/device/devicesmonitor';
                        $data['content_view'] = 'settings/device/devicesmonitor_v1';
                } 
		$this->load->view('Template/Template',$data);
        }  
        public function deviceactive(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}
                $option=$input['option'];
		$ListSelect = array("title" => 'Settings Device');
		$data = array("ListSelect" => $ListSelect);
                $data['content_view'] = 'settings/device/devicesettings_active'; 
                // if($option=="" || $option==1){
                //         $data['content_view'] = 'settings/device/devicesettings_active'; 
                // }else{
                //        $data['content_view'] = 'settings/device/devicesettings_active_2';
                // } 
		$this->load->view('Template/Template',$data);
        }                
        public function devicesadd(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}  
                $data['content_view'] = 'settings/device/devicesadd';
		$this->load->view('Template/Template',$data);
        } 
        public function devicesedit(){
                        $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}  
                $data['content_view'] = 'settings/device/devicesedit';
		$this->load->view('Template/Template',$data);
        } 
        public function detail(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}  
                $data['content_view'] = 'settings/device/detail';
		$this->load->view('Template/Template',$data);
        } 
        public function edit(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();}  
                $data['content_view'] = 'settings/device/devicesedit';
		$this->load->view('Template/Template',$data);
        } 
        public function delete(){
                $input=@$this->input->post(); 
                if($input==null){$input=@$this->input->get();} 
                $id=$input['id'];
                // echo '<pre> input=>'; echo print_r($input); echo '</pre>';
                $array=array('code'=>200,'message'=>'OK','id'=>$id,'payload'=>$input);
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($array);  
        } 
}
/*
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('sd_iot_device_action', { schema: 'public' }) // Specifies the table name
export class Deviceaction {
  //@PrimaryColumn()
  @PrimaryGeneratedColumn() // จะเป็น auto-increment primary key
  device_action_user_id: number; 

  @Column({ type: 'int', nullable: true })
  alarm_action_id: number;

  @Column({ type: 'int', nullable: true })
  device_id: number;

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
// http://localhost:3003/v1/settings/listmqttpaginate?deletecache=
// http://localhost:3003/v1/settings/listmqttpaginate?deletecache=