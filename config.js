const ENV = process.env.ENV
const PORT = process.env.PORT ? process.env.PORT : '3000'
const API_VERSION = process.env.API_VERSION

const API_URL = `https://jsonplaceholder.typicode.com`

export { ENV, PORT, API_VERSION, API_URL }
