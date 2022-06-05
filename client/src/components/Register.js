import React, {useState} from "react";
import axios from "axios";

function Register(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
    });

    const {username, password, email} = credentials;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    };

    const register = async () => {
        try{
            const {data} = await axios("/api/auth/register", {
                method: "POST",
                data: credentials,
            });

        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div>
            <div>
                <input
                value={username}
                onChange={handleChange}
                name="username"
                type="text"
                className="form-control mb-2"
                />
               <input
                value={email}
                onChange={handleChange}
                name="email"
                type="email"
                className="form-control mb-2"
                />
                <input
                value={password}
                onChange={handleChange}
                name="password"
                type="password"
                className="form-control mb-2"
                />
                <button 
                onClick={register}
                className="btn btn-primary">
                    Register
                </button>
            </div>

        </div>
    )

}

export default Register;