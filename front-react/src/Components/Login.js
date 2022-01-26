import {useContext, useState} from "react";
import {JWTContext} from "../Context/JWTContext";
import {base64url} from "jose";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jwt, setJwt] = useContext(JWTContext);

    const handleChange = (e) => {
        if (e.target.id === 'email') {
            setEmail(e.target.value);
        } else if (e.target.id === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const credentials = window.btoa(email + ':' + password);

        const head = new Headers({
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        })

        const res = fetch('http://localhost:1234/api/user-token',
            {
                credentials: "include",
                headers: head,
                mode: "cors"
            }
        )
            .then(res => res.json())
            .then(data => console.log(data));

    }

    return (
        <form style={{maxWidth: "400px"}} className="mx-auto bg-light rounded p-5 mt-5" onSubmit={handleSubmit}>
            <h1 className='mb-5 text-center'>Please Login</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}