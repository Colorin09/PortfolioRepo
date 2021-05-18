import React, {Component} from "react";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import "./css/MovieNav.css";
import AlienMovie from "../images/movies/AlienMovie.jpg";
import AvengersMovie from "../images/movies/AvengersMovie.jpg";
import TheThingImg from "../images/movies/TheThing.jpg";

class MovieNav extends Component{

    constructor(props) {
        super(props);
        this.state = {
            sidebar:false,
            showSelf:false
        }
        this.showSideBar = this.showSideBar.bind(this);
    }

    showSideBar = () =>{
        const {sidebar} = this.state;
        this.setState({sidebar:!sidebar});
    }

    render() {
        const {sidebar, showSelf} = this.state;

        return (
            <div style={{margin: "80px 0 0 0"}}
                 className={showSelf ? 'show-opa' : 'opa'}
                 onMouseEnter={() => this.setState({showSelf:true})}
            onMouseLeave={() => this.setState({showSelf:false})}>
                <div className={"m-0 p-0"}>
                    <IconContext.Provider value={{color: '#fff'}}>
                        <div className='navbar custom-movie-nav'>
                            <Link to='#' className=' custom-menu-bars m-0 p-0'>
                                <BiIcons.BiCameraMovie onClick={this.showSideBar}/>
                            </Link>
                        </div>
                        <nav className={sidebar ? 'nav-menu nav-movie-menu active' : 'nav-menu nav-movie-menu'}>
                            <ul className='nav-menu-items' onClick={this.showSideBar}>
                                <li className='navbar-toggle-movie'>
                                    <Link to='#' className='menu-bars'>
                                        <AiIcons.AiOutlineClose/>
                                    </Link>
                                </li>

                                <li className={"nav-text-movie mt-4"}>
                                    <h2 className={"text-uppercase mt-3"}
                                        style={{color:"#381107", fontSize:"1.5em"}}>
                                        Recommended movies</h2>
                                </li>
                               <li className={"nav-text-movie"}>
                                    <p style={{color: "white", marginTop:"30px"}}>These picks are my personal
                                        favorites, although I recommend to watch "The Thing" if
                                        you are a thriller fan!</p>
                                </li>
                                <li className={"nav-text-movie mt-4"} style={{marginTop:"150px"}}>
                                    <img src={TheThingImg} alt={"The Thing classic"} className={"movie-holder"}/>
                                    <p><i>The Thing, </i>1982</p>
                                </li>
                                <li className={"nav-text-movie mt-4"} style={{marginTop:"150px"}}>
                                    <img src={AlienMovie} alt={"Alien classic"} className={"movie-holder"}/>
                                    <p><i>Alien, </i>1979</p>
                                </li>
                                <li className={"nav-text-movie mt-4"} style={{marginTop:"150px"}}>
                                    <img src={AvengersMovie} alt={"Avengers 2011"} className={"movie-holder"}/>
                                    <p><i>Avengers, </i>2012</p>
                                </li><br/>
                            </ul>
                        </nav>
                    </IconContext.Provider>
                </div>
            </div>
        );
    }
}
export default MovieNav;
