const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    pageTitle: {
        type:String,
        required:true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    pageSubTitle: {
        type: String,
        maxlength: 40,
        trim: true
    },
    officialName: {
        type: String,
        minlength: 3,
        maxlength: 10,
        required: true,
        trim: true
    },
    content: {
        type: String,
        minlength: 30,
        required: true
    }
}, {
    timestamps: true
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;

/*Page: Title, subtitle and content - Images will be hard-coded*/
