<?php include("header.php") ?>
<?php if (($results)) { ?>
    <section>
        <h2>Update or Delete</h2>
    </section>
    <?php
    foreach ($results as $result) {
        $id = $result["ID"];
        $city = $result["Name"];
        $countryCode = $result["CountryCode"];
        $district = $result["District"];
        $population = $result["Population"];
    ?>
        <form action="." method="POST">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="id" value="<?= $id ?>">

            <label for="city<?php echo $city ?>">City Name:</label>
            <input type="text" name="city" value="<?php echo $city ?>">

            <label for="city<?php echo $countryCode ?>">countryCode:</label>
            <input type="text" name="countryCode" value="<?php echo $countryCode ?>">

            <label for="district<?php echo $district ?>">District:</label>
            <input type="text" name="district" value="<?php echo $district ?>">

            <label for="population<?php echo $population ?>">Population:</label>
            <input type="text" name="population" value="<?php echo $population ?>">

            <button>Update</button>
        </form>
        <form action="." method="POST">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?php echo $id ?>">
            <button>Delete</button>
        </form>
    <?php } ?>
<?php } else { ?>
    <p>Sorry No Results!</p>
<?php } ?>
<?php
include('status.php')
?><br>
<a href=".">Back to request form</a>
<?php include("footer.php") ?>