<?php
if(isset($_POST['submit'])){
    session_start();

    $_SESSION['name'] = $_POST['name'];
    $_SESSION['email'] = $_POST['email'];

    header('Location: page2.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="<?php echo $_SERVER['PHP_SELF'] ?>">
    <input type="text" name="name" placeholder="Enter Name">
    <input type="text" name ="email" placeholder="Enter Email">
    <button type="submit" name="submit" value="submit">Submit</button>
    </form>
</body>
</html>