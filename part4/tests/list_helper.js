const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (val,blog) => val + blog.likes
	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	maxLikes = Math.max(...blogs.map(x => x.likes))
	return blogs.filter(blog => blog.likes === maxLikes)[0]
}

const mostBlogs = (blogs) => {
	const accumulate = blogs.map(
		blog => blogs.filter( x => blog.author === x.author )
	)
	const numbers = accumulate.map(
		x => {
			return {
				author : x[0].author,
				blogs : x.length }
		}
	)
	maxBlogs = Math.max(...numbers.map(x => x.blogs))
	return numbers.filter(author => author.blogs === maxBlogs)[0]
}

const mostLikes = (blogs) => {
	const accumulate = blogs.map(
		blog => blogs.filter( x => blog.author === x.author )
	)
	const numbers = accumulate.map(
		x => {
			const reducer = (val,blog) => val+blog.likes
			return {
				author : x[0].author,
				likes : x.reduce(reducer,0)
			}
		}
	)
	return favoriteBlog(numbers)
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
