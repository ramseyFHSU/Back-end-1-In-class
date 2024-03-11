<?php
setcookie('username', 'John Doe', time() + (3600*30));

// Delete cookie 
// setcookie('username', 'john doe', time() - 3600);


if(isset($_COOKIE['username'])){
    echo 'user name ' .$_COOKIE['username'] . ' is set';
} else {
    echo 'username is not set';
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page 2</title>
</head>
<body>
    
</body>
</html>