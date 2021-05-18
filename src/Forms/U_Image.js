import React, {Component} from "react";
import axios from "../axios";
import {toast, ToastContainer} from "react-toastify";

class U_Image extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imgNum:'',
            disableForm: false,
            chosenImage : '',
            currentProj: {},
            imgName:'Please select a file...',
        }
        this.setImage = this.setImage.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        const {currentImg, shouldDisable, currentProj} = this.props;
        this.setState({imgNum: currentImg, disableForm:shouldDisable, currentProj});
    }

    //Updating component as required
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {currentImg, shouldDisable, currentProj} = this.props;

        //Updating image URL
        if(nextProps.currentImg !== currentImg){
            this.setState({imgNum: nextProps.currentImg});
            return true;
        }

        if(nextProps.currentProj !== currentProj){
            this.setState({currentProj: nextProps.currentProj});
            return true;
        }

        //Disable form when required
        if(nextProps.shouldDisable !== shouldDisable){
            this.setState({disableForm: nextProps.shouldDisable});
            return true;
        }
        return true;
    }

    //Update chosen image stats
    setImage = (e) =>{
        this.setState({
            chosenImage: e.target.files[0],
            imgName: e.target.files[0].name
        });
    }
    resetForm = () =>{
        this.setState({
            chosenImage : '',
            imgName:'Please select a file...',
        });
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


    onSubmitForm = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        let {chosenImage} = this.state;
        let {currentProj} = this.props;

        //transform the image
        formData.append("imgUpload", chosenImage);

        //Update image stored in related project
        axios.post("http://localhost:5000/storedImages/addImage", formData)
            .then(response =>{
                let imageId = response.data.data.id;
                let imageName = response.data.data.filename;

                //Request to update the project
                axios.post(`http://localhost:5000/projects/update/${currentProj.selectedProject}`, {
                    projectName: currentProj.updateProjName,
                    description: currentProj.updateProjDesc,
                    type: currentProj.newProjType,
                    projectMediaId: imageId,
                    projectMedia: imageName
                }).then(response =>{
                    this.successToast(response.data);
                    this.setState({imgNum:imageName});
                    this.resetForm();
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

                //Delete current image
                axios.delete("http://localhost:5000/storedImages/delete/" + currentProj.newProjImgId)
                    .catch(error =>{

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

    render() {
        let {disableForm, imgNum, imgName, chosenImage} = this.state;
        return(
            <>
                <form noValidate={true} onSubmit={this.onSubmitForm}>
                    <h3>Update an image</h3>
                    <fieldset disabled={disableForm}>
                        <div className={"custom-file-holder"}>
                            <label htmlFor={"newProjImg"} className={"custom-file-upload"}>Project Image</label>
                            <input type={"file"} id={"newProjImg"} name={"newProjImg"}
                                   className={"form-control"} onChange={(e) => this.setImage(e)}/>
                            <p style={{float:"right", fontSize:"0.8em", margin:"10px 10px 0 0"}}>{imgName}</p>
                        </div>

                        {chosenImage.name && (
                            <div className={"info-div m-3"}>
                                New image set!
                                <input type={"reset"} value={"Clear File"}
                                       className={"btn btn-sm text-uppercase reset-btn float-right m-auto"}
                                       style={{fontSize:"0.6em"}} onClick={() => this.resetForm()}/>
                            </div>
                        )}

                        <div style={{color:"white" }}>Current Image</div>
                        <img src={"http://localhost:5000/storedImages/" + imgNum}
                             alt={"No image was currently found under this project..."} className={"img-holder"}/>
                        <hr/>
                        <input type={"submit"} value={"Change Image"} disabled={chosenImage === ''}
                               className={"btn btn-block col-10 text-uppercase main-button ml-auto mr-auto mt-2"}/>
                    </fieldset>
                </form>

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
            </>
        );
    }
}
export default U_Image;
