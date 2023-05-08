import React from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';

function ArticleList(props) {
  const [token] = useCookies(['mytoken'])

    const editBtn = (article) => {
      props.editBtn(article)
    }
    const deleteBtn = (article) => {
      APIService.DeleteArticle(article.id, token['mytoken'])
      .then(() => props.deleteBtn(article))
      .catch(error => console.log(error))
      
    }
  return (
    <div>
        {props.articles && props.articles.map(article => {
          return (
            <div key={article.id}>
              <h2 className='A-title '>{article.title}</h2>
              <p>{article.description}</p>
              
              <div className='row'>
                <div className='col-md-1'>

                    <button className='btn btn-lg btn-success' onClick={() => editBtn(article)}>Update</button>

                </div>

                <br/>

                <div className='col-md'>

                    <button className='btn btn-lg btn-danger' onClick={() => deleteBtn(article)}>Delete</button>

                </div>

              </div>
              <hr className='bg-primary'/>

            </div>

            
          
          )
        })}
    </div>
  )
}

export default ArticleList