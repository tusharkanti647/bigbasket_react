
import "./ProductCard.css"
//import { addToBasket } from "../../redux_toolkit/slices/basketProductArrSlices";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, createTheme, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { basketProductCount, isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";
import Lodar from "../lodar/Lodar";
import Tostyfy from "../tostyfy/Tostyfy";






function ProductCard({ product, basketQty }) {
    const [productQty, setProductQty] = useState(1);
    const [itemNumber, setItemNumber] = useState(product.qty);
    const [isBtnDisabled, setIsBtnDisabled] = useState({addBtn: false, removeBtn: false});
    const [isLodar, setIsLodar] = useState(false);
    const [isShowTostyfy, setShowTostyfy] = useState(false);
    const [satingTostyfy, setSatingTostyfy] = useState({
        message:"",
        severity:""
    });
    //const [badgeCount, setBadgeCount] = useState(0);
    //const [isStateChange, setIsStateChange] = useState(false);
    const dispatch = useDispatch();

    //if  basketQty present then  productQty set as basketQty value
    //------------------------------------------------------------------------------
    useEffect(() => {
        if (basketQty) {
            setProductQty(basketQty);
        }
    }, [basketQty]);

    //creat link and product id
    //---------------------------------------------------------------------------------
    const id = product._id;
    const link = `/aboutproduct/${id}`;
    const token = localStorage.getItem("token");
    // const productData = useSelector((state) => state.getproduct.entities);
    // let newProductData = [];

    // if (productData.length > 5) {
    //     newProductData = [...productData]
    //     newProductData.splice(5);
    // }



    //product update 
    //------------------------------------------------------------------------------------
    //useEffect(() => {
    const basketUpdate = async () => {
        setIsLodar(true);
        const response = await fetch("https://bigbusket-api.onrender.com/basket/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },

            body: JSON.stringify({ qty: productQty })
        });
        
        if ( response.status !==200 ) {
            //console.log("hello");
            //dispatch(addToBasket({ ...product, qty: productQty }));
            setIsLodar(false);
            setSatingTostyfy({...satingTostyfy, message:"Please login first.", severity:"info"});
            setShowTostyfy(true);
            return 
        }
        if(response.status ===200){
            dispatch(isAddProductReducer(true));
            setIsLodar(false);
            setSatingTostyfy({...satingTostyfy, message:"product add to basket successfully.", severity:"success"});
            setShowTostyfy(true);
        }
        
        
        
        
    }

    //tostyfy false
    //})
    // useEffect(()=>{
    //     fetchBadge();

    //     setIsStateChange(false); 
    // },[isStateChange])

    //add product in basket
    //-------------------------------------------------------------------------
    const handelAdd = () => {
        basketUpdate();
        
    }

    //product Quantity updte
    //--------------------------------------------------------------------------------
    useEffect(() => {
        //console.log(product.titel);
        setIsBtnDisabled({...isBtnDisabled, addBtn: true, removeBtn: true});
        const hndelProductQuantity = async () => {
            //setIsLodar(true);
            const response = await fetch("https://bigbusket-api.onrender.com/quantity-update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ qty: productQty, titel: product.titel })
            })
           if( productQty>1){
            setIsBtnDisabled({...isBtnDisabled, addBtn: false, removeBtn: false});
           }else{
            setIsBtnDisabled({...isBtnDisabled, addBtn: false, removeBtn: true});
           }
            //setIsLodar(false);
        }
        hndelProductQuantity();
    }, [productQty]);

    //---------------------------------------------------------------------------------
if(isLodar){
    return(
        <Lodar />
    )
}

    return (
        <>
        {isShowTostyfy?<Tostyfy satingTostyfy={satingTostyfy} />:""}
            <Card className="card">

                <Link to={link} >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        // height="100%"
                        width="100%"
                        height="auto"
                        image={product.imgLink}
                    />
                </Link>
                <Typography sx={{ fontSize: 11, color: "#888888", }} component="div">
                    {product.category}
                </Typography>
                <CardContent sx={{ pb: "0px", pt: "1px" }}>

                    <Link to={link} >
                        <Typography sx={{ fontSize: 12 }} variant="h6" component="div">
                            {product.titel}
                        </Typography>
                    </Link>
                    <Typography sx={{ display: 'flex', color: "green", fontSize: 12, bgcolor: "#E3EBDA" }} variant="h6" className="rating" component="div">
                        <p>{product.rating}</p>
                        <StarIcon sx={{ fontSize: 12 }} />
                    </Typography>
                    <Typography sx={{ fontSize: 11, border: 'solid #888888 1px', color: "#888888" }} component="div">
                        {product.about.weight.length === 3 ? (product.about.pcs + "pcs") : (product.about.discountPrice + product.about.originalPrice)} - RS {product.discountPrice}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#888888", bgcolor: "#F4F3F2" }} component="div">
                        <del>MRP {product.originalPrice}</del> RS {product.discountPrice}
                    </Typography>
                    <Typography sx={{ display: 'flex', color: "#888888", bgcolor: "#F4F3F2" }} className="delhiver-detals" component="div">
                        {/* <div>car</div> */}
                        <LocalShippingIcon sx={{ fontSize: 40 }} />
                        <p >Standard Delivery: Tomorrow Morning</p>
                    </Typography>
                </CardContent>
                <CardActions sx={{ pt: "0px", bgcolor: "#F4F3F2" }}>
                    {basketQty ?
                        <div className="item-count">
                            <button disabled={isBtnDisabled.removeBtn} onClick={() => setProductQty(productQty - 1)}><RemoveIcon /></button>
                            <div id="quantity_input_box">{productQty}</div>
                            <button disabled={isBtnDisabled.addBtn} onClick={() => setProductQty(productQty + 1)}><AddIcon /></button>
                        </div> :
                        <>
                            <div className="nav_searchbaar">
                                <div className="search_icon">
                                    <p>Qty</p>
                                </div>
                                <input type="text" name="qty" value={productQty} onChange={(event) => setProductQty(event.target.value)} />

                            </div>
                            {/* <Button size="small">Share</Button>  name=""
                                onChange={(e) => getText(e.target.value)}*/}
                            <button className="add-to-card-button" onClick={handelAdd}>
                                <p>ADD</p>
                                <ShoppingBasketIcon />
                            </button>
                        </>}
                </CardActions>
            </Card>
        </>
    );
}

export default ProductCard;