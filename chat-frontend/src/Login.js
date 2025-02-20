import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import io from "socket.io-client";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [login, setLogin] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const configuration = {
        method: "post",
        url: "http://localhost:3001/login",
        data: {
            username,
            password,
        },
    };

    const socket = io.connect(
        "http://localhost:3002",
        { transports: ["websocket"] },
        { autoConnect: false }
    );

    const handleLogin = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make the API call
        axios(configuration)
        .then((result) => {
            setLogin(true);
            cookies.set("TOKEN", result.data.token, {
                path: "/",
            });
            socket.auth = { userId: username };
            socket.connect();
            socket.emit("login", { userId: username });
            alert('Login Success!')
            // redirect user to the auth page
            window.location.href = "/home";
        })
        .catch((error) => {
            setError(error.response.data.message)
        });
    }

    if(token) {
        return <Navigate to='/home' replace />
    }

    return (
        <div className="login-container">
            <div className="login-box centered-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <Form onSubmit={handleLogin}>
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
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <button type="submit" className="login-button">Login</button>
                </Form>
                <Link to="/signup" className="signup-button">Signup</Link>
            </div>
        </div>
    )
}