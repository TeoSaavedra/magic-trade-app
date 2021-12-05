import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/navbar.component";
import Signin from "./components/fragments/signin.fragment";

import './App.css';
 
class App extends Component {

    render () {
        return(
            <div className="bg-light">
                <NavBar/>
                <div>
                    <Routes>
                        <Route path="/singup" element={<Signin/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;