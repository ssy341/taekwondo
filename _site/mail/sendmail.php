<?php 
require("mail.php")

$name =$_POST['name'];    
$phone =$_POST['phone'];
$note =$_POST['note'];

send_mail_lazypeople('1282262270@qq.com','预约报名',$name || $phone || $note );
?>
