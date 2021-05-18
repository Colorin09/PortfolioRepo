import React, {Component} from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import BlackBox from "../subComponents/BlackBox";
import {CustomTextInput} from "./FormComponents/CustomFormInputs";
import './css/forms.css';
import axios from "axios.js";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnButton from "../subComponents/ReturnButton";

class Login extends Component{
    showErrorToast = (content) =>{
        toast.error(content, {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    //is the user already logged in?
    componentDidMount() {
        let auth = JSON.parse(localStorage.getItem("authTokenX4E"));

        if(auth){
            this.props.history.push("/home");
        }
    }

    render(){
        return(
            <Formik
                enableReinitialize={true}

                initialValues={{
                    email: '',
                    password: ''
                }}

                validationSchema ={Yup.object({
                        email: Yup.string()
                            .required("Please enter your email!")
                            .max(40, "Maximum of 40 characters")
                            .matches(
                                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                "Please enter a valid email")
                            .trim(),
                        password: Yup.string()
                            .required("Please enter your password!")
                            .max(50, "Maximum of 50 characters")
                            .trim()
                    })}

            //Avoiding validation on change and blur
                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values, {setSubmitting}) =>{

                    axios.post("http://localhost:5000/users/getUser", {
                        email: values.email,
                        password: values.password
                    }).then((response)=>{
                        let obj = response.data;

                        localStorage.setItem("authTokenX4E", true);
                        localStorage.setItem("userName", obj.name);
                        localStorage.setItem("userId", obj.userId);

                        setSubmitting(false);
                        window.location.reload(false);

                        this.props.history.push("/home");
                    }).catch((error) =>{
                        let message = "";

                        if(error.response){
                            message = error.response.data;
                        }else {
                            message = "Error - We could not receive an appropriate response from our server. Please" +
                                " review your Internet connection or try again later.";
                        }
                        this.showErrorToast(message);
                        setSubmitting(false);
                    });
                }}>

                {({isSubmitting, isValidating}) => (
                    <div className={"col-lg-5 col-md-10 m-auto"}>
                        <div className={"mt-3"}>
                            <BlackBox>
                                <Form noValidate={true} className={"p-3"}>
                                    <fieldset disabled={isSubmitting || isValidating}>
                                        <h2 className={"text-center mb-5"}>Log In</h2>
                                        <CustomTextInput id={"email"} name={"email"} label={"E-mail"}/>
                                        <CustomTextInput id={"password"} name={"password"} type={"password"} label={"Password"}/>

                                        <input type={"submit"}
                                               className={"btn btn-block col-11 text-uppercase main-button ml-auto mr-auto mt-5"} value={"Enter"}/>
                                    </fieldset>
                                </Form>
                            </BlackBox>

                            <div className={"container m-2"}>
                                <ReturnButton/>
                            </div>

                            <ToastContainer
                                position="top-right"
                                autoClose={8000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </div>
                    </div>
                )}
            </Formik>
        );
    }
}
export default Login;
