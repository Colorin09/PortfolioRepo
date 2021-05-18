import React, {useEffect, useState} from 'react';
import BlackBox from "../subComponents/BlackBox";
import * as CgIcons from "react-icons/cg";
import {toast, ToastContainer} from "react-toastify";
import emailjs from 'emailjs-com';

const EmailForm = ({ env }) => {
    const [fields, setFields] = useState({
        user_name:'',
        subject:'',
        user_email:'',
        message:''
    });
    const [errors, setErrors] = useState({
        user_name:'',
        subject:'',
        user_email:'',
        message:''
    });

    const handleChange = e => {
        setFields(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        console.log(fields);
    }

    const successToast = (content) => {
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

    const errorToast = (content) =>{
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

    const validateForm = () => {
        //Is there a value?
        if(!fields.user_name.trim().length){
            setErrors(prevState => ({ ...prevState, ["user_name"]:  "Please enter your name"}));
        }if(!fields.subject.trim().length){
            setErrors(prevState => ({ ...prevState, ["subject"]:  "Please enter a subject"}));
        }if(!fields.user_email.trim().length){
            setErrors(prevState => ({ ...prevState, ["user_email"]:  "Please enter an email"}));
        }if(!fields.message.trim().length){
            setErrors(prevState => ({ ...prevState, ["message"]:  "Please enter a message before submitting"}));
        }
        setErrors(errors);

        //user_name validation
        return errors.length;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!validateForm()){
            emailjs.sendForm(env.REACT_APP_EMAILJS_SERVICEID, env.REACT_APP_EMAILJS_TEMPLATEID, event.target, env.REACT_APP_EMAILJS_USERID)
                .then((result) => {
                    console.log(result);
                    successToast("The e-mail was successfully sent!");
                }, (error) => {
                    errorToast("Error - Something happened during the submission: " + error.text);
                });
        }
    };

    return (
        <div className={"ml-lg-3"}>
            <BlackBox>
                <h2>
                    <CgIcons.CgMail/>&ensp;
                    Email me here
                </h2>

                    <form noValidate={true} className='feedback-form p-3' onSubmit={handleSubmit}>

                        <input type={"text"} id={"user_name"} name={"user_name"}
                               className={"form-control form-control-sm mb-2"} placeholder={"Enter your name..."}
                        onChange={handleChange} value={fields.user_name || ''}/>
                        {errors.user_name && (
                            <p style={{color: "white"}}>{errors.user_name}</p>
                        )}
                       <input type={"text"} id={"subject"} name={"subject"} className={"form-control form-control-sm mb-2"}
                            placeholder={"Email Subject..."} onChange={handleChange} value={fields.subject || ''}/>
                        {errors.subject && (
                            <p style={{color: "white"}}>{errors.subject}</p>
                        )}
                        <input type={"text"} id={"user_email"} name={"user_email"} className={"form-control form-control-sm mb-2"}
                            placeholder={"Enter your email address..."} onChange={handleChange} value={fields.user_email || ''}/>
                        {errors.user_email && (
                            <p style={{color: "white"}}>{errors.user_email}</p>
                        )}
                        <textarea
                            className='text-input form-control form-control-sm'
                            id='message'
                            name='message'
                            placeholder='Enter your message here...'
                            cols={50} rows={8}
                            onChange={handleChange}
                            value={fields.message || ''}
                        />
                        {errors.message && (
                            <p style={{color: "white"}}>{errors.message}</p>
                        )}

                        <input type={"submit"} value={"SEND"} className={"btn btn-block col-11 text-uppercase main-button ml-auto mr-auto mt-4"}/>
                        <input type={"reset"} value={"CLEAR"} className={"btn btn-block reset-btn col-10 text-uppercase ml-auto mr-auto mt-1"}/>
                    </form>
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
                pauseOnHover
            />
        </div>
    );
};

export default EmailForm;
