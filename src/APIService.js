



export class APIService  {
    static async UpdateArticle(article_id, body, token)  {
        const resp = await fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        return await resp.json()
    }

    static async CreateArticle(body, token) {
        const resp = await fetch('http://127.0.0.1:8000/api/articles/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        return await resp.json()
    }

    static async DeleteArticle(article_id, token) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
      

    }


    static async LoginUser(body) {
        return fetch('http://127.0.0.1:8000/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then((resp) => {
            if (resp.status === 200) {
              return resp.json().then((data) => {
                return { success: true, token: data.token };
              });
            } else {
              return { success: false, error: resp.statusText };
            }
          })
          .catch((error) => {
            return { success: false, error: error.message };
          });
    }

    static RegisterUser(body) {
        return fetch('http://127.0.0.1:8000/api/auth/signup/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)


        })
    }

    static LogoutUser(body, token) {
        return fetch('http://127.0.0.1:8000/api/auth/logout/', {
            'method': 'POST',
            headers: {
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify(body)


        })
    }

  
}

export default APIService


