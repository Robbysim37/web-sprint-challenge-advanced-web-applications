import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosWithAuth from '../axios'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import PrivateRoute from './PrivateRoute'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ }
  const redirectToArticles = () => { /* ✨ implement */ }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem("token")
    setMessage("Goodbye!")
    navigate("/")
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!

    setMessage("")
    setSpinnerOn(true)
    axios.post("http://localhost:9000/api/login",{username:username.trim(),password:password.trim()})
    .then(res => {
      console.log(res.data)
      localStorage.setItem("token",res.data.token)
      setMessage(res.data.message)
      navigate("/articles")
      setSpinnerOn(false)
    })
    .catch(err => console.log(err))
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!

    setMessage("")
    setSpinnerOn(true)
    axiosWithAuth().get("/articles")
    .then(res => {
      setArticles(res.data.articles)
      setMessage(res.data.message)
      setSpinnerOn(false)
    })
    .catch(err => console.log(err))
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.

    setMessage("")
    setSpinnerOn(true)
    axiosWithAuth().post("/articles",article)
    .then(res => {
      console.log(res.data)
      setArticles([...articles, res.data.article])
      setMessage(res.data.message)
      setSpinnerOn(false)
    })
    .catch(err => console.log(err))
  }

  const setFormToEdit = (article_id) => {
    setCurrentArticleId(article_id)
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
    console.log(article_id , article)
    setMessage("")
    setSpinnerOn(true)
    axiosWithAuth().put(`/articles/${article_id}`,article)
    .then(res => {
      console.log(res.data.article)
      console.log(articles)
      setArticles(articles.map(el => el.article_id == article_id ? res.data.article : el))
      setMessage(res.data.message)
      setSpinnerOn(false)
    })
  }

  const deleteArticle = article_id => {
    // ✨ implement
    setMessage("")
    setSpinnerOn(true)
    axiosWithAuth().delete(`/articles/${article_id}`)
    .then(res => {
      setArticles(articles.filter(el => el.article_id != article_id))
      setSpinnerOn(false)
      setMessage(res.data.message)
    })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm loginFunc={login} />} />
          <Route element={<PrivateRoute/>}>
            <Route path="articles" element={
              <>
              <ArticleForm 
              currentArticleId={currentArticleId} 
              postArticle={postArticle} 
              articles={articles}
              setCurrentArticleId={setCurrentArticleId}
              updateArticle={updateArticle}/>
              <Articles setFormToEdit={setFormToEdit} deleteArticle={deleteArticle} getArticles={getArticles} articles={articles}/>
              </>
            }/>
          </Route>
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
