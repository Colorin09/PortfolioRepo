/*
* ROUTES FOR CRUD OPERATIONS FOR USERS
* */

const router = require('express').Router();
let User = require('../models/user');

//FIND ALL CURRENT USERS
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).send('Error: Could not fetch the users from the backend. ' + err));
});

//GET SINGLE USER
router.route('/fetch/:id').get((req, res) =>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).send("An error happened while searching the user: " + err));
});

//GET USER BY EMAIL
router.route('/getUser').post((req, res) =>{
    User.find({}, (err, data) =>{
        if(data){
            const filterData = data.filter((user) => user.email === req.body.email);

            if(filterData.length > 0){
                User.findById(filterData[0].id)
                    .then(user =>{
                        if(req.body.password === user.password)
                            res.status(201).json({
                                "message" : "You logged in successfully!",
                                "name":filterData[0].firstName + " " + filterData[0].lastName,
                                "userId" : filterData[0]._id
                            });
                        else{
                            res.status(500).send("Login failed. Please verify your password and try again.");
                        }
                    }).catch(error =>{
                    res.status(500).send("bla - 500 - Sorry, an error happened with the server." + error + " Try again later.");
                });

            }
            else{
                res.status(500).send("No user was found under this email. Please try again or contact me here: ");
            }
        }
        else{
            res.status(500).send("500 - Sorry, an error happened with the server. Try again later.");
        }
    })
});

//CREATE NEW USER
router.route('/add').post((req, res) =>{

    User.find({}, (err, data) => {
        if(data) {
            const filterData = data.filter((user) => user.email === req.body.email);

            if(filterData.length > 0){
                res.status(500).json("Sorry, the email is already in use, try another one!");
            }else{
                const newUser = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                };

                User.create(newUser, (err, data) =>{
                    if(err){
                        res.status(500).send("An error happened during the addition of the new user: " + err);
                    }
                    else{
                        res.status(201).send("New user successfully added!");
                    }
                });
            }
        }
        else if(err){
            res.status(500).send("An error happened during the addition of the new user: " + err);
        }
    });
});

//DELETE USER
router.route('/:id').delete((req, res) =>{
   User.findByIdAndRemove(req.params.id)
        .then(() => res.json("The user was successfully deleted!"))
        .catch(err => res.status(500).json('Error, we could not delete the user: ' +err));
});

module.exports = router;
