import axios from 'axios'
import React, { useContext, useEffect, useImperativeHandle, useState } from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useLocation } from 'react-router-dom';
import { Context } from '../../Context';

function Sidebar({ reloader, changer, trigger }) {
    const [title, setTitle] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const location = useLocation();
    const [click, setClick] = useState(false);

    const { user, dispatch, isFetching } = useContext(Context);


    useEffect(() => {
        const fetch = async () => {
            const res = await axios.post("http://localhost:5500/api/program/userprogs/", { Id: user?._id });
            setTitle(res.data.programs);
        }
        fetch();
    }, []);

    const refetch = async () => {
        try {
            const res = await axios.post("http://localhost:5500/api/program/userprogs/", { Id: user?._id });
            setTitle(res.data.programs);
        }
        catch(err){
        }
    }

    //console.log(user?._id);

    useEffect(() => {
        if (trigger) {
            //console.log("Hello world");
            const fetch = async () => {
                const res = await axios.post("http://localhost:5500/api/program/userprogs", { Id: user?._id });
                setTitle(res.data.programs);
            }
            fetch();
        }
    }, [trigger]);

    const handleNewFile = () => {
        setTitle([...title, {
            title: "",
            code: "//Write your code here",
            uniqueId: user._id,
        }])
    }

    const handleSubmit = (event, i) => {
        const save = async () => {
            if (event.key === 'Enter') {
                const data = [...title];
                data[i].title = newTitle;
                setTitle(data);
                const res = await axios.post('http://localhost:5500/api/program', title[i]);
                reloader(res.data._id);
                refetch();
            }
        }
        save();

    }

    const handleCross = (event, i) => {
        const newPeople = title?.filter((person) => person.title !== "");
        setTitle(newPeople);
    }

    return (
        <div className="sidebar">
            <div className="sidebarContent">
                <div className="sidebarContentHeader">
                    <div >FILES</div>
                    <NoteAddIcon style={{ fontSize: "21px", cursor: "pointer" }} onClick={handleNewFile} />
                </div>
                <ul className="sidebarContentList">
                    {title.map((e, i) =>
                    (
                        <>
                            <NavLink key={e._id} className='sidebarContentListItem nav' to={`/home/${e._id}`} style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                {e.title ?
                                    <li key={i} className='' >
                                        {e.title}
                                    </li> : (<><input autoFocus type="text" className="sidebarContentListInput" onChange={(e) => setNewTitle(e.target.value)}
                                        onKeyDown={e => handleSubmit(e, i)}></input>
                                        <CancelIcon className="crossButton" style={{ fontSize: "20px" }} onClick={e => handleCross(e, i)} />
                                    </>
                                    )
                                }
                                {e.title && <ArrowForwardIosIcon key={i} style={{ fontSize: "15px" }} />}
                            </NavLink>
                        </>)
                    )}
                </ul>
            </div>
        </div >
    )
}

export default Sidebar