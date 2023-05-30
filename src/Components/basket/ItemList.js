import "./ItemList.css";

import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";
import Lodar from "../lodar/Lodar";
import Tostyfy from "../tostyfy/Tostyfy";


function ItemList({ product, setBasketProductArr }) {
    const [itemNumber, setItemNumber] = useState(product.qty);
    const [isLodar, setIsLodar] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState({ addBtn: false, removeBtn: false });
    const [isShowTostyfy, setShowTostyfy] = useState(false);
    const [satingTostyfy, setSatingTostyfy] = useState({
        message: "",
        severity: ""
    });
    const dispatch = useDispatch();

    //product Quantity updte
    //--------------------------------------------------------------------------------
    useEffect(() => {
        //console.log(product.titel);
        const hndelProductQuantity = async () => {
            //setIsLodar(true);
            setIsBtnDisabled({ ...isBtnDisabled, addBtn: true, removeBtn: true });
            const response = await fetch("https://bigbusket-api.onrender.com/basket-product/quantity-update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ qty: itemNumber, titel: product.titel })
            });
            //setIsLodar(false);
            if (itemNumber > 1) {
                setIsBtnDisabled({ ...isBtnDisabled, addBtn: false, removeBtn: false });
            } else {
                setIsBtnDisabled({ ...isBtnDisabled, addBtn: false, removeBtn: true });
            }
        }
        hndelProductQuantity();
    }, [itemNumber]);


    //remove 1 product from basket
    //-----------------------------------------------------------------------------------------
    const remove1Product = async () => {
        setIsLodar(true);
        const response = await fetch("https://bigbusket-api.onrender.com/remove-product", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({ titel: product.titel })
        });
        if (response.status !== 200) {
            //console.log("hello");
            //dispatch(addToBasket({ ...product, qty: productQty }));
            setIsLodar(false);
            setSatingTostyfy({ ...satingTostyfy, message: "Please login first.", severity: "info" });
            setShowTostyfy(true);
            return
        } else {
            let data = await response.json();
            setBasketProductArr(data);
            dispatch((isAddProductReducer(true)))
            setIsLodar(false);
            setSatingTostyfy({ ...satingTostyfy, message: "Product remove from basket successfully.", severity: "warning" });
            setShowTostyfy(true);
        }
        //setIsLodar(false);
    }


    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (<>
        {isShowTostyfy ? <Tostyfy satingTostyfy={satingTostyfy} /> : ""}
        <Box className="cart-table-body">
            <Box sx={{ width: "52%" }} className="cart-table-body-left">
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <img src={product.imgLink} />
                    <div>
                        <h3>Fresho Cauliflower (Medium) / Phulcop</h3>
                        <h4>1 pc (approx. 400 to 600 g)</h4>
                    </div>
                </div>
            </Box>
            <Box className="cart-table-body-right">
                <div>
                    <h3>Rs. {product.discountPrice}</h3>
                    <h4><strike>Rs. {product.originalPrice}</strike></h4>
                </div>

                <div className="item-count">
                    <button disabled={isBtnDisabled.removeBtn} onClick={() => setItemNumber(itemNumber - 1)}><RemoveIcon /></button>
                    <div id="quantity_input_box">{itemNumber}</div>
                    <button disabled={isBtnDisabled.addBtn} onClick={() => setItemNumber(itemNumber + 1)}><AddIcon /></button>
                </div>

                <div>
                    <h3>Rs. {product.qty * product.discountPrice}</h3>
                    <CloseIcon onClick={remove1Product} id="remove-item-icon" sx={{ color: "#888888", cursor: "pointer" }} />
                    <h4 id="maximum-price"><strike>Rs. {product.qty * product.originalPrice}</strike></h4>
                </div>
                <h3>Rs. {product.originalPrice - product.discountPrice}</h3>
            </Box>
        </Box>
    </>)
}

export default ItemList;