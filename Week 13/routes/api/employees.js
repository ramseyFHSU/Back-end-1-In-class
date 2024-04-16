const express = require("express");
const router = express();
const employeeController = require("../../controllers/employeeController");

router
  .route("/")
  .get(employeeController.GetAllEmployees)
  .post(employeeController.CreateNewEmployee)
  .put(employeeController.UpdateEmployee)
  .delete(employeeController.DeleteEmployee);

router.route("/:id").get(employeeController.GetAllEmployee);

module.exports = router;
