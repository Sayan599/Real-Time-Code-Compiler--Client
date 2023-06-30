import React, { useContext } from 'react'
import './logout.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';


function Logout() {

    const { user, dispatch, isFetching } = useContext(Context);

    const handleLogout = () => {
        dispatch({type:"LOGOUT"});
    }
    return (
        <div className="logout">
            <div className="logoutContainer">
                <Avatar
                    alt="Remy Sharp"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    sx={{ width: 60, height: 60 }}
                />
            </div>
            <ul className="logoutOptions" style={{ color: "black" }}>
                <li style={{ borderTop: "1px solid lightgrey" }}><ChangeCircleIcon /><span>Update</span></li>
                <li>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={handleLogout} >
                        <LogoutIcon />
                        <span>Logout</span>
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default Logout