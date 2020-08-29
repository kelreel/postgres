const Router = require('koa-router')
const router = new Router({ prefix: '/creature' })
const Creature = require('../models/Creature')

router.get('/', async (ctx) => {
  const creature = await Creature.query()
  ctx.body = creature
})

router.post('/', async (ctx) => {
  const creature = await Creature.query().insert(ctx.request.body)
  ctx.body = creature
})

module.exports = router
