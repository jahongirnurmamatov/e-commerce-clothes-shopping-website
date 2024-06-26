import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
const AddProduct = () => {
    const [image,setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",
    })
    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }
    const add_product = async () => {
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data; });

        if (responseData.success) {
            product.image = responseData.image_url;
            await fetch('http://localhost:4000/api/products/addproduct', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then(res => res.json()).then((data) => {
                console.log(data);
                if (data.success) {
                    alert("Product Added");
                } else {
                    alert("Failed to add product");
                }
            }).catch((error) => {
                console.error('Error:', error);
                alert("Failed to add product");
            });
        } else {
            alert("Failed to upload image");
        }
    };
  return (
    <div className='add-product' >
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input type="text" name='name' value={productDetails.name} onChange={changeHandler} placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input type="text" name='old_price' value={productDetails.old_price} onChange={changeHandler} placeholder='Type here' />
            </div>
            <div className='addproduct-itemfield'>
                <p>Offer Price</p>
                <input type="text" name='new_price' value={productDetails.new_price} onChange={changeHandler} placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select name="category" value={productDetails.category} onChange={changeHandler} className='addproduct-selector' >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image? URL.createObjectURL(image ) :upload_area} className='addproduct-thumbnail-img'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>add_product()} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct