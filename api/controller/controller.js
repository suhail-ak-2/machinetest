const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config');
const _ = require('lodash');
const { User, validate2 } = require('../model/user');
const express = require('express');
var nodemailer = require('nodemailer'); 



exports.usercreate = async ( req, res) => {
 console.log(req.body);
    const { error } = validate2(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }
 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        user = new User(_.pick(req.body, ['username', 'email', 'password', 'phone']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id }, "helloo");
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
    }

    nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
            user: 'testbysuhail@gmail.com', //Gmail username
            pass: 'Open@1234' // Gmail password
        }
    });
 
    let mailOptions = {
        from: '"Suhail" <testbysuhail@gmail.com>',
        to: req.body.email, // Recepient email address. Multiple emails can send separated by commas
        subject: "Welcome",
        text: "Welcome, You are successfully registered to use the service."
    };
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
});
};



 getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length ===2) {
            return parted[1];

        }else {
            return null;
        }
        }else {
            return null;
        }
    };

exports.userlogin =  async (req, res) => {
const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
 

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const token = jwt.sign({ _id: user._id }, "helloo");

    res.send({token});
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'password']));
};
 
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
 
    return Joi.validate(req, schema);
 
}


exports.allusers = (req, res) => {
    var token = getToken(req.headers);
 if (token) {
    var decoded = jwt.decode(token, 'helloo');
 }
    
     var pageNo = parseInt(req.body.pageNo)
  var size = parseInt(req.body.size)
  var body = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  body.skip = size * (pageNo - 1)
  body.limit = size

  User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving regs."
        });
    });
};






// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "not found with id " + req.params.userId
            });
        }
        res.send({message: "deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete with id " + req.params.userId
        });
    });

};
