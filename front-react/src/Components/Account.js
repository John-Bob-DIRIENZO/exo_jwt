import {useContext} from "react";
import {JWTContext} from "../Context/JWTContext";

export default function Account() {
    const [userCredentials, setUserCredentials] = useContext(JWTContext);

    return (
        <div className='p-5'>
            <h1 className='mb-5'>Your account</h1>
            <p>First Name: {userCredentials.payload.firstName}</p>
            <p>Last Name: {userCredentials.payload.lastName}</p>
            <p>Email: {userCredentials.payload.email}</p>
        </div>
    )
}