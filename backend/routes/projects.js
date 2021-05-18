/*
*
* PROJECTS WILL BE HANDLED HERE - ALL CRUD OPERATIONS DONE AND MUST BE USED
*
* TO BE TESTED (IMAGES :/)
* */

/*Variables*/
const router = require('express').Router();
const Project = require('../models/project');

//GET ALL PROJECTS
router.route('/').get((req, res) =>{
   Project.find()
       .then(projects => res.json(projects))
       .catch(err => res.status(400).json('Error - The projects could not be fetched: ' + err));
});

//ADD A PROJECT
router.route('/add')
    .post((req, res) =>{

    const newProject = {
       projectName: req.body.projectName,
       description :req.body.description,
       type: req.body.type,
       projectMediaId:  req.body.projectMediaId,
       projectMedia: req.body.projectMedia
   }

   Project.create(newProject, (err, data) =>{
       if(err){
           res.status(500).send("Error - The project could not be added: " + err);
       }else{
           res.status(201).send(data);
       }
   });
});

//FIND SINGLE PROJECT BY ID
router.route('/fetchProject/:id').get((req, res) =>{
    Project.findById(req.params.id)
        .then(projects => res.json(projects))
        .catch(err => res.status(500).json('Error - The project could not be reached: ' +err));
});

//UPDATE PROJECT
router.route('/update/:id').post((req, res) =>{
    Project.findById(req.params.id)
        .then(project => {
            project.projectName = req.body.projectName;
            project.description = req.body.description;
            project.type = req.body.type;
            project.projectMediaId = req.body.projectMediaId;
            project.projectMedia = req.body.projectMedia;

            project.save()
                .then(() => res.status(201).send('The project was successfully updated!'))
                .catch(err => res.status(500).json('Error - The project could not be updated: ' +err));
        }).catch(err => res.status(500).json('Error - No project was found under this ID: ' +err));
});

//DELETE PROJECT
router.route('/:id').delete((req, res) =>{
    Project.findByIdAndRemove(req.params.id)
        .then(() => res.json("The project was successfully deleted!"))
        .catch(err => res.status(500).json('Error - The project could not be deleted: ' +err));
});

module.exports = router;
