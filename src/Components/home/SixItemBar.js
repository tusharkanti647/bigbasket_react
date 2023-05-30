import { Box} from "@mui/material"
import { Link } from "react-router-dom";
import "./SixItemBar.css"


function SixItemBar({ header, arr }) {
    //console.log(arr);
    return (<Box className="main"  >
        <Box mt={5} sx={{ fontSize: 25 }}>{header}</Box>
        <div className="sixItem">
            <Link to="/products">
                <img src={arr[0]} alt="" />
            </Link>
            <Link to="/products">
                <img src={arr[1]} alt="" />
            </Link>
            <Link to="/products">
                <img src={arr[2]} alt="" />
            </Link>
            <Link to="/products">
                <img src={arr[3]} alt="" />
            </Link>
            <Link to="/products">
                <img src={arr[4]} alt="" />
            </Link>
            <Link to="/products">
                <img src={arr[5]} alt="" />
            </Link>
        </div>
    </Box >)
}

export default SixItemBar