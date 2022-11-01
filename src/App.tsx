import "./App.css";
import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Header from './components/Header';



export default function App() {
    const [waitingForOtp, setWaitingForOtp] = useState(false); // Are we waiting for an OTP? If so, show the OTP input field
    const [loading, setLoading] = useState(false); // Are we loading? If so, show a loading spinner
    const [email, setEmail] = useState(''); // The email address entered by the user
    const [token, setToken] = useState(''); // The token returned by the server
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState({
        poster: '',
        full_line: '',
        forecast: '',
    });

    const sendOTP = async () => {
        setLoading(true); // Show the loading spinner
        try {
            // TODO: finish the scheme for SDLC (re: dev vs prod)
            await axios.post(`/dev/otp`, { email });

            setWaitingForOtp(true); // Show the OTP input field

            setLoading(false); // Hide the loading spinner
        }
        catch (err) {
            console.error(err);
            setLoading(false);
            // Show a snackbar or something
            alert('Failed to send OTP');
        }

    };

    const login = async () => {
        try {
            const response = await axios.post(`/dev/otp-confirm`, { email, token });
            if (response.status === 200) {
                setAuth(true); // Show the OTP input field
                setData(response.data);
            }
            setLoading(false); // Hide the loading spinner
        }
        catch (err) {
            console.error(err);
            setLoading(false);
            // Show a snackbar or something
        }
    }

    if (loading) {
        return <div className="App">
            <img src="https://media.giphy.com/media/QCCy7ynj6LynjTCO1h/giphy.gif"></img>
            <p>Sending OTP to Email or Getting Weather</p>
        </div>
    }

    if (auth) {
        return (
            <div className="weather-container">
                <img className="weather-image" src={data.poster || "https://images.ctfassets.net/bs8ntwkklfua/5MTYDabi9XISR4rMJbUhf6/bc3dd8e30c7662aed5d8db6c6be16af7/Are_You_Here_Poster.jpg"}></img>
                <p className="weather-quote">{data.full_line || "Oh, wow. Thank you for that."}</p>
                <p className="weather-forecast">{data.forecast || "Unknown error while getting weather!"}</p>
            </div>);
    }

    if (waitingForOtp) {
        return (
            <div className="App">
                <Header />
                <p className="App-intro">
                    Enter the OTP code from your email.
                </p>
                <div>
                    <TextField
                        onInput={(e: any) => setToken(e.target.value)}
                        required
                        id="otp"
                        label="OTP from Email"
                    />
                    <br></br>
                    <br></br>
                    <Button onClick={() => login()} variant="contained">Submit</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <Header />
            <p className="App-intro">
                Enter your email address to get your weather forecast.
            </p>
            <TextField
                onInput={(e: any) => setEmail(e.target.value)}
                required
                id="email"
                label="Email Address"
            />
            <br></br>
            <br></br>
            <Button onClick={() => sendOTP()} variant="contained">Submit</Button>
        </div>
    );
}
