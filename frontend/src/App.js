import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Product from './pages/Product';
import ShopCategory from './pages/ShopCategory';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import Footer from './components/footer/Footer';
import men_banner from './components/assets/banner_mens.png';
import women_banner from './components/assets/banner_women.png';
import kids_banner from './components/assets/banner_kids.png';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory banner={men_banner} category='men' />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category='women' />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category='kid' />} />
          <Route path='/product/:productId' element={<Product />} /> {/* Ensure the path includes :productId */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
