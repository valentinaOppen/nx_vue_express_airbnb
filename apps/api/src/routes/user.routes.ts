import { Router } from "express";

const express = require('express');

// const authController = require('../controllers/auth');
// const authController = require('../app/controllers/user.controller');
const userController = require('../app/controllers/user.controller');

const router:Router = express.Router();

router.post('/add-user', userController.postAddUser);

// router.get('/login', authController.getLogin);

// router.get('/signup', authController.getSignup);

// router.post('/login', authController.postLogin);

// router.post('/signup', authController.postSignup);

// router.post('/logout', authController.postLogout);

// router.get('/reset', authController.getReset);

// router.post('/reset', authController.postReset);

module.exports = router;