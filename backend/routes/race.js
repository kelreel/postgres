const Router = require('koa-router')
const router = new Router({ prefix: '/race' })
const Race = require('../models/Race')

router.get('/', async (ctx) => {
  const races = await Race.query()
  ctx.body = races
})

router.post('/', async (ctx) => {
  const race = await Race.query().insert(ctx.request.body)
  ctx.body = race
})

module.exports = router
