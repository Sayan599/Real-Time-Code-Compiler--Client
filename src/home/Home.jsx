import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import './home.css'
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Button from '@mui/material/Button';
import SelectSmall from '../components/select/SelectSmall';
import InputSlider from '../components/slider/InputSlider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TextField } from '@mui/material';
import Logout from '../components/logout/Logout';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loader from '../components/loader/Loader';
import { Context } from '../Context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Home() {

    const [open, setOpen] = React.useState(false);

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState();
    const [lang, setLang] = useState("c");
    const [fontSize, setFontSize] = useState(16);
    const [fontSizeConsole, setFontSizeConsole] = useState(15);
    const [theme, setTheme] = useState("vs-dark");
    const [input, setInput] = useState(false);
    const [inputData, setInputData] = useState("");
    const [hover, setHover] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [changer, setChanger] = useState("");

    const [document, setDocument] = useState();
    const [trigger, setTrigger] = useState(0);

    const { user, dispatch, isFetching } = useContext(Context);


    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`http://localhost:5500/api/program/user/${user?._id}`);
            var ext = res?.data.title.split(".")[1];
            setCode(res?.data.code);
            setDocument(res?.data);
            setTitle(res?.data.title);

            if (res?.data.title.split(".")[1] === "py") {
                ext = "python";
            }
            setLang(ext);
        }
        fetch();
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`http://localhost:5500/api/program/${path}`);
            var ext = res?.data.title.split(".")[1];
            setCode(res?.data.code);
            setDocument(res?.data);
            setTitle(res?.data.title);

            if (res?.data.title.split(".")[1] === "py") {
                ext = "python";
            }
            setLang(ext);
        }
        fetch();
    }, [location.pathname])

    const refetch = (data) => {
        console.log(data);
        const fetch = async () => {
            const res = await axios.get(`http://localhost:5500/api/program/${data}`);
            console.log(res.data.title.split(".")[1]);
            setCode(res.data.code);
            setDocument(res.data);
        }
        fetch();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const languages = [
        {
            name: "C++",
            data: "c"
        },
        {
            name: "C",
            data: "c"
        },
        {
            name: "Java",
            data: "java"
        },
        {
            name: "Python",
            data: "python"
        }
    ]
    const colorTheme = [
        {
            name: "Vs-dark",
            data: "vs-dark"
        },
        {
            name: "Light",
            data: "light"
        },
        {
            name: "High contrast black",
            data: "hc-black"
        },
        {
            name: "High contrast white",
            data: "hc-light"
        }
    ]
    const options = {
        fontSize: fontSize
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post(`http://localhost:5500/code/${lang}`,
            {
                code: code,
                input: inputData
            });
        setAnswer(res.data);
    };

    const handleSave = async () => {
        const res = await axios.put(`http://localhost:5500/api/program/update/${user._id}`, {
            Id: document._id,
            title: title,
            code: code
        })
        setOpen(true);
        setTrigger((trigger) => trigger + 1);
    }

    const handleDelete = async () => {
        const res = await axios.delete(`http://localhost:5500/api/program/delete/${document._id}`);
        setTrigger((trigger) => trigger + 1);
        setCode("");
        setTitle("");
    }

    return (
        <div className="pageContainer" >
            <Sidebar reloader={refetch} changer={setChanger} trigger={trigger} />
            <div className="App">
                <div className="AppHeader" >
                    <div className='codeHeader'>Realtime Code Editor</div>
                    <div style={{ display: "flex" }}>
                        Hi,{user?.username}
                        <KeyboardArrowDownIcon style={{ cursor: "pointer" }} onClick={() => setHover(!hover)} />
                        {hover && <Logout />}
                    </div>
                </div>
                <div className="rightContainer">
                    <div className='Container'>
                        <div className="code">
                            <div className="codeControl">
                                <div className='codeControlContainer'>
                                    <SelectSmall handleChange={setTheme} value={theme} languages={colorTheme} label={"Theme"} />
                                    <InputSlider value={fontSize} handler={setFontSize} />
                                </div>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} ></input>
                                <div className="codeTitle">Codefield</div>
                            </div>
                            <Editor
                                className='editorOptions'
                                options={options}
                                value={code}
                                height="79.5vh"
                                width="56vw"
                                theme={theme}
                                language={lang}
                                defaultLanguage="python"
                                defaultValue="# Enter your code here"
                                onChange={(value) => { setCode(value) }}
                                loading={<Loader />}
                            />
                        </div>
                        <div className="console">
                            <div className="consoleControl">
                                <InputSlider value={fontSizeConsole} handler={setFontSizeConsole} />
                                <div className="consoleHeader">Console</div>
                            </div>
                            <textarea disabled="true" className="consoleArea" style={{ fontSize: `${fontSizeConsole}px` }} placeholder={answer}></textarea>
                            <div className="roomBox">
                                <label for="roomId" style={{marginBottom:"20px",letterSpacing:"2px"}}>Room Id : </label>
                                <input type="number" ></input>
                                 <Button type="submit" variant="contained" style={{ backgroundColor: "green" }}>
                                    JOIN ROOM
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="codeBtn">
                        <div className="codeBtnContainer">
                            <Button className="submit" type="submit" variant="contained" onClick={handleSubmit} style={{ backgroundColor: "#DF0050" }}>
                                Compile
                            </Button>
                            <label for="cars">Choose a Programming Language : </label>
                            <SelectSmall handleChange={setLang} value={lang} languages={languages} label={"Lang"} />
                            <Button className="submit" type="submit" variant="contained" onClick={handleSave} style={{ backgroundColor: "green" }}>
                                Update
                            </Button>
                            <Button className="submit" type="submit" variant="contained" onClick={handleDelete} style={{ backgroundColor: "blue" }}>
                                Delete
                            </Button>
                        </div>
                        {input && (
                            <div className="codeInputs">
                                <div >Inputs</div>
                                <textarea style={{ fontSize: `${fontSizeConsole}px` }} onChange={(e) => setInputData(e.target.value)}></textarea></div>)}
                        <i className="codeBtnInput fa-solid fa-keyboard" onClick={() => setInput(!input)}></i>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Saved successfully
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Home

{/* <select className="codeControlDrop" onChange={e => setTheme(e.target.value)} placeholder={theme}>
<option value="vs-dark">Vs-dark</option>
<option value="light">Light</option>
<option value="hc-black">High contrast black</option>
<option value="hc-light">High contrast white</option>
</select> */}

{/* <select className='codeSelector' name="cars" id="cars" onChange={e => setLang(e.target.value)}>
    <option value="c">C</option>
    <option value="c">C++</option>
    <option value="python">python</option>
    <option value="java">Java</option>
</select> */}