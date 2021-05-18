import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import {Formik, Form} from "formik";
import {CustomSelectInput} from "./FormComponents/CustomFormInputs";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnButton from "../subComponents/ReturnButton";

class D_User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            admins:[],
            chosen_admin:{},
            error_mes:"",
            singleAdmin : {
                email:' --- ',
                name:' --- ',
                creationDate:' --- '
            }
        }
        this.getSingleAdmin = this.getSingleAdmin.bind(this);
        this.errorToast = this.errorToast.bind(this);
        this.successToast = this.successToast.bind(this);
    }

    componentDidMount() {
        let isLogged = JSON.parse(localStorage.getItem("authTokenX4E"));
        if(isLogged){
            this.fetchCurrentAdmins();
        }
        else{
            this.props.history.push("/home");
        }
    }

    fetchCurrentAdmins = () => {
        axios.get("http://localhost:5000/users")
            .then((response) =>{
                let currentUser = localStorage.getItem("userId");
                const result = response.data.filter((user) => user._id !== currentUser);

                this.setState({admins:result}, () => {
                    this.getSingleAdmin(result[0]._id);
                });
            })
            .catch((error) =>{
                let message = "";
                if(error.response){
                    message = error.response.data;
                }else{
                    message = "Error - We could not receive an appropriate response from our server. Please" +
                        " review your Internet connection or try again later.";
                }
                this.errorToast(message);
            });
    }

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

    //display the admin to the user
    getSingleAdmin = (num) =>{
        let {admins, singleAdmin} = this.state;
        const foundAdmin = admins.filter((admin) => admin._id === num);
        const info = foundAdmin[0];

        if(foundAdmin.length > 0){
            singleAdmin = {
                email: info.email,
                name: info.firstName + " " + info.lastName,
                creationDate: info.createdAt
            };
            this.setState({singleAdmin});
        }
        else{
            singleAdmin = {
                email:'Not found',
                    name:' --- ',
                    creationDate:' --- '
            };
            this.setState({singleAdmin});
        }
    };

    render(){

        let {admins, singleAdmin} = this.state;
        return(
           <Formik
               enableReinitialize={true}
               initialValues={{
                   userName:''
               }}

               validateOnChange={false}
               validateOnBlur={false}

               onSubmit={(values, {setSubmitting}) =>{

                   if(window.confirm("Are you sure you want to delete this user?")){
                       axios.delete("http://localhost:5000/users/" + values.userName)
                           .then((response) => {
                               this.successToast(response.data);
                               setSubmitting(false);
                               this.fetchCurrentAdmins();

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
                           setSubmitting(false);
                       });
                   }
                   setSubmitting(false);
               }}>

               {({isSubmitting, isValidating, setFieldValue})=>(
                   <div className={"col-lg-4 col-md-8 col-sm-8 m-auto"}>
                       <BlackBox>
                           {admins.length < 1 &&
                           <div className={"container col-10 alert-yellow"}>
                               <p style={{color:"white"}}>No registered administrators were found at the moment. Please try again later.</p>
                           </div>}

                           <Form noValidate={true} style={{margin:"40px"}}>
                               <h2 className={"mb-4 text-center"}>View and delete the admins</h2>
                               <hr/>
                               <fieldset disabled={isValidating || isSubmitting}>
                                   <div className={"row"}>
                                       <div className={"col-6 mt-5"}>
                                           <CustomSelectInput id={"userName"} name={"userName"} label={"User Name"}
                                                              disabled={admins.length < 1} onChange={(e) =>{
                                               this.getSingleAdmin(e.target.value);
                                               setFieldValue("userName", e.target.value);
                                           }}>
                                               {admins.length &&
                                               admins.map((value, index) =>{
                                                   return <option key={index} value={value._id}>{value.firstName + " " + value.lastName}</option>
                                               })}}
                                           </CustomSelectInput>
                                       </div>

                                       <div className={"pl-5"} style={{width:"50%", wordBreak:"break-word"}}>
                                           <h3 style={{marginLeft:"-15px"}}>User information</h3>

                                           <p style={{margin:"-10px", color:"white"}} className={"mb-0 mt-3"}>User name </p>
                                           <p className={"mt-0"}>{singleAdmin.name}</p>
                                           <p style={{margin:"-10px", color:"white"}} className={"mb-0"}>Email</p>
                                           <p className={"mt-0"}>{singleAdmin.email}</p>
                                           <p style={{margin:"-10px", color:"white"}} className={"mb-0"}>Creation Date</p>
                                           <p className={"mt-0"}>{singleAdmin.creationDate.substr(0,10)}</p>
                                       </div>
                                   </div>

                                   <hr style={{width: "70% !important"}}/>

                                   <div className={"text-center col-12"}>
                                       <input type={"submit"} value={"Delete user"}
                                              className={"btn text-uppercase reset-btn m-auto"}/>
                                   </div>
                               </fieldset>
                           </Form>
                       </BlackBox>

                       <ToastContainer
                           position="top-right"
                           autoClose={5000}
                           hideProgressBar={false}
                           newestOnTop
                           closeOnClick
                           rtl={false}
                           pauseOnFocusLoss
                           draggable
                           pauseOnHover/>

                           <div className={"container mt-2"}>
                               <ReturnButton/>
                           </div>
                   </div>
               )}
           </Formik>
        );
    }
}
export default D_User;
