import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			)
			setUsername('')
			setPassword('')
			props.set(user)

		}
		catch(exception) {
			props.setError('wrong username/password combination')
			setTimeout(() => {
				props.setError(null)
			}, 5000)
		}
	}

	return (
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
}

export default LoginForm
