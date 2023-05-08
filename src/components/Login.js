import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (token['mytoken']) {
            navigate('/articles')
        }
    }, [token, navigate])

    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp => {
            setToken('mytoken', resp.token)
            navigate('/articles')
        })
        .catch(error => console.log(error))
    }

    const registerBtn = () => {
        APIService.RegisterUser({username, password, email})
        .then(resp => {
            setLogin(true)
            console.log(resp)
        })
        .catch(error => console.log(error))
    }

    const toggleLogin = () => {
        setLogin(!isLogin)
    }

    return (
        <div className='App'>
            {isLogin ? <h1>Sign In</h1> : <h1>Sign Up</h1>}
            <br />
            <br />
            <div className='mb-3'>
                {!isLogin && (
                    <>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input
                            type='email'
                            className='form-control w-50'
                            id='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <br />
                    </>
                )}
                <label htmlFor='username' className='form-label'>Username</label>
                <input
                    type='text'
                    className='form-control w-50'
                    id='username'
                    placeholder='Enter Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor='password' className='form-label'>Password</label>
                <input
                    type='password'
                    className='form-control w-50'
                    id='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br />

                {isLogin ? (
                    <button onClick={loginBtn} className='btn btn-primary'>
                        Sign In
                    </button>
                ) : (
                    <button onClick={registerBtn} className='btn btn-primary'>
                        Sign Up
                    </button>
                )}

                <div className='mb-3'>
                    <h5>
                        {isLogin
                            ? `Don't have an account? `
                            : 'Already have an account? '}
                        <button className='btn btn-primary' onClick={toggleLogin}>
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Login

