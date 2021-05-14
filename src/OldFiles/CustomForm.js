import React, {Component} from 'react';
import './css/forms.css';
import axios from "axios";

import {Formik, Form} from "formik";
import  * as Yup from 'yup';

/*const formValidation = Yup.object().shape({
    projectName: Yup.string()
        .required("Please enter a name")
        .min(3, "Too short for a name?"),
    projectDescription: Yup.string()
        .required("Please enter a description"),
    inputFile: Yup.mixed()
        .required("Please enter a related image or gif")
        .test("fileFormat", "Unsupported Format",
            value => value && !SUPPORTED_FORMATS.includes(value.type))
});*/

const SUPPORTED_FORMATS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif"
];



export default class CustomForm extends Component{

    constructor(props){
        super(props);
        this.state ={
            projectName:'',
            description:'',
            inputFile:''
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        /*const {inputFile} = this.state;

        let mediaObject = new FormData();
        mediaObject.append("projectMediaName", "multer-image-" + Date.now());
        mediaObject.append("projectMediaData", inputFile)
        const config = {headers: {
                'content-type' : 'multipart/form-data'
            }};
        */



        axios.post('http://localhost:5000/projects/add', {
            projectName: this.state.projectName,
            description: this.state.description,
            projectMedia:{
                data: this.state.inputFile.name,
                contentType: this.state.inputFile.type
            }
        })
            .then(res => console.log(res.data))
            .catch((error)=>{
                console.log("Form was not submitted right", error);
            });
    }

    onNameChange = (e) =>{
        this.setState({projectName:e.target.value});
    }

    onDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    }

    onFileChange = (e) =>{
        this.setState({inputFile:e});
    }

    render(){
        return(
            <div>
                <form noValidate={true} onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" id="projectName" name="projectName" className="form-control"
                               placeholder="Project Name..." onChange={(e) => this.onNameChange(e)}/>
                    </div>
                    <div className={"form-group"}>
                        <textarea id={"description"} name={"description"} className={"form-control"}
                                  placeholder={"Description..."} onChange={(e) => this.onDescriptionChange(e)}/>
                    </div>
                    <div className="form-group">
                        <input type={"file"} id={'inputFile'} name={'inputFile'} className={"form-control"}
                        onChange={(e) => this.onFileChange(e.target.files[0])}/>
                    </div>
                    <input type="submit" value={"Submit"}
                           className="btn text-uppercase templatemo-btn templatemo-send-btn"/>
                </form>
            </div>
        );
    }
}

/*
* <input id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }} className="form-control" />*/

/*

<Formik

    enableReinitialize={true}

    initialValues={{
        projectName:'',
        description:'',
        inputFile:''
    }}

    //validationSchema={formValidation}

    validateOnChange={false}
    validateOnBlur={false}

    onSubmit={(values) =>{
        console.log("SUBMISSION COMPLETED");
        console.log(values.inputFile.type);
        console.log(values);

        /!*let mediaObject = new FormData();
        mediaObject.append("projectMediaName", "multer-image-" + Date.now());
        mediaObject.append("projectMediaData", values.inputFile);

        values.push(mediaObject);*!/

        const config = {headers: {
                'content-type' : 'multiplart/form-data'
            }};

        axios.post('http://localhost:5000/users/add', values, config)
            .then(res => console.log(res.data))
            .catch((error)=>{
                console.log("Form was not submitted right", error);
            });
    }}>

    {(formik,{setFieldValue, errors}) => (
        <Form noValidate={true}>
            <div className="form-group">
                <input type="text" id="projectName" name="projectName" className="form-control"
                       placeholder="Project Name..." onChange={formik.handleChange}/>
                <p>{errors.projectName ? errors.projectName: ''}</p>
            </div>
            <div className={"form-group"}>
                        <textarea id={"description"} name={"description"} className={"form-control"}
                                  placeholder={"Description..."}/>
                <p>{errors.description ? errors.description: ''}</p>
            </div>
            <div className="form-group">
                <input type={"file"} id={'inputFile'} name={'inputFile'} className={"form-control"} onChange={(e) =>{
                    setFieldValue('inputFile', e.target.files[0]);
                }}/>
                <p>{errors.inputFile ? errors.inputFile: ''}</p>
            </div>
            <input type="submit" value={"Submit"}
                   className="btn text-uppercase templatemo-btn templatemo-send-btn"/>
        </Form>
    )}
</Formik>
*/


