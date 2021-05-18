import React, {Component} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

class C_Image extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chosenImage : '',
            imgName:'Please select a file...',
            imgUp:false
        }
        this.setImage = this.setImage.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    setImage = (e) =>{
        this.setState({
            chosenImage: e.target.files[0],
            imgName: e.target.files[0].name
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

        formData.append("imgUpload", chosenImage);
        axios.post("http://localhost:5000/storedImages/addImage", formData)
            .then(response =>{
                let imageId = response.data.data.id;
                let imageName = response.data.data.filename;
                let {projObj} = this.props;

                //Request to update the project
                axios.post(`http://localhost:5000/projects/update/${projObj._id}`, {
                    projectName: projObj.projectName,
                    description: projObj.description,
                    type: projObj.type,
                    projectMediaId: imageId,
                    projectMedia: imageName
                }).then(response =>{
                    this.successToast(response.data);
                    this.setState({imgUp:true});
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
        })
    }

    render() {

        let {imgName, imgUp} = this.state;

        return(
            <div className={"mt-5"}>
                <hr/>
                <form onSubmit={this.onSubmitForm}>
                    <p>Upload the new image here: </p>
                    <fieldset disabled={imgUp}>
                        <div className={"custom-file-holder"}>
                            <label htmlFor={"inputImage"} className={"custom-file-upload"}>Project Image</label>
                            <input type={"file"} id={"inputImage"} name={"inputImage"}
                                   className={"form-control"} onChange={(e) => this.setImage(e)}/>
                            <p style={{float:"right", margin:"5px 40px 5px 5px"}}>{imgName}</p>
                        </div>

                        <input type={"submit"} value={"Add image"}
                               className={"btn btn-block btn-sm col-11 text-uppercase main-button ml-auto mr-auto mt-3"}/>
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
            </div>
        );
    }
}
export default C_Image;
