import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import { Container } from "@material-ui/core";

import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Components/Home/Home";
import { Auth } from "./Components/Form/Auth/Auth";

const App = ()=>{
    return(
        <HashRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/auth" element={<Auth/>}></Route>
                </Routes>
            </Container> 
        </HashRouter>
      
    );
}

export default App;
