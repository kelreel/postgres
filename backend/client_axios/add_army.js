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
      heroId: 1,
      creatureId: 1,
      count: 5,
    },
    {
      heroId: 1,
      creatureId: 3,
      count: 8,
    },
    {
      heroId: 2,
      creatureId: 4,
      count: 7,
    },
    {
      heroId: 3,
      creatureId: 6,
      count: 15,
    },
    {
      heroId: 4,
      creatureId: 2,
      count: 2,
    },
    {
      heroId: 4,
      creatureId: 5,
      count: 9,
    },
  ]

  http
    .post('army', data)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err.response.statusText))
}

req()
