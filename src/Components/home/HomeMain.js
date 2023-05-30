

import "./HomeMain.css"
//import { addToBasket, removeFromBasket, clearBasket } from "../../redux_toolkit/slices/basketProductArrSlices"

import topMeetBanner from "../../image/banner/topMeet.webp"
import ayurveda from "../../image/offerBar/ayurveda.webp"
import byeMoreSaveMore from "../../image/offerBar/bye-more-save-more.webp"
import comboStore from "../../image/offerBar/combo-store.webp"
import dealsOfTheDay from "../../image/offerBar/deals-of-the-day.webp"
import eggsMeat from "../../image/offerBar/Eggs-meat.webp"
import newPass from "../../image/offerBar/newPass.webp"
import american from "../../image/bank/american.jpg"
import city from "../../image/bank/city.jpg"
import induslnd from "../../image/bank/induslnd.jpg"
import kotak from "../../image/bank/kotak.jpg"


import { Box, grid } from "@mui/system"
import { Grid } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
//import Footer from "../footer/Footer"
import SixItemBar from "./SixItemBar"
import BannerSlid from "./BannerSlid"
import ProductCard from "../card/ProductCard"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchProductData } from "../../redux_toolkit/slices/getProduvtSlices"
import { useFetch } from "../../survices/getapi"
import Lodar from "../lodar/Lodar"


const Beauty = ["https://www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/19d8368c-64c9-422f-96fd-2b88fb5fec13/hp_beauty-makeup-splash_m_250223_01.jpg",
    "https://www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/19d8368c-64c9-422f-96fd-2b88fb5fec13/hp_beauty-summer-lotions_m_250223_02.jpg",
    "https://www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/19d8368c-64c9-422f-96fd-2b88fb5fec13/hp_beauty-scentful_m_250223_03.jpg",
    "https://www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/19d8368c-64c9-422f-96fd-2b88fb5fec13/hp_beauty-shaving_m_250223_04.jpg",
    "https://www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/19d8368c-64c9-422f-96fd-2b88fb5fec13/hp_beauty-min-30_m_250223_05.jpg",
    "https://www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/19d8368c-64c9-422f-96fd-2b88fb5fec13/hp_beauty-under-199_m_250223_06.jpg"]
function HomeMain() {
    const [productQty, setProductQty] = useState(1);
    const [basketProductArr, setBasketProductArr] = useState([]);
    const [isLodar, setIsLodar] = useState(false);
    const ischeck = useSelector((state) => state.functionSlices.isAddProduct);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    //const apiLink = process.env.APILINK;

    const { isLoading, serverError, apiData } = useFetch("https://bigbusket-api.onrender.com/addproduct");

    let newProductData = [];
    if (apiData) {
        newProductData = [...apiData];
        newProductData.splice(5);
    }
//console.log(apiLink);
    useEffect(() => {
        const fetchFun = async () => {
            //console.log("tu");
            //setIsLodar(true);
            const response = await fetch("https://bigbusket-api.onrender.com/basket", {
                method: "GET",
                headers: { Authorization: localStorage.getItem("token") }
            });
            if (response.statusText === "Unauthorized") {

                //navigate("./");
                //return;
            } else {
                const data = await response.json();
                //console.log(data);
                setBasketProductArr(data)
            }
            //setIsLodar(false);
        }
        //if (ischeck) {
            fetchFun();
       // }
    }, [ischeck])

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchProductData());
    // }, [dispatch]);

    //cart product present or not
    //-----------------------------------------------------------------
    const findCartProduct = (product) => {
        return basketProductArr.find((ele) => ele._id === product._id); 
    }
    //console.log(basketProductArr);
    // if(isLodar){
    //     return (<Lodar />);
    // }
    return (<>

        <img src={topMeetBanner} alt="meet Offer" id="topMeetBaner" />


        <Box className="home-main">
            <Box className="home-card-contener">
                {newProductData.map((product, ind) => {
                    return (findCartProduct(product) ? <ProductCard key={ind} basketQty={findCartProduct(product).qty} product={product} /> : <ProductCard key={ind} product={product} />)
                })}

            </Box>
            <div className="top-bar">
                <img src={ayurveda} alt="ayurveda" />
                <img src={newPass} alt="newPass" />
                <img src={eggsMeat} alt="eggs Meat" />
                <img src={dealsOfTheDay} alt="deals Of The Day" />
                <img src={comboStore} alt="combo Store" />
                <img src={byeMoreSaveMore} alt="bye More Save More" />

            </div>
            <Box mt={5} sx={{ fontSize: 25 }}>Bank Offers</Box>
            <Grid className="bank" container
                direction="row"
                justifyContent="space-between"
                alignItems="center" width="95%" >
                <img src={american} alt="american" />
                <img src={city} alt="city" />
                <img src={induslnd} alt="induslnd" />
                <img src={kotak} alt="kotak" />
            </Grid>
        </Box>

        <SixItemBar header="Beauty & Hygiene" arr={Beauty} />

        <BannerSlid />

    </>)
}
export default HomeMain;