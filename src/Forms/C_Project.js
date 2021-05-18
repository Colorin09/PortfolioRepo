import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import {Formik, Form} from "formik";
import {CustomTextInput, CustomTextArea, CustomSelectInput} from "./FormComponents/CustomFormInputs";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import ReturnButton from "../subComponents/ReturnButton";
import axios from "axios";
import C_Image from "./C_Image";
import * as AiIcons from "react-icons/ai";

class C_Project extends Component{

    constructor(props) {
        super(props);
        this.state = {
            hasSubmitted: false,
            allowFormChanges: true,
            showImageForm: false,
            projectToChange: ''
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.showImageInput = this.showImageInput.bind(this);
        this.resetState = this.resetState.bind(this);
        this.baseState = this.state;
    }

    resetState = () => {
        this.setState(this.baseState);
    }

    submitHandler = () =>{
        const {hasSubmitted} = this.state;
        this.setState({hasSubmitted: !hasSubmitted});
    }

    formChangeHandler = () =>{
        const {allowFormChanges} = this.state;
        this.setState({allowFormChanges: !allowFormChanges});
    }

    showImageInput = () =>{
        const {showImageForm} = this.state;
        this.setState({showImageForm: !showImageForm});
    }

    //Is the user logged in?
    componentDidMount() {
        let isLogged = JSON.parse(localStorage.getItem("authTokenX4E"));

        if(!isLogged){
            this.props.history.push("/home");
        }
    }

    //Toast messages
    successToast = (content) => {
        toast.success(content, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    errorToast = (content) =>{
        toast.error(content, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    render() {

        //Variables used during the form submission
        let {hasSubmitted, allowFormChanges, showImageForm, projectToChange} = this.state;

        return(
            <main className={"container col-lg-5 col-md-8 col-sm-8"}>
                <BlackBox>
                    <Formik
                        enableReinitialize={true}

                        initialValues={{
                            projectName: '',
                            projectDescription: '',
                            projectType: 'school'
                        }}

                        validationSchema={Yup.object({
                            projectName: Yup.string()
                                .required("Please enter a name!")
                                .min(2, "Please enter more text!")
                                .max(30, "Maximum of 30 characters"),
                            projectDescription: Yup.string()
                                .required("Please enter a description")
                                .min(10, "Please enter more text!"),
                            projectType: Yup.string()
                                .required("Please choose a project type")
                        })}

                        //Avoiding validation on change and blur
                        validateOnChange={false}
                        validateOnBlur={false}

                        onSubmit = {(values, {setSubmitting})=>{
                            axios.post("http://localhost:5000/projects/add", {
                                projectName: values.projectName,
                                description: values.projectDescription,
                                type: values.projectType,
                                projectMediaId: "",
                                projectMedia: ""
                            }).then(response =>{
                                this.successToast("The project was successfully created!");

                                //Sending info to add the image
                                this.setState({projectToChange: {
                                    _id: response.data._id,
                                        description: response.data.description,
                                        projectName: response.data.projectName,
                                        projectMediaId: response.data.projectMediaId,
                                        projectMedia: response.data.projectMedia,
                                        type: response.data.type
                                    }});

                                this.formChangeHandler();
                                this.submitHandler();
                                setSubmitting(false);
                            }).catch(error =>{
                                let message = "";

                                if(error.response){
                                    message = error.response.data;
                                }
                                else{
                                    message = "Error - We could not receive an appropriate response from our server. Please" +
                                        " review your Internet connection or try again later.";
                                }
                                setSubmitting(false);
                                this.errorToast(message);
                            });
                        }}>

                        {({isValidating, isSubmitting}) => (
                            <>
                                <h2 className={"mb-4"}>Insert a new project</h2>
                                <Form noValidate={true} className={"col-11 m-auto"}>
                                    <fieldset disabled={isSubmitting || isValidating || !allowFormChanges}>

                                        <input type={"reset"} value={"Clear Form"}
                                               className={"btn btn-sm text-uppercase reset-btn float-right ml-auto mr-auto m-2"}
                                            style={{fontSize:"0.6em"}}/>

                                        <CustomTextInput id={"projectName"} name={"projectName"} label={"Project Name"}/>
                                        <CustomSelectInput id={"projectType"} name={"projectType"} label={"Project Type"}>
                                            <option value={"school"}>School project</option>
                                            <option value={"work"}>Work project</option>
                                        </CustomSelectInput>
                                        <CustomTextArea id={"projectDescription"} name={"projectDescription"} label={"Project Description"}
                                                        cols={"50"} rows={"10"} />

                                        <input type={"submit"} className={"btn btn-block col-11 text-uppercase main-button ml-auto mr-auto mt-3"}
                                               value={"Add new Project"}/>
                                    </fieldset>

                                    {hasSubmitted && (
                                        <div>
                                            <hr/>
                                            <input type={"reset"} value={"Enter another project"}
                                                   className={"btn btn-block col-10 text-uppercase reset-btn ml-auto mr-auto mt-3"}
                                                   onClick={() => { this.submitHandler(); this.formChangeHandler();}}/>
                                            <button onClick={() => {this.submitHandler(); this.showImageInput();}}
                                                    className={"btn btn-block col-10 text-uppercase main-button ml-auto mr-auto mt-1"}>
                                                Add an image under this project
                                            </button>

                                            <div className={"info-div mt-3"}>
                                                <div className={"mr-2 float-left"}>
                                                    <AiIcons.AiFillInfoCircle color={"#fff"}/>
                                                </div>
                                                Warning! This project has no current image assigned to it. Add an image now or
                                                after by updating the project.
                                            </div>
                                        </div>
                                    )}
                                </Form>
                            </>
                        )}
                    </Formik>
                    {showImageForm && (
                        <>
                            <C_Image projObj={projectToChange}/>
                            <hr/>
                            <button className={"btn btn-sm btn-block col-9 text-uppercase reset-btn ml-auto mr-auto mt-1"}
                                onClick={() =>{
                                    this.resetState();
                                }}>
                                Enter another project
                            </button>
                        </>
                    )}
                </BlackBox>

                <div className={"container ml-2"}>
                    <ReturnButton/>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </main>
    )};
}
export default C_Project;
