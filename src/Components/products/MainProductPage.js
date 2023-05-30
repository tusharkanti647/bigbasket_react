import { Box } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import ProductPage from "./allProducts/ProductPage";
//import ProductPage from "../ProductPage";
//import Sidebar from "../sidebar/Sidebar";


function MainProductPage() {


    return (
        <Box className="product-page">
            <Box sx={{ width: "95%", display: "flex", }}>
                <Sidebar />
                <ProductPage />
            </Box>
        </Box>
    );
}
export default MainProductPage;