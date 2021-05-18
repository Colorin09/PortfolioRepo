const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Image upload
app.use('/uploads', express.static('uploads'));

const uri = process.env.ATLAS_URI;
try{
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true,
        dbName: "PortfolioCluster"});

}catch(err){
    console.error("ERROR - we couldn't connect to the server: " + err );
}

//Setting up GridFsStorage
let gfsBucket;

const connection = mongoose.connection;
connection.once('open', ()=>{
    gfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
       bucketName: "uploads"
    });
    console.log("MongoDB database connection established successfully");
});

//-----------------------------------
/*ROUTES CONCERNING FILE STORAGE - The PROJECT CRUD*/
const storage = new GridFsStorage({
    url:uri,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology:true
    },
    file: (req, file) => {
        return new Promise((resolve, reject) =>{
            crypto.randomBytes(16, (err, buf) =>{
                if(err){
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName:"uploads",
                };
                resolve(fileInfo);
            })
        })
    }
});

const upload = multer({ storage });

//-----------------------------------
/*Defining routes for images*/

//GET ALL STORED FILES
app.get("/storedImages", (req, res) => {
    gfsBucket.find().toArray((err, files) => {
        if (!files || files.length === 0 || err) {
            return res.status(200).json({
                err: "Error - No files were found",
            });
        }
        res.status(200).json({
            filesInfo: files,
        });
    });
});

//GET A SINGLE IMAGE
app.get("/storedImages/:filename", (req, res) => {
    gfsBucket.find({filename: req.params.filename}).toArray((err, files) => {
        if (err) {
            return res.status(500).json({
                err: "Error - The image could not be retrieved: " + err,
            });
        }
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "No corresponding file was found.",
            });
        }

        files.map((file) => {
            const readStream = gfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        });
    });
});

//POST NEW IMAGE
app.post("/storedImages/addImage", upload.single("imgUpload"), (req, res, next) => {
    res.status(200).send({ data: req.file});
});

//DELETE AN IMAGE
app.delete("/storedImages/delete/:deleteID", (req, res, next) => {
    const objectID = mongoose.Types.ObjectId(req.params.deleteID);
    gfsBucket.delete(objectID, (err, result) => {
        if (err) {
            return res.status(500).json({
                err: "Error - The image could not be deleted!",
            });
        }
        res.status(200).json({
            success: "The image was successfully deleted!",
        });
    });
});

/*DEFINING ROUTES*/
const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
const pagesRouter = require('./routes/pages');

app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use('/pages', pagesRouter);

/*VERIFYING PORT ACCESS*/
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
});
