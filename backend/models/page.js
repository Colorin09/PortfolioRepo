const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    pagetitle: {
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
    official_name: {
        type: String,
        minlength: 3,
        maxlength: 10,
        required: true,
        trim: true
    },
    pageCode: {
        type: String,
        length: 3,
        required: true,
        trim: true,
        unique: true
    },
    pageContent: {
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
