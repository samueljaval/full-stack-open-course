import React, { useState } from 'react'
import signUpService from '../services/signup'
import loginService from '../services/login'
import blogService from '../services/blogs'

const SignUpForm = (props) => {
	const [nameSignUp, setNameSignUp] = useState('')
	const [passwordSignUp, setPasswordSignUp] = useState('')
	const [usernameSignUp, setUsernameSignUp] = useState('')

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
			setUsernameSignUp('')
			setPasswordSignUp('')
			blogService.setToken(user.token)
			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			)
			props.set(user)
		}
		catch(exception) {
			props.setError('username and password must be defined, username must be unique')
			setTimeout(() => {
				props.setError(null)
			}, 5000)
		}
	}

	return (
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
			<button type="submit">Sign Up</button>
		</form>
	)
}

export default SignUpForm
