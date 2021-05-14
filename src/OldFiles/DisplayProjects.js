import React, {Component} from 'react';
import axios from "axios";

export default class DisplayProjects extends Component{
    constructor(props) {
        super(props);
        this.state ={
            projectList:[],
            isLoading:true
        }
    }

    async componentDidMount() {

        await axios.get('http://localhost:5000/projects')
            .then(res => {
                this.setState({projectList:res.data});
            })
            .catch((error)=>{
                console.log("Form was not submitted right", error);
            });

    }

    render(){

        let {projectList} = this.state;
        console.log(projectList);

        return(
            <div className={"m-5 text-center"}>
                <p>Fetching current projects from the backend</p>

                {projectList.length === 0 ? (
                    <div style={{color:"White"}}>Loading...</div>
                ) : (
                    projectList.map((project, i) => {

                        return <div key={i} style={{color:"White"}}>
                            <h1>{project.projectName}</h1>
                            <p>{project.description}</p>
                            {project.projectMedia &&
                                <img src={`data:image/Buffer;base64;
                     ${project.projectMedia.data.toString('base64')}`}
                                     alt={"Project Image"}/>}
                        <hr/>
                        </div>;
                    })
                )}
            </div>
        );
    }
}
