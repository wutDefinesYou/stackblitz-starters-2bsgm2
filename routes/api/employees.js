const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  removeEmployee,
  getEmployee,
} = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get((req, res) => {
    res.json(getAllEmployees());
  })
  .post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), (req, res) => {
    if (!req.body.firstname || !req.body.lastname)
      res.status(400).json({ message: 'First and last names are required.' });
    else {
      createNewEmployee(req.body);
      res.status(204).send();
    }
  });

router
  .route('/:id')
  .get((req, res) => {
    if (!req.params.id)
      res.status(400).json({ message: `Employee ID missing` });
    else
      res.json(
        getEmployee(parseInt(req.params.id)) ?? {
          message: `Employee ID ${req.params.id} not found`,
        }
      );
  })
  .put((req, res) => {
    if (!req.params.id)
      res.status(400).json({ message: `Employee ID missing` });
    else {
      updateEmployee(parseInt(req.params.id), req.body);
      res.status(204).send();
    }
  })
  .delete((req, res) => {
    if (!req.params.id)
      res.status(400).json({ message: `Employee ID missing` });
    else {
      removeEmployee(parseInt(req.params.id));
      res.json({ id: parseInt(req.params.id) });
    }
  });

module.exports = router;
