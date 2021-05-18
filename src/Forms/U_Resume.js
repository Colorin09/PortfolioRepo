import React, {Component} from "react";
import {Formik, Form} from "formik";
import {CustomInputFile} from "./FormComponents/CustomFormInputs";

class U_Resume extends Component{
    constructor(props) {
        super(props)
        this.state = {
            error_mes:'',
            resumeObj:{},
            filename:'Please select a file...',
            showContent:false
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDisplay = this.onDisplay.bind(this);
    }

    onDisplay = () => {
        const currentShow = this.state.showContent;
        this.setState({showContent: !currentShow});
    }

    onFileChange = (e) =>{
        this.setState({inputFile:e});
    }

    onSubmit = (e) =>{
        e.preventDefault();
    }

    render() {
        let {error_mes, filename, showContent} = this.state;

        return(
            <div>
                <button className={"btn col-11 text-uppercase main-button ml-auto mr-auto mt-5"}
                onClick={() => this.onDisplay()}>
                    {showContent ?
                        "Hide resume addition": "Add a new resume"}
                </button>

                {showContent &&
                    <form noValidate={true} onSubmit={this.onSubmit} className={"mt-3 ml-auto mr-auto"}>

                        <label>Upload a new Resume</label><span className={"mess-error"}>{error_mes ? " - " + error_mes :null}</span>

                        <input type={"file"} id={'inputFile'} name={'inputFile'} className={"form-control"}
                               onChange={(e) => this.onFileChange(e.target.files[0])}/>

                        <div className={"col-12 custom-file-holder"}>
                            <label className={"custom-file-upload"}>Upload</label>

                            <p style={{float:"right", margin:"7px 40px 5px 5px"}}>{filename ? filename : "Please select a file..."}</p>
                        </div>
                        <input type={"submit"} value={"Submit"} className={"btn btn-block col-11 text-uppercase main-button mt-1 ml-auto mr-auto"}/>
                    </form>
                }
            </div>
        );
    }
}
export default U_Resume;
