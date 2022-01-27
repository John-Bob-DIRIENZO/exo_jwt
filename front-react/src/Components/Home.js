import {useContext} from "react";
import {JWTContext} from "../Context/JWTContext";

export default function Home() {
    const [userCredentials, setUserCredentials] = useContext(JWTContext);

    return (
        <div className='p-5'>
            <h1 className='mb-5'>Home page</h1>
            <p>Bienvenue sur cet incroyable lieu {userCredentials.payload.firstName},
                prenez le temps de visiter les alentours !</p>
        </div>
    )
}