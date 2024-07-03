const Employee = require('../model/Employee')

async function getAllEmployees(req, res) {
  const employees = await Employee.find()
  if (employees) return res.json(employees)
  else return res.status(204).json({ message: 'No employees found.' })
}

async function createNewEmployee(req, res) {
  if (!req?.body?.firstname || !req?.body?.lastname)
    res.status(400).json({ message: 'First and last names are required.' })

  const result = await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  })
  return res.status(201).json(result)
}

async function getEmployee(req, res) {
  if (!req?.params?.id)
    return res.status(400).json({ message: `Employee ID is required.` })

  const employee = await Employee.findOne({ _id: req.params.id }).exec()
  if (!employee)
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}` })
  return res.json(employee)
}

async function updateEmployee(req, res) {
  if (!req?.params?.id)
    res.status(400).json({ message: `Employee ID is required.` })

  const employee = await Employee.findOne({ _id: req.params.id }).exec()
  if (!employee)
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}` })

  if (req.body?.firstname) employee.firstname = req.body.firstname
  if (req.body?.lastname) employee.lastname = req.body.lastname

  try {
    const result = await employee.save()
    return res.json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Update not made.' })
  }
}

async function removeEmployee(req, res) {
  if (!req.params.id)
    res.status(400).json({ message: `Employee ID is required.` })

  const employee = await Employee.findOne({ _id: req.params.id }).exec()
  if (!employee)
    return res
      .status(400)
      .json({ message: `No employee matches ID ${req.params.id}` })

  try {
    const result = await employee.deleteOne()
    return res.json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Deletion not made.' })
  }
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  getEmployee,
  updateEmployee,
  removeEmployee,
}
