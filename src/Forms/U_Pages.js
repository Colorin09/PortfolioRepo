import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {CustomSelectInput, CustomTextArea, CustomTextInput} from "./FormComponents/CustomFormInputs";

class C_Pages extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
           <Formik
               enableReinitialize={true}

               initialValues={{
                   updatedPage:'',
                   newPageName:'',
                   newPageSub:'',
                   newPageContent:''
               }}

               validateOnBlur={false}
               validateOnChange={false}

               validationSchema={Yup.object({
                   newPageName: Yup.string()
                       .required("Please enter a title")
                       .min(3, "Please enter more text!")
                       .max(30, "Maximum of 30 characters"),
                   newPageSub: Yup.string()
                       .required("Please enter a subtitle")
                       .max(40, "Maximum of 40 characters"),
                   newPageContent: Yup.string()
                       .required("Please enter new content to the page")
                       .min(30, "Please enter more content")
               })}

               onSubmit={() =>{
                   console.log("Form submitted");
               }}>

           {() => (
               <BlackBox>

                   <h2>Modify a page content</h2>

                   <Form noValidate={true}>

                       <CustomSelectInput id={"updatedPage"} name={"updatedPage"} label={"Page to Update"}>
                           <option>Example</option>
                           <option>Example</option>
                           <option>Example</option>
                           <option>Example</option>
                           <option>Example</option>
                       </CustomSelectInput>

                       <CustomTextInput id={"newPageName"} name={"newPageName"} label={"New Page Name"}/>
                       <CustomTextInput id={"newPageSub"} name={"newPageSub"} label={"New Page Subtitle Name"}/>
                       <CustomTextArea id={"newPageContent"} name={"newPageContent"} label={"New Page Content"}/>
                       <input type={"submit"} value={"Update Page"}/>
                       <input type={"clear"} value={"Reset Form"}/>

                   </Form>

                   <button>Add a new Resume</button>

               </BlackBox>
           )}
        </Formik>
        );
    }
}
export default C_Pages;
