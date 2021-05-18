import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import axios from "axios";
import ReturnButton from "../subComponents/ReturnButton";
import EducationImg from "../images/education.png";
import AccomplishmentNav from "../subComponents/AccomplishmentNav";
import  * as GiIcons from "react-icons/gi";

class Education extends Component {
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
        const idPage = "60977d66f77a8f183c891d0a";
        axios.get(`http://localhost:5000/pages/searchCode/${idPage}`)
            .then(response =>{
                this.setState({pageContent: response.data}, ()=> {
                    this.setState({isLoading:false});
                });
            }).catch(err =>{
            this.setState({gotError: true, errorMes:err.response.data}, () =>{
                this.setState({isLoading:false});
            });
        });
    }

    render() {
        let {isLoading, gotError, errorMes, pageContent} = this.state;

        return(
            <main>
                <AccomplishmentNav/>
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
                                <img src={EducationImg} alt={"Education Image"} id={"educationImg"}/>
                            </div>
                            <div className={"col-lg-9 col-md-8 col-sm-8"}>
                                <h1>{pageContent.pageTitle}</h1>
                                <h2 className={"little-brownish"}>{pageContent.pageSubTitle}
                                    <GiIcons.GiLotusFlower color={"#b28601"}/></h2>
                            </div>
                            <p style={{whiteSpace:"pre-wrap", padding: "10px"}}>{pageContent.content}</p>
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
export default Education;
