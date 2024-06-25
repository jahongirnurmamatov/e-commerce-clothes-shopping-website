import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product=all_product?.find((e)=>e.id===Number(productId))
  console.log('productId:', productId);

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
    </div>
  )
}

export default Product