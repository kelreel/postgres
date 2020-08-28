const axios = require('axios')
const qs = require('querystring')

const http = axios.create({
  baseURL: 'http://localhost:8641/',
  paramsSerializer: qs.stringify,
})

// Добавление заклинаний
async function req() {
  const data = [
    {
      name: 'Щит',
      description: 'Уменьшение урона',
      mp: 5,
    },
    {
      name: 'Волна смерти',
      description: 'Наносит урон живым существам',
      mp: 11,
    },
    {
      name: 'Землетрясение',
      description: 'Урон двум пролетам стен',
      mp: 14,
    },
    {
      name: 'Силовое поле',
      description: 'Блокирует проход в радиусе двух клеток',
      mp: 9,
    },
    {
      name: 'Метеоритный дождь',
      description: 'Урон в радиусе двух клеток',
      mp: 16,
    },
    {
      name: 'Элементаль воздуха',
      description: 'Вызывает двух магических существ',
      mp: 9,
    },
    {
      name: 'Рассеивание',
      description: 'Снимает все эффекты заклинаний на поле боя',
      mp: 12,
    },
    {
      name: 'Проклятие',
      description: 'Наносит урон вражескому существу',
      mp: 5,
    },
  ]

  http
    .post('spell', data)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err.response.statusText))
}

req()
