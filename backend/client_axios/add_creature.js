const axios = require('axios')
const qs = require('querystring')

const http = axios.create({
  baseURL: 'http://localhost:8641/',
  paramsSerializer: qs.stringify,
})

// Добавление существ
async function req() {
  const data = [
    {
      name: 'Лучник',
      hp: 20,
      raceId: 1,
    },
    {
      name: 'Кентавр',
      hp: 18,
      raceId: 2,
    },
    {
      name: 'Скелет',
      hp: 30,
      raceId: 1,
    },
    {
      name: 'Архимаг',
      hp: 27,
      raceId: 2,
    },
    {
      name: 'Бес',
      hp: 29,
      raceId: 2,
    },
    {
      name: 'Гарпия',
      hp: 29,
      raceId: 2,
    },
    {
      name: 'Ящер',
      hp: 29,
      raceId: 1,
    },
  ]

  http
    .post('creature', data)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err.response.statusText))
}

req()
