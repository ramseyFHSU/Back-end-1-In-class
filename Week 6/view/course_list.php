<?php 
// Include the header part of the HTML page
include("view/header.php"); 
?>

<!-- Display Courses -->
<?php if (!empty($courses)) : ?> <!-- Check if there are any courses to display -->
    <section id="list" class="list">
        <header>
            <h1>Course List</h1>
        </header>
        <!-- Loop through the courses and display each one -->
        <?php foreach ($courses as $course) : ?>
            <div class="list__row">
                <div class="list__item">
                    <!-- Display the course name -->
                    <p class="bold"><?= htmlspecialchars($course['courseName']) ?></p>
                </div>
                <div class="list__removed">
                    <!-- Form to delete the course -->
                    <form action="." method="post">
                        <input type="hidden" name="action" value="delete_course">
                        <input type="hidden" name="course_id" value="<?= $course['courseID'] ?>">
                        <button class="remove-button">X</button>
                    </form>
                </div>
            </div>
        <?php endforeach; ?>
    </section>
<?php else : ?>
    <!-- Display a message if no courses exist -->
    <p>No Courses exist yet</p>
<?php endif; ?>

<!-- Add Course Form -->
<section>
    <h2>Add Course</h2>
    <form action="." method="post" id="add__form" class="add__form">
        <input type="hidden" name="action" value="add_course">
        <div class="add__inputs">
            <label>Name:</label>
            <!-- Input for the new course name -->
            <input type="text" name="course_name" maxlength="30" placeholder="Name" autofocus required>
        </div>
        <div class="add__addItem">
            <!-- Button to submit the form and add a new course -->
            <button class="add-button bold">Add</button>
        </div>
    </form>
</section>

<!-- Link to View/Edit Assignments -->
<p><a href=".?action=list_assignments">View/Edit Assignments</a></p>

<?php 
// Include the footer part of the HTML page
include("view/footer.php"); 
?>
