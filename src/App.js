//import logo from './logo.svg';
import './App.css';
import Basket from './Components/basket/Basket';
import Footer from './Components/footer/footer';
import NewNav from './Components/header/NewNav';
import HomeMain from './Components/home/HomeMain';
import AboutProduct from './Components/productDetals/AboutProduct';
import MainProductPage from './Components/products/MainProductPage';
import SignUp from './Components/signUP_signIn/signUp';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>

      <NewNav />
      <Routes>

        <Route path='/' element={<HomeMain />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/aboutproduct/:id' element={<AboutProduct />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path='/products' element={<MainProductPage />}></Route>
      </Routes>

      <Footer />

    </>
  );
}

export default App;
