const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
let User = require('../modals/user.model');

router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);
        }
    })
});
router.post('/new', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // console.log(`your new salt is ${salt}`);
        // console.log(hashedPassword);
        let user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        user.save((err, registeredUser) => {
            if (!err) {
                // res.status(200).send(docs);
                let payload = {
                    subject: registeredUser._id,
                    user: {
                        username: user.username,
                        password: user.password
                    }
                };
                let token = jwt.sign(payload, 'secretKey');
                // const pass = salt + hashedPassword;
                res.status(200).send({
                    token
                });
            } else {
                res.status(409).send('User Already Exist!');
                console.log('Error in retriving user:' + JSON.stringify(err, undefined, 2));
            }
        })
    } catch {
        res.status(500).send('User Information not valid!');
    }
});

router.post('/login', async(req,res) => {
    let user = new User({
        username:req.body.username,
        password:req.body.password
    });
    User.findOne({
        username:user.username
        },(err, userData) =>{
            if(err){
                console.log(err)
            }else{
                if(!userData){
                    res.status(400).send('User does not exist ! or'+'Check your admin!');
                }else{
                    try{
                        bcrypt.compare(user.password, userData.password, function(err, doc){
                            if(doc === true){
                                let payload = {
                                    subject:userData._id,
                                    user:{
                                        username:user.username,
                                        password:userData.password,
                                    }
                                };
                                let token = jwt.sign(payload,'secretKey'); 
                                const pass = userData.password;
                                res.status(200).send({
                                    token
                                });                               
                            }else{
                                res.status(400).send('Password not matched'+doc)
                            }
                        });

                    }catch{
                        res.status(500).send('User information not valid');
                    }
                }
            }
        }
    )
});
module.exports = router;