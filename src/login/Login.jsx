import React, { useContext } from 'react'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import { Typewriter } from 'react-simple-typewriter';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Context } from '../Context';
import { Snackbar } from '@mui/material';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {

    const [open, setOpen] = React.useState(false);

    const [registerMode, setRegisterMode] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [document, setDocument] = useState();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const { user, dispatch, isFetching } = useContext(Context);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleRegister = () => {
        setRegisterMode(true);
    }

    const handleClick = () => {
        if (registerMode) {
            const register = async () => {
                const res = await axios.post('http://localhost:5500/api/user/', {
                    username: username,
                    password: password,
                    email: email
                })
            }
            register();
        }
        setRegisterMode(false);
    }

    const handleSubmit = async (Transition) => {
        try {
            const res1 = await axios.post("http://localhost:5500/api/user/login",
                {
                    username: username,
                    password: password
                }
            )
            dispatch({ type: "LOGIN_SUCCESS", payload: res1.data });
            setDocument(res1.data);
            if (res1.data === null) {
                setOpen(true);
            }
            else {
                navigate(`/home/${user?.programs[0]._id}`);
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    }

    console.log(document);

    return (
        <>
            <Player
                autoplay
                speed={1}
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_gfbc0wui.json"
                style={{ maxHeight: "100vh", maxWidth: "100vw", position: "fixed" }}
            ></Player>
            <div className="login">
                <div className="loginContainer">
                    <div className='typeWriter'>You can <Typewriter words={['write code', 'compile ', 'save', 'share']} loop cursor cursorStyle='_' />
                    </div>

                    <Player
                        autoplay
                        speed={1}
                        loop
                        src="https://assets8.lottiefiles.com/packages/lf20_t9mjd9.json"
                        style={{ height: "150px", width: "300px", marginTop: "none" }}
                    ></Player>
                    <div className="loginContainerInput">
                        {registerMode && <TextField id="outlined-basic" label="Email" variant="outlined" color="info" style={{ width: "230px" }} onChange={e => setEmail(e.target.value)} />}
                        <TextField id="outlined-basic" label="Username" variant="outlined" color="info" style={{ width: "230px" }} onChange={e => setUsername(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" style={{ width: "230px" }} onChange={e => setPassword(e.target.value)} />
                        <div>
                            {/* {registerMode && <Button variant="contained" color="info" style={{ marginRight: "10px" }} onClick={() => setRegisterMode(false)}>Login</Button>} */}
                            {registerMode && <Button variant="contained" color="warning" onClick={handleClick} >
                                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }} >
                                    Register
                                </Link>
                            </Button>}
                            {!registerMode && <Button variant="contained" color="warning" onClick={handleSubmit} >
                                <Link style={{ textDecoration: "none", color: "inherit" }} >
                                    Login
                                </Link>
                            </Button>}
                        </div>
                        {!registerMode && <p>Don't have a account ? <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleRegister}>Register</a> </p>}
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Wrong Credentials
                    </Alert>
                </Snackbar>
            </div>
        </>

    )
}

export default Login