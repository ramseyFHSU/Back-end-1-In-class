<?php
session_start();

// To unset the session
unset($_SESSION['name']);

// To destroy the session
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page 4</title>
</head>
<body>
    <a href="page3.php">Page3</a>
</body>
</html>