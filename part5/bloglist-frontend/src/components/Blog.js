import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = (props) => {
	const isCreator = () => {
		if (props.user.username === props.blog.user.username) {
			return true
		}
		else {
			return false
		}
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const likesClick = (event) => {
		event.preventDefault()
		const newBlog = {
			author : props.blog.author,
			likes : props.blog.likes + 1,
			user: [props.blog.user.id],
			url : props.blog.url,
			title : props.blog.title
		}
		blogService.change(props.blog.id, newBlog)
		blogService.getAll().then(blogs =>
			props.set(blogs)
		)
	}

	const removeClick = (event) => {
		event.preventDefault()
		if (window.confirm(`are you sure you want to delete ${props.blog.title} from "${props.blog.author}"`)){
			const newBlogs = props.blogs.filter(b => b.id !== props.blog.id)
			blogService.remove(props.blog.id)
			props.set(newBlogs)
		}

	}

	return (
		<div style={blogStyle}>
			<div>
        title -- {props.blog.title}
				<Togglable buttonLabel="view">
					<div> url -- {props.blog.url}</div>
					<div>
          likes -- {props.blog.likes}
						<button onClick={likesClick}>
          like</button>
					</div>
					<div> author -- {props.blog.author}</div>
					{isCreator() ? <button onClick={removeClick}> delete blog</button> : <></>}
					<p></p>
				</Togglable>
			</div>
		</div>
	)}

Blog.propTypes = {
	set: PropTypes.func.isRequired,
	blog: PropTypes.object.isRequired,
	blogs: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
}

export default Blog
