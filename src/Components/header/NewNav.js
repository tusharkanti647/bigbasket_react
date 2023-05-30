
import { Box, IconButton, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import "./NewNav.css"
import logo from "../../image/logo1.jpg";
import Menu from "./model/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { basketProductCount, searchNameReducer, isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";
//import Lodar from "../lodar/Lodar";


function NewNav() {
    const [badgeCount, setBadgeCount] = useState(0);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [isLodar, setIsLodar] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const ischeck = useSelector((state) => state.functionSlices.isAddProduct);
    const navigate = useNavigate();


    const basketProductArr = useSelector((state) => state.basketProductArr);
    //let badgeCount = useSelector((state) => state.functionSlices)
    let basketBadgeCount;


    basketBadgeCount = basketProductArr.length;


    //despatch sarch data to the redux toolkit
    //-------------------------------------------------------------------------
    const handelSearchData = () => {
        dispatch(searchNameReducer(searchInputValue));
        navigate("/products")
    }

    //fetch badge count
    //-------------------------------------------------------------------------
    const fetchBadge = async () => {
        //setIsLodar(true);
        const response = await fetch("https://bigbusket-api.onrender.com/basket_badge/count", {
            method: "GET",
            headers: {
                Authorization: token,
            }
        });
        if (response.statusText !== "Unauthorized") {
            const data = await response.json();
            dispatch(isAddProductReducer(false));
            setBadgeCount(data.badgeContent);
            setIsLogIn(true);
        }
        //setIsLodar(false);
    }

    useEffect(() => {
        fetchBadge();
    }, [ischeck]);

    // if(isLodar){
    //   return (
    //     <Lodar />
    //   )
    // }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <header>
                <nav>
                    <div className="left">
                        <div className="navlogo" >
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { sm: 'block' } }}
                            >
                                <img src={logo} alt='logo' />
                            </Typography>
                            <span className='logo_div' style={{ display: "flex", flexDirection: 'column' }}>
                                <Box className="logo_text" sx={{ color: "red" }} >big</Box>
                                <Box className="logo_text" sx={{ color: "black" }}>basket</Box>
                            </span>
                        </div>

                        <div className="nav_searchbaar">
                            {/* <input type="text" name=""
            onChange={(e) => getText(e.target.value)}
            placeholder="Search Your Products" />
          <div className="search_icon">
            <i className="fas fa-search" id="search"></i>
          </div> */}



                            <input type="text" name=""
                                onChange={(e) => setSearchInputValue(e.target.value)}
                                placeholder="Search Your Products" />

                            <IconButton sx={{ m: "0", p: "0" }}>
                                <SearchIcon onClick={handelSearchData} id="search_icon" />
                            </IconButton>
                        </div>

                    </div>

                    <div className="right">

                        <Menu isLogIn={isLogIn} />

                        <Link to="/basket" >
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                //onClick={handleProfileMenuOpen}
                                color="black"
                            >
                                <Badge badgeContent={badgeCount > 0 ? badgeCount : null} color="error">
                                    <ShoppingCartIcon style={{ fontSize: 50 }} />
                                </Badge>
                            </IconButton>
                        </Link>
                    </div>
                </nav>

                <div className="nav_searchbaar nav_searchbaar_down">

                    <input type="text" name=""
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                        placeholder="Search Your Products" />

                    <IconButton sx={{ m: "0", p: "0" }}>
                        <SearchIcon onClick={handelSearchData} id="search_icon" />
                    </IconButton>
                </div>

            </header>
        </div>
    )
}

export default NewNav;