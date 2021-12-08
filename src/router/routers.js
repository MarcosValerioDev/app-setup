const express = require('express');
const router = express.Router();
const UserController = require('../controlers/userController');
const UserAdminController = require("../controlers/userAdminController");

router.post('/createUser', UserController.createuser);
router.post('/signin', UserController.signin);
router.post('/alterPassword', UserController.alterPassword);
router.post('/delete', UserController.deleteUser);
router.post('/getUsers', UserController.getUsers);
router.post('/updateTime', UserController.updateTime);

router.post('/adminSignin', UserAdminController.signinAdimin);
router.post('/changePasswordAdmin', UserAdminController.changePassword);
router.post('/createAdmin', UserAdminController.createUserAdmin);

module.exports = router; 