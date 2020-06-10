import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = async (event) => {
		try {
			event.preventDefault()
			props.FormRef.current.toggleVisibility()
			const blogObject = {
				title : title,
				author : author,
				url : url
			}
			await blogService.create(blogObject)
			blogService.getAll().then(blogs =>
				props.set(blogs)
			)
			props.setValid(`successfuly added : ${title} by "${author}"`)
			setTimeout(() => {
				props.setValid(null)
			}, 5000)
			setTitle('')
			setAuthor('')
			setUrl('')
		}
		catch(exception) {
			props.setError('this blog cannot be added, check your inputs')
			setTimeout(() => {
				props.setError(null)
			}, 5000)
		}
	}

	return (
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
}

export default BlogForm
