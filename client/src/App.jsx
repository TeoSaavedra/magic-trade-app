import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/navbar.component";
import Signup from "./components/fragments/signup.fragment";
import FlashMessageList from './components/flashmessages/flashmessagelist.component';

import './App.css';
 
class App extends Component {

    render () {
        return(
            <div className="bg-light">
                <NavBar/>
                <FlashMessageList/>
                <div>
                    <Routes>
                        <Route path="/singup" element={<Signup/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;