
import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
//import SignIn from "./SignIn";
import Lodar from "../lodar/Lodar";
import SignIn from "./signIn";
//import SignIn from "./SignIn";






function SignUp() {
    const [isLodar, setIsLodar] = useState(false);
    const [signUpData, setSignUpData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        conPassword: ""
    });
    const navigate = useNavigate();



    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setSignUpData({ ...signUpData, [name]: value });
    }


    //signup data send to the server
    //-------------------------------------------------------------------------
    const signupUser = async (event) => {
        event.preventDefault();
        try {
            setIsLodar(true);
            const { name, number, email, password, conPassword } = signUpData;

            //console.log("hello");
            const respons = await fetch("https://bigbusket-api.onrender.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, number, email, password, conPassword })
            });

            const data = await respons.json();
            if (respons.status === 422 || !signUpData) {
                alert("no data");
            } else {
                alert("user sucessfull signup");

                //console.log(data);
                localStorage.setItem("token", data.token);

                //navigate to the home page
                navigate("/");
                window.location.reload();

                setSignUpData({
                    ...signUpData, name: "",
                    number: "",
                    email: "",
                    password: "",
                    conPassword: ""
                });
                setIsLodar(false);
            }
        } catch (e) {
            setIsLodar(false);
            console.log(e);
        }
    }


    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (<div className='login-modal'>
        <Box
            component="form"
            method="POST"
            onSubmit={signupUser}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="on"
        >
            <div className='login-modal'>
                <h2>SignUp</h2>

                <TextField
                    error={false}
                    required
                    name="name"
                    id="outlined-required-name"
                    label="Name"
                    value={signUpData.name}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="number"
                    type="number"
                    id="outlined-required-number"
                    label="Number"
                    value={signUpData.number}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="email"
                    id="outlined-required-email"
                    label="Email"
                    value={signUpData.email}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="password"
                    type="password"
                    id="outlined-required-password"
                    label="Password"
                    value={signUpData.password}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="conPassword"
                    type="password"
                    id="outlined-required-conPassword"
                    label="Confrom Password"
                    value={signUpData.conPassword}
                    onChange={handelInput}
                />

                <button className="modal-signin-button">CONTINUE</button>

                <h4>if you have a account go to signin</h4>


                <p className="privacy">By continuing, I accept TCP-bigbasket’s <a>Terms and Conditions</a> and <a>Privacy Policy.</a></p>
            </div>

        </Box>

        <button className="modal-signin-button"><SignIn /></button>

    </div>)
}

export default SignUp;