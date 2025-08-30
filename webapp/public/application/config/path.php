<?php
$config['root_path'] = '';
$config['root_url'] = '';
$config['path_upload'] = 'uploads/';
$config['dirPerms'] = "0775";
$config['allow']['image'] = array('gif','png' ,'jpg');
$config['allow']['video'] = array('mp4','avi' ,'flv');
$config['default']['img'] = $config['root_url'].'default.jpg';
$config['siteurl']='http://'.$_SERVER['HTTP_HOST'].'';
$config['api']='http://'.$_SERVER['HTTP_HOST'].'/api/';