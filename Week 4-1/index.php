<?php
// POST data
$newCity = filter_input(INPUT_POST, 'newCity', FILTER_SANITIZE_SPECIAL_CHARS);
$countryCode = filter_input(INPUT_POST, 'countryCode', FILTER_SANITIZE_SPECIAL_CHARS);
$district = filter_input(INPUT_POST, 'district', FILTER_SANITIZE_SPECIAL_CHARS);
$population = filter_input(INPUT_POST, 'population', FILTER_SANITIZE_SPECIAL_CHARS);
// GET data
$city = filter_input(INPUT_GET, 'city', FILTER_SANITIZE_SPECIAL_CHARS);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD operations</title>
</head>
<body>
    <main>
        <header>
            <h1>Connecting to Database</h1>
            <?php if (!$city || $newCity) {?>
                <section>
                    <h2>Select Data / Read Data</h2>
                    <form action="<?php echo $_SERVER['PHP_SELF']?>" method="GET">
                    <label for="city">City Name:</label>
                    <input type="text" id="city" name="city" required>
                    <button type="submit">Submit</button>
                    </form>
                </section>
                <section>
                    <h2>Insert Data / Create Data</h2>
                    <form action="<?php echo $_SERVER['PHP_SELF']?>" method="GET">
                    <label for="newCity">New City:</label>
                    <input type="text" id="newCity" name="newCity" required>
                    <label for="countryCode">Country Code:</label>
                    <input type="text" id="countryCode" name="countryCode" required>
                    <label for="district">District:</label>
                    <input type="text" id="district" name="district" required>
                    <label for="population">Population:</label>
                    <input type="text" id="population" name="population" required>
                    <button type="submit">Submit</button>
                    </form>
                </section>
            <?php } else { ?>
                <?php include("database.php") ?>
                <?php
                if($newCity){
                    $query = 'INSERT INTO `city`( `Name`, `CountryCode`, `District`, `Population`) 
                                VALUES ( newCity, countryCode, district, population)'; 
                    $statement = $db->prepare($query);
                    $statement->bindValue(":newCity", $newCity);
                    $statement->bindValue(":countryCode", $countryCode);
                    $statement->bindValue(":district", $district);
                    $statement->bindValue(":population", $population);
                    $statement->execute();
                    $statement->closeCursor();
                }
                ?>
                <?php
                if ($city || $newCity) {
                    $query = 'SELECT * FROM `city` WHERE Name = :city ORDER BY population DESC';
                    $statement = $db->prepare($query);
                    if($city){
                        $statement->bindValue(":city", $city);
                    } else {
                        $statement->bindValue(":newCity", $newCity);
                    }
                    $statement->execute();
                    $results = $statement->fetchAll();
                    $statement->closeCursor();
                    echo $results;
                }
                ?>
            <?php } ?>
        </header>
    </main>
</body>
</html>