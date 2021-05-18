import React, {Component} from "react";
import {Link} from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import {IconContext} from "react-icons";
import "./css/AdminNav.css";

class AdminNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sidebar:false,
            userIsLogged:""
        }
        this.showSideBar = this.showSideBar.bind(this);
    }

    showSideBar = () =>{
        const {sidebar} = this.state;
        this.setState({sidebar:!sidebar});
    }

    componentDidMount() {
        let userIsLogged = JSON.parse(localStorage.getItem("authTokenX4E"));
        if(userIsLogged){
            this.setState({userIsLogged:"Yes"});
        }
        else{
            this.setState({userIsLogged:"No"});
        }
    }

    render(){
        const {sidebar, userIsLogged} = this.state;

        return(
            <div className={"m-0 p-0"}>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className='navbar customNavBar'>
                        <Link to='#' className='menu-bars custom-menu-bars m-0 p-0'>
                            <RiIcons.RiAdminLine onClick={this.showSideBar} />
                        </Link>
                    </div>
                    <nav className={sidebar ? 'nav-menu nav-cus-menu  active' : 'nav-menu nav-cus-menu'}>
                        <ul className='nav-menu-items ' onClick={this.showSideBar}>
                            <li className='navbar-toggle '>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose/>
                                </Link>
                            </li>
                            {userIsLogged === "Yes" ?
                                <>
                                    <h2 className={"text-uppercase mt-3"}
                                        style={{color:"#381107", fontSize:"1.5em"}}>
                                        <FiIcons.FiSettings color={"#381107"}/>&nbsp;
                                        Admin Dashboard</h2>

                                    <div style={{borderLeft:"#752610 3px solid"}}>
                                        <li className={"nav-text mt-4"}>
                                            <Link to={"/create_project"}>
                                                <AiIcons.AiOutlinePlusCircle style={{marginRight:"8px"}}/>
                                                Add a new project
                                            </Link>
                                        </li>
                                        <li className={"nav-text"}>
                                            <Link to={"/update_project"}>
                                                <FaIcons.FaExchangeAlt style={{marginRight:"8px"}}/>
                                                Update a project
                                            </Link>
                                        </li>
                                        <li className={"nav-text"}>
                                            <Link to={"/delete_project"}>
                                                <AiIcons.AiFillDelete style={{marginRight:"8px"}}/>
                                                Delete a project
                                            </Link>
                                        </li>
                                        <li className={"nav-text"}>
                                            <Link to={"/add_user"}>
                                                <AiIcons.AiOutlinePlusCircle style={{marginRight:"8px"}}/>
                                                Add a new administrator
                                            </Link>
                                        </li>
                                        <li className={"nav-text"}>
                                            <Link to={"/delete_user"}>
                                                <FaIcons.FaExchangeAlt style={{marginRight:"8px"}}/>
                                                Manage administrators
                                            </Link>
                                        </li>
                                        <li className={"nav-text"}>
                                            <Link to={"/update_page"}>
                                                <FaIcons.FaExchangeAlt style={{marginRight:"8px"}}/>
                                                Update a page content
                                            </Link>
                                        </li>
                                    </div>
                                </> :
                                <>
                                    <li className={"nav-text mt-4"}>
                                        Sign in to access the page's functionalities here!
                                    </li>
                                    <Link to={"/login"} className={"m-auto"}>
                                        <button className={"btn login-btn mt-4"}>
                                            <RiIcons.RiAdminFill color={"#865701"}/>
                                            &nbsp;LOG IN
                                        </button>
                                    </Link>
                                </>
                            }
                        </ul>
                    </nav>
                </IconContext.Provider>
            </div>
        );
    }
};
export default AdminNav;
