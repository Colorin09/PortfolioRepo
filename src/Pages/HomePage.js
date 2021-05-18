import React, {Component} from "react";
import AdminNav from "../subComponents/AdminNav";
import * as FaIcons from "react-icons/fa";
import "./css/pageStyles.css";
import "../subComponents/css/MainButton.css";
import {toast, ToastContainer} from "react-toastify";

class HomePage extends Component{

    componentDidMount() {
        let isLogged = JSON.parse(localStorage.getItem("authTokenX4E"));
        if(isLogged){
            let name = localStorage.getItem("userName");
            this.infoToast(name);
        }
    }

    infoToast = (content) => {
        toast.success("You are currently logged in " + content +" :).", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    render() {
        return(
            <main>
                <AdminNav/>
                <div className={"m-5 text-center"}>
                    <h1 className={"title-box"}>
                        Welcome to my portfolio:), I'm Alexandra
                    </h1>
                    <p>I am a young graduating developer wishing to learn more about this art.</p>
                </div>
                <br/>
                <hr/>
                <div className={"col-8 m-auto text-center mt-5"}>
                    <button className={"btn text-uppercase main-button"}>
                        <FaIcons.FaDownload color={"white"}/>
                        &ensp;Download My CV Here!
                    </button>
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
                    style={{marginTop:"80px"}}
                />
            </main>
        );
    }
}
export default HomePage;
