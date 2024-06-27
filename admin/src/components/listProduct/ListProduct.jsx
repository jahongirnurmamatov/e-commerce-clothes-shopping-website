import { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products/getAllProducts');
      const data = await response.json();
      setAllProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  const removeProduct = async (id) => {
    await fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'DELETE'
    }
    )
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {
          allproducts.map((product, index) => {
            return (
              <div key={index} className='listproduct-format'>
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeProduct(product._id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ListProduct;
