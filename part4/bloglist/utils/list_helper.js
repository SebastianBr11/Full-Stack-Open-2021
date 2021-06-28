const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((acc, curr) => acc + curr.likes ?? 0, 0)
}

const favoriteBlog = blogs => {
  const max = blogs.reduce((acc, { likes }) => (likes > acc ? likes : acc), 0)
  return blogs.find(blog => blog.likes === max)
}

const mostBlogs = blogs => {
  const authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] ?? 0) + 1
  })
  const max = Math.max(...Object.values(authors))

  return {
    author: Object.keys(authors).find(key => authors[key] === max),
    blogs: max,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
