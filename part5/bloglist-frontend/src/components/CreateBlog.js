import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ setSuccessMsg, setErrorMsg }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await blogService.create({ title, author, url })

      setSuccessMsg(`a new blog ${title} by ${author} added`)
      setTimeout(() => setSuccessMsg(null), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log('error', exception)
      setErrorMsg(exception.response.data.error)
      setTimeout(() => setErrorMsg(null), 5000)
    }
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog
