import "./App.css";
import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';




/**
 * Our Web Application
 */
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
            await axios.post(`/otp`, { email });

            setWaitingForOtp(true); // Show the OTP input field

            setLoading(false); // Hide the loading spinner
        }
        catch (err) {
            console.error(err);
            setLoading(false);
            // Show a snackbar or something
        }

    };

    const login = async () => {
        try {
            const response = await axios.post(`/otp-confirm`, { email, token });
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
        return <div className="App">
            <header className="App-header">
                <h1 className="App-title">Owen Wilson Weather Generator</h1>
            </header>
            <div className="weather-container">
                <img className="weather-image" src={data.poster}></img>
                <p className="weather-quote">{data.full_line}</p>
                <p className="weather-forecast">{data.forecast}</p>
            </div>
        </div>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Owen Wilson Weather Generator</h1>
            </header>
            {!waitingForOtp ? <> <p className="App-intro">
                Enter your email address to get your weather forecast.
            </p>
                <TextField
                    onInput={(e: any) => setEmail(e.target.value)}
                    required
                    id="outlined-required"
                    label="Email Address"
                />
                <br></br>
                <br></br>
                <Button onClick={() => sendOTP()} variant="contained">Submit</Button></> : <>
                <div>
                    <TextField
                        onInput={(e: any) => setToken(e.target.value)}
                        required
                        id="outlined-required"
                        label="OTP from Email"
                    />
                    <Button onClick={() => login()} variant="contained">Submit</Button>
                </div>

            </>}

        </div>
    );
}
