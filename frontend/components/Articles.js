import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles(props) {
  // ✨ where are my props? Destructure them here

  // ✨ implement conditional logic: if no token exists
  if(!localStorage.getItem("token")){
    Navigate("/")
  }
  // we should render a Navigate to login screen (React Router v.6)

  useEffect(() => {
    // ✨ grab the articles here, on first render only
    props.getArticles()
  },[])

  const deleteButtonClickHandler = (e) => {
    props.deleteArticle(e.target.id)
  }

  const editButtonClickHandler = (e) => {
    props.setFormToEdit(e.target.id)
  }

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        !props.articles.length
          ? 'No articles yet'
          : props.articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button id={art.article_id} disabled={false} onClick={editButtonClickHandler}>Edit</button>
                  <button id={art.article_id} disabled={false} onClick={deleteButtonClickHandler}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
