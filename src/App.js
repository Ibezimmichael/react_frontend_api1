import './App.css';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import APIService from './APIService';

function App() {

  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token] = useCookies(['mytoken'])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(response => response.json())
    .then(response => setArticles(response))
    .catch(error => console.log(error))

  }, [])

  const editBtn = (article) => {
    setEditArticle(article)

  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id === article.id) {
        return article;
      }
      else{
        return myarticle;
      }
    })

    setArticles(new_article)
  }
  const articleForm = () => {
    setEditArticle({title:'', description:''})

  }

  const  createdInformation = (article) => {
    const new_articles = [...articles, article ]
    setArticles(new_articles)

  }
  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false;
      } else {
        return true;
      }
    })
    setArticles(new_articles)
  }

  const [,, removeCookie] = useCookies(['mytoken']);

  const navigate = useNavigate();

  const handleLogout = () => {
    APIService.LogoutUser(null, token['mytoken'])
    .then(() => removeCookie('mytoken'))
    .then(() => navigate('/'))
    .catch(error => console.log(error))
  };
  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <h1>Django and react</h1>
          <br/>
        </div>
        <div className='col'>
          <button onClick={articleForm} className='btn btn-lg btn-primary'>Create Article</button>
          <br/>
          
        </div>
        <div className='col'>
          <button onClick={handleLogout} className='btn btn-lg btn-danger'>Logout</button>
        </div>
        
      </div>
        <ArticleList articles = {articles} editBtn = {editBtn} deleteBtn={deleteBtn}/>
        {editArticle ? <Form article = {editArticle} updatedInformation = {updatedInformation} createdInformation = {createdInformation}/> : null}
        
    </div>
  );
}

export default App;
