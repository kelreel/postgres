const Router = require('koa-router')
const router = new Router({ prefix: '/spell' })
const Spell = require('../models/Spell')

router.get('/', async (ctx) => {
  const spell = await Spell.query()
  ctx.body = spell
})

router.post('/', async (ctx) => {
  const spell = await Spell.query().insert(ctx.request.body)
  ctx.body = spell
})

module.exports = router
