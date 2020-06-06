const bloglistRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


bloglistRouter.get("/", async (req, res) => {
	users = await Blog.find({}).populate("user", { username : 1, name : 1 })
	res.json(users.map(u => u.toJSON()))
})

bloglistRouter.post("/", async (request, response, next) => {

	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		const user = await User.findById(decodedToken.id)
		try {
			const blog = new Blog(request.body)
			blog.user = user._id
			user.blogs = user.blogs.concat(blog._id)
			await user.save()
			if (!blog.likes) blog.likes = 0
			result = await blog.save()
			response.status(201).json(result)
		}
		catch(error) {next(error)}
	}
	catch(error) {
		return response.status(401).json({ error: "token missing or invalid" })
	}
})

bloglistRouter.delete("/:id", async (request, response, next) => {
	try {
		const promise = await Blog.findById(request.params.id)
		const userId = promise.user.toString()
		if (jwt.verify(request.token, process.env.SECRET).id === userId) {
			await Blog.findByIdAndRemove(request.params.id)
			response.status(204).end()
		}
		else {
			response.status(400).json(
				{
					error : "this token does not correspond to a user that can delete this blog"
			})
		}
	}
	catch (error){
		next(error)
	}

})

bloglistRouter.put("/:id", async (request, response, next) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	try{
		updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	    response.json(updated.toJSON())
	}
	catch(error){
		next(error)
	}

})

module.exports = bloglistRouter
