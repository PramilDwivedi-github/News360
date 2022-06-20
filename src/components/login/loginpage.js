import { Button, Input } from '@mui/material'
import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../login/loginpage.css'
import LinearDeterminate from '../progress'
import CustomizedSnackbars from '../snackbar'

function LoginPage({setIsLogged,setUser}) {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [logged,setLogged] = useState(false)
    
    const navigate  = useNavigate()

    const [progress,setProgress] = useState(false)
    const [open, setOpen] = React.useState(false);

    
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



    const [snackdata,setSnackData] = useState({severity:"success",msg:"Logged In SuccessFully!"})
    
    const handleLogin = ()=>{
      if(email.length == 0 || password.length == 0)
      {
        setSnackData({severity:"error",msg:"please enter details"})
        handleClick();
      }
      else{
        setProgress(true)
          fetch("https://newsappbackendapis.herokuapp.com/login",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email,password })
          })

          .then(resp=>resp.json())
          .then(resp => {
            console.log(resp)
            setProgress(false)
            if(resp.msg === "invalid password" || resp.msg === "user does not exist"){
              setSnackData({severity:"error",msg:resp.msg})
              handleClick();
            }
            else {
              setSnackData({severity:"success",msg:"logged in successfully"})
              setIsLogged(true)
              setLogged(true)
              setUser(resp.data)
              navigate('/')
            }
          })
          .catch(err=>console.log(err))
        
      }
      
    }
    useEffect(()=>{
      if(logged)
    navigate('/')
    },[logged])
  return (
    <div className='LoginPage'>
    
    { progress && <LinearDeterminate/>}
    
    <div className='loginform'>
        <h2>Login</h2>
        <span>Email</span>
        <Input className='ele' type="email" placeholder='enter email' onChange={(e)=>setEmail(e.target.value)}></Input>
        <span>password</span>
        <Input className='ele' type='password' placeholder='enter password' onChange={(e)=>setPassword(e.target.value)}></Input>
        {/* <span>confirm password</span>
        <Input type='password' placeholder='enter password'></Input> */}
        <Button className='ele' onClick={()=>navigate("/forgot")}>ForgotPassword</Button>
        <CustomizedSnackbars open={open} handleClose={handleClose} snackdata = {snackdata}/>
        <Button  className='ele' size='small' onClick={handleLogin}>Login</Button>
    </div>
    </div>
  )
}

export default LoginPage