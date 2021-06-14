import API from '../helpers/axios'

const PostService = {
  getPosts: async () =>
    await API.doRequest({
      url: '/posts',
      method: 'get',
    }),

  getPostByID: async (id) =>
    await API.doRequest({
      url: `/posts/${id}`,
      method: 'get',
    }),
  getComments: async () =>
    await API.doRequest({
      url: `/comments`,
      method: 'get',
    }),
}

export default PostService
