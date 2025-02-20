import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    // set configurations
    const configuration = {
        method: "post",
        url: "http://localhost:3001/register",
        data: {
          email,
          username,
          password,
        },
      };

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        if (password) {
            if (password !== confirmPassword) {
                setError('Passwords do not match')
                return
            }

            // make the API call
            axios(configuration)
            .then(() => {
                setSuccess(true);
                alert('Account registered successfully!')
                window.location.href = "/";
            })
            .catch((error) => {
                console.log(error)
                setError(error.response.data.message)
            });
        } else {
            setError("Please provide a password!")
        }
    }

    if(token) {
        return <Navigate to='/home' replace />
    }

    if (success) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
            <div className="login-box centered-box">
                <h2>Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            className="input-field"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            className="input-field"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            className="input-field"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <button type="submit" className="login-button">Sign Up</button>
                </Form>
                <label>
                    Already have an account?
                    <Link to="/">
                        Login
                    </Link>
                </label>
            </div>
        </div>
    )
}