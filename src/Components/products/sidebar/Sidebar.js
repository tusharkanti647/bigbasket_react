import { memo, useEffect, useState } from "react";
import "./Sidebar.css";
import { Box, createTheme, Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import { filterArrReducer } from "../../../redux_toolkit/slices/functionSlices";

function Sidebar() {
    const [filterDataArr, setFilterDataArr] = useState([{ name: "fish", isChecked: false }, { name: "borges", isChecked: false }, { name: "fresho", isChecked: false }, { name: "Dhara", isChecked: false }]);
    //const [filterArr, setFilterArr] = useState([]); 
    const dispatch = useDispatch();

// useEffect(()=>{
//     if(filterss.length > 0) {
//         setFilterDataArr(filterss)
//     }
//},[filterss])
    
    //console.log(inp); ele.name === name ? { ...ele, isChecked: true, r:"r" } : ele
    const handelChekBox = (event) => {
        const { checked, name } = event.target;
        //console.log(name);
        console.log(filterDataArr);
        let newArr = filterDataArr.map((ele) => ele.name === name ? { ...ele, isChecked: checked } : ele)
            // let e={...ele}
            // if (ele.name === name) {
            //     //console.log(e);
            //     e = { ...ele, isChecked: checked }
            // }
            // console.log(e);
            // return e;
        //});
        console.log(newArr);
       let arr = newArr.filter((ele) => ele.isChecked === true).map((ele) => ele.name);

        console.log(arr);
        setFilterDataArr([...newArr]);
        //setFilters(arr);
        //dispatch(isAddProductReducer(true));
        dispatch(filterArrReducer(arr));
        
    }
    console.log(filterDataArr);


    return (
        <Box sx={{ width: "25%", borderRight: "solid 0.5px #888888", color: "#888888" }} className="sidebar-category">
            
            <Box>
                <h4> Category</h4>
                {filterDataArr.map((ele, ind) => (
                        <p key={ind}>
                            <label className="label">
                                <input type="checkbox" name={ele.name} checked={filterDataArr.isChecked} value={ele.name} onChange={handelChekBox} /> {ele.name}
                            </label><br />
                        </p>
                    ))}
                <p>
                    

                    {/* <label className="label">
                        <input type="checkbox" name="checkbox" value="" /> borges
                    </label><br />
                    <label className="label">
                        <input type="checkbox" name="checkbox" value="" /> fresho
                    </label><br />
                    <label className="label">
                        <input type="checkbox" name="checkbox" value="" /> Dhara
                    </label><br /> */}
                    Fruits & Vegetables  <br />
                    Foodgrains, Oil & Masala  <br />
                    Bakery, Cakes & Dairy  <br />
                    Beverages  <br />
                    Snacks & Branded Foods  <br />
                    Beauty & Hygiene  <br />
                    Cleaning & Household  <br />
                    Kitchen, Garden & Pets  <br />
                    Eggs, Meat & Fish  <br />
                    Gourmet & World Food  <br />
                    Baby Care  <br />
                    View All  <br />
                    Fresh Vegetables  <br />
                    Herbs & Seasonings  <br />
                    Fresh Fruits  <br />
                    Organic Fruits & Vegetables  <br />
                    Exotic Fruits & Veggies  <br />
                    Cuts & Sprouts  <br />
                    Flower Bouquets, Bunches  <br />
                    Potato, Onion & Tomato  <br />
                    Cucumber & Capsicum  <br />
                    Root Vegetables  <br />
                    Gourd, Pumpkin, Drumstick  <br />
                    Beans, Brinjals & Okra  <br />
                    Cabbage & Cauliflower  <br />
                    Leafy Vegetables  <br />
                    Specialty  <br />

                </p>
            </Box>

            <Box>
                <h4>Brands</h4>
                <p>
                    <label className="label">
                        <input type="checkbox" name="checkbox" value="text" /> Text
                    </label><br />
                    Fresho<br />
                    Fresho Potato, Onion & Tomato
                </p>
            </Box>
        </Box>
    )
}

export default memo(Sidebar);