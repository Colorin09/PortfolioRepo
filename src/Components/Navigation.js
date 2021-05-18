import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import "./css/Navigation.css";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import {Link} from "react-router-dom";
import  * as GiIcons from "react-icons/gi";

class Navigation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userIsLogged: "No"
        }
        this.logout = this.logout.bind(this);
    }

    logout = () =>{
        localStorage.setItem("authTokenX4E", false);
        localStorage.setItem("userName", "");
        localStorage.setItem("userId", "");
        //Reloading changes
        window.location.reload(false);
    }

    componentDidMount() {
        let userLogged = JSON.parse(localStorage.getItem("authTokenX4E"));

        if(userLogged){
            this.setState({userIsLogged:"Yes"});
        }
    }

    render(){

        let {userIsLogged} = this.state;

        return(
            <>
                <Navbar fixed={"top"} collapseOnSelect expand={"lg"} id={"majorNav"}
                        variant={"dark"} style={{backgroundColor: "#2e241f"}}>
                    <Navbar.Brand>
                        <Nav.Link id={"homeLink"} eventKey={1} as={Link} to={"/home"}>
                            <h1 className="title-font pb-2">
                                <GiIcons.GiLotusFlower color={"#b28601"}/>
                                <span className="brown-heading h4">Presenting my</span>
                                <span className="goldish-heading">Portfolio</span>
                            </h1>
                        </Nav.Link>
                    </Navbar.Brand>
                    <NavbarToggle aria-controls={"responsive-navbar-nav"}/>
                    <Navbar.Collapse id={"responsive-navbar-nav"}>
                        <Nav id={"mainNav"}>
                            <Nav.Link eventKey={3} as={Link} to={"/home"}>Home</Nav.Link>
                            <Nav.Link eventKey={3} as={Link} to={"/about"}>About Me</Nav.Link>
                            <Nav.Link eventKey={4} as={Link} to={"/projects"}>Projects</Nav.Link>
                            <Nav.Link eventKey={5} as={Link} to={"/education"}>Education</Nav.Link>
                            <Nav.Link eventKey={6} as={Link} to={"/contact"}>Contact</Nav.Link>

                            {userIsLogged === "Yes" ?
                            <Nav.Link eventKey={7} as={Link} to={"/home"} onClick={this.logout}>Log out</Nav.Link>:
                            <Nav.Link eventKey={8} as={Link} to={"/login"}>Login</Nav.Link> }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}
export default Navigation;
/*Login feature does not work yet*/
