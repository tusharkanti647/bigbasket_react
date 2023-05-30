
import "./AboutProduct.css"

import { border, Box, display } from "@mui/system";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { colors } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

//import { useFetch } from "../../survices/getapi";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";
import Tostyfy from "../tostyfy/Tostyfy";
//import Lodar from "../lodar/Lodar";



// let discountPrice, originalPrice
// let price


function AboutProduct() {
    const [checked, setChecked] = useState(false);
    const [oneProductData, setOneProductData] = useState({});
    const [productQty, setProductQty] = useState(1);
    const [basketProductArr, setBasketProductArr] = useState([]);
    const [basketOneProduct, setBasketOneProduct] = useState(null);
    const [isLodar, setIsLodar] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState({addBtn: false, removeBtn: false});
    const [isShowTostyfy, setShowTostyfy] = useState(false);
    const [satingTostyfy, setSatingTostyfy] = useState({
        message:"",
        severity:""
    });
    const ischeck = useSelector((state) => state.functionSlices.isAddProduct);
    const dispatch = useDispatch();

    const { id } = useParams();

    // const { isLoading, serverError, apiData }=useFetch(`http://localhost:8000/addproduct/${id}`);
    // console.log(apiData);

    //get the basket product from server
    //----------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {
            //setIsLodar(true)
            const response = await fetch("https://bigbusket-api.onrender.com/basket", {
                method: "GET",
                headers: { Authorization: localStorage.getItem("token") }
            });
            if (response.statusText === "Unauthorized") {

                
            } else {
                const data = await response.json();
                setBasketProductArr([...data])
            }
            //setIsLodar(false);
        }
        fetchFun();
    }, [ischeck])

    //get one product from the server
    //----------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLodar(true);
                const response = await fetch(`https://bigbusket-api.onrender.com/addproduct/${id}`);
                const data = await response.json();
                setOneProductData({ ...data });
                setIsLodar(false);
            } catch (error) {
            setIsLodar(false);
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    //check the product is present in the cart or not and set product qty
    //---------------------------------------------------------------------
    useEffect(() => {
        let basketOneProduct1 = basketProductArr.find((ele) => oneProductData._id === ele._id);
        if (basketOneProduct1) {
            setBasketOneProduct(basketOneProduct1);
            setProductQty(basketOneProduct1.qty);
        }
    }, [ischeck, basketProductArr]);


    //product Quantity updte
    //--------------------------------------------------------------------------------
    useEffect(() => {
        //console.log(product.titel);
        const hndelProductQuantity = async () => {
            //setIsLodar(true);
            setIsBtnDisabled({...isBtnDisabled, addBtn:true, removeBtn:true});
            const response = await fetch("https://bigbusket-api.onrender.com/basket-product/quantity-update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ qty: productQty, titel: basketOneProduct.titel })
            });
            //setIsLodar(false);
            if(productQty>1){
            setIsBtnDisabled({...isBtnDisabled, addBtn:false, removeBtn:false});
            }else{
                setIsBtnDisabled({...isBtnDisabled, addBtn:false, removeBtn:true});
            }
        }
        if (basketOneProduct) {
            hndelProductQuantity();
        }
    }, [productQty, basketOneProduct]);

    //product update 
    //------------------------------------------------------------------------------------
    const basketUpdate = async () => {
        setIsLodar(true);
        const response = await fetch("https://bigbusket-api.onrender.com/basket/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
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

    //add product in basket
    //-------------------------------------------------------------------------
    const handelAdd = () => {
        basketUpdate();
        //dispatch(isAddProductReducer(true));
    }

    //handel the input
    //-------------------------------------------------------------------
    const handleChange = (event) => {
        setProductQty(event.target.value);
    }

    //off calculating
    //------------------------------------------------------------------------------------------------------
    let off = 0;
    if (oneProductData.originalPrice) {
        off = ((oneProductData.originalPrice - oneProductData.discountPrice) / oneProductData.originalPrice) * 100;
        off=off.toFixed(2);
    }

    //  console.log(oneProductData.about.weight[1])
    // const arr=[...oneProductData.price]
    // console.log(arr)
    // //console.log(arr[0])
    // if(oneProductData.price){
    // oneProductData.price && console.log(oneProductData.about.weight[1]);
    // }


    // if(isLodar){
    //     return(
    //         <Lodar />
    //     )
    // }
    return (

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }} className="About-product-main">
            {isShowTostyfy?<Tostyfy satingTostyfy={satingTostyfy} />:""}
            <Box sx={{ width: "95%", display: "flex" }} className="upperPart">
            
                <Box sx={{ width: "25%", borderRight: "solid 0.5px #888888", color: "#888888" }} className="sidebar-category">
                    <Box>
                        <h4> Category</h4>
                        <p>
                            Fruits & Vegetables <br />
                            Fresh Vegetables<br />
                            Beans, Brinjals & Okra<br />
                            Cabbage & Cauliflower<br />
                            Cucumber & Capsicum<br />
                            Gourd, Pumpkin, Drumstick<br />
                            Leafy Vegetables<br />
                            Potato, Onion & Tomato<br />
                            Root Vegetables<br />
                            Specialty<br />
                        </p>
                    </Box>
                    <Box>
                        <h4>Brands</h4>
                        <p>
                            Fresho<br />
                            Fresho Potato, Onion & Tomato
                        </p>
                    </Box>
                </Box>

                {/* ---------------------------------------------------------------------------- */}
                <img src={oneProductData.imgLink} alt="" />
                

                {/* ------------------------------+ ", "+ oneProductData.about.weight}---------------------------------------------- */}
                {oneProductData.originalPrice && (
                    <Box className="upperPart-right" sx={{ ml: "20px" }}>
                        <p>Fresho</p>
                        <h4>{oneProductData.titel}</h4>

                        <Box>

                            <p><del>MRP:{oneProductData.originalPrice}</del></p>
                            <h4 id="price">Price:Rs {oneProductData.discountPrice} <span>({oneProductData.about.weight.length === 3 ? ((oneProductData.discountPrice / oneProductData.about.pcs) + "/pcs") : ((oneProductData.discountPrice / oneProductData.about.weight[1]) + "/" + oneProductData.about.weight[0])})</span></h4>
                            <p><span>You Save:{off}%</span> <br />
                                (Inclusive of all taxes)
                            </p>
                            <div style={{ margin: "10px" }}>
                                <p className="aboutProduct-rating" style={{ color: "#84c225" }}>{oneProductData.rating}<StarIcon sx={{ fontSize: "15px" }} /> </p>
                            </div>
                            {/* <div className="aboutProduct-button-wrapper">

                                <input type="number" value={productQty} onChange={handleChange} />
                                <button className="aboutProduct-add-button">ADD TO BASKET</button>
                                <button className="aboutProduct-save-button">SAVE</button>
                            </div> */}
                            {basketOneProduct ? (<div className="aboutProduct-button-wrapper">

                                <div className="item-count">
                                    <button disabled={isBtnDisabled.removeBtn} onClick={() => setProductQty(productQty - 1)}><RemoveIcon /></button>
                                    <div id="quantity_input_box">{productQty}</div>
                                    <button disabled={isBtnDisabled.addBtn} onClick={() => setProductQty(productQty + 1)}><AddIcon /></button>
                                </div>
                                <button className="aboutProduct-save-button">SAVE</button>
                            </div>) :
                                (<div className="aboutProduct-button-wrapper">

                                    <input type="number" value={productQty} onChange={handleChange} />
                                    <button className="aboutProduct-add-button" onClick={handelAdd}>ADD TO BASKET</button>
                                    <button className="aboutProduct-save-button">SAVE</button>
                                </div>)}
                        </Box>

                        <p id="delhivery-time">
                            <LocalShippingIcon /> Standard: Today Evening
                        </p>

                        <h4>Pack Sizes</h4>
                        <Box onClick={() => setChecked(!checked)} className="product-weight-value-slect">
                            <div id="aboutProduct-price-contaner" style={{ backgroundColor: checked ? "#E6F3D3" : "" }} >
                                <div>{oneProductData.about.weight.length === 3 ? (oneProductData.about.pcs + "pcs") : (oneProductData.about.weight[1] + oneProductData.about.weight[0])}</div>
                                <div>
                                    <span>Rs {oneProductData.discountPrice}</span> <span>MRP: <del>{oneProductData.originalPrice}</del></span> <span>{off}% Off</span>
                                </div>
                            </div>
                            {/* <label>
                            <input value={["2kg", 38]} type="checkbox" />
                            <span class="checkmark"></span>
                        </label> */}
                            <label className="container">
                                <input value={["2kg", 38]} type="checkbox" checked={checked} onChange={(event) => { console.log(event.target.value) }} />
                                <span className="checkmark"></span>
                            </label>
                        </Box>
                    </Box>
                )}



            </Box>


            {/* ---------------------------------------------------------------------------- */}
            {oneProductData.price && (
                <Box sx={{ width: "95%", }} className="lowerPart">
                    <div>
                        <h4>{oneProductData.titel}</h4>
                    </div>
                    <Box className="product-about-section" sx={{ borderBottom: "solid 0.5px #888888", color: "#888888" }}>
                        <h3>About the Product</h3>
                        <p>
                            {oneProductData.about.describtion}
                        </p>
                    </Box>
                </Box >
            )}

        </Box>
    )
}

export default AboutProduct;