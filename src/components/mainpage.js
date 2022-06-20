import React from 'react'
import SwipeableTemporaryDrawer from './news-drawer';
import { Container } from '@mui/material';
import ActionAreaCard from './card';
import { Button } from '@mui/material';
import { useNavigate , useLocation } from 'react-router';


import "./mainpage.css";

export default function MainPage({articles,setCategory,isLogged,setIsLogged,user,totalResults}) {
  const navigate = useNavigate();
  const [load,setLoad] = React.useState(false);
  


  return (
    <div>
    <div className="header">
    <div className='ham'>
      <SwipeableTemporaryDrawer setCategory={setCategory}/>
    </div>
    <div className='logo'>
      <img src="https://img.icons8.com/cute-clipart/64/000000/inshorts.png"/>
      <p>inShorts</p>
    </div>

    {
      !isLogged ?
        <div className='User'>
          <Button size="small" onClick={()=>{navigate("/login")}}>Login</Button>
          <Button size="small" onClick={()=>{navigate("/register")}}>Register</Button>
        </div>
      :
      <div className='User'>{user.name}
      <button onClick={()=>{setIsLogged(false)}}>logout</button></div>
      
    }
    
    
    </div>
    <div className='content'>
    <Container className='contain'>
    {
      articles.map((art,ind)=><ActionAreaCard key={ind} article={art}/>)
      
    }
    
    {
      load &&  articles.map((art,ind)=><ActionAreaCard key={ind} article={art}/>)
    }
    
    </Container>

    {
      !load && <Button onClick={()=>setLoad(true)}>Load More</Button>
    }
    </div>

    </div>
  )
}
