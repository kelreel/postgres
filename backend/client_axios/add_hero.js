const axios = require('axios')
const qs = require('querystring')

const http = axios.create({
  baseURL: 'http://localhost:8641/',
  paramsSerializer: qs.stringify,
})

// Добавление героев
async function req() {
  const data = [
    {
      name: 'Зана',
      description:
        'Она мила, честна, любит поэзию и является, наверное, единственным обитателем Шио, который не произнес ни слова лжи.',
      hp: 20,
      mp: 15,
      raceId: 1,
    },
    {
      name: 'Нархиз',
      description:
        'Строгий и педантичный преподаватель, он стал настоящим проклятием для аколитов, собирающихся стать магами.',
      hp: 18,
      mp: 35,
      raceId: 2,
    },
    {
      name: 'Линна',
      description: 'Последняя представительница рода Соколов.',
      hp: 30,
      mp: 25,
      raceId: 1,
    },
    {
      name: 'Беатрис',
      description: 'Аббатиса Священной Империи',
      hp: 27,
      mp: 34,
      raceId: 2,
    },
    {
      name: 'Арниэль',
      description: 'Верховный король эльфов',
      hp: 29,
      mp: 33,
      raceId: 2,
    },
  ]

  http
    .post('hero', data)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err.response.statusText))
}

req()
