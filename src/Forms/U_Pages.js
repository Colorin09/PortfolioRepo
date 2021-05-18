import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {CustomSelectInput, CustomTextArea, CustomTextInput} from "./FormComponents/CustomFormInputs";
import U_Resume from "./U_Resume";
import axios from "axios";
import ReturnButton from "../subComponents/ReturnButton";
import {toast, ToastContainer} from "react-toastify";

class U_Pages extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            errorFound: false,
            fields: {
                updatedPage:'',
                newPageName:'',
                newPageSub:'',
                newPageContent:''
            },
            chosenPage:{}
        }
        this.onPageChange = this.onPageChange.bind(this);
        this.getCurrentPage = this.getCurrentPage.bind(this);
    }

    //Calling all registered pages
    componentDidMount() {
        this.getPageInfo();
    }

    getPageInfo = () => {
        axios.get("http://localhost:5000/pages")
            .then(response =>{
                this.setState({pages: response.data, chosenPage:response.data[0]});
                this.getCurrentPage(response.data[0]._id);
            }).catch(err =>{
            this.setState({errorFound: true, errorMes:err.response.data});
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

    //onChange handler
    onPageChange = (selectedId) =>{
       this.getCurrentPage(selectedId);
    }

    //Get the text form a specific page
    getCurrentPage = (id) => {
        const pages = this.state.pages;
        const selectedPage = pages.filter((page) => page._id === id);
        let fields = {}

        if(selectedPage[0]){
            fields = {
                updatedPage: selectedPage[0]._id,
                newPageName: selectedPage[0].pageTitle,
                newPageSub: selectedPage[0].pageSubTitle,
                newPageContent: selectedPage[0].content
            };
        }else{
            fields = {
                updatedPage: "",
                newPageName:  "---" ,
                newPageSub: "---",
                newPageContent: "No content was found related to this page"
            };
        }
        this.setState({fields});
    }

    render(){

        let {pages, errorFound} = this.state;

        return(
           <Formik
               enableReinitialize={true}
               initialValues={this.state.fields}

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

               onSubmit={(values, {setSubmitting}) =>{

                   if(window.confirm("Do you confirm the new changes to be saved and uploaded?")){
                       axios.post(`http://localhost:5000/pages/update/${values.updatedPage}`, {
                           pageTitle: values.newPageName,
                           pageSubTitle: values.newPageSub,
                           content: values.newPageContent
                       }).then(response =>{
                           this.successToast(response.data);
                           setSubmitting(false);
                           this.getPageInfo();
                       }).catch(error =>{
                           let message = "";

                           if(error.response){
                               message = error.response.data;
                           }else{
                               message = "Error - We could not receive an appropriate response from our server. Please" +
                                   " review your Internet connection or try again later.";
                           }
                           this.errorToast(message);
                           setSubmitting(false);
                       });
                   }
                   setSubmitting(false);
               }}>

           {({setFieldValue, isValidating, isSubmitting, values}) => (
               <div className={"m-auto container col-lg-7 col-md-10 col-sm-10"}>
                   <BlackBox>
                       <h2 className={"mb-3"}>Modify a page content</h2>
                       <p className={"ml-2"}>Change the page's content and update the stored CV here.</p>
                       <hr/>
                           <Form noValidate={true}>
                               <fieldset disabled={errorFound || isSubmitting || isValidating}>
                                   <div className={"row"}>
                                       <div className={"col-5"}>
                                           <CustomSelectInput id={"updatedPage"} name={"updatedPage"} label={"Page to Update"}
                                                              disabled={pages.length < 1} onChange={(e) =>{
                                                                    this.onPageChange(e.target.value);
                                                                    setFieldValue("updatedPage", e.target.value);
                                                              }}>
                                               {pages.length &&
                                               pages.map((page, index) =>{
                                                   return <option key={index} value={page._id}>{page.pageTitle}</option>
                                               })}}
                                           </CustomSelectInput>
                                           <CustomTextInput id={"newPageName"} name={"newPageName"} label={"New Page Name"}/>
                                           <CustomTextInput id={"newPageSub"} name={"newPageSub"} label={"New Page Subtitle Name"}/>
                                       </div>
                                       <div className={"col-7"}>
                                           <CustomTextArea id={"newPageContent"} name={"newPageContent"} label={"New Page Content"}
                                                           rows={10} cols={80} />
                                       </div>
                                   </div>

                                   <div className={"col-12 text-center mt-3"}>
                                       <input type={"submit"} value={"Update Page"}
                                              className={"btn text-uppercase main-button mr-2"}/>
                                       <input type={"reset"} value={"Reset Form"}
                                              className={"btn reset-btn text-uppercase main-button"} onClick={()=>{
                                                  this.getCurrentPage(values.updatedPage._id);
                                       }}/>
                                   </div>
                               </fieldset>
                           </Form>
                       <hr/>
                       <U_Resume/>

                   </BlackBox>

                   <div className={"container"}>
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
               </div>
           )}
        </Formik>
        );
    }
}
export default U_Pages;
