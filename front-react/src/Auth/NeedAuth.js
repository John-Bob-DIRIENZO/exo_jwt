import * as jose from 'jose';
import {JWTContext} from "../Context/JWTContext";
import {useContext, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import NotAuthorized from "../Components/NotAuthorized";

export default function NeedAuth(props) {
    const [userCredentials, setUserCredentials] = useContext(JWTContext);
    let location = useLocation();
    const neededRole = props.role;

    useEffect(async () => {
        try {
            const {payload, protectedHeader} = await jose.jwtVerify(userCredentials.jwt, userCredentials.publicKey)
        } catch (error) {
            // console.log(error.name)
            setUserCredentials({
                jwt: '',
                publicKey: '',
                payload: {}
            });
        }
    });

    if (userCredentials.jwt !== '' && userCredentials.payload.roles.includes(neededRole)) {
        return props.children;
    } else if (userCredentials.jwt !== '' && !userCredentials.payload.roles.includes(neededRole)) {
        return <NotAuthorized neededRole={props.role}/>;
    } else {
        return <Navigate to={"/login"} state={{from: location}}/>;
    }
}