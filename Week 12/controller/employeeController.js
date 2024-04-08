const data = {
  employees: require("../model/employee.json"),
  setEmployee(data) {
    this.employees = data;
  },
};

// GetEmployees
const GetAllEmployees = (req, res) => {
  res.json(data.employees);
};

// CreateNewEmployees
const CreateNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res.status(400).json({ message: "First and last name is required" });
  }
  data.setEmployee([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

// UpdateEmployee
const UpdateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ${employee} is not found` });
  }
  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;

  const filteredArray = data.employees.filter(
    (emp) => emp.id != parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

// DeleteEmployee
const DeleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ${employee} is not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployee([...filteredArray]);
  res.json(data.employees);
};

// GetEmployee
const GetAllEmployee = (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = data.employees.find((emp) => emp.id === employeeId);
  if (!employeeId) {
    return res.status(400).json({ message: `Employee Not found` });
  }
  res.json(employee);
};

module.exports = {
  GetAllEmployee,
  CreateNewEmployee,
  UpdateEmployee,
  DeleteEmployee,
  GetAllEmployees,
};
