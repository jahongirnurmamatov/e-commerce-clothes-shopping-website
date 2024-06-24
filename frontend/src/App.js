
import './App.css';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Shop from './pages/Shop';
import Product from './pages/Product';
import ShopCategory from './pages/ShopCategory';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';

function App() {
  return (
    <div >
      <BrowserRouter>
      
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>} />
        <Route  path='/men' element={<ShopCategory category='men'/>}/>
        <Route  path='/women' element={<ShopCategory category='women'/>}/>
        <Route  path='/kids' element={<ShopCategory category='kids'/>}/>
        <Route path='/product' element={<Product/>}>
        <Route path='"productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<LoginSignup/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
