import './NewCollection.css'

import Item from '../item/Item'
import { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';
const NewCollections = () => {
  const [new_Collections, setNewCollections]=useState([]);

  useEffect(()=>{
    const getNewCollections=async()=>{
      try {
        const res = await fetch('http://localhost:4000/api/products/newcollections');
        const data = await res.json();
        if(!data.success) {
          toast.error(data.error);
        }else{
          setNewCollections(data.newCollection)
        }
      } catch (error) {
        toast.error(error);
      }
    }
    getNewCollections();
  },[])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_Collections.map((item,i)=>{
                return <Item key={i} id={item.id}  name={item.name} image={item.image} 
                new_price={item.new_price} 
                    old_price={item.old_price} 
                />
            })}
        </div>
    </div>
  )
}

export default NewCollections