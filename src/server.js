const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

import PostService from '../services'

const app = express()
const port = 3000

app.use(cors())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/posts', async (req, res) => {
  let posts = []
  const response = await PostService.getPosts()

  if (response.status === 200 && response.data.length > 0) {
    posts = response.data
  }

  res.send(posts)
})

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params
  let post = {}

  const response = await PostService.getPostByID(id)

  if (response.status === 200) {
    post = response.data
  }

  res.send(post)
})

app.get('/comments', async (req, res) => {
  let comments = []

  const response = await PostService.getComments()

  if (response.status === 200 && response.data.length > 0) {
    comments = response.data
  }

  res.send(comments)
})

app.get('/search', async (req, res) => {
  const query = req.query
  console.log(query)

  /*
    query list
    id
    postId
    name
    email
    body
  */

  let comments = []

  const response = await PostService.getComments()

  if (response.status === 200 && response.data.length > 0) {
    comments = response.data

    if (query.id) {
      comments = comments.filter((comment) => comment.id === parseInt(query.id))
    }

    if (query.postId) {
      comments = comments.filter(
        (comment) => comment.postId === parseInt(query.postId)
      )
    }

    if (query.name) {
      comments = comments.filter((comment) => comment.name.includes(query.name))
    }

    if (query.email) {
      comments = comments.filter((comment) =>
        comment.email.includes(query.email)
      )
    }

    if (query.body) {
      comments = comments.filter((comment) => comment.body.includes(query.body))
    }
  }

  res.send(comments)
})

app.listen(port, () => console.log(`App listening on port ${port}`))
