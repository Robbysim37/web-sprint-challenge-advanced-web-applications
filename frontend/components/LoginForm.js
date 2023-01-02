import React, { useState,useEffect } from 'react'
import PT from 'prop-types'
import * as yup from "yup"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const loginSchema = yup.object().shape({
  username: yup.string().required("Please enter Username").min(3,"Username must be at least 3 characters"),
  password: yup.string().required("Please enter Password").min(8,"Password must be at least 8 chatacters") 
})

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialFormValues)
  const [isButtonDisabled,setIsButtonDisabled] = useState(true)
  // ✨ where are my props? Destructure them here

  const onChange = evt => {
    console.log(values)
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    props.loginFunc({username:values.username,password:values.password})
  }

  const formValidation = () => {
    if(values.username.trim().length >= 3 && values.password.trim().length >= 8){
      return false
    }else{
      return true
    }
  }

  useEffect(()=>{
    const tempValues = {
      username: values.username.trim(),
      password: values.password.trim()
    }
    loginSchema.isValid(tempValues).then(valid => setIsButtonDisabled(!valid))
  },[values])

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={formValidation()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
