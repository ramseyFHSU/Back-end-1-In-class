<?php
$dsn = "mysql:host=localhost; dbname=assignment_tracker";
$username = 'root';

try {
$db = new PDO($dsn, $username);

} catch (PDOException $e){
$error_message = "Database Error: ";
$error_message .= $e->getMessage();
include('view/error.php');
exit();
}
