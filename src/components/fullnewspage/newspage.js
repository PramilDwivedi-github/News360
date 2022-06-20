import { Container } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router';
import './newspage.css'

const NewsPage = ()=>{

  const location = useLocation();
  const article = location.state;

  return (
    <Container>
      <div className='page'>
      
      <div className='media'>
        <img src={article.urlToImage}></img>
      </div>
        <div className='title'>{article.title}</div>
        <span>{`author - ${article.author}`}</span>
        <span>{`published on ${article.publishedAt}`}</span>
      <div>{article.content}</div>

    <a href={article.url}>Full Article</a>
        
    </div>
    </Container>
    
  )
}
export default NewsPage;
