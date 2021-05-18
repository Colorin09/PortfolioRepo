import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import {IconContext} from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import EmailForm from '../Forms/EmailForm';
import ReturnButton from "../subComponents/ReturnButton";

class Contact extends Component{
    constructor(props) {
        super(props);
        this.state ={
            feedback:'',
            formSubmitted:'',
            formSubmittedSuccessful:'',
            senderEmail:'alexandramdlv14@gmail.com'
        }
    }

    render(){
        return(
            <main className={"p-5"} style={{marginTop:"-50px"}}>
                <div className={"m-auto col-9 mb-4 row"}>
                    <div className={"col-9"}>
                        <h1>Contact information</h1>
                    </div>
                    <div className={"col-3"}>
                        <ReturnButton/>
                    </div>
                </div>

                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-lg-6 col-md-12 col-sm-12 mt-3"}>
                            <BlackBox>
                                <h2>Social Media to join me</h2>
                                <IconContext.Provider value={{ color: '#fff' }}>
                                    <ul id={"socialMediaUL"}>
                                        <li>
                                            <AiIcons.AiFillGithub/>&ensp;
                                            <a rel="noopener noreferrer" href="https://github.com/Colorin09" target="_blank">GitHub Profile</a>
                                        </li>
                                        <li>
                                            <AiIcons.AiFillLinkedin/>&ensp;
                                            <a  rel="noopener noreferrer" href="https://www.linkedin.com/in/alexandra-mormontoy-d-b05866188/" target="_blank">LinKedin Account</a>
                                        </li>
                                        <li>
                                            <CgIcons.CgMail/>&ensp;
                                            <a  rel="noopener noreferrer" href="mailto:alexandramdlv14@gmail.com">My Email: alexandramdlv14@gmail.com</a>
                                        </li>
                                        <li>
                                            <AiIcons.AiFillSkype/>&ensp;
                                            <a  rel="noopener noreferrer" href="https://join.skype.com/invite/rObfwrXryMNp" target="_blank">Skype Account</a>
                                        </li>
                                    </ul>
                                </IconContext.Provider>
                            </BlackBox>
                        </div>
                        <div className={"col-lg-6 col-md-12 col-sm-12 mt-3"}>
                            <EmailForm env={this.props.env}/>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
export default Contact;
