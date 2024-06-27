
import './Popular.css'
import Item from '../item/Item'
import { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';

const Popular = () => {
  const [popular, setPopular]=useState([]);

  useEffect(()=>{
    const fetchPopular =  async()=>{
      const res = await fetch('http://localhost:4000/api/products/popularinwomen');
      const data =await res.json();
      if(!data.success){
        toast.error("Error in fetching products")
      }else{
        setPopular(data.popularinwomen)
      }
    };
    fetchPopular();
  },[])
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className='popular-item'>
            {popular?.map((item,i)=>{
                return <Item key={i} _id={item._id} 
                    name={item.name} image={item.image} 
                    new_price={item.new_price} 
                    old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular;