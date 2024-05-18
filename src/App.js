import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import MyComponent from "./components/MyComponent";
import Login from "./pages/login";
import Reg from "./pages/reg";
import EditButton from "./pages/lk"
import Card from "./pages/words";
import Modal from "./pages/Modal";
import Test from "./pages/test";
import TestComp from "./pages/TestComp";
import Gen from "./pages/gen";
import WelcomePage from "./pages/WelcomePage";



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/comp" element={<MyComponent />} />
                <Route path="/reg" element={<Reg />} />
                <Route path="/login" element={<Login />} />
                <Route path="/lk" element={<EditButton />} />
                <Route path="/newpage" element={<Card />} />
                <Route path="/mod" element={<Modal />} />
                <Route path="/test" element={<TestComp />} />
                <Route path="/gen" element={<Gen />} />

            </Routes>
        </Router>
    );
}

export default App;
