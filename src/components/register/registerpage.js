import React, { useState } from 'react'
import { Input } from '@mui/material'
import { Button } from '@mui/material'
import CustomizedSnackbars from '../snackbar'

import "../register/register.css"
import { useNavigate } from 'react-router'
import LinearDeterminate from '../progress'


function RegisterPage() {

  const [email,setEmail] = useState("")
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [cnfPassword,setCnfPassword] = useState("")


  const [progress,setProgress] = useState(false)

  const navigate  = useNavigate()


  const [open, setOpen] = useState(false);
  const [snackdata,setSnackData] = useState({severity:"success",msg:"Logged In SuccessFully!"})

  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleRegister = ()=>{
    if(email.length === 0 || password.length === 0 )
    {
      setSnackData({severity:"error",msg:"please enter details"})
      handleClick();
    }
    else if(password !== cnfPassword){
      setSnackData({severity:"error",msg:"passwords do not match"})
      handleClick()
    }
    else{
      setProgress(true)
        fetch("https://newsappbackendapis.herokuapp.com/user",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email,password,name })
        })

        .then(resp=>resp.json())
        .then(resp => {
          console.log(resp)
          setProgress(false)
          if(resp.msg === "user already exist"){
            setSnackData({severity:"error",msg:resp.msg})
            handleClick();
          }
          else {
            setSnackData({severity:"success",msg:resp.msg})
          
            navigate('/login')
          }
        })
        .catch(err=>console.log(err))
      
    }
  }

  return (
    <div className='RegisterPage'>
    
    { progress && <LinearDeterminate/>}
    
    <div className='RegisterForm'>
    
      <h2>Register</h2>
    <span>Email</span>
    <Input type="email" className='ele' placeholder='enter email' onChange={(e)=>setEmail(e.target.value)}></Input>
    <span>Name</span>
    <Input type="text" className='ele'  placeholder='enter name' onChange={(e)=>setName(e.target.value)}></Input>
    <span>password</span>
    <Input type='password' className='ele' placeholder='enter password' onChange={(e)=>setPassword(e.target.value)}></Input>
    <span>confirm password</span>
    <Input type='password' className='ele' placeholder='enter password' onChange={(e)=>setCnfPassword(e.target.value)}></Input>
    <CustomizedSnackbars open={open} handleClose={handleClose} snackdata = {snackdata}/>
    <Button size='small' className='ele' onClick={handleRegister}>Register</Button>
    </div>
</div>
  )
}

export default RegisterPage