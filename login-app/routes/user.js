const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')

//load model
require('../models/users')
const User = mongoose.model('users')

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.get('/register', (req, res) => {
    res.render('users/register')
})

//login
router.post('/login', (req, res, next) => {
    
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

//register post
router.post('/register', (req, res) => {
    let errors = []

    if (req.body.password != req.body.password2) {
        errors.push({
            text: 'Passwords does not match'
        })
    }
    if (req.body.password.length < 4) {
        errors.push({
            text: 'passwords must be 4 charecters long'
        })
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
    } else {

        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    req.flash('error_msg', `email already is there boy`)
                    res.redirect('/users/register')
                } else {
                    const newUser = new User({
                        email: req.body.email,
                        password: req.body.password
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            let name = req.body.email
                            newUser.save()
                                .then(user => {
                                    console.log(`you have registered as ${name}`)
                                    req.flash('success_msg', `you have registered as ${name}`)
                                    res.redirect('/users/login')
                                })
                                .catch(err => {
                                    req.flash('error_msg', `you messed up your registration`)
                                    console.log(err)
                                })
                        })
                    })

                }
            })

    }
})

router.get('/logout', (req,res) => {
    req.logOut()
    req.flash('success_msg', 'you have logged out')
    res.redirect('/users/login')
})





router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
})

router.post('/', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router