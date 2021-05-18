import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import ReturnButton from "../subComponents/ReturnButton";
import axios from "axios";
import MovieNav from "../subComponents/MovieNav";
import Selfie from "../images/Selfie.jpg";
import  * as GiIcons from "react-icons/gi";

class AboutMe extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pageContent : {},
            isLoading:true,
            gotError: false,
            errorMes:''
        }
    }

    componentDidMount() {
        const idPage = "6097797ccddc9024a007f33b";
        axios.get(`http://localhost:5000/pages/searchCode/${idPage}`)
            .then(response =>{
                this.setState({pageContent: response.data}, ()=> {
                    this.setState({isLoading:false});
                });
            }).catch(err =>{
                let message = "";

                //Client receives error response (400, 500)
                if(err.response){
                    message = err.response.data;
                } else{
                    message = "Sorry, the request timed out and no appropiate response was gived." +
                        " Please try again later:(";
                }

                this.setState({gotError: true, errorMes:message}, () =>{
                    this.setState({isLoading:false});
                });
        });
    }

    render() {
        let {isLoading, gotError, errorMes, pageContent} = this.state;

        return(
            <main>
                <MovieNav/>
                <div className={"m-auto container col-lg-7 col-md-10 col-sm-10"}>

                    <BlackBox>
                        {isLoading &&
                        <div className={"col-10 alert-yellow"}>
                            <p>Loading, please wait a sec...</p>
                        </div>}

                        {gotError &&
                        <div className={"col-10 alert-yellow"}>
                            <p>{errorMes}</p>
                        </div>}

                        {!gotError &&
                        <div className={"row"}>
                            <div className={"col-lg-3 col-md-4 col-sm-4"}>
                                <img src={Selfie} alt={"Myself.jpg"} id={"selfie"}/>
                            </div>
                            <div className={"col-8"}>
                                <h1>{pageContent.pageTitle}</h1>
                                <h2 className={"little-brownish"}>{pageContent.pageSubTitle}
                                    <GiIcons.GiLotusFlower color={"#b28601"}/></h2>
                            </div>
                            <p style={{whiteSpace:"pre-wrap", padding:"10px"}}>{pageContent.content}</p>
                        </div>
                        }
                    </BlackBox>
                    <div className={"container m-auto"}>
                        <ReturnButton/>
                    </div>
                </div>
            </main>
        );
    }
}

export default AboutMe;
//How to divide text in 2 columns?
//Have to double check the error
