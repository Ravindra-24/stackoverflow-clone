import React, { useState } from 'react'
import icon from '../../assets/icon.png'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Auth.css'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth' 
import { toast } from 'react-toastify'
const Auth = ({setProgress}) => {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
    if(!email && !password){
      toast.error('Please fill all the fields')
    }else if(isSignup){
    dispatch(signup({name, email, password},navigate, setProgress, setLoading))
  }else{
    dispatch(login({email, password},navigate, setProgress, setLoading))
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
          <button type='submit' className='auth-btn'>
          {loading ? (
                    <>
                      {" "}
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="loader-svg inline w-2 h-2 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </>
                  ) :  isSignup ? 'Sign Up' : 'Login'
                  }
            </button>
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
