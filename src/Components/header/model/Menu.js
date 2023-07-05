import "./Menu.css";
//import SignIn from "../../signUP_signIn/SignIn";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { IconButton, TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "../../signUP_signIn/signIn";
//import SignIn from "../../signUP_signIn/signIn";


export default function Menu({ isLogIn }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    //handel model close or open
    //-------------------------------------------------------------------------
    const handleOpen = () => {
        setOpen(true);
    };
    const handleCloseMenu = () => {
        setOpen(false);
    };
    //-------------------------------------------------------------------------


    //handel control input
    //-------------------------------------------------------------------------



    //signout 
    //-------------------------------------------------------------------------
    const handelSignOut = () => {
        localStorage.removeItem("token");
        handleCloseMenu();
        navigate("/");
        window.location.reload();
    }



    //console.log(cookieValue);
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={handleOpen}
            >
                <MenuIcon style={{ fontSize: 50 }} />
            </IconButton>

            <Modal
                open={open}
                onClose={handleCloseMenu}

            // aria-labelledby="parent-modal-title"
            // aria-describedby="parent-modal-description"
            >
                <Box className='menu-modal' >
                    {/* <h2 id="parent-modal-title">Text insx={{width: 400 } a modal</h2>
                    <p id="parent-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p> */}
                    <Link to="/" style={{ textDecoration: 'none' }}  onClick={handleCloseMenu}>
                        <div >Home</div>
                    </Link>
                    {isLogIn ? <div onClick={handelSignOut}>SignOut</div> : <SignIn handleCloseMenu={handleCloseMenu} />}
                    <div>User</div>
                </Box>

                {/* <SignUP handleClos={handleClose}/> */}
            </Modal>
        </div >
    );
}