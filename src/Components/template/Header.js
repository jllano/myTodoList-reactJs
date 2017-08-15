import React, { Component } from 'react';


class Header extends Component {

    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="">Simple Todo App</a><span className="user"></span>
                </nav>
            </div>
        );
    }
}

export default Header;
