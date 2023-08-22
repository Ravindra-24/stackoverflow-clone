import React, { useState } from 'react'
import icon from '../../assets/icon.png'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Auth.css'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth' 
import { toast } from 'react-toastify'
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!email && !password){
      toast.error('Please fill all the fields')
    }else if(isSignup){
    dispatch(signup({name, email, password},navigate))
  }else{
    dispatch(login({email, password},navigate))
  }
}

  const handleSwitch = ()=> {
    setIsSignup(!isSignup)
  }
  return (
    
   <section className='auth-section'>
    {isSignup && <AboutAuth/>}
      <div className='auth-container-2'>
        {!isSignup && <img src={icon} alt='stack overflow' width='50px' className='login-logo'></img>}
        <form onSubmit={handleSubmit}>
          {
            isSignup &&  (
            <label htmlFor='name'>
              <h4>Name</h4>
              <input type='name' name='name' id='name' required onChange={(e)=>{setName(e.target.value)}}></input>
            </label>
            )
          }
          <label htmlFor='email'>
              <h4>Email</h4>
              <input type='email' name='email' id='email' required onChange={(e)=>{setEmail(e.target.value)}}></input>
          </label>
          <label htmlFor='password'>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
            <h4>Password</h4>
            {!isSignup && <p style={{color:'#007ac6', fontSize:'13px'}}>Forgot Password?</p>}
            </div>
            <input type='password' name='password' id='password' required onChange={(e)=>{setPassword(e.target.value)}}></input>
            {
              isSignup && (
                <p style={{color:"#666767", fontSize:"13px"}}>
                  Passwords must contain at least eight <br/>characters, including at least 1 letter and <br/>1 number.
                </p>
              )
            }
          </label>
          {
            isSignup && (
              <label htmlFor='check'>
                <input type="checkbox" id='check'/>
                <p style={{fontSize:"13px"}}>
                  Opt-in to receive occasional product<br/> updates, user research invitations,company<br/> announcements, and digests.</p>
              </label>
            )
          }
          <button type='submit' className='auth-btn'>{isSignup ? 'Sign Up' : 'Login'}</button>
         { isSignup && (
        <p style={{color:"#666767", fontSize:"13px"}}>
          By clicking “Sign up”, you agree to our<span style={{color:'#007ac6'}}> terms<br/>of service</span>, <span style={{color:'#007ac6'}}>privacy policy</span> and <span style={{color:'#007ac6'}}>cookie policy</span></p>
         )
         }  
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button type='submit' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Login" : "Sign Up"}</button>
        </p>
      </div>
    </section>
    
  )
}

export default Auth
