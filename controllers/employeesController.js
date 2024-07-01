const data = {
  employees: require('../model/employees.json'),
  setEmployees: function (data) {
    this.employees = data
  },
}

function getAllEmployees() {
  return data.employees
}

function createNewEmployee(body) {
  const newEmployee = {
    id: data.employees.at(-1).id + 1 ?? 1,
    firstname: body.firstname,
    lastname: body.lastname,
  }

  data.employees.push(newEmployee)
  console.log(data.employees)
}

function getEmployee(id) {
  return data.employees.find((employee) => employee.id === id)
}

function updateEmployee(id, body) {
  const index = data.employees.findIndex((employee) => employee.id === id)
  data.employees[index] = {
    ...data.employees[index],
    ...body,
  }
  console.log(data.employees)
}

function removeEmployee(id) {
  data.setEmployees(data.employees.filter((employee) => employee.id !== id))
  console.log(id)
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  getEmployee,
  updateEmployee,
  removeEmployee,
}
