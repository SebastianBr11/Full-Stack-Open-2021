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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
