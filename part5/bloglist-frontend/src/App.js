import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {

	const [user, setUser] = useState(null)
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [validMessage, setValidMessage] = useState(null)

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

	const logout = () => {
		console.log('loggin out')
		window.localStorage.removeItem('loggedUser')
	}

	const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)

	const FormRef = React.createRef()

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<h2>BLOGS</h2>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Notification message={errorMessage} color={'red'}/>
				<Notification message={validMessage} color={'green'}/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>

				{user === null ?
					<LoginForm set={setUser} setError={setErrorMessage}/> :
					<div>
						<div>{user.name} is logged in</div>
						<form onSubmit={logout}>
							<button type="submit">logout</button>
						</form>
						<h3>Create a new blog:</h3>
						<Togglable buttonLabel="add blog!" ref={FormRef}>
							<BlogForm set = {setBlogs}
								blogs = {blogs}
								setError = {setErrorMessage}
								setValid = {setValidMessage}
								FormRef = {FormRef}/>
						</Togglable>
						<p></p>
						<div>
							<h3>List of blogs:</h3>
							{sortedBlogs.map(blog =>
								<Blog key={blog.id}
									set = {setBlogs}
									blog={blog}
									blogs={blogs}
									user={user}/>
							)}
						</div>
					</div>
				}
			</div>
			<p></p>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				{user === null?
					<Togglable buttonLabel="Sign Up">
						<SignUpForm set = {setUser} setError={setErrorMessage}/>
					</Togglable>
					: <></>}
			</div>
		</>
	)
}



export default App
