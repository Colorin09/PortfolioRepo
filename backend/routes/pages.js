/*
*
* PAGES CONTENT ROUTES - USED TO MANAGE CONTENT SAVED ON EACH PAGE OF THE WEBSITE
* THE GOAL IS TO LET THE ADMIN UPDATE THE CONTENT. PAGES CAN BE ASSIGNED A SAME COMPONENT FOR DISPLAY IN REACT.JS
*
* */

/*Variables*/
const router = require('express').Router();
let Page = require('../models/page');

//GET ALL PAGES
router.route('/').get((req, res) => {
   Page.find()
       .then(pages => res.json(pages))
       .catch(err => res.status(500).send('Error, the pages could not be fetched: ' + err));
});

//GET A PAGE BY ID
router.route('/searchCode/:id').get((req,res) =>{
   //Using parameter
    let pageCode = req.params.id;

    Page.findById(pageCode)
        .then(pages => res.json(pages))
        .catch(err => res.status(500).send('Error, something happened while retrieving the page: ' + err ));
});

//ADD A NEW PAGE
router.route('/add').post((req, res) => {

    const newPage = req.body;

    //Creating new object
    Page.create(newPage, (err, data) =>{
        if(err){
            res.status(500).send("Failure. The new page could not be added: " + err);
        }
        else{
            res.status(201).send("New page added successfully!");
        }
    });
});

//UPDATE AN EXISTING PAGE - ADMIN MODE
router.route('/update/:id').post((req, res) => {
    let pageCode = req.params.id;

    Page.findById(pageCode, (err, data) =>{
        if(!data) { //page not found
            res.status(404).send("The page to update was not retrieved adequately: " + err);
        }
        else{
            data.pageTitle = req.body.pageTitle;
            data.pageSubTitle = req.body.pageSubTitle;
            data.content = req.body.content;

            data.save().then(() => {
                res.json("The page was successfully updated!");
            }).catch(err => {
               res.status(500).send("Error, something happened while updating the page: " + err);
            });
        }
    });
});

//DELETE A PAGE _ FOR DEVELOPMENT PURPOSES
router.route('/:id').delete((req, res) =>{
    Page.findByIdAndRemove(req.params.id)
        .then(() => res.json("Page deleted"))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;
