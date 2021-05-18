import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {CustomTextInput} from "./FormComponents/CustomFormInputs";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnButton from "../subComponents/ReturnButton";

class C_User extends Component{
    componentDidMount() {
        let isLogged = JSON.parse(localStorage.getItem("authTokenX4E"));

        if(!isLogged){
            this.props.history.push("/home");
        }
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

    render() {
        return(
           <Formik
               enableReinitialize={true}

               initialValues={{
                   firstName:'',
                   lastName:'',
                   email:'',
                   password:'',
                   confirmPassword:''
               }}

               validationSchema={Yup.object({
                   firstName: Yup.string()
                       .required("Please enter a name!")
                       .max(40, "Maximum of 40 characters"),
                   lastName: Yup.string()
                       .required("Please enter a name!")
                       .max(50, "Maximum of 50 characters"),
                   email: Yup.string()
                       .required("Please enter an email!")
                       .max(50, "Maximum of 50 characters")
                       .matches(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                           "Please enter a valid email"),
                   password: Yup.string()
                       .required("Don't forget to enter your password!")
                       .min(8, "The password must be of at least 10 characters")
                       .max(50, "Maximum of 50 characters")
                       .oneOf([Yup.ref('password')], null).matches(/[a-z]/, "Please use at least a lowercase letter")
                       .oneOf([Yup.ref('password')], null).matches(/[A-Z]/, "Please use at least one uppercase letter")
                       .oneOf([Yup.ref('password')], null).matches(/(?=.*?[0-9])/, "Please use at least one digit"),
                   confirmPassword : Yup.string()
                       .required("Please enter your new password")
                       .oneOf([Yup.ref('password')], "Passwords do not match!!!")
               })}

               validateOnBlur={false}
               validateOnChange={false}

               onSubmit={(values, {setSubmitting}) =>{
                   axios.post("http://localhost:5000/users/add", {
                       firstName: values.firstName,
                       lastName: values.lastName,
                       email: values.email,
                       password: values.password
                   }).then((response) =>{
                       setSubmitting(false);
                       this.successToast(response.data);
                   }).catch((error) =>{
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

               {({isSubmitting,isValidating, values}) => (
                   <div className={"col-lg-5 col-md-10 ml-auto mr-auto mt-1"}>
                       <BlackBox>
                           <h2 className={"text-center"}>Add a new administrator</h2>
                           <hr/>
                           <div className={"m-auto explain-div"}>
                               <p>Please note the password must at least have the following characters :</p>
                               <ul>
                                   <li className={(values.password.match(/[a-z]/) ? 'good-valid' :
                                       '') }>
                                       One lowercase letter
                                   </li>
                                   <li className={(values.password.match(/[A-Z]/) ? 'good-valid' :
                                       '') }>One uppercase letter</li>
                                   <li className={(values.password.match(/\d/) ? 'good-valid' :
                                       '') }>One digit</li>
                                   <li className={(values.password.length >= 8 ? 'good-valid' :
                                       '') }>Minimum 8 characters</li>
                               </ul>
                           </div>

                           <Form noValidate={true} className={"margin-set-up"}>
                               <fieldset disabled={isSubmitting || isValidating} className={"col-10 m-auto"}>
                                   <CustomTextInput id={"firstName"} name={"firstName"} label={"First Name"}/>
                                   <CustomTextInput id={"lastName"} name={"lastName"} label={"Last Name"}/>
                                   <CustomTextInput id={"email"} name={"email"} label={"E-mail"}/>
                                   <CustomTextInput id={"password"} name={"password"} label={"New password"}/>
                                   <CustomTextInput id={"confirmPassword"} name={"confirmPassword"} label={"Confirm the password"}/>

                                    <div className={"text-center container"}>
                                        <input type={"submit"} className={"btn btn-block col-11 text-uppercase main-button mt-4"} value={"Add new administrator"}/>
                                        <input type={"reset"} className={"btn col-6 reset-btn text-uppercase mt-2"} value={"Reset"}/>
                                    </div>
                               </fieldset>
                           </Form>

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
                       </BlackBox>

                       <div className={"container mt-2"}>
                           <ReturnButton/>
                       </div>
                   </div>
               )}
           </Formik>
        );
    }
}
export default C_User;
