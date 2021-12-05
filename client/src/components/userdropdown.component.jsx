import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserDropdown extends Component {

    render() {
        return (
            <div className="dropdown-menu dropdown-menu-end shadow">
                <form className="px-4 py-3">
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck"/>
                        <label className="form-check-label">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/singup">Regístrate Aquí</Link>
                <a className="dropdown-item" href="#">Forgot password?</a>
            </div>
        );
    }
}

export default UserDropdown;