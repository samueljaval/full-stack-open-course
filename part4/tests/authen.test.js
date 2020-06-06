const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")
const api = supertest(app)

const User = require("../models/user")
const Blog = require("../models/blog")

beforeEach(async () => {
	await User.deleteMany({})
	await Blog.deleteMany({})

	const ross = await api
                        .post("/api/users")
                        .set('Content-Type', 'application/json')
                        .send({
                            name : "ross",
                            username : "rossgeller",
                            password : "dinos"
                        })
    const rachel = await api
                            .post("/api/users")
                            .set('Content-Type', 'application/json')
                            .send({
                                name : "rachel",
                                username : "rachelgreen",
                                password : "notbreak"
                            })
    const rosslogin = await api
                        .post("/api/login")
                        .send({
                            username : "rossgeller",
                            password : "dinos"
                        })
	const rossToken = rosslogin.body.token

    const rachelLogin = await api
                        .post("/api/login")
                        .send({
                            username : "rachelgreen",
                            password : "notbreak"
                        })
	const rachelToken = rachelLogin.body.token

    await api.post("/api/blogs").set("Authorization", `bearer ${rossToken}`).send({
        title : "rossblog1",
        url : "rossurl1"
    })
    await api.post("/api/blogs").set("Authorization", `bearer ${rossToken}`).send({
        title : "rossblog2",
        url : "rossurl2"
    })
    await api.post("/api/blogs").set("Authorization", `bearer ${rachelToken}`).send({
        title : "rachelblog1",
        url : "rachelurl1"
    })
    await api.post("/api/blogs").set("Authorization", `bearer ${rachelToken}`).send({
        title : "rachelblog2",
        url : "rachelurl2"
    })
})

test("good amount of blogs", async () => {
    const blogs = await api.get("/api/blogs")
	const body = blogs.body
    expect(body.length).toBe(4)
})

test("two tests each", async () => {
    const users = await api.get("/api/users")
    expect(users.body[0].blogs.length).toBe(2)
    expect(users.body[1].blogs.length).toBe(2)
})

test("failed deletion", async () => {
	const users = await api.get("/api/users")
    const blogId = users.body[0].blogs[0].id
	const rosslogin = await api
                        .post("/api/login")
                        .send({
                            username : "rossgeller",
                            password : "dinos"
                        })
	const rossFakeToken = "notARealToken"
	await api
		.delete(`/api/blogs/${blogId}`)
		.set("Authorization", `bearer ${rossFakeToken}`)
	const newusers = await api.get("/api/users")
	expect(newusers.body[0].blogs.length).toBe(2)
})

test("good deletion", async () => {
	const users = await api.get("/api/users")
    const blogId = users.body[0].blogs[0].id
	const rosslogin = await api
                        .post("/api/login")
                        .send({
                            username : "rossgeller",
                            password : "dinos"
                        })
	const rossToken = rosslogin.body.token
	await api
		.delete(`/api/blogs/${blogId}`)
		.set("Authorization", `bearer ${rossToken}`)
	const newusers = await api.get("/api/users")
	expect(newusers.body[0].blogs.length).toBe(1)
})

afterAll(() => {
	mongoose.connection.close()
})
