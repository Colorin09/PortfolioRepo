import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import axios from "axios";
import ReturnProjectButton from "../subComponents/ReturnProjectButton";

class SingleProject extends Component{

    constructor(props) {
        super(props);
        this.state = {
            projectChosen: {},
            notFound: false,
            showModal: false
        }
        this.setUpModal = this.setUpModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        const projectChosen = this.props.match.params.projId;
        axios.get(`http://localhost:5000/projects/fetchProject/${projectChosen}`)
            .then((response) => {
                this.setState({projectChosen: response.data});
            }).catch(() =>{
                this.setState({notFound:true});
        });
    }

    createMarkup = () =>{
        let content = this.state.projectChosen.description;
       return {__html: content};
    }

    setUpModal = () =>{
        console.log("CHANGE MADE");
        this.setState({showModal: true});
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    render(){
        let {projectChosen, showModal} = this.state;
        return(
            <div className={"col-lg-7 col-md-10 col-sm-10 m-auto"}>
                <BlackBox>
                    <h1>{projectChosen.projectName}</h1>
                    <hr/>
                    <div className={"text-center"}>
                        <img src={`http://localhost:5000/storedImages/${projectChosen.projectMedia}`}
                             alt={"Project Image"} className={"img-single-holder"} onClick={()=>{
                            this.setUpModal();
                        }}/>
                    </div>
                    <p style={{whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={this.createMarkup()}/>
                </BlackBox>

                <div className={"container ml-2"}>
                    <ReturnProjectButton/>
                </div>

                <div id="myModal" className={showModal ? 'modal d-block' : 'none'}>
                    <span className={showModal ? 'close d-block' : 'd-none'} onClick={this.closeModal}>&times;</span>
                    <img className={showModal ? 'modal-content' : 'd-none'} id="img01" alt={"MODAL IMAGE"}
                         src={`http://localhost:5000/storedImages/${projectChosen.projectMedia}`} />
                </div>
            </div>
        );
    }
}

export default SingleProject;
