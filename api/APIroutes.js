const express = require('express');
const router = express.Router();
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const expressJwt = require('express-jwt');
const appController = require('./controller/controller');

router.post('/Reg', appController.usercreate);
router.post('/Login', appController.userlogin);
router.get('/Login', appController.allusers);
router.delete('/:userId', appController.delete);

module.exports = router;