const axios = require('axios')
const qs = require('querystring')

const http = axios.create({
  baseURL: 'http://localhost:8641/',
  paramsSerializer: qs.stringify,
})

// Добавление рас
async function req() {
  const data = [
    {
      name: 'Человек',
      description: 'Homo sapiens race',
    },
    {
      name: 'Маг',
      description: 'Существа магического происхождения',
    },
  ]

  http
    .post('race', data)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err.response.statusText))
}

req()
