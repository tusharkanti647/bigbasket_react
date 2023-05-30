import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
//import Sidebar from "./sidebar/Sidebar";
//import ProductCard from "../card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
//import { fetchProductData } from "../../redux_toolkit/slices/getProduvtSlices";
import { useEffect, useState } from "react";
//import { useFetch } from "../../survices/getapi";
import "./ProductPage.css";
//import Lodar from "../lodar/Lodar";
import ProductCard from "../../card/ProductCard";
import Lodar from "../../lodar/Lodar";


function ProductPage() {
    const [sortInputValue, setSortInputValue] = useState("");
    //const [filterDataArr, setFilterDataArr] = useState([{ name: "fish", isChecked: false }, { name: "borges", isChecked: false }, { name: "fresho", isChecked: false }, { name: "Dhara", isChecked: false }]);
    //const [filters, setFilters]=useState([]);
    const [newProductData, setNewProductData] = useState([]);
    const [basketProductArr, setBasketProductArr] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    //const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLodar, setIsLodar] = useState(false);
    const [isNextPagePresent, setIsNextPagePresent] = useState(false);
    const searchName = useSelector((state) => state.functionSlices.searchName);
    let filters = useSelector((state) => state.functionSlices.filterArr);
    const ischeck = useSelector((state) => state.functionSlices.isAddProduct);

    //let { isLoading, serverError, apiData } = useFetch("http://localhost:8000/addproduct");
    //let newProductData = [];
    //console.log(apiData);
    
    useEffect(() => {
//console.log(filterDataArr);
        try {
            const fatchFun = async () => {
                setIsLodar(true);
                setIsNextPagePresent(false);
                let uid = "https://bigbusket-api.onrender.com/products-search";
                let querySearchString = "";

                querySearchString = searchName ? querySearchString + "searchName=" + searchName : querySearchString;
                querySearchString = sortInputValue ? (querySearchString ? querySearchString + "&&sortQue=" + sortInputValue : querySearchString + "sortQue=" + sortInputValue) : querySearchString;
                querySearchString = querySearchString ? querySearchString + "&&page=" + pageNumber : querySearchString + "page=" + pageNumber;
                if (filters) {


                    filters = filters.join("+");

                    querySearchString = querySearchString ? querySearchString + "&&filters=" + filters : querySearchString + "filters=" + filters;

                }
                //querySearchString=filters ? (querySearchString ? querySearchString + "&&filters=")

                if (querySearchString) {
                    uid = `${uid}?${querySearchString}`;
                    //console.log(uid);
                    const respons = await fetch(uid);
                    const data = await respons.json();
                    //console.log(data.data);
                    setNewProductData([...data.data]);
                    setIsNextPagePresent(data.isNextPagePresent);
                } else {
                    //uid = `http://localhost:8000/products-search`;

                    const respons = await fetch(uid);
                    const data = await respons.json();
                    //console.log(data.data);
                    console.log(data.isNextPagePresent)
                    setNewProductData([...data.data]);
                    setIsNextPagePresent(data.isNextPagePresent);
                }
            setIsLodar(false);

                // if (sortInputValue) {
                //     let sortQua = sortInputValue.split(" ").join("+");
                //     uid = `http://localhost:8000/products-search?sortQue=${sortQua}`;
                //     //console.log(uid);
                //     const respons = await fetch(uid);
                //     const data = await respons.json();
                //     //console.log(data.data);
                //     setNewProductData([...data.data]);
                // }else{
                //     uid = `http://localhost:8000/products-search`;
                //     //console.log(uid);
                //     const respons = await fetch(uid);
                //     const data = await respons.json();
                //     //console.log(data.data);
                //     setNewProductData([...data.data]);
                // }
            }
            fatchFun();
        } catch (e) {
            console.log(e);
        }

    }, [sortInputValue, searchName, filters, pageNumber])

    //const { isLoading, serverError, apiData } = useFetch("http://localhost:8000/addproduct");
    //console.log(apiData);

    //let newProductData = [];

    useEffect(() => {
        const fetchFun = async () => {
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
                setBasketProductArr([...data])
            }
            //setIsLodar(false);
        }
        fetchFun();
    }, [ischeck])

    //cart product present or not
    //-----------------------------------------------------------------
    const findCartProduct = (product) => {
        return basketProductArr.find((ele) => ele._id === product._id);
    }


    if(isLodar){
        return(
            <Lodar />
        )
    }

    return (
        // <Box className="product-page">
        //     <Box sx={{ width: "95%", display: "flex", }}>
        //         <Sidebar filterDataArr={filterDataArr} setFilterDataArr={setFilterDataArr} filters={filters} setFilters={setFilters} />


                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, }}>
                    <FormControl sx={{ width: 250, marginRight: 0, marginLeft: "2%", marginBottom: "30px" }}>
                        <InputLabel id="select-filter">Short By</InputLabel>
                        <Select
                            defaultValue="popularity"
                            labelId="select-filter"
                            id="demo-simple-select"
                            value={sortInputValue}
                            label="Short By"
                            onChange={(e) => setSortInputValue(e.target.value)}
                        >
                            <MenuItem value="rating -1">Popularity</MenuItem>
                            <MenuItem value="discountPrice 1">Price - Low to High</MenuItem>
                            <MenuItem value="discountPrice -1">Price - High to Low</MenuItem>
                        </Select>
                    </FormControl>


                    <Box  className="card-contaner">
                        {newProductData.map((product, ind) => findCartProduct(product) ? <ProductCard key={ind} basketQty={findCartProduct(product).qty} product={product} /> : <ProductCard key={ind} product={product} />)}
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"space-around"}}>
                        {pageNumber>1 ? <Button onClick={() => setPageNumber(pageNumber - 1)}  variant="contained" color="success">Previous</Button> : ""} 
                        {isNextPagePresent ? <Button onClick={() => setPageNumber(pageNumber + 1)} variant="contained" color="success">Next</Button> : "" }
                    </Box>

                </Box>
        //     </Box>
        // </Box>
    )
}

export default ProductPage;