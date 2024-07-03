const express = require('express')
const router = express.Router()
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  removeEmployee,
  getEmployee,
} = require('../../controllers/employeesController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router
  .route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), createNewEmployee)

router
  .route('/:id')
  .get(getEmployee)
  .put(verifyRoles(ROLES_LIST.ADMIN), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.ADMIN), removeEmployee)

module.exports = router
