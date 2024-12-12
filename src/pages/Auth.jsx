import React, {useContext, useState} from 'react'
import authImg from '../assets/technology.jpg'
import { Form, FloatingLabel,Spinner  } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {registerAPI, loginAPI} from '../services/allAPI'
import { tokenContext } from '../context/TokenAuth'

const Auth = ({insideRegister}) => {

  const {authorisedUser, setAuthorisedUser} = useContext(tokenContext)
  const navigate = useNavigate()
  const [isLogin,setIsLogin] = useState(false)
  const [userInput, setUserInput] = useState ({
    username: "", email: "", password: ""
  })
  console.log(userInput);

//register user
  const register = async (e) => {
    e.preventDefault()
    if(userInput.username && userInput.email && userInput.password){
    // api call
    try {
      const result = await registerAPI(userInput)
      if(result.status==200) {
        alert(`Welcome ${result.data?.username}, Please Login and Explore our Projects`)
        navigate("/login")
        setUserInput({username:"", email:"", password:""})
      } else {
        if(result.response.status==406) {
          alert(result.response.data)
          setUserInput({username:"", email:"", password:""})
        }
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    alert("Please fill in all fields");
  }
}

//login user
  const login = async (e) => {
    e.preventDefault()
    if(userInput.email && userInput.password){
    // api call
    try {
      const result = await loginAPI(userInput)
      if(result.status==200) {
       sessionStorage.setItem("user", JSON.stringify(result.data.user))
       sessionStorage.setItem("token",(result.data.token))
       setIsLogin (true)
       setAuthorisedUser(true)
       setTimeout (() =>{
       navigate("/")
       setUserInput({username:"", email:"", password:""})
       setIsLogin(false)
       }, 2000)
  
      } else {
        if(result.response.status==404) {
          alert(result.response.data)
        }
      }
    } catch (err) {
      console.log(error)
    }
  } else {
    alert("Please fill in all fields");
  }
  }

  
  return (
    <>
      <div style={{minHeight:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className="container w-50">
          <div className="card shadow p-2">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img height={'500px'} src={authImg} alt="auth" />
              </div>
              <div className="col-lg-6">
                <h1 className='my-2'><i className="fa-brands fa-docker"></i> Project Fair</h1>
                <h5>Sign {insideRegister?'Up':'In'} to continue</h5>
                <Form>
                  {
                    insideRegister &&
                    <FloatingLabel
                    controlId="floatingInputUsername"
                    label="Username"
                    className="mb-3"
                  >
                  <Form.Control value={userInput.username} onChange={e=> setUserInput({...userInput,username:e.target.value})} type="text" placeholder="Username" />
                  </FloatingLabel>
                  }
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                  <Form.Control value={userInput.email} onChange={e=> setUserInput({...userInput,email:e.target.value})} type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel 
                    controlId="floatingPassword"
                    label="Password"
                  >
                  <Form.Control value={userInput.password} onChange={e=> setUserInput({...userInput,password:e.target.value})} type="password" placeholder="Password" />
                  </FloatingLabel>

                  {
                    insideRegister ?
                    <div className="mt-3">
                      <button onClick={register} className="btn btn-primary mb-2">Sign Up</button>
                      <p>Existing user? Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <button onClick={login} className="btn btn-primary mb-2 d-flex">
                        Log In 
                        {isLogin && <Spinner animation="grow" variant="light" className='ms-1' />}
                        </button>
                      <p>New user? Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                  }

                </Form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Auth