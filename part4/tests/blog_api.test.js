const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./apitest_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	const ross = await api
						.post("/api/users")
						.set('Content-Type', 'application/json')
						.send({
							name : "ross",
							username : "rossgeller",
							password : "dinos"
						})

	const blogObjects = helper.blogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)
})

test("the correct number of blogs is returned", async () => {
	const res = await api.get("/api/blogs")
	expect(res.body.length).toBe(helper.blogs.length)
})

test("good id name", async () => {
	const res = await api.get("/api/blogs")
	res.body.forEach(blog => expect(blog.id).toBeDefined())
})

test("added a blog correctly", async () => {
	const rosslogin = await api
                        .post("/api/login")
                        .send({
                            username : "rossgeller",
                            password : "dinos"
                        })
	const rossToken = rosslogin.body.token

	const newBlog = helper.listWithOneBlog[0]
	await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${rossToken}`)
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/)

	const res = await api.get("/api/blogs")
	expect(res.body.length).toBe(helper.blogs.length + 1)

	const contents = res.body.map(n => n.title)
	expect(contents).toContain(
		"Go To Statement Considered Harmful"
	)
})

test("default like is 0", async () => {
	const rosslogin = await api
                        .post("/api/login")
                        .send({
                            username : "rossgeller",
                            password : "dinos"
                        })
	const rossToken = rosslogin.body.token

	const newBlog = {
		title : "x",
		author : "y",
		url : "z"
	}
	res = await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${rossToken}`)
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/)
	expect(res.body.likes).toBe(0)
})

test("no url and no title is 400", async () => {
	const rosslogin = await api
                        .post("/api/login")
                        .send({
                            username : "rossgeller",
                            password : "dinos"
                        })
	const rossToken = rosslogin.body.token

	const newBlog = {
		author : "y",
		likes : 12
	}
	res = await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${rossToken}`)
		.send(newBlog)
		.expect(400)
})

afterAll(() => {
	mongoose.connection.close()
})
