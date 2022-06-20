import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import newsCard from './components/newsCard';

import { useEffect, useState } from 'react';
import SwipeableTemporaryDrawer from './components/news-drawer';

import Container from '@mui/material/Container';
import ActionAreaCard from './components/card';
import MainPage from './components/mainpage';
import NewsPage from './components/fullnewspage/newspage';
import LoginPage from './components/login/loginpage';
import RegisterPage from './components/register/registerpage';
import ForgotPassword from './components/forgotpassword';

function App() {

  const [isLogged,setIsLogged] = useState(false)
  const [user,setUser] = useState({})
  const [category,setCategory] = useState('general')
  const [articles,setArticles] = useState([])
  const [totalResults,setTotalResults] = useState([])

  const getData = async (cat)=>{
    const resp = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=dd9341ad92794cd489bf1e383da78d09`)
    const data = await resp.json()

    await setArticles([...data.articles]) 
    console.log(articles)
  }

  useEffect(()=>{
    getData(category)
  },[category])

  return (
    <div className="App">

    {/* <div className="header">
    <div className='ham'>
      <SwipeableTemporaryDrawer setCategory={setCategory}/>
    </div>
    <div className='logo'>
      <img src="https://img.icons8.com/cute-clipart/64/000000/inshorts.png"/>
      <p>inShorts</p>
    </div>
    </div>
    <div className='content'>
    <Container>
    {
      articles.map((art)=><ActionAreaCard article={art}/>)
    }
    </Container>
    </div> */}
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage isLogged={isLogged} user={user} setIsLogged={setIsLogged} articles={articles} setCategory={setCategory} totalResults = {totalResults}/>}/>
      <Route path="/newspage" element={<NewsPage/>}/>
      <Route path="/login"  element={<LoginPage  isLogged={isLogged} setIsLogged={setIsLogged} setUser={setUser}/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/forgot" element={<ForgotPassword/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
