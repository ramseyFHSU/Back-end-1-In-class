<?php
function select_city_by_name($city)
{
    global $db;
    $query = 'SELECT * FROM city
                            WHERE Name= :city 
                                ORDER BY Population DESC';
    $statement = $db->prepare($query);
    $statement->bindValue(":city", $city);
    $statement->execute();
    $results = $statement->fetchAll();
    $statement->closeCursor();
    return $results;
}
function insert_city($city, $countryCode, $district, $population)
{
    global $db;
    $count = 0;
    $query = 'INSERT INTO city
                (Name, CountryCode, District, Population)
                VALUES 
                (:newCity, :countryCode, :district, :population)';
    $statement = $db->prepare($query);
    $statement->bindValue(':newCity', $city);
    $statement->bindValue(':countryCode', $countryCode);
    $statement->bindValue(':district', $district);
    $statement->bindValue(':population', $population);
    if ($statement->execute()) {
        $count = $statement->rowCount();
    }
    $statement->closeCursor();
    return $count;
}
function update_city($id, $city, $countryCode, $district, $population)
{
    global $db;
    $count = 0;
    $query = 'UPDATE city
    SET Name = :city, CountryCode=:countryCode, District=:district, 
    Population=:population
    WHERE ID = :id';
    $statement = $db->prepare($query);
    $statement->bindValue(":id", $id);
    $statement->bindValue(":city", $city);
    $statement->bindValue(":countryCode", $countryCode);
    $statement->bindValue(":district", $district);
    $statement->bindValue(":population", $population);
    if ($statement->execute()) {
        $count = $statement->rowCount();
    };
    $statement->closeCursor();
    return $count;
}
function delete_city($id)
{
    global $db;
    $count = 0;
    $query = 'DELETE FROM city
    WHERE ID = :id';
    $statement = $db->prepare($query);
    $statement->bindValue(":id", $id);
    if ($statement->execute()) {
        $count = $statement->rowCount();
    };
    $statement->closeCursor();
    return $count;
}
