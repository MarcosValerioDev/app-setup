const express = require('express');
const router = express.Router();
const UserController = require('../controlers/userController');
const RecoverPasswordController = require('../controlers/recoverPassword');
const UserAdminController = require("../controlers/userAdminController");

router.post('/createUser', UserController.createuser);
router.post('/signin', UserController.signin);
router.post('/checkHash', RecoverPasswordController.checkHash);
router.post('/alterPassword', UserController.alterPassword);

router.post('/adminSignin', UserAdminController.signinAdimin);
router.post('/changePasswordAdmin', UserAdminController.changePassword);
router.post('/createAdmin', UserAdminController.createUserAdmin);

module.exports = router; 