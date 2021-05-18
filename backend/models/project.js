const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: {
        type:String,
        required:true,
        minlength: [2, "Please enter more text!"],
        maxlength: 30
    },
    description: {
        type: String,
        required:true,
        minlength: 10
    },
    type:{
        type: String,
        required: [true, "Please enter the project type"]
    },
    projectMediaId:{
        type:String
    },
    projectMedia:{
        type: String
    },
}, {
    timestamps:true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

/*For a project -> comes with a title, text and an image*/
