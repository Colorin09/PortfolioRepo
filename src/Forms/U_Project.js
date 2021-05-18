import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {CustomSelectInput, CustomTextArea, CustomTextInput} from "./FormComponents/CustomFormInputs";
import ReturnButton from "../subComponents/ReturnButton";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import * as AiIcons from "react-icons/ai";
import U_Image from "./U_Image";

class U_Project extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                updateProjName:'',
                updateProjDesc:'',
                selectedProject:'',
                newProjType:'',
                newProjImg:'',
                newProjImgId:''
            },
            projectList:[],
            isLoading: true,
            notFound: false,
            refresh:false
        }
        this.displayChosenProject = this.displayChosenProject.bind(this);
    }

    componentDidMount() {
        //is the user authenticated?
        let isLogged = JSON.parse(localStorage.getItem("authTokenX4E"));
        if(!isLogged){
            this.props.history.push("/home");
        }

        //fetch all reports
        this.getAllProjects();
    }

    getAllProjects = () =>{
        //Initial call to get all the projects
        axios.get("http://localhost:5000/projects")
            .then(response => {
                this.setState({projectList:response.data}, () =>{
                    if(response.data.length !==0)
                        this.displayChosenProject(response.data[0]._id);
                        this.setState({refresh: true});
                });
            }).catch(error =>{
            let message = "";
            if(error.response){
                message = error.response.data;
            }
            else{
                message = "Error - We could not receive an appropriate response from our server. Please" +
                    " review your Internet connection or try again later.";
            }
            this.errorToast(message);
        });
    }

    displayChosenProject = (selectedId) =>{
        const {projectList, fields} = this.state;
        const result = projectList.filter((project) => project._id === selectedId);

        if(result[0]){
            fields.selectedProject = result[0]._id;
            fields.updateProjName = result[0].projectName;
            fields.updateProjDesc = result[0].description;
            fields.newProjType = result[0].type;
            fields.newProjImg = result[0].projectMedia;
            fields.newProjImgId = result[0].projectMediaId;

            //set new object
            this.setState({fields}, ()=>{
                this.setState({isLoading:false});
            });
        }
        else{
            this.setState({notFound:true});
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

    render(){

        let {isLoading, projectList, notFound, refresh, fields} = this.state;

        return(
            <Formik
                enableReinitialize={true}
                initialValues={this.state.fields}

                validateOnChange={false}
                validateOnBlur={false}

                validationSchema={Yup.object({
                    updateProjName: Yup.string()
                        .required("Please enter a name!")
                        .min(2, "Please enter more text!")
                        .max(30, "Maximum of 30 characters"),
                    updateProjDesc: Yup.string()
                        .required("Please enter a description")
                        .min(10, "Please enter more text!"),
                    newProjType: Yup.string()
                        .required("Please choose a project type")
                })}

                onSubmit={(values, {setSubmitting, resetForm}) =>{
                    let {fields} = this.state;

                    axios.post(`http://localhost:5000/projects/update/${values.selectedProject}`, {
                        projectName: values.updateProjName,
                        description: values.updateProjDesc,
                        type: values.newProjType,
                        projectMedia: fields.newProjImg,
                        projectMediaId: fields.newProjImgId
                    }).then(response => {
                        this.successToast(response.data);
                        this.getAllProjects();
                    }).catch((error) =>{
                        let message = "";
                        if(error.response){
                            message = error.response.data;
                        }
                        else{
                            message = "Error - We could not receive an appropriate response from our server. Please" +
                                " review your Internet connection or try again later.";
                        }
                        this.errorToast(message);
                    });
                    setSubmitting(false);
                    resetForm();
                    this.displayChosenProject(values.selectedProject);
                }}>

                {({isSubmitting, isValidating, setFieldValue, values})=> (

                    <main className={"col-lg-6 col-md-10 col-sm-10 m-auto"}>
                        <BlackBox style={{width:"130%"}}>
                            <h2>Update a project details</h2>
                            <p>Update a project's content and picture in this menu.</p>
                            <hr/>

                            {notFound || projectList.length === 0 && (
                                <div className={"info-div"}>
                                    <div className={"mr-2 float-left"}>
                                        <AiIcons.AiFillInfoCircle color={"#fff"}/>
                                    </div>
                                    No projects were currently found. Add new ones&nbsp;
                                    <a href={"http://localhost:3000/add_project"} style={{color: "white", textDecoration:"underline"}}>
                                        in this page!
                                    </a>
                                </div>
                            )}

                            <div className={"row"}>
                                <div className={"col-6"}>
                                    <Form noValidate={true}>
                                        <fieldset disabled={isSubmitting || isValidating|| isLoading}>
                                            <CustomSelectInput id={"selectedProject"} name={"selectedProject"} label={"Project chosen"}
                                                               onChange={(e)=>{
                                                                   this.displayChosenProject(e.target.value);
                                                                   setFieldValue("selectedProject", e.target.value);
                                                               }}>
                                                {projectList.map((project, index) =>{
                                                    return <option key={index} value={project._id}>{project.projectName}</option>
                                                })}
                                            </CustomSelectInput>

                                            <CustomTextInput id={"updateProjName"} name={"updateProjName"} label={"New Project Name"}/>
                                            <CustomSelectInput id={"newProjType"} name={"newProjType"} label={"Project Type"}>
                                                <option value={"work"}>Work project</option>
                                                <option value={"school"}>School project</option>
                                            </CustomSelectInput>
                                            <CustomTextArea id={"updateProjDesc"} name={"updateProjDesc"} label={"New Project Description"}
                                                            rows={10} cols={40}/>
                                            <input type={"submit"} value={"Update Project"}
                                                   className={"btn btn-block col-10 text-uppercase main-button ml-auto mr-auto mt-2"}/>
                                            <input type={"reset"} value={"Reset form"}
                                                   className={"btn btn-block col-9 text-uppercase reset-btn ml-auto mr-auto mt-2"}
                                                   onClick={() =>{
                                                       this.displayChosenProject(values.selectedProject);
                                                   }}/>
                                        </fieldset>
                                    </Form>
                                </div>

                                {refresh && !isLoading ?
                                    <div className={"col-6"}>
                                        <U_Image currentImg={values.newProjImg}
                                                 shouldDisable={isLoading || isSubmitting || isValidating}
                                                currentProj={fields}/>
                                    </div> : <></>}
                            </div>
                        </BlackBox>

                        <div className={"container ml-3"}>
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
                )}
            </Formik>
        );
    }
}
export default U_Project;
