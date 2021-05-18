import React, {Component} from "react";
import "./css/accomNav.css";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";

class AccomplishmentNav extends Component{

    constructor(props) {
        super(props);
        this.state = {
            sidebar:false
        }
        this.showSideBar = this.showSideBar.bind(this);
    }

    showSideBar = () =>{
        const {sidebar} = this.state;
        this.setState({sidebar:!sidebar});
    }

    render(){
        let {sidebar} = this.state;

        return(
            <div className={"m-0 p-0"}>
                <IconContext.Provider value={{color: '#fff'}}>
                    <div className='navbar custom-accom-nav'>
                        <Link to='#' className=' custom-menu-bars m-0 p-0'>
                            <SiIcons.SiGooglescholar onClick={this.showSideBar}/>
                        </Link>
                    </div>
                    <nav className={sidebar ? 'nav-menu nav-accom-menu active' : 'nav-menu nav-accom-menu'}>
                        <ul className='nav-menu-items' onClick={this.showSideBar}>
                            <li className='navbar-toggle-accom'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose/>
                                </Link>
                            </li>
                            <li className={"mt-4"}>
                                <p id={"accomTitle"}>Main skills - Programming</p>
                            </li>

                            <li className={"nav-text-accom"}>
                                <p>Java - Intermediate</p>
                            </li>
                            <li className={"nav-text-accom"}>
                                <p>Javascript - Intermediate/High</p>
                            </li>
                            <li className={"nav-text-accom"}>
                                <p><i>PHP</i>: Intermediate</p>
                            </li>
                            <li className={"nav-text-accom"}>
                                <p>SQL: Intermediate-High</p>
                            </li>
                            <li className={"nav-text-accom"}>
                                <p>Database management: Itermediate</p>
                            </li>
                            <li className={"nav-text-accom"}>
                                <p>Investigatoin</p>
                            </li>
                        </ul>
                    </nav>
                </IconContext.Provider>
            </div>
        );
    }
}
export default AccomplishmentNav;
