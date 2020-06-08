import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import signUpService from './services/signup'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [nameSignUp, setNameSignUp] = useState('')
  const [password, setPassword] = useState('')
  const [passwordSignUp, setPasswordSignUp] = useState('')
  const [usernameSignUp, setUsernameSignUp] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [validMessage, setValidMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
      try {
          event.preventDefault()
          const blogObject = {
              title : title,
              author : author,
              url : url
          }
          const response = await blogService.create(blogObject)
          console.log(response)
          setBlogs(blogs.concat(response))
          setValidMessage(`successfuly added : ${title} by "${author}"`)
          setTimeout(() => {
              setValidMessage(null)
          }, 5000)
          setTitle('')
          setAuthor('')
          setUrl('')
      } 
      catch(exception) {
          setErrorMessage('this blog cannot be added, check your inputs')
          setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
      }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({username, password})
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
    }
    catch(exception) {
        setErrorMessage('wrong username/password combination')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
  }

  // not required by the course but I wanted to add it
  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
        await signUpService.signIn({
            username : usernameSignUp,
            password : passwordSignUp,
            name : nameSignUp
        })
        const user = await loginService.login({
            username : usernameSignUp,
            password : passwordSignUp
        })
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsernameSignUp('')
        setPasswordSignUp('')
    }
    catch(exception) {
        setErrorMessage('username and password must be defined, username must be unique')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <h4>Log In here : </h4>
        <div>
          username :
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password :
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
  )

  const logout = () => {
      console.log("loggin out")
      window.localStorage.removeItem('loggedUser')
  }

  const signUpFrom = () => (
      <form onSubmit={handleSignUp}>
      <h4>Sign Up here : </h4>
        <div>
          name :
            <input
            type="text"
            value={nameSignUp}
            name="Username"
            onChange={({ target }) => setNameSignUp(target.value)}
            />
        </div>
        <div>
          username :
            <input
            type="text"
            value={usernameSignUp}
            name="Username"
            onChange={({ target }) => setUsernameSignUp(target.value)}
          />
        </div>
        <div>
          password :
            <input
            type="password"
            value={passwordSignUp}
            name="Password"
            onChange={({ target }) => setPasswordSignUp(target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
  )

  const blogForm = () => (
      <form onSubmit={addBlog}>
          <div>
          title :
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          </div>
          <div>
          author :
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          </div>
          <div>
          url :
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          </div>
          <button type="submit">create</button>
      </form>
  )

  return (
    <>
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <h2>BLOGS</h2>
    </div>
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <Notification message={errorMessage} color={"red"}/>
    <Notification message={validMessage} color={"green"}/>
    </div>
    <div style={{display: 'flex', justifyContent: 'center'}}>

      {user === null ?
          loginForm() :
          <div>
          <div>{user.name} is logged in</div>
            <form onSubmit={logout}>
                <button type="submit">logout</button>
            </form>
            <h3>Create a new blog:</h3>
            {blogForm()}
            <p></p>
            <div>
                <h3>List of blogs:</h3>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
          </div>
       }
    </div>
    <p></p>
    <div style={{display: 'flex', justifyContent: 'center'}}>
    {user === null? signUpFrom() : <></>}
    </div>
    </>
  )
}

export default App
