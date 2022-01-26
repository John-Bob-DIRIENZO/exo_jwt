import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Account from "./Components/Account";
import Invoice from "./Components/Invoice";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import NeedAuth from "./Auth/NeedAuth";
import {useState} from "react";
import {JWTContext} from "./Context/JWTContext";

function App() {

    const [jwt, setJwt] = useState('');

    return (
        <JWTContext.Provider value={[jwt, setJwt]}>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="account" element={
                            <NeedAuth role={"ROLE_USER"}>
                                <Account/>
                            </NeedAuth>
                        }/>
                        <Route path="invoice" element={
                            <NeedAuth role={"ROLE_USER"}>
                                <Invoice/>
                            </NeedAuth>
                        }/>
                        <Route path="admin" element={
                            <NeedAuth role={"ROLE_ADMIN"}>
                                <Admin/>
                            </NeedAuth>
                        }/>
                    </Routes>
                </div>
            </BrowserRouter>
        </JWTContext.Provider>
    );
}

export default App;
