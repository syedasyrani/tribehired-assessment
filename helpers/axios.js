import axios from 'axios'
import { API_URL } from '../config'

let headers = {
  'Access-Control-Allow-Credentials': true,
}

let config = {
  baseURL: API_URL,
  headers,
}

const API = axios.create(config)

const requestInterceptor = (config) => {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  API.isCancel = axios.isCancel
  API.cancelRequest = source.cancel

  config.cancelToken = source.token
  return config
}

API.interceptors.request.use(requestInterceptor)

API.doRequest = async ({
  url,
  method,
  responseType = 'json',
  body = {},
  onSuccess,
}) => {
  try {
    const response = await API[method](url, body)

    if (onSuccess) {
      onSuccess(response)
    }

    return response
  } catch (err) {
    if (API.isCancel(err)) {
      console.log(API.isCancel(err))
      console.log(err.message)
    }

    if (!err.response) {
      console.log(
        "We're unable to send requests the server. There seems to be an issue with your network connection."
      )

      const notRedirectPaths = ['/login']
      const path = window.location.pathname
      if (!notRedirectPaths.includes(path)) window.location.replace('/logout')
    } else {
      throw err
    }
  }
}

export default API
