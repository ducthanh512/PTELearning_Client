import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../components/Assets/Images/PTE_Logo.png' 

class Header extends Component {
	goHome= () =>{
		window.location.href = "/";
	}
    render() {


        return (

				<nav className="navbar navbar-expand-lg navbar-dark indigo header_background ">
				        <a className="navbar-brand" href="#">
					        <img src={logo} height="100" alt=""/>
					    </a>
				    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
				        aria-expanded="false" aria-label="Toggle navigation">
				        <span className="navbar-toggler-icon"></span>
				    </button>
				    <div className="collapse navbar-collapse" id="navbarText">
				        <div className="navbar-nav mr-auto">
				        </div>
				        <span className="navbar-nav">
				            <div className="nav-item ">
				                <a onClick={this.goHome} className="nav-link">Home </a>
				            </div>
				               <div className="nav-item">
				                <div className="nav-link">/</div>
				            </div>
				            <div className="nav-item">
				                <a className="nav-link">Login</a>
				            </div>
				        </span>
				    </div>
				</nav>

        );

    }
}

export default Header;