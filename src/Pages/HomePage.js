import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import CustomForm from "../Forms/CustomForm";
import DisplayProjects from "../subComponents/DisplayProjects";
import MainButton from "../subComponents/MainButton";

class HomePage extends Component{
    render() {
        return(
            <main>
               <div className={"col-8 m-auto"}>
                   <BlackBox>
                       <h1>Welcome to my portfolio:), I'm Alexandra</h1>

                       <p>I am a developer recently graduating from school hahaha. Gotta finish this asap/</p>

                       <MainButton text={"Download My CV Here!"}/>
                   </BlackBox>

                   <div>
                    <ul>
                        <li>Stuff</li>
                        <li>Stuff</li>
                        <li>Stuff</li>
                        <li>Stuff</li>
                    </ul>
                   </div>
               </div>
            </main>
        );
    }
}
export default HomePage;
