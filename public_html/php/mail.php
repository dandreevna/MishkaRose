<?php

if (isset($_POST["name"]) && isset($_POST["phonenumber"]) ) { 

    $to = "ulyanov_dima@bk.ru";
    $subject = "MishkaRose";
    
    $message = "Имя: " . $_POST["name"] . "\r\n";
    $message .= "Телефон: " . $_POST["phonenumber"];
    
    $retval = mail ($to,$subject,$message);
    
    if( $retval == true ) {
     	$result = array(
	    	'name' => $_POST["name"],
	    	'phonenumber' => $_POST["phonenumber"]
	     ); 
    }else{
    	$result = array(
	    	'name' => 0,
	    	'phonenumber' => $_POST["phonenumber"]
	    ); 
    }

    echo json_encode($result);
}

?>
