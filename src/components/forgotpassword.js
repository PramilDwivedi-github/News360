import React, { useState } from 'react'
import { Input,Button } from '@mui/material'
import { useNavigate } from 'react-router'
import CustomizedSnackbars from './snackbar'

function ForgotPassword() {
    const [email,setEmail] = useState("")

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
    const getPassword = ()=>{

      if(email.length === 0)
      {
        setSnackData({severity:"error",msg:"email is empty"})
        handleClick();
      }
      else{
        fetch("https://newsappbackendapis.herokuapp.com/forgot",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email})
          })
          .then(resp=>resp.json())
          .then(resp=>{
            if(resp.msg === "email does not exist"){
              setSnackData({severity:"error",msg:"user does not exist"})
              handleClick();
            }
            else{
              setSnackData({severity:"success",msg:"Email sent to registered email-id"})
              handleClick();
              setTimeout(()=>{
                navigate("/login")
              },500)
            }
          })
      }
    }
  return (
    <div className='loginform'>
        <h2>Forgot Password</h2>
    <span>Email</span>
    <Input type="email" placeholder='enter email' onChange={(e)=>setEmail(e.target.value)}></Input>
    <CustomizedSnackbars open={open} handleClose={handleClose} snackdata = {snackdata}/>
    <Button size='small' onClick={getPassword}>submit</Button>
</div>
  )
}

export default ForgotPassword