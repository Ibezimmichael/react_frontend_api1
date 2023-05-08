import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import { useCookies } from 'react-cookie';

function Form(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [token] = useCookies(['mytoken'])

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)

    }, [props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, description}, token['mytoken'])
        .then(response => props.updatedInformation(response))

    }
    const createArticle = () => {
        APIService.CreateArticle({title, description}, token['mytoken'])
        .then(resp => props.createdInformation(resp))
    }
    
  return (
    <div>
        {props.article ? (

            <div className='mb-3'>
                <label htmlFor='title' className='form-label' >Title</label>
                <br/>
                <input type='text' className='form-control' id='title' placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <label htmlFor='description' className='form-label' >Description</label>
                <textarea className='form-control' id='description' rows="5" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                <br/>
                {
                    props.article.id ? <button onClick={updateArticle} className='btn btn-success' type='submit'>Update Article</button>
                    : <button onClick={createArticle} className='btn btn-success' type='submit'>Create Article</button>
                }
                
                
            </div>

        ): null}
    </div>
  )
}

export default Form



