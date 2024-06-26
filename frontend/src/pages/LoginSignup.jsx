import { useState } from 'react'
import './CSS/LoginSignup.css'
import {  toast } from 'react-toastify';


const LoginSignup = () => {
  const [state,setState]=useState('Login');
  const [formData, setFormData]=useState({
    name:"",
    password:"",
    email:""
  })
  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const loginHandler = async()=>{
    try {
      const res=await fetch('http://localhost:4000/api/users/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data =await res.json();
      if(!data.success){
        toast.error(data.error)
      }else{
        localStorage.setItem('auth-token',data.token);
        window.location.replace('/');
      }
    } catch (error) {
      toast.error(error)
    }

  }
  const signupHandler = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!data.success) {
        return toast.error(data.error);
      } else {
        localStorage.setItem('auth-token', data.token);
        window.location.replace('/');
      }
      console.log(data);
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==='Sign Up'?<input  onChange={changeHandler} value={formData.name} name='name' type="text" placeholder='Your Name' />:<></> }
          <input  onChange={changeHandler} value={formData.email} name='email' type="email" placeholder='Email Adress' />
          <input onChange={changeHandler} value={formData.password} name='password' type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?loginHandler():signupHandler()}}>Continue</button>
        {state==="Sign Up"? <p className="loginsignup-login">Already have an account? <span style={{cursor:'pointer'}} onClick={()=>setState('Login')}>Login here</span></p>:
        <p className="loginsignup-login">Create an account? <span style={{cursor:'pointer'}} onClick={()=>setState('Sign Up')}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use and & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup