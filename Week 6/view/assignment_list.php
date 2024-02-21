<?php 
include('view/header.php'); // Include the header part of the HTML page
?>

<!-- Section to Display Assignments -->
<section>
    <h1>Assignments</h1>
    <!-- Form for Filtering Assignments by Course -->
    <form action="." method="get">
        <select name="course_id">
            <option value="0">View All</option>
            <?php foreach ($courses as $course) : ?>
                <!-- Dynamically generate options for courses, mark selected based on current filter -->
                <option value="<?= $course['courseID'] ?>" <?= $course_id == $course['courseID'] ? 'selected' : '' ?>>
                    <?= htmlspecialchars($course['courseName']) ?>
                </option>
            <?php endforeach; ?>
        </select>
        <button type="submit">Go</button> <!-- Submit button for the filter form -->
    </form>

    <!-- Check if there are assignments to display -->
    <?php if (!empty($assignments)) : ?>
        <!-- Loop through each assignment and display it -->
        <?php foreach ($assignments as $assignment) : ?>
            <div>
                <p><strong><?= htmlspecialchars($assignment['courseName']) ?></strong></p> <!-- Display the course name -->
                <p><?= htmlspecialchars($assignment['Description']) ?></p> <!-- Display the assignment description -->
                <!-- Form to delete the assignment, with hidden inputs for passing data -->
                <form action="." method="post">
                    <input type="hidden" name="action" value="delete_assignment">
                    <input type="hidden" name="assignment_id" value="<?= $assignment['ID'] ?>">
                    <button type="submit">X</button> <!-- Button to delete the assignment -->
                </form>
            </div>
        <?php endforeach; ?>
    <?php else : ?>
        <!-- Message displayed if no assignments exist -->
        <p>No assignments exist<?= $course_id ? ' for this course' : '' ?> yet.</p>
    <?php endif; ?>
</section>

<!-- Section to Add a New Assignment -->
<section>
    <h2>Add Assignment</h2>
    <!-- Form for Adding a New Assignment -->
    <form action="." method="post">
        <select name="course_id" required>
            <option value="">Please select</option>
            <?php foreach ($courses as $course) : ?>
                <!-- Options for selecting course, populated dynamically -->
                <option value="<?= $course['courseID'] ?>">
                    <?= htmlspecialchars($course['courseName']); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <!-- Input field for the assignment description -->
        <input type="text" name="description" maxlength="120" placeholder="Description" required>
        <button type="submit" name="action" value="add_assignment">Add</button> <!-- Submit button for adding the assignment -->
    </form>
</section>

<!-- Link to View/Edit Courses Page -->
<p><a href=".?action=list_courses">View/Edit Courses</a></p>

<?php 
include('view/footer.php'); // Include the footer part of the HTML page
?>
