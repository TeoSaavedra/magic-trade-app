import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './searchbar.component';
import UserDropdown from './userdropdown.component';


class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = { matches: window.matchMedia("(min-width: 768px)").matches };
  }

  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-primary shadow-lg">
        <div className="container">
          {/* Brand */}
          <div className="d-flex justify-content-start">
            <Link className="navbar-brand" to="/">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="align-bottom" width="48" height="48" viewBox="0 0 512 512">
                  <g>
                    <path d="M504.499,161.101l-76.8-76.8c-4.796-4.804-11.307-7.501-18.099-7.501H102.4c-6.793,0-13.303,2.697-18.099,7.501
                          l-76.8,76.8c-10.001,10.001-10.001,26.206,0,36.207l230.4,230.4c4.992,4.992,11.546,7.492,18.099,7.492s13.107-2.5,18.099-7.501
                          l230.4-230.4C514.5,187.307,514.5,171.093,504.499,161.101z M391.501,102.4L332.8,161.101L274.099,102.4H391.501z M301.901,166.4
                          h-91.802L256,120.499L301.901,166.4z M237.901,102.4L179.2,161.101L120.499,102.4H237.901z M93.346,111.454l54.946,54.946H38.4
                          L93.346,111.454z M38.4,192h131.567l65.784,197.35L38.4,192z M256,369.101L196.966,192h118.067L256,369.101z M276.25,389.35
                          L342.033,192H473.6L276.25,389.35z M363.699,166.4l54.946-54.946L473.6,166.4H363.699z" />
                  </g>
                </svg>
                <span className="ms-2 h3">MTG Gems</span>
              </span>
            </Link>
          </div>

          {/* Search Bar on Big Screen */}
          {this.state.matches && (<SearchBar/>)}

          {/* Log / Sign In Button */}
          <div className="d-flex justify-content-end">
            <div className="dropdown ms-5">
              <button className="btn bg-transparent dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                {/* <span className="me-1">Login</span> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </button>
              <UserDropdown/>
            </div>
          </div>

          {/* Search Bar on Small Screen */}
          {!this.state.matches && (<SearchBar/>)}

        </div>
      </nav>
    );
  }
}

export default NavBar;