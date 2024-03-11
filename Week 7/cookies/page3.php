<?php
$user = [ 'name'=>'jane doe', 'email'=>'jane@gmail.com', 'age'=>'30'];

$user = serialize($user); 

setcookie9('user', $user, time( ) + 3600);

$user = unserialize($_COOKIE['user']);

echo $user['name'];

echo $user;

?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page 3</title>
</head>
<body>
    
</body>
</html>