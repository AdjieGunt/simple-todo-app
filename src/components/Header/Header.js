import React, { Component } from 'react';
import './Header.css'



class Header extends Component {
    
    render() {
        // console.log("log from header");
        return(
            <div className="row text-center" id="top-nav">
                <div className="col-xs-3">
                    <a href="/">Mall</a>
                </div>
                <div className="col-xs-3">
                    <a href="/">Seller Centre</a>
                </div>
                <div className="col-xs-3">
                    <a href="/">Import IG</a>
                </div>
                <div className="col-xs-3">
                    <a href="/">Download</a>
                </div>
            </div>
        );
    }
}

export default Header;