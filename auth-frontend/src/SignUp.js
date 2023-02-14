import React, {useState} from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    // set configurations
    const configuration = {
        method: "post",
        url: "http://localhost:3001/register",
        data: {
          email,
          password,
        },
      };

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make the API call
        axios(configuration)
        .then((result) => {
            setRegister(true);
        })
        .catch((error) => {
            error = new Error();
        });

        // make a popup alert showing the "submitted" text
        // alert("Submited");
    }

    if(token) {
        return <Navigate to='/auth' replace />
    }

    return (
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <div>
                <h2>Sign Up</h2>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    {/* email */}
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                    </Form.Group>

                    {/* password */}
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    </Form.Group>

                    {/* submit button */}
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Register
                    </Button>
                    {register ? (
                        <p className="text-success">You Are Registered Successfully</p>
                    ) : (
                        <p className="text-danger">You Are Not Registered</p>
                    )}
                    <label>Already have an account? <a href='/'>Log In</a> now</label>
                </Form>
            </div>
        </div>
    )
}