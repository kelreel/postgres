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
      spellId: 1,
    },
    {
      heroId: 1,
      spellId: 3,
    },
    {
      heroId: 1,
      spellId: 4,
    },
    {
      heroId: 2,
      spellId: 1,
    },
    {
      heroId: 2,
      spellId: 2,
    },
    {
      heroId: 2,
      spellId: 7,
    },
    {
      heroId: 3,
      spellId: 1,
    },
    {
      heroId: 3,
      spellId: 4,
    },
    {
      heroId: 3,
      spellId: 6,
    },
    {
      heroId: 4,
      spellId: 7,
    },
    {
      heroId: 4,
      spellId: 8,
    },
  ]

  http
    .post('spell_list', data)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err.response.statusText))
}

req()
